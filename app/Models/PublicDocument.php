<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class PublicDocument extends Model
{
    protected $table = 'public_documents';

    const CREATED_AT = 'createdAt';
    const UPDATED_AT = 'updatedAt';

    protected $fillable = [
        'title', 'slug', 'description', 'fileUrl', 'fileName', 'fileSize',
        'category', 'iconType', 'isActive', 'order', 'publishedAt',
        'isDeleted', 'showInPopup',
    ];

    protected $casts = [
        'isActive' => 'boolean',
        'isDeleted' => 'boolean',
        'showInPopup' => 'boolean',
        'publishedAt' => 'datetime',
    ];

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('isActive', true)->where('isDeleted', false);
    }

    public function scopePopup(Builder $query): Builder
    {
        return $query->active()->where('showInPopup', true);
    }
}
