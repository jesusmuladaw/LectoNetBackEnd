<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use Illuminate\Http\Request;
use App\Models\Message;

class MessageController extends Controller
{
    //
    public function index(Request $request) {
        $user = auth()->user();
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
    

    public function store(Request $request) {
        $request->validate([
            'receiver_id' => 'required|exists:users,id',
            'message' => 'required|string|max:1000',
        ]);

        $message = Message::create([
            'sender_id' => auth()->id(),
            'receiver_id' => $request->receiver_id,
            'message' => $request->message,
        ]);

        broadcast(new MessageSent($message))->toOthers();
    }
}
