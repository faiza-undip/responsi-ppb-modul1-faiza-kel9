import { ItemModel } from "../models/itemModel.js";

export const ItemController = {
  // Get all items or filter by status
  async getAll(req, res) {
    try {
      const { status } = req.query;
      const items = await ItemModel.getAll(status);
      
      res.status(200).json({
        success: true,
        count: items.length,
        data: items
      });
    } catch (err) {
      res.status(500).json({ 
        success: false,
        error: err.message 
      });
    }
  },

  // Get item by ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const item = await ItemModel.getById(id);
      
      res.status(200).json({
        success: true,
        data: item
      });
    } catch (err) {
      res.status(404).json({ 
        success: false,
        error: err.message 
      });
    }
  },

  // Create new item
  async create(req, res) {
    try {
      const { nama, status, tanggalMasuk, tanggalSelesai } = req.body;

      // Validasi input
      if (!nama || !status || !tanggalMasuk) {
        return res.status(400).json({
          success: false,
          message: "Field nama, status, dan tanggalMasuk wajib diisi"
        });
      }

      const newItem = {
        nama,
        status,
        tanggalmasuk: tanggalMasuk,
        tanggalselesai: tanggalSelesai || "-"
      };

      const item = await ItemModel.create(newItem);
      
      res.status(201).json({
        success: true,
        message: "Data sepatu berhasil ditambahkan",
        data: item
      });
    } catch (err) {
      res.status(400).json({ 
        success: false,
        error: err.message 
      });
    }
  },

  // Update item
  async update(req, res) {
    try {
      const { id } = req.params;
      const { nama, status, tanggalMasuk, tanggalSelesai } = req.body;

      // Siapkan data update
      const updateData = {};
      if (nama !== undefined) updateData.nama = nama;
      if (status !== undefined) updateData.status = status;
      if (tanggalMasuk !== undefined) updateData.tanggalmasuk = tanggalMasuk;
      if (tanggalSelesai !== undefined) updateData.tanggalselesai = tanggalSelesai;

      const item = await ItemModel.update(id, updateData);
      
      res.status(200).json({
        success: true,
        message: "Status sepatu berhasil diperbarui",
        data: item
      });
    } catch (err) {
      res.status(400).json({ 
        success: false,
        error: err.message 
      });
    }
  },

  // Delete item
  async remove(req, res) {
    try {
      const { id } = req.params;
      const result = await ItemModel.remove(id);
      
      res.status(200).json({
        success: true,
        message: "Data sepatu berhasil dihapus"
      });
    } catch (err) {
      res.status(400).json({ 
        success: false,
        error: err.message 
      });
    }
  }
};