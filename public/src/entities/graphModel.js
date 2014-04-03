define([
  'backbone',
  'd3'
  ],
function (Backbone, d3) {
  return Backbone.Model.extend({
    initialize: function (options) {

    },
    getDataPaths: function () {
      var paths = this.get("paths");

      return paths.map(function (path) {
        return path.get("data");
      });
    },
    getXDomain: function () {
      var config = this.get("config");
      var freq = this.getFrequence();
      return [0, config.get('length') * freq];
    },
    getYDomain: function () {
      var config = this.get('config'),
          ymin = config.get("ymin"),
          ymax = config.get("ymax"),
          paths = this.get("paths");

      var ydomain = [ymin, ymin];

      return paths.reduce(function (memo, d) {
        var domain = d3.extent(d.get('data'), function (v) { return v; });
        memo[0] = domain[0] < memo[0] ? domain[0] : memo[0];
        memo[1] = domain[1] > memo[1] ? domain[1] : domain[1];
        return memo;
      }, ydomain);
    },
    getMargin: function () {
      return this.get('config').get("margin");
    },
    getFrequence: function () {
      // TODO refactor this
      var paths = this.get("paths");
      var logpages = paths.first().get("logpages");
      return logpages.first().get("frequence");
    }
  });
});
