/*
 * @Author       : luojiajun@3ncto.com
 * @Date         : 2020-09-24 18:56:45
 * @LastEditors  : luojiajun@3ncto.com
 * @LastEditTime : 2020-09-27 11:13:49
 * @FilePath     : /egg-init-template/app/extend/context.js
 * @Description  : 扩展 Context
 */
'use strict'

module.exports = {
    /**
     * 统一输出JSON格式
     * 如何使用 ctx.renderJSON(0, '登录成功', result.id);
     * @param {*} data 返回数据
     * @param {*} message 自定义信息
     * @param {*} code 全局统一 0: 成功 -1: 失败
     */
    renderJSON(data, message, code = 0) {
        this.body = {
            code,
            message: message || (code === 0 ? 'success' : 'fail'),
            data,
        }
    },
}
