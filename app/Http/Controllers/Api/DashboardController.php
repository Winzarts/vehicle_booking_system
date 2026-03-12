<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $totalBookings = Booking::count();
        $usageStats = Booking::select('id_kendaraan', \DB::raw('count(*) as total'))
            ->groupBy('id_kendaraan')
            ->with('vehicle')
            ->get();
            
        // Simplified usage over time (by month)
        $monthlyBookings = Booking::select(
            \DB::raw('MONTH(tanggal_pemesanan) as month'),
            \DB::raw('count(*) as total')
        )
        ->groupBy('month')
        ->get();

        $typeStats = \App\Models\Vehicle::select('tipe_kendaraan', \DB::raw('count(*) as total'))
            ->groupBy('tipe_kendaraan')
            ->get();

        $ownershipStats = \App\Models\Vehicle::select(
                \DB::raw('IF(milik_perusahaan, "Milik Perusahaan", "Sewa") as ownership'),
                \DB::raw('count(*) as total')
            )
            ->groupBy('ownership')
            ->get();

        $regionalStats = \App\Models\Vehicle::select('lokasi', \DB::raw('count(*) as total'))
            ->groupBy('lokasi')
            ->get();

        return response()->json([
            'total_bookings' => $totalBookings,
            'vehicle_usage' => $usageStats,
            'monthly_bookings' => $monthlyBookings,
            'vehicle_types' => $typeStats,
            'ownership_dist' => $ownershipStats,
            'regional_dist' => $regionalStats,
            'total_vehicles' => \App\Models\Vehicle::count(),
            'total_drivers' => \App\Models\Driver::count(),
        ]);
    }
}
