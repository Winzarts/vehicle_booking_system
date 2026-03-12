<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Driver;
use Illuminate\Http\Request;

class DriverController extends Controller
{
    public function index()
    {
        return response()->json(Driver::with('user')->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_driver' => 'required',
            'nomor_hp' => 'required',
            'status' => 'required|in:ready,bekerja,istirahat',
            'pengemudi' => 'required|exists:users,id_user',
        ]);

        $driver = Driver::create($validated);
        return response()->json($driver, 201);
    }

    public function show(Driver $driver)
    {
        return response()->json($driver->load('user'));
    }

    public function update(Request $request, Driver $driver)
    {
        $validated = $request->validate([
            'nama_driver' => 'sometimes|required',
            'nomor_hp' => 'sometimes|required',
            'status' => 'sometimes|required|in:ready,bekerja,istirahat',
            'pengemudi' => 'sometimes|required|exists:users,id_user',
        ]);

        $driver->update($validated);
        return response()->json($driver);
    }

    public function destroy(Driver $driver)
    {
        $driver->delete();
        return response()->json(null, 204);
    }
}
