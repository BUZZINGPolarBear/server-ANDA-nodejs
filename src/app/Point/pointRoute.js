const adminKeyCheck = require('../../../config/adminKeyCheck');
const jwtMiddleware = require('../../../config/jwtMiddleware');
const controller = require('./pointController');

module.exports = function(app){
    //1. 포인트 적립
    /**
     * @swagger
     * /users:
     *   get:
     *     summary: Get a list of users
     *     description: Returns a list of users
     *     responses:
     *       200:
     *         description: A list of users
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/User'
     */
    app.post('/app/point/invite', adminKeyCheck.checkAdmin, controller.postInvitePoint);

    //2. 추천인 조회
    app.get('/app/point/recommend', controller.getRecommend);

    //3. 포인트 내역 조회
    app.get('/app/point/history',jwtMiddleware.jwtMiddleware, controller.getPointHistory);
}