const request = require('supertest');
const app = require('./src/app');

describe('Task Endpoints', () => {
  let token;

  beforeAll(async () => {
    // You must provide a valid JWT for an authenticated user here
    token = '<YOUR_JWT_TOKEN>';
  });

  it('should create a new task', async () => {
    const res = await request(app)
      .post('/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test Task',
        description: 'A test task',
        priority: 'high'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.title).toBe('Test Task');
  });

  it('should get tasks for the user', async () => {
    const res = await request(app)
      .get('/tasks')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
