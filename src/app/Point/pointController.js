const {response} = require("../../../config/response");
const {logger} = require("../../../config/winston");

const pointProvider = require("./pointProvider");
const pointService = require("./pointService");

const baseResponse = require("../../../config/baseResponseStatus");

/**
 * 친구추가 포인트 추가하기
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.postInvitePoint = async function(req, res){
    const code = req.body.code;

    if(!code) return res.send(response(baseResponse.RECOMMEND_CODE_EMPTY));
    if(code.length != 8) return res.send(response(baseResponse.RECOMMEND_CODE_LENGTH));

    const result = await pointService.postPoint(code);

    return res.send(result);
}


/**
 * 2. 추천인 조회 API
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.getRecommend = async function(req, res){
    const code = req.query.code;

    if(!code) return res.send(response(baseResponse.RECOMMEND_CODE_EMPTY));
    if(code.length != 8) return res.send(response(baseResponse.RECOMMEND_CODE_LENGTH));

    const result = await pointProvider.getRecommend(code);
    
    return res.send(result);
}

exports.getPointHistory = async function(req, res){
    verifiedToken = req.verifiedToken;

    const userId = verifiedToken.id;

    const result = await pointProvider.getPointHistory(userId);

    return res.send(result);
}