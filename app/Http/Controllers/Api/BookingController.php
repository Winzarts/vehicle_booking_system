<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Approval;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BookingController extends Controller
{
    public function index()
    {
        return response()->json(Booking::with(['vehicle', 'driver', 'user', 'approvals'])->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'id_kendaraan' => 'required|exists:kendaraan,id_kendaraan',
            'id_driver' => 'required|exists:driver,id_driver',
            'tanggal_keberangkatan' => 'required|date',
            'tanggal_selesai' => 'required|date|after:tanggal_keberangkatan',
            'destinasi' => 'required',
            'approver1_id' => 'required|exists:users,id_user',
            'approver2_id' => 'required|exists:users,id_user',
        ]);

        return DB::transaction(function () use ($validated) {
            $booking = Booking::create([
                'id_kendaraan' => $validated['id_kendaraan'],
                'id_driver' => $validated['id_driver'],
                'dipesan_oleh' => auth()->id(),
                'tanggal_keberangkatan' => $validated['tanggal_keberangkatan'],
                'tanggal_selesai' => $validated['tanggal_selesai'],
                'destinasi' => $validated['destinasi'],
                'status' => 'pending',
                'driver_status' => 'pending',
            ]);

            // Create sequential approvals
            Approval::create([
                'id_booking' => $booking->id_pemesanan,
                'id_penyetuju' => $validated['approver1_id'],
                'level' => '1',
                'status' => 'pending',
            ]);

            Approval::create([
                'id_booking' => $booking->id_pemesanan,
                'id_penyetuju' => $validated['approver2_id'],
                'level' => '2',
                'status' => 'pending',
            ]);

            // Log activity
            \App\Models\ActivityLog::create([
                'id_user' => auth()->id(),
                'aksi' => 'Create Booking',
                'description' => 'Membuat pesanan kendaraan #' . $booking->id_pemesanan,
            ]);

            return response()->json($booking->load(['vehicle', 'driver', 'approvals']), 201);
        });
    }

    public function show(Booking $booking)
    {
        return response()->json($booking->load(['vehicle', 'driver', 'user', 'approvals.approver']));
    }

    public function driverResponse(Request $request, Booking $booking)
    {
        $request->validate([
            'status' => 'required|in:accepted,rejected',
        ]);

        // Ensure both approval levels are disetujui
        $approvedCount = $booking->approvals()->where('status', 'disetujui')->count();
        if ($approvedCount < 2) {
            return response()->json(['message' => 'Booking not yet fully approved by management.'], 403);
        }

        $booking->update(['driver_status' => $request->status]);
        
        if ($request->status === 'accepted') {
            $booking->update(['status' => 'disetujui']);
        }

        return response()->json($booking);
    }
}
