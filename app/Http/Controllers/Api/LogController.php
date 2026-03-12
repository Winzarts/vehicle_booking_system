<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\FuelLog;
use App\Models\ServiceLog;
use App\Models\ActivityLog;
use Illuminate\Http\Request;

class LogController extends Controller
{
    // Fuel Logs
    public function fuelIndex()
    {
        return response()->json(FuelLog::with('vehicle')->get());
    }

    public function fuelStore(Request $request)
    {
        $validated = $request->validate([
            'id_kendaraan' => 'required|exists:kendaraan,id_kendaraan',
            'tanggal' => 'required|date',
            'fuel_amount' => 'required',
            'cost' => 'required|numeric',
        ]);

        return response()->json(FuelLog::create($validated), 201);
    }

    // Service Logs
    public function serviceIndex()
    {
        return response()->json(ServiceLog::with('vehicle')->get());
    }

    public function serviceStore(Request $request)
    {
        $validated = $request->validate([
            'id_kendaraan' => 'required|exists:kendaraan,id_kendaraan',
            'tanggal_service' => 'required|date',
            'description' => 'required',
            'cost' => 'required|numeric',
        ]);

        return response()->json(ServiceLog::create($validated), 201);
    }

    // Activity Logs
    public function activityIndex()
    {
        return response()->json(ActivityLog::with('user')->latest('created_at')->get());
    }
}
