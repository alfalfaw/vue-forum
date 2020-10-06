import Koa from 'koa'
import path from 'path'
import KoaCors from '@koa/cors'
import KoaBody from 'koa-body'
import KoaJson from 'koa-json'
import KoaHelmet from 'koa-helmet'
import KoaStatic from 'koa-static'
import routing from './routes'

const app = new Koa()

app.use(KoaBody())
app.use(KoaCors())
// 默认关闭 pretty , 只有当 query 参数中含有 pretty 时才会返回格式化参数
app.use(KoaJson({ pretty: false, param: 'pretty' }))
app.use(KoaHelmet())
app.use(KoaStatic(path.join(__dirname, '../public')))
routing(app)

app.listen(5000)
