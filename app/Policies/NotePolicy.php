<?php

namespace App\Policies;

use App\Models\Note;
use App\Models\User;

class NotePolicy
{
    /**
     * Determine whether the user can show the model.
     */
    public function show(User $user, Note $note): bool
    {
        return $user->id === $note->context->user_id;
    }

    /**
     * Determine whether the user can edit the model.
     */
    public function edit(User $user, Note $note): bool
    {
        return $user->id === $note->context->user_id;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Note $note): bool
    {
        return $user->id === $note->context->user_id;
    }

    /**
     * Determine whether the user can destroy the model.
     */
    public function destroy(User $user, Note $note): bool
    {
        return $user->id === $note->context->user_id;
    }
}
