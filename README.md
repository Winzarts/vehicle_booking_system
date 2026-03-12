# 🚗 Sistem Pemesanan Kendaraan Operasional

Aplikasi web untuk **mengelola dan memantau pemesanan kendaraan operasional** di lingkungan perusahaan pertambangan nikel.  
Sistem ini menyediakan **proses persetujuan berjenjang (multi-level approval)**, penugasan driver, serta **dashboard analitik** untuk memonitor penggunaan kendaraan secara efisien.

---

# 🛠️ Teknologi yang Digunakan

Aplikasi ini menggunakan arsitektur **full-stack modern** agar memiliki performa yang baik, mudah dikembangkan, dan scalable.

## Backend
- Framework: **Laravel 12 (PHP ≥ 8.2)**
- Autentikasi: **JWT (JSON Web Token)** – stateless authentication
- API: **RESTful API**
- Database: **SQLite, MySQL, PostgreSQL**

## Frontend
- Library: **React 19**
- Build Tool: **Vite 7**
- Styling: **Tailwind CSS 4**
- Icons: **Lucide React**
- Charts: **Chart.js** & **Recharts**
- Routing: **React Router 7**
- HTTP Client: **Axios**

---

# ✨ Fitur Utama

## 📊 Dashboard Manajemen
Menampilkan informasi visual mengenai:
- penggunaan kendaraan
- distribusi kendaraan
- komposisi armada

## 📑 Manajemen Pemesanan
Memudahkan pengguna untuk:
- membuat permintaan kendaraan
- memantau status pemesanan
- melihat riwayat pemesanan

## ⚖️ Persetujuan Berjenjang
Sistem mendukung **multi-level approval** dengan minimal dua tahap persetujuan.

Contoh alur proses:

1. Permintaan kendaraan dibuat
2. Disetujui oleh **Approver Level 1**
3. Disetujui oleh **Approver Level 2**
4. Driver ditugaskan

## 🔧 Log Perawatan Kendaraan
Pencatatan riwayat:
- servis kendaraan
- penggunaan bahan bakar

## 👥 Role-Based Access Control (RBAC)

Sistem memiliki beberapa peran pengguna:

| Role | Hak Akses |
|-----|------|
| Admin | Mengelola sistem dan data kendaraan |
| Approver | Menyetujui atau menolak permintaan kendaraan |
| Driver | Melihat dan merespon penugasan |

## 📅 Activity Logging
Semua aktivitas penting dicatat untuk **audit dan pelacakan sistem**.

## 📥 Ekspor Data
Laporan dapat diunduh dalam format:
- Excel
- CSV

---

# 🚀 Memulai Project

## Persyaratan Sistem

Pastikan sudah terinstall:

- PHP ≥ 8.2
- Composer
- Node.js
- NPM

---

# 📦 Instalasi

### 1. Clone Repository

```bash
git clone <repository-url>
cd sewa_kendaraan