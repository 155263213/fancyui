/**
 * Radio component define
 */

import controller from './radio';
import template from './template.html';
import './radio.less';

'use strict';

let componentDefine = {
  template,
  controller,
  controllerAs: 'controller',
  transclude: true,
  bindings: {
    /**
     * 是否被禁用
     *
     * @type {Boolean}
     */
    disabled: '<',

    /**
     * 选中后的值
     *
     * @type {String}
     */
    value: '@',

    /**
     * model
     * @type {String}
     */
    model: '=?model',

    /**
     *因为value只能提供String  复杂结构数据类型使用 complex指令
     * @type {anyObject}
     */
    complex: '=?complex'
  }
};

export default componentDefine;