import has from 'lodash/has'
import trim from 'lodash/trim'
import mapValues from 'lodash/mapValues'
import isEqual from 'lodash/isEqual'
import camelCase from 'lodash/camelCase'
import capitalize from 'lodash/capitalize'
import startCase from 'lodash/startCase'
import kebabCase from 'lodash/kebabCase'
import snakeCase from 'lodash/snakeCase'
import cloneDeep from 'lodash/cloneDeep'
import throttle from 'lodash/throttle'
import debounce from 'lodash/debounce'
import groupBy from 'lodash/groupBy'
import isArray from 'lodash/isArray'
import isObject from 'lodash/isObject'
import isString from 'lodash/isString'
import isFunction from 'lodash/isFunction'
import get from 'lodash/get'
import eachRight from 'lodash/eachRight'
import replace from 'lodash/replace'

Array.prototype.isArray = true;
String.prototype.lines = function() { return this.split(/\r*\n/); }
String.prototype.lineCount = function() { return this.lines().length; }
String.prototype.toSentenceCase = function() { return this.replace(/(^\w{1}|\.\s*\w{1})/gi, function(toReplace) { return toReplace.toUpperCase(); }) }
String.prototype.camelCase = function() { return camelCase(this) }
String.prototype.capitalize = function() { return capitalize(this) }
String.prototype.startCase = function() { return startCase(this) }
String.prototype.kebabCase = function() { return kebabCase(this) }
String.prototype.snakeCase = function() { return snakeCase(this) }
String.prototype.trim = function(toReplace) { return toReplace ? trim(this, toReplace) : trim(this) }

const trans = function(string, args) {
    if(string) {
        let value = get(window.locale, string)
            eachRight(args, (paramVal, paramKey) => {
        value = replace(value, `:${paramKey}`, paramVal)
        })
        return value
    }
    return ''
}

window._ = {
    'has': has,
    'trim': trim,
    'mapValues': mapValues,
    'isEqual': isEqual,
    'camelCase': camelCase,
    'capitalize': capitalize,
    'startCase': startCase,
    'kebabCase': kebabCase,
    'snakeCase': snakeCase,
    'cloneDeep': cloneDeep,
    'throttle': throttle,
    'debounce': debounce,
    'groupBy': groupBy,
    'isObject': isObject,
    'isArray': isArray,
    'isString': isString,
    'isFunction': isFunction,
}
window.trans = trans
window.$t = trans

if (!Object.prototype.objForEach) {
    Object.defineProperty(Object.prototype, 'objForEach', {
        value: function(callback, thisArg) {
            if (this == null) {
                throw new TypeError('Not an object')
            }
            thisArg = thisArg || window
            for (var key in this) {
                if (this.hasOwnProperty(key)) {
                    callback.call(thisArg, this[key], key, this)
                }
            }
        }
    })
}
