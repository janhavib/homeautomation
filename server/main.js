var lowdb = require('lowdb');
var db = lowdb('db.json');
db._.mixin(require('underscore-db'));
var automation = require('./automateHome');
//configure the routes
module.exports = function(app){
    app.get('/', automation.defaultRoute);

    app.post('/lights',automation.createLight);

    app.get('/lights', automation.fetchLights);

    app.get('/lights/:id', automation.getLightStatus);

    app.put('/lights', automation.setLightStatus);


    app.post('/temps',automation.createTemp);

    app.get('/temps', automation.fetchTemparatures);

    app.get('/temps/:id', automation.getTemp);

    app.put('/temps', automation.setTemp);


    app.post('/curtains', automation.addCurtains);

    app.get('/curtains', automation.fetchCurtains);

    app.get('/curtains/:id', automation.getCurtainStatus);

    app.put('/curtains', automation.setCurtainStatus);


    app.post('/garages', automation.createGarage);

    app.get('/garages', automation.fetchGarages);

    app.get('/garages/:id', automation.getGarageStatus);

    app.put('/garages', automation.setGarageStatus);
}



