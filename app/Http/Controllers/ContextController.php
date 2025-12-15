<?php

namespace App\Http\Controllers;

use App\Models\Context;
use App\Models\Note;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ContextController extends Controller
{
    use AuthorizesRequests;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $contexts = Context::where('user_id', Auth::id())->get();
        return Inertia::render('Contexts/Index', [
            'contexts' => $contexts,
        ]);
    }

    public function create()
    {
        return Inertia::render('Contexts/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'description' => 'nullable|string',
        ]);

        $validated['user_id'] = Auth::id();

        Context::create($validated);

        return redirect()->route('contexts.index')->with('success', 'Contexto creado con éxito.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Context $context)
    {
        $this->authorize('show', $context);

        $notes = $context->notes()->get();

        $notes->load('tags');

        return Inertia::render('Contexts/Show', [
            'context' => $context,
            'notes' => $notes,
        ]);
    }

    public function edit(Context $context)
    {
        $this->authorize('edit', $context);

        return Inertia::render('Contexts/Edit', [
            'context' => $context,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Context $context)
    {
        $this->authorize('update', $context);

        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'description' => 'nullable|string',
        ]);

        $context->update($validated);

        return redirect()->route('contexts.index')->with('success', 'Contexto actualizado.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Context $context)
    {
        $this->authorize('destroy', $context);

        $context->delete();

        return redirect()->route('contexts.index')->with('success', 'Contexto eliminado.');
    }
}
