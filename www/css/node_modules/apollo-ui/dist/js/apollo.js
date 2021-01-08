/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * Apollo JS v0.3.0
	 */

	///
	/// Bootstrap jQuery Plugins
	///

	__webpack_require__( 1 );
	__webpack_require__( 2 );
	__webpack_require__( 3 );
	__webpack_require__( 4 );
	__webpack_require__( 5 );
	__webpack_require__( 6 );
	__webpack_require__( 7 );


	///
	/// Custom scripts
	///

	var offCanvas = __webpack_require__( 8 );

	$( document ).ready( function() {
	  offCanvas.init();
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, module], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
	    factory(exports, module);
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod.exports, mod);
	    global.util = mod.exports;
	  }
	})(this, function (exports, module) {
	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v4.0.0-alpha.2): util.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	   * --------------------------------------------------------------------------
	   */

	  'use strict';

	  var Util = (function ($) {

	    /**
	     * ------------------------------------------------------------------------
	     * Private TransitionEnd Helpers
	     * ------------------------------------------------------------------------
	     */

	    var transition = false;

	    var TransitionEndEvent = {
	      WebkitTransition: 'webkitTransitionEnd',
	      MozTransition: 'transitionend',
	      OTransition: 'oTransitionEnd otransitionend',
	      transition: 'transitionend'
	    };

	    // shoutout AngusCroll (https://goo.gl/pxwQGp)
	    function toType(obj) {
	      return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
	    }

	    function isElement(obj) {
	      return (obj[0] || obj).nodeType;
	    }

	    function getSpecialTransitionEndEvent() {
	      return {
	        bindType: transition.end,
	        delegateType: transition.end,
	        handle: function handle(event) {
	          if ($(event.target).is(this)) {
	            return event.handleObj.handler.apply(this, arguments);
	          }
	        }
	      };
	    }

	    function transitionEndTest() {
	      if (window.QUnit) {
	        return false;
	      }

	      var el = document.createElement('bootstrap');

	      for (var _name in TransitionEndEvent) {
	        if (el.style[_name] !== undefined) {
	          return { end: TransitionEndEvent[_name] };
	        }
	      }

	      return false;
	    }

	    function transitionEndEmulator(duration) {
	      var _this = this;

	      var called = false;

	      $(this).one(Util.TRANSITION_END, function () {
	        called = true;
	      });

	      setTimeout(function () {
	        if (!called) {
	          Util.triggerTransitionEnd(_this);
	        }
	      }, duration);

	      return this;
	    }

	    function setTransitionEndSupport() {
	      transition = transitionEndTest();

	      $.fn.emulateTransitionEnd = transitionEndEmulator;

	      if (Util.supportsTransitionEnd()) {
	        $.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
	      }
	    }

	    /**
	     * --------------------------------------------------------------------------
	     * Public Util Api
	     * --------------------------------------------------------------------------
	     */

	    var Util = {

	      TRANSITION_END: 'bsTransitionEnd',

	      getUID: function getUID(prefix) {
	        do {
	          prefix += ~ ~(Math.random() * 1000000); // "~~" acts like a faster Math.floor() here
	        } while (document.getElementById(prefix));
	        return prefix;
	      },

	      getSelectorFromElement: function getSelectorFromElement(element) {
	        var selector = element.getAttribute('data-target');

	        if (!selector) {
	          selector = element.getAttribute('href') || '';
	          selector = /^#[a-z]/i.test(selector) ? selector : null;
	        }

	        return selector;
	      },

	      reflow: function reflow(element) {
	        new Function('bs', 'return bs')(element.offsetHeight);
	      },

	      triggerTransitionEnd: function triggerTransitionEnd(element) {
	        $(element).trigger(transition.end);
	      },

	      supportsTransitionEnd: function supportsTransitionEnd() {
	        return Boolean(transition);
	      },

	      typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
	        for (var property in configTypes) {
	          if (configTypes.hasOwnProperty(property)) {
	            var expectedTypes = configTypes[property];
	            var value = config[property];
	            var valueType = undefined;

	            if (value && isElement(value)) {
	              valueType = 'element';
	            } else {
	              valueType = toType(value);
	            }

	            if (!new RegExp(expectedTypes).test(valueType)) {
	              throw new Error(componentName.toUpperCase() + ': ' + ('Option "' + property + '" provided type "' + valueType + '" ') + ('but expected type "' + expectedTypes + '".'));
	            }
	          }
	        }
	      }
	    };

	    setTransitionEndSupport();

	    return Util;
	  })(jQuery);

	  module.exports = Util;
	});


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, module, __webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
	    factory(exports, module, require('./util'));
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod.exports, mod, global.Util);
	    global.alert = mod.exports;
	  }
	})(this, function (exports, module, _util) {
	  'use strict';

	  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	  var _Util = _interopRequireDefault(_util);

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v4.0.0-alpha.2): alert.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	   * --------------------------------------------------------------------------
	   */

	  var Alert = (function ($) {

	    /**
	     * ------------------------------------------------------------------------
	     * Constants
	     * ------------------------------------------------------------------------
	     */

	    var NAME = 'alert';
	    var VERSION = '4.0.0-alpha';
	    var DATA_KEY = 'bs.alert';
	    var EVENT_KEY = '.' + DATA_KEY;
	    var DATA_API_KEY = '.data-api';
	    var JQUERY_NO_CONFLICT = $.fn[NAME];
	    var TRANSITION_DURATION = 150;

	    var Selector = {
	      DISMISS: '[data-dismiss="alert"]'
	    };

	    var Event = {
	      CLOSE: 'close' + EVENT_KEY,
	      CLOSED: 'closed' + EVENT_KEY,
	      CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
	    };

	    var ClassName = {
	      ALERT: 'alert',
	      FADE: 'fade',
	      IN: 'in'
	    };

	    /**
	     * ------------------------------------------------------------------------
	     * Class Definition
	     * ------------------------------------------------------------------------
	     */

	    var Alert = (function () {
	      function Alert(element) {
	        _classCallCheck(this, Alert);

	        this._element = element;
	      }

	      /**
	       * ------------------------------------------------------------------------
	       * Data Api implementation
	       * ------------------------------------------------------------------------
	       */

	      // getters

	      _createClass(Alert, [{
	        key: 'close',

	        // public

	        value: function close(element) {
	          element = element || this._element;

	          var rootElement = this._getRootElement(element);
	          var customEvent = this._triggerCloseEvent(rootElement);

	          if (customEvent.isDefaultPrevented()) {
	            return;
	          }

	          this._removeElement(rootElement);
	        }
	      }, {
	        key: 'dispose',
	        value: function dispose() {
	          $.removeData(this._element, DATA_KEY);
	          this._element = null;
	        }

	        // private

	      }, {
	        key: '_getRootElement',
	        value: function _getRootElement(element) {
	          var selector = _Util['default'].getSelectorFromElement(element);
	          var parent = false;

	          if (selector) {
	            parent = $(selector)[0];
	          }

	          if (!parent) {
	            parent = $(element).closest('.' + ClassName.ALERT)[0];
	          }

	          return parent;
	        }
	      }, {
	        key: '_triggerCloseEvent',
	        value: function _triggerCloseEvent(element) {
	          var closeEvent = $.Event(Event.CLOSE);

	          $(element).trigger(closeEvent);
	          return closeEvent;
	        }
	      }, {
	        key: '_removeElement',
	        value: function _removeElement(element) {
	          $(element).removeClass(ClassName.IN);

	          if (!_Util['default'].supportsTransitionEnd() || !$(element).hasClass(ClassName.FADE)) {
	            this._destroyElement(element);
	            return;
	          }

	          $(element).one(_Util['default'].TRANSITION_END, $.proxy(this._destroyElement, this, element)).emulateTransitionEnd(TRANSITION_DURATION);
	        }
	      }, {
	        key: '_destroyElement',
	        value: function _destroyElement(element) {
	          $(element).detach().trigger(Event.CLOSED).remove();
	        }

	        // static

	      }], [{
	        key: '_jQueryInterface',
	        value: function _jQueryInterface(config) {
	          return this.each(function () {
	            var $element = $(this);
	            var data = $element.data(DATA_KEY);

	            if (!data) {
	              data = new Alert(this);
	              $element.data(DATA_KEY, data);
	            }

	            if (config === 'close') {
	              data[config](this);
	            }
	          });
	        }
	      }, {
	        key: '_handleDismiss',
	        value: function _handleDismiss(alertInstance) {
	          return function (event) {
	            if (event) {
	              event.preventDefault();
	            }

	            alertInstance.close(this);
	          };
	        }
	      }, {
	        key: 'VERSION',
	        get: function get() {
	          return VERSION;
	        }
	      }]);

	      return Alert;
	    })();

	    $(document).on(Event.CLICK_DATA_API, Selector.DISMISS, Alert._handleDismiss(new Alert()));

	    /**
	     * ------------------------------------------------------------------------
	     * jQuery
	     * ------------------------------------------------------------------------
	     */

	    $.fn[NAME] = Alert._jQueryInterface;
	    $.fn[NAME].Constructor = Alert;
	    $.fn[NAME].noConflict = function () {
	      $.fn[NAME] = JQUERY_NO_CONFLICT;
	      return Alert._jQueryInterface;
	    };

	    return Alert;
	  })(jQuery);

	  module.exports = Alert;
	});


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, module, __webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
	    factory(exports, module, require('./util'));
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod.exports, mod, global.Util);
	    global.carousel = mod.exports;
	  }
	})(this, function (exports, module, _util) {
	  'use strict';

	  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	  var _Util = _interopRequireDefault(_util);

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v4.0.0-alpha.2): carousel.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	   * --------------------------------------------------------------------------
	   */

	  var Carousel = (function ($) {

	    /**
	     * ------------------------------------------------------------------------
	     * Constants
	     * ------------------------------------------------------------------------
	     */

	    var NAME = 'carousel';
	    var VERSION = '4.0.0-alpha';
	    var DATA_KEY = 'bs.carousel';
	    var EVENT_KEY = '.' + DATA_KEY;
	    var DATA_API_KEY = '.data-api';
	    var JQUERY_NO_CONFLICT = $.fn[NAME];
	    var TRANSITION_DURATION = 600;

	    var Default = {
	      interval: 5000,
	      keyboard: true,
	      slide: false,
	      pause: 'hover',
	      wrap: true
	    };

	    var DefaultType = {
	      interval: '(number|boolean)',
	      keyboard: 'boolean',
	      slide: '(boolean|string)',
	      pause: '(string|boolean)',
	      wrap: 'boolean'
	    };

	    var Direction = {
	      NEXT: 'next',
	      PREVIOUS: 'prev'
	    };

	    var Event = {
	      SLIDE: 'slide' + EVENT_KEY,
	      SLID: 'slid' + EVENT_KEY,
	      KEYDOWN: 'keydown' + EVENT_KEY,
	      MOUSEENTER: 'mouseenter' + EVENT_KEY,
	      MOUSELEAVE: 'mouseleave' + EVENT_KEY,
	      LOAD_DATA_API: 'load' + EVENT_KEY + DATA_API_KEY,
	      CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
	    };

	    var ClassName = {
	      CAROUSEL: 'carousel',
	      ACTIVE: 'active',
	      SLIDE: 'slide',
	      RIGHT: 'right',
	      LEFT: 'left',
	      ITEM: 'carousel-item'
	    };

	    var Selector = {
	      ACTIVE: '.active',
	      ACTIVE_ITEM: '.active.carousel-item',
	      ITEM: '.carousel-item',
	      NEXT_PREV: '.next, .prev',
	      INDICATORS: '.carousel-indicators',
	      DATA_SLIDE: '[data-slide], [data-slide-to]',
	      DATA_RIDE: '[data-ride="carousel"]'
	    };

	    /**
	     * ------------------------------------------------------------------------
	     * Class Definition
	     * ------------------------------------------------------------------------
	     */

	    var Carousel = (function () {
	      function Carousel(element, config) {
	        _classCallCheck(this, Carousel);

	        this._items = null;
	        this._interval = null;
	        this._activeElement = null;

	        this._isPaused = false;
	        this._isSliding = false;

	        this._config = this._getConfig(config);
	        this._element = $(element)[0];
	        this._indicatorsElement = $(this._element).find(Selector.INDICATORS)[0];

	        this._addEventListeners();
	      }

	      /**
	       * ------------------------------------------------------------------------
	       * Data Api implementation
	       * ------------------------------------------------------------------------
	       */

	      // getters

	      _createClass(Carousel, [{
	        key: 'next',

	        // public

	        value: function next() {
	          if (!this._isSliding) {
	            this._slide(Direction.NEXT);
	          }
	        }
	      }, {
	        key: 'nextWhenVisible',
	        value: function nextWhenVisible() {
	          // Don't call next when the page isn't visible
	          if (!document.hidden) {
	            this.next();
	          }
	        }
	      }, {
	        key: 'prev',
	        value: function prev() {
	          if (!this._isSliding) {
	            this._slide(Direction.PREVIOUS);
	          }
	        }
	      }, {
	        key: 'pause',
	        value: function pause(event) {
	          if (!event) {
	            this._isPaused = true;
	          }

	          if ($(this._element).find(Selector.NEXT_PREV)[0] && _Util['default'].supportsTransitionEnd()) {
	            _Util['default'].triggerTransitionEnd(this._element);
	            this.cycle(true);
	          }

	          clearInterval(this._interval);
	          this._interval = null;
	        }
	      }, {
	        key: 'cycle',
	        value: function cycle(event) {
	          if (!event) {
	            this._isPaused = false;
	          }

	          if (this._interval) {
	            clearInterval(this._interval);
	            this._interval = null;
	          }

	          if (this._config.interval && !this._isPaused) {
	            this._interval = setInterval($.proxy(document.visibilityState ? this.nextWhenVisible : this.next, this), this._config.interval);
	          }
	        }
	      }, {
	        key: 'to',
	        value: function to(index) {
	          var _this = this;

	          this._activeElement = $(this._element).find(Selector.ACTIVE_ITEM)[0];

	          var activeIndex = this._getItemIndex(this._activeElement);

	          if (index > this._items.length - 1 || index < 0) {
	            return;
	          }

	          if (this._isSliding) {
	            $(this._element).one(Event.SLID, function () {
	              return _this.to(index);
	            });
	            return;
	          }

	          if (activeIndex === index) {
	            this.pause();
	            this.cycle();
	            return;
	          }

	          var direction = index > activeIndex ? Direction.NEXT : Direction.PREVIOUS;

	          this._slide(direction, this._items[index]);
	        }
	      }, {
	        key: 'dispose',
	        value: function dispose() {
	          $(this._element).off(EVENT_KEY);
	          $.removeData(this._element, DATA_KEY);

	          this._items = null;
	          this._config = null;
	          this._element = null;
	          this._interval = null;
	          this._isPaused = null;
	          this._isSliding = null;
	          this._activeElement = null;
	          this._indicatorsElement = null;
	        }

	        // private

	      }, {
	        key: '_getConfig',
	        value: function _getConfig(config) {
	          config = $.extend({}, Default, config);
	          _Util['default'].typeCheckConfig(NAME, config, DefaultType);
	          return config;
	        }
	      }, {
	        key: '_addEventListeners',
	        value: function _addEventListeners() {
	          if (this._config.keyboard) {
	            $(this._element).on(Event.KEYDOWN, $.proxy(this._keydown, this));
	          }

	          if (this._config.pause === 'hover' && !('ontouchstart' in document.documentElement)) {
	            $(this._element).on(Event.MOUSEENTER, $.proxy(this.pause, this)).on(Event.MOUSELEAVE, $.proxy(this.cycle, this));
	          }
	        }
	      }, {
	        key: '_keydown',
	        value: function _keydown(event) {
	          event.preventDefault();

	          if (/input|textarea/i.test(event.target.tagName)) {
	            return;
	          }

	          switch (event.which) {
	            case 37:
	              this.prev();break;
	            case 39:
	              this.next();break;
	            default:
	              return;
	          }
	        }
	      }, {
	        key: '_getItemIndex',
	        value: function _getItemIndex(element) {
	          this._items = $.makeArray($(element).parent().find(Selector.ITEM));
	          return this._items.indexOf(element);
	        }
	      }, {
	        key: '_getItemByDirection',
	        value: function _getItemByDirection(direction, activeElement) {
	          var isNextDirection = direction === Direction.NEXT;
	          var isPrevDirection = direction === Direction.PREVIOUS;
	          var activeIndex = this._getItemIndex(activeElement);
	          var lastItemIndex = this._items.length - 1;
	          var isGoingToWrap = isPrevDirection && activeIndex === 0 || isNextDirection && activeIndex === lastItemIndex;

	          if (isGoingToWrap && !this._config.wrap) {
	            return activeElement;
	          }

	          var delta = direction === Direction.PREVIOUS ? -1 : 1;
	          var itemIndex = (activeIndex + delta) % this._items.length;

	          return itemIndex === -1 ? this._items[this._items.length - 1] : this._items[itemIndex];
	        }
	      }, {
	        key: '_triggerSlideEvent',
	        value: function _triggerSlideEvent(relatedTarget, directionalClassname) {
	          var slideEvent = $.Event(Event.SLIDE, {
	            relatedTarget: relatedTarget,
	            direction: directionalClassname
	          });

	          $(this._element).trigger(slideEvent);

	          return slideEvent;
	        }
	      }, {
	        key: '_setActiveIndicatorElement',
	        value: function _setActiveIndicatorElement(element) {
	          if (this._indicatorsElement) {
	            $(this._indicatorsElement).find(Selector.ACTIVE).removeClass(ClassName.ACTIVE);

	            var nextIndicator = this._indicatorsElement.children[this._getItemIndex(element)];

	            if (nextIndicator) {
	              $(nextIndicator).addClass(ClassName.ACTIVE);
	            }
	          }
	        }
	      }, {
	        key: '_slide',
	        value: function _slide(direction, element) {
	          var _this2 = this;

	          var activeElement = $(this._element).find(Selector.ACTIVE_ITEM)[0];
	          var nextElement = element || activeElement && this._getItemByDirection(direction, activeElement);

	          var isCycling = Boolean(this._interval);

	          var directionalClassName = direction === Direction.NEXT ? ClassName.LEFT : ClassName.RIGHT;

	          if (nextElement && $(nextElement).hasClass(ClassName.ACTIVE)) {
	            this._isSliding = false;
	            return;
	          }

	          var slideEvent = this._triggerSlideEvent(nextElement, directionalClassName);
	          if (slideEvent.isDefaultPrevented()) {
	            return;
	          }

	          if (!activeElement || !nextElement) {
	            // some weirdness is happening, so we bail
	            return;
	          }

	          this._isSliding = true;

	          if (isCycling) {
	            this.pause();
	          }

	          this._setActiveIndicatorElement(nextElement);

	          var slidEvent = $.Event(Event.SLID, {
	            relatedTarget: nextElement,
	            direction: directionalClassName
	          });

	          if (_Util['default'].supportsTransitionEnd() && $(this._element).hasClass(ClassName.SLIDE)) {

	            $(nextElement).addClass(direction);

	            _Util['default'].reflow(nextElement);

	            $(activeElement).addClass(directionalClassName);
	            $(nextElement).addClass(directionalClassName);

	            $(activeElement).one(_Util['default'].TRANSITION_END, function () {
	              $(nextElement).removeClass(directionalClassName).removeClass(direction);

	              $(nextElement).addClass(ClassName.ACTIVE);

	              $(activeElement).removeClass(ClassName.ACTIVE).removeClass(direction).removeClass(directionalClassName);

	              _this2._isSliding = false;

	              setTimeout(function () {
	                return $(_this2._element).trigger(slidEvent);
	              }, 0);
	            }).emulateTransitionEnd(TRANSITION_DURATION);
	          } else {
	            $(activeElement).removeClass(ClassName.ACTIVE);
	            $(nextElement).addClass(ClassName.ACTIVE);

	            this._isSliding = false;
	            $(this._element).trigger(slidEvent);
	          }

	          if (isCycling) {
	            this.cycle();
	          }
	        }

	        // static

	      }], [{
	        key: '_jQueryInterface',
	        value: function _jQueryInterface(config) {
	          return this.each(function () {
	            var data = $(this).data(DATA_KEY);
	            var _config = $.extend({}, Default, $(this).data());

	            if (typeof config === 'object') {
	              $.extend(_config, config);
	            }

	            var action = typeof config === 'string' ? config : _config.slide;

	            if (!data) {
	              data = new Carousel(this, _config);
	              $(this).data(DATA_KEY, data);
	            }

	            if (typeof config === 'number') {
	              data.to(config);
	            } else if (typeof action === 'string') {
	              if (data[action] === undefined) {
	                throw new Error('No method named "' + action + '"');
	              }
	              data[action]();
	            } else if (_config.interval) {
	              data.pause();
	              data.cycle();
	            }
	          });
	        }
	      }, {
	        key: '_dataApiClickHandler',
	        value: function _dataApiClickHandler(event) {
	          var selector = _Util['default'].getSelectorFromElement(this);

	          if (!selector) {
	            return;
	          }

	          var target = $(selector)[0];

	          if (!target || !$(target).hasClass(ClassName.CAROUSEL)) {
	            return;
	          }

	          var config = $.extend({}, $(target).data(), $(this).data());
	          var slideIndex = this.getAttribute('data-slide-to');

	          if (slideIndex) {
	            config.interval = false;
	          }

	          Carousel._jQueryInterface.call($(target), config);

	          if (slideIndex) {
	            $(target).data(DATA_KEY).to(slideIndex);
	          }

	          event.preventDefault();
	        }
	      }, {
	        key: 'VERSION',
	        get: function get() {
	          return VERSION;
	        }
	      }, {
	        key: 'Default',
	        get: function get() {
	          return Default;
	        }
	      }]);

	      return Carousel;
	    })();

	    $(document).on(Event.CLICK_DATA_API, Selector.DATA_SLIDE, Carousel._dataApiClickHandler);

	    $(window).on(Event.LOAD_DATA_API, function () {
	      $(Selector.DATA_RIDE).each(function () {
	        var $carousel = $(this);
	        Carousel._jQueryInterface.call($carousel, $carousel.data());
	      });
	    });

	    /**
	     * ------------------------------------------------------------------------
	     * jQuery
	     * ------------------------------------------------------------------------
	     */

	    $.fn[NAME] = Carousel._jQueryInterface;
	    $.fn[NAME].Constructor = Carousel;
	    $.fn[NAME].noConflict = function () {
	      $.fn[NAME] = JQUERY_NO_CONFLICT;
	      return Carousel._jQueryInterface;
	    };

	    return Carousel;
	  })(jQuery);

	  module.exports = Carousel;
	});


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, module, __webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
	    factory(exports, module, require('./util'));
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod.exports, mod, global.Util);
	    global.collapse = mod.exports;
	  }
	})(this, function (exports, module, _util) {
	  'use strict';

	  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	  var _Util = _interopRequireDefault(_util);

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v4.0.0-alpha.2): collapse.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	   * --------------------------------------------------------------------------
	   */

	  var Collapse = (function ($) {

	    /**
	     * ------------------------------------------------------------------------
	     * Constants
	     * ------------------------------------------------------------------------
	     */

	    var NAME = 'collapse';
	    var VERSION = '4.0.0-alpha';
	    var DATA_KEY = 'bs.collapse';
	    var EVENT_KEY = '.' + DATA_KEY;
	    var DATA_API_KEY = '.data-api';
	    var JQUERY_NO_CONFLICT = $.fn[NAME];
	    var TRANSITION_DURATION = 600;

	    var Default = {
	      toggle: true,
	      parent: ''
	    };

	    var DefaultType = {
	      toggle: 'boolean',
	      parent: 'string'
	    };

	    var Event = {
	      SHOW: 'show' + EVENT_KEY,
	      SHOWN: 'shown' + EVENT_KEY,
	      HIDE: 'hide' + EVENT_KEY,
	      HIDDEN: 'hidden' + EVENT_KEY,
	      CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
	    };

	    var ClassName = {
	      IN: 'in',
	      COLLAPSE: 'collapse',
	      COLLAPSING: 'collapsing',
	      COLLAPSED: 'collapsed'
	    };

	    var Dimension = {
	      WIDTH: 'width',
	      HEIGHT: 'height'
	    };

	    var Selector = {
	      ACTIVES: '.panel > .in, .panel > .collapsing',
	      DATA_TOGGLE: '[data-toggle="collapse"]'
	    };

	    /**
	     * ------------------------------------------------------------------------
	     * Class Definition
	     * ------------------------------------------------------------------------
	     */

	    var Collapse = (function () {
	      function Collapse(element, config) {
	        _classCallCheck(this, Collapse);

	        this._isTransitioning = false;
	        this._element = element;
	        this._config = this._getConfig(config);
	        this._triggerArray = $.makeArray($('[data-toggle="collapse"][href="#' + element.id + '"],' + ('[data-toggle="collapse"][data-target="#' + element.id + '"]')));

	        this._parent = this._config.parent ? this._getParent() : null;

	        if (!this._config.parent) {
	          this._addAriaAndCollapsedClass(this._element, this._triggerArray);
	        }

	        if (this._config.toggle) {
	          this.toggle();
	        }
	      }

	      /**
	       * ------------------------------------------------------------------------
	       * Data Api implementation
	       * ------------------------------------------------------------------------
	       */

	      // getters

	      _createClass(Collapse, [{
	        key: 'toggle',

	        // public

	        value: function toggle() {
	          if ($(this._element).hasClass(ClassName.IN)) {
	            this.hide();
	          } else {
	            this.show();
	          }
	        }
	      }, {
	        key: 'show',
	        value: function show() {
	          var _this = this;

	          if (this._isTransitioning || $(this._element).hasClass(ClassName.IN)) {
	            return;
	          }

	          var actives = undefined;
	          var activesData = undefined;

	          if (this._parent) {
	            actives = $.makeArray($(Selector.ACTIVES));
	            if (!actives.length) {
	              actives = null;
	            }
	          }

	          if (actives) {
	            activesData = $(actives).data(DATA_KEY);
	            if (activesData && activesData._isTransitioning) {
	              return;
	            }
	          }

	          var startEvent = $.Event(Event.SHOW);
	          $(this._element).trigger(startEvent);
	          if (startEvent.isDefaultPrevented()) {
	            return;
	          }

	          if (actives) {
	            Collapse._jQueryInterface.call($(actives), 'hide');
	            if (!activesData) {
	              $(actives).data(DATA_KEY, null);
	            }
	          }

	          var dimension = this._getDimension();

	          $(this._element).removeClass(ClassName.COLLAPSE).addClass(ClassName.COLLAPSING);

	          this._element.style[dimension] = 0;
	          this._element.setAttribute('aria-expanded', true);

	          if (this._triggerArray.length) {
	            $(this._triggerArray).removeClass(ClassName.COLLAPSED).attr('aria-expanded', true);
	          }

	          this.setTransitioning(true);

	          var complete = function complete() {
	            $(_this._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).addClass(ClassName.IN);

	            _this._element.style[dimension] = '';

	            _this.setTransitioning(false);

	            $(_this._element).trigger(Event.SHOWN);
	          };

	          if (!_Util['default'].supportsTransitionEnd()) {
	            complete();
	            return;
	          }

	          var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
	          var scrollSize = 'scroll' + capitalizedDimension;

	          $(this._element).one(_Util['default'].TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);

	          this._element.style[dimension] = this._element[scrollSize] + 'px';
	        }
	      }, {
	        key: 'hide',
	        value: function hide() {
	          var _this2 = this;

	          if (this._isTransitioning || !$(this._element).hasClass(ClassName.IN)) {
	            return;
	          }

	          var startEvent = $.Event(Event.HIDE);
	          $(this._element).trigger(startEvent);
	          if (startEvent.isDefaultPrevented()) {
	            return;
	          }

	          var dimension = this._getDimension();
	          var offsetDimension = dimension === Dimension.WIDTH ? 'offsetWidth' : 'offsetHeight';

	          this._element.style[dimension] = this._element[offsetDimension] + 'px';

	          _Util['default'].reflow(this._element);

	          $(this._element).addClass(ClassName.COLLAPSING).removeClass(ClassName.COLLAPSE).removeClass(ClassName.IN);

	          this._element.setAttribute('aria-expanded', false);

	          if (this._triggerArray.length) {
	            $(this._triggerArray).addClass(ClassName.COLLAPSED).attr('aria-expanded', false);
	          }

	          this.setTransitioning(true);

	          var complete = function complete() {
	            _this2.setTransitioning(false);
	            $(_this2._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).trigger(Event.HIDDEN);
	          };

	          this._element.style[dimension] = 0;

	          if (!_Util['default'].supportsTransitionEnd()) {
	            complete();
	            return;
	          }

	          $(this._element).one(_Util['default'].TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
	        }
	      }, {
	        key: 'setTransitioning',
	        value: function setTransitioning(isTransitioning) {
	          this._isTransitioning = isTransitioning;
	        }
	      }, {
	        key: 'dispose',
	        value: function dispose() {
	          $.removeData(this._element, DATA_KEY);

	          this._config = null;
	          this._parent = null;
	          this._element = null;
	          this._triggerArray = null;
	          this._isTransitioning = null;
	        }

	        // private

	      }, {
	        key: '_getConfig',
	        value: function _getConfig(config) {
	          config = $.extend({}, Default, config);
	          config.toggle = Boolean(config.toggle); // coerce string values
	          _Util['default'].typeCheckConfig(NAME, config, DefaultType);
	          return config;
	        }
	      }, {
	        key: '_getDimension',
	        value: function _getDimension() {
	          var hasWidth = $(this._element).hasClass(Dimension.WIDTH);
	          return hasWidth ? Dimension.WIDTH : Dimension.HEIGHT;
	        }
	      }, {
	        key: '_getParent',
	        value: function _getParent() {
	          var _this3 = this;

	          var parent = $(this._config.parent)[0];
	          var selector = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]';

	          $(parent).find(selector).each(function (i, element) {
	            _this3._addAriaAndCollapsedClass(Collapse._getTargetFromElement(element), [element]);
	          });

	          return parent;
	        }
	      }, {
	        key: '_addAriaAndCollapsedClass',
	        value: function _addAriaAndCollapsedClass(element, triggerArray) {
	          if (element) {
	            var isOpen = $(element).hasClass(ClassName.IN);
	            element.setAttribute('aria-expanded', isOpen);

	            if (triggerArray.length) {
	              $(triggerArray).toggleClass(ClassName.COLLAPSED, !isOpen).attr('aria-expanded', isOpen);
	            }
	          }
	        }

	        // static

	      }], [{
	        key: '_getTargetFromElement',
	        value: function _getTargetFromElement(element) {
	          var selector = _Util['default'].getSelectorFromElement(element);
	          return selector ? $(selector)[0] : null;
	        }
	      }, {
	        key: '_jQueryInterface',
	        value: function _jQueryInterface(config) {
	          return this.each(function () {
	            var $this = $(this);
	            var data = $this.data(DATA_KEY);
	            var _config = $.extend({}, Default, $this.data(), typeof config === 'object' && config);

	            if (!data && _config.toggle && /show|hide/.test(config)) {
	              _config.toggle = false;
	            }

	            if (!data) {
	              data = new Collapse(this, _config);
	              $this.data(DATA_KEY, data);
	            }

	            if (typeof config === 'string') {
	              if (data[config] === undefined) {
	                throw new Error('No method named "' + config + '"');
	              }
	              data[config]();
	            }
	          });
	        }
	      }, {
	        key: 'VERSION',
	        get: function get() {
	          return VERSION;
	        }
	      }, {
	        key: 'Default',
	        get: function get() {
	          return Default;
	        }
	      }]);

	      return Collapse;
	    })();

	    $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
	      event.preventDefault();

	      var target = Collapse._getTargetFromElement(this);
	      var data = $(target).data(DATA_KEY);
	      var config = data ? 'toggle' : $(this).data();

	      Collapse._jQueryInterface.call($(target), config);
	    });

	    /**
	     * ------------------------------------------------------------------------
	     * jQuery
	     * ------------------------------------------------------------------------
	     */

	    $.fn[NAME] = Collapse._jQueryInterface;
	    $.fn[NAME].Constructor = Collapse;
	    $.fn[NAME].noConflict = function () {
	      $.fn[NAME] = JQUERY_NO_CONFLICT;
	      return Collapse._jQueryInterface;
	    };

	    return Collapse;
	  })(jQuery);

	  module.exports = Collapse;
	});


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, module, __webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
	    factory(exports, module, require('./util'));
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod.exports, mod, global.Util);
	    global.dropdown = mod.exports;
	  }
	})(this, function (exports, module, _util) {
	  'use strict';

	  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	  var _Util = _interopRequireDefault(_util);

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v4.0.0-alpha.2): dropdown.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	   * --------------------------------------------------------------------------
	   */

	  var Dropdown = (function ($) {

	    /**
	     * ------------------------------------------------------------------------
	     * Constants
	     * ------------------------------------------------------------------------
	     */

	    var NAME = 'dropdown';
	    var VERSION = '4.0.0-alpha';
	    var DATA_KEY = 'bs.dropdown';
	    var EVENT_KEY = '.' + DATA_KEY;
	    var DATA_API_KEY = '.data-api';
	    var JQUERY_NO_CONFLICT = $.fn[NAME];

	    var Event = {
	      HIDE: 'hide' + EVENT_KEY,
	      HIDDEN: 'hidden' + EVENT_KEY,
	      SHOW: 'show' + EVENT_KEY,
	      SHOWN: 'shown' + EVENT_KEY,
	      CLICK: 'click' + EVENT_KEY,
	      CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY,
	      KEYDOWN_DATA_API: 'keydown' + EVENT_KEY + DATA_API_KEY
	    };

	    var ClassName = {
	      BACKDROP: 'dropdown-backdrop',
	      DISABLED: 'disabled',
	      OPEN: 'open'
	    };

	    var Selector = {
	      BACKDROP: '.dropdown-backdrop',
	      DATA_TOGGLE: '[data-toggle="dropdown"]',
	      FORM_CHILD: '.dropdown form',
	      ROLE_MENU: '[role="menu"]',
	      ROLE_LISTBOX: '[role="listbox"]',
	      NAVBAR_NAV: '.navbar-nav',
	      VISIBLE_ITEMS: '[role="menu"] li:not(.disabled) a, ' + '[role="listbox"] li:not(.disabled) a'
	    };

	    /**
	     * ------------------------------------------------------------------------
	     * Class Definition
	     * ------------------------------------------------------------------------
	     */

	    var Dropdown = (function () {
	      function Dropdown(element) {
	        _classCallCheck(this, Dropdown);

	        this._element = element;

	        this._addEventListeners();
	      }

	      /**
	       * ------------------------------------------------------------------------
	       * Data Api implementation
	       * ------------------------------------------------------------------------
	       */

	      // getters

	      _createClass(Dropdown, [{
	        key: 'toggle',

	        // public

	        value: function toggle() {
	          if (this.disabled || $(this).hasClass(ClassName.DISABLED)) {
	            return false;
	          }

	          var parent = Dropdown._getParentFromElement(this);
	          var isActive = $(parent).hasClass(ClassName.OPEN);

	          Dropdown._clearMenus();

	          if (isActive) {
	            return false;
	          }

	          if ('ontouchstart' in document.documentElement && !$(parent).closest(Selector.NAVBAR_NAV).length) {

	            // if mobile we use a backdrop because click events don't delegate
	            var dropdown = document.createElement('div');
	            dropdown.className = ClassName.BACKDROP;
	            $(dropdown).insertBefore(this);
	            $(dropdown).on('click', Dropdown._clearMenus);
	          }

	          var relatedTarget = { relatedTarget: this };
	          var showEvent = $.Event(Event.SHOW, relatedTarget);

	          $(parent).trigger(showEvent);

	          if (showEvent.isDefaultPrevented()) {
	            return false;
	          }

	          this.focus();
	          this.setAttribute('aria-expanded', 'true');

	          $(parent).toggleClass(ClassName.OPEN);
	          $(parent).trigger($.Event(Event.SHOWN, relatedTarget));

	          return false;
	        }
	      }, {
	        key: 'dispose',
	        value: function dispose() {
	          $.removeData(this._element, DATA_KEY);
	          $(this._element).off(EVENT_KEY);
	          this._element = null;
	        }

	        // private

	      }, {
	        key: '_addEventListeners',
	        value: function _addEventListeners() {
	          $(this._element).on(Event.CLICK, this.toggle);
	        }

	        // static

	      }], [{
	        key: '_jQueryInterface',
	        value: function _jQueryInterface(config) {
	          return this.each(function () {
	            var data = $(this).data(DATA_KEY);

	            if (!data) {
	              $(this).data(DATA_KEY, data = new Dropdown(this));
	            }

	            if (typeof config === 'string') {
	              if (data[config] === undefined) {
	                throw new Error('No method named "' + config + '"');
	              }
	              data[config].call(this);
	            }
	          });
	        }
	      }, {
	        key: '_clearMenus',
	        value: function _clearMenus(event) {
	          if (event && event.which === 3) {
	            return;
	          }

	          var backdrop = $(Selector.BACKDROP)[0];
	          if (backdrop) {
	            backdrop.parentNode.removeChild(backdrop);
	          }

	          var toggles = $.makeArray($(Selector.DATA_TOGGLE));

	          for (var i = 0; i < toggles.length; i++) {
	            var _parent = Dropdown._getParentFromElement(toggles[i]);
	            var relatedTarget = { relatedTarget: toggles[i] };

	            if (!$(_parent).hasClass(ClassName.OPEN)) {
	              continue;
	            }

	            if (event && event.type === 'click' && /input|textarea/i.test(event.target.tagName) && $.contains(_parent, event.target)) {
	              continue;
	            }

	            var hideEvent = $.Event(Event.HIDE, relatedTarget);
	            $(_parent).trigger(hideEvent);
	            if (hideEvent.isDefaultPrevented()) {
	              continue;
	            }

	            toggles[i].setAttribute('aria-expanded', 'false');

	            $(_parent).removeClass(ClassName.OPEN).trigger($.Event(Event.HIDDEN, relatedTarget));
	          }
	        }
	      }, {
	        key: '_getParentFromElement',
	        value: function _getParentFromElement(element) {
	          var parent = undefined;
	          var selector = _Util['default'].getSelectorFromElement(element);

	          if (selector) {
	            parent = $(selector)[0];
	          }

	          return parent || element.parentNode;
	        }
	      }, {
	        key: '_dataApiKeydownHandler',
	        value: function _dataApiKeydownHandler(event) {
	          if (!/(38|40|27|32)/.test(event.which) || /input|textarea/i.test(event.target.tagName)) {
	            return;
	          }

	          event.preventDefault();
	          event.stopPropagation();

	          if (this.disabled || $(this).hasClass(ClassName.DISABLED)) {
	            return;
	          }

	          var parent = Dropdown._getParentFromElement(this);
	          var isActive = $(parent).hasClass(ClassName.OPEN);

	          if (!isActive && event.which !== 27 || isActive && event.which === 27) {

	            if (event.which === 27) {
	              var toggle = $(parent).find(Selector.DATA_TOGGLE)[0];
	              $(toggle).trigger('focus');
	            }

	            $(this).trigger('click');
	            return;
	          }

	          var items = $.makeArray($(Selector.VISIBLE_ITEMS));

	          items = items.filter(function (item) {
	            return item.offsetWidth || item.offsetHeight;
	          });

	          if (!items.length) {
	            return;
	          }

	          var index = items.indexOf(event.target);

	          if (event.which === 38 && index > 0) {
	            // up
	            index--;
	          }

	          if (event.which === 40 && index < items.length - 1) {
	            // down
	            index++;
	          }

	          if (! ~index) {
	            index = 0;
	          }

	          items[index].focus();
	        }
	      }, {
	        key: 'VERSION',
	        get: function get() {
	          return VERSION;
	        }
	      }]);

	      return Dropdown;
	    })();

	    $(document).on(Event.KEYDOWN_DATA_API, Selector.DATA_TOGGLE, Dropdown._dataApiKeydownHandler).on(Event.KEYDOWN_DATA_API, Selector.ROLE_MENU, Dropdown._dataApiKeydownHandler).on(Event.KEYDOWN_DATA_API, Selector.ROLE_LISTBOX, Dropdown._dataApiKeydownHandler).on(Event.CLICK_DATA_API, Dropdown._clearMenus).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, Dropdown.prototype.toggle).on(Event.CLICK_DATA_API, Selector.FORM_CHILD, function (e) {
	      e.stopPropagation();
	    });

	    /**
	     * ------------------------------------------------------------------------
	     * jQuery
	     * ------------------------------------------------------------------------
	     */

	    $.fn[NAME] = Dropdown._jQueryInterface;
	    $.fn[NAME].Constructor = Dropdown;
	    $.fn[NAME].noConflict = function () {
	      $.fn[NAME] = JQUERY_NO_CONFLICT;
	      return Dropdown._jQueryInterface;
	    };

	    return Dropdown;
	  })(jQuery);

	  module.exports = Dropdown;
	});


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, module, __webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
	    factory(exports, module, require('./util'));
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod.exports, mod, global.Util);
	    global.modal = mod.exports;
	  }
	})(this, function (exports, module, _util) {
	  'use strict';

	  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	  var _Util = _interopRequireDefault(_util);

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v4.0.0-alpha.2): modal.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	   * --------------------------------------------------------------------------
	   */

	  var Modal = (function ($) {

	    /**
	     * ------------------------------------------------------------------------
	     * Constants
	     * ------------------------------------------------------------------------
	     */

	    var NAME = 'modal';
	    var VERSION = '4.0.0-alpha';
	    var DATA_KEY = 'bs.modal';
	    var EVENT_KEY = '.' + DATA_KEY;
	    var DATA_API_KEY = '.data-api';
	    var JQUERY_NO_CONFLICT = $.fn[NAME];
	    var TRANSITION_DURATION = 300;
	    var BACKDROP_TRANSITION_DURATION = 150;

	    var Default = {
	      backdrop: true,
	      keyboard: true,
	      focus: true,
	      show: true
	    };

	    var DefaultType = {
	      backdrop: '(boolean|string)',
	      keyboard: 'boolean',
	      focus: 'boolean',
	      show: 'boolean'
	    };

	    var Event = {
	      HIDE: 'hide' + EVENT_KEY,
	      HIDDEN: 'hidden' + EVENT_KEY,
	      SHOW: 'show' + EVENT_KEY,
	      SHOWN: 'shown' + EVENT_KEY,
	      FOCUSIN: 'focusin' + EVENT_KEY,
	      RESIZE: 'resize' + EVENT_KEY,
	      CLICK_DISMISS: 'click.dismiss' + EVENT_KEY,
	      KEYDOWN_DISMISS: 'keydown.dismiss' + EVENT_KEY,
	      MOUSEUP_DISMISS: 'mouseup.dismiss' + EVENT_KEY,
	      MOUSEDOWN_DISMISS: 'mousedown.dismiss' + EVENT_KEY,
	      CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
	    };

	    var ClassName = {
	      SCROLLBAR_MEASURER: 'modal-scrollbar-measure',
	      BACKDROP: 'modal-backdrop',
	      OPEN: 'modal-open',
	      FADE: 'fade',
	      IN: 'in'
	    };

	    var Selector = {
	      DIALOG: '.modal-dialog',
	      DATA_TOGGLE: '[data-toggle="modal"]',
	      DATA_DISMISS: '[data-dismiss="modal"]',
	      FIXED_CONTENT: '.navbar-fixed-top, .navbar-fixed-bottom, .is-fixed'
	    };

	    /**
	     * ------------------------------------------------------------------------
	     * Class Definition
	     * ------------------------------------------------------------------------
	     */

	    var Modal = (function () {
	      function Modal(element, config) {
	        _classCallCheck(this, Modal);

	        this._config = this._getConfig(config);
	        this._element = element;
	        this._dialog = $(element).find(Selector.DIALOG)[0];
	        this._backdrop = null;
	        this._isShown = false;
	        this._isBodyOverflowing = false;
	        this._ignoreBackdropClick = false;
	        this._originalBodyPadding = 0;
	        this._scrollbarWidth = 0;
	      }

	      /**
	       * ------------------------------------------------------------------------
	       * Data Api implementation
	       * ------------------------------------------------------------------------
	       */

	      // getters

	      _createClass(Modal, [{
	        key: 'toggle',

	        // public

	        value: function toggle(relatedTarget) {
	          return this._isShown ? this.hide() : this.show(relatedTarget);
	        }
	      }, {
	        key: 'show',
	        value: function show(relatedTarget) {
	          var _this = this;

	          var showEvent = $.Event(Event.SHOW, {
	            relatedTarget: relatedTarget
	          });

	          $(this._element).trigger(showEvent);

	          if (this._isShown || showEvent.isDefaultPrevented()) {
	            return;
	          }

	          this._isShown = true;

	          this._checkScrollbar();
	          this._setScrollbar();

	          $(document.body).addClass(ClassName.OPEN);

	          this._setEscapeEvent();
	          this._setResizeEvent();

	          $(this._element).on(Event.CLICK_DISMISS, Selector.DATA_DISMISS, $.proxy(this.hide, this));

	          $(this._dialog).on(Event.MOUSEDOWN_DISMISS, function () {
	            $(_this._element).one(Event.MOUSEUP_DISMISS, function (event) {
	              if ($(event.target).is(_this._element)) {
	                _this._ignoreBackdropClick = true;
	              }
	            });
	          });

	          this._showBackdrop($.proxy(this._showElement, this, relatedTarget));
	        }
	      }, {
	        key: 'hide',
	        value: function hide(event) {
	          if (event) {
	            event.preventDefault();
	          }

	          var hideEvent = $.Event(Event.HIDE);

	          $(this._element).trigger(hideEvent);

	          if (!this._isShown || hideEvent.isDefaultPrevented()) {
	            return;
	          }

	          this._isShown = false;

	          this._setEscapeEvent();
	          this._setResizeEvent();

	          $(document).off(Event.FOCUSIN);

	          $(this._element).removeClass(ClassName.IN);

	          $(this._element).off(Event.CLICK_DISMISS);
	          $(this._dialog).off(Event.MOUSEDOWN_DISMISS);

	          if (_Util['default'].supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE)) {

	            $(this._element).one(_Util['default'].TRANSITION_END, $.proxy(this._hideModal, this)).emulateTransitionEnd(TRANSITION_DURATION);
	          } else {
	            this._hideModal();
	          }
	        }
	      }, {
	        key: 'dispose',
	        value: function dispose() {
	          $.removeData(this._element, DATA_KEY);

	          $(window).off(EVENT_KEY);
	          $(document).off(EVENT_KEY);
	          $(this._element).off(EVENT_KEY);
	          $(this._backdrop).off(EVENT_KEY);

	          this._config = null;
	          this._element = null;
	          this._dialog = null;
	          this._backdrop = null;
	          this._isShown = null;
	          this._isBodyOverflowing = null;
	          this._ignoreBackdropClick = null;
	          this._originalBodyPadding = null;
	          this._scrollbarWidth = null;
	        }

	        // private

	      }, {
	        key: '_getConfig',
	        value: function _getConfig(config) {
	          config = $.extend({}, Default, config);
	          _Util['default'].typeCheckConfig(NAME, config, DefaultType);
	          return config;
	        }
	      }, {
	        key: '_showElement',
	        value: function _showElement(relatedTarget) {
	          var _this2 = this;

	          var transition = _Util['default'].supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE);

	          if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
	            // don't move modals dom position
	            document.body.appendChild(this._element);
	          }

	          this._element.style.display = 'block';
	          this._element.scrollTop = 0;

	          if (transition) {
	            _Util['default'].reflow(this._element);
	          }

	          $(this._element).addClass(ClassName.IN);

	          if (this._config.focus) {
	            this._enforceFocus();
	          }

	          var shownEvent = $.Event(Event.SHOWN, {
	            relatedTarget: relatedTarget
	          });

	          var transitionComplete = function transitionComplete() {
	            if (_this2._config.focus) {
	              _this2._element.focus();
	            }
	            $(_this2._element).trigger(shownEvent);
	          };

	          if (transition) {
	            $(this._dialog).one(_Util['default'].TRANSITION_END, transitionComplete).emulateTransitionEnd(TRANSITION_DURATION);
	          } else {
	            transitionComplete();
	          }
	        }
	      }, {
	        key: '_enforceFocus',
	        value: function _enforceFocus() {
	          var _this3 = this;

	          $(document).off(Event.FOCUSIN) // guard against infinite focus loop
	          .on(Event.FOCUSIN, function (event) {
	            if (_this3._element !== event.target && !$(_this3._element).has(event.target).length) {
	              _this3._element.focus();
	            }
	          });
	        }
	      }, {
	        key: '_setEscapeEvent',
	        value: function _setEscapeEvent() {
	          var _this4 = this;

	          if (this._isShown && this._config.keyboard) {
	            $(this._element).on(Event.KEYDOWN_DISMISS, function (event) {
	              if (event.which === 27) {
	                _this4.hide();
	              }
	            });
	          } else if (!this._isShown) {
	            $(this._element).off(Event.KEYDOWN_DISMISS);
	          }
	        }
	      }, {
	        key: '_setResizeEvent',
	        value: function _setResizeEvent() {
	          if (this._isShown) {
	            $(window).on(Event.RESIZE, $.proxy(this._handleUpdate, this));
	          } else {
	            $(window).off(Event.RESIZE);
	          }
	        }
	      }, {
	        key: '_hideModal',
	        value: function _hideModal() {
	          var _this5 = this;

	          this._element.style.display = 'none';
	          this._showBackdrop(function () {
	            $(document.body).removeClass(ClassName.OPEN);
	            _this5._resetAdjustments();
	            _this5._resetScrollbar();
	            $(_this5._element).trigger(Event.HIDDEN);
	          });
	        }
	      }, {
	        key: '_removeBackdrop',
	        value: function _removeBackdrop() {
	          if (this._backdrop) {
	            $(this._backdrop).remove();
	            this._backdrop = null;
	          }
	        }
	      }, {
	        key: '_showBackdrop',
	        value: function _showBackdrop(callback) {
	          var _this6 = this;

	          var animate = $(this._element).hasClass(ClassName.FADE) ? ClassName.FADE : '';

	          if (this._isShown && this._config.backdrop) {
	            var doAnimate = _Util['default'].supportsTransitionEnd() && animate;

	            this._backdrop = document.createElement('div');
	            this._backdrop.className = ClassName.BACKDROP;

	            if (animate) {
	              $(this._backdrop).addClass(animate);
	            }

	            $(this._backdrop).appendTo(document.body);

	            $(this._element).on(Event.CLICK_DISMISS, function (event) {
	              if (_this6._ignoreBackdropClick) {
	                _this6._ignoreBackdropClick = false;
	                return;
	              }
	              if (event.target !== event.currentTarget) {
	                return;
	              }
	              if (_this6._config.backdrop === 'static') {
	                _this6._element.focus();
	              } else {
	                _this6.hide();
	              }
	            });

	            if (doAnimate) {
	              _Util['default'].reflow(this._backdrop);
	            }

	            $(this._backdrop).addClass(ClassName.IN);

	            if (!callback) {
	              return;
	            }

	            if (!doAnimate) {
	              callback();
	              return;
	            }

	            $(this._backdrop).one(_Util['default'].TRANSITION_END, callback).emulateTransitionEnd(BACKDROP_TRANSITION_DURATION);
	          } else if (!this._isShown && this._backdrop) {
	            $(this._backdrop).removeClass(ClassName.IN);

	            var callbackRemove = function callbackRemove() {
	              _this6._removeBackdrop();
	              if (callback) {
	                callback();
	              }
	            };

	            if (_Util['default'].supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE)) {
	              $(this._backdrop).one(_Util['default'].TRANSITION_END, callbackRemove).emulateTransitionEnd(BACKDROP_TRANSITION_DURATION);
	            } else {
	              callbackRemove();
	            }
	          } else if (callback) {
	            callback();
	          }
	        }

	        // ----------------------------------------------------------------------
	        // the following methods are used to handle overflowing modals
	        // todo (fat): these should probably be refactored out of modal.js
	        // ----------------------------------------------------------------------

	      }, {
	        key: '_handleUpdate',
	        value: function _handleUpdate() {
	          this._adjustDialog();
	        }
	      }, {
	        key: '_adjustDialog',
	        value: function _adjustDialog() {
	          var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

	          if (!this._isBodyOverflowing && isModalOverflowing) {
	            this._element.style.paddingLeft = this._scrollbarWidth + 'px';
	          }

	          if (this._isBodyOverflowing && !isModalOverflowing) {
	            this._element.style.paddingRight = this._scrollbarWidth + 'px~';
	          }
	        }
	      }, {
	        key: '_resetAdjustments',
	        value: function _resetAdjustments() {
	          this._element.style.paddingLeft = '';
	          this._element.style.paddingRight = '';
	        }
	      }, {
	        key: '_checkScrollbar',
	        value: function _checkScrollbar() {
	          var fullWindowWidth = window.innerWidth;
	          if (!fullWindowWidth) {
	            // workaround for missing window.innerWidth in IE8
	            var documentElementRect = document.documentElement.getBoundingClientRect();
	            fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left);
	          }
	          this._isBodyOverflowing = document.body.clientWidth < fullWindowWidth;
	          this._scrollbarWidth = this._getScrollbarWidth();
	        }
	      }, {
	        key: '_setScrollbar',
	        value: function _setScrollbar() {
	          var bodyPadding = parseInt($(Selector.FIXED_CONTENT).css('padding-right') || 0, 10);

	          this._originalBodyPadding = document.body.style.paddingRight || '';

	          if (this._isBodyOverflowing) {
	            document.body.style.paddingRight = bodyPadding + this._scrollbarWidth + 'px';
	          }
	        }
	      }, {
	        key: '_resetScrollbar',
	        value: function _resetScrollbar() {
	          document.body.style.paddingRight = this._originalBodyPadding;
	        }
	      }, {
	        key: '_getScrollbarWidth',
	        value: function _getScrollbarWidth() {
	          // thx d.walsh
	          var scrollDiv = document.createElement('div');
	          scrollDiv.className = ClassName.SCROLLBAR_MEASURER;
	          document.body.appendChild(scrollDiv);
	          var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
	          document.body.removeChild(scrollDiv);
	          return scrollbarWidth;
	        }

	        // static

	      }], [{
	        key: '_jQueryInterface',
	        value: function _jQueryInterface(config, relatedTarget) {
	          return this.each(function () {
	            var data = $(this).data(DATA_KEY);
	            var _config = $.extend({}, Modal.Default, $(this).data(), typeof config === 'object' && config);

	            if (!data) {
	              data = new Modal(this, _config);
	              $(this).data(DATA_KEY, data);
	            }

	            if (typeof config === 'string') {
	              if (data[config] === undefined) {
	                throw new Error('No method named "' + config + '"');
	              }
	              data[config](relatedTarget);
	            } else if (_config.show) {
	              data.show(relatedTarget);
	            }
	          });
	        }
	      }, {
	        key: 'VERSION',
	        get: function get() {
	          return VERSION;
	        }
	      }, {
	        key: 'Default',
	        get: function get() {
	          return Default;
	        }
	      }]);

	      return Modal;
	    })();

	    $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
	      var _this7 = this;

	      var target = undefined;
	      var selector = _Util['default'].getSelectorFromElement(this);

	      if (selector) {
	        target = $(selector)[0];
	      }

	      var config = $(target).data(DATA_KEY) ? 'toggle' : $.extend({}, $(target).data(), $(this).data());

	      if (this.tagName === 'A') {
	        event.preventDefault();
	      }

	      var $target = $(target).one(Event.SHOW, function (showEvent) {
	        if (showEvent.isDefaultPrevented()) {
	          // only register focus restorer if modal will actually get shown
	          return;
	        }

	        $target.one(Event.HIDDEN, function () {
	          if ($(_this7).is(':visible')) {
	            _this7.focus();
	          }
	        });
	      });

	      Modal._jQueryInterface.call($(target), config, this);
	    });

	    /**
	     * ------------------------------------------------------------------------
	     * jQuery
	     * ------------------------------------------------------------------------
	     */

	    $.fn[NAME] = Modal._jQueryInterface;
	    $.fn[NAME].Constructor = Modal;
	    $.fn[NAME].noConflict = function () {
	      $.fn[NAME] = JQUERY_NO_CONFLICT;
	      return Modal._jQueryInterface;
	    };

	    return Modal;
	  })(jQuery);

	  module.exports = Modal;
	});


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, module, __webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
	    factory(exports, module, require('./util'));
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod.exports, mod, global.Util);
	    global.tab = mod.exports;
	  }
	})(this, function (exports, module, _util) {
	  'use strict';

	  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	  var _Util = _interopRequireDefault(_util);

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v4.0.0-alpha.2): tab.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	   * --------------------------------------------------------------------------
	   */

	  var Tab = (function ($) {

	    /**
	     * ------------------------------------------------------------------------
	     * Constants
	     * ------------------------------------------------------------------------
	     */

	    var NAME = 'tab';
	    var VERSION = '4.0.0-alpha';
	    var DATA_KEY = 'bs.tab';
	    var EVENT_KEY = '.' + DATA_KEY;
	    var DATA_API_KEY = '.data-api';
	    var JQUERY_NO_CONFLICT = $.fn[NAME];
	    var TRANSITION_DURATION = 150;

	    var Event = {
	      HIDE: 'hide' + EVENT_KEY,
	      HIDDEN: 'hidden' + EVENT_KEY,
	      SHOW: 'show' + EVENT_KEY,
	      SHOWN: 'shown' + EVENT_KEY,
	      CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
	    };

	    var ClassName = {
	      DROPDOWN_MENU: 'dropdown-menu',
	      ACTIVE: 'active',
	      FADE: 'fade',
	      IN: 'in'
	    };

	    var Selector = {
	      A: 'a',
	      LI: 'li',
	      DROPDOWN: '.dropdown',
	      UL: 'ul:not(.dropdown-menu)',
	      FADE_CHILD: '> .nav-item .fade, > .fade',
	      ACTIVE: '.active',
	      ACTIVE_CHILD: '> .nav-item > .active, > .active',
	      DATA_TOGGLE: '[data-toggle="tab"], [data-toggle="pill"]',
	      DROPDOWN_TOGGLE: '.dropdown-toggle',
	      DROPDOWN_ACTIVE_CHILD: '> .dropdown-menu .active'
	    };

	    /**
	     * ------------------------------------------------------------------------
	     * Class Definition
	     * ------------------------------------------------------------------------
	     */

	    var Tab = (function () {
	      function Tab(element) {
	        _classCallCheck(this, Tab);

	        this._element = element;
	      }

	      /**
	       * ------------------------------------------------------------------------
	       * Data Api implementation
	       * ------------------------------------------------------------------------
	       */

	      // getters

	      _createClass(Tab, [{
	        key: 'show',

	        // public

	        value: function show() {
	          var _this = this;

	          if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && $(this._element).hasClass(ClassName.ACTIVE)) {
	            return;
	          }

	          var target = undefined;
	          var previous = undefined;
	          var ulElement = $(this._element).closest(Selector.UL)[0];
	          var selector = _Util['default'].getSelectorFromElement(this._element);

	          if (ulElement) {
	            previous = $.makeArray($(ulElement).find(Selector.ACTIVE));
	            previous = previous[previous.length - 1];
	          }

	          var hideEvent = $.Event(Event.HIDE, {
	            relatedTarget: this._element
	          });

	          var showEvent = $.Event(Event.SHOW, {
	            relatedTarget: previous
	          });

	          if (previous) {
	            $(previous).trigger(hideEvent);
	          }

	          $(this._element).trigger(showEvent);

	          if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) {
	            return;
	          }

	          if (selector) {
	            target = $(selector)[0];
	          }

	          this._activate(this._element, ulElement);

	          var complete = function complete() {
	            var hiddenEvent = $.Event(Event.HIDDEN, {
	              relatedTarget: _this._element
	            });

	            var shownEvent = $.Event(Event.SHOWN, {
	              relatedTarget: previous
	            });

	            $(previous).trigger(hiddenEvent);
	            $(_this._element).trigger(shownEvent);
	          };

	          if (target) {
	            this._activate(target, target.parentNode, complete);
	          } else {
	            complete();
	          }
	        }
	      }, {
	        key: 'dispose',
	        value: function dispose() {
	          $.removeClass(this._element, DATA_KEY);
	          this._element = null;
	        }

	        // private

	      }, {
	        key: '_activate',
	        value: function _activate(element, container, callback) {
	          var active = $(container).find(Selector.ACTIVE_CHILD)[0];
	          var isTransitioning = callback && _Util['default'].supportsTransitionEnd() && (active && $(active).hasClass(ClassName.FADE) || Boolean($(container).find(Selector.FADE_CHILD)[0]));

	          var complete = $.proxy(this._transitionComplete, this, element, active, isTransitioning, callback);

	          if (active && isTransitioning) {
	            $(active).one(_Util['default'].TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
	          } else {
	            complete();
	          }

	          if (active) {
	            $(active).removeClass(ClassName.IN);
	          }
	        }
	      }, {
	        key: '_transitionComplete',
	        value: function _transitionComplete(element, active, isTransitioning, callback) {
	          if (active) {
	            $(active).removeClass(ClassName.ACTIVE);

	            var dropdownChild = $(active).find(Selector.DROPDOWN_ACTIVE_CHILD)[0];

	            if (dropdownChild) {
	              $(dropdownChild).removeClass(ClassName.ACTIVE);
	            }

	            active.setAttribute('aria-expanded', false);
	          }

	          $(element).addClass(ClassName.ACTIVE);
	          element.setAttribute('aria-expanded', true);

	          if (isTransitioning) {
	            _Util['default'].reflow(element);
	            $(element).addClass(ClassName.IN);
	          } else {
	            $(element).removeClass(ClassName.FADE);
	          }

	          if (element.parentNode && $(element.parentNode).hasClass(ClassName.DROPDOWN_MENU)) {

	            var dropdownElement = $(element).closest(Selector.DROPDOWN)[0];
	            if (dropdownElement) {
	              $(dropdownElement).find(Selector.DROPDOWN_TOGGLE).addClass(ClassName.ACTIVE);
	            }

	            element.setAttribute('aria-expanded', true);
	          }

	          if (callback) {
	            callback();
	          }
	        }

	        // static

	      }], [{
	        key: '_jQueryInterface',
	        value: function _jQueryInterface(config) {
	          return this.each(function () {
	            var $this = $(this);
	            var data = $this.data(DATA_KEY);

	            if (!data) {
	              data = data = new Tab(this);
	              $this.data(DATA_KEY, data);
	            }

	            if (typeof config === 'string') {
	              if (data[config] === undefined) {
	                throw new Error('No method named "' + config + '"');
	              }
	              data[config]();
	            }
	          });
	        }
	      }, {
	        key: 'VERSION',
	        get: function get() {
	          return VERSION;
	        }
	      }]);

	      return Tab;
	    })();

	    $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
	      event.preventDefault();
	      Tab._jQueryInterface.call($(this), 'show');
	    });

	    /**
	     * ------------------------------------------------------------------------
	     * jQuery
	     * ------------------------------------------------------------------------
	     */

	    $.fn[NAME] = Tab._jQueryInterface;
	    $.fn[NAME].Constructor = Tab;
	    $.fn[NAME].noConflict = function () {
	      $.fn[NAME] = JQUERY_NO_CONFLICT;
	      return Tab._jQueryInterface;
	    };

	    return Tab;
	  })(jQuery);

	  module.exports = Tab;
	});


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var $ = window.jQuery;

	var STRINGS = __webpack_require__( 9 ).strings;
	var CLASSES = __webpack_require__( 9 ).classes;
	var SELECTORS = __webpack_require__( 9 ).selectors;

	/**
	 * Binds a click handler to the given jQuery object
	 * @param  { Object }   $el   jQuery object which represents the element(s)
	 *                            that should be bound to toggle the off-canvas menu.
	 */
	function bindOffCanvasToggle( $el ) {
	  $el.click( function() {
	    var targetString = $( this ).data( STRINGS.target );
	    var $target = $( targetString );

	    $target.toggleClass( CLASSES.open );

	    return false;
	  });
	}

	module.exports.init = function() {
	  var $offCanvasToggle = $( SELECTORS.offCanvasToggle );

	  bindOffCanvasToggle( $offCanvasToggle );
	};


/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = {
	  strings: {
	    target: 'target'
	  },
	  classes: {
	    open: 'open'
	  },
	  selectors: {
	    offCanvasToggle: '[data-toggle="off-canvas"]'
	  }
	};


/***/ }
/******/ ]);