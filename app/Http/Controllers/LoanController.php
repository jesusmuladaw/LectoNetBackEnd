<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Loan;
use App\Models\OwnershipStatus;
use App\Models\User;
use App\Notifications\LoanRequestNotification;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LoanController extends Controller
{
    //
    public function index()
    {
        $user = Auth::user();
        $loanRequests = Loan::where('status', 'requested')->whereHas('book', function ($query) use ($user) {
            $query->where('user_id', $user->id);
        })->with('book', 'borrower')->get();

        $approvedLoans = Loan::where('status', 'approved')->whereHas('book', function ($query) use ($user) {
            $query->where('user_id', $user->id);
        })->with('book', 'borrower')->get();

        $rejectedLoans = Loan::where('status', 'rejected')->whereHas('book', function ($query) use ($user) {
            $query->where('user_id', $user->id);
        })->with('book', 'borrower')->get();

        return Inertia::render('Loans/Index', [
            'loanRequests' => $loanRequests,
            'approvedLoans' => $approvedLoans,
            'rejectedLoans' => $rejectedLoans,
        ]);

    }

    public function show($id)
    {
        $loan = Loan::with(['book', 'borrower', 'lender'])->findOrFail($id);

        return Inertia::render('Loans/Show', [
            'loan' => $loan
        ]);
    }

    public function create(Request $request)
    {
        $request->validate([
            'book_id' => 'required|exists:books,id',
            'borrower_id' => 'required|exists:users,id',
            'due_date' => 'required|date'
        ]);

        $book = Book::find($request->book_id);
        /** @var \App\Models\User */
        $lender = Auth::user();
        $borrower = User::find($request->borrower_id);

        if ($book->pivot->ownership_status_id != OwnershipStatus::where('estado', 'compartir')->first()->id) {
            return redirect()->back()->withErrors(['book_id' => 'Book is not available for sharing.']);
        }

        $loan = Loan::create([
            'lender_id' => $lender->id,
            'borrower_id' => $borrower->id,
            'book_id' => $book->id,
            'due_date' => $request->due_date,
        ]);

        $lender->books()->updateExistingPivot($book->id, ['ownership_status_id' => OwnershipStatus::where('estado', 'prestado')->first()->id]);
        $borrower->books()->attach($book->id, ['ownership_status_id' => OwnershipStatus::where('estado', 'recibido')->first()->id]);

        return redirect()->route('loans.index')->with('success', 'Loan created successfully.');
    }

    public function returnBook(Request $request, $id)
    {
        $loan = Loan::findOrFail($id);

        if ($loan->lender_id != Auth::id()) {
            return redirect()->back()->withErrors(['unauthorized' => 'No autorizado.']);
        }

        $loan->update(['returned_at' => now()]);

        $loan->lender->books()->updateExistingPivot($loan->book_id, ['ownership_status_id' => OwnershipStatus::where('estado', 'compartir')->first()->id]);
        $loan->borrower->books()->detach($loan->book_id);

        return redirect()->route('loans.index')->with('success', 'Libro devuelto exitosamente.');
    }

    public function requestLoan(Request $request, Book $book)
    {
        $request->validate([
            'lender_id' => 'required|exists:users,id',
        ]);
    
        $lender = User::find($request->lender_id);
        $borrower = Auth::user();
    
        $ownershipStatus = OwnershipStatus::where('estado', 'compartir')->first();
        $isBookAvailable = $lender->books()
            ->where('book_id', $book->id)
            ->wherePivot('ownership_status_id', $ownershipStatus->id)
            ->exists();
    
        if (!$isBookAvailable) {
            return response()->json(['error' => 'El libro no está disponible para compartir.'], 400);
        }
    
        $loan = Loan::create([
            'lender_id' => $lender->id,
            'borrower_id' => $borrower->id,
            'book_id' => $book->id,
            'due_date' => now()->addWeeks(2),
        ]);
    
        $lender->books()->updateExistingPivot($book->id, [
            'ownership_status_id' => OwnershipStatus::where('estado', 'solicitado')->first()->id,
        ]);
    
        $lender->notify(new LoanRequestNotification($book, $borrower));
    
        return response()->json(['message' => 'Solicitud de préstamo enviada con éxito.']);
    }

    public function confirmLoan($id)
    {
        $loan = Loan::findOrFail($id);

        if ($loan->lender_id != Auth::id()) {
            return redirect()->back()->withErrors(['unauthorized' => 'No autorizado.']);
        }

        $loan->update(['is_confirmed' => true]);

        $loan->lender->books()->updateExistingPivot($loan->book_id, ['ownership_status_id' => OwnershipStatus::where('estado', 'prestado')->first()->id]);
        $loan->borrower->books()->attach($loan->book_id, ['ownership_status_id' => OwnershipStatus::where('estado', 'recibido')->first()->id]);

        return redirect()->route('loans.index')->with('success', 'Préstamo confirmado exitosamente.');
    }

    public function approveLoan(Request $request, Loan $loan)
    {
        $loan->update([
            'approved_at' => Carbon::now(),
        ]);
        
        $prestadoStatusId = OwnershipStatus::where('estado', 'prestado')->first()->id;
        $recibidoStatusId = OwnershipStatus::where('estado', 'recibido')->first()->id;
    
        $loan->lender->books()->updateExistingPivot($loan->book_id, [
            'ownership_status_id' => $prestadoStatusId,
        ]);
    
        $loan->borrower->books()->attach($loan->book_id, [
            'ownership_status_id' => $recibidoStatusId,
        ]);
    
        $loan->updateOrCreate(
            ['id' => $loan->id],
            [
                'lender_id' => $loan->lender_id,
                'borrower_id' => $loan->borrower_id,
                'book_id' => $loan->book_id,
                'due_date' => $loan->due_date,
                'approved_at' => Carbon::now(),
            ]
        );
    
        return redirect()->route('loan-requests')->with('success', 'Loan approved successfully');
    }

    public function rejectLoan(Request $request, Loan $loan)
    {
        $loan->update([
            'rejected_at' => Carbon::now(),
        ]);
        $compartirStatusId = OwnershipStatus::where('estado', 'compartir')->first()->id;
        $request->user()->books()
        ->where('book_id', $loan->book_id)
        ->updateExistingPivot($loan->book_id, [
            'ownership_status_id' => $compartirStatusId,
        ]);
    
        return redirect()->route('loan-requests')->with('success', 'Loan rejected successfully');    
    }

    public function loanRequests()
    {
        $loanRequests = Loan::with(['book', 'borrower'])
        ->whereNull('approved_at')
        ->whereNull('rejected_at')
        ->get();

        $approvedLoans = Loan::with(['book', 'borrower'])
            ->whereNotNull('approved_at')
            ->whereNull('returned_at')
            ->get();

        return inertia('Loans/Requests', [
            'loanRequests' => $loanRequests,
            'approvedLoans' => $approvedLoans,
        ]);
    }

    public function approvedRequests()
    {
        $approvedLoans = Loan::whereNotNull('approved_at')->with('book', 'borrower')->get();
        return Inertia::render('Loans/Approved', [
            'approvedLoans' => $approvedLoans
        ]);
    }

    public function rejectedRequests()
    {
        $rejectedLoans = Loan::whereNotNull('rejected_at')->with('book', 'borrower')->get();
        return Inertia::render('Loans/Rejected', [
            'rejectedLoans' => $rejectedLoans
        ]);
    }
    public function returnLoan(Request $request, Loan $loan)
    {
        $loan->update([
            'returned_at' => Carbon::now(),
        ]);

        $compartirStatusId = OwnershipStatus::where('estado', 'compartir')->first()->id;
        $request->user()->books()
        ->where('book_id', $loan->book_id)
        ->updateExistingPivot($loan->book_id, [
            'ownership_status_id' => $compartirStatusId,
        ]);
    
        $loan->borrower->books()->detach($loan->book_id);
    
        return redirect()->route('loan-requests')->with('success', 'Loan returned successfully');
    }
    public function showLoanRequests(Request $request)
    {
        $user = $request->user();
        $loanRequests = Loan::where('lender_id', $user->id)->whereNull('approved_at')->whereNull('rejected_at')->get();
        $approvedLoans = Loan::where('lender_id', $user->id)->whereNotNull('approved_at')->whereNull('returned_at')->get();

        return inertia('LoanRequests', [
            'auth' => ['user' => $user],
            'loanRequests' => $loanRequests,
            'approvedLoans' => $approvedLoans,
        ]);
    }
}
