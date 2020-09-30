/*
 * @Author       : luojiajun@3ncto.com
 * @Date         : 2020-09-24 18:13:44
 * @LastEditors  : luojiajun@3ncto.com
 * @LastEditTime : 2020-09-29 17:48:10
 * @FilePath     : /egg-init-test/app/core/base_service.js
 * @Description  :
 */
'use strict'

const { Service } = require('egg')

class BaseService extends Service {
    constructor(ctx) {
        super(ctx)
        this.serverUrl = this.ctx.app.config.serverUrl
    }

    async request(api, opts) {
        const options = Object.assign({
            timeout: [ '30s', '30s' ],
            dataType: 'json',
        }, opts)

        return await this.ctx.curl(`${this.serverUrl}/${api}`, options)
    }

    /**
     * 后端接口返回统一处理
     * 该方法需要根据不同项目后端返回的数据格式调整
     * @param {Obejct} result 后端接口返回的数据
     */
    checkSuccess(result) {
        if (result.status !== 200) {
            const errorMsg = result.data && result.data.message ? result.data.message : 'unknown error'
            this.ctx.throw(result.status, errorMsg)
        }
        if (result.data.code !== 0) {
            this.ctx.throw(500, 'remote response error', { data: result.data })
        }
        return result.data.data
    }
}

module.exports = BaseService
