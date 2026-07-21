const express = require('express');
const cors = require('cors');
const db = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// 1. ENDPOINT HEALTH CHECK (Syarat Wajib UAS)
app.get('/health', async (req, res) => {
    try {
        await db.query('SELECT 1');
        res.status(200).json({ status: 'ok', db: 'connected', timestamp: new Date().toISOString() });
    } catch (error) {
        res.status(500).json({ status: 'error', db: 'disconnected', error: error.message });
    }
});

// 2. CREATE: Menambah data transaksi baru (Termasuk Validasi Input)
app.post('/api/transaksi', async (req, res) => {
    const { nama_transaksi, jenis_transaksi, jumlah, tanggal } = req.body;
    
    // Validasi Input Sederhana
    if (!nama_transaksi || !jenis_transaksi || !jumlah || !tanggal) {
        return res.status(400).json({ error: 'Semua kolom wajib diisi!' });
    }

    try {
        const [result] = await db.query(
            'INSERT INTO transaksi (nama_transaksi, jenis_transaksi, jumlah, tanggal) VALUES (?, ?, ?, ?)',
            [nama_transaksi, jenis_transaksi, jumlah, tanggal]
        );
        res.status(201).json({ message: 'Transaksi berhasil ditambahkan', id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 3. READ: Menampilkan semua data transaksi
app.get('/api/transaksi', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM transaksi ORDER BY tanggal DESC');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 4. UPDATE: Mengubah data transaksi
app.put('/api/transaksi/:id', async (req, res) => {
    const { id } = req.params;
    const { nama_transaksi, jenis_transaksi, jumlah, tanggal } = req.body;
    try {
        await db.query(
            'UPDATE transaksi SET nama_transaksi=?, jenis_transaksi=?, jumlah=?, tanggal=? WHERE id=?',
            [nama_transaksi, jenis_transaksi, jumlah, tanggal, id]
        );
        res.status(200).json({ message: 'Transaksi berhasil diperbarui' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 5. DELETE: Menghapus data transaksi
app.delete('/api/transaksi/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM transaksi WHERE id=?', [id]);
        res.status(200).json({ message: 'Transaksi berhasil dihapus' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Menjalankan Server
const PORT = process.env.APP_PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server Keuangan berjalan di port ${PORT}`);
});

module.exports = app; // Diekspor untuk kebutuhan automated testing nantinya