const menuLinks = document.querySelectorAll('.menu-link');
const sections = document.querySelectorAll('.page-section');
const sectionTitle = document.getElementById('section-title');
const sectionSubtitle = document.getElementById('section-subtitle');

const sectionDescriptions = {
  dashboard: 'Ringkasan sistem informasi sekolah dan aktivitas terbaru.',
  pendaftaran: 'Kelola pendaftaran peserta didik baru, formulir, dan pengajuan data pendaftaran.',
  'data-pendaftar': 'Lihat daftar pendaftar, status, dan informasi detail calon siswa.',
  verifikasi: 'Verifikasi dokumen pendaftaran dan validasi data peserta didik baru.',
  'hasil-seleksi': 'Tampilkan hasil seleksi PPDB dan pengumuman peserta yang diterima.',
  'data-siswa': 'Kelola profil siswa, riwayat kelas, dan informasi akademik.',
  'data-guru': 'Kelola data guru, mata pelajaran yang diampu, dan kontak.',
  'data-kelas': 'Atur kelas, wali kelas, dan komposisi siswa setiap periode.',
  'mata-pelajaran': 'Kelola daftar mata pelajaran dan alokasi jam pelajaran.',
  'jadwal-pelajaran': 'Buat dan atur jadwal pelajaran untuk setiap kelas dan semester.',
  absensi: 'Catat kehadiran siswa dan pantau rekap absensi bulanan.',
  'input-nilai': 'Masukkan nilai siswa untuk penilaian harian, ulangan, dan tugas.',
  'data-nilai': 'Lihat dan kelola nilai akademik siswa secara lengkap.',
  rapor: 'Cetak rapor siswa dan lihat ringkasan perkembangan belajar.',
  'transkrip-nilai': 'Hasil transkrip nilai untuk siswa yang pindah atau lulus.',
  spp: 'Atur besaran SPP, jadwal pembayaran, dan informasi tagihan siswa.',
  pembayaran: 'Catat transaksi pembayaran SPP dan konfirmasi pembayaran masuk.',
  pemasukan: 'Kelola semua pemasukan sekolah dan rekonsiliasi anggaran.',
  pengeluaran: 'Catat pengeluaran operasional dan kebutuhan sekolah.',
  buku: 'Kelola daftar buku perpustakaan dan ketersediaan judul.',
  peminjaman: 'Atur peminjaman buku siswa dan durasi pengembalian.',
  pengembalian: 'Kelola pengembalian buku perpustakaan dan histori transaksi.',
  'laporan-siswa': 'Ekspor laporan siswa per kelas atau angkatan.',
  'laporan-guru': 'Ekspor laporan guru dan distribusi beban mengajar.',
  'laporan-nilai': 'Lihat laporan nilai siswa dan tren pencapaian akademik.',
  'laporan-absensi': 'Laporan absensi siswa secara per bulan dan persentase kehadiran.',
  'laporan-ppdb': 'Laporan proses pendaftaran siswa baru dan hasil seleksi.',
  'laporan-keuangan': 'Laporan pemasukan dan pengeluaran untuk akuntabilitas sekolah.',
  jurusan: 'Atur daftar jurusan yang tersedia di sekolah.',
  'tahun-ajaran': 'Kelola periode tahun ajaran dan status tahun berjalan.',
  semester: 'Atur semester ganjil dan genap untuk tahun ajaran aktif.',
  pengguna: 'Kelola akun pengguna, peran, dan hak akses sistem.',
  'profil-sekolah': 'Edit informasi sekolah seperti nama, alamat, dan visi misi.',
  'hak-akses': 'Atur hak akses menu dan peran pengguna sistem.',
  'backup-database': 'Jadwalkan backup database dan unduh salinan data.',
  'log-aktivitas': 'Pantau aktivitas pengguna dan audit sistem.'
};

function setActiveSection(sectionId) {
  sections.forEach((section) => {
    section.classList.toggle('active', section.id === sectionId);
  });

  menuLinks.forEach((link) => {
    link.classList.toggle('active', link.dataset.section === sectionId);
  });

  sectionTitle.textContent = sectionId
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  sectionSubtitle.textContent = sectionDescriptions[sectionId] || 'Informasi detail untuk modul ini.';
}

menuLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const sectionId = link.dataset.section;
    setActiveSection(sectionId);
    history.pushState({ section: sectionId }, '', `#${sectionId}`);
  });
});

window.addEventListener('popstate', (event) => {
  const sectionId = event.state?.section || window.location.hash.replace('#', '') || 'dashboard';
  setActiveSection(sectionId);
});

const initialSection = window.location.hash.replace('#', '') || 'dashboard';
setActiveSection(initialSection);
