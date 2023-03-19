const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const { logger } = require("../../../config/winston");
const axios = require('axios');

//[카카오톡] 회원 가입
exports.signupSocialUser = async function(code, isOverAge, isTermsOfUseAgree, isPrivacyPolicyAgree, isMarketingInfoAgree){
    let kakaoGetTokenRes;
    try{
        //토큰을 해독하여 Access 토큰을 받아올 수 있는 준비를 한다.
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
        // Access token을 이용하여 카카오에게 사용자 정보를 요청한다.
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
    const userNickname = kakaoGetProfileRes.data.kakao_account.profile.nickname ?? userEmail.split('@')[0];

    
    return response(baseResponse.SUCCESS);
}