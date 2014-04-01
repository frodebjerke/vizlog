define([
  'entities/controlsModel'
  ],
function (Controls) {
  var controls = new Controls();

  return function () {
    return controls;
  };
});
