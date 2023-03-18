const socialService = require('./socialService');
const baseResponse = require("../../../config/baseResponseStatus");

require("dotenv").config();

exports.signupSocialUser = async function(req, res){
    const code = req.query.code;
    const {isOverAge, isTermsOfUseAgree, isPrivacyPolicyAgree, isMarketingInfoAgree} = req.body;

    if(!code) return res.send(baseResponse.SIGNUP_SOCIAL_CODE_EMPTY);
    if(!isOverAge == null)
        return res.send(response(baseResponse.SIGNUP_IS_OVER_AGE_EMPTY));
    if(!isTermsOfUseAgree == null)
        return res.send(response(baseResponse.SIGNUP_IS_TERMS_OF_USE_AGREE_EMPTY));
    if(!isPrivacyPolicyAgree == null)
        return res.send(response(baseResponse.SIGNUP_IS_PRIVACY_POLICY_AGREE_EMPTY));
    if(isMarketingInfoAgree == null)
        return res.send(response(baseResponse.SIGNUP_IS_MARKETING_INFO_AGREE_EMPTY));

    if(typeof(isOverAge) != 'boolean')
        return res.send(response(baseResponse.SIGNUP_IS_OVER_AGE_TYPE_ERROR));
    if(typeof(isTermsOfUseAgree) != 'boolean')
        return res.send(response(baseResponse.SIGNUP_IS_TERMS_OF_USE_AGREE_TYPE_ERROR));
    if(typeof(isPrivacyPolicyAgree) != 'boolean')
        return res.send(response(baseResponse.SIGNUP_IS_PRIVACY_POLICY_AGREE_TYPE_ERROR));
    if(typeof(isMarketingInfoAgree) != 'boolean')
        return res.send(response(baseResponse.SIGNUP_IS_MARKETING_INFO_AGREE_TYPE_ERROR));

    const result = await socialService.signupSocialUser(code, isOverAge, isTermsOfUseAgree, isPrivacyPolicyAgree, isMarketingInfoAgree);
    return res.send(result);
}