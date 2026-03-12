<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function exportBookings()
    {
        $bookings = Booking::with(['vehicle', 'driver', 'user'])->get();
        
        $filename = "booking_report_" . date('Y-m-d') . ".csv";
        $handle = fopen('php://output', 'w');
        
        header('Content-Type: text/csv');
        header('Content-Disposition: attachment; filename="' . $filename . '"');
        
        // CSV Headers
        fputcsv($handle, ['ID', 'Vehicle', 'Driver', 'Booked By', 'Departure', 'Return', 'Destination', 'Status']);
        
        foreach ($bookings as $booking) {
            fputcsv($handle, [
                $booking->id_pemesanan,
                $booking->vehicle->nama_kendaraan ?? 'N/A',
                $booking->driver->nama_driver ?? 'N/A',
                $booking->user->username ?? 'N/A',
                $booking->tanggal_keberangkatan,
                $booking->tanggal_selesai,
                $booking->destinasi,
                $booking->status,
            ]);
        }
        
        fclose($handle);
        exit;
    }
}
