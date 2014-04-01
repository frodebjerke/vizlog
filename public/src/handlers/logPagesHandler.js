define([
  'entities/logPagesCollection'
  ],
function (LogPagesCollection) {
  var logpages = new LogPagesCollection();

  logpages.on('change', function () {
    console.log('logpagehandler:change');
  });

  logpages.on('add', function () {
    console.log('logpagehandler:add');
  });

  return function () {
    return logpages;
  };
});
