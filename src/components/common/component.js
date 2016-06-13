/**
 * abstract component
 */

import CommonState from '../../stateenum/common.state';

'use strict';


/**
 * (description)
 * 
 * @export
 * @abstract 
 * @class Component
 */
export default class Component {
  /**
   * @constructor
   */
  constructor() {
    /**
     * 状态, 每个组件都会拥有一个状态, 用这个标识来确定UI的形态
     * 
     * @protected 
     */
    this._state = CommonState.ENABLE;
    /**
     * 这个值通常是经`this._state`变化而得来的, 在UI方面实际上使用的是ng-disabled在实现, 所以绑定此值来切换状态
     * 
     * @protected
     * @type {Boolean}
     * @default false
     * @see `this._renderEnable` method
     * @see `this._renderDisable` method
     */
    this._disabled = false;
    /**
     * 是否初始化完毕, 标识是是否执行完$onInit
     * 
     * @protected
     * @type {Boolean}
     * @default false
     * @see $onInit
     */
    this._init = false;
  }
  /**
   * get component state
   * 
   * @public 
   * @implements {IComponentState}
   */ 
  get state() {
    return this._state;
  }
  /**
   * set component state
   * 
   * @public 
   * @implements {IComponentState}
   */
  set state(state) {
    this._state = state;
    this._render(this._state);
  }
  /**
   * template pattern
   * 
   * @protected 
   * @final
   */
  $onInit() {
    this._initDefaultValue();
    this._launch();
    this._render(this._state);
    this._init = true;
  }
  /**
   * 初始化默认值, 因为angular组件变量传递是在component定义决定的, 有些值可能没有传进来, 所以在这里确定一次
   * 
   * @protected 
   */
  _initDefaultValue() {
    throw new Error('IllegalOperationError for _initDefaultValue method, you need override the method');
  }
  /**
   * 确定className, 处理过之后赋值到`this.className`属性, 并经由此属性填充到UI(html)的class属性里
   * 每次render都会重新计算一次样式
   * 
   * @protected 
   * @see this._render method
   */
  _createClassName() {
    throw new Error('IllegalOperationError for _createClassName method, you need override the method');
  }
  /**
   * 实现组件功能的细节部分
   * 
   * @protected 
   */
  _launch() {
    throw new Error('IllegalOperationError for _launch method, you need override the method');
  }
  /**
   * 针对不同的状态, 做UI变化, 如果子类有新状态那么override, 并super调用此方法
   * 
   * @protected
   * @param {string} state 状态名, 一般来自枚举 
   */
  _render(state) {
    this._createClassName();
    switch(state) {
      case CommonState.ENABLE :
        this._renderEnable();
        return;
      case CommonState.DISABLE :
        this._renderDisable();
        return;
    }
  }
  /**
   * 切换到可用状态, 如果需要特别操作, 请override
   * 
   * @protected
   */
  _renderEnable() {
    this._disabled = false;
  }
  /**
   * 切换到禁用状态, override同上
   */
  _renderDisable() {
    this._disabled = true;
  }
}