# 🥗 Backend Prediksi Gizi - Express.js & MySQL

Sistem backend untuk aplikasi prediksi status gizi menggunakan Node.js, Express, dan MySQL. Proyek ini menyediakan API untuk mengelola data pengguna, data gizi, dan hasil prediksi berbasis data antropometri seperti berat badan, tinggi badan, usia, dan status imunisasi.

---

## 🚀 Fitur Utama

- ✅ Autentikasi pengguna (Login & Register)
- 📊 Manajemen data input antropometri
- 🤖 Prediksi status gizi berdasarkan data antropometri
- 🗄️ Integrasi dengan database MySQL
- 🌐 RESTful API

---

## 🛠️ Teknologi

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MySQL](https://www.mysql.com/)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [jsonwebtoken (JWT)](https://www.npmjs.com/package/jsonwebtoken)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [cors](https://www.npmjs.com/package/cors)
- [morgan](https://www.npmjs.com/package/morgan)

---

## 📂 Struktur Proyek

```
backend-prediksi-gizi/
├── config/           # Konfigurasi database (MySQL)
├── controllers/      # Logika endpoint API
├── models/           # Model Sequelize (jika pakai ORM)
├── routes/           # Routing API
├── middleware/       # Middleware autentikasi dll
├── .env              # Variabel lingkungan
├── app.js            # Inisialisasi aplikasi
├── package.json
└── README.md
```

---

## ⚙️ Instalasi & Setup

### 1. Clone Repository

```bash
git clone https://github.com/capstone-project-coding-camp/Backend-capstone-project.git
cd backend-prediksi-gizi
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Konfigurasi Environment

Buat file `.env` di root direktori:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=prediksi_gizi
JWT_SECRET=your_jwt_secret
```

### 4. Setup Database

Pastikan MySQL sudah berjalan, lalu:

- Buat database `prediksi_gizi`
- Jika menggunakan Sequelize:

```bash
npx sequelize db:migrate
npx sequelize db:seed:all
```

### 5. Jalankan Server

```bash
npm run dev
```

Server akan berjalan di: [http://localhost:3000](http://localhost:3000)

---

## 🔌 Contoh Endpoint API

| Method | Endpoint             | Deskripsi                    |
|--------|----------------------|------------------------------|
| POST   | `/api/auth/register` | Registrasi pengguna          |
| POST   | `/api/auth/login`    | Login pengguna               |
| GET    | `/api/prediksi`      | Ambil semua data prediksi    |
| POST   | `/api/prediksi`      | Kirim data untuk prediksi    |
| GET    | `/api/user/profile`  | Ambil data profil pengguna   |

---

## 🧪 Contoh Data Input Prediksi

```json
{
  "nama": "Ani",
  "usia": 5,
  "jenis_kelamin": "Perempuan",
  "berat_badan": 14.2,
  "tinggi_badan": 98.5
}
```

---

## 📢 Catatan

- Jangan lupa untuk mengganti `your_password` dan `your_jwt_secret` di file `.env` sesuai kebutuhan Anda.
- Endpoint prediksi dapat disesuaikan dengan algoritma atau model klasifikasi yang Anda gunakan di sisi backend.

---
