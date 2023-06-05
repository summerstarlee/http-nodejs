import Router from 'koa-router'
import RandomAddress from "../utils/RandomAddress.mjs";
const router = Router()
import WebSocketClient from '../websocket-client.mjs'




// 创建聊天
router.all('/sydney/ChatHub', ctx => {
    console.log('创建魔法聊天室!!!');
    ctx.websocket.send("Hello World!")
    ctx.websocket.on('message', function(message) {
            console.log(JSON.parse(message.toString()));
      });

    const { randomAddress }  = ctx.query

    const httpHeaders = {}

    // 保留头部
    const b = ["user-agent","accept","accept-language"]

    b.forEach(name => {
        if(ctx.headers[name]) httpHeaders[name] = ctx.headers[name]
    })


    httpHeaders.Host = "sydney.bing.com"
    httpHeaders.Origin = "https://www.bing.com"
    httpHeaders['Cache-Control'] = "no-cache"
    httpHeaders['X-forwarded-for'] = randomAddress

    const ws = WebSocketClient(httpHeaders, ctx)

    ws.send({})

})


export  default (app) => {
    app
    .ws
    .use(router.routes())
    .use(router.allowedMethods())
}