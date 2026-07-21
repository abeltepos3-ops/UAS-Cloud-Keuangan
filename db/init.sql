CREATE DATABASE IF NOT EXISTS keuangan_db;
USE keuangan_db;

CREATE TABLE IF NOT EXISTS transaksi (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama_transaksi VARCHAR(255) NOT NULL,
    jenis_transaksi ENUM('pemasukan', 'pengeluaran') NOT NULL,
    jumlah INT NOT NULL,
    tanggal DATE NOT NULL
);

-- Memasukkan satu data awal sebagai contoh
INSERT INTO transaksi (nama_transaksi, jenis_transaksi, jumlah, tanggal) 
VALUES ('Modal Awal', 'pemasukan', 5000000, '2026-07-21');