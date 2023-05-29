import Router from 'koa-router'
import fetch from 'node-fetch'
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
        if (reqHeaders.h) {
            fp.headers[h] = reqHeaders.h
        }
    }

    //客户端指定的随机地址
    let randomAddress = reqHeaders['randomAddress']
    if(!randomAddress){
        randomAddress = "12.24.144.227";
    }
    fp.headers['X-forwarded-for'] = randomAddress;

    
    // let cookieID = 0;
    // if(reqHeaders.get('NewBingGoGoWeb')){//如果是web版
    //     //添加配置的随机cookie
    //     if (cookies.length === 0) {
    //         return getReturnError("没有任何可用cookie，请前在第一行代码cookies变量中添加cookie");
    //     }
    //     cookieID = Math.floor(Math.random() * cookies.length);
    //     let userCookieID = reqHeaders.get("cookieID");
    //     if (userCookieID) {
    //         if (userCookieID >= 0 && userCookieID <= cookies.length-1) {
    //             cookieID = userCookieID;
    //         } else {
    //             return getReturnError("cookieID不存在，请刷新页面测试！");
    //         }
    //     }
    //     fp.headers["cookie"] = cookies[cookieID];
    // }else {//如果是插件版
    //     fp.headers["cookie"] = reqHeaders.get('cookie');
    // }
    fp.headers["cookie"] = reqHeaders.cookie;


    const res = await fetch('https://www.bing.com/turing/conversation/create', {
        headers: fp.headers,
        method: 'GET',
    })


    console.log(111, JSON.stringify(res));

    
    ctx.body = {"create": "create 🚅"}
})

export  default (app) => {
    app
    .use(router.routes())
    .use(router.allowedMethods())
}