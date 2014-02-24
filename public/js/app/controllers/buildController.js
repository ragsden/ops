var BuildController = function($scope,$routeParams,BuildsService) {
  var collapseMap = {
    "install": { "pattern" : "[install]" },
    "_install": { "pattern" : "[/install]" },
    "script": { "pattern" : "[script]" },
    "_script": { "pattern" : "[/script]" },
    "before": { "pattern" : "[before]" },
    "_before": { "pattern" : "[/before]" },

  };
  $scope.buildModel={
    console:[{ output : "" }],
    err : "",
  };
  var consoleLogs;
  $scope.init = function(){
    BuildsService.getConsoleByBuildNo($routeParams.projectId,$routeParams.buildNumber,function(err,data){
      if(err)
        {
          $scope.buildModel.err = 'Error getting the Console Output.';
        }
        else
          {
            console.log(data);
            consoleLogs = data;
            $scope.buildModel.console = data;
            processLogs();
          }

    });
  };
  $scope.init();

  $scope.newConsoleLogs = [];

  function getNewConsoleItem(title) {
    return { output : [], shouldCompress : false, isShowing: false,title : title };

  }
  function processLogs() {
    var createNewItem = false;
    var consoleItem = getNewConsoleItem();
    for(var i=0;i<$scope.buildModel.console.length;i++) {
      //To do ..generalize this condition for all inclusive patterns
      if(consoleLogs[i].output.indexOf(collapseMap.install.pattern) != -1) {
        console.log('found install pattern');
        console.log('creating');
        $scope.newConsoleLogs.push(consoleItem);
        consoleItem = getNewConsoleItem("install");

        consoleItem.output.push(consoleLogs[i].output);
        consoleItem.shouldCompress = true;
      }
      else if(consoleLogs[i].output.indexOf(collapseMap._install.pattern) != -1) {
        console.log('found _install pattern');
        consoleItem.output.push(consoleLogs[i].output);
        $scope.newConsoleLogs.push(consoleItem);
        consoleItem = getNewConsoleItem("");
      }
      else if(consoleLogs[i].output.indexOf(collapseMap.script.pattern) != -1) {
        console.log('found script pattern');
        console.log('creating');
        $scope.newConsoleLogs.push(consoleItem);
        consoleItem = getNewConsoleItem("script");

        consoleItem.output.push(consoleLogs[i].output);
        consoleItem.shouldCompress = true;
      }
      else if(consoleLogs[i].output.indexOf(collapseMap._script.pattern) != -1) {
        console.log('found _script pattern');
        consoleItem.output.push(consoleLogs[i].output);
        $scope.newConsoleLogs.push(consoleItem);
        consoleItem = getNewConsoleItem("");
      }
      else if(consoleLogs[i].output.indexOf(collapseMap.before.pattern) != -1) {
        console.log('found before pattern');
        console.log('creating');
        $scope.newConsoleLogs.push(consoleItem);
        consoleItem = getNewConsoleItem("before");

        consoleItem.output.push(consoleLogs[i].output);
        consoleItem.shouldCompress = true;
      }
      else if(consoleLogs[i].output.indexOf(collapseMap._before.pattern) != -1) {
        console.log('found _before pattern');
        consoleItem.output.push(consoleLogs[i].output);
        $scope.newConsoleLogs.push(consoleItem);
        consoleItem = getNewConsoleItem("");
      }


      else {
        consoleItem.output.push(consoleLogs[i].output);
      }

    }

    $scope.newConsoleLogs.push(consoleItem);


    console.log("new");
    console.log($scope.newConsoleLogs);




  }



};
BuildController.$inject = ["$scope","$routeParams","BuildsService"];
angSpa.controller("buildController",BuildController);
