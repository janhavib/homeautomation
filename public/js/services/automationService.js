'use strict';
var app = angular.module('homeautomation');

app.factory('lightService',['$http',function($http){
    var lightService = {
        fetchLights : fetchLights,
        updateLightStatus : updateLightStatus,
        fetchLightStatus : fetchLightStatus,
    }
    return lightService;

    function fetchLights(callback){
        $http.get('/lights').success(function(response){
            callback(null, response);
        }).error(function(error){
            callback(error, null);
        })
    }

    function fetchLightStatus(params, callback){
      var id = params.id;
      if(params){
          $http.get('/lights/'+id).success(function(response){
                callback(null, response);
            }).error(function(error){
                callback(error, null);
            })  
       }else{
            callback("Invalid Id", null);
       }
    }

    function updateLightStatus(params, callback){
        if(params){
            $http.put('/lights',params).success(function(response){
                callback(null, response);
            }).error(function(error){
                callback(error, null);
            })
        }else{
            callback("Invalid Params", null);
        }
    }
}]);