const request = require('supertest')
const app = require('../../../index')

describe('Test test/jest', () => {
  it ('should return ok!!', (done) => {
    request(app).get('/test/jest').then((response) => {
      expect(response.text).toBe('ok');
      done();
    });
  });
});