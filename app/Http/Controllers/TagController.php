<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TagController extends Controller
{
    use AuthorizesRequests;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tags = Tag::where('user_id', Auth::id())->get();
        return Inertia::render('Tags/Index', [
            'tags' => $tags,
        ]);
    }

    public function create()
    {
        return Inertia::render('Tags/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:50|unique:tags,name,NULL,id,user_id,' . Auth::id(),
        ]);

        $validated['user_id'] = Auth::id();

        Tag::create($validated);

        return redirect()->route('tags.index')->with('success', 'Etiqueta creada con éxito.');
    }

    public function edit(Tag $tag)
    {
        $this->authorize('edit', $tag);

        return Inertia::render('Tags/Edit', [
            'tag' => $tag,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Tag $tag)
    {
        $this->authorize('update', $tag);

        $validated = $request->validate([
            'name' => 'required|string|max:50|unique:tags,name,' . $tag->id . ',id,user_id,' . Auth::id(),
        ]);

        $tag->update($validated);

        return redirect()->route('tags.index')->with('success', 'Etiqueta actualizada.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tag $tag)
    {
        $this->authorize('destroy', $tag);

        $tag->delete();

        return redirect()->route('tags.index')->with('success', 'Etiqueta eliminada.');
    }
}
