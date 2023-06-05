import Router from 'koa-router'
const router = Router()


// 创建聊天
router.get('/turing/conversation/create', async (ctx, next) => {
    const headers = {}

    //保留头部信息
    let reqHeaders = ctx.headers;

    console.log('----reqHeaders ---', reqHeaders);

    let dropHeaders = ["user-agent", "accept", "accept-language"];

    for (let h of dropHeaders) {
        if (reqHeaders[h]) {
            headers[h] = reqHeaders[h]
        }
    }
    console.log(1111);
    headers['X-forwarded-for'] = reqHeaders.randomAddress || "12.24.144.227"

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