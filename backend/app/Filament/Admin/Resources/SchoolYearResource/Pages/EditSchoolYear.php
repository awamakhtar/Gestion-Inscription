<?php

namespace App\Filament\Admin\Resources\SchoolYearResource\Pages;

use App\Filament\Admin\Resources\SchoolYearResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditSchoolYear extends EditRecord
{
    protected static string $resource = SchoolYearResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
