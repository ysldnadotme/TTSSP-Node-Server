/*
 * @Author       : luojiajun@3ncto.com
 * @Date         : 2020-09-23 18:16:34
 * @LastEditors  : luojiajun@3ncto.com
 * @LastEditTime : 2020-09-29 17:55:02
 * @FilePath     : /egg-init-test/app/controller/admin/etc.js
 * @Description  :
 */
'use strict'

const BaseController = require('@app/core/base_controller')

class EtcController extends BaseController {
    // constructor(ctx) {
    //     super(ctx)
    // }

    async cityVisitCount() {
        const { ctx } = this

        const list = await ctx.service.etc.cityVisitCount()

        ctx.renderJSON(list)
    }
}

module.exports = EtcController
