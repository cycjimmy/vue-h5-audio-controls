(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.H5AudioControls = factory());
}(this, (function () { 'use strict';

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if (_isNativeReflectConstruct()) {
      _construct = Reflect.construct;
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
  }

  function getDefaultExportFromCjs(x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  function createCommonjsModule(fn, basedir, module) {
    return module = {
      path: basedir,
      exports: {},
      require: function (path, base) {
        return commonjsRequire(path, base === undefined || base === null ? module.path : base);
      }
    }, fn(module, module.exports), module.exports;
  }

  function commonjsRequire() {
    throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
  }

  var CreateInstance = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports["default"] = void 0;
    /**
     * singleton constructor(design patterns)
     * @returns {function(*=)}
     * @constructor
     */

    var _default = function _default() {
      var instance;
      return function (newInstance) {
        if (newInstance) {
          instance = newInstance;
        }

        return instance;
      };
    };

    exports["default"] = _default;
  });
  var CreateInstance$1 = /*@__PURE__*/getDefaultExportFromCjs(CreateInstance);
  var isString = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports["default"] = void 0;
    /**
     * determine a string type
     * @param str
     * @returns {boolean}
     */

    var _default = function _default(str) {
      return typeof str === 'string' && str.constructor === String;
    };

    exports["default"] = _default;
  });
  var isString$1 = /*@__PURE__*/getDefaultExportFromCjs(isString);
  var isPromise = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports["default"] = void 0;
    /**
     * determine a promise type
     * @param promise
     * @returns {boolean}
     */

    var _default = function _default(promise) {
      return Object.prototype.toString.call(promise).slice(8, -1) === 'Promise';
    };

    exports["default"] = _default;
  });
  var functionToPromise = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports["default"] = void 0;

    var _isPromise = _interopRequireDefault(isPromise);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        "default": obj
      };
    }
    /**
     * function to promise
     * @param normalFunction
     * @param timeout
     * @returns {Promise<any>}
     */


    var _default = function _default(normalFunction) {
      var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      if ((0, _isPromise["default"])(normalFunction)) {
        return normalFunction;
      } // eslint-disable-next-line no-undef


      return new Promise(function (resolve) {
        normalFunction();
        setTimeout(resolve, timeout);
      });
    };

    exports["default"] = _default;
  });
  var functionToPromise$1 = /*@__PURE__*/getDefaultExportFromCjs(functionToPromise);
  /**
   * isLegalConfigKey
   * @param key
   * @returns {boolean}
   */

  var isLegalConfigKey = function isLegalConfigKey(key) {
    var configKeys = ['audioSrc', 'position', 'buttonSize', 'iconSize', 'playIcon', 'pauseIcon', 'autoPlay'];

    for (var i = 0; i < configKeys.length; i++) {
      if (key === configKeys[i]) {
        return true;
      }
    }

    return false;
  };
  /**
   * audioButton Need Change
   * @param config
   * @param audioButtonConfig
   * @returns {boolean}
   */


  var audioButtonNeedChange = function audioButtonNeedChange(_ref) {
    var config = _ref[0],
        audioButtonConfig = _ref[1];
    var configKeys = ['position', 'buttonSize', 'iconSize', 'playIcon', 'pauseIcon'];

    for (var i = 0; i < configKeys.length; i++) {
      if (config[configKeys[i]] !== audioButtonConfig[configKeys[i]]) {
        return true;
      }
    }

    return false;
  };

  var isAudioPlaying = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports["default"] = void 0;
    /**
     * isAudioPlaying
     * @param audio
     */

    var _default = function _default(audio) {
      return !audio.paused;
    };

    exports["default"] = _default;
  });
  var isAudioPlaying$1 = /*@__PURE__*/getDefaultExportFromCjs(isAudioPlaying);

  var _default = /*#__PURE__*/function () {
    /**
     * Audio
     * @param audioSrc
     */
    function _default(_ref) {
      var audioSrc = _ref.audioSrc;
      this.config = {
        audioSrc: audioSrc
      };
      this.audio = new Audio();

      this._init();
    }
    /**
     * getAudioButton
     * @returns {HTMLAudioElement}
     */


    var _proto = _default.prototype;

    _proto.getAudio = function getAudio() {
      return this.audio;
    }
    /**
     * play
     * @returns {HTMLAudioElement}
     */
    ;

    _proto.play = function play() {
      var _this = this;

      var wxFakePlay = function wxFakePlay() {
        return window.WeixinJSBridge.invoke('getNetworkType', {}, function () {
          return _this.audio.play();
        }, false);
      };

      if (window.WeixinJSBridge) {
        wxFakePlay();
      } else {
        document.addEventListener('WeixinJSBridgeReady', function () {
          return _this.audio.play();
        }, false);
      }

      this.audio.play();
      return this.audio;
    }
    /**
     * pause
     * @returns {HTMLAudioElement}
     */
    ;

    _proto.pause = function pause() {
      this.audio.pause();
      return this.audio;
    }
    /**
     * stop
     * @returns {HTMLAudioElement}
     */
    ;

    _proto.stop = function stop() {
      this.audio.currentTime = 0;
      this.audio.pause();
      return this.audio;
    }
    /**
     * isPlaying
     * @returns {boolean}
     */
    ;

    _proto.isPlaying = function isPlaying() {
      return isAudioPlaying$1(this.audio);
    }
    /**
     * canplay
     * @returns {Promise<>}
     */
    ;

    _proto.canplay = function canplay() {
      var _this2 = this;

      return new Promise(function (resolve) {
        _this2.audio.addEventListener('canplay', resolve);
      });
    }
    /**
     * init
     * @private
     */
    ;

    _proto._init = function _init() {
      this.audio.src = this.config.audioSrc;
      this.audio.preload = 'auto';
      this.audio.loop = true;
    };

    return _default;
  }();

  function styleInject(css, ref) {
    if (ref === void 0) ref = {};
    var insertAt = ref.insertAt;

    if (!css || typeof document === 'undefined') {
      return;
    }

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';

    if (insertAt === 'top') {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  var css_248z = "._2uIf16wCx_{display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;position:fixed;z-index:999;max-width:60px;max-height:60px;width:15vw;height:15vw;-webkit-tap-highlight-color:rgba(255,0,0,0);outline:none;border:none;-ms-touch-action:manipulation;touch-action:manipulation;cursor:pointer}._2uIf16wCx_.left-top{left:0;top:0}._2uIf16wCx_.top-right{top:0;right:0}._2uIf16wCx_.right-bottom{right:0;bottom:0}._2uIf16wCx_.left-bottom{left:0;bottom:0}@-webkit-keyframes _265-UMQKXM{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(-1turn);transform:rotate(-1turn)}}@keyframes _265-UMQKXM{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(-1turn);transform:rotate(-1turn)}}._13F2sLCP2q,.rC6KPfM7Ll{display:block;width:60%;height:60%}.rC6KPfM7Ll{background:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Cstyle%3E.st1{fill-rule:evenodd;clip-rule:evenodd;fill:%23fff}%3C/style%3E%3Cpath d='M32 2.8C15.9 2.8 2.8 15.9 2.8 32S15.9 61.2 32 61.2 61.2 48.1 61.2 32 48.1 2.8 32 2.8z' opacity='.2' fill-rule='evenodd' clip-rule='evenodd'/%3E%3Cpath class='st1' d='M32 0C14.3 0 0 14.3 0 32s14.3 32 32 32 32-14.3 32-32S49.7 0 32 0zm0 61.2C15.9 61.2 2.8 48.1 2.8 32S15.9 2.8 32 2.8 61.2 15.9 61.2 32 48.1 61.2 32 61.2z'/%3E%3Cpath class='st1' d='M30.3 11.2l-2.1.6L36.1 39c-5.6-.8-10.5 4-10.1 8.7.1 1.6 1.3 2.9 2 3.5 4 3.4 9.4-.2 11.3-5.7.8-2.3.4-4-.8-8.1l-4.9-16.9c2.5-.8 7.7 1 9.4 3.5 1.1 1.6 1.8 3.9 1.4 5.8-.1.5-.4 2 0 1.7.7-.6.9-1.2 1.3-2.4.3-1.1.4-2.7.3-3.7-1.6-10-12.7-7.1-15.7-14.2z'/%3E%3C/svg%3E\") 0 0 no-repeat;background-size:100% 100%;-webkit-animation:_265-UMQKXM 2s linear infinite;animation:_265-UMQKXM 2s linear infinite}._13F2sLCP2q{background:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Cpath d='M32 2.8C15.9 2.8 2.8 15.9 2.8 32S15.9 61.2 32 61.2 61.2 48.1 61.2 32 48.1 2.8 32 2.8z' opacity='.2' fill-rule='evenodd' clip-rule='evenodd'/%3E%3Cpath d='M32 0C14.3 0 0 14.3 0 32s14.3 32 32 32 32-14.3 32-32S49.7 0 32 0zM2.8 32C2.8 15.9 15.9 2.8 32 2.8c7.7 0 14.6 3 19.9 7.8L10.6 51.9C5.7 46.6 2.8 39.7 2.8 32zM32 61.2c-7.7 0-14.6-3-19.9-7.8l41.3-41.3c4.8 5.2 7.8 12.2 7.8 19.9 0 16.1-13.1 29.2-29.2 29.2z' fill='%23fff'/%3E%3Cpath d='M30.3 11.2l-2.1.6L36.1 39c-5.6-.8-10.5 4-10.1 8.7.1 1.6 1.3 2.9 2 3.5 4 3.4 9.4-.2 11.3-5.7.8-2.3.4-4-.8-8.1l-4.9-16.9c2.5-.8 7.7 1 9.4 3.5 1.1 1.6 1.8 3.9 1.4 5.8-.1.5-.4 2 0 1.7.7-.6.9-1.2 1.3-2.4.3-1.1.4-2.7.3-3.7-1.6-10-12.7-7.1-15.7-14.2z' fill-rule='evenodd' clip-rule='evenodd' fill='%23fff'/%3E%3C/svg%3E\") 0 0 no-repeat;background-size:100% 100%}";
  var _style = {
    "musicControlWrapper": "_2uIf16wCx_",
    "playIcon": "rC6KPfM7Ll",
    "pauseIcon": "_13F2sLCP2q",
    "reverseRotataZ": "_265-UMQKXM"
  };
  styleInject(css_248z);
  /**
   * fragmentIcon
   * @param iconUrl
   * @param className
   * @param size
   * @returns {HTMLSpanElement}
   */

  var eIcon = function eIcon(_ref) {
    var iconUrl = _ref.iconUrl,
        className = _ref.className,
        size = _ref.size;
    var icon = document.createElement('span');
    var cssText = '';
    icon.classList.add(className);

    if (iconUrl) {
      cssText += "background-image: url(" + iconUrl + "); ";
    }

    if (size) {
      cssText += "width: " + size + "; height: " + size;
    }

    icon.style.cssText = cssText;
    return icon;
  };
  /**
   * playIcon
   * @param iconUrl
   * @param size
   * @returns {HTMLSpanElement}
   */


  var ePlayIcon = function ePlayIcon(_ref2) {
    var iconUrl = _ref2.iconUrl,
        _ref2$size = _ref2.size,
        size = _ref2$size === void 0 ? '' : _ref2$size;
    return eIcon({
      iconUrl: iconUrl,
      className: _style.playIcon,
      size: size
    });
  };
  /**
   * pauseIcon
   * @param iconUrl
   * @param size
   * @returns {HTMLSpanElement}
   */


  var ePauseIcon = function ePauseIcon(_ref3) {
    var iconUrl = _ref3.iconUrl,
        _ref3$size = _ref3.size,
        size = _ref3$size === void 0 ? '' : _ref3$size;
    return eIcon({
      iconUrl: iconUrl,
      className: _style.pauseIcon,
      size: size
    });
  };

  var _default$1 = /*#__PURE__*/function () {
    /**
     * AudioButton
     * @param buttonSize
     * @param position
     * @param positionType 'fixed'|'absolute'|'relative'|'sticky'|'static' default: 'fixed'
     * @param iconSize
     * @param playIcon
     * @param pauseIcon
     */
    function _default(_ref) {
      var _ref$position = _ref.position,
          position = _ref$position === void 0 ? 'top-right' : _ref$position,
          _ref$positionType = _ref.positionType,
          positionType = _ref$positionType === void 0 ? 'fixed' : _ref$positionType,
          _ref$buttonSize = _ref.buttonSize,
          buttonSize = _ref$buttonSize === void 0 ? '' : _ref$buttonSize,
          _ref$iconSize = _ref.iconSize,
          iconSize = _ref$iconSize === void 0 ? '' : _ref$iconSize,
          _ref$playIcon = _ref.playIcon,
          playIcon = _ref$playIcon === void 0 ? '' : _ref$playIcon,
          _ref$pauseIcon = _ref.pauseIcon,
          pauseIcon = _ref$pauseIcon === void 0 ? '' : _ref$pauseIcon;
      this.config = {
        buttonSize: buttonSize,
        position: position,
        positionType: positionType,
        iconSize: iconSize,
        playIcon: playIcon,
        pauseIcon: pauseIcon
      };
      this.buttonSize = isString$1(this.config.buttonSize) ? this.config.buttonSize : this.config.buttonSize + "px";
      this.iconSize = isString$1(this.config.iconSize) ? this.config.iconSize : this.config.iconSize + "px";
      this.audioButton = document.createElement('a');
      this.playIcon = ePlayIcon({
        iconUrl: this.config.playIcon,
        size: this.iconSize
      });
      this.pauseIcon = ePauseIcon({
        iconUrl: this.config.pauseIcon,
        size: this.iconSize
      });

      this._init();
    }
    /**
     * getAudioButton
     * @returns {HTMLAnchorElement | {changeUIToPlay(): void, _init(): void, getAudioButton(): *, changeUIToPause(): void}}
     */


    var _proto = _default.prototype;

    _proto.getAudioButton = function getAudioButton() {
      return this.audioButton;
    }
    /**
     * changeUIToPlay
     */
    ;

    _proto.changeUIToPlay = function changeUIToPlay() {
      if (this.audioButton.contains(this.pauseIcon)) {
        this.audioButton.removeChild(this.pauseIcon);
      }

      this.audioButton.appendChild(this.playIcon);
    }
    /**
     * changeUIToPause
     */
    ;

    _proto.changeUIToPause = function changeUIToPause() {
      if (this.audioButton.contains(this.playIcon)) {
        this.audioButton.removeChild(this.playIcon);
      }

      this.audioButton.appendChild(this.pauseIcon);
    }
    /**
     * init
     * @private
     */
    ;

    _proto._init = function _init() {
      this.audioButton.classList.add(_style.musicControlWrapper, this.config.position); // Init Button Size

      if (!this.buttonSize) {
        var shortW = window.innerWidth > window.innerHeight ? window.innerHeight : window.innerWidth;
        this.buttonSize = shortW * 0.15 + "px";
      }

      this.audioButton.style.cssText += "width: " + this.buttonSize + "; height: " + this.buttonSize;

      this._setPositionType();

      this.changeUIToPlay();
    }
    /**
     * _setPositionType
     * @private
     */
    ;

    _proto._setPositionType = function _setPositionType() {
      // eslint-disable-next-line default-case
      switch (this.config.positionType) {
        // 'fixed' is default in style
        case 'static':
        case 'relative':
        case 'absolute':
        case 'sticky':
          this.audioButton.style.position = this.config.positionType;
      }
    };

    return _default;
  }();
  /**
   * H5AudioControls
   *
   * Function:
   * load
   * play
   * pause
   * stop
   * changeButtonUI
   * isPlaying
   */


  var _default$2 = /*#__PURE__*/function () {
    /**
     * H5AudioControls
     * @param audioSrc
     * @param context default: body
     * @param position 'left-top'|'top-right'(default)|'right-bottom'|'left-bottom'
     * @param positionType 'fixed'|'absolute'|'relative'|'sticky'|'static' default: 'fixed'
     * @param buttonSize
     * @param iconSize
     * @param playIcon
     * @param pauseIcon
     * @param autoPlay default: true
     */
    function _default$2(audioSrc, _temp) {
      var _ref = _temp === void 0 ? {} : _temp,
          _ref$context = _ref.context,
          context = _ref$context === void 0 ? document.body : _ref$context,
          _ref$position = _ref.position,
          position = _ref$position === void 0 ? 'top-right' : _ref$position,
          _ref$positionType = _ref.positionType,
          positionType = _ref$positionType === void 0 ? 'fixed' : _ref$positionType,
          _ref$buttonSize = _ref.buttonSize,
          buttonSize = _ref$buttonSize === void 0 ? '' : _ref$buttonSize,
          _ref$iconSize = _ref.iconSize,
          iconSize = _ref$iconSize === void 0 ? '' : _ref$iconSize,
          _ref$playIcon = _ref.playIcon,
          playIcon = _ref$playIcon === void 0 ? '' : _ref$playIcon,
          _ref$pauseIcon = _ref.pauseIcon,
          pauseIcon = _ref$pauseIcon === void 0 ? '' : _ref$pauseIcon,
          _ref$autoPlay = _ref.autoPlay,
          autoPlay = _ref$autoPlay === void 0 ? true : _ref$autoPlay;

      this.config = {
        audioSrc: audioSrc,
        position: position,
        positionType: positionType,
        buttonSize: buttonSize,
        iconSize: iconSize,
        playIcon: playIcon,
        pauseIcon: pauseIcon,
        autoPlay: autoPlay
      };
      this.state = {
        isAudioButtonChanging: false
      };
      this.setContext(context);

      this._init();
    }
    /**
     * setContext
     * @param context
     */


    var _proto = _default$2.prototype;

    _proto.setContext = function setContext(context) {
      this.context = isString$1(context) ? document.querySelector(context) : context;
      return this;
    }
    /**
     * Load
     * @returns {Promise<void>}
     */
    ;

    _proto.load = function load() {
      var _this = this;

      return this.appendAudioButton().then(function () {
        return functionToPromise$1(function () {
          if (_this.config.autoPlay) {
            _this.play();

            _this.audioInstance.canplay().then(function () {
              _this.changeButtonUI();
            });
          }
        });
      });
    }
    /**
     * play
     */
    ;

    _proto.play = function play() {
      var _this2 = this;

      this.audioInstance.play();
      setTimeout(function () {
        return _this2.changeButtonUI();
      }, 0);
    }
    /**
     * pause
     */
    ;

    _proto.pause = function pause() {
      var _this3 = this;

      this.audioInstance.pause();
      setTimeout(function () {
        return _this3.changeButtonUI();
      }, 0);
    }
    /**
     * stop
     */
    ;

    _proto.stop = function stop() {
      var _this4 = this;

      this.audioInstance.stop();
      setTimeout(function () {
        return _this4.changeButtonUI();
      }, 0);
    }
    /**
     * changeButtonUI
     */
    ;

    _proto.changeButtonUI = function changeButtonUI() {
      if (this.isPlaying()) {
        this.audioButtonInstance.changeUIToPlay();
      } else {
        this.audioButtonInstance.changeUIToPause();
      }
    }
    /**
     * dynamically change the value of configuration properties
     * @param key
     * @param val
     * @returns {Promise<void>}
     */
    ;

    _proto.change = function change(key, val) {
      var _this5 = this;

      if (!isLegalConfigKey(key)) {
        return Promise.resolve();
      }

      if (typeof val === 'undefined') {
        return Promise.resolve();
      }

      this.config[key] = val;

      if (key === 'autoPlay') {
        return Promise.resolve();
      }

      if (key === 'audioSrc') {
        return Promise.resolve().then(function () {
          return functionToPromise$1(function () {
            _this5.stop();

            _this5._initAudioInstance();
          });
        }).then(function () {
          return functionToPromise$1(function () {
            if (_this5.config.autoPlay) {
              _this5.play();
            }
          });
        });
      }

      if (this.state.isAudioButtonChanging) {
        return Promise.resolve().then(function () {
          return functionToPromise$1(function () {}, 10);
        }).then(function () {
          return _this5.change(key, val);
        });
      }

      this.state.isAudioButtonChanging = true;
      return Promise.resolve().then(function () {
        if (!audioButtonNeedChange([_this5.config, _this5.audioButtonInstance.config])) {
          _this5.state.isAudioButtonChanging = false;
          return Promise.resolve();
        }

        return Promise.resolve().then(function () {
          return _this5.repaintAudioButton();
        }).then(function () {
          return functionToPromise$1(function () {
            _this5.state.isAudioButtonChanging = false;
          });
        });
      });
    }
    /**
     * changeAudioSrc
     * @param src
     * @returns {Promise<void>}
     */
    ;

    _proto.changeAudioSrc = function changeAudioSrc(src) {
      return this.change('audioSrc', src);
    }
    /**
     * changePosition
     * @param position
     * @returns {Promise<void>}
     */
    ;

    _proto.changePosition = function changePosition(position) {
      return this.change('position', position);
    }
    /**
     * changeButtonSize
     * @param size
     * @returns {Promise<void>}
     */
    ;

    _proto.changeButtonSize = function changeButtonSize(size) {
      return this.change('buttonSize', size);
    }
    /**
     * changeIconSize
     * @param size
     * @returns {Promise<void>}
     */
    ;

    _proto.changeIconSize = function changeIconSize(size) {
      return this.change('iconSize', size);
    }
    /**
     * isPlaying
     * @returns {boolean}
     */
    ;

    _proto.isPlaying = function isPlaying() {
      return this.audioInstance.isPlaying();
    }
    /**
     * eventBind
     */
    ;

    _proto.eventBind = function eventBind() {
      var _this6 = this;

      this.audioButtonInstance.getAudioButton().addEventListener('click', function (e) {
        e.stopPropagation();

        if (_this6.isPlaying()) {
          _this6.pause();

          return;
        }

        _this6.play();
      });
      return this;
    }
    /**
     * Repaint AudioButton
     * @returns {Promise<void>}
     */
    ;

    _proto.repaintAudioButton = function repaintAudioButton() {
      var _this7 = this;

      return Promise.resolve().then(function () {
        return functionToPromise$1(function () {
          _this7.context.removeChild(_this7.audioButtonInstance.getAudioButton());
        });
      }).then(function () {
        return functionToPromise$1(function () {
          _this7._initAudioButtonInstance();
        });
      }).then(function () {
        return _this7.appendAudioButton();
      });
    }
    /**
     * appendAudioButton
     * @returns {Promise<void>}
     */
    ;

    _proto.appendAudioButton = function appendAudioButton() {
      var _this8 = this;

      return Promise.resolve().then(function () {
        return functionToPromise$1(function () {
          _this8.context.appendChild(_this8.audioButtonInstance.getAudioButton());

          _this8.changeButtonUI();

          _this8.eventBind();
        });
      });
    }
    /**
     * Init
     * @private
     */
    ;

    _proto._init = function _init() {
      this._initAudioInstance();

      this._initAudioButtonInstance();
    }
    /**
     * InitAudioInstance
     * @private
     */
    ;

    _proto._initAudioInstance = function _initAudioInstance() {
      this.audioInstance = new _default({
        audioSrc: this.config.audioSrc
      });
      return this;
    }
    /**
     * InitAudioButtonInstance
     * @private
     */
    ;

    _proto._initAudioButtonInstance = function _initAudioButtonInstance() {
      this.audioButtonInstance = new _default$1({
        buttonSize: this.config.buttonSize,
        position: this.config.position,
        positionType: this.config.positionType,
        iconSize: this.config.iconSize,
        playIcon: this.config.playIcon,
        pauseIcon: this.config.pauseIcon
      });
      return this;
    };

    return _default$2;
  }();

  var instance = new CreateInstance$1();
  /**
   * h5AudioControls
   * @param param
   * @returns {H5AudioControls}
   */

  var index = function () {
    if (instance()) {
      return instance();
    }

    for (var _len = arguments.length, param = new Array(_len), _key = 0; _key < _len; _key++) {
      param[_key] = arguments[_key];
    }

    var h5AudioControls = _construct(_default$2, param);

    instance(h5AudioControls);
    return h5AudioControls;
  };

  var H5AudioControls = {
    name: 'h5-audio-controls',
    template: "<div :style=\"containerStyle\"></div>",
    data: function data() {
      return {
        containerStyle: {
          width: 0,
          height: 0
        }
      };
    },
    props: {
      src: String,
      position: String,
      positionType: String,
      buttonSize: [String, Number],
      iconSize: [String, Number],
      playIcon: String,
      pauseIcon: String,
      autoPlay: {
        type: Boolean,
        "default": true
      }
    },
    methods: {
      play: function play() {
        this.h5AudioControls.play();
      },
      pause: function pause() {
        this.h5AudioControls.pause();
      },
      stop: function stop() {
        this.h5AudioControls.stop();
      },
      changeButtonUI: function changeButtonUI() {
        this.h5AudioControls.changeButtonUI();
      },
      isPlaying: function isPlaying() {
        return this.h5AudioControls.isPlaying();
      }
    },
    watch: {
      src: function src(val) {
        this.h5AudioControls.changeAudioSrc(val);
      },
      position: function position(val) {
        this.h5AudioControls.changePosition(val);
      },
      buttonSize: function buttonSize(val) {
        this.h5AudioControls.changeButtonSize(val);
      },
      iconSize: function iconSize(val) {
        this.h5AudioControls.changeIconSize(val);
      },
      playIcon: function playIcon(val) {
        this.h5AudioControls.change('playIcon', val);
      },
      pauseIcon: function pauseIcon(val) {
        this.h5AudioControls.change('pauseIcon', val);
      },
      autoPlay: function autoPlay(val) {
        this.h5AudioControls.change('autoPlay', val);
      }
    },
    mounted: function mounted() {
      this.h5AudioControls = index(this.src, {
        context: this.$el,
        position: this.position,
        positionType: this.positionType,
        buttonSize: this.buttonSize,
        iconSize: this.iconSize,
        playIcon: this.playIcon,
        pauseIcon: this.pauseIcon,
        autoPlay: this.autoPlay
      });
      this.h5AudioControls.load();
    }
  };

  var install = function install(Vue) {
    Vue.component(H5AudioControls.name, H5AudioControls);
  };

  H5AudioControls.install = install;

  return H5AudioControls;

})));
