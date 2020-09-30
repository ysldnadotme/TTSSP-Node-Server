/*
 * @Author       : luojiajun@3ncto.com
 * @Date         : 2020-09-27 10:33:15
 * @LastEditors  : luojiajun@3ncto.com
 * @LastEditTime : 2020-09-27 10:33:21
 * @FilePath     : /egg-init-template/config/config.prod.js
 * @Description  : 生产环境配置文件
 */
'use strict'

module.exports = () => {
    const config = {}

    // 服务器接口 URL
    config.serverUrl = 'https://cnodejs.org/api/v1'

    return config
}
