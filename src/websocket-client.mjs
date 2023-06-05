import WebSocket from 'ws';
import { getObj } from './utils/ChatOptionsSets_Write.mjs';

const terminalChar = '\u001e'

const WebSocketClient = (ctx, { conversationId, clientId, conversationSignature }) => {

  console.log('------ 建立魔法链接 --------');
  const { chat } = ctx.request.body
  const ws = new WebSocket('wss://sydney.bing.com/sydney/ChatHub', {
    perMessageDeflate: false,
    headers: {
      Host: 'sydney.bing.com',
      Origin: 'https://www.bing.com',
      'Cache-Control': 'no-cache'
    }
  });

  console.log('------ 建立魔法链接 11111--------');

  const cleanup = () => {
    ws.close()
    ws.removeAllListeners()
  }

  let stage = 0

  let isFulfilled = false


  ws.on('open', () => {
    console.log('--- open ----');
    ws.send(`{"protocol":"json","version":1}${terminalChar}`)
  })

  ws.on('error', (error) => {
    console.log('----- error -----', error)
    cleanup()
  })

  ws.on('message', (data) => {
    console.log('---- message -----', data.toString());
    const objects = data.toString().split(terminalChar)

    const messages = objects.map((object) => {
      try {
        return JSON.parse(object)
      } catch (error) {
        return object
      }
    })
      .filter(Boolean)

    if (!messages.length) {
      return
    }

    if (stage === 0) {
      ws.send(`{"type":6}${terminalChar}`)
      const params = getObj(true, chat, conversationSignature, clientId, conversationId)

      console.log('--- 根据会话 建立通信 ---');

      ws.send(`${JSON.stringify(params)}${terminalChar}`)
      ++stage
    } else {
      for (const message of messages) {
        if (message.type === 1) {
          const update = message
          const msg = update.arguments[0].messages?.[0]

          if (!msg) continue

          // console.log('RESPONSE0', JSON.stringify(update, null, 2))

          if (!msg.messageType) {
            result.author = msg.author
            result.text = msg.text
            result.detail = msg

            console.log(111, result);
          }
        } else if (message.type === 2) {
          const response = message

          const validMessages = response.item.messages?.filter(
            (m) => !m.messageType
          )
          const lastMessage = validMessages?.[validMessages?.length - 1]

          if (lastMessage) {
            result.conversationId = response.item.conversationId
            result.conversationExpiryTime =
              response.item.conversationExpiryTime

            result.author = lastMessage.author
            result.text = lastMessage.text
            result.detail = lastMessage

            if (!isFulfilled) {
              isFulfilled = true
              console.log(2222, result);
            }
          }
        } else if (message.type === 3) {
          if (!isFulfilled) {
            isFulfilled = true

            console.log(3333, message);
          }

          cleanup()
          return
        } else {
          // TODO: handle other message types
          // these may be for displaying "adaptive cards"
          // console.warn('unexpected message type', message.type, message)
        }
      }

    }
  })

  ctx.body = "demo"
}

export default WebSocketClient

