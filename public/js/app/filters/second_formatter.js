angular.module('angSpa').filter('format_seconds', function() {
  return function(duration) {
    var d = Number(duration / 1000),
    h = Math.floor(d / 3600000),
    m = Math.floor(d % 3600000 / 60),
    s = Math.floor(d % 3600000 % 60);

    return ((h > 0 ? h + "h " : "") + (m + "m ") + (s + "s "));
  };
});
