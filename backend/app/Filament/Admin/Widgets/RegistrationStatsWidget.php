<?php

namespace App\Filament\Widgets;

use App\Models\Registration;
use App\Models\Student;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class RegistrationStatsWidget extends BaseWidget
{
    // Définir l'ordre d'affichage dans le dashboard
    protected static ?int $sort = 1;
    
    /**
     * getStats() retourne un tableau de statistiques
     * Chaque Stat contient :
     * - make() : titre et valeur
     * - description() : texte descriptif
     * - descriptionIcon() : icône (heroicons)
     * - color() : couleur (primary, success, warning, danger, info)
     * - chart() : mini-graphique d'évolution
     */
    protected function getStats(): array
    {
        return [
            // Statistique 1 : Total des inscriptions
            Stat::make('Total Inscriptions', Registration::count())
                ->description('Toutes les inscriptions reçues')
                ->descriptionIcon('heroicon-m-academic-cap')
                ->color('primary')
                // Mini graphique : simule une évolution (valeurs des 7 derniers jours)
                ->chart([7, 12, 15, 18, 22, 25, 28]),

            // Statistique 2 : Inscriptions en attente
            Stat::make('En Attente', Registration::pending()->count())
                ->description('Inscriptions à traiter')
                ->descriptionIcon('heroicon-m-clock')
                ->color('warning')
                ->chart([5, 8, 6, 9, 7, 10, 8]),

            // Statistique 3 : Inscriptions approuvées
            Stat::make('Approuvées', Registration::approved()->count())
                ->description('Inscriptions validées')
                ->descriptionIcon('heroicon-m-check-circle')
                ->color('success')
                ->chart([2, 4, 5, 6, 8, 10, 12]),

            // Statistique 4 : Inscriptions rejetées
            Stat::make('Rejetées', Registration::rejected()->count())
                ->description('Inscriptions refusées')
                ->descriptionIcon('heroicon-m-x-circle')
                ->color('danger'),

            // Statistique 5 : Inscriptions incomplètes
            Stat::make('Incomplètes', Registration::incomplete()->count())
                ->description('Documents manquants')
                ->descriptionIcon('heroicon-m-exclamation-triangle')
                ->color('info'),

            // Statistique 6 : Total élèves
            Stat::make('Élèves', Student::count())
                ->description('Total élèves inscrits')
                ->descriptionIcon('heroicon-m-user-group')
                ->color('primary'),
        ];
    }

    /**
     * Méthode optionnelle : rafraîchir automatiquement
     * null = pas de rafraîchissement
     * '5s' = toutes les 5 secondes
     * '1m' = toutes les 1 minute
     */
    protected static ?string $pollingInterval = null;
}