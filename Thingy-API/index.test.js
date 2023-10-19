const request = require('supertest');
const app = require('./index');  // Importing the app instance from index.js

test('should add two numbers via the /add route', async () => {
    const response = await request(app).get('/add?a=1&b=2');
    expect(response.body.result).toBe(3);
    expect(response.statusCode).toBe(200);
});