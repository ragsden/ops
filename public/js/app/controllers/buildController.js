var BuildController = function($scope,$routeParams,BuildsService,$sce) {

  $scope.err = "";

  $scope.compressedLogs = [];
  function compressConsoleLogs(data) {
    var masterIndex = 0;
    for(var i=0;i<data.length;i++) {
      //Split the individual console element by newline
      var splitData = data[i].output.split('\n');
      //console.log('splits ' + splitData.length + " i: " + i);
      var shouldCompress = false;
      var consoleItem = getNewConsoleItem("","");
      for(var j=0;j<splitData.length;j++) {
        if(splitData[j].indexOf("__SH_CMD__")!== -1) {
          $scope.compressedLogs.push(consoleItem);
          var cmds = splitData[j].split('|');
          
          consoleItem = getNewConsoleItem(cmds[1],cmds[2],cmds[3]);
          //consoleItem.output.push(cmds[2]);
        }
        else if(splitData[j].indexOf("__SH_CMD_END__") !== -1) {
          shouldCompress = true;
          var cmds = splitData[j].split('|');
          consoleItem.end = cmds[1];
          //consoleItem.output.push("<br/>");
          consoleItem.shouldCompress = true;
          $scope.compressedLogs.push(consoleItem);
          consoleItem = getNewConsoleItem("","");
        }
        else {
          consoleItem.output.push(ansi_up.ansi_to_html(splitData[j]));

        }

      }
      $scope.compressedLogs.push(consoleItem);
      
    }
    //console.log($scope.compressedLogs);
  }
  $scope.getDuration = function(consoleItem) {
    if(consoleItem.start === undefined || consoleItem.end === undefined) return;
    console.log(consoleItem);
    return (Number(consoleItem.end) - Number(consoleItem.start)) * 1000;
  }
  $scope.to_trusted = function(html) {
    return $sce.trustAsHtml(html);
  };

  $scope.init = function(){
    BuildsService.getConsoleByBuildNo($routeParams.projectId,$routeParams.buildNumber,function(err,data){
      if(err)
        {
          $scope.err = 'Error getting the Console Output.';
        }
        else
          {

            console.log(data);
            compressConsoleLogs(data);
          }

    });
  };
  $scope.init();
  function getNewConsoleItem(title,meta,startTime,endTime) {
    return { 
      output : [], 
      shouldCompress : false, 
      isShowing: false,
      title : title,
      meta:meta, 
      start: startTime,
      end: endTime
    };

  }



};
BuildController.$inject = ["$scope","$routeParams","BuildsService","$sce"];
angSpa.controller("buildController",BuildController);
