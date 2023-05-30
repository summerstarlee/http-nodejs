
import Koa  from 'koa'
import websockify from 'koa-websocket'
import bodyParser from 'koa-bodyparser'
const app = websockify(new Koa());

import router from './routes/index.mjs'
import socket from './routes/socket.mjs'


app.use(bodyParser());
router(app)
socket(app)




app.listen(process.env.PORT || 3000, () => {
    console.log(`koa app listening on port ${process.env.PORT || 3000}`)
});