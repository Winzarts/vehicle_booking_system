<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Firebase\JWT\JWT;

class AuthController extends Controller
{
    private function generateToken($user)
    {
        $payload = [
            'iss' => config('app.url'),
            'iat' => time(),
            'exp' => time() + (60 * 60 * 24), // 24 hours
            'sub' => $user->id_user,
            'role' => $user->role,
        ];

        return JWT::encode($payload, config('app.key'), 'HS256');
    }

    public function register(Request $request)
    {
        $request->validate([
            'username' => 'required|unique:users,username',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6|confirmed',
            'role' => 'nullable|in:admin,approver,driver',
        ]);

        $user = User::create([
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role ?? 'admin',
        ]);

        $token = $this->generateToken($user);

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user
        ]);
    }

    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required',
            'password' => 'required',
        ]);

        $user = User::where('username', $request->username)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'username' => ['The provided credentials are incorrect.'],
            ]);
        }

        $token = $this->generateToken($user);

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user
        ]);
    }

    public function logout(Request $request)
    {
        return response()->json([
            'message' => 'Logged out'
        ]);
    }

    public function user(Request $request)
    {
        return response()->json($request->user());
    }

    public function approvers()
    {
        $approvers = User::where('role', 'approver')->get(['id_user', 'username', 'email']);
        return response()->json($approvers);
    }

    public function drivers()
    {
        $drivers = User::where('role', 'driver')->get(['id_user', 'username', 'email']);
        return response()->json($drivers);
    }
}
