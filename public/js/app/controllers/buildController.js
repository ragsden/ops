var BuildController = function($scope,$routeParams,BuildsService) {
  var collapseMap = {
    "install": "[install]",
    "script": "[script]",
    "before":  "[before]" ,
    "afterSuccess": "[after_success]",

  };

 var collapseMap2 = {
    "_install": "[/install]",
    "_script":  "[/script]",
    "_before": "[/before]",
    "_afterSuccess" : "[/after_success]"
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

  function findPatternInString(c,str) {
    var patterns = _.values(c);
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
  function processLogs() {
    findPatternInString(collapseMap,'---[script]----');
    var createNewItem = false;
    var consoleItem = getNewConsoleItem();
    for(var i=0;i<$scope.buildModel.console.length;i++) {

      if( findPatternInString(collapseMap,consoleLogs[i].output)) {
        console.log('creating');
        $scope.newConsoleLogs.push(consoleItem);
        consoleItem = getNewConsoleItem(consoleLogs[i].output);

        consoleItem.output.push(consoleLogs[i].output);
        consoleItem.shouldCompress = true;

      }
      else if(findPatternInString(collapseMap2,consoleLogs[i].output)) {
        consoleItem.output.push(consoleLogs[i].output);
        $scope.newConsoleLogs.push(consoleItem);
        consoleItem = getNewConsoleItem("");

      }

      else {
        consoleItem.output.push(consoleLogs[i].output);
      }

    }

    $scope.newConsoleLogs.push(consoleItem);


//    console.log("new");
//    console.log($scope.newConsoleLogs);




  }



};
BuildController.$inject = ["$scope","$routeParams","BuildsService"];
angSpa.controller("buildController",BuildController);
