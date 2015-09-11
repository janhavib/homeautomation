'use strict';
var app = angular.module('homeautomation');

app.factory('tempService', ['$http', function($http){
     var tempService = {
        fetchTemparatures : fetchTemparatures,
        getTemp : getTemp,
        setTemp : setTemp
    }
    return tempService;

    function fetchTemparatures(callback){
        $http.get('/temps').success(function(response){
            callback(null, response);
        }).error(function(error){
            callback(error, null);
        })
    }

    function getTemp(params, callback){
      var id = params.id;
      if(params){
          $http.get('/temps/'+id).success(function(response){
                callback(null, response);
            }).error(function(error){
                callback(error, null);
            })  
       }else{
            callback("Invalid Id", null);
       }
    }

    function setTemp(params, callback){
        if(params){
            $http.put('/temps',params).success(function(response){
                callback(null, response);
            }).error(function(error){
                callback(error, null);
            })
        }else{
            callback("Invalid Params", null);
        }
    }
}])