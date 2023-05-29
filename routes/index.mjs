import Router from 'koa-router'
import fetch from 'node-fetch'
import RandomAddress from "../utils/RandomAddress.mjs";
const router = Router()



router.get('/', (ctx, next) => {
    console.log('---- request / -----');
    ctx.body = 'Choo Choo! Welcome to your Express app 🚅'
})



router.get('/create', async (ctx, next) => {
    console.log('---- create / -----', ctx.headers);
        //构建 fetch 参数
        let fp = {
            headers: {}
        }

    //     //保留头部信息
    let reqHeaders = ctx.headers;

    let dropHeaders = ["user-agent", "accept", "accept-language","Connection","Upgrade"];

    for (let h of dropHeaders) {
        if (reqHeaders[h]) {
            fp.headers[h] = reqHeaders[h]
        }
    }

    //客户端指定的随机地址
    fp.headers['X-forwarded-for'] = RandomAddress.randomAddress;


    const res = await fetch('https://www.bing.com/turing/conversation/create', {
        headers: fp.headers,
        method: 'GET',
    })


    console.log(res);

    
    ctx.body = {"create": "create 🚅"}
})

export  default (app) => {
    app
    .use(router.routes())
    .use(router.allowedMethods())
}