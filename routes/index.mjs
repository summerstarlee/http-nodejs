import Router from 'koa-router'
import RandomAddress from "../utils/RandomAddress.mjs";
const router = Router()
import WebSocketClient from '../websocket-client.mjs'




// 创建聊天
router.get('/turing/conversation/create', async (ctx, next) => {
    console.log("创建聊天");
    //构建 fetch 参数
    let fp = {
        headers: {}
    }

    //     //保留头部信息
    let reqHeaders = ctx.headers;

    let dropHeaders = ["user-agent", "accept", "accept-language", "Connection", "Upgrade", 'Cookie'];

    for (let h of dropHeaders) {
        if (reqHeaders[h]) {
            fp.headers[h] = reqHeaders[h]
        }
    }

    //客户端指定的随机地址
    fp.headers['X-forwarded-for'] = RandomAddress.randomAddress;

    console.log("当前 ip 是 ", RandomAddress.randomAddress);


    const res = await fetch('https://www.bing.com/turing/conversation/create', {
        headers: fp.headers,
        method: 'GET',
    })
    const json = await res.json()

    console.log('---- json ----', json);

    WebSocketClient(ctx, json)

})

export default (app) => {
    app
        .use(router.routes())
        .use(router.allowedMethods())
}