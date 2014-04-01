define([
  'handlers/configHandler',
  'handlers/logPageshandler',
  'handlers/pathsHandler',
  'handlers/controlsHandler'
  ],
function (config, logPages, paths, controls) {
  return {
    'config' : config,
    'logpages': logPages,
    'paths' : paths,
    'controls' : controls
  };
});
