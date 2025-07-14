import { test, describe } from 'node:test';
import assert from 'node:assert';
import request from 'supertest';
import app from '../index.js';
import user from '../src/routes/user.js';

let userUUID;
let cookie;
let userTest = {
    email: 'john.doe@example.com',
    password: 'Pass123s',
}
let voteTest = {
    fighterName: 'Karina',
    location: 'CO-ANT',
    isForeign: false
};

describe('User vote tests', () => {
    test('POST a vote without login (400)', async () => {
        const response = await request(app)
            .post('/api/vote')
            .send({
                fighterName: 'JHdelaCruz',
                location: 'CO-ANT',
                isForeign: false,
                userId: 'aabd4926-facf-46b0-aa7b-dacfaaefb3ff'
            });

        assert.strictEqual(response.status, 400);
    })

    test('LOGIN the user (200)', async () => {
        const response = await request(app)
            .post(`/api/user/login`)
            .send(userTest);

        cookie = response.headers['set-cookie']?.[0];
        userUUID = response.body.id;
        assert.strictEqual(response.status, 200);
    });

    test('GET votes with login (200)', async () => {
        const response = await request(app)
            .get(`/api/vote/` + userUUID)
            .set('Cookie', cookie);

        assert.strictEqual(response.status, 200);
    });

    test('POST a vote with login (201)', async () => {
        const response = await request(app)
            .post('/api/vote')
            .set('Cookie', cookie)
            .send({ userId: userUUID, ...voteTest });

        assert.strictEqual(response.status, 201);
        assert.strictEqual(response.body.fighterName, voteTest.fighterName);
        assert.strictEqual(response.body.location, voteTest.location);
        assert.strictEqual(response.body.isForeign, voteTest.isForeign);
    });
});