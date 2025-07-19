import { test, describe } from 'node:test';
import assert from 'node:assert';
import request from 'supertest';
import app from '../index.js';

let userId;
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
    console.log(`User created with ID: ${response.body.userId}`);

    userId = response.body.userId;
    assert.ok(userId, 'User ID should be defined');
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


  test('DELETE the user (204)', async () => {
    const response = await request(app)
      .delete(`/api/user/${userId}`)
      .set('Cookie', cookie);
      console.log(response.body);

    assert.strictEqual(response.status, 204);
  });
});
