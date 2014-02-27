var BuildController = function($scope,$routeParams,BuildsService) {
 var collapseMap = {
    "[install]": "[/install]",
    "[script]":  "[/script]",
    "[before]": "[/before]",
    "[after_success]" : "[/after_success]",
    "[before_install]" : "[/before_install]"
  };



  $scope.err = "";
  
  var consoleLogs;
  $scope.init = function(){
    BuildsService.getConsoleByBuildNo($routeParams.projectId,$routeParams.buildNumber,function(err,data){
      if(err)
        {
          $scope.err = 'Error getting the Console Output.';
        }
        else
          {
            console.log(data);
            consoleLogs = data;
            //get the build status.. if its success, only then process it
            BuildsService.getById($routeParams.projectId,$routeParams.buildNumber,function(err,build) {
              if(err) {
                $scope.err = "Error getting build information";
                processLogs(0);
              }
              else {
                    processLogs(data,build.status);

              }
            });
          }

    });
  };
  $scope.init();

  $scope.newConsoleLogs = [];

  function findPatternInString(patterns,str) {
    //var patterns = _.values(c);
    for(var i=0;i<patterns.length;i++) {
      if(str.indexOf(patterns[i]) != -1) {
        console.log('found pattern ' + patterns[i]);
        return true;
      }
    }
    return false;
  }

  function getNewConsoleItem(title) {
    return { output : [], shouldCompress : false, isShowing: false,title : title };

  }
  function processLogs(data,status) {
    var createNewItem = false;
    var consoleItem = getNewConsoleItem();
    for(var i=0;i<data.length;i++) {

      if( findPatternInString(_.keys(collapseMap),consoleLogs[i].output)) {
        $scope.newConsoleLogs.push(consoleItem);
        consoleItem = getNewConsoleItem(consoleLogs[i].output);

        consoleItem.output.push(consoleLogs[i].output);
        consoleItem.shouldCompress = (status === 1);

      }
      else if(findPatternInString(_.values(collapseMap),consoleLogs[i].output)) {
        consoleItem.output.push(consoleLogs[i].output);
        $scope.newConsoleLogs.push(consoleItem);
        consoleItem = getNewConsoleItem("");

      }

      else {
        consoleItem.output.push(consoleLogs[i].output);
      }

    }

    $scope.newConsoleLogs.push(consoleItem);






  }



};
BuildController.$inject = ["$scope","$routeParams","BuildsService"];
angSpa.controller("buildController",BuildController);
