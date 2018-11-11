<?php

namespace App\Http\Controllers;

use App\articleModels\Article;
use App\carModels\Car;
use Illuminate\Http\Request;

class ApiController extends Controller
{
    public function carsIndex(Car $car)
    {
        return response()->json($car);
    }
    public function articlesIndex(Article $article)
    {
        return response()->json($article);
    }
}
