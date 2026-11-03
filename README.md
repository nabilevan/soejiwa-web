# Kedai Soejiwa — Absensi & Jadwal Pegawai

Implementasi frontend React + Vite yang dibuat berdasarkan desain referensi Kedai Soejiwa (15 halaman PDF yang diberikan). Desain pegawai menggunakan kanvas mobile, sedangkan area manajer menggunakan dashboard desktop yang responsif.

## Menjalankan project

Persyaratan: Node.js 20.19+ atau 22.12+.

```bash
npm install
npm run dev
```

Buka alamat lokal yang ditampilkan Vite di terminal.

Untuk membuat build produksi:

```bash
npm run build
npm run preview
```

## Akses demo

Halaman login menyediakan dua tombol demo tanpa perlu kredensial. Jika ingin mencoba form login:

| Peran | Username | PIN demo |
|---|---|---|
| Pegawai | `aeesha` | `12345678` |
| Manajer/HRD | `ramadhan` | `12345678` |

## Cakupan halaman

### Pegawai
- Masuk
- Beranda dan ringkasan shift
- Jadwal mingguan dan kalender bulanan
- Pengajuan izin
- Riwayat absensi
- Pengajuan tukar shift
- Status tukar shift

### Manajer/HRD
- Ringkasan kehadiran dan permohonan
- Jadwal seluruh pegawai
- Rekap absensi dan unduh CSV
- Daftar, pencarian, filter, detail, serta keputusan permohonan izin

## Catatan implementasi

- Ini adalah **frontend prototype dengan data demo**. Belum ada API, database, autentikasi sungguhan, penyimpanan permanen, validasi lokasi absensi, atau alur persetujuan lintas akun.
- Aksi yang mengubah data hanya mengubah state di browser selama sesi berjalan.
- Tanggal, nama pegawai, shift, angka, dan teks mengikuti materi desain yang diberikan; tidak ditafsirkan sebagai data operasional nyata.
- File PDF desain asli tidak digabungkan ke dalam source ZIP. Gunakan PDF tersebut sebagai acuan saat melakukan pemeriksaan visual lanjutan.
