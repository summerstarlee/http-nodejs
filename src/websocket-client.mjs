import WebSocket from 'ws';
import { getObj } from './utils/ChatOptionsSets_Write.mjs';

const terminalChar = '\u001e'

const WebSocketClient = (headers, ctx) => {
  console.log('调用 socket 进行通话 第2步');


  const ws = new WebSocket('wss://sydney.bing.com/sydney/ChatHub', {
    perMessageDeflate: false,
    headers
  });

  ws.on('open', (res) => {
    console.log('--- open ----', res);
  })

  ws.on('message', (res) => {
    console.log('--- ws  message----', res.toString());
    ctx.websocket.send(res.toString())
  })


  ctx.websocket.on('message', (res) => {
    console.log('--- ctx.ws  message----', res.toString());
    ws.send(res.toString())
  })

}

export default WebSocketClient

