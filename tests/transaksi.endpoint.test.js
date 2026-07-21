const request = require('supertest');
const app = require('../src/index');
const db = require('../src/db');

jest.mock('../src/db');

describe('Pengujian Endpoint Transaksi', () => {
    it('Harus bisa mengambil daftar transaksi (status 200)', async () => {
        // Data palsu untuk simulasi
        const mockData = [{ id: 1, nama_transaksi: 'Gaji', jenis_transaksi: 'pemasukan', jumlah: 5000000 }];
        db.query.mockResolvedValue([mockData]);

        const res = await request(app).get('/api/transaksi');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
        expect(res.body[0].nama_transaksi).toBe('Gaji');
    });
});