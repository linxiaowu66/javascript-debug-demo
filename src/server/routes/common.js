import ssrController from '../controllers/ssrController'
const commonController = require('../controllers/commonController')

exports = module.exports = [{
  method: 'GET',
  route: '/*',
  handlers: [
    ssrController
  ]
},
{
  method: 'post',
  route: '/api/upload/string',
  handlers: [
    commonController.uploadString,
  ]
}]
