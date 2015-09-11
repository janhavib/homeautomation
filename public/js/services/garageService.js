'use strict';
var app = angular.module('homeautomation');

app.factory('garageService', ['$http', function($http){
     var garageService = {
        fetchGarages : fetchGarages,
        updateGarageStatus : updateGarageStatus,
        fetchGarageStatus : fetchGarageStatus,
    }
    return garageService;

    function fetchGarages(callback){
        $http.get('/garages').success(function(response){
            callback(null, response);
        }).error(function(error){
            callback(error, null);
        })
    }

    function fetchGarageStatus(params, callback){
      var id = params.id;
      if(params){
          $http.get('/garages/'+id).success(function(response){
                callback(null, response);
            }).error(function(error){
                callback(error, null);
            })  
       }else{
            callback("Invalid Id", null);
       }
    }

    function updateGarageStatus(params, callback){
        if(params){
            $http.put('/garages',params).success(function(response){
                callback(null, response);
            }).error(function(error){
                callback(error, null);
            })
        }else{
            callback("Invalid Params", null);
        }
    }
}])