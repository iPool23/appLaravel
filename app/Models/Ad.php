<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Ad extends Model
{
    protected $table = 'ads';

    const CREATED_AT = 'createdAt';
    const UPDATED_AT = 'updatedAt';

    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'title', 'subtitle', 'content', 'imageUrl', 'buttonText', 'buttonUrl',
        'isActive', 'priority', 'showOnHomepage', 'showOnAllPages',
        'startDate', 'endDate',
    ];

    protected $casts = [
        'isActive' => 'boolean',
        'showOnHomepage' => 'boolean',
        'showOnAllPages' => 'boolean',
        'isDeleted' => 'boolean',
        'startDate' => 'datetime',
        'endDate' => 'datetime',
    ];

    public function scopeActive(Builder $query): Builder
    {
        $now = now();
        return $query->where('isActive', true)
                     ->where('isDeleted', false)
                     ->where(function ($q) use ($now) {
                         $q->whereNull('startDate')->orWhere('startDate', '<=', $now);
                     })
                     ->where(function ($q) use ($now) {
                         $q->whereNull('endDate')->orWhere('endDate', '>=', $now);
                     })
                     ->orderBy('priority', 'desc');
    }
}
