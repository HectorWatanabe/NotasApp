<?php

namespace App\Policies;

use App\Models\Tag;
use App\Models\User;

class TagPolicy
{
    /**
     * Determine whether the user can edit the model.
     */
    public function edit(User $user, Tag $tag): bool
    {
        return $user->id === $tag->user_id;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Tag $tag): bool
    {
        return $user->id === $tag->user_id;
    }

    /**
     * Determine whether the user can destroy the model.
     */
    public function destroy(User $user, Tag $tag): bool
    {
        return $user->id === $tag->user_id;
    }
}
