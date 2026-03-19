<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Contact extends Model
{
    use HasUuids;

    protected $table = 'Contact';

    const CREATED_AT = 'createdAt';
    const UPDATED_AT = 'updatedAt';

    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'name', 'email', 'phone', 'message',
        'region', 'category', 'read', 'isApp',
    ];

    protected $casts = [
        'read' => 'boolean',
        'isApp' => 'boolean',
    ];
}
