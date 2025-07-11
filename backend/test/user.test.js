import { test, describe } from 'node:test';
import assert from 'node:assert';
import request from 'supertest';
import app from '../index.js';

describe('POST /api/user/login', () => {
  test('should return 200 and a token if credentials are valid', async () => {
    const response = await request(app)
      .post('/api/user/login')
      .send({
        email: 'john.doe@example.com',
        password: 'Pass123s'
      });

    assert.strictEqual(response.statusCode, 200);
    assert.ok(response.body.hasOwnProperty('id'));
  });

  test('should return 400 if credentials are invalid', async () => {
    const response = await request(app)
      .post('/api/user/login')
      .send({
        email: 'camile@example.com',
        password: 'wrongpass'
      });

    assert.strictEqual(response.statusCode, 400);
    assert.ok(response.body.hasOwnProperty('error'));
  });
});