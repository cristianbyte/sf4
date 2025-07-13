import { test, describe } from 'node:test';
import assert from 'node:assert';
import request from 'supertest';
import app from '../index.js';

let userId;
let cookie;
let userTest = {
    email: 'john.doe@example.com',
    password: 'Pass123s',
}

describe('User vote tests', () => {
    test('POST a vote without login (404)', async () => {
        const response = await request(app)
            .post('/api/vote')
            .send({
                name: 'JHdelaCruz',
                location: 'CO'
            });

        assert.strictEqual(response.status, 404);
    })

    test('LOGIN the user (200)', async () => {
        const response = await request(app)
            .post(`/api/user/login`)
            .send(userTest);

        cookie = response.headers['set-cookie']?.[0];
        userId = response.body.id;
        assert.strictEqual(response.status, 200);
    });

    test('GET votes with login (200)', async () => {
        const response = await request(app)
            .get(`/api/vote/` + userId)
            .set('Cookie', cookie);

        assert.strictEqual(response.status, 200);
    });

});