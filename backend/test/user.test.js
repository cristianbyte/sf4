import { test, describe } from 'node:test';
import assert from 'node:assert';
import request from 'supertest';
import app from '../index.js';
import user from '../src/routes/user.js';

let userIdTest;
let cookie;
let userTest = {
  name: 'Camile',
  email: 'camile@example.com',
  password: 'passStrong67',
}
let fakeUserName = {
  name: '<br>alert("x")</br>',
  email: 'fake@email.com',
  password: 'passStrong67',
}

describe('User login and deletion tests', () => {

  test('CREATE a user (201)', async () => {
    const response = await request(app)
      .post('/api/user')
      .send(userTest);

    assert.strictEqual(response.statusCode, 201);
    assert.deepStrictEqual(
      Object.keys(response.body).sort(),
      ['userId', 'name', 'email', 'created_at'].sort()
    );

    userIdTest = response.body.userId;
    assert.ok(userIdTest, 'User ID should be defined');
  });

  test('CREATE a user with a fake name (400)', async () => {
    const response = await request(app)
      .post('/api/user')
      .send(fakeUserName);

    assert.strictEqual(response.statusCode, 400);
    assert.ok(response.body.hasOwnProperty('error'));
  })

  test('Return 409: Conflict: Email already exists', async () => {
    const response = await request(app)
      .post('/api/user')
      .send(userTest)

    assert.strictEqual(response.statusCode, 409);
    assert.ok(response.body.hasOwnProperty('message'));
  })

  test('Return 400 if credentials are invalid', async () => {
    const response = await request(app)
      .post('/api/user/login')
      .send({
        email: 'camile@example.com',
        password: 'wrongpass'
      });

    assert.strictEqual(response.statusCode, 400);
    assert.ok(response.body.hasOwnProperty('error'));
  });

  test('Return 200 and a token if credentials are valid', async () => {
    const response = await request(app)
      .post('/api/user/login')
      .send({
        email: 'camile@example.com',
        password: 'passStrong67'
      });

    assert.strictEqual(response.statusCode, 200);

    cookie = response.headers['set-cookie']?.[0];
    assert.ok(cookie, 'Cookie should be returned');
  });

  test('GET user by ID (200)', async () => {
    const response = await request(app)
      .get(`/api/user/${userIdTest}`)
      .set('Cookie', cookie);

    assert.strictEqual(response.statusCode, 200);
    assert.strictEqual(response.body.userId, userIdTest);
    assert.strictEqual(response.body.name, userTest.name);
  });

  test('POST update user location (200)', async () => {
    let updateLocationUser = {
      userId: userIdTest,
      location: 'CO-ANT'
    }
    const response = await request(app)
      .put('/api/user/setLocation')
      .set('Cookie', cookie)
      .send(updateLocationUser);

    assert.strictEqual(response.statusCode, 200);
    assert.strictEqual(response.body.location, updateLocationUser.location);
  });


  test('DELETE the user (204)', async () => {
    const response = await request(app)
      .delete(`/api/user/${userIdTest}`)
      .set('Cookie', cookie);

    assert.strictEqual(response.status, 204);
  });
});
