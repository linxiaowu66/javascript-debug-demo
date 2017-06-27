import { ajax } from '../../utils'

// 获取商家费用
export const getShopBillingAPI = ajax.fetchJSONByGet('/api/shop/billing/rule')

export const getShopIntegral = ajax.fetchJSONByGet('/api/shop/points')

export const getShopIntegralList = ajax.fetchJSONByGet('/api/shop/points/history')

export const getShopIntegralDetail = ajax.fetchJSONByGet('/api/shop/points/detail')

export const shopExchange = ajax.fetchJSONByPost('/api/shop/points/exchange')

// 获取商家骑手定位短信购买状态
export const getShopValuedServiceAPI = ajax.fetchJSONByGet('/api/shop/sms/status')

// 商家购买骑手定位短信服务
export const purchaseShopValuedServiceAPI = ajax.fetchJSONByPost('/api/shop/sms/purchase')

// 商家停用骑手定位短信服务
export const stopShopValuedServiceAPI = ajax.fetchJSONByPost('/api/shop/sms/stop')

// 获取商家取消订单规则
export const getShopCancelRule = ajax.fetchJSONByGet('/api/shop/order/cancel/rule')
