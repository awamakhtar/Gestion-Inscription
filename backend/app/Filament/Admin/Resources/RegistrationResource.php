<?php

namespace App\Filament\Resources;

use App\Filament\Resources\RegistrationResource\Pages;
use App\Models\ClassRoom;
use App\Models\Registration;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Notifications\Notification;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class RegistrationResource extends Resource
{
    // Modèle associé
    protected static ?string $model = Registration::class;

    // Icône dans le menu (heroicons)
    protected static ?string $navigationIcon = 'heroicon-o-academic-cap';

    // Label dans le menu
    protected static ?string $navigationLabel = 'Inscriptions';
    
    // Label singulier
    protected static ?string $modelLabel = 'Inscription';
    
    // Label pluriel
    protected static ?string $pluralModelLabel = 'Inscriptions';

    // Ordre dans le menu (plus petit = plus haut)
    protected static ?int $navigationSort = 1;

    // Groupe dans le menu (optionnel)
    protected static ?string $navigationGroup = 'Gestion Scolaire';

    /**
     * form() définit le formulaire de création/édition
     */
    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                // Section : Informations de l'élève
                Forms\Components\Section::make('Informations de l\'Élève')
                    ->description('Informations personnelles de l\'élève')
                    ->schema([
                        // TextInput désactivé (lecture seule)
                        Forms\Components\TextInput::make('student.first_name')
                            ->label('Prénom')
                            ->disabled(), // Non modifiable
                        
                        Forms\Components\TextInput::make('student.last_name')
                            ->label('Nom')
                            ->disabled(),
                        
                        Forms\Components\DatePicker::make('student.date_of_birth')
                            ->label('Date de naissance')
                            ->disabled()
                            ->displayFormat('d/m/Y'),
                        
                        Forms\Components\TextInput::make('student.place_of_birth')
                            ->label('Lieu de naissance')
                            ->disabled(),
                        
                        Forms\Components\TextInput::make('student.gender')
                            ->label('Sexe')
                            ->disabled()
                            ->formatStateUsing(fn (string $state): string => 
                                $state === 'M' ? 'Masculin' : 'Féminin'
                            ),
                    ])
                    ->columns(2), // Afficher en 2 colonnes

                // Section : Détails de l'inscription
                Forms\Components\Section::make('Détails de l\'Inscription')
                    ->schema([
                        Forms\Components\TextInput::make('registration_number')
                            ->label('Numéro de dossier')
                            ->disabled(),
                        
                        // Select avec options
                        Forms\Components\Select::make('status')
                            ->label('Statut')
                            ->options([
                                'pending' => 'En attente',
                                'approved' => 'Approuvée',
                                'rejected' => 'Rejetée',
                                'incomplete' => 'Incomplète',
                            ])
                            ->required()
                            // Définir la couleur selon le statut
                            ->native(false) // Utiliser le select stylé de Filament
                            ->live(), // Mise à jour en temps réel
                        
                        // Select avec relation (classe)
                        Forms\Components\Select::make('class_id')
                            ->label('Classe')
                            ->relationship('class', 'name')
                            ->searchable()
                            ->preload()
                            // Requis seulement si statut = approuvée
                            ->required(fn (Forms\Get $get) => $get('status') === 'approved')
                            ->visible(fn (Forms\Get $get) => $get('status') === 'approved'),
                        
                        // Textarea pour message
                        Forms\Components\Textarea::make('admin_message')
                            ->label('Message pour le parent')
                            ->rows(3)
                            ->columnSpanFull(), // Prend toute la largeur
                    ])
                    ->columns(2),
            ]);
    }

    /**
     * table() définit la liste des inscriptions
     */
    public static function table(Table $table): Table
    {
        return $table
            // Définir les colonnes
            ->columns([
                // Colonne texte simple
                Tables\Columns\TextColumn::make('registration_number')
                    ->label('N° Dossier')
                    ->searchable() // Permet la recherche
                    ->sortable() // Permet le tri
                    ->copyable() // Permet de copier au clic
                    ->weight('bold') // Texte en gras
                    ->icon('heroicon-m-document-text'), // Icône

                // Colonne avec relation
                Tables\Columns\TextColumn::make('student.full_name')
                    ->label('Élève')
                    ->searchable(['first_name', 'last_name']) // Recherche sur plusieurs champs
                    ->sortable(),

                // Colonne badge
                Tables\Columns\TextColumn::make('level.name')
                    ->label('Niveau')
                    ->badge() // Afficher comme badge
                    ->color('info'),

                // Colonne badge avec couleurs conditionnelles
                Tables\Columns\BadgeColumn::make('status')
                    ->label('Statut')
                    ->colors([
                        'warning' => 'pending',
                        'success' => 'approved',
                        'danger' => 'rejected',
                        'info' => 'incomplete',
                    ])
                    ->formatStateUsing(fn (string $state): string => match ($state) {
                        'pending' => 'En attente',
                        'approved' => 'Approuvée',
                        'rejected' => 'Rejetée',
                        'incomplete' => 'Incomplète',
                    }),

                Tables\Columns\TextColumn::make('class.name')
                    ->label('Classe')
                    ->default('Non assignée')
                    ->badge()
                    ->color('success')
                    ->visible(fn ($record) => $record->class_id !== null),

                // Colonne date formatée
                Tables\Columns\TextColumn::make('submitted_at')
                    ->label('Date de soumission')
                    ->dateTime('d/m/Y H:i')
                    ->sortable()
                    ->since() // Afficher "il y a X jours"
                    ->description(fn ($state) => $state->format('d/m/Y')),

                // Colonne cachée par défaut (toggleable)
                Tables\Columns\TextColumn::make('student.user.email')
                    ->label('Email parent')
                    ->searchable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            
            // Définir les filtres
            ->filters([
                // Filtre select simple
                Tables\Filters\SelectFilter::make('status')
                    ->label('Statut')
                    ->options([
                        'pending' => 'En attente',
                        'approved' => 'Approuvée',
                        'rejected' => 'Rejetée',
                        'incomplete' => 'Incomplète',
                    ])
                    ->multiple(), // Permettre plusieurs sélections

                // Filtre avec relation
                Tables\Filters\SelectFilter::make('level')
                    ->label('Niveau')
                    ->relationship('level', 'name')
                    ->multiple(),

                // Filtre date personnalisé
                Tables\Filters\Filter::make('created_at')
                    ->form([
                        Forms\Components\DatePicker::make('created_from')
                            ->label('Du'),
                        Forms\Components\DatePicker::make('created_until')
                            ->label('Au'),
                    ])
                    ->query(function ($query, array $data) {
                        return $query
                            ->when($data['created_from'], 
                                fn ($q) => $q->whereDate('created_at', '>=', $data['created_from']))
                            ->when($data['created_until'], 
                                fn ($q) => $q->whereDate('created_at', '<=', $data['created_until']));
                    }),
            ])
            
            // Définir les actions (boutons sur chaque ligne)
            ->actions([
                // Action de visualisation
                Tables\Actions\ViewAction::make()
                    ->label('Voir')
                    ->icon('heroicon-o-eye'),
                
                // Action d'édition
                Tables\Actions\EditAction::make()
                    ->label('Modifier')
                    ->icon('heroicon-o-pencil'),

                // ACTION PERSONNALISÉE : Approuver
                Tables\Actions\Action::make('approve')
                    ->label('Approuver')
                    ->icon('heroicon-o-check-circle')
                    ->color('success')
                    // Visible seulement si statut = pending
                    ->visible(fn (Registration $record) => $record->status === 'pending')
                    // Formulaire modal
                    ->form([
                        Forms\Components\Select::make('class_id')
                            ->label('Assigner à une classe')
                            ->options(function (Registration $record) {
                                // Récupérer les classes du même niveau et année
                                return ClassRoom::where('level_id', $record->level_id)
                                    ->where('school_year_id', $record->school_year_id)
                                    ->pluck('name', 'id');
                            })
                            ->required()
                            ->searchable(),
                        
                        Forms\Components\Textarea::make('admin_message')
                            ->label('Message pour le parent')
                            ->default('Félicitations ! Votre inscription a été approuvée.')
                            ->rows(3),
                    ])
                    // Action à exécuter
                    ->action(function (Registration $record, array $data) {
                        // Appeler la méthode approve() du modèle
                        $record->approve($data['class_id'], $data['admin_message'] ?? null);

                        // Notification de succès
                        Notification::make()
                            ->title('Inscription approuvée')
                            ->success()
                            ->send();
                    })
                    // Confirmation avant action
                    ->requiresConfirmation()
                    ->modalHeading('Approuver l\'inscription')
                    ->modalDescription('Êtes-vous sûr de vouloir approuver cette inscription ?')
                    ->modalSubmitActionLabel('Approuver'),

                // ACTION PERSONNALISÉE : Rejeter
                Tables\Actions\Action::make('reject')
                    ->label('Rejeter')
                    ->icon('heroicon-o-x-circle')
                    ->color('danger')
                    ->visible(fn (Registration $record) => $record->status === 'pending')
                    ->form([
                        Forms\Components\Textarea::make('admin_message')
                            ->label('Raison du rejet')
                            ->required()
                            ->rows(3)
                            ->placeholder('Expliquez pourquoi l\'inscription est rejetée...'),
                    ])
                    ->action(function (Registration $record, array $data) {
                        $record->reject($data['admin_message']);

                        Notification::make()
                            ->title('Inscription rejetée')
                            ->warning()
                            ->send();
                    })
                    ->requiresConfirmation()
                    ->modalHeading('Rejeter l\'inscription')
                    ->modalSubmitActionLabel('Rejeter'),

                // ACTION PERSONNALISÉE : Marquer incomplet
                Tables\Actions\Action::make('mark_incomplete')
                    ->label('Incomplet')
                    ->icon('heroicon-o-exclamation-triangle')
                    ->color('warning')
                    ->visible(fn (Registration $record) => $record->status === 'pending')
                    ->form([
                        Forms\Components\Textarea::make('admin_message')
                            ->label('Documents manquants')
                            ->required()
                            ->rows(3)
                            ->placeholder('Listez les documents manquants...'),
                    ])
                    ->action(function (Registration $record, array $data) {
                        $record->markIncomplete($data['admin_message']);

                        Notification::make()
                            ->title('Marqué comme incomplet')
                            ->info()
                            ->send();
                    }),
            ])
            
            // Actions groupées (sur plusieurs lignes sélectionnées)
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ])
            
            // Tri par défaut
            ->defaultSort('created_at', 'desc')
            
            // Nombre de lignes par page
            ->paginated([10, 25, 50, 100]);
    }

    /**
     * getRelations() définit les relations à afficher (onglets)
     */
    public static function getRelations(): array
    {
        return [
            // Exemple : afficher les documents en relation
            // RelationManagers\DocumentsRelationManager::class,
        ];
    }

    /**
     * getPages() définit les pages de la resource
     */
    public static function getPages(): array
    {
        return [
            'index' => Pages\ListRegistrations::route('/'),
            'create' => Pages\CreateRegistration::route('/create'),
            'view' => Pages\ViewRegistration::route('/{record}'),
            'edit' => Pages\EditRegistration::route('/{record}/edit'),
        ];
    }

    /**
     * Badge de notification dans le menu
     * Affiche le nombre d'inscriptions en attente
     */
    public static function getNavigationBadge(): ?string
    {
        return static::getModel()::pending()->count();
    }

    /**
     * Couleur du badge
     */
    public static function getNavigationBadgeColor(): ?string
    {
        return 'warning';
    }
}