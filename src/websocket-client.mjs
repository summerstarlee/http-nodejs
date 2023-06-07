import WebSocket from 'ws';
import { getObj } from './utils/ChatOptionsSets_Write.mjs';

const terminalChar = '\u001e'

const WebSocketClient = (headers, ctx) => {

  console.log('------ 建立魔法链接 --------');
  const ws = new WebSocket('wss://sydney.bing.com/sydney/ChatHub', {
    perMessageDeflate: false,
    headers
  });

  ws.on('open', (res) => {
    console.log('--- open ----', res);
  })

  ws.on('message', (res) => {
    console.log('--- ws  message----', res);
    ctx.websocket.send(res)
  })


  ctx.websocket.on('message', (res) => {
    console.log('--- ctx.ws  message----', res);
    ws.send(res)
  })

}

export default WebSocketClient

