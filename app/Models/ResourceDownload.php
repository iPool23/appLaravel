<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ResourceDownload extends Model
{
    protected $table = 'resource_downloads';

    const CREATED_AT = 'downloadedAt';
    const UPDATED_AT = null;

    public $timestamps = true;

    protected $fillable = [
        'email', 'subscribedToBulletin', 'ipAddress',
        'userAgent', 'resourceFileId',
    ];

    protected $casts = ['subscribedToBulletin' => 'boolean'];

    public function resourceFile(): BelongsTo
    {
        return $this->belongsTo(ResourceFile::class, 'resourceFileId');
    }
}
