<?php
namespace App\Http\Controllers;

use App\Http\Requests\Amenity\StoreAmenity;
use App\Http\Requests\Amenity\UpdateAmenity;
use App\Models\Amenity;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AmenitiesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $amenities = Amenity::query()
            ->withCount('rooms')
            ->when($request->search, fn($q) => $q->search($request->search))
            ->paginate($request->get('per_page', 10));

        return Inertia::render('web/amenities', [
            'amenities'  => $amenities->items(),
            'pagination' => $amenities->toArray(),
            'filters'    => $request->only(['search', 'per_page', 'sort_by', 'sort_order']),
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
    public function store(StoreAmenity $request)
    {
        $data = $request->validated();

        Amenity::create($data);

        return redirect()
            ->route('amenities.index')
            ->with('status', 'success')
            ->with('message', 'Amenity created successfully!');
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
    public function update(UpdateAmenity $request, Amenity $amenity)
    {
        $data = $request->validated();

        $amenity->update($data);

        return redirect()
            ->route('amenities.index')
            ->with('status', 'success')
            ->with('message', 'Amenity was updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Amenity $amenity)
    {
        $amenity->delete();
        return redirect()
            ->route('amenities.index')
            ->with('message', $amenity->name . ' was deleted successfully!')
            ->with('status', 'success');
    }
}
