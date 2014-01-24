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

      $scope.showBuilds = function(id) {
        $location.path('/projects/'+id+'/builds');
      };

      $scope.sort = {column:'name', descending: false};

      $scope.changeSorting = function(column){
        if($scope.sort.column == column){
          $scope.sort.descending = !$scope.sort.descending;
        }else{
          $scope.sort.column = column;
          $scope.sort.descending = false;
        }
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
    $scope.projectsModel.status = "";
    $scope.projectsModel.err = "";
    ProjectsService.deleteProjectById(projectId, function(status, data){
      if(status === 200){
        $scope.projectsModel.status = 'The project ' + projectId + ' has been deleted.';
        $scope.init();
      }
      else
      {
        $scope.projectsModel.err = 'There was an error while deleting this project :' + data;
      }
    });
  };

   $scope.deleteBuilds = function(projectId){
    ProjectsService.deleteBuildsByProjectId(projectId, function(status, data){
      if(status === 200){
        $scope.projectsModel.status = 'The builds of project ' + projectId + " have been deleted.";
      }
      else
      {
        $scope.projectsModel.err = 'There was an error while deleting the builds :' + data;
      }
    });
  };
  $scope.init();
  };
ProjectsController.$inject = ["$scope","$routeParams","$location","ProjectsService"];
angSpa.controller("projectsController",ProjectsController);

