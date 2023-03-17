module.exports = function(app){
    const socialController = require('./socialController');

    app.get('/app/users/social/signup', socialController.signupSocialUser);
}