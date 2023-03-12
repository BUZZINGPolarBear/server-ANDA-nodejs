module.exports = function(app){
    const review = require('./reviewController');
    const jwt = require('../../../config/jwtMiddleware');
    const {imageUploader} = require('./s3ImgUploader');

    //1. 리뷰 남기기
    app.post('/app/review/post/', jwt.jwtMiddleware, imageUploader.any('images'), review.postReview);

    //2. 병원 리뷰 보기
    app.post('/app/review/view/simple',jwt.jwtMiddleware, review.getReviewSimple);

    //3. 병원 리뷰 지역 카테고리로 보기
    app.post('/app/review/view/area', jwt.jwtMiddleware, review.getReviewArea);

    //4. 분야별 리뷰 별점 Top 9 가져오기
    app.post('/app/review/rank/top9', jwt.jwtMiddleware, review.getTop9);

    //5. 병원 아이디 입력시 간단 리뷰 가져오기
    app.post('/app/review/view/simple',jwt.jwtMiddleware, review.getDetatilReview);

    //6. 리뷰 상세 보기
    app.post('/app/review/view/detail', jwt.jwtMiddleware, review.getDetatilReview);

    //3. 병원 리뷰 지역 카테고리 - 간단하게 보기
    app.post('/app/review/view/area/simple', jwt.jwtMiddleware, review.getReviewAreaSimple);

}