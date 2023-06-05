import WebSocket from 'ws';

const WebSocketServer = () => {
  const ws = new WebSocket('wss://sydney.bing.com/sydney/ChatHub', {
    perMessageDeflate: false,
    headers: headers
  });

  ws.on('open', () => {

  })

  ws.on('error', console.error)

  ws.on('message', (data) => {
    console.log('---- message -----', data);
  })

  return ws
}

export default WebSocketServer

