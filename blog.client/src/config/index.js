/**
 * @description 4个子配置，vue/cli配置|通用配置|主题配置|网络配置导出
 */
const setting = require('./setting.config')
const network = require('./net.config')
console.log('network', network)
module.exports = {
  ...setting,
  ...network,
}
