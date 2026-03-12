<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Vehicle;
use Illuminate\Http\Request;

class VehicleController extends Controller
{
    public function index()
    {
        return response()->json(Vehicle::with('owner')->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_kendaraan' => 'required',
            'tipe_kendaraan' => 'required',
            'pemilik' => 'required|string',
            'plat_nomor' => 'required|unique:kendaraan,plat_nomor',
            'status' => 'required|in:baik,servis,rusak',
        ]);

        $vehicle = Vehicle::create($validated);
        return response()->json($vehicle, 201);
    }

    public function show(Vehicle $vehicle)
    {
        return response()->json($vehicle->load('owner'));
    }

    public function update(Request $request, Vehicle $vehicle)
    {
        $validated = $request->validate([
            'nama_kendaraan' => 'sometimes|required',
            'tipe_kendaraan' => 'sometimes|required',
            'pemilik' => 'sometimes|required|string',
            'plat_nomor' => 'sometimes|required|unique:kendaraan,plat_nomor,' . $vehicle->id_kendaraan . ',id_kendaraan',
            'status' => 'sometimes|required|in:baik,servis,rusak',
        ]);

        $vehicle->update($validated);
        return response()->json($vehicle);
    }

    public function destroy(Vehicle $vehicle)
    {
        $vehicle->delete();
        return response()->json(null, 204);
    }
}
