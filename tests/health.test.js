const request = require('supertest');
const app = require('../src/index');
const db = require('../src/db');

// Memalsukan (mock) koneksi database agar tes bisa berjalan mandiri tanpa butuh database asli
jest.mock('../src/db'); 

describe('Pengujian Endpoint Health Check', () => {
    it('Harus mengembalikan status 200 dan pesan db connected', async () => {
        // Asumsikan database merespons dengan baik
        db.query.mockResolvedValue([[{ 1: 1 }]]); 
        
        const res = await request(app).get('/health');
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toBe('SENGAJA_SALAH');
        expect(res.body.db).toBe('connected');
    });
});