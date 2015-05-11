var WebSocketServer = require('websocket').server,
    Emitter = require('y-emitter'),
    from = require('i-peer/from/wsc'),
    on = require('u-proto/on');

module.exports = function getPeerMachine(server,opt){
  var emitter = new Emitter(),
      wss;
  
  if(typeof opt == 'string') opt = {path: opt};
  opt = opt || {};
  
  wss = new WebSocketServer({
    httpServer: server
  });
  
  wss[on]('request',onRequest,opt.path,opt.host,opt.origin);
  wss[on]('connection',onConnection,emitter);
  
  return emitter.target;
}

function onRequest(e,c,path,host,origin){
  var req = e[0];
  
  if(host && host != req.host) return;
  if(path && path != req.resource) return;
  
  if(origin && origin != req.origin) req.reject();
  else req.accept(null,req.origin);
}

function onConnection(e,c,emitter){
  emitter.give('peer',from(e[0]));
}

