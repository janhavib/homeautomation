'use strict';
var app = angular.module('homeautomation');

app.factory('curtainService', ['$http', function($http){
     var curtainService = {
        fetchCurtains : fetchCurtains,
        updateCurtainStatus : updateCurtainStatus,
        fetchCurtainStatus : fetchCurtainStatus,
    }
    return curtainService;

    function fetchCurtains(callback){
        $http.get('/curtains').success(function(response){
            callback(null, response);
        }).error(function(error){
            callback(error, null);
        })
    }

    function fetchCurtainStatus(params, callback){
      var id = params.id;
      if(params){
          $http.get('/curtains/'+id).success(function(response){
                callback(null, response);
            }).error(function(error){
                callback(error, null);
            })  
       }else{
            callback("Invalid Id", null);
       }
    }

    function updateCurtainStatus(params, callback){
        if(params){
            $http.put('/curtains',params).success(function(response){
                callback(null, response);
            }).error(function(error){
                callback(error, null);
            })
        }else{
            callback("Invalid Params", null);
        }
    }
}])