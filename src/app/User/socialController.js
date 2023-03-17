const socialService = require('./socialService');
const baseResponse = require("../../../config/baseResponseStatus");

require("dotenv").config();

exports.signupSocialUser = async function(req, res){
    const code = req.query.code;

    if(!code) return res.send(baseResponse.SIGNUP_SOCIAL_CODE_EMPTY);

    const result = await socialService.signupSocialUser(code);
    return res.send(result);
}