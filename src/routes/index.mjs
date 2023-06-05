import Router from 'koa-router'
import RandomAddress from "../utils/RandomAddress.mjs";
const router = Router()
import WebSocketClient from '../websocket-client.mjs'

import goUrl from '../plugins/goUrl.mjs'



// 创建聊天
router.get('/turing/conversation/create', async (ctx, next) => {
    console.log("创建聊天");
    const res = await goUrl('https://www.bing.com/turing/conversation/create', ctx)

    console.log('res');

    ctx.body = await res.json()

})

export default (app) => {
    app
        .use(router.routes())
        .use(router.allowedMethods())
}