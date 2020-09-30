/*
 * @Author       : luojiajun@3ncto.com
 * @Date         : 2020-09-27 10:31:57
 * @LastEditors  : luojiajun@3ncto.com
 * @LastEditTime : 2020-09-29 18:55:27
 * @FilePath     : /egg-init-test/config/config.local.js
 * @Description  : 本地配置文件
 */
'use strict'

module.exports = () => {
    const config = {}

    // 服务器接口 URL
    config.serverUrl = 'http://127.0.0.1:7912'
    // config.serverUrl = 'https://cnodejs.org/api/v1'

    return config
}
