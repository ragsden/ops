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
         status:"",        
      };
  
    $scope.init = function(){
    ProjectsService.getProjectsBySubscriptionId($routeParams.subscriptionId,function(err,data){
      if(err) 
      {
        $scope.projectsModel.err = 'Error getting Projects for this subscription' + err;
      }
      else {  
      if(data.length===0)
      {
         $scope.projectsModel.err = 'There are no projects for this subscription';
         $scope.projectsModel.projects = data;
      } 
      else{
         $scope.projectsModel.projects = data;       
      }        
            
      }
    });
   }

  $scope.deleteProject = function(projectId){
    console.log(projectId);
    ProjectsService.deleteProjectById(projectId, function(status, data){
      if(status === 200){
        $scope.projectsModel.status = 'The project has been deleted. ' + data 
        $scope.init();
      }
      else
      {
        $scope.projectsModel.err = 'There was an error while deleting this project :' + data;
      }
    });
  };
  $scope.init();
  };
ProjectsController.$inject = ["$scope","$routeParams","$location","ProjectsService"];
angSpa.controller("projectsController",ProjectsController);

