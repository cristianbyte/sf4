import { test, describe } from 'node:test';
import assert from 'node:assert';
import request from 'supertest';
import app from '../index.js';

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
    test('Get all votes (200)', async () => {
        const response = await request(app).get('/api/vote');
        assert.strictEqual(response.status, 200);
        assert.ok(Array.isArray(response.body.col));
        assert.ok(Array.isArray(response.body.foreign));
    });

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
        userUUID = response.body.userId;
        assert.strictEqual(response.status, 200);
    });

    test('GET votes with login (200)', async () => {
        const response = await request(app)
            .get(`/api/vote/` + userUUID)
            .set('Cookie', cookie);

        assert.strictEqual(response.status, 200);
    });

    test('POST vote with login (201)', async () => {
        const response = await request(app)
            .post('/api/vote')
            .set('Cookie', cookie)
            .send({ userId: userUUID, ...voteTest });

        assert.strictEqual(response.status, 201);
        assert.strictEqual(response.body.fighterName, voteTest.fighterName);
        assert.strictEqual(response.body.location, voteTest.location);
        assert.strictEqual(response.body.isForeign, voteTest.isForeign);
    });

    test('POST the same vote again ERROR (409)', async () => {
        const response = await request(app)
            .post('/api/vote')
            .set('Cookie', cookie)
            .send({ userId: userUUID, ...voteTest });
        assert.strictEqual(response.status, 409);
        assert.strictEqual(response.body.message, 'You have already voted for this fighter');
    });

    test('POST vote for opponent UPDATE (200)', async () => {
        const response = await request(app)
            .post('/api/vote')
            .set('Cookie', cookie)
            .send({ userId: userUUID, fighterName: 'Karely', location: 'CO-ANT', isForeign: false });
        assert.strictEqual(response.status, 200);
        assert.strictEqual(response.body.message, 'Vote updated');
    });

    test('PORT vote with wrong location (400)', async () => {
        const response = await request(app)
            .post('/api/vote')
            .set('Cookie', cookie)
            .send({ userId: userUUID, fighterName: 'Karely', location: 'HH', isForeign: true });

        assert.strictEqual(response.status, 400);
        assert.ok(response.body.hasOwnProperty('error'));
    });

    test('POST vote with wrong fighterName (400)', async () => {
        const response = await request(app)
            .post('/api/vote')
            .set('Cookie', cookie)
            .send({ userId: userUUID, fighterName: 'InvalidFighter', location: 'CO-ANT', isForeign: false });

        assert.strictEqual(response.status, 400);
        assert.ok(response.body.hasOwnProperty('error'));
    });

    test('POST vote with wrong data (400)', async () => {
        const response = await request(app)
            .post('/api/vote')
            .set('Cookie', cookie)
            .send({ userId: userUUID, fighterName: 'Karina', location: 'CO-ANT', isForeign: true });

        assert.strictEqual(response.status, 400);
        assert.ok(response.body.hasOwnProperty('error'));
    })
});