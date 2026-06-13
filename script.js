const menuLinks = document.querySelectorAll('.menu-link');
const sections = document.querySelectorAll('.page-section');
const sectionTitle = document.getElementById('section-title');
const sectionSubtitle = document.getElementById('section-subtitle');

const sectionDescriptions = {
  dashboard: 'Ringkasan sistem informasi sekolah dan aktivitas terbaru.',
  pendaftaran: 'Form PPDB lengkap dengan semua data calon siswa dan dokumen yang harus diunggah.',
  'data-pendaftar': 'Daftar calon siswa baru dengan status pendaftaran dan tindakan verifikasi.',
  verifikasi: 'Periksa kelengkapan berkas dan validasi data untuk setiap pendaftar.',
  'hasil-seleksi': 'Ringkasan hasil seleksi PPDB dan daftar calon yang lulus atau tidak lulus.',
  'data-siswa': 'Master data siswa dengan kemampuan tambah, edit, cari, dan export.',
  'data-guru': 'Data guru lengkap dengan mata pelajaran, status, dan informasi kontak.',
  'data-kelas': 'Kelola kelas, wali kelas, jurusan, dan jumlah siswa per kelas.',
  'mata-pelajaran': 'Daftar mata pelajaran, kode mapel, KKM, dan guru pengampu.',
  'jadwal-pelajaran': 'Jadwal pelajaran per kelas dengan tools generate dan cetak.',
  absensi: 'Rekap absensi harian, bulanan, dan persentase kehadiran siswa.',
  'input-nilai': 'Masukkan nilai tugas, ulangan, UTS, dan UAS dengan rumus otomatis.',
  'data-nilai': 'Data nilai siswa lengkap dengan nilai akhir dan kategori predikat.',
  rapor: 'Lihat dan cetak rapor siswa berdasarkan kelas dan semester.',
  'transkrip-nilai': 'Generate transkrip nilai untuk kepentingan kelulusan atau pindah sekolah.',
  spp: 'Kelola tagihan SPP siswa, periode, dan status pembayaran.',
  pembayaran: 'Catat transaksi pembayaran SPP dan periksa bukti pembayaran.',
  pemasukan: 'Kelola pemasukan sekolah dan total pendapatan setiap periode.',
  pengeluaran: 'Catat pengeluaran operasional dan buat rekap biaya sekolah.',
  buku: 'Data buku perpustakaan dengan status ketersediaan dan stok.',
  peminjaman: 'Kelola peminjaman buku siswa dengan status pinjam dan jatuh tempo.',
  pengembalian: 'Catat pengembalian buku dan histori transaksi perpustakaan.',
  'laporan-siswa': 'Laporan siswa per kelas, angkatan, atau jurusan.',
  'laporan-guru': 'Laporan guru, beban mengajar, dan distribusi mata pelajaran.',
  'laporan-nilai': 'Laporan nilai siswa untuk analisis pencapaian akademik.',
  'laporan-absensi': 'Laporan absensi siswa per bulan dan rekap kehadiran.',
  'laporan-ppdb': 'Laporan proses PPDB, daftar pendaftar, dan hasil seleksi.',
  'laporan-keuangan': 'Laporan keuangan sekolah meliputi pemasukan dan pengeluaran.',
  jurusan: 'Master data jurusan dengan kemampuan tambah, edit, dan hapus.',
  'tahun-ajaran': 'Atur tahun ajaran aktif dan rentang periode belajar.',
  semester: 'Kelola semester ganjil/genap untuk tahun ajaran yang berjalan.',
  pengguna: 'Kelola akun pengguna, peran, dan hak akses sistem.',
  'profil-sekolah': 'Update profil sekolah seperti nama, alamat, visi, dan misi.',
  'hak-akses': 'Atur hak akses pengguna berdasarkan peran dan modul.',
  'backup-database': 'Buat backup database dan lihat waktu backup terakhir.',
  'log-aktivitas': 'Audit aktivitas pengguna dan riwayat perubahan sistem.'
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

function computeFinalScore() {
  const tugas = Number(document.getElementById('nilai-tugas')?.value) || 0;
  const ulangan = Number(document.getElementById('nilai-ulangan')?.value) || 0;
  const uts = Number(document.getElementById('nilai-uts')?.value) || 0;
  const uas = Number(document.getElementById('nilai-uas')?.value) || 0;
  const finalScore = Math.round((tugas * 0.3 + ulangan * 0.3 + uts * 0.2 + uas * 0.2) * 10) / 10;
  const kategori = finalScore >= 90 ? 'A' : finalScore >= 80 ? 'B' : finalScore >= 70 ? 'C' : finalScore >= 60 ? 'D' : 'E';

  const categoryInput = document.getElementById('kategori-nilai');
  if (categoryInput) {
    categoryInput.value = finalScore ? kategori : '';
  }

  const finalScoreDisplay = document.getElementById('nilai-akhir');
  if (finalScoreDisplay) {
    finalScoreDisplay.textContent = finalScore ? finalScore.toFixed(1) : '-';
  }
}

menuLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const sectionId = link.dataset.section;
    setActiveSection(sectionId);
    history.pushState({ section: sectionId }, '', `#${sectionId}`);
  });
});

['nilai-tugas', 'nilai-ulangan', 'nilai-uts', 'nilai-uas'].forEach((id) => {
  const input = document.getElementById(id);
  if (input) {
    input.addEventListener('input', computeFinalScore);
  }
});

window.addEventListener('popstate', (event) => {
  let sectionId = event.state?.section || window.location.hash.replace('#', '') || 'dashboard';
  if (!document.getElementById(sectionId)) {
    sectionId = 'dashboard';
  }
  setActiveSection(sectionId);
});

let initialSection = window.location.hash.replace('#', '') || 'dashboard';
if (!document.getElementById(initialSection)) {
  initialSection = 'dashboard';
}
setActiveSection(initialSection);
