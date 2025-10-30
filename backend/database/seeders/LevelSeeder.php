<?php

namespace Database\Seeders;

use App\Models\Level;
use Illuminate\Database\Seeder;

class LevelSeeder extends Seeder
{
    public function run(): void
    {
        $levels = [
            ['code' => 'CI', 'name' => 'Cours d\'Initiation (CI)', 'order' => 1, 'is_active' => true],
            ['code' => 'CP', 'name' => 'Cours Préparatoire (CP)', 'order' => 2, 'is_active' => true],
            ['code' => 'CE1', 'name' => 'Cours Élémentaire 1 (CE1)', 'order' => 3, 'is_active' => true],
            ['code' => 'CE2', 'name' => 'Cours Élémentaire 2 (CE2)', 'order' => 4, 'is_active' => true],
            ['code' => 'CM1', 'name' => 'Cours Moyen 1 (CM1)', 'order' => 5, 'is_active' => true],
            ['code' => 'CM2', 'name' => 'Cours Moyen 2 (CM2)', 'order' => 6, 'is_active' => true],
            ['code' => '6eme', 'name' => '6ème', 'order' => 7, 'is_active' => true],
            ['code' => '5eme', 'name' => '5ème', 'order' => 8, 'is_active' => true],
            ['code' => '4eme', 'name' => '4ème', 'order' => 9, 'is_active' => true],
            ['code' => '3eme', 'name' => '3ème', 'order' => 10, 'is_active' => true],
            ['code' => '2nde', 'name' => '2nde', 'order' => 11, 'is_active' => true],
            ['code' => '1ere', 'name' => '1ère', 'order' => 12, 'is_active' => true],
            ['code' => 'Tle', 'name' => 'Terminale', 'order' => 13, 'is_active' => true],
        ];

        foreach ($levels as $level) {
            Level::create($level);
        }
    }
}