
import Koa  from 'koa'
const app = new Koa();
import router from './routes/index.mjs'


router(app)


app.listen(process.env.PORT, () => {
    console.log(`koa app listening on port ${process.env.PORT}`)
});