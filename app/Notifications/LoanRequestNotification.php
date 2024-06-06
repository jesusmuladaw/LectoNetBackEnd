<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class LoanRequestNotification extends Notification
{
    use Queueable;

    protected $book;
    protected $borrower;
    /**
     * Create a new notification instance.
     */
    public function __construct($book, $borrower)
    {
        //
        $this->book = $book;
        $this->borrower = $borrower;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
                    ->line('Has recibido una solicitud de préstamo para el libro: ' . $this->book->titulo)
                    ->line('Solicitante: ' . $this->borrower->name)
                    ->action('Ver Solicitud', url('/loan-requests'))
                    ->line('Gracias por usar nuestra aplicación!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
            'book_id' => $this->book->id,
            'book_title' => $this->book->titulo,
            'borrower_name' => $this->borrower->name,
            'borrower_id' => $this->borrower->id,
        ];
    }
}
