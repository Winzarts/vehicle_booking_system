# Sistem Pemesanan Kendaraan Tambang Nikel

Aplikasi web untuk monitoring dan pemesanan kendaraan operasional perusahaan tambang nikel dengan sistem persetujuan berjenjang.

## Spesifikasi Teknis
- **PHP Version**: 8.2+
- **Framework**: Laravel 12
- **Frontend**: React (Vite)
- **Database**: SQLite / MySQL (Compatible)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Charts**: Recharts

## Daftar Akun (Auto-seeded)
| Username | Role | Password | Deskripsi |
| :--- | :--- | :--- | :--- |
| `admin` | Admin | `password` | Menginput pesanan & monitor sistem |
| `manager1` | Approver | `password` | Penyetuju Level 1 |
| `headofpool` | Approver | `password` | Penyetuju Level 2 |
| `driver1` | Driver | `password` | Driver operasional |

## Fitur Utama
1. **Dashboard Monitoring**: Visualisasi grafik pemakaian kendaraan dan tren bulanan.
2. **Pemesanan Kendaraan**: Admin dapat memilih kendaraan (milik sendiri/sewa), driver, dan alur penyetuju.
3. **Persetujuan Berjenjang**: Sistem mewajibkan Level 1 menyetujui sebelum Level 2 dapat memproses.
4. **Log Aktivitas**: Mencatat setiap proses (pembuatan pesanan, approval, dll).
5. **Ekspor Laporan**: Mengunduh riwayat pemesanan dalam format CSV (Excel Friendly).

## Panduan Penggunaan
1. **Instalasi**:
   - Jalankan `composer install` dan `npm install`.
   - Setup `.env` (pastikan DB terkoneksi).
   - Jalankan migrasi dan seeder: `php artisan migrate:fresh --seed --seeder=InitialDataSeeder`.
2. **Alur Pemesanan**:
   - Login sebagai `admin`.
   - Masuk ke menu **Bookings** -> **Pesan Kendaraan**.
   - Isi form dan pilih `manager1` sebagai Level 1 dan `headofpool` sebagai Level 2.
   - Login sebagai `manager1`, masuk ke menu **Approvals** untuk menyetujui.
   - Login sebagai `headofpool`, masuk ke menu **Approvals** untuk penyelesaian akhir.
3. **Melihat Log**:
   - Seluruh perubahan status dan pembuatan data dapat dilihat di menu **Activity Logs**.
4. **Ekspor**:
   - Masuk ke menu **Reports** untuk mengunduh laporan periodik.

## Struktur Database (Physical Model)
| Table | Description |
| :--- | :--- |
| `users` | Autentikasi dan role manajemen |
| `kendaraan` | Data aset kendaraan (lokasi, kepemilikan) |
| `driver` | Data pengemudi terdaftar |
| `pemesanan` | Transaksi reservasi kendaraan |
| `persetujuan` | Log detail approval berjenjang |
| `log_aktivitas`| Audit trail sistem |
