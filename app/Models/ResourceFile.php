<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ResourceFile extends Model
{
    protected $table = 'resource_files';

    const CREATED_AT = 'createdAt';
    const UPDATED_AT = 'updatedAt';

    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'name', 'originalName', 'fileName', 'filePath',
        'fileSize', 'mimeType', 'categoryId', 'isDeleted',
    ];

    protected $casts = ['isDeleted' => 'boolean'];

    public function category(): BelongsTo
    {
        return $this->belongsTo(ResourceCategory::class, 'categoryId');
    }

    public function downloads(): HasMany
    {
        return $this->hasMany(ResourceDownload::class, 'resourceFileId');
    }
}
