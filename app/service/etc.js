/*
 * @Author       : luojiajun@3ncto.com
 * @Date         : 2020-09-23 18:17:25
 * @LastEditors  : luojiajun@3ncto.com
 * @LastEditTime : 2020-09-29 15:38:06
 * @FilePath     : /egg-init-test/app/service/etc.js
 * @Description  :
 */
'use strict'

const BaseService = require('@app/core/base_service')

class EtcService extends BaseService {

    async cityVisitCount() {
        const result = await this.request('etc/get-all-city-visit-count')

        return this.checkSuccess(result)
    }
}

module.exports = EtcService
