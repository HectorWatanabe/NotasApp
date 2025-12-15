<?php

namespace App\Policies;

use App\Models\Context;
use App\Models\User;

class ContextPolicy
{
    /**
     * Determine whether the user can show the model.
     */
    public function show(User $user, Context $context): bool
    {
        return $user->id === $context->user_id;
    }

    /**
     * Determine whether the user can edit the model.
     */
    public function edit(User $user, Context $context): bool
    {
        return $user->id === $context->user_id;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Context $context): bool
    {
        return $user->id === $context->user_id;
    }

    /**
     * Determine whether the user can destroy the model.
     */
    public function destroy(User $user, Context $context): bool
    {
        return $user->id === $context->user_id;
    }
}
