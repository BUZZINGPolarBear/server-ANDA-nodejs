module.exports = function(app){
    const user = require('./userController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 0. 테스트 API
    // app.get('/app/test', user.getTest)

    // 1. 유저 생성 (회원가입) API
    app.post('/app/users/signup', user.postUsers);

    // 2. 유저 로그인 API
    app.post('/app/users/signin', user.signinUser);

    // 3. 유저 이메일 중복 확인
    app.get('/app/users/signup/', user.isDuplicateUser);
};


// TODO: 자동로그인 API (JWT 검증 및 Payload 내뱉기)
// JWT 검증 API
// app.get('/app/auto-login', jwtMiddleware, user.check);

// TODO: 탈퇴하기 API