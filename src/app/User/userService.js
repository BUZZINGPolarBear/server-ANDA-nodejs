const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const userDao = require("./userDao");
const userProvider = require("./userProvider");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {connect} = require("http2");
const res = require("express/lib/response");

/**
 * 회원가입 API
 * @param {*} name 
 * @param {*} email 
 * @param {*} password 
 * @param {*} member 
 * @param {*} generation 
 * @returns 
 */
exports.creteUser = async function (nickName, email, password, recommendUserId){

    const isEmailDuplicated = await userProvider.emailDuplicateCheck(email);
    try{
        if(isEmailDuplicated.result == '이미 가입된 이메일입니다.'){//이메일 중복이 있는 경우
            return errResponse(baseResponse.SIGNUP_EMAIL_DUPLICATED);
        }

         // 비밀번호 암호화
         const hashedPassword = await crypto
         .createHash("sha512")
         .update(password)
         .digest("hex");

         const insertUserParams = [nickName, email, hashedPassword, recommendUserId];

         const connection = await pool.getConnection(async (conn) => conn);
         const userCreateResult = await userDao.insertUserInfo(connection, insertUserParams);
        
         //토큰 생성 Service
        let AccessToken = await jwt.sign(
            {
                userEmail: email,
            }, // 토큰의 내용(payload)
            secret_config.ACCESSjwtsecret, // 비밀키
            {
                expiresIn: "3h",
                subject: "userInfo",
            } // 유효 기간 365일
        );

        let RefreshToken = await jwt.sign(
            {
                userEmail: email,
            }, // 토큰의 내용(payload)
            secret_config.REFRESHjwtsecret, // 비밀키
            {
                expiresIn: "6h",
                subject: "userInfo",
            } // 유효 기간 365일
        );
        
        const refreshTokenParams = [email, RefreshToken]
        const refreshTokenSaveResult = await userDao.saveRefreshToken(connection, refreshTokenParams)

        
         console.log('추가된 회원: ' + email);
         connection.release();
         return response(baseResponse.SUCCESS, {'email': email, 
                                                'AccessJWT': AccessToken,
                                                'RefreshJWT': RefreshToken});
    }
    catch{
        //logger.error(`App - createUser Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
    
}

/**
 * 로그인 API
 * @param {*} email 
 * @param {*} password 
 * @returns 
 */
exports.signinUser = async function (email, password)
{
    try{
         // 비밀번호 암호화
         const hashedPassword = await crypto
         .createHash("sha512")
         .update(password)
         .digest("hex");

         const signinUserParams = [email, hashedPassword];

         const connection = await pool.getConnection(async (conn) => conn);
         const userSignInResult = await userDao.signinUser(connection, signinUserParams); 
         
         if(userSignInResult != null)
         {
             //토큰 생성 Service
            let AccessToken = await jwt.sign(
                {
                    id: userSignInResult.id,
                    createAt: userSignInResult.createdAt,
                    nickname: userSignInResult.nickname,
                    email: userSignInResult.email,
                    recommendUserId: userSignInResult.recommendUserId
                }, // 토큰의 내용(payload)
                secret_config.ACCESSjwtsecret, // 비밀키
                {
                    expiresIn: "3h",
                    subject: "userInfo",
                } // 유효 기간 3시간
            );

            let RefreshToken = await jwt.sign(
                {
                    id: userSignInResult.id,
                    createAt: userSignInResult.createdAt,
                    nickName: userSignInResult.nickName,
                    email: userSignInResult.email,
                    recommendUserId: userSignInResult.recommendUserId
                }, // 토큰의 내용(payload)
                secret_config.REFRESHjwtsecret, // 비밀키
                {
                    expiresIn: "2w",
                    subject: "userInfo",
                } // 유효 기간 2주
            );

            const refreshTokenParams = [RefreshToken, email]
            const refreshTokenSaveResult = await userDao.updateRefreshToken(connection, refreshTokenParams)

            connection.release();
            return response(baseResponse.SUCCESS, {'email': email, 
                                                   'AccessJWT': AccessToken,
                                                    'RefreshJWT': RefreshToken});
        }
        else return errResponse(baseResponse.SIGNIN_FAILED);
    }
    catch{
        logger.error(`App - signIn Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}