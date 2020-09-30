/*
 * @Author       : luojiajun@3ncto.com
 * @Date         : 2020-09-23 18:19:23
 * @LastEditors  : luojiajun@3ncto.com
 * @LastEditTime : 2020-09-29 15:38:46
 * @FilePath     : /egg-init-test/config/config.default.js
 * @Description  : 默认配置
 */
'use strict'

module.exports = appInfo => {
    const config = {}

    config.keys = appInfo.name + '_1601173247150_5967'

    // 服务器接口 URL
    config.serverUrl = 'https://cnodejs.org/api/v1'

    config.middleware = [ 'errorHandler', 'notfoundHandler' ]
    // errorHandler 只对 /api 前缀的 url 路径生效
    config.errorHandler = {
        match: '/api',
    }

    config.customLoader = {
        enum: {
            directory: 'app/enum',
            inject: 'ctx',
        },
        utils: {
            directory: 'app/utils',
            inject: 'app',
        },
        rpc: {
            directory: 'app/rpc',
            inject: 'ctx',
        },
    }

    config.cors = {
        // https://github.com/eggjs/egg/issues/3160
        credentials: true,
        origin: ctx => ctx.get('origin'),
        allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    }

    config.security = {
        // https://github.com/eggjs/egg-security#ctxissafedomaindomain
        // https://github.com/eggjs/egg-cors#configuration
        domainWhiteList: [ 'http://localhost:8082' ],
        csrf: {
            ignore: '/api',
        },
    }

    config.multipart = {
        fileSize: '5mb',
    }

    return config
}
