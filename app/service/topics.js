/*
 * @Author       : luojiajun@3ncto.com
 * @Date         : 2020-09-23 18:17:25
 * @LastEditors  : luojiajun@3ncto.com
 * @LastEditTime : 2020-09-27 11:01:03
 * @FilePath     : /egg-init-template/app/service/topics.js
 * @Description  :
 */
'use strict'

const BaseService = require('@app/core/base_service')

class TopicService extends BaseService {
    // constructor(ctx) {
    //     super(ctx)
    // }

    async show(params) {
        const result = await this.request(`/topic/${params.id}`, {
            data: {
                mdrender: params.mdrender,
                accesstoken: params.accesstoken,
            },
        })

        return this.checkSuccess(result)
    }

    async list(params) {
        const result = await this.request('/topics', {
            data: params,
        })

        return this.checkSuccess(result)
    }

    async create(params) {
        const result = await this.request('/topics', {
            method: 'post',
            data: params,
            contentType: 'json',
        })

        this.checkSuccess(result)
        return result.data.topic_id
    }

    async update(params) {
        const result = await this.request('/topics/update', {
            method: 'post',
            data: params,
            contentType: 'json',
        })

        this.checkSuccess(result)
    }
}

module.exports = TopicService
