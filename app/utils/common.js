/*
 * @Author       : luojiajun@3ncto.com
 * @Date         : 2020-09-25 00:35:28
 * @LastEditors  : luojiajun@3ncto.com
 * @LastEditTime : 2020-09-25 17:13:43
 * @FilePath     : /egg-init-template/app/utils/common.js
 * @Description  : 通用工具库
 */
'use strict'

const fs = require('fs')
const path = require('path')

/**
 * 递归创建文件夹
 * @param {string} dirname 创建的文件夹
 * @return {boolean} boolean
 */
const mkdirsSync = function f(dirname) {
    if (fs.existsSync(dirname)) {
        return true
    }
    if (f(path.dirname(dirname))) {
        fs.mkdirSync(dirname)
        return true
    }
}

module.exports = () => {
    return {
        /**
         * Parse the time to string
         * @param {(Object|string|number)} time timestamp
         * @param {string} cFormat {y}-{m}-{d} {h}:{i}:{s}
         * @return {string | null} format datetime
         */
        parseTime(time, cFormat) {
            if (arguments.length === 0 || !time) {
                return null
            }
            const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
            let date
            if (typeof time === 'object') {
                date = time
            } else {
                if (typeof time === 'string') {
                    if (/^[0-9]+$/.test(time)) {
                        // support "1548221490638"
                        time = parseInt(time)
                    } else {
                        // support safari
                        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
                        time = time.replace(new RegExp(/-/gm), '/')
                    }
                }

                if (typeof time === 'number' && time.toString().length === 10) {
                    time = time * 1000
                }
                date = new Date(time)
            }
            const formatObj = {
                y: date.getFullYear(),
                m: date.getMonth() + 1,
                d: date.getDate(),
                h: date.getHours(),
                i: date.getMinutes(),
                s: date.getSeconds(),
                a: date.getDay(),
            }
            const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
                const value = formatObj[ key ]
                // Note: getDay() returns 0 on Sunday
                if (key === 'a') {
                    return [ '日', '一', '二', '三', '四', '五', '六' ][ value ]
                }
                return value.toString().padStart(2, '0')
            })
            return time_str
        },

        /**
         * @param {number} time timestamp
         * @param {string} option parseTime formatter
         * @return {string} format datetime
         */
        formatTime(time, option) {
            if (('' + time).length === 10) {
                time = parseInt(time) * 1000
            } else {
                time = +time
            }
            const d = new Date(time)
            const now = Date.now()

            const diff = (now - d) / 1000

            if (diff < 30) {
                return '刚刚'
            } else if (diff < 3600) {
                // less 1 hour
                return Math.ceil(diff / 60) + '分钟前'
            } else if (diff < 3600 * 24) {
                return Math.ceil(diff / 3600) + '小时前'
            } else if (diff < 3600 * 24 * 2) {
                return '1天前'
            }
            if (option) {
                return this.parseTime(time, option)
            }
            return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
        },

        /**
         * 获取当前年月日对象
         * @return {Object} 年月日对象
         */
        getNowDateObject() {
            // 当前时间
            const currentTime = new Date().getHours()
            // 当前星期几
            const currentWeek = new Date().getDay() === 0 ? 7 : new Date().getDay()
            // 当前日期
            const currentDay = new Date().getDate()
            // 当前月
            const currentMonth = new Date().getMonth() + 1

            return {
                hour: currentTime,
                week: currentWeek,
                day: currentDay,
                month: currentMonth,
            }
        },

        /**
         * 指定天数的日期
         * getDateStr(-1) 昨天
         * getDateStr(1) 明天
         * @param {*} AddDayCount n 天前后的日期
         */
        getDateStr(AddDayCount) {
            const dd = new Date()
            dd.setDate(dd.getDate() + AddDayCount)
            const y = dd.getFullYear()
            const m = dd.getMonth() + 1 // 获取当前月份的日期
            const d = dd.getDate()
            return y + '-' + m + '-' + d
        },

        /**
         * @param {string} str value
         * @return {number} output value
         */
        byteLength(str) {
            // returns the byte length of an utf8 string
            let s = str.length
            for (let i = str.length - 1; i >= 0; i--) {
                const code = str.charCodeAt(i)
                if (code > 0x7f && code <= 0x7ff) s++
                else if (code > 0x7ff && code <= 0xffff) s += 2
                if (code >= 0xdc00 && code <= 0xdfff) i--
            }
            return s
        },

        /**
         * 获取字符串、数组、对象长度
         * @param {*} value 要判断的数据
         */
        size(value) {
            const get = value => (Array.isArray(value) ? value.length : value && typeof value === 'object' ? value.size || value.length || Object.keys(value).length : typeof value === 'string' ? new Blob([ value ]).size : 0)
            return get(value)
        },

        /**
         * Merges two objects, giving the last one precedence
         * @param {Object} target 目标数据
         * @param {(Object|Array)} source 源数据
         * @return {Object} 合并后的数据
         */
        objectMerge(target, source) {
            if (typeof target !== 'object') {
                target = {}
            }
            if (Array.isArray(source)) {
                return source.slice()
            }
            Object.keys(source).forEach(property => {
                const sourceProperty = source[ property ]
                if (typeof sourceProperty === 'object') {
                    target[ property ] = this.objectMerge(target[ property ], sourceProperty)
                } else {
                    target[ property ] = sourceProperty
                }
            })
            return target
        },

        /**
         * 过滤对象重复的值
         * @param {type}  obj 要过滤的对象
         * @return {type} 返回过滤后的对象
         */
        filterRepeatObject(obj) {
            const uniques = []
            const stringify = {}
            for (let i = 0; i < obj.length; i++) {
                const keys = Object.keys(obj[ i ])
                keys.sort(function (a, b) {
                    return Number(a) - Number(b)
                })
                let str = ''
                for (let j = 0; j < keys.length; j++) {
                    str += JSON.stringify(keys[ j ])
                    str += JSON.stringify(obj[ i ][ keys[ j ] ])
                }
                if (!stringify.hasOwnProperty(str)) {
                    uniques.push(obj[ i ])
                    stringify[ str ] = true
                }
            }
            return uniques
        },

        /**
         * 平铺对象数组
         * @param {*} arr 多维对象数组
         */
        flatten(arr) {
            return [].concat(...arr.map(item => [].concat(item, ...this.flatten(item.children || []))))
        },

        /**
         * 检出原数组被删除的选项
         * @param {*} originalData 原数组
         * @param {*} newData 新数组
         * @param {*} key 用来对比的键
         */
        notExistArray(originalData, newData, key) {
            const deleteData = []
            const oldData = originalData
            oldData.forEach(original => {
                let isVaild = false
                newData.forEach(item => {
                    if (original[ key ] === '' || Number(original[ key ]) === Number(item[ key ])) isVaild = true
                })

                if (!isVaild) {
                    original.is_delete = 1
                    deleteData.push(original)
                }
            })

            return JSON.parse(JSON.stringify([ ...newData, ...deleteData ]))
        },

        /**
         * 打乱数组
         * 注意：会改变原数组，建议克隆数组之后再使用该函数
         * @param {Array} arr 待打乱数组
         * @return {Array} 打乱后的数组
         */
        shuffle(arr) {
            for (let i = 1; i < arr.length; i++) {
                const random = Math.floor(Math.random() * (i + 1));
                [ arr[ i ], arr[ random ] ] = [ arr[ random ], arr[ i ] ]
            }
            return arr
        },

        /**
         * 对象数组排序（降序）
         * example： [{number: 1},{number: 2}].sort(this.app.common.compare('number'))
         * @param {String} property 指定排序的属性
         * @return {type} null
         */
        compare(property) {
            return (obj1, obj2) => {
                const value1 = obj1[ property ]
                const value2 = obj2[ property ]
                return value2 - value1
            }
        },

        /**
         * 千分位分隔符
         * @param {*} num 需要分割的数字
         * @param {String} symbol 分隔符
         * @return {String} 1,234,567
         */
        thousandFormat(num, symbol = ',') {
            const DIGIT_PATTERN = /(^|\s)\d+(?=\.?\d*($|\s))/g
            const MILI_PATTERN = /(?=(?!\b)(\d{3})+\.?\b)/g
            return num && num.toString().replace(DIGIT_PATTERN, m => m.replace(MILI_PATTERN, symbol))
        },

        /**
         * 生成指定范围随机数
         * @param {Number} max 最大范围
         * @param {Number} min 最小范围
         * @return {Number} 随机数
         */
        randomNum(max = 10, min = 0) {
            return Math.floor(Math.random() * ((max + 1) - min) + min)
        },

        mkdirsSync,
    }
}
