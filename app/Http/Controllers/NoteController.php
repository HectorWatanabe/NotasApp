<?php

namespace App\Http\Controllers;

use App\Models\Context;
use App\Models\Note;
use App\Models\Tag;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class NoteController extends Controller
{
    use AuthorizesRequests;

    public function create()
    {
        $tags = Tag::where('user_id', Auth::id())->get();
        $contexts = Context::where('user_id', Auth::id())->get();
        $priorities = ['low', 'medium', 'high'];
        $statuses = ['pending', 'done', 'cancelled'];
        return Inertia::render('Notes/Create', [
            'tags' => $tags,
            'contexts' => $contexts,
            'priorities' => $priorities,
            'statuses' => $statuses,
        ]);
    }

    public function createByContext(Context $context)
    {
        $tags = Tag::where('user_id', Auth::id())->get();
        $priorities = ['low', 'medium', 'high'];
        $statuses = ['pending', 'done', 'cancelled'];
        return Inertia::render('Notes/CreateByContext', [
            'tags' => $tags,
            'context' => $context,
            'priorities' => $priorities,
            'statuses' => $statuses,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'context_id' => ['required', 'exists:contexts,id'],
            'title'      => ['required', 'string', 'max:255'],
            'content'    => ['nullable', 'string'],
            'due_date'   => ['nullable', 'date'],
            'priority'   => ['nullable', 'in:low,medium,high'],
            'status'     => ['nullable', 'in:pending,done,cancelled'],
            'tag_ids'    => ['nullable', 'array'],
            'tag_ids.*'  => ['integer', 'exists:tags,id'],
        ]);

        // Crear la nota (solo los campos permitidos por fillable)
        $note = new Note();

        $note->fill([
            'context_id' => $validated['context_id'],
            'title'      => $validated['title'],
            'content'    => Arr::get($validated, 'content'),
            'due_date'   => Arr::get($validated, 'due_date'),
            'priority'   => Arr::get($validated, 'priority'),
            'status'     => Arr::get($validated, 'status'),
        ]);

        $note->save();

        // Sincronizar etiquetas si fueron seleccionadas
        $note->tags()->sync(Arr::get($validated, 'tag_ids', []));

        // Redirigir con mensaje de éxito
        return redirect()
            ->route('contexts.show', ['context' => $note->context_id])
            ->with('success', 'Nota creada exitosamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Note $note)
    {
        $this->authorize('show', $note);

        $note->load('tags');

        return Inertia::render('Notes/Show', [
            'note' => $note,
        ]);
    }

    public function edit(Note $note)
    {
        $this->authorize('edit', $note);

        $note->load('tags');

        $tags = Tag::where('user_id', Auth::id())->get();
        $contexts = Context::where('user_id', Auth::id())->get();
        $priorities = ['low', 'medium', 'high'];
        $statuses = ['pending', 'done', 'cancelled'];

        return Inertia::render('Notes/Edit', [
            'note' => $note,
            'tags' => $tags,
            'contexts' => $contexts,
            'priorities' => $priorities,
            'statuses' => $statuses
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Note $note)
    {
        // Verifica autorización del usuario
        $this->authorize('update', $note);

        // Validación de los datos
        $validated = $request->validate([
            'title'      => ['required', 'string', 'max:255'],
            'content'    => ['nullable', 'string'],
            'due_date'   => ['nullable', 'date'],
            'priority'   => ['nullable', 'in:low,medium,high'],
            'status'     => ['nullable', 'in:pending,done,cancelled'],
            'tag_ids'    => ['nullable', 'array'],
            'tag_ids.*'  => ['integer', 'exists:tags,id'],
        ]);

        // Actualiza la nota con los campos necesarios
        $note->fill([
            'title'      => $validated['title'],
            'content'    => Arr::get($validated, 'content'),
            'due_date'   => Arr::get($validated, 'due_date'),
            'priority'   => Arr::get($validated, 'priority'),
            'status'     => Arr::get($validated, 'status'),
        ]);
        $note->save();

        // Sincroniza etiquetas
        $note->tags()->sync(Arr::get($validated, 'tag_ids', []));

        // Redirección con mensaje de éxito
        return redirect()
            ->route('contexts.show', ['context' => $note->context_id])
            ->with('success', 'Nota actualizada exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Note $note)
    {
        $context_id = $note->context_id;

        $this->authorize('destroy', $note);

        $note->delete();

        return redirect()->route('contexts.show', [
            'context' => $context_id
        ])->with('success', 'Nota eliminada.');
    }
}
