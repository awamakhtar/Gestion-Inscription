<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\LevelResource;
use App\Models\Level;

class LevelController extends Controller
{
    public function index()
    {
        $levels = Level::active()->get();

        return LevelResource::collection($levels);
    }
}