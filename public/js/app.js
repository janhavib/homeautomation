'use strict';
var app = angular.module('homeautomation',['ngRoute','ngTable','ui.bootstrap','ui.bootstrap.datetimepicker','angular-raphael-gauge']);
//configure the routes
app.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/',{
        templateUrl: 'partials/controlPanel.html',
        controller: 'panelController'
    })

}]) 