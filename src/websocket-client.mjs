import WebSocket from 'ws';

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
    ctx.websocket.send(res.toString())
  })


  ctx.websocket.on('message', (res) => {
    if(ws.readyState === WebSocket.OPEN) {
      ws.send(res.toString())
    }else {
      console.log('服务器未连接!!!')
    }
  })

}

export default WebSocketClient

