/*
 * @Author       : luojiajun@3ncto.com
 * @Date         : 2020-09-24 14:26:31
 * @LastEditors  : luojiajun@3ncto.com
 * @LastEditTime : 2020-09-24 18:05:32
 * @FilePath     : /egg-init-template/app/middleware/notfound_handler.js
 * @Description  : 自定义 404 响应
 */
'use strict'

module.exports = () => {
    return async function notFoundHandler(ctx, next) {
        await next()
        if (ctx.status === 404 && !ctx.body) {
            if (ctx.acceptJSON) {
                ctx.body = { message: `${ctx.request.url} Not Found`, code: -1 }
            } else {
                ctx.body = `<h1>${ctx.request.url} Not Found</h1>`
            }
        }
    }
}
