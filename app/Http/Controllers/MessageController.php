<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Message;
use Illuminate\Support\Facades\Auth;
use App\Events\MessageSent;
use App\Models\User;
use Inertia\Inertia;

class MessageController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();
        $receiverId = $request->query('receiver_id');

        $messages = Message::where(function ($query) use ($user, $receiverId) {
            $query->where('sender_id', $user->id)
                  ->where('receiver_id', $receiverId);
        })->orWhere(function ($query) use ($user, $receiverId) {
            $query->where('receiver_id', $user->id)
                  ->where('sender_id', $receiverId);
        })->orderBy('created_at', 'asc')->get();

        return response()->json($messages);
    }

    public function store(Request $request)
    {
        $request->validate([
            'receiver_id' => 'required|exists:users,id',
            'message' => 'required|string|max:1000',
        ]);

        $message = Message::create([
            'sender_id' => Auth::id(),
            'receiver_id' => $request->receiver_id,
            'message' => $request->message,
        ]);

        broadcast(new MessageSent($message))->toOthers();

        return response()->json($message);
    }

    public function conversations()
    {
        $user = Auth::user();
        
        $conversations = Message::where('sender_id', $user->id)
            ->orWhere('receiver_id', $user->id)
            ->with(['sender', 'receiver'])
            ->orderBy('created_at', 'desc')
            ->get()
            ->groupBy(function ($message) use ($user) {
                return $message->sender_id == $user->id ? $message->receiver_id : $message->sender_id;
            });

        return Inertia::render('Conversations/Index', [
            'conversations' => $conversations
        ]);
    }

    public function showMessages($userId)
    {
        $user = Auth::user();
        
        $messages = Message::where(function ($query) use ($user, $userId) {
            $query->where('sender_id', $user->id)
                  ->where('receiver_id', $userId);
        })->orWhere(function ($query) use ($user, $userId) {
            $query->where('receiver_id', $user->id)
                  ->where('sender_id', $userId);
        })->orderBy('created_at', 'asc')->get();

        $receiver = User::find($userId);

        return inertia('Conversations/Show', [
            'messages' => $messages,
            'receiver' => $receiver,
        ]);
    }

    public function checkNewMessages()
    {
        /** @var \App\Models\User */
        $user = Auth::user();
        $hasNewMessages = $user->receivedMessages()->where('is_read', false)->exists();

        return response()->json(['hasNewMessages' => $hasNewMessages]);
    }
}
