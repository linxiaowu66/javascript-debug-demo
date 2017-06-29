/* eslint import/no-extraneous-dependencies: 0*/
/* eslint-disable new-cap */
/* eslint no-param-reassign: 0 */
/* eslint global-require: 0 */

module.exports = {
  async uploadString(req, res) {
    const { string } = req.body

    try {
      if (!string) {
        throw new Error('参数错误')
      }
      console.log('client upload string: ', string)

      return res.send({
        status: 1,
        data: '提交成功'
      })
    } catch (err) {
      console.error('Controller failure: ', err)
      return res.status(503).json({
        status: 0,
        msg: '系统异常，请稍后再试'
      })
    }
  }
}
