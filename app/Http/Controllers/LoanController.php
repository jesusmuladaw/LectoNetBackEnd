<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Loan;
use App\Models\OwnershipStatus;
use App\Models\User;
use App\Notifications\LoanRequestNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LoanController extends Controller
{
    //
    public function index()
    {
        $user = Auth::user();
        $loans = Loan::with(['book', 'borrower', 'lender'])
            ->where('lender_id', $user->id)
            ->orWhere('borrower_id', $user->id)
            ->get();

        return Inertia::render('Loans/Index', [
            'loans' => $loans
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
        if ($loan->lender_id !== Auth::id()) {
            return response()->json(['error' => 'No estás autorizado para realizar esta acción.'], 403);
        }

        $loan->returned_at = now();
        $loan->save();


        return back()->with('status', 'Préstamo aprobado.');
    }

    public function rejectLoan(Request $request, Loan $loan)
    {
        if ($loan->lender_id !== Auth::id()) {
            return response()->json(['error' => 'No estás autorizado para realizar esta acción.'], 403);
        }

        $loan->delete();


        return back()->with('status', 'Préstamo rechazado.');
    }

    public function loanRequests()
    {
        $user = Auth::user();

        $loanRequests = Loan::where('lender_id', $user->id)
                            ->whereNull('returned_at')
                            ->with('borrower', 'book')
                            ->get();

        return Inertia::render('Loans/Requests', ['loanRequests' => $loanRequests]);
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
}
