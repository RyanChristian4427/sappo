import request from 'supertest';
import {app} from 'src/app';

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

describe('POST /api/v1/users/login', () => {
    const data = {
        abundance: 0,
        coordinates: [0,0],
        datetimestamp: '',
        file: '',
        species: '',
        temperature: 0,
        text: 'Hello world!',
        username: 'Smoke Test',
    };
    it('should return 204 No Content', async () => {
        const response = await request(app)
            .post('/api/v1/message')
            .send(data);
        return (
            expect(response.status).toBe(204)
        );
    });
});


