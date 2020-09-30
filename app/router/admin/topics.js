/*
 * @Author       : luojiajun@3ncto.com
 * @Date         : 2020-09-25 11:15:50
 * @LastEditors  : luojiajun@3ncto.com
 * @LastEditTime : 2020-09-29 15:32:05
 * @FilePath     : /egg-init-test/app/router/admin/topics.js
 * @Description  : 后台接口路由
 */
'use strict'

module.exports = app => {
    const { router, controller } = app

    router.get('topics_list', '/api/admin/topics', controller.admin.topics.index)
    router.get('topics_show', '/api/admin/topics/:id', controller.admin.topics.show)
    router.post('topics_upload', '/api/admin/topics/upload', controller.admin.topics.upload)
}
