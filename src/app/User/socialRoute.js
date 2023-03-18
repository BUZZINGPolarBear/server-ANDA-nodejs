module.exports = function(app){
    const socialController = require('./socialController');
    
    app.post('/app/users/social/signup', socialController.signupSocialUser);
}