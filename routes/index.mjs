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
    fp.headers["cookie"] = "MUID=1F73C93FF56D62853524DB43F4AD6331; SRCHD=AF=NOFORM; SRCHUID=V=2&GUID=7B9C243CB1454AF7B3A507E3C9A9AA7F&dmnchg=1; _UR=QS=0&TQS=0; _clck=hy29la|1|fat|0; MicrosoftApplicationsTelemetryDeviceId=2725c570-2571-4f74-a2c5-8747e3421a31; NAP=V=1.9&E=1c07&C=-vJjQP5a6C_0QFOym-WOSp7TJfxuMSL8ZayCesAkla6YZB5YxXc30Q&W=1; ANON=A=B674E3C09CF88B09C9CB38F8FFFFFFFF&E=1c61&W=1; PPLState=1; _U=1KIyAUF8rt4TGavNRakyWeZAnDT0BKATSMFSdPXowsxKGYp87O01eNdia0UdrGX0Htj21sjtaP1Mokqgr9NYqINQUN-kV4jI824ACdOQRY5H_ip6dS0J8L_fjJIx68letXHwA-ntE9ad_IRqnJFSKO6_ce1vA0JKCns7xeyei9TsJ1ntaEPkRhkrSuoUCZv3uDwEcMa9XFTne7obdelQVeg; WLS=C=dc7a3b68ad029e09&N=star; SnrOvr=X=rebateson; SNRHOP=I=&TS=; SRCHUSR=DOB=20230414&T=1685343640000&TPC=1681696648000&POEX=W; ipv6=hit=1685347242043&t=4; _HPVN=CS=eyJQbiI6eyJDbiI6NCwiU3QiOjAsIlFzIjowLCJQcm9kIjoiUCJ9LCJTYyI6eyJDbiI6NCwiU3QiOjAsIlFzIjowLCJQcm9kIjoiSCJ9LCJReiI6eyJDbiI6NCwiU3QiOjAsIlFzIjowLCJQcm9kIjoiVCJ9LCJBcCI6dHJ1ZSwiTXV0ZSI6dHJ1ZSwiTGFkIjoiMjAyMy0wNS0yOVQwMDowMDowMFoiLCJJb3RkIjowLCJHd2IiOjAsIkRmdCI6bnVsbCwiTXZzIjowLCJGbHQiOjAsIkltcCI6MTd9; _RwBf=ilt=2&ihpd=2&ispd=0&rc=18&rb=18&gb=0&rg=0&pc=18&mtu=0&rbb=0.0&g=0&cid=&clo=0&v=1&l=2023-05-29T07:00:00.0000000Z&lft=0001-01-01T00:00:00.0000000&aof=0&o=0&p=BINGCOPILOTWAITLIST&c=MR000T&t=6822&s=2023-04-21T06:17:10.4188193+00:00&ts=2023-05-29T07:00:42.6820379+00:00&rwred=0&wls=2&lka=0&lkt=0&TH=&r=1&mta=0&e=krS-E5RaVOjIJCcokRTCl3uJoBGGh1fRA0yUyyY46-vYBNtCXC3z4rEoWop2i60IKyqv1Gg5d3ai4YUbn25yww&A=; _SS=SID=0A81892ACDEF647317179A36CC0565EC&R=18&RB=18&GB=0&RG=0&RP=18; ai_session=Hdh0ojlDt5EN5PijeVTb7O|1685343643223|1685343643223; SRCHHPGUSR=SRCHLANG=zh-Hans&PV=13.4.0&BRW=W&BRH=S&CW=1440&CH=282&SCW=1440&SCH=282&DPR=2.0&UTC=480&DM=0&HV=1685343642&WTS=63820671691&PRVCW=1440&PRVCH=764&BZA=0";


    const res = await fetch('https://www.bing.com/turing/conversation/create', {
        headers: fp.headers,
        method: 'GET',
    })


    console.log(111, JSON.stringify(res));

    
    ctx.body = res
})

export  default (app) => {
    app
    .use(router.routes())
    .use(router.allowedMethods())
}