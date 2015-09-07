'use strict';
var app = angular.module('homeautomation');

app.controller('panelController',['$scope','lightService','curtainService', function($scope, lightService, curtainService){
    $scope.displayMsg = false;
    $scope.lights = [];

    //Configure the options 
    $scope.data = {
        availableLightOptions: [
          {id: '1', name: 'ON'},
          {id: '2', name: 'OFF'}
        ],
    };
    $scope.lightStatus = $scope.data.availableLightOptions[1];

    //Set the initial date
    $scope.currentTime = new Date();

    //fetch all the lights
    lightService.fetchLights(function(err, data){
        if(err){
            console.log(err);
        }else{
            if(data.length>0){
                $scope.lights = data;
            }else{
                $scope.displayMsg = true;
                $scope.msg = "No notes found!";
            }
        }
    });



    //change Light Status
    $scope.setLightStatus = function(){
        var params = {};
        params.changeStatusTo = $scope.lightStatus.name;
        var unix_time = new Date($scope.currentTime).getTime()/1000;
        params.statusUpdateTime = unix_time;
        params.id = $scope.lights[0].id;
        lightService.updateLightStatus(params, function(err, data){
            if(err){
                console.log(err);
            }else{
                console.log("changed light status");
            }
        });
    }

   
}]);