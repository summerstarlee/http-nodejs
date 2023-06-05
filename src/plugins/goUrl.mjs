let cookies = [
    ""
]

const goUrl = async (url, ctx) => {
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

    let cookieID = 0;
    if (reqHeaders.newbinggogoweb) {
        console.log(222);
        //添加配置的随机cookie
        if (cookies.length === 0) {
            console.log(3333, '没有任何可用cookie，请前在第一行代码cookies变量中添加cookie');
        }
        console.log(3111);

        cookieID = Math.floor(Math.random() * cookies.length);
        console.log(4444);
        let userCookieID = reqHeaders.cookieID

        if (userCookieID) {
            if (userCookieID >= 0 && userCookieID <= cookies.length - 1) {
                cookieID = userCookieID;
            } else {
                return getReturnError("cookieID不存在，请刷新页面测试！");
            }
        }

        headers.cookie = cookies[cookieID]
    }

    console.log(555, headers);


    const res = await fetch(url, {
        headers,
    })

    console.log(6666, res);

    return res
}

export default goUrl