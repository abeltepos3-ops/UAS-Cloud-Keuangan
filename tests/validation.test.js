const request = require('supertest');
const app = require('../src/index');

describe('Pengujian Validasi Input Transaksi', () => {
    it('Harus menolak input (status 400) jika data ada yang kosong', async () => {
        const res = await request(app)
            .post('/api/transaksi')
            .send({
                nama_transaksi: 'Beli Makan Siang'
                // sengaja tidak mengirim jenis_transaksi, jumlah, dan tanggal
            });
            
        expect(res.statusCode).toEqual(400);
        expect(res.body.error).toBe('Semua kolom wajib diisi!');
    });
});