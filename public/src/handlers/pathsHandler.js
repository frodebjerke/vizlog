define([
  'entities/pathCollection'
  ],
function (Paths) {
  var paths = new Paths();

  return function () {
    return paths;
  };
});
