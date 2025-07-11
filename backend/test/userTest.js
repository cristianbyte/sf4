import request from 'supertest';
import app from '../index.js'; // Tu servidor Express

describe('POST /api/user/login', () => {
  it('should return 200 and a token if credentials are valid', async () => {
    const response = await request(app)
      .post('/api/user/login')
      .send({
        email: 'john.doe@example.com',
        password: 'Pass123s'
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('access');
  });

  it('should return 400 if credentials are invalid', async () => {
    const response = await request(app)
      .post('/api/user/login')
      .send({
        email: 'wrong@example.com',
        password: 'wrongpass'
      });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
});
