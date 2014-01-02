'use strict';

angular.module('angSpa', [
    'angSpa.Controllers',
]).
config(function($routeProvider, $locationProvider){
 $locationProvider.html5Mode(true);
});
