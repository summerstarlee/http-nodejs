import Router from 'koa-router'
const router = Router()
import RandomAddress from '../utils/RandomAddress.mjs'
const randomAddress = new RandomAddress()


// 创建聊天
router.get('/turing/conversation/create', async (ctx, next) => {
    console.log('---- 创建聊天 -----');
    const headers = {}
    //保留头部信息
    let reqHeaders = ctx.headers;
    let dropHeaders = ["user-agent", "accept", "accept-language"];
    for (let h of dropHeaders) {
        if (reqHeaders[h]) {
            headers[h] = reqHeaders[h]
        }
    }

    randomAddress.reset()
    headers['X-forwarded-for'] = randomAddress.randomIp

    const res = await fetch("https://www.bing.com/turing/conversation/create", {
        headers,
    })
    ctx.body = await res.json()
})

export default (app) => {
    app
        .use(router.routes())
        .use(router.allowedMethods())
}