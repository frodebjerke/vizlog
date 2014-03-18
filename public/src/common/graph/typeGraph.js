define([
  'common/graph/graph',
  'entities/pathCollection',
  'entities/pathModel',
  'd3'
  ],
function (graph, Paths, Path, d3) {
  return function (options) {

    // Setup
    var lg = graph(options);

    lg.paths = options.paths || new Paths([new Path()]);
    lg.config = options.config || new Config({
    });

    // Populate etc
    lg.paths.forEach(function (path) {
      console.log("init:hasPath");
      console.log(path);
    });


    // Events
    lg.paths.on('add', function (path) {
      console.log("paths:add");
      console.log(path);
    });

    lg.paths.on('change', function (path) {
      console.log("paths:change");
      console.log(path);
    });

    lg.paths.on('remove', function (path) {
      console.log("paths:remove");
      console.log(path);
    });

    return lg;
  };
});
