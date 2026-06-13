# website-sekolah

Aplikasi website sekolah sederhana dengan sidebar menu sesuai struktur modul berikut:

- Dashboard
- PPDB
  - Pendaftaran
  - Data Pendaftar
  - Verifikasi
  - Hasil Seleksi
- Akademik
  - Data Siswa
  - Data Guru
  - Data Kelas
  - Mata Pelajaran
  - Jadwal Pelajaran
  - Absensi
- Penilaian
  - Input Nilai
  - Data Nilai
  - Rapor
  - Transkrip Nilai
- Keuangan
  - SPP
  - Pembayaran
  - Pemasukan
  - Pengeluaran
- Perpustakaan
  - Buku
  - Peminjaman
  - Pengembalian
- Laporan
  - Laporan Siswa
  - Laporan Guru
  - Laporan Nilai
  - Laporan Absensi
  - Laporan PPDB
  - Laporan Keuangan
- Master Data
  - Jurusan
  - Tahun Ajaran
  - Semester
  - Pengguna
- Pengaturan
  - Profil Sekolah
  - Hak Akses
  - Backup Database
  - Log Aktivitas

## Cara menggunakan

1. Buka file `index.html` di browser.
2. Klik menu di sidebar untuk berpindah antar modul.
3. Konten akan ditampilkan di area utama.

## File utama

- `index.html` - Struktur halaman, sidebar, dan integrasi Bootstrap / Chart.js / DataTables.
- `styles.css` - Styling tampilan dan layout.
- `script.js` - Navigasi konten dinamis, kalkulasi nilai, chart, dan DataTables.

## Teknologi yang digunakan

### Frontend

- HTML5
- CSS3
- Bootstrap 5
- JavaScript ES6
- AJAX (simulasi dengan jQuery Deferred)
- DataTables
- Chart.js

### Backend

- Laravel 11 (PHP 8.3) - placeholder, belum terimplementasi di repositori ini

### Database

- MySQL 8 (placeholder)

### Keamanan

- Authentication Login (placeholder)
- Role Permission (placeholder)
- CSRF Protection (placeholder)
- Password Hashing (placeholder)
- Session Management (placeholder)
- Activity Log (placeholder)
