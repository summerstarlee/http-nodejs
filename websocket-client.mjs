import crypto from 'node:crypto'
import WebSocket from 'ws';
import { getObj } from './utils/ChatOptionsSets_Write.mjs';

const terminalChar = '\u001e'

const WebSocketClient = (ctx, headers, { conversationId, clientId, conversationSignature }) => {
  const { chat } = ctx.request.body
  const ws = new WebSocket('wss://sydney.bing.com/sydney/ChatHub', {
    perMessageDeflate: false,
    headers: headers
  });

  const cleanup = () => {
    ws.close()
    ws.removeAllListeners()
  }

  let stage = 0



  ws.on('open', () => {
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
      const params = getObj(isStartOfSession, chat, conversationSignature, clientId, conversationId,)

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

            console.log(3333, result);
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

  return ws
}

export default WebSocketClient

