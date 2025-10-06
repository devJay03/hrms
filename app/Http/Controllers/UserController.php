<?php
namespace App\Http\Controllers;

use App\Http\Requests\User\StoreUser;
use App\Http\Requests\User\UpdateUser;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $users = User::query()
            ->when($request->search, fn($q) => $q->search($request->search))
            ->when($request->role, fn($q) => $q->where('role', $request->role))
            ->paginate($request->get('per_page', 10));

        return Inertia::render('web/users', [
            'users'      => $users->items(),
            'pagination' => $users->toArray(),
            'filters'    => $request->only(['search', 'role', 'department', 'per_page', 'sort_by', 'sort_order']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUser $request)
    {
        $data = $request->validated();
        $user = User::create($data);
        return redirect()
            ->route('users.index')
            ->with('message', $user->name . ' with the role ' . $user->role . ' was created successfully!')
            ->with('status', 'success');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUser $request, User $user)
    {
        $data = $request->validated();
        if (empty($data['password'])) {
            unset($data['password']);
        }
        $user->update($data);
        return redirect()
            ->route('users.index')
            ->with('message', $user->name . ' was updated successfully!')
            ->with('status', 'success');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        if ($user->id == Auth::id()) {
            return redirect()
                ->back()
                ->with('message', 'Unable to delete the currently logged in user')
                ->with('status', 'warning');
        }

        $user->delete();
        return redirect()
            ->route('users.index')
            ->with('message', $user->name . ' was deleted successfully!')
            ->with('status', 'success');
    }
}
