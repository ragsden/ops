var BuildController = function($scope,$routeParams,BuildsService) {
  var collapseMap = {
    "__SH_CMD__": "__SH_CMD_END__",
  };



  $scope.err = "";

  var consoleLogs;


  $scope.compressedLogs = [];
  function compressConsoleLogs(data) {
    var masterIndex = 0;
    for(var i=0;i<data.length;i++) {
      //Split the individual console element by newline
      var splitData = data[i].output.split('\n');
      //console.log('splits ' + splitData.length + " i: " + i);
      var hasCmdTag = false;
      var shouldCompress = false;
      var consoleItem = getNewConsoleItem("","");
      for(var j=0;j<splitData.length;j++) {
        if(splitData[j].indexOf("__SH_CMD__")!== -1) {
          hasCmdTag =true;
          $scope.compressedLogs.push(consoleItem);
          var cmds = splitData[j].split('|');
          consoleItem = getNewConsoleItem(cmds[1],cmds[2]);
          //consoleItem.output.push(cmds[2]);
        }
        else if(splitData[j].indexOf("__SH_CMD_END__") !== -1) {
          shouldCompress = true;
          //consoleItem.output.push(splitData[j]);
          consoleItem.shouldCompress = true;
          $scope.compressedLogs.push(consoleItem);
          consoleItem = getNewConsoleItem("","");
        }
        else {
          consoleItem.output.push(splitData[j]);

        }

      }
      $scope.compressedLogs.push(consoleItem);
      
    }
    console.log($scope.compressedLogs);
  }


  $scope.init = function(){
    BuildsService.getConsoleByBuildNo($routeParams.projectId,$routeParams.buildNumber,function(err,data){
      if(err)
        {
          $scope.err = 'Error getting the Console Output.';
        }
        else
          {

            console.log(data);
            /*
            //consoleLogs = data;
            //get the build status.. if its success, only then process it
            BuildsService.getById($routeParams.projectId,$routeParams.buildNumber,function(err,build) {
            if(err) {
            $scope.err = "Error getting build information";
            processLogs(0);
            }
            else {
            processLogs(data,build.status);

            }
            }); */
            $scope.consoleLogs = data;
            compressConsoleLogs(data);
          }

    });
  };
  $scope.init();
  function getNewConsoleItem(title,meta) {
    return { output : [], shouldCompress : false, isShowing: false,title : title,meta:meta};

  }



};
BuildController.$inject = ["$scope","$routeParams","BuildsService"];
angSpa.controller("buildController",BuildController);
