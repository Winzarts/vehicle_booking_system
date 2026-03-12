<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Approval;
use App\Models\Booking;
use App\Models\ActivityLog;
use Illuminate\Http\Request;

class ApprovalController extends Controller
{
    public function update(Request $request, Approval $approval)
    {
        $request->validate([
            'status' => 'required|in:disetujui,ditolak',
        ]);

        // Sequential logic: Level 2 can't approve if Level 1 is NOT disetujui
        if ($approval->level == '2') {
            $level1 = Approval::where('id_booking', $approval->id_booking)
                ->where('level', '1')
                ->first();
            
            if (!$level1 || $level1->status !== 'disetujui') {
                return response()->json(['message' => 'Persetujuan Level 1 harus disetujui terlebih dahulu.'], 403);
            }
        }

        $approval->update([
            'status' => $request->status,
            'id_penyetuju' => auth()->id(), // Kept this from original
            'approved_at' => now(),
        ]);

        // Log activity
        ActivityLog::create([
            'id_user' => auth()->id(),
            'aksi' => 'Approval',
            'description' => 'Memberikan persetujuan (' . $request->status . ') untuk pesanan #' . $approval->id_booking . ' Level ' . $approval->level,
        ]);

        if ($request->status === 'ditolak') {
            $approval->booking->update(['status' => 'ditolak']);
        } else {
            // Check if all levels are approved
            $pendingApprovals = Approval::where('id_booking', $approval->id_booking)
                ->where('status', '!=', 'disetujui')
                ->count();

            if ($pendingApprovals === 0) {
                // All levels approved
                $approval->booking->update(['status' => 'disetujui']);
            }
        }

        return response()->json($approval->load('booking'));
    }
}
