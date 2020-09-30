/*
 * @Author       : luojiajun@3ncto.com
 * @Date         : 2020-09-23 18:16:15
 * @LastEditors  : luojiajun@3ncto.com
 * @LastEditTime : 2020-09-29 15:33:56
 * @FilePath     : /egg-init-test/app/router.js
 * @Description  : 路由入口文件
 */
'use strict'

module.exports = app => {
    require('@app/router/admin/topics')(app)
    require('@app/router/worker/topics')(app)

    require('@app/router/admin/etc')(app)
}
