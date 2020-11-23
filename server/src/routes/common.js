import KoaRouter from 'koa-router'
import CommonController from '../controllers/common'
const router = new KoaRouter()

router.get('/getCaptcha', CommonController.getCaptcha)
export default router
