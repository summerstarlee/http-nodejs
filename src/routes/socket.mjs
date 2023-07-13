import Router from 'koa-router'
const router = Router()
import WebSocketClient from '../websocket-client.mjs'
import RandomAddress from '../utils/RandomAddress.mjs'
const randomAddress = new RandomAddress()


// 创建聊天
router.all('/sydney/ChatHub', ctx => {
    console.log('调用 socket 进行通话 第一步');

    const { randomAddress } = ctx.query

    const httpHeaders = {}

    // 保留头部
    const b = ["user-agent", "accept", "accept-language"]

    b.forEach(name => {
        if (ctx.headers[name]) httpHeaders[name] = ctx.headers[name]
    })

    randomAddress.reset()


    httpHeaders.Host = "sydney.bing.com"
    httpHeaders.Origin = "https://www.bing.com"
    httpHeaders['Cache-Control'] = "no-cache"
    httpHeaders['X-forwarded-for'] = randomAddress.randomIp

    WebSocketClient(httpHeaders, ctx)
})


export default (app) => {
    app
        .ws
        .use(router.routes())
        .use(router.allowedMethods())
}

// https://www.bing.com