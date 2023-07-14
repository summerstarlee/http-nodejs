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
    headers['user-agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36 Edg/113.0.1774.57'

    randomAddress.reset()
    headers['X-forwarded-for'] = randomAddress.randomIp

    const res = await fetch("https://cn.bing.com/turing/conversation/create", {
        headers: {
            ...headers,
            accept: 'application/json',
            'accept-language': 'en-US,en;q=0.9',
            'content-type': 'application/json',
            'sec-ch-ua':
                '"Not_A Brand";v="99", "Microsoft Edge";v="109", "Chromium";v="109"',
            'sec-ch-ua-arch': '"x86"',
            'sec-ch-ua-bitness': '"64"',
            'sec-ch-ua-full-version': '"109.0.1518.78"',
            'sec-ch-ua-full-version-list':
                '"Not_A Brand";v="99.0.0.0", "Microsoft Edge";v="109.0.1518.78", "Chromium";v="109.0.5414.120"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-model': '',
            'sec-ch-ua-platform': '"macOS"',
            'sec-ch-ua-platform-version': '"12.6.0"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'x-edge-shopping-flag': '1',
            'x-ms-client-request-id': requestId,
            'x-ms-useragent':
                'azsdk-js-api-client-factory/1.0.0-beta.1 core-rest-pipeline/1.10.0 OS/MacIntel',
            cookie: 'MUID=07013BF7E65E616F306928EAE7B46066; SRCHD=AF=NOFORM; SRCHUID=V=2&GUID=79126E1DCE654BB695EDC0F2398F58B3&dmnchg=1; ANON=A=B674E3C09CF88B09C9CB38F8FFFFFFFF&E=1c61&W=1; NAP=V=1.9&E=1c07&C=YYtr7f3fvFynKZYsnVmX4qZG2_X51bwu5pY0H_vaHOjGne-e11FHRQ&W=1; PPLState=1; SnrOvr=X=rebateson; _UR=QS=0&TQS=0; MicrosoftApplicationsTelemetryDeviceId=ce741b8f-578b-4e33-af29-b3df732bdb58; _HPVN=CS=eyJQbiI6eyJDbiI6MiwiU3QiOjAsIlFzIjowLCJQcm9kIjoiUCJ9LCJTYyI6eyJDbiI6MiwiU3QiOjAsIlFzIjowLCJQcm9kIjoiSCJ9LCJReiI6eyJDbiI6MiwiU3QiOjAsIlFzIjowLCJQcm9kIjoiVCJ9LCJBcCI6dHJ1ZSwiTXV0ZSI6dHJ1ZSwiTGFkIjoiMjAyMy0wNy0wNVQwMDowMDowMFoiLCJJb3RkIjowLCJHd2IiOjAsIkRmdCI6bnVsbCwiTXZzIjowLCJGbHQiOjAsIkltcCI6MTR9; ABDEF=V=13&ABDV=13&MRNB=1689302333194&MRB=0; SRCHUSR=DOB=20230526&T=1689302332000&POEX=W; WLS=C=dc7a3b68ad029e09&N=star; _U=1Y6ocXAzRZU4Fj-LyY-CmHcnchLogL6KLaH5bm7Cxl9vEQ-dE3LDNDCuaV91FarSpJCbkDGLAuAf0jFXwvynKG7Z4rwVzMI-UFs4NV4MpJNODDw8fZUp0hVmzrQ43pb_mhV-0mfwF89Pn6DMxat9jFOR7EP5j2FmCGZosLi96zbj-DjnNUrK3X5M3nyicFOLjW95JfpQEWfO2yyd9YzGd_g; _clck=ojkrst|2|fda|0|1241; _SS=SID=37C694DD9A1B6C3711B187939B616D77&R=33&RB=33&GB=0&RG=0&RP=33&OCID=MY0291; _RwBf=ilt=1&ihpd=0&ispd=0&rc=33&rb=33&gb=0&rg=0&pc=33&mtu=0&rbb=0.0&g=0&cid=&clo=0&v=5&l=2023-07-13T07:00:00.0000000Z&lft=0001-01-01T00:00:00.0000000&aof=0&o=0&p=BINGCOPILOTWAITLIST&c=MR000T&t=6822&s=2023-04-21T06:17:10.4188193+00:00&ts=2023-07-14T03:21:39.9995973+00:00&rwred=0&wls=2&lka=0&lkt=0&TH=&r=1&mta=0&e=krS-E5RaVOjIJCcokRTCl3uJoBGGh1fRA0yUyyY46-vYBNtCXC3z4rEoWop2i60IKyqv1Gg5d3ai4YUbn25yww&A=&dci=0; dsc=order=News; _clsk=pt0wm|1689304900267|1|1|j.clarity.ms/collect; ipv6=hit=1689308503423&t=6; GC=dk7nk34wF8kB8djarmrIkatUjDuTBnd4MF8uzOeFIy7px9j6jb8xWo94n-DlQwWEroG-eXpojIpPMyOCVI2fsQ; SRCHHPGUSR=SRCHLANG=zh-Hans&PV=13.4.0&HV=1689304901&WTS=63820665176&BRW=W&BRH=S&CW=1383&CH=208&SCW=1402&SCH=4151&DPR=2.0&UTC=480&DM=0&EXLTT=24&PRVCW=1496&PRVCH=796&BZA=0&cdxtone=Creative&cdxtoneopts=h3imaginative,gencontentv3&IG=0D381B4014C94652BA609E7ECBCEF6A0'
        },
        referrer: 'https://www.bing.com/search',
        referrerPolicy: 'origin-when-cross-origin',
        body: null,
        method: 'GET',
        mode: 'cors',
        credentials: 'include'
    })
    ctx.body = await res.json()
})

export default (app) => {
    app
        .use(router.routes())
        .use(router.allowedMethods())
}
