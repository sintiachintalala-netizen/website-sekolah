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

  const finalScoreInput = document.getElementById('nilai-akhir');
  if (finalScoreInput) {
    finalScoreInput.value = finalScore ? finalScore.toFixed(1) : '';
  }
}

function createChart(ctx, type, labels, data, label, color) {
  return new Chart(ctx, {
    type,
    data: {
      labels,
      datasets: [{
        label,
        data,
        fill: type === 'line',
        backgroundColor: type === 'bar' ? color.background : `${color.background}`,
        borderColor: color.border,
        borderWidth: 2,
        tension: 0.4,
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
      },
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}

function initializeCharts() {
  const attendanceCtx = document.getElementById('attendanceChart');
  const gradeCtx = document.getElementById('gradeChart');
  const registrationCtx = document.getElementById('registrationChart');
  const graduationCtx = document.getElementById('graduationChart');

  if (attendanceCtx) {
    createChart(attendanceCtx, 'line', ['Sen', 'Sel', 'Rab', 'Kam', 'Jum'], [90, 92, 91, 93, 92], 'Kehadiran', {
      background: 'rgba(14, 165, 233, 0.2)',
      border: '#0ea5e9'
    });
  }

  if (gradeCtx) {
    createChart(gradeCtx, 'bar', ['Jan', 'Feb', 'Mar', 'Apr', 'Mei'], [85, 88, 84, 90, 87], 'Nilai Rata-rata', {
      background: 'rgba(16, 185, 129, 0.2)',
      border: '#10b981'
    });
  }

  if (registrationCtx) {
    createChart(registrationCtx, 'line', ['Jan', 'Feb', 'Mar', 'Apr', 'Mei'], [120, 130, 140, 150, 160], 'Pendaftaran', {
      background: 'rgba(251, 191, 36, 0.2)',
      border: '#fbbf24'
    });
  }

  if (graduationCtx) {
    createChart(graduationCtx, 'bar', ['2021', '2022', '2023', '2024', '2025'], [75, 78, 82, 85, 88], 'Persentase Lulus', {
      background: 'rgba(236, 72, 153, 0.2)',
      border: '#ec4899'
    });
  }
}

function initializeDataTables() {
  if (window.jQuery && $.fn.DataTable) {
    $('.table').DataTable({
      responsive: true,
      pageLength: 5,
      lengthChange: false,
      searching: true,
      info: false,
    });
  }
}

function loadPendaftarData() {
  return $.Deferred((defer) => {
    setTimeout(() => {
      defer.resolve([
        { no: 'PPDB-001', nama: 'Alya Putri', jurusan: 'Teknik Informatika', asal: 'SMPN 5', status: 'Menunggu' },
        { no: 'PPDB-002', nama: 'Rafi Hidayat', jurusan: 'Akuntansi', asal: 'SMPN 2', status: 'Diterima' },
        { no: 'PPDB-003', nama: 'Dina Rahma', jurusan: 'Administrasi Perkantoran', asal: 'SMPN 8', status: 'Ditolak' }
      ]);
    }, 400);
  }).promise();
}

function renderPendaftarTable(data) {
  const tbody = $('#data-pendaftar tbody');
  if (!tbody.length) {
    return;
  }

  const rows = data.map((item) => `
    <tr>
      <td>${item.no}</td>
      <td>${item.nama}</td>
      <td>${item.jurusan}</td>
      <td>${item.asal}</td>
      <td><span class="status-chip ${item.status === 'Diterima' ? 'status-approved' : item.status === 'Menunggu' ? 'status-pending' : ''}">${item.status}</span></td>
    </tr>
  `).join('');

  tbody.html(rows);
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

window.addEventListener('load', () => {
  initializeCharts();
  initializeDataTables();
  loadPendaftarData().then(renderPendaftarTable);
});

let initialSection = window.location.hash.replace('#', '') || 'dashboard';
if (!document.getElementById(initialSection)) {
  initialSection = 'dashboard';
}
setActiveSection(initialSection);
