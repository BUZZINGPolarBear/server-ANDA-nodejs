const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const { logger } = require("../../../config/winston");
const axios = require('axios');
exports.signupSocialUser = async function(code){
    let kakaoGetTokenRes;
    try{
        kakaoGetTokenRes = await axios({
            method: 'post',
            url: 'https://kauth.kakao.com/oauth/token',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
            data: {
                grant_type: 'authorization_code',
                client_id: process.env.KAKAO_JS_CLIENT_ID,
                redirect_uri: process.env.KAKAO_JS_REDIRECT_URI,
                code: code
            }
        });
    } catch(err){
        logger.error(`App - signupSocialUser Service error\n: ${err.message}`);
        return errResponse(baseResponse.SIGNUP_SOCIAL_FAIL);
    }

    const accessToken = kakaoGetTokenRes.data.access_token;
    let kakaoGetProfileRes;
    try{
        kakaoGetProfileRes = await axios({
            method: 'get',
            url: 'https://kapi.kakao.com/v2/user/me',
            headers: {
                Authorization : `Bearer ${accessToken}`
            }
    });
    } catch(err){
        logger.error(`App - signupSocialUser Service error\n: ${err.message}`);
        return errResponse(baseResponse.SIGNUP_SOCIAL_FAIL);
    }

    const userEmail = kakaoGetProfileRes.data.kakao_account.email;
    const userNickname = kakaoGetProfileRes.data.kakao_account.profile.nickname;

    let responseObj = {
        email: userEmail,
        nickname: userNickname
    };
    return response(baseResponse.SUCCESS, responseObj);
}