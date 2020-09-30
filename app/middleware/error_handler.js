/*
 * @Author       : luojiajun@3ncto.com
 * @Date         : 2020-09-23 18:18:27
 * @LastEditors  : luojiajun@3ncto.com
 * @LastEditTime : 2020-09-27 11:01:40
 * @FilePath     : /egg-init-template/app/middleware/error_handler.js
 * @Description  : RESTful API 统一错误处理
 */
'use strict'

module.exports = () => {
    return async function errorHandler(ctx, next) {
        try {
            await next()
        } catch (err) {
            // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
            ctx.app.emit('error', err, ctx)

            const status = err.status || 500
            // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
            const error = status === 500 && ctx.app.config.env === 'prod'
                ? 'Internal Server Error'
                : err.message

            // 从 error 对象上读出各个属性，设置到响应中，4xx 错误 egg 框架已处理，例如 validate、jwt 等业务错误会抛出 422 错误码
            ctx.body = { code: -1, message: error }
            // if (status === 422) {
            //     ctx.body.message = err.errors;
            // }
            ctx.status = status
        }
    }
}
