angular.module('angSpa').filter('format_to_pst', function() {
  return function(date) {
    return moment.utc(date).subtract('hours',8).format("M/D/YY [at] HH:mm");
  };
});
