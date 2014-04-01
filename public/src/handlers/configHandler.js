define([
  'entities/graphConfigModel'
  ],
function (Config) {
  var config = new Config();

  return function () {
    return config;
  };
});
