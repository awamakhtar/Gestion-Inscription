<?php

namespace App\Filament\Admin\Resources\SchoolYearResource\Pages;

use App\Filament\Admin\Resources\SchoolYearResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListSchoolYears extends ListRecords
{
    protected static string $resource = SchoolYearResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
