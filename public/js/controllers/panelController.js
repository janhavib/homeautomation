'use strict';
var app = angular.module('homeautomation');

app.controller('panelController',['$scope','lightService','curtainService', 'garageService', 'tempService','$interval',function($scope, lightService, curtainService, garageService, tempService, $interval){
    $scope.displayMsg = false;
    $scope.lights = [];
    $scope.curtains = [];
    $scope.garages = [];
    $scope.temps = [];
    $scope.temp = 0;
    $scope.currentTemp = 0;

    //Configure the options 
    $scope.data = {
        availableLightOptions: [
          {id: '1', name: 'ON'},
          {id: '2', name: 'OFF'}
        ],
        availableCurtainOptions: [
            {id : '1', name : 'OPEN'},
            {id : '2', name : 'CLOSE'}
        ],
        availableGarageOptions : [
            {id : '1', name : 'OPEN'},
            {id : '2', name : 'CLOSE'}
        ]
    };
    $scope.lightStatus = $scope.data.availableLightOptions[1];
    $scope.curtainStatus = $scope.data.availableCurtainOptions[1];
    $scope.garageStatus = $scope.data.availableGarageOptions[1];


    //Set the initial date
    $scope.currentTime = new Date();
    $scope.currentCurtainTime = new Date();
    $scope.currentGarageTime = new Date();
    $scope.currentTempTime = new Date();
    //fetch all the lights


    function fetchLights(){
        lightService.fetchLights(function(err, data){
            if(err){
                console.log(err);
            }else{
                if(data.length>0){
                    console.log(data);
                    $scope.lights = data;
                    setImage();
                }else{
                    $scope.displayMsg = true;
                    $scope.msg = "No lights!";
                }
            }
        });
    }


    //set Image
    function setImage(){
        if($scope.lights[0].currentStatus && $scope.lights[0].currentStatus === "OFF"){
            $scope.showOffLight = true; 
            $scope.showOnLight = false; 

        }else if($scope.lights[0].currentStatus && $scope.lights[0].currentStatus === "ON"){
            $scope.showOnLight = true;
            $scope.showOffLight = false; 

        }
    }



    //change Light Status
    $scope.setLightStatus = function(){
        var params = {};
        params.changeStatusTo = $scope.data.availableLightOptions.name;
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


    function fetchCurtains(){
        curtainService.fetchCurtains(function(err, data){
            if(err){
                console.log(err);
            }else{
                if(data.length>0){
                    $scope.curtains = data;
                    setCurtainImage();
                }else{
                    $scope.displayMsg = true;
                    $scope.msg = "No curtains!";
                }
            }
        })
    }


    function setCurtainImage(){
         if($scope.curtains[0].currentStatus === "CLOSE"){
            $scope.showCloseCurtain = true; 
            $scope.showOpenCurtain = false;
        }else if($scope.curtains[0].currentStatus === "OPEN"){
            $scope.showOpenCurtain = true;
            $sceop.showCloseCurtain = false;
        }
    }

    $scope.setCurtainStatus = function(){
        var params = {};
        params.changeStatusTo = $scope.data.availableCurtainOptions.name;
        var unix_time = new Date($scope.currentCurtainTime).getTime()/1000;
        params.statusUpdateTime = unix_time;
        params.id = $scope.curtains[0].id;
        curtainService.updateCurtainStatus(params, function(err, data){
            if(err){
                console.log(err);
            }else{
                console.log("changed curtain status");
            }
        });
    }


    function fetchGarages(){
        garageService.fetchGarages(function(err, data){
            if(err){
                console.log(err);
            }else{
                if(data.length>0){
                    $scope.garages = data;
                    setGarageImage();
                }else{
                    $scope.displayMsg = true;
                    $scope.msg = "No garages!";
                }
            }
        })
    }

    $scope.setGarageStatus = function(){
        var params = {};
        params.changeStatusTo = $scope.data.availableGarageOptions.name;
        var unix_time = new Date($scope.currentGarageTime).getTime()/1000;
        params.statusUpdateTime = unix_time;
        params.id = $scope.garages[0].id;
        garageService.updateGarageStatus(params, function(err, data){
            if(err){
                console.log(err);
            }else{
                console.log("changed garage status");
            }
        });
    }


    function setGarageImage(){
         if($scope.garages[0].currentStatus === "CLOSE"){
            $scope.showCloseGarage = true; 
            $scope.showOpenGarage = false;
        }else if($scope.garages[0].currentStatus === "OPEN"){
            $scope.showOpenGarage = true;
            $scope.showCloseGarage = false;
        }
    }

    
    function fetchTemparatures(){
        tempService.fetchTemparatures(function(err, data){
        if(err){
            console.log(err);
        }else{
            if(data.length>0){
                $scope.temps = data;
                $scope.currentTemp = parseInt($scope.temps[0].currentTemp);
                $scope.gauge.value = $scope.currentTemp;
            }else{
                $scope.displayMsg = true;
                $scope.msg = "No temp!";
            }
        }
        })
    }

    $scope.gauge = {
          name: 'Temperature',
          opacity: 0.55,
          value: 0,
          text:''
    };

    $scope.setTemp = function(){
        var params = {};
        params.setTempTo = $scope.temp;
        var unix_time = new Date($scope.currentTempTime).getTime()/1000;
        params.tempUpdateTime = unix_time;
        params.id = $scope.temps[0].id;
        tempService.setTemp(params, function(err, data){
            if(err){
                console.log(err);
            }else{
                console.log("changed temperature");
            }
        });
    }

    //Keep polling to fetch current status for all
    $interval(function(){
         fetchLights();
         fetchCurtains();
         fetchGarages();
         fetchTemparatures();
    },30000);


}]);