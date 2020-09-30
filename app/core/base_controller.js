/*
 * @Author       : luojiajun@3ncto.com
 * @Date         : 2020-09-24 12:01:47
 * @LastEditors  : luojiajun@3ncto.com
 * @LastEditTime : 2020-09-25 19:08:00
 * @FilePath     : /egg-init-template/app/core/base_controller.js
 * @Description  :
 */
'use strict'

const { Controller } = require('egg')
const fs = require('fs')
const path = require('path')
const pump = require('mz-modules/pump')


class BaseController extends Controller {
    // constructor(ctx) {
    //     super(ctx)
    // }

    get token() {
        return this.ctx.header.token
    }

    async multipleUploadStream() {
        const { ctx, app } = this
        const uploadDir = 'app/public/upload'
        app.utils.common.mkdirsSync(uploadDir)

        const parts = ctx.multipart({ autoFields: true })
        const files = []
        let stream
        while ((stream = await parts()) != null) {
            if (!stream.filename) {
                break
            }
            const filename = Date.now() + '' + Number.parseInt(Math.random() * 10000) + path.extname(stream.filename)
            const target = path.join(this.config.baseDir, uploadDir, filename)
            const writeStream = fs.createWriteStream(target)
            await pump(stream, writeStream)
            files.push(filename)
        }

        return {
            fields: Object.keys(parts.field).map(key => ({ key, value: parts.field[ key ] })),
            files,
        }
    }
}

module.exports = BaseController
