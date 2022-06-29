(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.H5AudioControls = factory());
})(this, (function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
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
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if (_isNativeReflectConstruct()) {
      _construct = Reflect.construct.bind();
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

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;

    var _s, _e;

    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  /**
   * singleton constructor(design patterns)
   * @returns {function(*=)}
   * @constructor
   */


  var CreateInstance = () => {
    var instance;
    return newInstance => {
      if (newInstance) {
        instance = newInstance;
      }

      return instance;
    };
  };
  /**
   * determine a string type
   * @param str
   * @returns {boolean}
   */


  var isString = str => typeof str === 'string' && str.constructor === String;
  /**
   * determine a promise type
   * @param promise
   * @returns {boolean}
   */


  var isPromise = promise => Object.prototype.toString.call(promise).slice(8, -1) === 'Promise';
  /**
   * function to promise
   * @param normalFunction
   * @param timeout
   * @returns {Promise<any>}
   */


  var functionToPromise = function (normalFunction) {
    var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    if (isPromise(normalFunction)) {
      return normalFunction;
    } // eslint-disable-next-line no-undef


    return new Promise(resolve => {
      normalFunction();
      setTimeout(resolve, timeout);
    });
  };
  /**
   * isLegalConfigKey
   * @param key
   * @returns {boolean}
   */


  var isLegalConfigKey = function isLegalConfigKey(key) {
    var configKeys = ['audioSrc', 'position', 'buttonSize', 'iconSize', 'playIcon', 'pauseIcon', 'autoPlay'];

    for (var i = 0; i < configKeys.length; i += 1) {
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
    var _ref2 = _slicedToArray(_ref, 2),
        config = _ref2[0],
        audioButtonConfig = _ref2[1];

    var configKeys = ['position', 'buttonSize', 'iconSize', 'playIcon', 'pauseIcon'];

    for (var i = 0; i < configKeys.length; i += 1) {
      if (config[configKeys[i]] !== audioButtonConfig[configKeys[i]]) {
        return true;
      }
    }

    return false;
  };
  /**
   * isAudioPlaying
   * @param audio
   */


  var isAudioPlaying = audio => !audio.paused;

  var _default$2 = /*#__PURE__*/function () {
    /**
     * Audio
     * @param audioSrc
     */
    function _default(_ref) {
      var audioSrc = _ref.audioSrc;

      _classCallCheck(this, _default);

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


    _createClass(_default, [{
      key: "getAudio",
      value: function getAudio() {
        return this.audio;
      }
      /**
       * play
       * @returns {HTMLAudioElement}
       */

    }, {
      key: "play",
      value: function play() {
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

    }, {
      key: "pause",
      value: function pause() {
        this.audio.pause();
        return this.audio;
      }
      /**
       * stop
       * @returns {HTMLAudioElement}
       */

    }, {
      key: "stop",
      value: function stop() {
        this.audio.currentTime = 0;
        this.audio.pause();
        return this.audio;
      }
      /**
       * isPlaying
       * @returns {boolean}
       */

    }, {
      key: "isPlaying",
      value: function isPlaying() {
        return isAudioPlaying(this.audio);
      }
      /**
       * canplay
       * @returns {Promise<>}
       */

    }, {
      key: "canplay",
      value: function canplay() {
        var _this2 = this;

        return new Promise(function (resolve) {
          _this2.audio.addEventListener('canplay', resolve);
        });
      }
      /**
       * init
       * @private
       */

    }, {
      key: "_init",
      value: function _init() {
        this.audio.src = this.config.audioSrc;
        this.audio.preload = 'auto';
        this.audio.loop = true;
      }
    }]);

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

  var css_248z = ".YY7FU9uLKr{-ms-flex-pack:center;-ms-flex-align:center;-webkit-tap-highlight-color:rgba(255,0,0,0);-webkit-align-items:center;align-items:center;border:none;cursor:pointer;display:-webkit-flex;display:-ms-flexbox;display:flex;height:15vw;-webkit-justify-content:center;justify-content:center;max-height:60px;max-width:60px;outline:none;position:fixed;-ms-touch-action:manipulation;touch-action:manipulation;width:15vw;z-index:999}.YY7FU9uLKr.left-top{left:0;top:0}.YY7FU9uLKr.top-right{right:0;top:0}.YY7FU9uLKr.right-bottom{bottom:0;right:0}.YY7FU9uLKr.left-bottom{bottom:0;left:0}@-webkit-keyframes _0-YdR1QUOM{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(-1turn);transform:rotate(-1turn)}}@keyframes _0-YdR1QUOM{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(-1turn);transform:rotate(-1turn)}}.J57gYboR-w,.PDTV9-opA4{display:block;height:60%;width:60%}.J57gYboR-w{-webkit-animation:_0-YdR1QUOM 2s linear infinite;animation:_0-YdR1QUOM 2s linear infinite;background:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Cstyle%3E.st1{fill-rule:evenodd;clip-rule:evenodd;fill:%23fff}%3C/style%3E%3Cpath d='M32 2.8C15.9 2.8 2.8 15.9 2.8 32S15.9 61.2 32 61.2 61.2 48.1 61.2 32 48.1 2.8 32 2.8z' opacity='.2' fill-rule='evenodd' clip-rule='evenodd'/%3E%3Cpath class='st1' d='M32 0C14.3 0 0 14.3 0 32s14.3 32 32 32 32-14.3 32-32S49.7 0 32 0zm0 61.2C15.9 61.2 2.8 48.1 2.8 32S15.9 2.8 32 2.8 61.2 15.9 61.2 32 48.1 61.2 32 61.2z'/%3E%3Cpath class='st1' d='m30.3 11.2-2.1.6L36.1 39c-5.6-.8-10.5 4-10.1 8.7.1 1.6 1.3 2.9 2 3.5 4 3.4 9.4-.2 11.3-5.7.8-2.3.4-4-.8-8.1l-4.9-16.9c2.5-.8 7.7 1 9.4 3.5 1.1 1.6 1.8 3.9 1.4 5.8-.1.5-.4 2 0 1.7.7-.6.9-1.2 1.3-2.4.3-1.1.4-2.7.3-3.7-1.6-10-12.7-7.1-15.7-14.2z'/%3E%3C/svg%3E\") 0 0 no-repeat;background-size:100% 100%}.PDTV9-opA4{background:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Cpath d='M32 2.8C15.9 2.8 2.8 15.9 2.8 32S15.9 61.2 32 61.2 61.2 48.1 61.2 32 48.1 2.8 32 2.8z' opacity='.2' fill-rule='evenodd' clip-rule='evenodd'/%3E%3Cpath d='M32 0C14.3 0 0 14.3 0 32s14.3 32 32 32 32-14.3 32-32S49.7 0 32 0zM2.8 32C2.8 15.9 15.9 2.8 32 2.8c7.7 0 14.6 3 19.9 7.8L10.6 51.9C5.7 46.6 2.8 39.7 2.8 32zM32 61.2c-7.7 0-14.6-3-19.9-7.8l41.3-41.3c4.8 5.2 7.8 12.2 7.8 19.9 0 16.1-13.1 29.2-29.2 29.2z' fill='%23fff'/%3E%3Cpath d='m30.3 11.2-2.1.6L36.1 39c-5.6-.8-10.5 4-10.1 8.7.1 1.6 1.3 2.9 2 3.5 4 3.4 9.4-.2 11.3-5.7.8-2.3.4-4-.8-8.1l-4.9-16.9c2.5-.8 7.7 1 9.4 3.5 1.1 1.6 1.8 3.9 1.4 5.8-.1.5-.4 2 0 1.7.7-.6.9-1.2 1.3-2.4.3-1.1.4-2.7.3-3.7-1.6-10-12.7-7.1-15.7-14.2z' fill-rule='evenodd' clip-rule='evenodd' fill='%23fff'/%3E%3C/svg%3E\") 0 0 no-repeat;background-size:100% 100%}";
  var _style = {
    "musicControlWrapper": "YY7FU9uLKr",
    "playIcon": "J57gYboR-w",
    "pauseIcon": "PDTV9-opA4",
    "reverseRotataZ": "_0-YdR1QUOM"
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
      cssText += "background-image: url(".concat(iconUrl, "); ");
    }

    if (size) {
      cssText += "width: ".concat(size, "; height: ").concat(size);
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

      _classCallCheck(this, _default);

      this.config = {
        buttonSize: buttonSize,
        position: position,
        positionType: positionType,
        iconSize: iconSize,
        playIcon: playIcon,
        pauseIcon: pauseIcon
      };
      this.buttonSize = isString(this.config.buttonSize) ? this.config.buttonSize : "".concat(this.config.buttonSize, "px");
      this.iconSize = isString(this.config.iconSize) ? this.config.iconSize : "".concat(this.config.iconSize, "px");
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
     * @returns {
     * HTMLAnchorElement |
     *   {
     *      changeUIToPlay(): void,
     *      _init(): void,
     *      getAudioButton(): *,
     *      changeUIToPause(): void
     *   }
     * }
     */


    _createClass(_default, [{
      key: "getAudioButton",
      value: function getAudioButton() {
        return this.audioButton;
      }
      /**
       * changeUIToPlay
       */

    }, {
      key: "changeUIToPlay",
      value: function changeUIToPlay() {
        if (this.audioButton.contains(this.pauseIcon)) {
          this.audioButton.removeChild(this.pauseIcon);
        }

        this.audioButton.appendChild(this.playIcon);
      }
      /**
       * changeUIToPause
       */

    }, {
      key: "changeUIToPause",
      value: function changeUIToPause() {
        if (this.audioButton.contains(this.playIcon)) {
          this.audioButton.removeChild(this.playIcon);
        }

        this.audioButton.appendChild(this.pauseIcon);
      }
      /**
       * init
       * @private
       */

    }, {
      key: "_init",
      value: function _init() {
        this.audioButton.classList.add(_style.musicControlWrapper, this.config.position); // Init Button Size

        if (!this.buttonSize) {
          var shortW = window.innerWidth > window.innerHeight ? window.innerHeight : window.innerWidth;
          this.buttonSize = "".concat(shortW * 0.15, "px");
        }

        this.audioButton.style.cssText += "width: ".concat(this.buttonSize, "; height: ").concat(this.buttonSize);

        this._setPositionType();

        this.changeUIToPlay();
      }
      /**
       * _setPositionType
       * @private
       */

    }, {
      key: "_setPositionType",
      value: function _setPositionType() {
        // eslint-disable-next-line default-case
        switch (this.config.positionType) {
          // 'fixed' is default in style
          case 'static':
          case 'relative':
          case 'absolute':
          case 'sticky':
            this.audioButton.style.position = this.config.positionType;
        }
      }
    }]);

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


  var _default = /*#__PURE__*/function () {
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
    function _default(audioSrc) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
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

      _classCallCheck(this, _default);

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


    _createClass(_default, [{
      key: "setContext",
      value: function setContext(context) {
        this.context = isString(context) ? document.querySelector(context) : context;
        return this;
      }
      /**
       * Load
       * @returns {Promise<void>}
       */

    }, {
      key: "load",
      value: function load() {
        var _this = this;

        return this.appendAudioButton().then(function () {
          return functionToPromise(function () {
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

    }, {
      key: "play",
      value: function play() {
        var _this2 = this;

        this.audioInstance.play();
        setTimeout(function () {
          return _this2.changeButtonUI();
        }, 0);
      }
      /**
       * pause
       */

    }, {
      key: "pause",
      value: function pause() {
        var _this3 = this;

        this.audioInstance.pause();
        setTimeout(function () {
          return _this3.changeButtonUI();
        }, 0);
      }
      /**
       * stop
       */

    }, {
      key: "stop",
      value: function stop() {
        var _this4 = this;

        this.audioInstance.stop();
        setTimeout(function () {
          return _this4.changeButtonUI();
        }, 0);
      }
      /**
       * changeButtonUI
       */

    }, {
      key: "changeButtonUI",
      value: function changeButtonUI() {
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

    }, {
      key: "change",
      value: function change(key, val) {
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
            return functionToPromise(function () {
              _this5.stop();

              _this5._initAudioInstance();
            });
          }).then(function () {
            return functionToPromise(function () {
              if (_this5.config.autoPlay) {
                _this5.play();
              }
            });
          });
        }

        if (this.state.isAudioButtonChanging) {
          return Promise.resolve().then(function () {
            return functionToPromise(function () {}, 10);
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
            return functionToPromise(function () {
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

    }, {
      key: "changeAudioSrc",
      value: function changeAudioSrc(src) {
        return this.change('audioSrc', src);
      }
      /**
       * changePosition
       * @param position
       * @returns {Promise<void>}
       */

    }, {
      key: "changePosition",
      value: function changePosition(position) {
        return this.change('position', position);
      }
      /**
       * changeButtonSize
       * @param size
       * @returns {Promise<void>}
       */

    }, {
      key: "changeButtonSize",
      value: function changeButtonSize(size) {
        return this.change('buttonSize', size);
      }
      /**
       * changeIconSize
       * @param size
       * @returns {Promise<void>}
       */

    }, {
      key: "changeIconSize",
      value: function changeIconSize(size) {
        return this.change('iconSize', size);
      }
      /**
       * isPlaying
       * @returns {boolean}
       */

    }, {
      key: "isPlaying",
      value: function isPlaying() {
        return this.audioInstance.isPlaying();
      }
      /**
       * eventBind
       */

    }, {
      key: "eventBind",
      value: function eventBind() {
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

    }, {
      key: "repaintAudioButton",
      value: function repaintAudioButton() {
        var _this7 = this;

        return Promise.resolve().then(function () {
          return functionToPromise(function () {
            _this7.context.removeChild(_this7.audioButtonInstance.getAudioButton());
          });
        }).then(function () {
          return functionToPromise(function () {
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

    }, {
      key: "appendAudioButton",
      value: function appendAudioButton() {
        var _this8 = this;

        return Promise.resolve().then(function () {
          return functionToPromise(function () {
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

    }, {
      key: "_init",
      value: function _init() {
        this._initAudioInstance();

        this._initAudioButtonInstance();
      }
      /**
       * InitAudioInstance
       * @private
       */

    }, {
      key: "_initAudioInstance",
      value: function _initAudioInstance() {
        this.audioInstance = new _default$2({
          audioSrc: this.config.audioSrc
        });
        return this;
      }
      /**
       * InitAudioButtonInstance
       * @private
       */

    }, {
      key: "_initAudioButtonInstance",
      value: function _initAudioButtonInstance() {
        this.audioButtonInstance = new _default$1({
          buttonSize: this.config.buttonSize,
          position: this.config.position,
          positionType: this.config.positionType,
          iconSize: this.config.iconSize,
          playIcon: this.config.playIcon,
          pauseIcon: this.config.pauseIcon
        });
        return this;
      }
    }]);

    return _default;
  }();

  var instance = CreateInstance();
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

    var h5AudioControls = _construct(_default, param);

    instance(h5AudioControls);
    return h5AudioControls;
  };

  var H5AudioControls = {
    name: 'h5-audio-controls',
    template: '<div :style="containerStyle"></div>',
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

}));
