# REST API Daftar Barang Cuci Sepatu

![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![Express.js](https://img.shields.io/badge/Express.js-5.1-blue)
![Supabase](https://img.shields.io/badge/Supabase-Database-orange)
![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black)

* Link Deploy (Vercel): https://responsi-ppb-modul1-faiza-kel9.vercel.app/

## Deskripsi Umum

REST API untuk mengelola data sepatu yang sedang dicuci pada layanan jasa cuci sepatu. API ini dibuat menggunakan **Node.js** dan **Express.js** dengan database **Supabase**, dan di-deploy di **Vercel** untuk akses publik.

Proyek ini merupakan tugas responsi modul Pembuatan API dengan JavaScript yang bertujuan untuk mempermudah proses pencatatan, pemantauan, dan pembaruan status cucian sepatu secara digital.

## Tujuan

1. Mengimplementasikan konsep **CRUD** (Create, Read, Update, Delete) dalam REST API
2. Meningkatkan pemahaman penggunaan **Express.js** sebagai framework backend
3. Mengelola data menggunakan **Supabase** sebagai database cloud
4. Memisahkan logika aplikasi ke dalam **model, controller, dan router** untuk struktur kode yang terorganisir
5. Menghasilkan API yang terstruktur rapi, menggunakan variabel lingkungan, dan siap untuk di-deploy

## Fitur Utama API

| Metode HTTP | Endpoint        | Deskripsi                                                    |
| ----------- | --------------- | ------------------------------------------------------------ |
| GET         | `/`             | Menampilkan informasi API dan daftar endpoint                |
| GET         | `/api/items`    | Menampilkan seluruh daftar sepatu yang sedang dicuci         |
| GET         | `/api/items?status` | Filter sepatu berdasarkan status (Sedang Dicuci / Selesai)  |
| GET         | `/api/items/:id` | Menampilkan detail sepatu berdasarkan ID                     |
| POST        | `/api/items`    | Menambahkan data sepatu baru ke dalam daftar                 |
| PUT         | `/api/items/:id` | Memperbarui data sepatu (status, tanggal selesai, dll)       |
| DELETE      | `/api/items/:id` | Menghapus data sepatu dari database                          |

### Bonus Fitur

**Filter berdasarkan status**
```
GET /api/items?status=Selesai
GET /api/items?status=Sedang Dicuci
```

## Struktur Data

Setiap item sepatu memiliki struktur data sebagai berikut:

```json
{
  "id": 1,
  "nama": "Nike Air Force 1",
  "status": "Sedang Dicuci",
  "tanggalMasuk": "2025-10-08",
  "tanggalSelesai": "-",
  "created_at": "2025-10-22T10:30:00Z",
  "updated_at": "2025-10-22T10:30:00Z"
}
```

### Keterangan Field:

| Field           | Tipe Data | Deskripsi                                      |
| --------------- | --------- | ---------------------------------------------- |
| `id`            | Integer   | Nomor unik sepatu (auto increment)             |
| `nama`          | String    | Nama/merek sepatu pelanggan                    |
| `status`        | String    | Status proses ("Sedang Dicuci" / "Selesai")   |
| `tanggalMasuk`  | Date      | Tanggal sepatu diterima (format: YYYY-MM-DD)  |
| `tanggalSelesai`| String    | Tanggal sepatu selesai dicuci (atau "-")      |
| `created_at`    | Timestamp | Waktu data dibuat (otomatis)                   |
| `updated_at`    | Timestamp | Waktu data terakhir diupdate (otomatis)        |

## Teknologi yang Digunakan

- **Node.js** (v18.x) — Runtime environment untuk JavaScript di server
- **Express.js** (v5.1) — Framework web untuk membangun REST API
- **Supabase** — Database PostgreSQL cloud dengan fitur real-time
- **Vercel** — Platform deployment untuk hosting API
- **dotenv** — Manajemen environment variables

## Struktur Project (MVC Pattern)

```
api-cuci-sepatu/
│
├── src/
│   ├── config/
│   │   └── supabaseClient.js    # Konfigurasi koneksi Supabase
│   │
│   ├── models/
│   │   └── itemModel.js         # Model untuk interaksi dengan database
│   │
│   ├── controllers/
│   │   └── itemController.js    # Controller untuk logika bisnis
│   │
│   ├── routes/
│   │   └── itemRoutes.js        # Routing endpoint API
│   │
│   └── index.js                 # File utama server Express
│
├── .env                         # Environment variables (jangan di-push!)
├── .env.example                 # Template environment variables
├── .gitignore                   # File yang diabaikan Git
├── package.json                 # Dependencies dan scripts
├── vercel.json                  # Konfigurasi deployment Vercel
├── supabase-setup.sql          # Script SQL setup database
└── README.md                    # Dokumentasi project
```

## Instalasi dan Setup

### 1. Clone Repository

```bash
git clone https://github.com/username/api-cuci-sepatu.git
cd api-cuci-sepatu
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Supabase

#### a. Buat Akun dan Project
1. Buat akun di [Supabase](https://supabase.com)
2. Klik "New project" dan isi detail project
3. Tunggu hingga project selesai dibuat

#### b. Buat Tabel Database
1. Buka **SQL Editor** di dashboard Supabase
2. Klik **"+ New query"**
3. Salin dan jalankan script dari file `supabase-setup.sql`:

```sql
CREATE TABLE IF NOT EXISTS items (
  id SERIAL PRIMARY KEY,
  nama VARCHAR(255) NOT NULL,
  status VARCHAR(50) NOT NULL CHECK (status IN ('Sedang Dicuci', 'Selesai')),
  tanggalMasuk DATE NOT NULL,
  tanggalSelesai VARCHAR(20) DEFAULT '-',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

4. Klik **"RUN"** untuk mengeksekusi query

#### c. Setup Row Level Security (RLS)
Jalankan query berikut untuk mengaktifkan RLS dan membuat policy:

```sql
-- Enable RLS
ALTER TABLE items ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable all access for items" ON items
FOR ALL USING (true) WITH CHECK (true);
```

#### d. Dapatkan Kredensial API
1. Buka **Project Settings** → **API**
2. Salin **Project URL** dan **anon public key**
3. Simpan untuk digunakan di file `.env`

### 4. Konfigurasi Environment Variables

Buat file `.env` di root project:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-key-here
PORT=3000
```

> ⚠️ **PENTING:** Ganti `your-project` dan `your-anon-key-here` dengan kredensial Supabase Anda

### 5. Jalankan Server

**Development mode:**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

Server akan berjalan di `http://localhost:3000`

✅ Jika berhasil, akan muncul pesan:
```
Server running on port 3000
```

## 🚀 Deploy ke Vercel

### Langkah-langkah Deploy:

#### 1. Push ke GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/api-cuci-sepatu.git
git push -u origin main
```

#### 2. Deploy via Vercel Dashboard

1. Buka [Vercel Dashboard](https://vercel.com/dashboard)
2. Klik **"Add New..."** → **"Project"**
3. Import repository GitHub Anda
4. Vercel akan mendeteksi sebagai **Node.js project**
5. Pastikan **Root Directory** sesuai (biarkan default jika tidak ada subfolder)

#### 3. Tambahkan Environment Variables

Di bagian **Environment Variables**, tambahkan:

| Name | Value |
|------|-------|
| `SUPABASE_URL` | https://your-project.supabase.co |
| `SUPABASE_KEY` | your-anon-key-here |
| `PORT` | 3000 |

#### 4. Deploy

1. Klik **"Deploy"**
2. Tunggu proses build selesai (sekitar 1-2 menit)
3. Vercel akan memberikan URL publik seperti: `https://api-cuci-sepatu.vercel.app`

#### 5. Verifikasi Deployment

Test API dengan mengakses:
```
https://your-api-name.vercel.app/
https://your-api-name.vercel.app/api/items
```

## 📝 Contoh Request dan Response

### 1. GET `/` - Root Endpoint

**Request:**
```bash
curl https://api-cuci-sepatu.vercel.app/
```

**Response:**
```json
{
  "message": "Selamat datang di API Layanan Cuci Sepatu",
  "endpoints": {
    "GET /api/items": "Menampilkan semua daftar sepatu",
    "GET /api/items?status=Selesai": "Filter sepatu berdasarkan status",
    "GET /api/items/:id": "Menampilkan detail sepatu berdasarkan ID",
    "POST /api/items": "Menambahkan sepatu baru",
    "PUT /api/items/:id": "Memperbarui status sepatu",
    "DELETE /api/items/:id": "Menghapus data sepatu"
  }
}
```

### 2. GET `/api/items` - Menampilkan Semua Data

**Request:**
```bash
curl https://api-cuci-sepatu.vercel.app/api/items
```

**Response:**
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "id": 1,
      "nama": "Nike Air Force 1",
      "status": "Selesai",
      "tanggalMasuk": "2025-10-01",
      "tanggalSelesai": "2025-10-03",
      "created_at": "2025-10-22T10:30:00Z",
      "updated_at": "2025-10-22T10:30:00Z"
    },
    {
      "id": 2,
      "nama": "Adidas Superstar",
      "status": "Sedang Dicuci",
      "tanggalMasuk": "2025-10-08",
      "tanggalSelesai": "-",
      "created_at": "2025-10-22T11:00:00Z",
      "updated_at": "2025-10-22T11:00:00Z"
    }
  ]
}
```

### 3. GET `/api/items?status=Selesai` - Filter berdasarkan Status

**Request:**
```bash
curl https://api-cuci-sepatu.vercel.app/api/items?status=Selesai
```

**Response:**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "id": 1,
      "nama": "Nike Air Force 1",
      "status": "Selesai",
      "tanggalMasuk": "2025-10-01",
      "tanggalSelesai": "2025-10-03"
    },
    {
      "id": 3,
      "nama": "Converse Chuck Taylor",
      "status": "Selesai",
      "tanggalMasuk": "2025-10-05",
      "tanggalSelesai": "2025-10-07"
    }
  ]
}
```

### 4. GET `/api/items/:id` - Detail Sepatu

**Request:**
```bash
curl https://api-cuci-sepatu.vercel.app/api/items/1
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "nama": "Nike Air Force 1",
    "status": "Selesai",
    "tanggalMasuk": "2025-10-01",
    "tanggalSelesai": "2025-10-03",
    "created_at": "2025-10-22T10:30:00Z",
    "updated_at": "2025-10-22T10:30:00Z"
  }
}
```

### 5. POST `/api/items` - Menambahkan Data Baru

**Request:**
```bash
curl -X POST https://api-cuci-sepatu.vercel.app/api/items \
  -H "Content-Type: application/json" \
  -d '{
    "nama": "Converse Chuck Taylor",
    "status": "Sedang Dicuci",
    "tanggalMasuk": "2025-10-10",
    "tanggalSelesai": "-"
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "Data sepatu berhasil ditambahkan",
  "data": {
    "id": 6,
    "nama": "Converse Chuck Taylor",
    "status": "Sedang Dicuci",
    "tanggalMasuk": "2025-10-10",
    "tanggalSelesai": "-",
    "created_at": "2025-10-22T12:00:00Z",
    "updated_at": "2025-10-22T12:00:00Z"
  }
}
```

### 6. PUT `/api/items/:id` - Update Status

**Request:**
```bash
curl -X PUT https://api-cuci-sepatu.vercel.app/api/items/6 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "Selesai",
    "tanggalSelesai": "2025-10-12"