# Employee Management App

Mini project - Employee Management (Angular)

Repo: https://github.com/tijianinabilahansa-eng/miniproject

## Ringkasan
Aplikasi web sederhana untuk pengelolaan data karyawan (login hard-coded, daftar employee, tambah employee, detail employee). Dibangun dengan Angular 18, responsive, dan menggunakan Tailwind CSS untuk styling.

## Requirements (Environment)
- Node.js 18.x atau lebih baru
- npm 9.x atau lebih baru
- Git

## Setup (lokal)
1. Clone repo:

```bash
git clone https://github.com/tijianinabilahansa-eng/miniproject.git
cd miniproject
```

2. Install dependencies:

```bash
npm ci
```

3. Jalankan dev server:

```bash
npm start
```

- Jika port 4200 sedang digunakan, Angular CLI akan menanyakan untuk menggunakan port lain.
- Akses aplikasi di `http://localhost:4200/` (atau port alternatif yang ditampilkan).

4. Build produksi:

```bash
npm run build
```

5. Test (unit):

```bash
npm test
```

## Login
- Username: `admin`
- Password: `password123`

(Autentikasi di-hardcode di `src/app/services/auth.service.ts`)

## Fitur
- Login protected route
- Employee list: paging, sorting, searching (username/name/email + group + status), rows-per-page
- Add employee: semua field wajib, `birthDate` dan `description` menggunakan datetime picker, validasi email dan numeric salary
- Employee detail: format tanggal dan salary (IDR)

## CI & Deploy
- Ada GitHub Actions workflow: `.github/workflows/ci-deploy.yml` yang menjalankan typecheck, build, tests, dan deploy ke GitHub Pages (`gh-pages`) pada branch `main`.

## Tailwind
- Tailwind telah dikonfigurasi via `tailwind.config.cjs` dan `postcss.config.cjs`. Styles utama berada di `src/styles.scss`.

## Catatan
- Code dibuat untuk memenuhi spesifikasi assessment — feel free to open issues or request UI/accessibility polish.

---

Jika Anda mau, saya bisa:
- Menyelesaikan UI polish / accessibility tweaks
- Menambahkan e2e tests
- Men-autodeploy ke Vercel sebagai alternatif
