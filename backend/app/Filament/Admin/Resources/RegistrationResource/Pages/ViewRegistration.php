<?php

namespace App\Filament\Resources\RegistrationResource\Pages;

use App\Filament\Resources\RegistrationResource;
use Filament\Actions;
use Filament\Resources\Pages\ViewRecord;
use Filament\Infolists;
use Filament\Infolists\Infolist;

class ViewRegistration extends ViewRecord
{
    protected static string $resource = RegistrationResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\EditAction::make(),
        ];
    }

    public function infolist(Infolist $infolist): Infolist
    {
        return $infolist
            ->schema([
                Infolists\Components\Section::make('Informations de l\'Inscription')
                    ->schema([
                        Infolists\Components\TextEntry::make('registration_number')
                            ->label('Numéro de dossier')
                            ->badge()
                            ->color('primary'),
                        Infolists\Components\TextEntry::make('status')
                            ->label('Statut')
                            ->badge()
                            ->color(fn (string $state): string => match ($state) {
                                'pending' => 'warning',
                                'approved' => 'success',
                                'rejected' => 'danger',
                                'incomplete' => 'info',
                            })
                            ->formatStateUsing(fn (string $state): string => match ($state) {
                                'pending' => 'En attente',
                                'approved' => 'Approuvée',
                                'rejected' => 'Rejetée',
                                'incomplete' => 'Incomplète',
                            }),
                        Infolists\Components\TextEntry::make('submitted_at')
                            ->label('Date de soumission')
                            ->dateTime('d/m/Y à H:i'),
                        Infolists\Components\TextEntry::make('level.name')
                            ->label('Niveau demandé'),
                        Infolists\Components\TextEntry::make('class.name')
                            ->label('Classe assignée')
                            ->default('Non assignée'),
                    ])
                    ->columns(2),

                Infolists\Components\Section::make('Informations de l\'Élève')
                    ->schema([
                        Infolists\Components\TextEntry::make('student.full_name')
                            ->label('Nom complet'),
                        Infolists\Components\TextEntry::make('student.date_of_birth')
                            ->label('Date de naissance')
                            ->date('d/m/Y'),
                        Infolists\Components\TextEntry::make('student.place_of_birth')
                            ->label('Lieu de naissance'),
                        Infolists\Components\TextEntry::make('student.gender')
                            ->label('Sexe')
                            ->formatStateUsing(fn (string $state): string => $state === 'M' ? 'Masculin' : 'Féminin'),
                        Infolists\Components\TextEntry::make('student.previous_school')
                            ->label('École précédente')
                            ->default('Non renseignée'),
                    ])
                    ->columns(2),

                Infolists\Components\Section::make('Informations du Parent')
                    ->schema([
                        Infolists\Components\TextEntry::make('student.user.full_name')
                            ->label('Nom complet'),
                        Infolists\Components\TextEntry::make('student.user.email')
                            ->label('Email')
                            ->copyable(),
                        Infolists\Components\TextEntry::make('student.user.phone')
                            ->label('Téléphone')
                            ->copyable(),
                        Infolists\Components\TextEntry::make('student.user.address')
                            ->label('Adresse')
                            ->columnSpanFull(),
                        Infolists\Components\TextEntry::make('student.user.profession')
                            ->label('Profession'),
                    ])
                    ->columns(2),

                Infolists\Components\Section::make('Documents')
                    ->schema([
                        Infolists\Components\RepeatableEntry::make('documents')
                            ->label('')
                            ->schema([
                                Infolists\Components\TextEntry::make('type')
                                    ->label('Type')
                                    ->formatStateUsing(fn (string $state): string => \App\Models\Document::getTypeLabel($state)),
                                Infolists\Components\TextEntry::make('file_name')
                                    ->label('Nom du fichier'),
                                Infolists\Components\TextEntry::make('size_formatted')
                                    ->label('Taille'),
                                Infolists\Components\IconEntry::make('is_verified')
                                    ->label('Vérifié')
                                    ->boolean(),
                            ])
                            ->columns(4),
                    ]),

                Infolists\Components\Section::make('Message Administration')
                    ->schema([
                        Infolists\Components\TextEntry::make('admin_message')
                            ->label('')
                            ->default('Aucun message')
                            ->columnSpanFull(),
                    ])
                    ->visible(fn ($record) => $record->admin_message !== null),
            ]);
    }
}