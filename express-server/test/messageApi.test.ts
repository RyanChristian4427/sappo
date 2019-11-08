import request from 'supertest';
import app from '../src/app';

describe('GET /api/v1/messages', () => {
    it('should return 200 OK', async () => {
        const response = await request(app).get('/api/v1/messages');
        return expect(response.status).toBe(200);
    });
});

describe('GET /api/v1/messages', () => {
    it('should return 1 result with username "Sample Data 1"', async () => {
        const response = await request(app).get('/api/v1/messages');
        return (): void => {
            const responseText = JSON.parse(response.text);
            expect(responseText.length).toBe(1);
            expect(responseText.username).toBe('Sample Data 1');
        };
    });
});

describe('POST /api/v1/message', () => {
    it('should be able to post message', async () => {
        const response = await request(app).post('/api/v1/message')
            .field('abundance', 0)
            .field('coordinates', [0,0])
            .field('datetimestamp', '')
            .field('file', '')
            .field('species', '')
            .field('temperature', 0)
            .field('text', 'Hello World 2!')
            .field('username', 'Sample Data 1');
        return expect(response.status).toBe(200);
    });
});

