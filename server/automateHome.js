var lowdb = require('lowdb');
var db = lowdb('db.json');
//provides methods for creating and manipulating id based resources
db._.mixin(require('underscore-db'));
function automateHome(){
    
}
module.exports =  new automateHome();

automateHome.prototype.defaultRoute = function(req, res){
        res.sendfile('./public/index.html');
}

automateHome.prototype.createLight = function(req, res){
    var id;
    if(req.body){
        var lightStatus = req.body.lightStatus;
        //Check if lights exist else initialize id
        if(db.object.lights === undefined){
            id = 1;
        }else{
            id = db.object.lights.length + 1;
        }
        //insert the note
        var lightId = db('lights').insert({ id: id , currentStatus : "OFF"}).id;

        var light = db('lights').getById(lightId);
        if(light){
            res.send("Sucessfully created light");
        }else{
            res.send("Error creating light");
        }
    }

}

automateHome.prototype.fetchLights = function(req, res){
    if(db.object.lights){
        var allLights = db.object.lights;
        res.send(allLights);
    }else{
        //send back and empty array
        res.send([]);
    }
}

automateHome.prototype.getLightStatus = function(req, res){
    //To convert the string to integer
    var lightId = parseInt(req.params.id);
    if(lightId){
        var light = db('lights').getById(lightId);
    }
    if(light){
        res.send(light);
    }else{
        res.send("Error fetching note");
    }
}

automateHome.prototype.setLightStatus = function(req, res){
    if(req.body){
        db('lights')
        .chain()
        .find({ id: req.body.id })
        .assign({ changeStatusTo : req.body.changeStatusTo, statusUpdateTime: req.body.statusUpdateTime})
        .value()
        res.send("Successfully updated light status");
    }else{
        res.send("Error updating note");
    }
}


automateHome.prototype.createTemp = function(req, res){
    var id;
    if(req.body){
        var currentTemp = req.body.currentTemp;
        //Check if temps exist else initialize id
        if(db.object.temps === undefined){
            id = 1;
        }else{
            id = db.object.temps.length + 1;
        }
        //insert the temp
        var tempId = db('temps').insert({ id: id, currentTemp: currentTemp}).id;

        var temp = db('temps').getById(tempId);
        if(temp){
            res.send("Sucessfully created temp");
        }else{
            res.send("Error creating temp");
        }
    }

}

automateHome.prototype.fetchTemparatures = function(req, res){
    if(db.object.temps){
        var allTemps = db.object.temps;
        res.send(allTemps);
    }else{
        //send back and empty array
        res.send([]);
    }
}

automateHome.prototype.getTemp = function(req, res){
    //To convert the string to integer
    var tempId = parseInt(req.params.id);
    if(tempId){
        var temp = db('temps').getById(tempId);
    }
    if(temp){
        res.send(temp);
    }else{
        res.send("Error fetching temp");
    }
}

automateHome.prototype.setTemp = function(req, res){
    if(req.body){
        db('temps')
        .chain()
        .find({ id: req.body.id })
        .assign({ setTempTo: req.body.setTempTo, tempUpdateTime: req.body.tempUpdateTime})
        .value()
        res.send("Successfully updated temp");
    }else{
        res.send("Error updating temp");
    }
}


automateHome.prototype.addCurtains = function(req, res){
    var id;
    if(req.body){
        var curtainStatus = req.body.curtainStatus;
        //Check if temps exist else initialize id
        if(db.object.curtains === undefined){
            id = 1;
        }else{
            id = db.object.curtains.length + 1;
        }
        //insert the temp
        var curtainId = db('curtains').insert({ id: id, currentStatus: currentStatus}).id;

        var curtain = db('curtains').getById(curtainId);
        if(curtain){
            res.send("Sucessfully created curtain");
        }else{
            res.send("Error creating curtain");
        }
    }

}

automateHome.prototype.fetchCurtains = function(req, res){
    if(db.object.curtains){
        var allCurtains = db.object.curtains;
        res.send(allCurtains);
    }else{
        //send back and empty array
        res.send([]);
    }
}

automateHome.prototype.getCurtainStatus = function(req, res){
    //To convert the string to integer
    var curtainId = parseInt(req.params.id);
    if(curtainId){
        var curtain = db('curtains').getById(curtainId);
    }
    if(curtain){
        res.send(curtain);
    }else{
        res.send("Error fetching curtain");
    }
}

automateHome.prototype.setCurtainStatus = function(req, res){
    if(req.body){
        db('curtains')
        .chain()
        .find({ id: req.body.id })
        .assign({ changeStatusTo: req.body.changeStatusTo, statusUpdateTime: req.body.statusUpdateTime})
        .value()
        res.send("Successfully updated curtain status");
    }else{
        res.send("Error updating curtain status");
    }
}


automateHome.prototype.createGarage = function(req, res){
    var id;
    if(req.body){
        var garageStatus = req.body.garageStatus;
        //Check if temps exist else initialize id
        if(db.object.garages === undefined){
            id = 1;
        }else{
            id = db.object.garages.length + 1;
        }
        //insert the temp
        var garageId = db('garages').insert({ id: id, currentStatus: currentStatus}).id;

        var garage = db('garages').getById(garageId);
        if(garage){
            res.send("Sucessfully created garage");
        }else{
            res.send("Error creating garage");
        }
    }

}

automateHome.prototype.fetchGarages = function(req, res){
    if(db.object.garages){
        var allGarages = db.object.garages;
        res.send(allGarages);
    }else{
        //send back and empty array
        res.send([]);
    }
}

automateHome.prototype.getGarageStatus = function(req, res){
    //To convert the string to integer
    var garageId = parseInt(req.params.id);
    if(garageId){
        var garage = db('garages').getById(garageId);
    }
    if(garage){
        res.send(garage);
    }else{
        res.send("Error fetching garage");
    }
}

automateHome.prototype.setGarageStatus = function(req, res){
    if(req.body){
        db('garages')
        .chain()
        .find({ id: req.body.id })
        .assign({ changeStatusTo: req.body.changeStatusTo,statusUpdateTime: req.body.statusUpdateTime})
        .value()
        res.send("Successfully updated garage status");
    }else{
        res.send("Error updating garage status");
    }
}


setInterval(checkAllStatus, 60000);


function checkAllStatus(){
    var currentTime = new Date();
    var unixTime = new Date(currentTime).getTime()/1000;
    var tables = db.object;
    for(var i in tables){
      var items = tables[i];
      items.forEach(function(item){
        if(item.hasOwnProperty('statusUpdateTime') && unixTime >= item.statusUpdateTime){
            item.currentStatus = item.changeStatusTo;
            delete item.changeStatusTo;
            delete item.statusUpdateTime;
            db.save();
        }
      });
    }

}


