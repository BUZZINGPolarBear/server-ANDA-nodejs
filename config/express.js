const express = require('express');
const compression = require('compression');
const methodOverride = require('method-override');
var cors = require('cors');
module.exports = function () {
    const app = express();

    app.use(compression());

    app.use(express.json());

    app.use(express.urlencoded({extended: true}));

    app.use(methodOverride());

    app.use(cors());
    // app.use(express.static(process.cwd() + '/public'));

    //domain 추가
    require('../src/app/User/userRoute')(app);
    require('../src/app/User/socialRoute')(app);
    require('../src/app/Location/locationRoute')(app);
    require('../src/app/Review/reviewRoute')(app);
    require('../src/app/Front/frontRoute')(app);
    require('../src/app/Point/pointRoute')(app);
    require('../src/app/Search/searchRoute')(app);

    return app;
};