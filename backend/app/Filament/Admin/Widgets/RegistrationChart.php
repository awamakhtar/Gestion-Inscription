<?php

namespace App\Filament\Widgets;

use App\Models\Registration;
use Filament\Widgets\ChartWidget;
use Illuminate\Support\Facades\DB;

class RegistrationChart extends ChartWidget
{
    // Titre du graphique
    protected static ?string $heading = 'Évolution des Inscriptions';
    
    // Ordre d'affichage
    protected static ?int $sort = 2;
    
    // Hauteur du widget (en colonnes, max 12)
    protected static ?string $maxHeight = '300px';

    /**
     * getData() retourne les données du graphique
     * Format Chart.js
     */
    protected function getData(): array
    {
        // Récupérer les inscriptions des 6 derniers mois
        $data = Registration::query()
            ->select(
                // Formater la date au format YYYY-MM
                DB::raw('DATE_FORMAT(created_at, "%Y-%m") as month'),
                // Compter les inscriptions par mois
                DB::raw('count(*) as count')
            )
            ->groupBy('month')
            ->orderBy('month', 'desc')
            ->limit(6)
            ->get()
            ->reverse(); // Inverser pour afficher du plus ancien au plus récent

        return [
            // Définir les jeux de données
            'datasets' => [
                [
                    'label' => 'Nombre d\'inscriptions',
                    'data' => $data->pluck('count')->toArray(),
                    
                    // Couleurs (format RGBA)
                    'backgroundColor' => 'rgba(59, 130, 246, 0.5)', // Bleu semi-transparent
                    'borderColor' => 'rgb(59, 130, 246)', // Bleu
                    'borderWidth' => 2,
                    
                    // Options supplémentaires
                    'tension' => 0.3, // Courbure des lignes (0 = droit, 1 = très courbé)
                ],
            ],
            
            // Labels de l'axe X (mois)
            'labels' => $data->pluck('month')->toArray(),
        ];
    }

    /**
     * getType() définit le type de graphique
     * Options : 'line', 'bar', 'pie', 'doughnut', 'radar', 'polarArea'
     */
    protected function getType(): string
    {
        return 'bar'; // Graphique en barres
    }

    /**
     * Méthode optionnelle : options Chart.js personnalisées
     */
    protected function getOptions(): array
    {
        return [
            'plugins' => [
                'legend' => [
                    'display' => true,
                ],
            ],
            'scales' => [
                'y' => [
                    'beginAtZero' => true,
                ],
            ],
        ];
    }
}