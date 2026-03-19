<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ResourceCategory extends Model
{
    protected $table = 'resource_categories';

    const CREATED_AT = 'createdAt';
    const UPDATED_AT = 'updatedAt';

    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = ['name', 'description', 'parentId', 'isDeleted'];

    protected $casts = ['isDeleted' => 'boolean'];

    public function files(): HasMany
    {
        return $this->hasMany(ResourceFile::class, 'categoryId');
    }

    public function parent(): BelongsTo
    {
        return $this->belongsTo(ResourceCategory::class, 'parentId');
    }

    public function children(): HasMany
    {
        return $this->hasMany(ResourceCategory::class, 'parentId');
    }
}
