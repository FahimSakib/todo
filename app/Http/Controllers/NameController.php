<?php

namespace App\Http\Controllers;

use App\Models\Name;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NameController extends Controller
{
    public function store(Request $request)
    {
        Name::create($request->all());
        $result = name::first();
        return Inertia::render('Todo', [
            'result' => $result
        ]);
    }

    public function update(Request $request, $id)
    {
        Name::find($id)->update(['name' => $request->name]);
    }
}
