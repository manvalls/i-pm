# PeerMachine

## Interface

An object implements the PeerMachine interface if it:

- Inherits from `y-emitter` Target
- Has been initialized by the `y-emitter` Target's constructor
- Fires a `'peer'` event when a new peer connects, with an object which satisfies the `i-peer` interface

## Implementations

- WebSocket server

```javascript
peerMachine = require('i-pm/ws')(httpServer,path);
```
