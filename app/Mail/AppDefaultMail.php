<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class AppDefaultMail extends Mailable
{
    use Queueable, SerializesModels;

    public $mainContent;
    public $mailSubject;

    /**
     * Create a new message instance.
     *
     * @param string $subject
     * @param string $content HTML content to be injected into the template
     */
    public function __construct(string $subject, string $content)
    {
        $this->mailSubject = $subject;
        $this->mainContent = $content;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from(config('mail.from.address'), config('mail.from.name'))
                    ->subject($this->mailSubject)
                    ->view('emails.base');
    }
}
