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

describe('Test Signup', () => {
  it ('이메일 형식이 올바르지 않은 경우', (done) => {
    request(app).post('/app/users/signup').then((response) => {
      expect(response.body.code).toBe(2001);
      done();
  })
  });

  it ('이메일 형식이 올바른 경우', (done) => {
    request(app).post('/app/users/signup')
    .send({
      email: 'aaa@bbb.com'
    })
    .then((response) => {
      expect(response.body.code).toBe(2003);
      done();
  })
  })

  it ('닉네임 항목이 없는 경우', (done) => {
    request(app).post('/app/users/signup')
    .send({
      email: 'aaa@bbb.com',
      password: '1234'
    })
    .then((response) => {
      expect(response.body.code).toBe(2004);
      done();
  })
  })

  it ('약관 동의 항목 형식이 다른 경우', (done) => {
    request(app).post('/app/users/signup')
    .send({
      email: 'aaa@bbb.com',
      password: '1234',
      nickname: 'aaa',
      isOverAge: 'yesey'

    })
    .then((response) => {
      expect(response.body.code).toBe(2508);
      done();
  })
  })
});