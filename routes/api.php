<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\VehicleController;
use App\Http\Controllers\Api\DriverController;
use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\ApprovalController;
use App\Http\Controllers\Api\LogController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\ReportController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::middleware('jwt.auth')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::get('/users/approvers', [AuthController::class, 'approvers']);
    Route::get('/users/drivers', [AuthController::class, 'drivers']);
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::apiResource('vehicles', VehicleController::class);
    Route::apiResource('drivers', DriverController::class);
    Route::apiResource('bookings', BookingController::class);
    Route::post('/bookings/{booking}/driver-response', [BookingController::class, 'driverResponse']);
    
    Route::put('/approvals/{approval}', [ApprovalController::class, 'update']);
    
    Route::get('/dashboard', [DashboardController::class, 'index']);
    
    // Logs
    Route::get('/fuel-logs', [LogController::class, 'fuelIndex']);
    Route::post('/fuel-logs', [LogController::class, 'fuelStore']);
    Route::get('/service-logs', [LogController::class, 'serviceIndex']);
    Route::post('/service-logs', [LogController::class, 'serviceStore']);
    Route::get('/activity-logs', [LogController::class, 'activityIndex']);
    
    // Reports
    Route::get('/reports/bookings/export', [ReportController::class, 'exportBookings']);
});
