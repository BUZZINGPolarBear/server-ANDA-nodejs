module.exports = function(app){
    const socialController = require('./socialController');
    
    app.post('/app/users/social/signup', socialController.signupSocialUser);
    
    app.get('/test/jest', (req, res) => {
        res.send('ok')
    });

}