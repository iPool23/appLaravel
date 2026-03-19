<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class PressArticleQu extends Model
{
    protected $table = 'press_articles_qu';

    const CREATED_AT = 'createdAt';
    const UPDATED_AT = 'updatedAt';

    protected $fillable = [
        'title', 'slug', 'summary', 'content', 'imageUrl', 'imageAlt',
        'category', 'author', 'publishedAt', 'isPublished', 'isFeatured',
        'viewsCount', 'metaTitle', 'metaDescription', 'isDeleted', 'isDraft',
    ];

    protected $casts = [
        'publishedAt' => 'datetime',
        'isPublished' => 'boolean',
        'isFeatured' => 'boolean',
    ];

    public function scopePublished(Builder $query): Builder
    {
        return $query->where('isPublished', true)
                     ->where('isDeleted', false)
                     ->where('isDraft', false)
                     ->where('publishedAt', '<=', now()->addMinutes(3));
    }

    public function scopeOfType(Builder $query, string $type): Builder
    {
        return match ($type) {
            'Comunicado' => $query->where('category', 'Comunicado'),
            default => $query->where('category', '!=', 'Comunicado'),
        };
    }
}
