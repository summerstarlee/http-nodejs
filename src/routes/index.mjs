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
    // headers['X-forwarded-for'] = randomAddress.randomIp
    headers.cookies = 'MUID=07013BF7E65E616F306928EAE7B46066; SRCHD=AF=NOFORM; SRCHUID=V=2&GUID=79126E1DCE654BB695EDC0F2398F58B3&dmnchg=1; ANON=A=B674E3C09CF88B09C9CB38F8FFFFFFFF&E=1c61&W=1; NAP=V=1.9&E=1c07&C=YYtr7f3fvFynKZYsnVmX4qZG2_X51bwu5pY0H_vaHOjGne-e11FHRQ&W=1; PPLState=1; SnrOvr=X=rebateson; _UR=QS=0&TQS=0; MicrosoftApplicationsTelemetryDeviceId=ce741b8f-578b-4e33-af29-b3df732bdb58; _HPVN=CS=eyJQbiI6eyJDbiI6MiwiU3QiOjAsIlFzIjowLCJQcm9kIjoiUCJ9LCJTYyI6eyJDbiI6MiwiU3QiOjAsIlFzIjowLCJQcm9kIjoiSCJ9LCJReiI6eyJDbiI6MiwiU3QiOjAsIlFzIjowLCJQcm9kIjoiVCJ9LCJBcCI6dHJ1ZSwiTXV0ZSI6dHJ1ZSwiTGFkIjoiMjAyMy0wNy0wNVQwMDowMDowMFoiLCJJb3RkIjowLCJHd2IiOjAsIkRmdCI6bnVsbCwiTXZzIjowLCJGbHQiOjAsIkltcCI6MTR9; ABDEF=V=13&ABDV=13&MRNB=1688624084049&MRB=0; WLS=C=dc7a3b68ad029e09&N=star; _U=1A5DkziarvvewlZulclCf21HfHpWJ4jhWjIOCOn9jMoSRtckcIztYJX02mnpNcHhd8bqIo-QJXAzelvOHlgopnnbgEyWlWmJGV-KB9TbazRqqkOwOwt8mdbh-sGYFYvGo7kkeA8YwEM-76vz7fUhNw7ub5MdwFNO_7V67o4eAdB193b4ecd9JHLL7VsE7-FN92dvITn-cCLJDDq4dkH_Ryg; _clck=ojkrst|2|fd9|0|1241; SRCHUSR=DOB=20230526&T=1689239965000&POEX=W; _clsk=833xii|1689239967345|1|0|r.clarity.ms/collect; _SS=SID=08A480DDDDD1688B3ED19390DCA269A1&R=33&RB=33&GB=0&RG=0&RP=33&OCID=MY0291; _RwBf=ilt=1&ihpd=0&ispd=0&rc=33&rb=33&gb=0&rg=0&pc=33&mtu=0&rbb=0.0&g=0&cid=&clo=0&v=2&l=2023-07-13T07:00:00.0000000Z&lft=0001-01-01T00:00:00.0000000&aof=0&o=0&p=BINGCOPILOTWAITLIST&c=MR000T&t=6822&s=2023-04-21T06:17:10.4188193+00:00&ts=2023-07-13T09:19:28.7777433+00:00&rwred=0&wls=2&lka=0&lkt=0&TH=&r=1&mta=0&e=krS-E5RaVOjIJCcokRTCl3uJoBGGh1fRA0yUyyY46-vYBNtCXC3z4rEoWop2i60IKyqv1Gg5d3ai4YUbn25yww&A=&dci=0; dsc=order=News; ipv6=hit=1689243572241&t=6; GC=dk7nk34wF8kB8djarmrIkatUjDuTBnd4MF8uzOeFIy628VnZrUL7m_ihckv0__bNSae9yGyRN2r9OirgKDryxQ; SRCHHPGUSR=SRCHLANG=zh-Hans&PV=13.4.0&HV=1689239969&WTS=63820665176&BRW=XW&BRH=M&CW=1496&CH=796&SCW=1402&SCH=316&DPR=2.0&UTC=480&DM=0&EXLTT=22&PRVCW=1496&PRVCH=796&BZA=0&cdxtone=Creative&cdxtoneopts=h3imaginative,gencontentv3'

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