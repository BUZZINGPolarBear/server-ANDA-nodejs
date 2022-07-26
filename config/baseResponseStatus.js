module.exports = {

    // 단순 API SUCCESS
    SUCCESS : { "isSuccess": true, "code": 1000, "message":"성공" },

    // User -> 회원가입 관련 Error 코드
    SIGNUP_EMAIL_EMPTY : { "isSuccess": false, "code": 2001, "message":"이메일을 입력해주세요."},
    SIGNUP_NICKNAME_EMPTY : { "isSuccess": false, "code": 2002, "message":"별명을 입력해주세요."},
    SIGNUP_PASSWORD_EMPTY : { "isSuccess": false, "code": 2003, "message":"비밀번호를 입력해주세요."},
    SIGNUP_EMAIL_DUPLICATED : { "isSuccess": false, "code": 2004, "message":"이미 가입된 회원입니다."},
    BODY_EMPTY : { "isSuccess": false, "code": 2005, "message":"요청된 body가 없습니다."},

    // User -> 로그인 관련 Error 코드
    SIGNIN_EMAIL_EMPTY : { "isSuccess": false, "code": 2101, "message":"이메일을 입력해주세요." },
    SIGNIN_PASSWORD_EMPTY : { "isSuccess": false, "code": 2102, "message":"비밀번호를 입력해주세요." },
    SIGNIN_FAILED : { "isSuccess": false, "code": 2104, "message":"이메일/비밀번호를 확인해주세요."},

    // Guestbook -> 방명록 관련 Error 코드
    GUESTBOOK_WRITER_EMPTY : {"isSuccess": false, "code": 3001, "message":"닉네임을 입력해주세요."},
    GUESTBOOK_CONTENT_EMPTY : {"isSuccess": false, "code": 3001, "message":"방명록 내용을 입력해주세요."},

    //DB ERROR
    DB_ERROR : {"isSuccess": false, "code": 5001, "message":"DB관련 에러"},

    //TOKEN ERROR
    EMPTY_TOKEN : {"isSuccess": false, "code": 5101, "message":"토큰이 없습니다."}
}