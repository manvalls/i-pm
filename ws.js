var ws = require('ws'),
    Emitter = require('y-emitter'),
    from = require('i-peer/from/ws'),
    on = require('u-proto/on');

module.exports = function getPeerMachine(server,path){
  var emitter = new Emitter(),
      wss;
  
  wss = new ws.Server({
    server: server,
    path: (path || '') + '/'
  });
  
  wss[on]('connection',onConnection,emitter);
  
  return emitter.target;
}

function onConnection(e,en,emitter){
  emitter.give('peer',from(e[0]));
}

