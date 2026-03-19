<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class NewsletterSubscription extends Model
{
    use HasUuids;

    protected $table = 'newsletter_subscriptions';

    const CREATED_AT = 'subscribedAt';
    const UPDATED_AT = null;

    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'email', 'isActive', 'ipAddress', 'userAgent', 'isApp',
        'unsubscribedAt',
    ];

    protected $casts = [
        'isActive' => 'boolean',
        'isApp' => 'boolean',
        'unsubscribedAt' => 'datetime',
    ];
}
