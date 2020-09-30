/*
 * @Author       : luojiajun@3ncto.com
 * @Date         : 2020-09-25 11:15:55
 * @LastEditors  : luojiajun@3ncto.com
 * @LastEditTime : 2020-09-25 11:23:46
 * @FilePath     : /egg-init-template/app/router/worker/topics.js
 * @Description  : 小程序端接口路由
 */
'use strict'

module.exports = app => {
    const { router, controller } = app

    router.get('topics_show', '/api/worker/topics/:id', controller.worker.topics.show)
}
