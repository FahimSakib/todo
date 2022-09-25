<?php

namespace App\Http\Controllers;

use App\Models\Name;
use App\Models\Todo;
use Inertia\Inertia;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('Todo', ['data' => Todo::all(), 'name' => Name::first()]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        Todo::create($request->all());
        $result = Todo::all();
        return Inertia::render('Todo', [
            'result' => $result
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        Todo::find($id)->update(['title' => $request->title]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        if ($id === 'all') {
            Todo::where('is_trashed', 1)->delete();
        } else {
            $result = Todo::destroy($id);
            if ($result) {
                return back();
            } else {
                return back()->withErrors(['error' => 'Item could not be deleted']);
            }
        }
    }

    public function checkItem($id, $type)
    {
        if ($type === 'default') {
            $todo = Todo::where('id', $id)->pluck('is_complete')->first();
            Todo::find($id)->update(['is_complete' => !$todo]);
        } elseif ($type === 'restore') {
            Todo::find($id)->update(['is_complete' => false]);
        }
    }

    public function checkAll($type)
    {
        if ($type === 'check') {
            Todo::where('is_complete', 0)->update(['is_complete' => 1]);
        } else {
            Todo::where('is_complete', 1)->update(['is_complete' => 0]);
        }
    }

    public function trashItems($id, $type)
    {
        if ($id === 'all') {
            if ($type != 'undo') {
                Todo::where('is_complete', 1)->update(['is_trashed' => 1]);
            } elseif ($type === 'undo') {
                Todo::where([['is_complete', 1], ['is_trashed', 1]])->update(['is_trashed' => 0]);
            }
        } else {
            $todo = Todo::where('id', $id)->pluck('is_trashed')->first();
            Todo::find($id)->update(['is_trashed' => !$todo, 'is_complete' => 0]);
        }
    }
}
