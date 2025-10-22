import express from "express";
import dotenv from "dotenv";
import itemRoutes from "./routes/itemRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Selamat datang di API Layanan Cuci Sepatu",
    endpoints: {
      "GET /api/items": "Menampilkan semua daftar sepatu",
      "GET /api/items?status=Selesai": "Filter sepatu berdasarkan status",
      "GET /api/items/:id": "Menampilkan detail sepatu berdasarkan ID",
      "POST /api/items": "Menambahkan sepatu baru",
      "PUT /api/items/:id": "Memperbarui status sepatu",
      "DELETE /api/items/:id": "Menghapus data sepatu"
    }
  });
});

app.use("/api/items", itemRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});