'use strict';

var ProjectsController = function($scope,$routeParams,$location,ProjectsService) {
  $scope.projectsModel={
     projects:[{
          created:"",
          id:"",
          language:"",
          name:"",
          nodeType:"",
          repositoryKey:"",
          repositoryProvider:"",
          repositoryUrl:"",
          subscription:"",
          permissions:[{
              account:"", 
              roles:[""]
           }]         
         }],
         err:"",        
      };
  
    ProjectsService.getProjectsBySubscriptionId($routeParams.subscriptionId,function(err,data){
      if(err) 
      {
        $scope.projectsModel.err = 'Error getting Projects for this subscription' + err;
      }
      else {  
      if(data.length===0)
      {
         $scope.projectsModel.err = 'There are no projects for this subscription';
      } 
      else{
         $scope.projectsModel.projects = data;       
      }        
            
      }
   });
  };
ProjectsController.$inject = ["$scope","$routeParams","$location","ProjectsService"];
angSpa.controller("projectsController",ProjectsController);

