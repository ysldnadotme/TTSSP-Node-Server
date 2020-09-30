/*
 * @Author       : luojiajun@3ncto.com
 * @Date         : 2020-09-29 15:33:25
 * @LastEditors  : luojiajun@3ncto.com
 * @LastEditTime : 2020-09-29 15:43:54
 * @FilePath     : /egg-init-test/app/router/admin/etc.js
 * @Description  :
 */
'use strict'

module.exports = app => {
    const { router, controller } = app

    router.get('cityVisitCount', '/api/admin/etc/city-visit-count', controller.admin.etc.cityVisitCount)
}
