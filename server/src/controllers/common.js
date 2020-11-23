import svgCaptcha from 'svg-captcha'

class CommonController {
  async getCaptcha(ctx) {
    const newCaptcha = svgCaptcha.create({
      width: 100,
      height: 40,
      size: 5,
      // 忽略易混淆字母
      ignoreChars: '0o1il',
      color: true,
      noise: Math.floor(Math.random() * 5)
    })
    ctx.body = {
      code: 200,
      data: newCaptcha.data
    }
  }
}
export default new CommonController()
