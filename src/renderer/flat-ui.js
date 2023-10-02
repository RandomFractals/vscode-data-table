/**
 * Flat UI Grid created from dev cjs module of flat-ui repo fork:
 *
 * https://github.com/RandomFractals/flat-ui
 */

/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable curly */
/* eslint-disable eqeqeq */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var create = _interopDefault(require('zustand'));
var produce = _interopDefault(require('immer'));
var d3 = require('d3');
var fromPairs = _interopDefault(require('lodash/fromPairs'));
var isEqual = _interopDefault(require('lodash/isEqual'));
var isValidDate = _interopDefault(require('date-fns/isValid'));
var parseDate = _interopDefault(require('date-fns/parse'));
var parseISO = _interopDefault(require('date-fns/parseISO'));
var matchSorter = require('match-sorter');
var react = require('@emotion/react');
var DOMPurify = _interopDefault(require('dompurify'));
var debounce = _interopDefault(require('lodash/debounce'));
var Downshift = _interopDefault(require('downshift'));
var reactRange = require('react-range');
var AutoSizer = _interopDefault(require('react-virtualized-auto-sizer'));
var reactWindow = require('react-window');
var octiconsReact = require('@primer/octicons-react');
var Linkify = _interopDefault(require('linkify-it'));

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

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

var css_248z = ".github-octo-flat-ui *,\r\n.github-octo-flat-ui ::before,\r\n.github-octo-flat-ui ::after {\r\n  box-sizing: border-box;\r\n}\r\n\r\n.github-octo-flat-ui {\r\n  -moz-tab-size: 4;\r\n  -o-tab-size: 4;\r\n     tab-size: 4;\r\n  line-height: 0.8; /* 1 */\r\n  -webkit-text-size-adjust: 100%; /* 2 */\r\n  margin: 0;\r\n  font-family: system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial,\r\n    sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji';\r\n}\r\n\r\n.github-octo-flat-ui hr {\r\n  height: 0; /* 1 */\r\n  color: inherit; /* 2 */\r\n}\r\n\r\n.github-octo-flat-ui code,\r\n.github-octo-flat-ui kbd,\r\n.github-octo-flat-ui samp,\r\n.github-octo-flat-ui pre {\r\n  font-family: ui-monospace, SFMono-Regular, Consolas, 'Liberation Mono', Menlo,\r\n    monospace; /* 1 */\r\n  font-size: 1em; /* 2 */\r\n}\r\n.github-octo-flat-ui table {\r\n  text-indent: 0; /* 1 */\r\n  border-color: inherit; /* 2 */\r\n}\r\n\r\n.github-octo-flat-ui button,\r\n.github-octo-flat-ui input,\r\n.github-octo-flat-ui optgroup,\r\n.github-octo-flat-ui select,\r\n.github-octo-flat-ui textarea {\r\n  font-family: inherit; /* 1 */\r\n  font-size: 100%; /* 1 */\r\n  line-height: 0.8; /* 1 */\r\n  margin: 0; /* 2 */\r\n}\r\n\r\n.github-octo-flat-ui button,\r\n.github-octo-flat-ui select {\r\n  /* 1 */\r\n  text-transform: none;\r\n}\r\n\r\n.github-octo-flat-ui button,\r\n.github-octo-flat-ui [type='button'],\r\n.github-octo-flat-ui [type='reset'],\r\n.github-octo-flat-ui [type='submit'] {\r\n  -webkit-appearance: button;\r\n}\r\n\r\n.github-octo-flat-ui ::-moz-focus-inner {\r\n  border-style: none;\r\n  padding: 0;\r\n}\r\n\r\n.github-octo-flat-ui :-moz-focusring {\r\n  outline: 1px dotted ButtonText;\r\n}\r\n\r\n.github-octo-flat-ui :-moz-ui-invalid {\r\n  box-shadow: none;\r\n}\r\n\r\n.github-octo-flat-ui ::-webkit-inner-spin-button,\r\n.github-octo-flat-ui ::-webkit-outer-spin-button {\r\n  height: auto;\r\n}\r\n\r\n.github-octo-flat-ui [type='search'] {\r\n  -webkit-appearance: textfield; /* 1 */\r\n  outline-offset: -2px; /* 2 */\r\n}\r\n\r\n.github-octo-flat-ui ::-webkit-search-decoration {\r\n  -webkit-appearance: none;\r\n}\r\n\r\n.github-octo-flat-ui ::-webkit-file-upload-button {\r\n  -webkit-appearance: button; /* 1 */\r\n  font: inherit; /* 2 */\r\n}\r\n\r\n.github-octo-flat-ui summary {\r\n  display: list-item;\r\n}\r\n\r\n.github-octo-flat-ui button {\r\n  background-color: transparent;\r\n  background-image: none;\r\n}\r\n\r\n.github-octo-flat-ui fieldset {\r\n  margin: 0;\r\n  padding: 0;\r\n}\r\n\r\n.github-octo-flat-ui ol,\r\n.github-octo-flat-ui ul {\r\n  list-style: none;\r\n  margin: 0;\r\n  padding: 0;\r\n}\r\n\r\n.github-octo-flat-ui {\r\n  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,\r\n    'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif,\r\n    'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'; /* 1 */\r\n  line-height: 0.8; /* 2 */\r\n}\r\n\r\n.github-octo-flat-ui *,\r\n.github-octo-flat-ui ::before,\r\n.github-octo-flat-ui ::after {\r\n  box-sizing: border-box; /* 1 */\r\n  border-width: 0; /* 2 */\r\n  border-style: solid; /* 2 */\r\n  border-color: currentColor; /* 2 */\r\n}\r\n\r\n.github-octo-flat-ui hr {\r\n  border-top-width: 1px;\r\n}\r\n\r\n.github-octo-flat-ui img {\r\n  border-style: solid;\r\n}\r\n\r\n.github-octo-flat-ui textarea {\r\n  resize: vertical;\r\n}\r\n\r\n.github-octo-flat-ui input::-moz-placeholder, .github-octo-flat-ui textarea::-moz-placeholder {\r\n  opacity: 1;\r\n  color: #9ca3af;\r\n}\r\n\r\n.github-octo-flat-ui input:-ms-input-placeholder, .github-octo-flat-ui textarea:-ms-input-placeholder {\r\n  opacity: 1;\r\n  color: #9ca3af;\r\n}\r\n\r\n.github-octo-flat-ui input::placeholder,\r\n.github-octo-flat-ui textarea::placeholder {\r\n  opacity: 1;\r\n  color: #9ca3af;\r\n}\r\n\r\n.github-octo-flat-ui button,\r\n.github-octo-flat-ui [role='button'] {\r\n  cursor: pointer;\r\n}\r\n\r\n.github-octo-flat-ui table {\r\n  border-collapse: collapse;\r\n}\r\n\r\n.github-octo-flat-ui a {\r\n  color: inherit;\r\n  text-decoration: inherit;\r\n}\r\n\r\n.github-octo-flat-ui button,\r\n.github-octo-flat-ui input,\r\n.github-octo-flat-ui optgroup,\r\n.github-octo-flat-ui select,\r\n.github-octo-flat-ui textarea {\r\n  line-height: inherit;\r\n  color: inherit;\r\n}\r\n\r\n.github-octo-flat-ui pre,\r\n.github-octo-flat-ui code,\r\n.github-octo-flat-ui kbd,\r\n.github-octo-flat-ui samp {\r\n  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,\r\n    'Liberation Mono', 'Courier New', monospace;\r\n}\r\n\r\n.github-octo-flat-ui img,\r\n.github-octo-flat-ui svg,\r\n.github-octo-flat-ui video,\r\n.github-octo-flat-ui canvas,\r\n.github-octo-flat-ui audio,\r\n.github-octo-flat-ui iframe,\r\n.github-octo-flat-ui embed,\r\n.github-octo-flat-ui object {\r\n  display: block; /* 1 */\r\n  vertical-align: middle; /* 2 */\r\n}\r\n.github-octo-flat-ui img,\r\n.github-octo-flat-ui video {\r\n  max-width: 100%;\r\n  height: auto;\r\n}\r\n\r\n*,\r\n::before,\r\n::after {\r\n  --tw-border-opacity: 1;\r\n  border-color: rgba(229, 231, 235, var(--tw-border-opacity));\r\n}\r\n\r\nbody,\r\nhtml,\r\n#root {\r\n  height: 100%;\r\n}\r\n\r\n@-webkit-keyframes yScaleIn {\r\n  0% {\r\n    transform: scaleY(0);\r\n  }\r\n  100% {\r\n    transform: scaleY(1);\r\n  }\r\n}\r\n\r\n@keyframes yScaleIn {\r\n  0% {\r\n    transform: scaleY(0);\r\n  }\r\n  100% {\r\n    transform: scaleY(1);\r\n  }\r\n}\r\n\r\n.y-scale-in {\r\n  -webkit-animation: yScaleIn 0.4s ease-out;\r\n          animation: yScaleIn 0.4s ease-out;\r\n}\r\n\r\n@-webkit-keyframes fadeUpIn {\r\n  0% {\r\n    opacity: 0;\r\n    transform: translateY(3em);\r\n  }\r\n  100% {\r\n    opacity: 1;\r\n    transform: translateY(0);\r\n  }\r\n}\r\n\r\n@keyframes fadeUpIn {\r\n  0% {\r\n    opacity: 0;\r\n    transform: translateY(3em);\r\n  }\r\n  100% {\r\n    opacity: 1;\r\n    transform: translateY(0);\r\n  }\r\n}\r\n\r\n.fade-up-in {\r\n  -webkit-animation: fadeUpIn 0.4s ease-out;\r\n          animation: fadeUpIn 0.4s ease-out;\r\n}\r\n@-webkit-keyframes fadeUpSmIn {\r\n  0% {\r\n    opacity: 0;\r\n    transform: translateY(0.6em);\r\n  }\r\n  100% {\r\n    opacity: 1;\r\n    transform: translateY(0);\r\n  }\r\n}\r\n@keyframes fadeUpSmIn {\r\n  0% {\r\n    opacity: 0;\r\n    transform: translateY(0.6em);\r\n  }\r\n  100% {\r\n    opacity: 1;\r\n    transform: translateY(0);\r\n  }\r\n}\r\n\r\n.fade-up-sm-in {\r\n  -webkit-animation: fadeUpSmIn 0.4s ease-out;\r\n          animation: fadeUpSmIn 0.4s ease-out;\r\n}\r\n\r\n.html-histogram__thumb {\r\n  opacity: 0;\r\n  transition: opacity 0.3s ease-out;\r\n}\r\n.html-histogram:focus-within .html-histogram__thumb,\r\n.html-histogram:hover .html-histogram__thumb {\r\n  opacity: 1;\r\n}\r\n.html-histogram:not(:hover):not(:focus-within) .html-histogram__range--base {\r\n  transform: scaleY(\r\n    0.3\r\n  ) !important; /* please forgive me! react-range made me do it */\r\n  transition: all 0.3s ease-out;\r\n}\r\n.html-histogram__numbers {\r\n  transition: transform 0.3s ease-out;\r\n  transform: translateY(-0.8em);\r\n}\r\n.html-histogram:focus-within .html-histogram__numbers,\r\n.html-histogram:hover .html-histogram__numbers {\r\n  transform: none;\r\n}\r\n\r\n.cell a {\r\n  /* @apply text-indigo-500; */\r\n  text-decoration: underline;\r\n}\r\n\r\n.cell:hover {\r\n  /* to get around an inline style */\r\n  z-index: 50 !important;\r\n}\r\n\r\n.cell:hover .cell__long-value {\r\n  pointer-events: all;\r\n  opacity: 1;\r\n}\r\n.cell:hover .delete-button {\r\n  opacity: 1;\r\n}\r\n\r\n.header__title {\r\n  right: 0;\r\n  min-width: 100%;\r\n  z-index: 50;\r\n}\r\n\r\n.header:not(:hover) .header__title {\r\n  box-shadow: none;\r\n}\r\n.header:hover .header__title {\r\n  right: auto;\r\n}\r\n.header__pin {\r\n  opacity: 0;\r\n}\r\n\r\n.header:hover .header__icon {\r\n  opacity: 1;\r\n}\r\n.header:hover .header__delete {\r\n  opacity: 1;\r\n  width: auto;\r\n  padding-left: 0.25em;\r\n  padding-right: 0.5em;\r\n}\r\n\r\n.sticky-grid__header:hover {\r\n  z-index: 250 !important;\r\n}\r\n.sticky-grid__header:focus-within {\r\n  z-index: 240 !important;\r\n}\r\n\r\n@media (max-width: 700px) {\r\n  .pin {\r\n    display: none;\r\n  }\r\n}\r\n";
styleInject(css_248z);

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
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

function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);

  if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
    if (it) o = it;
    var i = 0;
    return function () {
      if (i >= o.length) return {
        done: true
      };
      return {
        done: false,
        value: o[i++]
      };
    };
  }

  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

// @ts-ignore
var formatDate = /*#__PURE__*/d3.timeFormat('%B %-d, %Y');
function DateCell(props) {
  return react.jsx("span", {
    css: {
      "textOverflow": "ellipsis",
      "display": "block",
      "whiteSpace": "nowrap",
      "overflow": "hidden"
    },
    "data-tw": "overflow-ellipsis block whitespace-nowrap overflow-hidden",
    title: props.rawValue
  }, props.value ? formatDate(props.value) : '');
}

// @ts-ignore
var formatTime = /*#__PURE__*/d3.timeFormat('%B %-d, %Y %-H:%M');
function TimeCell(props) {
  return react.jsx("span", {
    css: {
      "textOverflow": "ellipsis",
      "display": "block",
      "whiteSpace": "nowrap",
      "overflow": "hidden"
    },
    "data-tw": "overflow-ellipsis block whitespace-nowrap overflow-hidden",
    title: props.rawValue
  }, props.value ? formatTime(props.value) : '');
}

function NumberCell(props) {
  return react.jsx("div", {
    css: {
      "overflow": "hidden",
      "textOverflow": "ellipsis",
      "whiteSpace": "nowrap",
      "textAlign": "right",
      "fontFamily": "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace",
      "fontSize": "0.875rem",
      "lineHeight": "1.25rem",
      "display": "block",
      "width": "100%"
    },
    "data-tw": "truncate text-right font-mono text-sm block w-full",
    title: props.rawValue
  }, Number.isFinite(props.value) ? props.value.toLocaleString() : !props.rawValue ? "" : '—');
}

function RawNumberCell(props) {
  return react.jsx("span", {
    css: {
      "textAlign": "right",
      "fontFamily": "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace",
      "fontSize": "0.875rem",
      "lineHeight": "1.25rem",
      "display": "block",
      "width": "100%"
    },
    "data-tw": "text-right font-mono text-sm block w-full",
    title: props.rawValue
  }, Number.isFinite(props.value) ? props.value : '—');
}

function StringCell(props) {
  return react.jsx("div", {
    css: {
      "overflow": "hidden",
      "textOverflow": "ellipsis",
      "whiteSpace": "nowrap"
    },
    "data-tw": "truncate",
    title: props.rawValue,
    dangerouslySetInnerHTML: {
      __html: DOMPurify.sanitize(props.formattedValue)
    }
  });
}

function ColorCell(props) {
  return react.jsx(React.Fragment, null, react.jsx("div", {
    css: {
      "position": "absolute",
      "top": "0px",
      "bottom": "0px",
      "left": "0px",
      "width": "0.9em"
    },
    "data-tw": "absolute top-0 bottom-0 left-0 w-[0.9em]",
    style: {
      background: props.value
    }
  }), react.jsx("div", {
    css: {
      "overflow": "hidden",
      "textOverflow": "ellipsis",
      "whiteSpace": "nowrap"
    },
    "data-tw": "truncate",
    title: props.rawValue,
    dangerouslySetInnerHTML: {
      __html: DOMPurify.sanitize(props.formattedValue)
    }
  }));
}

function CategoryCell(props) {
  return react.jsx("span", {
    css: [{
      "textOverflow": "ellipsis",
      "display": "block",
      "whiteSpace": "nowrap",
      "overflow": "hidden",
      "borderRadius": "9999px",
      "paddingLeft": "0.5rem",
      "paddingRight": "0.5rem",
      "paddingTop": "0.25rem",
      "paddingBottom": "0.25rem",
      "marginLeft": "-0.5rem",
      "marginRight": "-0.5rem"
    }, props.categoryColor],
    title: props.value,
    "data-tw": "overflow-ellipsis block whitespace-nowrap overflow-hidden rounded-full px-2 py-1 -ml-2 -mr-2"
  }, props.value);
}

var formatNumber = /*#__PURE__*/d3.format(',');
function StringFilter(props) {
  var _React$useState = React__default.useState(props.value || ''),
      localValue = _React$useState[0],
      setLocalValue = _React$useState[1];

  var currentValue = React__default.useRef('');
  var updateValue = React__default.useCallback(debounce(function () {
    props.onChange(currentValue.current);
  }, 400), []);
  React__default.useEffect(function () {
    updateValue();
    currentValue.current = localValue;
  }, [localValue]);
  React__default.useEffect(function () {
    setLocalValue(props.value || '');
  }, [props.value]);
  return react.jsx("input", {
    css: {
      "paddingLeft": "0.75rem",
      "paddingRight": "0.75rem",
      "paddingTop": "0.75rem",
      "paddingBottom": "0.75rem",
      "--tw-text-opacity": "1",
      "color": "rgba(99, 102, 241, var(--tw-text-opacity))",
      "::placeholder": {
        "--tw-placeholder-opacity": "1",
        "color": "rgba(156, 163, 175, var(--tw-placeholder-opacity))"
      },
      "--tw-bg-opacity": "1",
      "backgroundColor": "rgba(255, 255, 255, var(--tw-bg-opacity))",
      "outline": "2px solid transparent",
      "outlineOffset": "2px",
      ":focus": {
        "outline": "2px solid transparent",
        "outlineOffset": "2px"
      },
      "width": "100%",
      "textOverflow": "ellipsis"
    },
    "data-tw": "px-3 py-3 text-indigo-500 placeholder-gray-400 bg-white outline-none focus:outline-none w-full overflow-ellipsis",
    onChange: function onChange(e) {
      return setLocalValue(e.target.value);
    },
    value: localValue || '',
    placeholder: "Filter " + formatNumber(props.filteredData.length) + " records"
  });
}

var formatNumber$1 = /*#__PURE__*/d3.format(',');
function CategoryFilter(props) {
  // const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   props.onChange(e.target.value);
  // };
  return react.jsx(Downshift, {
    onChange: props.onChange,
    value: (props == null ? void 0 : props.value) || ''
  }, function (_ref) {
    var getInputProps = _ref.getInputProps,
        getItemProps = _ref.getItemProps,
        getMenuProps = _ref.getMenuProps,
        clearSelection = _ref.clearSelection,
        isOpen = _ref.isOpen,
        openMenu = _ref.openMenu,
        inputValue = _ref.inputValue,
        highlightedIndex = _ref.highlightedIndex,
        getRootProps = _ref.getRootProps;
    return react.jsx("div", {
      css: {
        "width": "100%",
        "height": "100%",
        "margin": "-0.5rem",
        "marginTop": "-0.5rem"
      },
      "data-tw": "w-full h-full -m-2 -mt-2",
      style: {
        height: "calc(100% + 1rem)"
      }
    }, react.jsx("div", _extends({
      css: {
        "height": "100%",
        "width": "100%"
      },
      "data-tw": "h-full w-full"
    }, getRootProps({}, {
      suppressRefError: true
    })), react.jsx("input", _extends({
      css: [props != null && props.value ? {
        "--tw-text-opacity": "1",
        "color": "rgba(99, 102, 241, var(--tw-text-opacity))"
      } : {
        "--tw-text-opacity": "1",
        "color": "rgba(156, 163, 175, var(--tw-text-opacity))"
      }, {
        "height": "100%",
        "width": "100%",
        "paddingLeft": "0.75rem",
        "paddingRight": "0.75rem",
        "paddingTop": "0.75rem",
        "paddingBottom": "0.75rem",
        "::placeholder": {
          "--tw-placeholder-opacity": "1",
          "color": "rgba(156, 163, 175, var(--tw-placeholder-opacity))"
        },
        "borderStyle": "none",
        "--tw-bg-opacity": "1",
        "backgroundColor": "rgba(255, 255, 255, var(--tw-bg-opacity))",
        "outline": "2px solid transparent",
        "outlineOffset": "2px",
        ":focus": {
          "outline": "2px solid transparent",
          "outlineOffset": "2px"
        },
        "textOverflow": "ellipsis"
      }],
      placeholder: "Filter " + formatNumber$1(props.filteredData.length) + " records"
    }, getInputProps({
      onEmptied: function onEmptied() {
        props.onChange('');
      },
      onClick: function onClick() {
        if (!isOpen) {
          openMenu();
        }
      },
      onFocus: function onFocus() {
        if (!isOpen) {
          openMenu();
        }
      },
      onChange: function onChange(e) {
        var value = e.target.value;

        if (!value) {
          clearSelection();
        }
      }
    }), {
      "data-tw": "text-indigo-500 | text-gray-400 | h-full w-full px-3 py-3 placeholder-gray-400 border-none bg-white outline-none focus:outline-none w-full overflow-ellipsis"
    }))), isOpen && react.jsx("ul", _extends({}, getMenuProps(), {
      css: {
        "position": "absolute",
        "minWidth": "100%",
        "> :not([hidden]) ~ :not([hidden])": {
          "--tw-space-y-reverse": 0,
          "marginTop": "calc(0.25rem * calc(1 - var(--tw-space-y-reverse)))",
          "marginBottom": "calc(0.25rem * var(--tw-space-y-reverse))"
        },
        "paddingTop": "0.5rem",
        "paddingBottom": "0.5rem",
        "--tw-bg-opacity": "1",
        "backgroundColor": "rgba(255, 255, 255, var(--tw-bg-opacity))",
        "--tw-shadow": "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        "boxShadow": "var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)",
        "zIndex": "10"
      },
      "data-tw": "absolute min-w-full space-y-1 py-2 bg-white shadow-md z-10",
      className: "fade-up-sm-in",
      style: {
        marginTop: 1
      }
    }), (props.possibleValues || []).map(function (_ref2, index) {
      var value = _ref2.value,
          count = _ref2.count,
          color = _ref2.color;
      var isFilteredOut = inputValue && !matchSorter.matchSorter([value], inputValue).length;
      if (isFilteredOut) return null;
      console.log({
        color: color
      });
      return react.jsx("li", _extends({
        css: [color, {
          "padding": "0.5rem",
          "display": "inline-block",
          "borderRadius": "9999px",
          "paddingLeft": "1rem",
          "paddingRight": "1rem",
          "paddingTop": "0.25rem",
          "paddingBottom": "0.25rem",
          "marginLeft": "0.5rem",
          "marginRight": "0.5rem",
          "borderWidth": "2px",
          "whiteSpace": "nowrap",
          "cursor": "pointer"
        }, highlightedIndex === index ? {
          "--tw-border-opacity": "1",
          "borderColor": "rgba(99, 102, 241, var(--tw-border-opacity))"
        } : {
          "--tw-border-opacity": "1",
          "borderColor": "rgba(255, 255, 255, var(--tw-border-opacity))"
        }]
      }, getItemProps({
        key: value,
        index: index,
        item: value
      }), {
        "data-tw": "p-2 inline-block rounded-full px-4 py-1 mx-2 border-2 whitespace-nowrap cursor-pointer | border-indigo-500 | border-white"
      }), react.jsx("span", {
        css: {
          "textOverflow": "ellipsis",
          "maxWidth": "80rem"
        },
        "data-tw": "overflow-ellipsis max-w-7xl"
      }, value, " (", count.toLocaleString(), ")"));
    })));
  });
}

function HtmlHistogram(props) {
  var filtered = props.filtered,
      original = props.original,
      value = props.value,
      focusedValue = props.focusedValue,
      shortFormat = props.shortFormat,
      longFormat = props.longFormat,
      maxWidth = props.maxWidth,
      onChange = props.onChange;
  var height = 30;

  var _useMemo = React.useMemo(function () {
    var maxBins = maxWidth ? Math.max(0, Math.floor(maxWidth / 6) * 0.55) : 11;
    var bins = d3.bin().thresholds(maxBins)(original);

    if (original.length < 200) {
      var uniqueValues = Array.from(new Set(original)).sort(d3.ascending);
      var numberOfUniqueValues = uniqueValues.length;

      if (numberOfUniqueValues > 1 && numberOfUniqueValues < 12) {
        var firstValueSpacing = uniqueValues[1] - uniqueValues[0];
        var areValuesEquallySpaced = uniqueValues.find(function (value, index) {
          return index && value - uniqueValues[index - 1] !== firstValueSpacing;
        }) === undefined;

        if (areValuesEquallySpaced) {
          bins = d3.bin().thresholds(uniqueValues)(original);
        } else {
          if (bins.length > numberOfUniqueValues) {
            bins = d3.bin().thresholds(numberOfUniqueValues)(original);
          }
        }
      }
    }

    return {
      bins: bins
    };
  }, [original, maxWidth, value]),
      bins = _useMemo.bins;

  var filteredBins = bins.map(function (bin, binIndex) {
    var isLastIndex = binIndex === bins.length - 1;
    var newBin = filtered.filter(function (d) {
      return d >= bin.x0 && (d < bin.x1 || isLastIndex);
    });
    return newBin;
  });

  var _useMemo2 = React.useMemo(function () {
    return {
      xScale: d3.scaleLinear().domain([d3.min(bins, function (d) {
        return d.x0;
      }), d3.max(original)]).range([0, 100]),
      yScale: d3.scaleLinear().domain([0, d3.max(bins, function (d) {
        return d.length;
      })]).range([0, 100])
    };
  }, [bins, original]),
      xScale = _useMemo2.xScale,
      yScale = _useMemo2.yScale;

  var rangeValues = React.useMemo(function () {
    return value ? [xScale(value[0]), xScale(value[1])] : [0, 100];
  }, [xScale, value]);
  var focusedBinIndex = focusedValue && bins.findIndex(function (d, i) {
    if (d.x0 <= focusedValue && d.x1 > focusedValue) {
      return true;
    }

    if (i === bins.length - 1 && d.x1 === focusedValue) {
      return true;
    }

    return false;
  });
  var valueExtent = d3.extent(original);
  var isOneValue = valueExtent[0] === valueExtent[1]; // const focusedBin = bins[focusedBinIndex];

  var barWidth = 4;
  var barSpacing = 2;
  var totalBarWidth = barWidth + barSpacing;
  var totalWidth = filteredBins.length * totalBarWidth;
  var stepSize = bins.length > 1 ? xScale(bins[1].x1) - xScale(bins[0].x1) || 50 : 100;
  if (stepSize < 1) stepSize = 1;
  var isFiltered = rangeValues[0] !== 0 || rangeValues[1] !== 100;

  if (isOneValue) {
    return react.jsx("div", {
      css: {
        "paddingLeft": "0.5rem",
        "paddingRight": "0.5rem",
        "--tw-ordinal": "var(--tw-empty,/*!*/ /*!*/)",
        "--tw-slashed-zero": "var(--tw-empty,/*!*/ /*!*/)",
        "--tw-numeric-figure": "var(--tw-empty,/*!*/ /*!*/)",
        "--tw-numeric-spacing": "tabular-nums",
        "--tw-numeric-fraction": "var(--tw-empty,/*!*/ /*!*/)",
        "fontVariantNumeric": "var(--tw-ordinal) var(--tw-slashed-zero) var(--tw-numeric-figure) var(--tw-numeric-spacing) var(--tw-numeric-fraction)",
        "fontWeight": "500",
        "--tw-text-opacity": "1",
        "color": "rgba(156, 163, 175, var(--tw-text-opacity))"
      },
      "data-tw": "px-2 tabular-nums font-medium text-gray-400"
    }, longFormat(xScale.invert(rangeValues[0])));
  }

  return react.jsx("div", {
    className: "html-histogram",
    css: {
      "flexDirection": "column",
      "alignItems": "center",
      "justifyContent": "center",
      "marginTop": "0.25rem",
      "alignSelf": "center"
    },
    "data-tw": "flex-col items-center justify-center mt-1 self-center",
    style: {
      width: 'fit-content'
    }
  }, bins.length > 1 && react.jsx(React__default.Fragment, null, react.jsx("div", {
    css: {
      "display": "flex",
      "alignItems": "flex-end",
      "position": "relative"
    },
    "data-tw": "flex items-end relative",
    style: {
      height: height,
      width: 'fit-content'
    }
  }, bins.map(function (bin, i) {
    var height = yScale(bin.length);
    var filteredHeight = yScale(filteredBins[i].length);
    return react.jsx(Bin, {
      key: i,
      height: height,
      filteredHeight: filteredHeight,
      barWidth: barWidth,
      barSpacing: barSpacing,
      isFocused: focusedBinIndex == i
    });
  })), react.jsx(BarRange, {
    totalWidth: totalWidth,
    stepSize: stepSize,
    onChange: onChange,
    xScale: xScale,
    rangeValues: rangeValues,
    isFiltered: isFiltered
  })), react.jsx(Axis, {
    totalWidth: totalWidth,
    rangeValues: rangeValues,
    min: shortFormat(xScale.invert(rangeValues[0])),
    max: shortFormat(xScale.invert(rangeValues[1])),
    isFiltered: isFiltered
  }));
}
var Bin = /*#__PURE__*/React.memo(function (_ref) {
  var height = _ref.height,
      filteredHeight = _ref.filteredHeight,
      barWidth = _ref.barWidth,
      barSpacing = _ref.barSpacing,
      isFocused = _ref.isFocused;
  return react.jsx("div", {
    css: {
      "height": "100%",
      "flexShrink": "0",
      "position": "relative"
    },
    "data-tw": "h-full flex-shrink-0 relative",
    style: {
      width: barWidth,
      marginRight: barSpacing
    }
  }, isFocused && react.jsx("div", {
    css: {
      "transitionProperty": "background-color, border-color, color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter",
      "transitionTimingFunction": "cubic-bezier(0.4, 0, 0.2, 1)",
      "transitionDuration": "150ms",
      "position": "absolute",
      "top": "0px",
      "right": "0px",
      "bottom": "0px",
      "left": "0px",
      "--tw-bg-opacity": "1",
      "backgroundColor": "rgba(224, 231, 255, var(--tw-bg-opacity))"
    },
    "data-tw": "absolute inset-0 bg-indigo-100 transition",
    style: {
      top: -3,
      left: -1,
      right: -1
    }
  }), react.jsx("div", {
    css: {
      "position": "absolute",
      "bottom": "0px",
      "left": "0px",
      "right": "0px",
      "--tw-bg-opacity": "1",
      "backgroundColor": "rgba(229, 231, 235, var(--tw-bg-opacity))"
    },
    "data-tw": "absolute bottom-0 left-0 right-0 bg-gray-200",
    style: {
      height: height + "%"
    }
  }), react.jsx("div", {
    className: "y-scale-in",
    css: {
      "position": "absolute",
      "bottom": "0px",
      "left": "0px",
      "right": "0px",
      "--tw-bg-opacity": "1",
      "backgroundColor": "rgba(99, 102, 241, var(--tw-bg-opacity))",
      "transitionProperty": "all",
      "transitionTimingFunction": "cubic-bezier(0, 0, 0.2, 1)",
      "transitionDuration": "150ms",
      "transformOrigin": "bottom"
    },
    "data-tw": "absolute bottom-0 left-0 right-0 bg-indigo-500 transition-all ease-out origin-bottom",
    style: {
      height: filteredHeight + "%"
    }
  }));
});
var BarRange = /*#__PURE__*/React.memo(function (_ref2) {
  var totalWidth = _ref2.totalWidth,
      stepSize = _ref2.stepSize,
      _onChange = _ref2.onChange,
      xScale = _ref2.xScale,
      rangeValues = _ref2.rangeValues,
      isFiltered = _ref2.isFiltered;
  return react.jsx("div", {
    css: {
      "marginTop": "0.25rem",
      "marginBottom": "0.75rem"
    },
    "data-tw": "mt-1 mb-3",
    style: {
      width: totalWidth
    }
  }, react.jsx(reactRange.Range, {
    min: 0,
    max: 100,
    step: stepSize,
    values: rangeValues,
    draggableTrack: true,
    onChange: function onChange(newRange) {
      if (newRange[0] === 0 && newRange[1] === 100) {
        _onChange(undefined);

        return;
      }

      var x0 = xScale.invert(newRange[0]);
      var x1 = xScale.invert(newRange[1]);

      _onChange([x0, x1]);
    },
    renderTrack: function renderTrack(_ref3) {
      var props = _ref3.props,
          children = _ref3.children;
      return react.jsx("div", _extends({}, props, {
        css: {
          "display": "flex",
          "borderRadius": "0.125rem"
        },
        "data-tw": "flex rounded-sm",
        className: "html-histogram__range--" + (isFiltered ? 'filtered' : 'base'),
        style: _extends({}, props.style, {
          height: 3,
          background: reactRange.getTrackBackground({
            min: 0,
            max: 100,
            values: rangeValues,
            // colors: ["pink", "transparent", "pink"],
            colors: isFiltered ? ['#E5E7EB', '#6366F1', '#E5E7EB'] : ['#E5E7EB', '#A5B4FBff', '#E5E7EB']
          })
        })
      }), children);
    },
    renderThumb: function renderThumb(_ref4) {
      var props = _ref4.props,
          isDragged = _ref4.isDragged;
      return react.jsx("div", _extends({}, props, {
        className: "html-histogram__thumb",
        css: [{
          "transitionProperty": "background-color, border-color, color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter",
          "transitionTimingFunction": "cubic-bezier(0, 0, 0.2, 1)",
          "transitionDuration": "150ms",
          "borderRadius": "0.125rem",
          "--tw-text-opacity": "1",
          "color": "rgba(129, 140, 248, var(--tw-text-opacity))",
          ":focus": {
            "outline": "2px solid transparent",
            "outlineOffset": "2px",
            "--tw-ring-offset-shadow": "var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)",
            "--tw-ring-shadow": "var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color)",
            "boxShadow": "var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000)"
          },
          "display": "flex",
          "alignItems": "center",
          "justifyContent": "center"
        }, isDragged && {
          "--tw-ring-offset-shadow": "var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)",
          "--tw-ring-shadow": "var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color)",
          "boxShadow": "var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000)"
        }],
        style: _extends({}, props.style, {
          bottom: -12,
          height: 7,
          width: 10
        }),
        "data-tw": "rounded-sm text-indigo-400 focus:outline-none focus:ring transition ease-out flex items-center justify-center | ring"
      }), react.jsx("svg", {
        viewBox: "0 0 1 1",
        css: {
          "height": "100%",
          "width": "100%"
        },
        "data-tw": "h-full w-full",
        preserveAspectRatio: "none"
      }, react.jsx("path", {
        d: "M 0 1 L 0.5 0 L 1 1 Z",
        fill: "currentColor"
      })));
    }
  }));
});
var Axis = /*#__PURE__*/React.memo(function (_ref5) {
  var totalWidth = _ref5.totalWidth,
      rangeValues = _ref5.rangeValues,
      min = _ref5.min,
      max = _ref5.max,
      isFiltered = _ref5.isFiltered;
  return react.jsx("div", {
    css: {
      "display": "flex",
      "justifyContent": "center",
      "--tw-ordinal": "var(--tw-empty,/*!*/ /*!*/)",
      "--tw-slashed-zero": "var(--tw-empty,/*!*/ /*!*/)",
      "--tw-numeric-figure": "var(--tw-empty,/*!*/ /*!*/)",
      "--tw-numeric-spacing": "tabular-nums",
      "--tw-numeric-fraction": "var(--tw-empty,/*!*/ /*!*/)",
      "fontVariantNumeric": "var(--tw-ordinal) var(--tw-slashed-zero) var(--tw-numeric-figure) var(--tw-numeric-spacing) var(--tw-numeric-fraction)",
      "fontSize": "0.75rem",
      "lineHeight": "1rem",
      "--tw-text-opacity": "1",
      "color": "rgba(156, 163, 175, var(--tw-text-opacity))",
      "whiteSpace": "nowrap"
    },
    "data-tw": "flex justify-center tabular-nums text-xs text-gray-400 whitespace-nowrap",
    className: "html-histogram__numbers html-histogram__numbers--" + (isFiltered ? 'filtered' : 'base'),
    style: {
      margin: '0 -5px -9px',
      width: totalWidth + 10
    }
  }, react.jsx("div", {
    css: [{
      "display": "flex",
      "justifyContent": "flex-start",
      "paddingRight": "0.5rem",
      "flex": "1 1 0%"
    }, rangeValues[0] != 0 && {
      "--tw-text-opacity": "1",
      "color": "rgba(99, 102, 241, var(--tw-text-opacity))"
    }],
    "data-tw": "flex justify-start pr-2 flex-1 | text-indigo-500"
  }, min), react.jsx("div", {
    css: [{
      "display": "flex",
      "justifyContent": "flex-end",
      "paddingLeft": "0.5rem",
      "flex": "1 1 0%"
    }, rangeValues[1] != 100 && {
      "--tw-text-opacity": "1",
      "color": "rgba(99, 102, 241, var(--tw-text-opacity))"
    }],
    "data-tw": "flex justify-end pl-2 flex-1 | text-indigo-500"
  }, max));
});

function RangeFilter(props) {
  var id = props.id,
      value = props.value,
      filteredData = props.filteredData,
      originalData = props.originalData,
      focusedValue = props.focusedValue,
      shortFormat = props.shortFormat,
      maxWidth = props.maxWidth,
      longFormat = props.longFormat,
      onChange = props.onChange;

  var _React$useState = React__default.useState(value),
      localValue = _React$useState[0],
      setLocalValue = _React$useState[1];

  var currentValue = React__default.useRef();
  var updateValue = React__default.useCallback(debounce(function () {
    onChange(currentValue.current);
  }, 400), []);
  React__default.useEffect(function () {
    updateValue();
    currentValue.current = localValue;
  }, [localValue]);
  React__default.useEffect(function () {
    setLocalValue(value);
  }, [props.value]);
  var filteredHistogramData = filteredData.map(function (row) {
    return row[id];
  }).filter(function (d) {
    return Number.isFinite(d) || d instanceof Date;
  });
  var originalHistogramData = React.useMemo(function () {
    return originalData.map(function (row) {
      return row[id];
    }).filter(function (d) {
      return Number.isFinite(d) || d instanceof Date;
    });
  }, [originalData, id]);
  return react.jsx(HtmlHistogram, {
    id: id,
    onChange: setLocalValue,
    value: localValue,
    original: originalHistogramData,
    filtered: filteredHistogramData,
    focusedValue: focusedValue,
    maxWidth: maxWidth,
    shortFormat: shortFormat,
    longFormat: longFormat
  });
}

var immer = function immer(config) {
  return function (set, get, api) {
    return config(function (partial, replace) {
      var nextState = typeof partial === 'function' ? produce(partial) : partial;
      return set(nextState, replace);
    }, get, api);
  };
};

var originalRowIndexColumnName = '__originalIndex__';
var createGridStore = function createGridStore() {
  return create(immer(function (set) {
    return {
      data: [],
      rawData: [],
      schema: undefined,
      cellTypes: {},
      metadata: {},
      stickyColumnName: undefined,
      columnNames: [],
      categoryValues: {},
      handleStickyColumnNameChange: function handleStickyColumnNameChange(columnName) {
        return set(function (draft) {
          if (!draft.columnNames.includes(columnName)) return;
          draft.stickyColumnName = columnName;
        });
      },
      handleDataChange: function handleDataChange(data) {
        return set(function (draft) {
          draft.rawData = data.map(function (d, i) {
            var _extends2;

            return _extends({}, d, (_extends2 = {}, _extends2[originalRowIndexColumnName] = i, _extends2));
          }); // @ts-ignore

          draft.schema = generateSchema(data); // @ts-ignore

          var propertyMap = draft.schema;
          var accessorsWithTypeInformation = Object.keys(propertyMap);
          draft.cellTypes = accessorsWithTypeInformation.reduce(function (acc, accessor) {
            // @ts-ignore
            var cellType = propertyMap[accessor]; // @ts-ignore

            if (!cellTypeMap[cellType]) cellType = 'string'; // @ts-ignore

            acc[accessor] = cellType;
            return acc;
          }, {});
          draft.data = parseData(draft.rawData, draft.cellTypes);
          var columnNames = data.length ? Object.keys(data[0]).filter(function (d) {
            return !utilKeys.includes(d);
          }) : [];

          if (!draft.stickyColumnName || !columnNames.includes(draft.stickyColumnName)) {
            draft.stickyColumnName = columnNames[0];
          }

          if (!draft.sort.length) {
            var _cellTypeMap$draft$ce;

            draft.sort = draft.stickyColumnName ? [draft.stickyColumnName, // @ts-ignore
            ((_cellTypeMap$draft$ce = cellTypeMap[draft.cellTypes[draft.stickyColumnName]]) == null ? void 0 : _cellTypeMap$draft$ce.sortValueType) === 'string' ? 'asc' : 'desc'] : [];
          }
        });
      },
      handleMetadataChange: function handleMetadataChange(metadata) {
        return set(function (draft) {
          draft.metadata = metadata;
        });
      },
      diffs: [],
      uniqueColumnName: undefined,
      handleDiffDataChange: function handleDiffDataChange(diffData) {
        return set(function (draft) {
          if (!diffData.length) return;
          var data = draft.data;
          draft.uniqueColumnName = undefined; // get string column with most unique values

          var columnNames = data.length ? Object.keys(data[0]).filter(function (d) {
            return !utilKeys.includes(d);
          }) : [];
          var columnNameUniques = columnNames.filter(function (columnName) {
            var _cellTypeMap$cellType;

            var cellType = draft.cellTypes[columnName]; // @ts-ignore

            var type = (_cellTypeMap$cellType = cellTypeMap[cellType]) == null ? void 0 : _cellTypeMap$cellType.sortValueType;
            var isString = type === 'string';
            if (columnName.toLowerCase() === 'id' && (isString || type === 'number')) return true;
            return isString;
          }).map(function (columnName) {
            var values = new Set(data.map(function (d) {
              return d[columnName];
            }));
            return [columnName, values.size];
          });
          var sortedColumnsByUniqueness = columnNameUniques.sort(function (a, b) {
            return d3.descending(a[1], b[1]);
          });
          if (!sortedColumnsByUniqueness.length || // there must be as many unique values as rows
          sortedColumnsByUniqueness[0][1] !== data.length) return;
          var mostUniqueId = sortedColumnsByUniqueness[0][0];
          var idColumnName = mostUniqueId; // @ts-ignore

          draft.uniqueColumnName = mostUniqueId;
          var diffDataMap = new Map(parseData(diffData, draft.cellTypes).map(function (d) {
            return [// @ts-ignore
            d[idColumnName], d];
          }));
          var newDataMap = new Map(data.map(function (i) {
            return [i[idColumnName] + '', i];
          }));
          var newData = data.map(function (d) {
            var id = d[idColumnName];
            var isNew = !diffDataMap.get(id);
            if (isNew) return _extends({}, d, {
              __status__: 'new'
            });
            var modifiedFields = columnNames.filter(function (columnName) {
              var _d$columnName, _newD$columnName;

              var type = draft.cellTypes[columnName];
              var oldValue = type === 'date' ? (_d$columnName = d[columnName]) == null ? void 0 : _d$columnName.toString == null ? void 0 : _d$columnName.toString() : d[columnName];
              var newD = diffDataMap.get(id);
              var newValue = type === 'date' ? // @ts-ignore
              (_newD$columnName = newD[columnName]) == null ? void 0 : _newD$columnName.toString == null ? void 0 : _newD$columnName.toString() : // @ts-ignore
              newD[columnName];
              return type === 'object' ? !isEqual(oldValue, newValue) : oldValue !== newValue;
            });

            if (modifiedFields.length) {
              return _extends({}, d, {
                __status__: 'modified',
                __modifiedColumnNames__: modifiedFields
              });
            }

            return d;
          });
          var oldData = parseData(diffData.filter(function (d) {
            return !newDataMap.get(d[idColumnName + '']) && d[idColumnName || ''];
          }).map(function (d) {
            return _extends({}, d, {
              __status__: 'old'
            });
          }), draft.cellTypes);
          draft.data = [].concat(newData, oldData); // draft.diffs = getDiffs(draft.data);
        });
      },
      focusedRowIndex: undefined,
      handleFocusedRowIndexChange: function handleFocusedRowIndexChange(rowIndex) {
        return set(function (draft) {
          draft.focusedRowIndex = rowIndex;
        });
      },
      filteredData: [],
      filters: {},
      handleFilterChange: function handleFilterChange(column, value) {
        return set(function (draft) {
          if (!value) {
            delete draft.filters[column];
          } else {
            draft.filters[column] = value;
          }
        });
      },
      handleFiltersChange: function handleFiltersChange(newFilters) {
        return set(function (draft) {
          draft.filters = newFilters || {};
        });
      },
      sort: [],
      handleSortChange: function handleSortChange(columnName, direction) {
        return set(function (draft) {
          if (columnName) {
            draft.sort = [columnName, direction];
          } else {
            draft.sort = [];
          }
        });
      },
      updateFilteredColumns: function updateFilteredColumns() {
        return set(function (draft) {
          var _cellTypeMap$draft$ce2;

          var sortFunction = getSortFunction(draft.sort, // @ts-ignore
          (_cellTypeMap$draft$ce2 = cellTypeMap[draft == null ? void 0 : draft.cellTypes[draft.sort[0]]]) == null ? void 0 : _cellTypeMap$draft$ce2.sortValueType);
          var filteredData = [].concat(filterData(draft.data, draft.filters, draft.cellTypes));
          filteredData = filteredData.sort(sortFunction);
          draft.filteredData = filteredData;
          draft.diffs = getDiffs(draft.filteredData);
          var categoryColumnNames = Object.keys(draft.schema || {}).filter( // @ts-ignore
          function (columnName) {
            return draft.schema[columnName] === 'category';
          });
          draft.categoryValues = fromPairs(categoryColumnNames.map(function (columnName) {
            var values = new Set(draft.data.map(function (d) {
              return d[columnName];
            }));
            return [columnName, Array.from(values).filter(function (d) {
              var _ref;

              return (_ref = d || '') == null ? void 0 : _ref.trim().length;
            }).map(function (value, index) {
              return {
                value: value,
                count: draft.filteredData.filter(function (d) {
                  return d[columnName] === value;
                }).length,
                color: categoryColors[index % categoryColors.length]
              };
            })];
          }));
        });
      },
      columnWidths: [],
      updateColumnWidths: function updateColumnWidths() {
        return set(function (draft) {
          var columnWidths = draft.columnNames.map(function (columnName, columnIndex) {
            // @ts-ignore
            var cellType = draft.cellTypes[columnName]; // @ts-ignore

            var cellInfo = cellTypeMap[cellType];
            if (!cellInfo) return 150;
            var values = draft.data.map(function (d) {
              return cellInfo.format(d[columnName] || '').length;
            });
            var maxLength = d3.max([columnName.length * 0.6].concat(values));
            var numberOfChars = d3.min([maxLength + 3, 19]);
            return Math.max(cellInfo.minWidth || 100, numberOfChars * 15) + (columnIndex === 0 ? 30 : 0) + (cellInfo.extraCellHorizontalPadding || 0);
          });
          draft.columnWidths = columnWidths;
        });
      },
      updateColumnNames: function updateColumnNames() {
        return set(function (draft) {
          if (!draft.data.length) {
            draft.columnNames = [];
            draft.stickyColumnName = undefined;
            return;
          }

          var rawColumnNames = Object.keys(draft.data[0]).filter(function (d) {
            return !utilKeys.includes(d);
          });

          if (!draft.stickyColumnName || !rawColumnNames.includes(draft.stickyColumnName || '')) {
            draft.columnNames = rawColumnNames;
          } else {
            draft.columnNames = [draft.stickyColumnName || ''].concat(rawColumnNames.filter(function (d) {
              return d !== draft.stickyColumnName;
            }));
          }
        });
      },
      isEditable: false,
      handleIsEditableChange: function handleIsEditableChange(isEditable) {
        return set(function (draft) {
          draft.isEditable = isEditable;
        });
      },
      updatedData: null,
      onCellChange: function onCellChange(rowIndex, columnName, value) {
        set(function (draft) {
          var filteredRow = draft.filteredData[rowIndex] || {};
          var rowIndexInFullDataset = filteredRow[originalRowIndexColumnName];
          var newData = [].concat(draft.rawData);

          if (!draft.rawData[rowIndexInFullDataset] && rowIndex === draft.filteredData.length) {
            var _extends3;

            rowIndexInFullDataset = newData.length;
            newData.push(_extends((_extends3 = {}, _extends3[originalRowIndexColumnName] = rowIndexInFullDataset, _extends3), draft.columnNames.reduce(function (acc, columnName) {
              var _extends4;

              return _extends({}, acc, (_extends4 = {}, _extends4[columnName] = '', _extends4));
            }, {})));
          }

          if (!newData[rowIndexInFullDataset]) return;
          if (newData[rowIndexInFullDataset][columnName] === value) return;
          newData = newData.map(function (d) {
            var originalRowIndex = d[originalRowIndexColumnName];
            delete d[originalRowIndexColumnName];

            if (originalRowIndex === rowIndexInFullDataset) {
              var _extends5;

              return _extends({}, d, (_extends5 = {}, _extends5[columnName] = value, _extends5));
            }

            return d;
          });
          draft.updatedData = newData;
        });
      },
      onRowDelete: function onRowDelete(rowIndex) {
        set(function (draft) {
          var filteredRow = draft.filteredData[rowIndex];
          var rowIndexInFullDataset = filteredRow[originalRowIndexColumnName];
          if (!draft.rawData[rowIndexInFullDataset]) return;
          var newData = [].concat(draft.rawData).map(function (d) {
            delete d[originalRowIndexColumnName];
            return d;
          });
          newData.splice(rowIndexInFullDataset, 1);
          draft.updatedData = newData;
        });
      },
      onHeaderCellChange: function onHeaderCellChange(oldColumnName, newColumnName) {
        set(function (draft) {
          var newData = [].concat(draft.rawData).map(function (row) {
            // keep same order of keys so it matches when the data updates
            return draft.columnNames.reduce(function (acc, columnKey) {
              if (columnKey === oldColumnName) {
                // @ts-ignore
                acc[newColumnName] = row[oldColumnName];
              } else if (columnKey !== originalRowIndexColumnName) {
                // @ts-ignore
                acc[columnKey] = row[columnKey];
              }

              return acc;
            }, {});
          });
          draft.updatedData = newData;
        });
      },
      onHeaderAdd: function onHeaderAdd(columnName) {
        set(function (draft) {
          var newData = [].concat(draft.rawData).map(function (row) {
            var _extends6;

            return _extends({}, row, (_extends6 = {}, _extends6[columnName] = row[columnName] || '', _extends6));
          });
          draft.updatedData = newData;
        });
      },
      onHeaderDelete: function onHeaderDelete(columnName) {
        set(function (draft) {
          var newData = [].concat(draft.rawData).map(function (row) {
            // keep same order of keys so it matches when the data updates
            return draft.columnNames.reduce(function (acc, columnKey) {
              if (columnKey !== columnName) {
                // @ts-ignore
                acc[columnKey] = row[columnKey];
              }

              return acc;
            }, {});
          });
          draft.updatedData = newData;
        });
      },
      focusedCellPosition: null,
      handleFocusedCellPositionChange: function handleFocusedCellPositionChange(position) {
        return set(function (draft) {
          draft.focusedCellPosition = position;
        });
      }
    };
  }));
};
var utilKeys = ['__status__', '__modifiedColumnNames__', '__rowIndex__', '__rawData__', originalRowIndexColumnName];

function filterData(data, filters, cellTypes) {
  return Object.keys(filters).reduce(function (rows, columnName) {
    var filterValue = filters[columnName];

    if (typeof filterValue === 'string') {
      if (cellTypes[columnName] === 'category') {
        return rows.filter(function (row) {
          return row[columnName] === filterValue;
        });
      } else {
        return matchSorter.matchSorter(rows, filterValue, {
          keys: [columnName]
        });
      }
    }

    if (Array.isArray(filterValue)) {
      return rows.filter(function (r) {
        return isBetween(filterValue, r[columnName]);
      });
    }

    return rows;
  }, data);
}

var isBetween = function isBetween(bounds, value) {
  return value >= bounds[0] && value <= bounds[1];
};

var getSortFunction = function getSortFunction(sort, typeOfValue) {
  var columnName = sort[0],
      direction = sort[1];
  return function (a, b) {
    // @ts-ignore
    var aVal = a[columnName];

    if (typeOfValue === 'string') {
      var _ref2;

      aVal = ((_ref2 = aVal || '') == null ? void 0 : _ref2.toUpperCase == null ? void 0 : _ref2.toUpperCase()) || '';
      if (!aVal || aVal === '\n') aVal = direction === 'asc' ? 'zzzzzz' : '';
      aVal = aVal.trimStart();
    } else if (typeOfValue === 'number') {
      aVal = Number.isFinite(aVal) ? aVal : Infinity * (direction === 'asc' ? 1 : -1);
    } // @ts-ignore


    var bVal = b[columnName];

    if (typeOfValue === 'string') {
      var _ref3;

      bVal = ((_ref3 = bVal || '') == null ? void 0 : _ref3.toUpperCase == null ? void 0 : _ref3.toUpperCase()) || '';
      if (!bVal || bVal === '\n') bVal = direction === 'asc' ? 'zzzzzz' : '';
      bVal = bVal.trimStart();
    } else if (typeOfValue === 'number') {
      bVal = Number.isFinite(bVal) ? bVal : Infinity * (direction === 'asc' ? 1 : -1);
    }

    return direction == 'desc' ? // @ts-ignore
    d3.descending(aVal, bVal) : // @ts-ignore
    d3.descending(bVal, aVal);
  };
};

function generateSchema(data) {
  var metrics = Object.keys(data[0] || {});
  var schema = fromPairs(metrics.map(function (metric) {
    var getFirstValue = function getFirstValue(data) {
      return data.find(function (d) {
        return d[metric] !== undefined && d[metric] !== null && d[metric] !== '';
      }) || {};
    };

    var value = getFirstValue(data)[metric];
    if (!value && value !== 0) return [metric, 'string'];

    var isDate = function isDate(value) {
      try {
        if (typeof value === 'string') {
          var currentDate = new Date();
          return !!validDatePatterns.find(function (pattern) {
            return isValidDate(parseDate(value, pattern, currentDate));
          });
        } else {
          return false; // return isValidDate(value);
        }
      } catch (e) {
        return false;
      }
    };

    var isTime = function isTime(value) {
      try {
        if (typeof value === 'string') {
          var currentDate = new Date();
          return !!validTimePatterns.find(function (pattern) {
            return isValidDate(parseDate(value, pattern, currentDate));
          });
        }

        return false;
      } catch (e) {
        return false;
      }
    };

    var isColor = function isColor(value) {
      try {
        if (typeof value === 'string') {
          var color = d3.rgb(value);
          return !!color && !Number.isNaN(color.r);
        }

        return false;
      } catch (e) {
        return false;
      }
    };

    var isFirstValueADate = isDate(value);

    if (isFirstValueADate) {
      var values = data.map(function (d) {
        return d[metric];
      }).filter(function (d) {
        return d;
      });
      var areMultipleValuesDates = !values.slice(0, 30).find(function (d) {
        return !isDate(d);
      });

      if (areMultipleValuesDates) {
        var dateRange = d3.extent(values, function (d) {
          return new Date(d).getTime();
        });
        var oneYear = 1000 * 60 * 60 * 24 * 365;
        var type = dateRange[1] - dateRange[0] > oneYear ? 'date' : 'short-range-date';
        return [metric, type];
      }
    }

    var isFirstValueATime = isTime(value);

    if (isFirstValueATime) {
      var _values = data.map(function (d) {
        return d[metric];
      }).filter(function (d) {
        return d;
      }).slice(0, 30);

      var areMultipleValuesTimes = !_values.find(function (d) {
        return !isTime(d);
      });
      if (areMultipleValuesTimes) return [metric, 'time'];
    }

    var isFirstValueAColor = isColor(value);

    if (isFirstValueAColor) {
      var _values2 = data.map(function (d) {
        return d[metric];
      }).filter(function (d) {
        return d;
      }).slice(0, 30);

      var areMultipleValuesColors = !_values2.find(function (d) {
        return !isColor(d);
      });
      if (areMultipleValuesColors) return [metric, 'color'];
    }

    var isFirstValueAnArray = Array.isArray(value);

    if (isFirstValueAnArray) {
      var _values3 = data.map(function (d) {
        return d[metric];
      }).filter(function (d) {
        return d;
      });

      var lengthOfArrays = _values3.map(function (d) {
        return d.length;
      });

      var areAnyArraysLong = !!lengthOfArrays.find(function (d) {
        return d > 1;
      });
      return [metric, areAnyArraysLong || typeof value[0] !== 'string' ? 'array' : 'short-array'];
    }

    var isObject = typeof value === 'object';

    if (isObject) {
      return [metric, 'object'];
    }

    var isFiniteNumber = Number.isFinite(+value);

    if (isFiniteNumber) {
      return [metric, metric.toLowerCase().trim() === 'year' ? 'year' : 'number'];
    } // If there are few unique values for the metric,
    // consider the metric as a category


    var uniqueValues = new Set(data.map(function (d) {
      return d[metric];
    }));
    var maxUniqueValuesForCategory = Math.min(Math.floor(data.length / 3), 20);
    return [metric, uniqueValues.size < maxUniqueValuesForCategory ? 'category' : 'string'];
  }));
  return schema;
}

var parseData = function parseData(data, cellTypes) {
  var columnParseFunctions = Object.keys(cellTypes).map(function (columnName) {
    var cellType = cellTypes[columnName]; // @ts-ignore

    var cellInfo = cellTypeMap[cellType] || {};

    var parseFunction = cellInfo.parseValueFunction || function (d) {
      return d;
    };

    return [columnName, parseFunction];
  });
  return data.map(function (d) {
    return _extends({}, d, fromPairs(columnParseFunctions.map(function (_ref4) {
      var columnName = _ref4[0],
          parseFunction = _ref4[1];
      return [columnName, parseFunction(d[columnName])];
    })), {
      __rawData__: d
    });
  });
};

var validDatePatterns = ['MM/dd/yy', 'MM-dd-yy', 'dd/MM/yy', 'dd-MM-yy', 'MM/dd/yyyy', 'MM-dd-yyyy', 'dd/MM/yyyy', 'dd-MM-yyyy', 'yyyy-MM-dd', 'yyyyMMdd'];
var validTimePatterns = ['yyyy-MM-dd HH:mm', 'yyyy-MM-dd HH:mm:ss', "yyyy-MM-dd'T'HH:mm:ssxxxx", "yyyy-MM-dd'T'HH:mm:ss", "yyyy-MM-dd'T'HH:mm:ssSSxxxx", "yyyy-MM-dd'T'HH:mm:ss.SSSX", "yyyy-MM-dd'T'HH:mm:ss.SSSSX", "yyyy-MM-dd'T'HH:mm:ss.SSSSxxxx", 'dd/MM/yy hh:mmaa', 'dd/MM/yy HH:mm', 'MM/dd/yy HH:mm', 'MM/dd/yy hh:mmaa', 'dd/MM/yyyy hh:mmaa', 'dd/MM/yyyy HH:mm', 'MM/dd/yyyy HH:mm', 'MM/dd/yyyy hh:mmaa'];

var parseDatetimeString = function parseDatetimeString(str, patterns) {
  if (str === void 0) {
    str = '';
  }

  if (patterns === void 0) {
    patterns = validDatePatterns;
  }

  var date = Date.parse(str);
  if (isValidDate(date)) return date;

  for (var _iterator = _createForOfIteratorHelperLoose(patterns), _step; !(_step = _iterator()).done;) {
    var pattern = _step.value;
    // @ts-ignore
    date = parseDate(str, pattern, new Date());

    if (isValidDate(date)) {
      return date;
    }
  } // @ts-ignore


  date = parseISO(str);

  if (isValidDate(date)) {
    return date;
  }

  return null;
};

var getDiffs = function getDiffs(data) {
  // doing it this way for perf reasons
  // to prevent from indexing all data points
  // which gets slow with long datasets
  var diffs = [];
  data.forEach(function (d, i) {
    if (d.__status__) diffs.push(_extends({}, d, {
      i: i
    }));
  });
  return diffs;
};

var cellTypeMap = {
  string: {
    cell: StringCell,
    filter: StringFilter,
    format: function format(d) {
      return d;
    },
    shortFormat: function shortFormat(d) {
      return d;
    },
    sortValueType: 'string'
  },
  color: {
    cell: ColorCell,
    filter: StringFilter,
    format: function format(d) {
      return d;
    },
    shortFormat: function shortFormat(d) {
      return d;
    },
    sortValueType: 'string'
  },
  object: {
    cell: StringCell,
    filter: StringFilter,
    format: function format(d) {
      return JSON.stringify(d);
    },
    shortFormat: function shortFormat(d) {
      return JSON.stringify(d);
    },
    parseValueFunction: function parseValueFunction(d) {
      return (// prettier-ignore
        typeof d === "object" ? JSON.stringify(d, undefined, 2) : typeof d === 'string' ? d : ''
      );
    },
    sortValueType: 'string'
  },
  array: {
    cell: StringCell,
    filter: StringFilter,
    format: function format(d) {
      return d;
    },
    shortFormat: function shortFormat(d) {
      return d;
    },
    parseValueFunction: function parseValueFunction(d) {
      return (// prettier-ignore
        Array.isArray(d) ? "[" + d.length + " item" + (d.length === 1 ? '' : 's') + "]" : typeof d === 'string' ? d : ''
      );
    },
    sortValueType: 'string'
  },
  'short-array': {
    cell: StringCell,
    filter: StringFilter,
    format: function format(d) {
      return d;
    },
    shortFormat: function shortFormat(d) {
      return d;
    },
    parseValueFunction: function parseValueFunction(d) {
      return Array.isArray(d) ? d[0] : d;
    },
    sortValueType: 'string'
  },
  category: {
    cell: CategoryCell,
    filter: CategoryFilter,
    format: function format(d) {
      return d;
    },
    shortFormat: function shortFormat(d) {
      return d;
    },
    parseValueFunction: function parseValueFunction(d) {
      return d;
    },
    sortValueType: 'string',
    extraCellHorizontalPadding: 6
  },
  number: {
    cell: NumberCell,
    filter: RangeFilter,
    format: function format(d) {
      return (d == null ? void 0 : d.toLocaleString()) + '';
    },
    shortFormat: function shortFormat(d) {
      return d < 1000 && isAlmostInteger(d) ? d3.format(',.0f')(d) : d < 1 ? d3.format('.2f')(d) : d3.format(',.2s')(d);
    },
    parseValueFunction: function parseValueFunction(d) {
      if (typeof d === 'string') {
        if (!d.length) return undefined;
      } else if (d === undefined || d === null) {
        return d;
      }

      return +d;
    },
    minWidth: 126,
    hasScale: true,
    sortValueType: 'number'
  },
  year: {
    cell: RawNumberCell,
    filter: RangeFilter,
    format: function format(d) {
      return d + '';
    },
    shortFormat: function shortFormat(d) {
      return d;
    },
    parseValueFunction: function parseValueFunction(d) {
      return +d;
    },
    minWidth: 126,
    hasScale: true,
    sortValueType: 'number'
  },
  'short-range-date': {
    cell: DateCell,
    filter: RangeFilter,
    format: /*#__PURE__*/d3.timeFormat('%B %-d %Y'),
    shortFormat: /*#__PURE__*/d3.timeFormat('%-m/%-d'),
    parseValueFunction: function parseValueFunction(str) {
      if (str === void 0) {
        str = '';
      }

      return parseDatetimeString(str, validDatePatterns);
    },
    hasScale: true,
    sortValueType: 'number'
  },
  date: {
    cell: DateCell,
    filter: RangeFilter,
    format: /*#__PURE__*/d3.timeFormat('%B %-d %Y'),
    shortFormat: /*#__PURE__*/d3.timeFormat('%-Y'),
    parseValueFunction: function parseValueFunction(str) {
      if (str === void 0) {
        str = '';
      }

      return parseDatetimeString(str, validDatePatterns);
    },
    hasScale: true,
    sortValueType: 'number'
  },
  time: {
    cell: TimeCell,
    filter: RangeFilter,
    format: /*#__PURE__*/d3.timeFormat('%B %-d, %Y %-H:%M'),
    shortFormat: /*#__PURE__*/d3.timeFormat('%-m/%-d %-H:%M'),
    parseValueFunction: function parseValueFunction(str) {
      if (str === void 0) {
        str = '';
      }

      return parseDatetimeString(str, validTimePatterns);
    },
    hasScale: true,
    sortValueType: 'number'
  }
};
var categoryColors = [{
  "--tw-bg-opacity": "1",
  "backgroundColor": "rgba(243, 244, 246, var(--tw-bg-opacity))",
  "--tw-text-opacity": "1",
  "color": "rgba(75, 85, 99, var(--tw-text-opacity))"
}, {
  "--tw-bg-opacity": "1",
  "backgroundColor": "rgba(254, 243, 199, var(--tw-bg-opacity))",
  "--tw-text-opacity": "1",
  "color": "rgba(217, 119, 6, var(--tw-text-opacity))"
}, {
  "--tw-bg-opacity": "1",
  "backgroundColor": "rgba(224, 231, 255, var(--tw-bg-opacity))",
  "--tw-text-opacity": "1",
  "color": "rgba(79, 70, 229, var(--tw-text-opacity))"
}, {
  "--tw-bg-opacity": "1",
  "backgroundColor": "rgba(252, 231, 243, var(--tw-bg-opacity))",
  "--tw-text-opacity": "1",
  "color": "rgba(219, 39, 119, var(--tw-text-opacity))"
}, {
  "--tw-bg-opacity": "1",
  "backgroundColor": "rgba(219, 234, 254, var(--tw-bg-opacity))",
  "--tw-text-opacity": "1",
  "color": "rgba(37, 99, 235, var(--tw-text-opacity))"
}, {
  "--tw-bg-opacity": "1",
  "backgroundColor": "rgba(209, 250, 229, var(--tw-bg-opacity))",
  "--tw-text-opacity": "1",
  "color": "rgba(5, 150, 105, var(--tw-text-opacity))"
}, {
  "--tw-bg-opacity": "1",
  "backgroundColor": "rgba(237, 233, 254, var(--tw-bg-opacity))",
  "--tw-text-opacity": "1",
  "color": "rgba(124, 58, 237, var(--tw-text-opacity))"
}, {
  "--tw-bg-opacity": "1",
  "backgroundColor": "rgba(254, 226, 226, var(--tw-bg-opacity))",
  "--tw-text-opacity": "1",
  "color": "rgba(220, 38, 38, var(--tw-text-opacity))"
}];

var isAlmostInteger = function isAlmostInteger(num) {
  return Math.abs(Math.round(num) - num) < 0.06;
};

var context = /*#__PURE__*/React__default.createContext( /*#__PURE__*/createGridStore());

var useGridStore = function useGridStore(selector) {
  var currContext = React__default.useContext(context); // @ts-ignore

  return currContext(selector);
};

function StoreWrapper(_ref) {
  var children = _ref.children;

  var _React$useState = React__default.useState(createGridStore),
      useStore = _React$useState[0];

  return react.jsx(context.Provider, {
    value: useStore
  }, children);
}

function getCellIndicies(child) {
  return {
    row: (child == null ? void 0 : child.props.rowIndex) || 0,
    column: (child == null ? void 0 : child.props.columnIndex) || 0
  };
}

function getShownIndicies(children) {
  var firstCell = children[0];
  var firstIndices = getCellIndicies(firstCell);
  var lastCell = children[children.length - 1];
  var lastIndices = getCellIndicies(lastCell);
  var minRow = Math.min(firstIndices.row, Infinity);
  var maxRow = Math.max(lastIndices.row, 0);
  var minColumn = Math.min(firstIndices.column, Infinity);
  var maxColumn = Math.max(lastIndices.column, 0);
  return {
    from: {
      row: minRow == Infinity ? 0 : minRow,
      column: minColumn == Infinity ? 0 : minColumn
    },
    to: {
      row: maxRow,
      column: maxColumn
    }
  };
}

function useInnerElementType(Cell, columnWidth, rowHeight, itemData, numberOfStickiedColumns, HeaderComponent) {
  return React__default.useMemo(function () {
    return React__default.forwardRef(function (props, ref) {
      function sumRowsHeights(index) {
        var sum = 0;

        while (index > 1) {
          sum += rowHeight(index - 1);
          index -= 1;
        }

        return sum;
      }

      function sumColumnWidths(index) {
        var sum = 0;

        while (index > numberOfStickiedColumns) {
          sum += columnWidth(index - 1);
          index -= 1;
        }

        return sum;
      }

      var shownIndicies = getShownIndicies(props.children);
      var shownColumnsCount = shownIndicies.to.column - shownIndicies.from.column + 2 || itemData.columnNames.length;
      var shownRowsCount = shownIndicies.to.row - shownIndicies.from.row;
      var shownColumns = new Array(shownColumnsCount).fill(0);
      var shownRows = new Array(shownRowsCount || 1).fill(0);
      var columnWidths = [].concat(shownColumns, [0]).map(function (_, i) {
        return columnWidth(i + shownIndicies.from.column) || 0;
      });
      var totalColumnWidths = columnWidths.reduce(function (a, b) {
        return a + b;
      }, 0);
      return react.jsx("div", {
        ref: ref,
        style: _extends({}, props.style, {
          height: props.style.height + 60,
          minWidth: totalColumnWidths,
          background: "linear-gradient(to bottom, #E5E7EB 1px, white 1px) 0 -4px",
          backgroundSize: "100% " + rowHeight(1) + "px"
        })
      }, react.jsx("div", {
        css: [{
          "display": "flex",
          "position": "sticky",
          "top": "0px",
          "zIndex": "300"
        }],
        "data-tw": "flex sticky top-0 z-[300]"
      }, numberOfStickiedColumns > 0 && react.jsx(HeaderComponent, {
        key: "0:0",
        rowIndex: 0,
        columnIndex: 0,
        data: itemData,
        style: {
          flex: "none",
          display: 'inline-flex',
          width: columnWidth(0),
          height: rowHeight(0),
          position: 'sticky',
          top: 0,
          left: 0,
          zIndex: 200
        }
      }), shownColumns.map(function (_, i) {
        var columnIndex = i + shownIndicies.from.column + numberOfStickiedColumns;
        var rowIndex = 0;
        var width = columnWidth(columnIndex);
        var height = rowHeight(rowIndex);
        var marginLeft = i === numberOfStickiedColumns ? sumColumnWidths(columnIndex - numberOfStickiedColumns) : undefined; // header row

        return react.jsx(HeaderComponent, {
          key: rowIndex + ":" + columnIndex,
          rowIndex: rowIndex,
          columnIndex: columnIndex,
          data: itemData,
          style: {
            flex: "none",
            marginLeft: marginLeft,
            display: 'flex',
            width: width,
            height: height,
            zIndex: 100
          }
        });
      })), numberOfStickiedColumns > 0 && shownRows.map(function (_, i) {
        var columnIndex = 0;
        var rowIndex = i + shownIndicies.from.row;
        var width = columnWidth(columnIndex);
        var height = rowHeight(rowIndex + 1);
        var marginTop = i === 1 ? sumRowsHeights(rowIndex) : undefined; // sticky column

        return react.jsx(Cell, {
          key: rowIndex + ":" + columnIndex,
          rowIndex: rowIndex + 1,
          columnIndex: columnIndex,
          data: itemData,
          style: {
            marginTop: marginTop,
            width: width,
            height: height,
            position: 'sticky',
            left: 0,
            zIndex: 60
          }
        });
      }), props.children.filter(function (child) {
        var _getCellIndicies = getCellIndicies(child),
            column = _getCellIndicies.column,
            row = _getCellIndicies.row;

        return column >= numberOfStickiedColumns && row !== 0;
      }));
    });
  }, [Cell, columnWidth, rowHeight, numberOfStickiedColumns]);
}

var StickyGrid = /*#__PURE__*/React__default.forwardRef(function (props, ref) {
  return react.jsx(reactWindow.VariableSizeGrid, _extends({}, props, {
    ref: ref,
    innerElementType: useInnerElementType(props.children, props.columnWidth, props.rowHeight, props.itemData, props.numberOfStickiedColumns, props.HeaderComponent)
  }));
});

var EditableHeader = /*#__PURE__*/React__default.memo(function (props) {
  var value = props.value,
      isEditable = props.isEditable,
      onChange = props.onChange,
      children = props.children;

  var _React$useState = React__default.useState(false),
      isEditing = _React$useState[0],
      setIsEditing = _React$useState[1];

  var _React$useState2 = React__default.useState(value),
      editedValue = _React$useState2[0],
      setEditedValue = _React$useState2[1];

  React.useEffect(function () {
    setEditedValue(value);
  }, [value]);

  var _onSubmit = function onSubmit() {
    onChange == null ? void 0 : onChange(editedValue);
    setIsEditing(false);
  };

  if (!isEditable) return children;
  return isEditing ? react.jsx("form", {
    onSubmit: function onSubmit(e) {
      e.preventDefault();

      _onSubmit();
    },
    css: [{
      "width": "100%",
      "height": "100%",
      "maxWidth": "100%",
      "fontSize": "0.875rem",
      "lineHeight": "1.25rem"
    }],
    "data-tw": "w-full h-full max-w-full text-sm"
  }, react.jsx("input", {
    type: "text",
    autoFocus: true,
    onFocus: function onFocus(e) {
      e.target.select();
    },
    css: [{
      "width": "100%",
      "height": "100%",
      "paddingTop": "0.5rem",
      "paddingBottom": "0.5rem",
      "paddingLeft": "0.5rem",
      "paddingRight": "0.5rem",
      "fontFamily": "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace",
      "--tw-text-opacity": "1",
      "color": "rgba(0, 0, 0, var(--tw-text-opacity))",
      ":focus": {
        "outline": "2px solid transparent",
        "outlineOffset": "2px"
      },
      "--tw-bg-opacity": "1",
      "backgroundColor": "rgba(255, 255, 255, var(--tw-bg-opacity))"
    }],
    value: editedValue,
    onChange: function onChange(e) {
      return setEditedValue(e.target.value);
    },
    onKeyDown: function onKeyDown(e) {
      e.stopPropagation();

      if (e.key === 'Enter') {
        _onSubmit();
      } else if (e.key === 'Escape') {
        setIsEditing(false);
        setEditedValue(value);
      }
    },
    onBlur: function onBlur() {
      setIsEditing(false);
      setEditedValue(value);
    },
    "data-tw": "w-full h-full py-2 px-2 font-mono text-black focus:outline-none bg-white"
  })) : react.jsx("button", {
    css: [{
      "height": "100%",
      "width": "100%",
      "maxWidth": "100%",
      "display": "flex",
      "alignItems": "center",
      "cursor": "cell"
    }, "text-align: inherit"],
    onClick: function onClick() {
      setIsEditing(true);
    },
    "data-tw": "h-full w-full max-w-full flex items-center cursor-cell"
  }, children);
}, reactWindow.areEqual);

function NewColumnHeader(props) {
  var style = props.style,
      onAdd = props.onAdd;

  var _useState = React.useState(false),
      isEditing = _useState[0],
      setIsEditing = _useState[1];

  var _useState2 = React.useState(''),
      editedValue = _useState2[0],
      setEditedValue = _useState2[1];

  return (// @ts-ignore
    react.jsx("div", {
      className: "sticky-grid__header",
      css: [{
        "borderBottomWidth": "1px",
        "borderRightWidth": "1px",
        "--tw-bg-opacity": "1",
        "backgroundColor": "rgba(249, 250, 251, var(--tw-bg-opacity))",
        "--tw-border-opacity": "1",
        "borderColor": "rgba(229, 231, 235, var(--tw-border-opacity))",
        "flexDirection": "column"
      }, style],
      "data-tw": "border-b border-r bg-gray-50 border-gray-200 flex-col"
    }, isEditing ? react.jsx("form", {
      css: {
        "display": "flex",
        "flexDirection": "column",
        "justifyContent": "center",
        "alignItems": "center",
        "paddingTop": "1.5rem",
        "paddingBottom": "1.5rem",
        "paddingLeft": "0.75rem",
        "paddingRight": "0.75rem"
      },
      "data-tw": "flex flex-col justify-center items-center py-6 px-3",
      onSubmit: function onSubmit(e) {
        e.preventDefault();
        onAdd(editedValue);
        setIsEditing(false);
      }
    }, react.jsx("label", {
      css: {
        "fontSize": "0.875rem",
        "lineHeight": "1.25rem",
        "--tw-text-opacity": "1",
        "color": "rgba(107, 114, 128, var(--tw-text-opacity)) !important"
      },
      "data-tw": "text-sm text-gray-500!"
    }, "Column Name"), react.jsx("input", {
      type: "text",
      autoFocus: true,
      onFocus: function onFocus(e) {
        e.target.select();
      },
      css: {
        "width": "100%",
        "height": "100%",
        "paddingTop": "0.5rem",
        "paddingBottom": "0.5rem",
        "paddingLeft": "0.5rem",
        "paddingRight": "0.5rem",
        "--tw-text-opacity": "1",
        "color": "rgba(0, 0, 0, var(--tw-text-opacity))",
        ":focus": {
          "outline": "2px solid transparent",
          "outlineOffset": "2px"
        },
        "--tw-bg-opacity": "1",
        "backgroundColor": "rgba(255, 255, 255, var(--tw-bg-opacity))",
        "borderWidth": "1px",
        "--tw-border-opacity": "1",
        "borderColor": "rgba(209, 213, 219, var(--tw-border-opacity))"
      },
      "data-tw": "w-full h-full py-2 px-2 text-black focus:outline-none bg-white border border-gray-300",
      value: editedValue,
      onChange: function onChange(e) {
        return setEditedValue(e.target.value);
      },
      onKeyDown: function onKeyDown(e) {
        if (e.key === 'Escape') {
          setIsEditing(false);
          setEditedValue('');
        }
      },
      onBlur: function onBlur() {
        setIsEditing(false);
        setEditedValue('');
      }
    })) : react.jsx("button", {
      css: {
        "height": "100%",
        "width": "100%",
        "display": "flex",
        "flexDirection": "column",
        "alignItems": "center",
        "justifyContent": "center",
        "padding": "1.5rem",
        "--tw-text-opacity": "1",
        "color": "rgba(107, 114, 128, var(--tw-text-opacity)) !important",
        "fontSize": "0.875rem !important",
        "lineHeight": "1.25rem !important",
        "textAlign": "center"
      },
      "data-tw": "h-full w-full flex flex-col items-center justify-center p-6 text-gray-500! text-sm! text-center",
      onClick: function onClick() {
        return setIsEditing(true);
      }
    }, react.jsx(octiconsReact.PlusIcon, null), "Add a column"))
  );
}

function Header(props) {
  var style = props.style,
      columnName = props.columnName,
      activeSortDirection = props.activeSortDirection,
      width = props.width,
      metadata = props.metadata,
      originalData = props.originalData,
      filteredData = props.filteredData,
      possibleValues = props.possibleValues,
      filter = props.filter,
      cellType = props.cellType,
      cellInfo = props.cellInfo,
      focusedValue = props.focusedValue,
      showFilters = props.showFilters,
      isFirstColumn = props.isFirstColumn,
      isSticky = props.isSticky,
      isNewColumn = props.isNewColumn,
      isEditable = props.isEditable,
      onChange = props.onChange,
      onDelete = props.onDelete,
      onAdd = props.onAdd,
      onFilterChange = props.onFilterChange,
      onSort = props.onSort,
      onSticky = props.onSticky; // const popoverAnchorRef = React.createRef<HTMLDivElement>();
  // @ts-ignore

  var FilterComponent = cellInfo.filter;
  if (isNewColumn) return react.jsx(NewColumnHeader, {
    style: style,
    onAdd: onAdd
  });
  return react.jsx("div", {
    className: "sticky-grid__header",
    css: {
      "borderBottomWidth": "1px",
      "borderRightWidth": "1px",
      "--tw-bg-opacity": "1",
      "backgroundColor": "rgba(255, 255, 255, var(--tw-bg-opacity))",
      "--tw-border-opacity": "1",
      "borderColor": "rgba(229, 231, 235, var(--tw-border-opacity))",
      "flexDirection": "column"
    },
    "data-tw": "border-b border-r bg-white border-gray-200 flex-col",
    style: _extends({}, style)
  }, react.jsx(HeaderTop, {
    cellType: cellType,
    columnName: columnName,
    activeSortDirection: activeSortDirection,
    metadata: metadata,
    isSticky: isSticky,
    onSticky: onSticky,
    onSort: onSort,
    isEditable: isEditable,
    onChange: onChange,
    onDelete: onDelete
  }), showFilters && react.jsx("div", {
    css: [{
      "flex": "1 1 0%",
      "display": "flex",
      "flexDirection": "column",
      "padding": "0.5rem",
      "justifyContent": "center",
      "alignItems": "flex-start"
    }, isFirstColumn && {
      "paddingLeft": "2rem"
    }],
    "data-tw": "flex-1 flex flex-col p-2 justify-center items-start | pl-8"
  }, react.jsx(FilterComponent, {
    id: columnName,
    onChange: onFilterChange,
    originalData: originalData,
    filteredData: filteredData,
    value: filter,
    possibleValues: possibleValues,
    maxWidth: width // @ts-ignore
    ,
    shortFormat: cellInfo.shortFormat // @ts-ignore
    ,
    longFormat: cellInfo.format,
    focusedValue: focusedValue
  })));
}
var HeaderTop = /*#__PURE__*/React.memo(function (_ref) {
  var cellType = _ref.cellType,
      columnName = _ref.columnName,
      activeSortDirection = _ref.activeSortDirection,
      metadata = _ref.metadata,
      isSticky = _ref.isSticky,
      onSticky = _ref.onSticky,
      onSort = _ref.onSort,
      isEditable = _ref.isEditable,
      onChange = _ref.onChange,
      onDelete = _ref.onDelete;
  return react.jsx("div", {
    className: "header",
    css: {
      "position": "relative",
      "borderBottomWidth": "1px",
      "--tw-border-opacity": "1",
      "borderColor": "rgba(229, 231, 235, var(--tw-border-opacity))",
      "--tw-bg-opacity": "1",
      "backgroundColor": "rgba(255, 255, 255, var(--tw-bg-opacity))",
      "display": "flex",
      "alignItems": "center",
      "flexShrink": "0"
    },
    "data-tw": "relative border-b border-gray-200 bg-white flex items-center flex-shrink-0",
    style: {
      height: 37
    }
  }, react.jsx("div", {
    className: "header__title",
    css: {
      "position": "absolute",
      "top": "0px",
      "left": "0px",
      "bottom": "0px",
      "zIndex": "10",
      "--tw-bg-opacity": "1",
      "backgroundColor": "rgba(249, 250, 251, var(--tw-bg-opacity))",
      "--tw-text-opacity": "1",
      "color": "rgba(75, 85, 99, var(--tw-text-opacity))",
      "--tw-shadow": "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      "boxShadow": "var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)",
      "display": "flex",
      "alignItems": "center"
    },
    "data-tw": "absolute top-0 left-0 bottom-0 z-10 bg-gray-50 text-gray-600 shadow-md flex items-center"
  }, react.jsx("button", {
    className: "header__icon header__pin",
    css: [{
      "height": "100%",
      "padding": "0.5rem",
      "display": "flex",
      "alignItems": "center",
      "--tw-border-opacity": "1",
      "borderColor": "rgba(224, 231, 255, var(--tw-border-opacity))",
      ":focus": {
        "--tw-bg-opacity": "1",
        "backgroundColor": "rgba(224, 231, 255, var(--tw-bg-opacity)) !important",
        "opacity": "1",
        "--tw-ring-opacity": "1",
        "--tw-ring-color": "rgba(165, 180, 252, var(--tw-ring-opacity))"
      },
      ":hover": {
        "--tw-bg-opacity": "1",
        "backgroundColor": "rgba(224, 231, 255, var(--tw-bg-opacity)) !important"
      },
      "appearance": "none",
      "--tw-text-opacity": "1",
      "color": "rgba(129, 140, 248, var(--tw-text-opacity)) !important",
      "--tw-bg-opacity": "1",
      "backgroundColor": "rgba(238, 242, 255, var(--tw-bg-opacity)) !important"
    }, isSticky ? {
      "opacity": "1"
    } : {
      "opacity": "0",
      "marginLeft": "-1.5rem !important",
      "--tw-shadow": "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      "boxShadow": "var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)"
    }],
    onClick: function onClick() {
      return onSticky();
    },
    "data-tw": "h-full p-2 flex items-center border-indigo-100 focus:bg-indigo-100! hover:bg-indigo-100! appearance-none focus:opacity-100 text-indigo-400! bg-indigo-50! focus:ring-indigo-300 | opacity-100 | opacity-0 -ml-6! shadow-md"
  }, react.jsx(octiconsReact.PinIcon, null)), react.jsx("div", {
    className: "",
    css: [{
      "display": "flex",
      "justifyContent": "space-between",
      "alignItems": "center",
      "height": "100%",
      "--tw-border-opacity": "1",
      "borderColor": "rgba(255, 255, 255, var(--tw-border-opacity))",
      ":focus": {
        "--tw-bg-opacity": "1",
        "backgroundColor": "rgba(255, 255, 255, var(--tw-bg-opacity))"
      },
      ":hover": {
        "--tw-bg-opacity": "1",
        "backgroundColor": "rgba(255, 255, 255, var(--tw-bg-opacity))"
      },
      "appearance": "none",
      "flex": "1 1 0%",
      "minWidth": "0px"
    }, ['integer', 'number'].includes(cellType) && {
      "textAlign": "right"
    }],
    "data-tw": "flex justify-between items-center h-full border-white focus:bg-white hover:bg-white appearance-none flex-1 min-w-0 | text-right"
  }, react.jsx(EditableHeader, {
    value: columnName,
    isEditable: isEditable,
    onChange: onChange
  }, react.jsx("div", {
    css: [{
      "width": "100%",
      "padding": "0.5rem",
      "fontSize": "0.875rem",
      "lineHeight": "1.25rem",
      "fontWeight": "500",
      "overflow": "hidden",
      "textOverflow": "ellipsis",
      "whiteSpace": "nowrap"
    }],
    title: columnName,
    "data-tw": "w-full p-2 text-sm font-medium truncate"
  }, columnName, !!metadata && react.jsx("span", {
    css: {
      "paddingLeft": "0.5rem",
      "display": "inline-block",
      "--tw-text-opacity": "1",
      "color": "rgba(209, 213, 219, var(--tw-text-opacity))"
    },
    "data-tw": "pl-2 inline-block text-gray-300"
  }, react.jsx(octiconsReact.InfoIcon, null)))), isEditable && react.jsx("button", {
    className: "header__icon header__delete",
    css: [{
      "height": "100%",
      "display": "flex",
      "alignItems": "center",
      "justifyContent": "center",
      "--tw-text-opacity": "1",
      "color": "rgba(239, 68, 68, var(--tw-text-opacity)) !important"
    }, {
      "opacity": "0",
      "width": "0px",
      "padding": "0px"
    }],
    onClick: function onClick() {
      return onDelete == null ? void 0 : onDelete();
    },
    "data-tw": "h-full flex items-center justify-center text-red-500! | opacity-0 w-0 p-0"
  }, react.jsx(octiconsReact.TrashIcon, null)), react.jsx("button", {
    className: "header__icon",
    css: [{
      "display": "flex",
      "alignItems": "center",
      "justifyContent": "center",
      "paddingLeft": "0.25rem",
      "paddingRight": "0.25rem",
      "marginRight": "-0.5rem"
    }, activeSortDirection ? {
      "opacity": "1"
    } : {
      "opacity": "0",
      "--tw-text-opacity": "1",
      "color": "rgba(156, 163, 175, var(--tw-text-opacity)) !important"
    }],
    onClick: function onClick() {
      return onSort(columnName, activeSortDirection == 'asc' ? 'desc' : 'asc');
    },
    "data-tw": "flex items-center justify-center pl-1 pr-1 -mr-2 | opacity-100 | opacity-0 text-gray-400!"
  }, activeSortDirection == 'desc' ? react.jsx(octiconsReact.ArrowDownIcon, null) : react.jsx(octiconsReact.ArrowUpIcon, null))), !!metadata && react.jsx("div", {
    className: "header__icon",
    css: {
      "--tw-translate-x": "0",
      "--tw-translate-y": "100%",
      "--tw-rotate": "0",
      "--tw-skew-x": "0",
      "--tw-skew-y": "0",
      "--tw-scale-x": "1",
      "--tw-scale-y": "1",
      "transform": "translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))",
      "fontSize": "0.875rem",
      "lineHeight": "1.25rem",
      "position": "absolute",
      "bottom": "0px",
      "--tw-bg-opacity": "1",
      "backgroundColor": "rgba(255, 255, 255, var(--tw-bg-opacity))",
      "padding": "1rem",
      "--tw-text-opacity": "1",
      "color": "rgba(99, 102, 241, var(--tw-text-opacity))",
      "borderWidth": "1px",
      "--tw-border-opacity": "1",
      "borderColor": "rgba(165, 180, 252, var(--tw-border-opacity))",
      "paddingTop": "0.75rem",
      "paddingBottom": "0.75rem",
      "--tw-shadow": "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      "boxShadow": "var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)",
      "left": "0px",
      "right": "0px",
      "pointerEvents": "none",
      "opacity": "0"
    },
    "data-tw": "text-sm absolute bottom-0 bg-white p-4 text-indigo-500 transform translate-y-full border border-indigo-300 py-3 shadow-md left-0 right-0 pointer-events-none opacity-0"
  }, react.jsx("div", {
    css: {
      "paddingRight": "0.5rem",
      "display": "inline-block",
      "--tw-text-opacity": "1",
      "color": "rgba(199, 210, 254, var(--tw-text-opacity))"
    },
    "data-tw": "pr-2 inline-block text-indigo-200"
  }, react.jsx(octiconsReact.InfoIcon, null)), metadata)));
});

var EditableCell = /*#__PURE__*/React__default.memo(function (props) {
  var value = props.value,
      isFirstColumn = props.isFirstColumn,
      isEditable = props.isEditable,
      onChange = props.onChange,
      isFocused = props.isFocused,
      isExtraBlankRow = props.isExtraBlankRow,
      onFocusChange = props.onFocusChange,
      onRowDelete = props.onRowDelete,
      children = props.children;

  var _React$useState = React__default.useState(false),
      isEditing = _React$useState[0],
      setIsEditing = _React$useState[1];

  var isEditingRef = React__default.useRef(isEditing);
  var hasSubmittedFormRef = React__default.useRef(false);
  var buttonElement = React__default.useRef(null);

  var _React$useState2 = React__default.useState(value || ""),
      editedValue = _React$useState2[0],
      setEditedValue = _React$useState2[1];

  React.useEffect(function () {
    setEditedValue(value || "");
  }, [value]);
  React.useEffect(function () {
    isEditingRef.current = isEditing;
  }, [isEditing]);

  var _onSubmit = function onSubmit() {
    hasSubmittedFormRef.current = true;
    onChange == null ? void 0 : onChange(editedValue);
    setIsEditing(false);
    onFocusChange == null ? void 0 : onFocusChange([1, 0]);
  };

  React.useEffect(function () {
    if (!isFocused) {
      setIsEditing(false);
      setEditedValue(value);
      return;
    } else {
      if (buttonElement.current) {
        buttonElement.current.focus();
      }

      hasSubmittedFormRef.current = false;
    }

    var onKeyDown = function onKeyDown(e) {
      var diff = cellDiffs[e.key];

      if (diff) {
        if (e.metaKey) {
          // scroll to top/bottom
          diff = diff.map(function (d) {
            return d ? Infinity * d : d;
          });
        }

        onFocusChange == null ? void 0 : onFocusChange(diff);
        e.stopPropagation();
        e.preventDefault();
      } else if (e.key === 'Enter' && !isEditingRef.current) {
        var _e$target;

        // don't focus when triggering delete
        // @ts-ignore
        if ((_e$target = e.target) != null && _e$target.classList.contains('delete-button')) return;
        setTimeout(function () {
          // without the timeout, the form submits immediately
          setIsEditing(true);
        }, 0);
      } else if (e.key === 'Escape') {
        if (!isEditingRef.current) {
          onFocusChange == null ? void 0 : onFocusChange(null);
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return function () {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isFocused]);
  if (!isEditable) return children;
  return isEditing ? react.jsx("form", {
    onSubmit: function onSubmit(e) {
      e.preventDefault();
      e.stopPropagation();

      _onSubmit();
    },
    css: [{
      "width": "100%",
      "height": "100%",
      "borderWidth": "3px",
      "borderColor": "transparent"
    }, isExtraBlankRow ? "border-gray-300" : "border-indigo-500"],
    "data-tw": "w-full h-full border-[3px] border-transparent"
  }, react.jsx("input", {
    type: "text",
    autoFocus: true,
    onFocus: function onFocus(e) {
      e.target.select();
    },
    css: [{
      "width": "100%",
      "height": "100%",
      "paddingTop": "0.5rem",
      "paddingBottom": "0.5rem",
      "paddingLeft": "1rem",
      "paddingRight": "1rem",
      "fontFamily": "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace",
      "fontSize": "0.875rem",
      "lineHeight": "1.25rem",
      ":focus": {
        "outline": "2px solid transparent",
        "outlineOffset": "2px"
      },
      "backgroundColor": "transparent"
    }],
    value: editedValue || "",
    onChange: function onChange(e) {
      return setEditedValue(e.target.value);
    },
    onKeyDown: function onKeyDown(e) {
      if (e.key === 'Escape') {
        setIsEditing(false);
      } else if (cellDiffs[e.key]) {
        e.stopPropagation();
      }
    },
    onBlur: function onBlur() {
      if (hasSubmittedFormRef.current) return;
      onChange == null ? void 0 : onChange(editedValue);
      setIsEditing(false);
    },
    "data-tw": "w-full h-full py-2 px-4 font-mono text-sm focus:outline-none bg-transparent"
  })) : react.jsx("div", {
    css: [{
      "width": "100%",
      "height": "100%"
    }],
    "data-tw": "w-full h-full"
  }, isFirstColumn && react.jsx("button", {
    css: [{
      "position": "absolute",
      "height": "100%",
      "--tw-text-opacity": "1",
      "color": "rgba(239, 68, 68, var(--tw-text-opacity)) !important",
      "opacity": "0",
      ":focus": {
        "opacity": "1"
      }
    }],
    className: "delete-button",
    onClick: function onClick(e) {
      e.stopPropagation();
      e.preventDefault();
      onRowDelete == null ? void 0 : onRowDelete();
    },
    "data-tw": "absolute h-full text-red-500! opacity-0 focus:opacity-100"
  }, react.jsx(octiconsReact.TrashIcon, null)), react.jsx("button", {
    ref: buttonElement,
    css: [{
      "width": "100%",
      "height": "100%",
      "display": "flex",
      "alignItems": "center",
      "cursor": "cell",
      "borderWidth": "3px",
      "borderColor": "transparent",
      ":focus": {
        "outline": "2px solid transparent",
        "outlineOffset": "2px"
      }
    }, isFocused && (isExtraBlankRow ? {
      "--tw-border-opacity": "1",
      "borderColor": "rgba(209, 213, 219, var(--tw-border-opacity))"
    } : {
      "--tw-border-opacity": "1",
      "borderColor": "rgba(99, 102, 241, var(--tw-border-opacity))"
    })],
    onFocus: function onFocus() {
      return onFocusChange == null ? void 0 : onFocusChange([0, 0]);
    },
    onClick: function onClick() {
      return onFocusChange == null ? void 0 : onFocusChange([0, 0]);
    },
    onDoubleClick: function onDoubleClick() {
      return setIsEditing(true);
    },
    "data-tw": "w-full h-full flex items-center cursor-cell border-[3px] border-transparent focus:outline-none | border-gray-300 | border-indigo-500"
  }, children));
}, reactWindow.areEqual);
var cellDiffs = {
  "ArrowUp": [-1, 0],
  "ArrowDown": [1, 0],
  "ArrowLeft": [0, -1],
  "ArrowRight": [0, 1]
};

var linkify = /*#__PURE__*/Linkify().add('ftp:', null).add('mailto:', null);
var Cell = /*#__PURE__*/React__default.memo(function (props) {
  var type = props.type,
      value = props.value,
      rawValue = props.rawValue,
      formattedValue = props.formattedValue,
      categoryColor = props.categoryColor,
      status = props.status,
      isFirstColumn = props.isFirstColumn,
      isExtraBlankRow = props.isExtraBlankRow,
      isNearRightEdge = props.isNearRightEdge,
      isNearBottomEdge = props.isNearBottomEdge,
      isEditable = props.isEditable,
      onCellChange = props.onCellChange,
      onRowDelete = props.onRowDelete,
      isFocused = props.isFocused,
      onFocusChange = props.onFocusChange,
      background = props.background,
      _props$style = props.style,
      style = _props$style === void 0 ? {} : _props$style,
      _props$onMouseEnter = props.onMouseEnter,
      onMouseEnter = _props$onMouseEnter === void 0 ? function () {} : _props$onMouseEnter; // @ts-ignore

  var cellInfo = cellTypeMap[type];

  var _ref = cellInfo || {},
      CellComponent = _ref.cell;

  var displayValue = (formattedValue || value || '').toString();
  var isLongValue = (displayValue || '').length > 23;
  var stringWithLinks = React__default.useMemo(function () {
    if (!displayValue) return '';
    var sanitized = DOMPurify.sanitize(displayValue); // Does the sanitized string contain any links?

    if (!linkify.test(sanitized)) return sanitized; // If so, we need to linkify it.

    var matches = linkify.match(sanitized); // If there are no matches, we can just return the sanitized string.

    if (!matches || matches.length === 0) return sanitized; // Otherwise, let's naively use the first match.

    return "<a href=\"" + matches[0].url + "\" target=\"_blank\" rel=\"noopener\">\n        " + matches[0].url + "\n      </a>";
  }, [value]);
  React.useEffect(function () {
    if (!isFocused) return;
    onMouseEnter();
  }, [isFocused]);
  if (!cellInfo) return null;
  var StatusIcon = isFirstColumn && // @ts-ignore
  {
    "new": octiconsReact.PlusIcon,
    old: octiconsReact.DashIcon,
    modified: octiconsReact.DiffModifiedIcon,
    'modified-row': octiconsReact.DiffModifiedIcon
  }[status || ''];
  var statusColor = isFirstColumn && // @ts-ignore
  {
    "new": 'text-green-400',
    old: 'text-pink-400',
    modified: 'text-yellow-500',
    'modified-row': 'text-yellow-500'
  }[status || ''] || '';
  return react.jsx("div", {
    className: "cell",
    css: [{
      "display": "flex",
      "borderBottomWidth": "1px",
      "borderRightWidth": "1px"
    }, status === 'new' && {
      "--tw-border-opacity": "1",
      "borderColor": "rgba(167, 243, 208, var(--tw-border-opacity))"
    }, status === 'old' && {
      "--tw-border-opacity": "1",
      "borderColor": "rgba(251, 207, 232, var(--tw-border-opacity))"
    }, status === 'modified' && {
      "--tw-border-opacity": "1",
      "borderColor": "rgba(253, 230, 138, var(--tw-border-opacity))"
    }, status === 'modified-row' && {
      "--tw-border-opacity": "1",
      "borderColor": "rgba(229, 231, 235, var(--tw-border-opacity))"
    }, !status && {
      "--tw-border-opacity": "1",
      "borderColor": "rgba(229, 231, 235, var(--tw-border-opacity))"
    }],
    style: _extends({}, style, {
      background: background || '#fff'
    }),
    "data-tw": "flex border-b border-r | border-green-200 | border-pink-200 | border-yellow-200 | border-gray-200 | border-gray-200"
  }, react.jsx(EditableCell, {
    value: rawValue,
    isEditable: isEditable,
    isFirstColumn: isFirstColumn,
    onChange: onCellChange,
    isFocused: isFocused,
    isExtraBlankRow: isExtraBlankRow,
    onFocusChange: onFocusChange,
    onRowDelete: onRowDelete
  }, react.jsx(CellInner, {
    value: value,
    isFirstColumn: isFirstColumn,
    statusColor: statusColor,
    StatusIcon: StatusIcon,
    rawValue: rawValue,
    categoryColor: categoryColor,
    isLongValue: isLongValue,
    isNearBottomEdge: isNearBottomEdge,
    isNearRightEdge: isNearRightEdge,
    stringWithLinks: stringWithLinks,
    CellComponent: CellComponent,
    onMouseEnter: onMouseEnter
  })));
}, reactWindow.areEqual);
var CellInner = /*#__PURE__*/React__default.memo(function CellInner(_ref2) {
  var value = _ref2.value,
      isFirstColumn = _ref2.isFirstColumn,
      statusColor = _ref2.statusColor,
      StatusIcon = _ref2.StatusIcon,
      rawValue = _ref2.rawValue,
      categoryColor = _ref2.categoryColor,
      isLongValue = _ref2.isLongValue,
      isNearBottomEdge = _ref2.isNearBottomEdge,
      isNearRightEdge = _ref2.isNearRightEdge,
      stringWithLinks = _ref2.stringWithLinks,
      CellComponent = _ref2.CellComponent,
      _onMouseEnter = _ref2.onMouseEnter;
  return react.jsx("div", {
    css: [{
      "width": "100%",
      "height": "100%",
      "display": "flex",
      "flex": "none",
      "alignItems": "center",
      "paddingLeft": "1rem",
      "paddingRight": "1rem"
    }, typeof value === 'undefined' || Number.isNaN(value) && {
      "--tw-text-opacity": "1",
      "color": "rgba(209, 213, 219, var(--tw-text-opacity))"
    }],
    onMouseEnter: function onMouseEnter() {
      return _onMouseEnter == null ? void 0 : _onMouseEnter();
    },
    "data-tw": "w-full h-full flex flex-none items-center px-4 | text-gray-300"
  }, isFirstColumn && react.jsx("div", {
    css: [{
      "width": "1.5rem",
      "flex": "none"
    }, statusColor],
    "data-tw": "w-6 flex-none"
  }, StatusIcon && react.jsx(StatusIcon, null)), react.jsx(CellComponent, {
    value: value,
    formattedValue: stringWithLinks,
    rawValue: rawValue,
    categoryColor: categoryColor
  }), isLongValue && react.jsx("div", {
    className: "cell__long-value",
    css: [{
      "position": "absolute",
      "padding": "1rem",
      "paddingTop": "0.5rem",
      "paddingBottom": "0.5rem",
      "--tw-bg-opacity": "1",
      "backgroundColor": "rgba(255, 255, 255, var(--tw-bg-opacity))",
      "opacity": "0",
      "zIndex": "30",
      "borderWidth": "1px",
      "--tw-border-opacity": "1",
      "borderColor": "rgba(229, 231, 235, var(--tw-border-opacity))",
      "--tw-shadow": "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      "boxShadow": "var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)",
      "pointerEvents": "none",
      "wordBreak": "break-all",
      "textAlign": "left"
    }, isNearBottomEdge ? {
      "bottom": "0px"
    } : {
      "top": "0px"
    }, isNearRightEdge ? {
      "right": "0px"
    } : {
      "left": "0px"
    }],
    style: {
      width: 'max-content',
      maxWidth: '27em'
    },
    title: rawValue,
    "data-tw": "absolute p-4 py-2 bg-white opacity-0 z-30 border border-gray-200 shadow-md pointer-events-none break-all text-left | bottom-0 | top-0 | right-0 | left-0"
  }, react.jsx("div", {
    css: {
      "overflow": "hidden",
      "display": "-webkit-box",
      "WebkitBoxOrient": "vertical",
      "WebkitLineClamp": "9"
    },
    "data-tw": "line-clamp-9",
    dangerouslySetInnerHTML: {
      __html: stringWithLinks
    }
  })));
});

var Loader = function Loader() {
  return react.jsx("svg", {
    tw: "animate-pulse w-12 text-indigo-500",
    viewBox: "0 0 25 10"
  }, react.jsx("circle", {
    r: "2",
    cx: "5",
    cy: "5",
    fill: "currentColor",
    tw: "animate-bounce"
  }), react.jsx("circle", {
    r: "2",
    cx: "12",
    cy: "5",
    fill: "currentColor",
    tw: "animate-bounce",
    style: {
      animationDelay: '0.3s'
    }
  }), react.jsx("circle", {
    r: "2",
    cx: "19",
    cy: "5",
    fill: "currentColor",
    tw: "animate-bounce",
    style: {
      animationDelay: '0.6s'
    }
  }));
};

function Grid(props) {
  var _props$defaultSort;

  var downloadFilename = props.downloadFilename,
      _props$canDownload = props.canDownload,
      canDownload = _props$canDownload === void 0 ? true : _props$canDownload;

  var _React$useState = React__default.useState(),
      focusedColumnIndex = _React$useState[0],
      setFocusedColumnIndex = _React$useState[1];

  var _React$useState2 = React__default.useState(),
      highlightedDiffIndex = _React$useState2[0],
      setHighlightedDiffIndex = _React$useState2[1];

  var currentScrollYOffset = React__default.useRef(); // const [showFilters, setShowFilters] = React.useState(true);

  var showFilters = true;

  var _useGridStore = useGridStore(function (state) {
    return state;
  }),
      data = _useGridStore.data,
      columnNames = _useGridStore.columnNames,
      handleDataChange = _useGridStore.handleDataChange,
      handleDiffDataChange = _useGridStore.handleDiffDataChange,
      uniqueColumnName = _useGridStore.uniqueColumnName,
      diffs = _useGridStore.diffs,
      stickyColumnName = _useGridStore.stickyColumnName,
      sort = _useGridStore.sort,
      filteredData = _useGridStore.filteredData,
      filters = _useGridStore.filters,
      focusedRowIndex = _useGridStore.focusedRowIndex,
      handleFocusedRowIndexChange = _useGridStore.handleFocusedRowIndexChange,
      handleMetadataChange = _useGridStore.handleMetadataChange,
      handleFiltersChange = _useGridStore.handleFiltersChange,
      updateFilteredColumns = _useGridStore.updateFilteredColumns,
      updateColumnNames = _useGridStore.updateColumnNames,
      handleSortChange = _useGridStore.handleSortChange,
      handleStickyColumnNameChange = _useGridStore.handleStickyColumnNameChange,
      columnWidths = _useGridStore.columnWidths,
      updateColumnWidths = _useGridStore.updateColumnWidths,
      schema = _useGridStore.schema,
      cellTypes = _useGridStore.cellTypes,
      handleIsEditableChange = _useGridStore.handleIsEditableChange,
      updatedData = _useGridStore.updatedData,
      focusedCellPosition = _useGridStore.focusedCellPosition;

  React__default.useEffect(function () {
    var _ref$current;

    handleDataChange(props.data);
    if (!ref.current) return; // preserve scroll position

    if (focusedCellPosition) return; // @ts-ignore

    (_ref$current = ref.current) == null ? void 0 : _ref$current.scrollToItem({
      columnIndex: 0,
      rowIndex: 0,
      align: 'center'
    });
  }, [props.data]);
  React__default.useEffect(function () {
    if (!focusedCellPosition) return;
    if (!ref.current) return; // @ts-ignore

    var numberOfStickiedColumns = ref.current.props.numberOfStickiedColumns; // @ts-ignore

    var left = ref.current.state.scrollLeft;
    var columnIndex = focusedCellPosition[1];

    var sum = function sum(array) {
      return array.reduce(function (a, b) {
        return a + b;
      }, 0);
    };

    var stickyColumnWidth = sum(columnWidths.slice(0, numberOfStickiedColumns));
    var unstickyLeft = left + stickyColumnWidth;
    var leftTarget = sum(columnWidths.slice(0, columnIndex));
    var numberOfColumnsToOffsetStickyColumn = 0;
    var xOffset = sum(columnWidths.slice(columnIndex - numberOfColumnsToOffsetStickyColumn, columnIndex));

    while (leftTarget < unstickyLeft && xOffset < stickyColumnWidth && columnIndex > 0) {
      numberOfColumnsToOffsetStickyColumn += 1;
      xOffset = sum(columnWidths.slice(columnIndex - numberOfColumnsToOffsetStickyColumn, columnIndex));
    }

    columnIndex -= numberOfColumnsToOffsetStickyColumn; // @ts-ignore

    var rowHeight = ref.current.props.rowHeight(1); // @ts-ignore

    var headerHeight = ref.current.props.rowHeight(0); // @ts-ignore

    var top = ref.current.state.scrollTop; // @ts-ignore

    var footerHeight = rowHeight; // @ts-ignore

    var maxHeight = ref.current.props.height - footerHeight;
    var rowIndex = focusedCellPosition[0];
    var topTarget = headerHeight + rowHeight * rowIndex;

    if (topTarget > top + maxHeight) {
      rowIndex += 1;
    } // @ts-ignore


    ref.current.scrollToItem({
      rowIndex: rowIndex,
      columnIndex: columnIndex,
      align: 'nearest'
    });
  }, [focusedCellPosition]);
  React__default.useEffect(function () {
    if (props.metadata) handleMetadataChange(props.metadata);
  }, [props.metadata]);
  React__default.useEffect(function () {
    if (props.diffData) handleDiffDataChange(props.diffData);
  }, [props.diffData, props.data]);
  React__default.useEffect(function () {
    if (props.defaultFilters) handleFiltersChange(props.defaultFilters);
  }, [encodeFilterString(props.defaultFilters), props.data]);
  React__default.useEffect(function () {
    if (props.defaultSort) handleSortChange(props.defaultSort[0], props.defaultSort[1]);
  }, [(_props$defaultSort = props.defaultSort) == null ? void 0 : _props$defaultSort.join(',')]);
  React__default.useEffect(updateColumnNames, [props.data, stickyColumnName]);
  React__default.useEffect(function () {
    if (props.defaultStickyColumnName) handleStickyColumnNameChange(props.defaultStickyColumnName);
  }, [props.defaultStickyColumnName]);
  React__default.useEffect(function () {
    handleIsEditableChange(!!props.isEditable);
  }, [props.isEditable]);
  React__default.useEffect(function () {
    if (updatedData === null) return;
    if (!props.onEdit || !props.isEditable) return;
    props.onEdit(updatedData);
  }, [updatedData]);
  React__default.useEffect(updateFilteredColumns, [data, filters, sort]);
  React__default.useEffect(function () {
    if (typeof props.onChange !== 'function') return;
    if (!schema) return;
    var currentState = {
      stickyColumnName: stickyColumnName,
      columnNames: columnNames,
      filteredData: filteredData,
      diffs: diffs,
      filters: filters,
      sort: sort,
      schema: schema
    };
    props.onChange(currentState);
  }, [sort, stickyColumnName, encodeFilterString(filters)]);

  var scrollToTop = function scrollToTop() {
    var _ref$current2;

    // @ts-ignore
    ref == null ? void 0 : (_ref$current2 = ref.current) == null ? void 0 : _ref$current2.scrollToItem({
      rowIndex: 0
    });
  };

  React__default.useEffect(scrollToTop, [sort.join(",")]);
  var isFiltered = Object.keys(filters).length > 0;
  React__default.useEffect(updateColumnWidths, [columnNames, data]);
  var filteredDataWithOptionalEmptyRows = React__default.useMemo(function () {
    var res = [].concat(filteredData);

    if (props.isEditable) {
      var emptyRows = new Array(numberOfExtraRowsWhenEditing).fill(null).map(function () {
        return {};
      });
      res = [].concat(res, emptyRows);
    }

    return res;
  }, [filteredData, props.isEditable]);
  var columnWidthCallback = React__default.useCallback(function (i) {
    return columnWidths[i] || 150;
  }, [columnWidths.join(',')]);
  var rowHeightCallback = React__default.useCallback(function (i) {
    return i ? 25 : 117;
  }, []);
  var columnNamesWithOptionalEmptyColumn = React__default.useMemo(function () {
    var res = [].concat(columnNames);

    if (props.isEditable) {
      res = [].concat(res, ["__new-blank-column__"]);
    }

    return res;
  }, [columnNames, props.isEditable]);
  var columnWidthsWithOptionalEmptyColumn = React__default.useMemo(function () {
    var res = [].concat(columnWidths);

    if (props.isEditable) {
      res = [].concat(res, [columnWidthCallback(columnWidths.length)]);
    }

    return res;
  }, [columnNames, props.isEditable]);
  var columnScales = React__default.useMemo(function () {
    var scales = {};
    columnNamesWithOptionalEmptyColumn.forEach(function (columnName) {
      // @ts-ignore
      var cellType = cellTypes[columnName]; // @ts-ignore

      var cellInfo = cellTypeMap[cellType] || {};
      if (!cellInfo.hasScale) return;
      var scale = d3.scaleLinear() // @ts-ignore
      .domain(d3.extent(data, function (d) {
        return d[columnName];
      })) // @ts-ignore
      .range(['rgba(200,200,200,0)', 'rgba(224,231,255,1)']); // @ts-ignore

      scales[columnName] = scale;
    });
    return scales;
  }, [data]); // @ts-ignore

  var positiveDiffs = diffs.filter(function (d) {
    return d.__status__ === 'new';
  }); // @ts-ignore

  var negativeDiffs = diffs.filter(function (d) {
    return d.__status__ === 'old';
  }); // @ts-ignore

  var modifiedDiffs = diffs.filter(function (d) {
    return d.__status__ === 'modified';
  });
  var ref = useRespondToColumnChange([columnWidthsWithOptionalEmptyColumn]);

  var handleHighlightDiffChange = function handleHighlightDiffChange(delta) {
    if (delta === void 0) {
      delta = 0;
    }

    var newHighlight = 0;

    if (typeof highlightedDiffIndex !== 'number' && typeof currentScrollYOffset.current === 'number') {
      if (currentScrollYOffset.current === 0) {
        newHighlight = diffs.length;
      } else {
        var currentRowIndex = Math.round((currentScrollYOffset.current - 117) / 25) + 6;
        var nearestDiffIndex = d3.bisectLeft( // @ts-ignore
        diffs.map(function (d) {
          return d.__rowIndex__;
        }), currentRowIndex);
        newHighlight = delta < 0 ? nearestDiffIndex - 1 : nearestDiffIndex;
      }
    } else {
      newHighlight = ((highlightedDiffIndex || 0) + delta) % diffs.length;
    }

    if (newHighlight < 0) newHighlight = diffs.length + newHighlight;
    setHighlightedDiffIndex(newHighlight);
    var highlightedDiff = diffs[newHighlight] || {};
    if (!uniqueColumnName) return;
    var rowIndex = filteredData.findIndex( // @ts-ignore
    function (d) {
      return d[uniqueColumnName] === highlightedDiff[uniqueColumnName];
    });
    if (!ref.current) return; // @ts-ignore

    ref.current.scrollToItem({
      // columnIndex: 0,
      rowIndex: rowIndex,
      align: 'center'
    });
    handleFocusedRowIndexChange(rowIndex);
    setFocusedColumnIndex(undefined);
  };

  var onScroll = function onScroll(scrollInfo) {
    var scrollTop = scrollInfo.scrollTop,
        scrollUpdateWasRequested = scrollInfo.scrollUpdateWasRequested;
    if (scrollUpdateWasRequested) return; // @ts-ignore

    currentScrollYOffset.current = scrollTop;
    if (typeof highlightedDiffIndex !== 'number') return;
    setHighlightedDiffIndex(undefined);
  };

  var handleDownloadJson = function handleDownloadJson() {
    var dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(filteredData.map(function (d) {
      return fromPairs(columnNames.map(function (columnName) {
        return [columnName, d['__rawData__'][columnName] || d[columnName]];
      }));
    })));
    var link = document.createElement('a');
    link.setAttribute('href', dataStr);
    var date = new Date().toDateString();
    link.setAttribute('download', (downloadFilename || "flat-ui__data-" + date) + ".json");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  var handleDownloadCsv = function handleDownloadCsv() {
    var csvContent = [columnNames.map(function (columnName) {
      return columnName;
    }), filteredData.map(function (d) {
      return columnNames.map(function (columnName) {

        var data = d['__rawData__'][columnName] || d[columnName];
        var formattedData = typeof data === 'object' ? JSON.stringify(data) : data;

        if (typeof formattedData === 'string' && (formattedData.includes('"') || formattedData.includes(',') || formattedData.includes('\n'))) {
          formattedData = "\"" + formattedData.replace(/"/g, '""') + "\"";
        }

        return formattedData;
      }).join(',');
    }).join('\n')].join('\n');
    var blob = new Blob([csvContent], {
      type: 'text/csv;charset=utf-8;'
    });
    var url = URL.createObjectURL(blob);
    var link = document.createElement('a');
    link.setAttribute('href', url);
    var date = new Date().toDateString();
    link.setAttribute('download', (downloadFilename || "flat-ui__data-" + date) + ".csv");
    document.body.appendChild(link); // Required for FF

    link.click();
    document.body.removeChild(link);
  };

  if (!schema) return react.jsx("div", {
    css: {
      "position": "relative",
      "display": "flex",
      "justifyContent": "center",
      "--tw-bg-opacity": "1",
      "backgroundColor": "rgba(255, 255, 255, var(--tw-bg-opacity))",
      "width": "100%",
      "height": "100%"
    },
    "data-tw": "relative flex justify-center bg-white w-full h-full"
  }, react.jsx("div", {
    css: {
      "display": "flex",
      "flexDirection": "column",
      "justifyContent": "center",
      "alignItems": "center",
      "padding": "1rem",
      "zIndex": "10"
    },
    "data-tw": "flex flex-col justify-center items-center p-4 z-10"
  }, react.jsx(Loader, null), react.jsx("div", {
    css: {
      "fontWeight": "700",
      "fontSize": "1.125rem",
      "lineHeight": "1.75rem",
      "fontStyle": "italic",
      "paddingTop": "0.5rem"
    },
    "data-tw": "font-bold text-lg italic pt-2"
  }, "Loading...")), react.jsx("div", {
    css: {
      "position": "absolute",
      "top": "0px",
      "right": "0px",
      "bottom": "0px",
      "left": "0px",
      "zIndex": "0",
      "animation": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
    },
    "data-tw": "absolute inset-0 z-0 animate-pulse",
    style: {
      background: "linear-gradient(to bottom, #E5E7EB 1px, white 1px) 0 -4px",
      backgroundSize: '100% 25px'
    }
  }));
  if (!Object.keys(schema).length) return react.jsx("div", {
    css: {
      "position": "relative",
      "display": "flex",
      "justifyContent": "center",
      "--tw-bg-opacity": "1",
      "backgroundColor": "rgba(255, 255, 255, var(--tw-bg-opacity))",
      "width": "100%",
      "height": "100%"
    },
    "data-tw": "relative flex justify-center bg-white w-full h-full"
  }, react.jsx("div", {
    css: {
      "display": "flex",
      "flexDirection": "column",
      "justifyContent": "center",
      "alignItems": "center",
      "padding": "1rem",
      "zIndex": "10"
    },
    "data-tw": "flex flex-col justify-center items-center p-4 z-10"
  }, react.jsx("div", {
    css: {
      "fontWeight": "700",
      "fontSize": "1.125rem",
      "lineHeight": "1.75rem",
      "fontStyle": "italic",
      "paddingTop": "0.5rem"
    },
    "data-tw": "font-bold text-lg italic pt-2"
  }, "No valid data")));
  return react.jsx("div", {
    css: {
      "display": "flex",
      "flexDirection": "column",
      "height": "100%",
      "--tw-bg-opacity": "1",
      "backgroundColor": "rgba(255, 255, 255, var(--tw-bg-opacity))"
    },
    "data-tw": "flex flex-col h-full bg-white",
    className: "fade-up-in"
  }, react.jsx("div", {
    css: {
      "flex": "1 1 0%",
      "width": "100%",
      "height": "100%"
    },
    "data-tw": "flex-1 w-full h-full",
    style: {
      background: "linear-gradient(to bottom, #E5E7EB 1px, transparent 1px) 0 -4px",
      backgroundSize: "100% 25px"
    },
    onMouseLeave: function onMouseLeave() {
      return handleFocusedRowIndexChange(undefined);
    }
  }, react.jsx(AutoSizer, null, function (_ref) {
    var height = _ref.height,
        width = _ref.width;
    return react.jsx(StickyGrid, {
      ref: ref,
      height: height,
      width: width,
      rowCount: filteredDataWithOptionalEmptyRows.length + 1,
      columnWidth: columnWidthCallback,
      columnCount: columnNamesWithOptionalEmptyColumn.length,
      rowHeight: rowHeightCallback,
      columnWidths: columnWidthsWithOptionalEmptyColumn,
      numberOfStickiedColumns: width < 700 ? 0 : 1,
      overscanRowCount: 5,
      onScroll: onScroll,
      itemData: {
        filteredData: filteredDataWithOptionalEmptyRows,
        focusedRowIndex: focusedRowIndex,
        focusedColumnIndex: focusedColumnIndex,
        setFocusedColumnIndex: setFocusedColumnIndex,
        // @ts-ignore
        columnScales: columnScales,
        columnNames: columnNamesWithOptionalEmptyColumn,
        showFilters: showFilters
      } // // @ts-ignore
      // itemKey={({ rowIndex }) => {
      //   return filteredData[rowIndex].LongName;
      // }}
      ,
      HeaderComponent: HeaderWrapper
    }, CellWrapper);
  }), !!Object.keys(filters).length && !filteredData.length && react.jsx("div", {
    css: {
      "position": "absolute",
      "width": "100%",
      "display": "flex",
      "justifyContent": "center",
      "fontStyle": "italic",
      "--tw-text-opacity": "1",
      "color": "rgba(156, 163, 175, var(--tw-text-opacity))"
    },
    "data-tw": "absolute w-full flex justify-center italic text-gray-400",
    style: {
      marginTop: 165
    }
  }, "No data with those filters")), react.jsx("div", {
    css: {
      "flex": "none",
      "width": "100%",
      "display": "flex",
      "flexWrap": "wrap",
      "verticalAlign": "middle",
      "justifyContent": "space-between",
      "zIndex": "20",
      "--tw-bg-opacity": "1",
      "backgroundColor": "rgba(31, 41, 55, var(--tw-bg-opacity))",
      "--tw-text-opacity": "1",
      "color": "rgba(255, 255, 255, var(--tw-text-opacity))",
      "borderTopWidth": "1px",
      "--tw-border-opacity": "1",
      "borderColor": "rgba(229, 231, 235, var(--tw-border-opacity))",
      "fontSize": "0.875rem",
      "lineHeight": "1.25rem"
    },
    "data-tw": "flex-none w-full flex flex-wrap align-middle justify-between z-20 bg-gray-800 text-white border-t border-gray-200 text-sm"
  }, react.jsx("div", {
    css: {
      "display": "flex",
      "justifyContent": "center",
      "alignItems": "center",
      "paddingLeft": "1rem",
      "paddingRight": "1rem"
    },
    "data-tw": "flex justify-center items-center px-4"
  }, !!diffs.length && react.jsx(React__default.Fragment, null, "Changes:", react.jsx("div", {
    css: {
      "display": "flex",
      "paddingLeft": "0.5rem",
      "paddingRight": "0.5rem"
    },
    "data-tw": "flex px-2"
  }, !!positiveDiffs.length && react.jsx("div", {
    css: {
      "paddingLeft": "0.25rem",
      "paddingRight": "0.25rem",
      "paddingTop": "0.5rem",
      "paddingBottom": "0.5rem",
      "--tw-text-opacity": "1",
      "color": "rgba(16, 185, 129, var(--tw-text-opacity))",
      "fontWeight": "600"
    },
    "data-tw": "px-1 py-2 text-green-500 font-semibold"
  }, "+", positiveDiffs.length, " row", positiveDiffs.length === 1 ? '' : 's'), !!modifiedDiffs.length && react.jsx("div", {
    css: {
      "paddingLeft": "0.25rem",
      "paddingRight": "0.25rem",
      "paddingTop": "0.5rem",
      "paddingBottom": "0.5rem",
      "--tw-text-opacity": "1",
      "color": "rgba(245, 158, 11, var(--tw-text-opacity))",
      "fontWeight": "600"
    },
    "data-tw": "px-1 py-2 text-yellow-500 font-semibold"
  }, react.jsx("span", {
    style: {
      marginRight: 1
    }
  }, react.jsx(octiconsReact.DiffModifiedIcon, null)), modifiedDiffs.length, " row", modifiedDiffs.length === 1 ? '' : 's'), !!negativeDiffs.length && react.jsx("div", {
    css: {
      "paddingLeft": "0.25rem",
      "paddingRight": "0.25rem",
      "paddingTop": "0.5rem",
      "paddingBottom": "0.5rem",
      "--tw-text-opacity": "1",
      "color": "rgba(236, 72, 153, var(--tw-text-opacity))",
      "fontWeight": "600"
    },
    "data-tw": "px-1 py-2 text-pink-500 font-semibold"
  }, "-", negativeDiffs.length, " row", negativeDiffs.length === 1 ? '' : 's')), react.jsx("button", {
    css: {},
    "data-tw": "",
    onClick: function onClick() {
      return handleHighlightDiffChange(-1);
    }
  }, react.jsx(octiconsReact.ArrowLeftIcon, null)), react.jsx("div", {
    css: {
      "--tw-ordinal": "var(--tw-empty,/*!*/ /*!*/)",
      "--tw-slashed-zero": "var(--tw-empty,/*!*/ /*!*/)",
      "--tw-numeric-figure": "var(--tw-empty,/*!*/ /*!*/)",
      "--tw-numeric-spacing": "tabular-nums",
      "--tw-numeric-fraction": "var(--tw-empty,/*!*/ /*!*/)",
      "fontVariantNumeric": "var(--tw-ordinal) var(--tw-slashed-zero) var(--tw-numeric-figure) var(--tw-numeric-spacing) var(--tw-numeric-fraction)",
      "paddingLeft": "0.25rem",
      "paddingRight": "0.25rem",
      "textAlign": "center"
    },
    "data-tw": "tabular-nums px-1 text-center"
  }, typeof highlightedDiffIndex === 'number' ? highlightedDiffIndex + 1 : ''), react.jsx("button", {
    css: {},
    "data-tw": "",
    onClick: function onClick() {
      return handleHighlightDiffChange(1);
    }
  }, react.jsx(octiconsReact.ArrowRightIcon, null))), react.jsx("div", {
    css: {
      "margin": "0.5rem",
      "--tw-text-opacity": "1",
      "color": "rgba(229, 231, 235, var(--tw-text-opacity))",
      "whiteSpace": "nowrap"
    },
    "data-tw": "m-2 text-gray-200 whitespace-nowrap"
  }, "Showing ", filteredData.length.toLocaleString(), isFiltered && " of " + data.length.toLocaleString(), " row", data.length === 1 ? '' : 's', " \xD7 ", columnNames.length.toLocaleString(), " column", columnNames.length === 1 ? '' : 's')), react.jsx("div", {
    css: {
      "display": "flex",
      "alignItems": "center",
      "> :not([hidden]) ~ :not([hidden])": {
        "--tw-space-x-reverse": 0,
        "marginRight": "calc(0.5rem * var(--tw-space-x-reverse))",
        "marginLeft": "calc(0.5rem * calc(1 - var(--tw-space-x-reverse)))"
      },
      "margin": "0.5rem"
    },
    "data-tw": "flex items-center space-x-2 m-2"
  }, canDownload && react.jsx("span", {
    css: {
      "position": "relative",
      "zIndex": "0",
      "display": "inline-flex",
      "borderRadius": "9999px"
    },
    "data-tw": "relative z-0 inline-flex rounded-full"
  }, react.jsx("button", {
    onClick: handleDownloadCsv,
    type: "button",
    css: {
      "position": "relative",
      "> :not([hidden]) ~ :not([hidden])": {
        "--tw-space-x-reverse": 0,
        "marginRight": "calc(0.25rem * var(--tw-space-x-reverse))",
        "marginLeft": "calc(0.25rem * calc(1 - var(--tw-space-x-reverse)))"
      },
      "display": "inline-flex",
      "alignItems": "center",
      "paddingLeft": "0.75rem",
      "paddingRight": "0.75rem",
      "paddingTop": "0.5rem",
      "paddingBottom": "0.5rem",
      "borderTopLeftRadius": "9999px",
      "borderBottomLeftRadius": "9999px",
      "--tw-bg-opacity": "1",
      "backgroundColor": "rgba(0, 0, 0, var(--tw-bg-opacity))",
      ":hover": {
        "--tw-bg-opacity": "1",
        "backgroundColor": "rgba(17, 24, 39, var(--tw-bg-opacity))"
      },
      ":focus": {
        "--tw-bg-opacity": "1",
        "backgroundColor": "rgba(17, 24, 39, var(--tw-bg-opacity))",
        "zIndex": "10",
        "outline": "2px solid transparent",
        "outlineOffset": "2px",
        "--tw-ring-offset-shadow": "var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)",
        "--tw-ring-shadow": "var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color)",
        "boxShadow": "var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000)",
        "--tw-ring-opacity": "1",
        "--tw-ring-color": "rgba(99, 102, 241, var(--tw-ring-opacity))",
        "--tw-border-opacity": "1",
        "borderColor": "rgba(99, 102, 241, var(--tw-border-opacity))"
      },
      "fontSize": "0.875rem",
      "lineHeight": "1.25rem",
      "borderWidth": "1px",
      "--tw-border-opacity": "1",
      "borderColor": "rgba(31, 41, 55, var(--tw-border-opacity))"
    },
    "data-tw": "relative space-x-1 inline-flex items-center px-3 py-2 rounded-l-full bg-black hover:bg-gray-900 focus:bg-gray-900 text-sm border border-gray-800 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
  }, react.jsx(octiconsReact.DownloadIcon, null), react.jsx("span", null, isFiltered ? 'Filtered ' : '', " CSV")), react.jsx("button", {
    onClick: handleDownloadJson,
    type: "button",
    css: {
      "marginLeft": "-1px",
      "position": "relative",
      "> :not([hidden]) ~ :not([hidden])": {
        "--tw-space-x-reverse": 0,
        "marginRight": "calc(0.25rem * var(--tw-space-x-reverse))",
        "marginLeft": "calc(0.25rem * calc(1 - var(--tw-space-x-reverse)))"
      },
      "display": "inline-flex",
      "alignItems": "center",
      "paddingLeft": "0.75rem",
      "paddingRight": "0.75rem",
      "paddingTop": "0.5rem",
      "paddingBottom": "0.5rem",
      "borderTopRightRadius": "9999px",
      "borderBottomRightRadius": "9999px",
      "--tw-bg-opacity": "1",
      "backgroundColor": "rgba(0, 0, 0, var(--tw-bg-opacity))",
      ":hover": {
        "--tw-bg-opacity": "1",
        "backgroundColor": "rgba(17, 24, 39, var(--tw-bg-opacity))"
      },
      ":focus": {
        "--tw-bg-opacity": "1",
        "backgroundColor": "rgba(17, 24, 39, var(--tw-bg-opacity))",
        "zIndex": "10",
        "outline": "2px solid transparent",
        "outlineOffset": "2px",
        "--tw-ring-offset-shadow": "var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)",
        "--tw-ring-shadow": "var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color)",
        "boxShadow": "var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000)",
        "--tw-ring-opacity": "1",
        "--tw-ring-color": "rgba(99, 102, 241, var(--tw-ring-opacity))",
        "--tw-border-opacity": "1",
        "borderColor": "rgba(99, 102, 241, var(--tw-border-opacity))"
      },
      "fontSize": "0.875rem",
      "lineHeight": "1.25rem",
      "borderWidth": "1px",
      "--tw-border-opacity": "1",
      "borderColor": "rgba(31, 41, 55, var(--tw-border-opacity))"
    },
    "data-tw": "-ml-px relative space-x-1 inline-flex items-center px-3 py-2 rounded-r-full bg-black hover:bg-gray-900 focus:bg-gray-900 text-sm border border-gray-800 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
  }, react.jsx(octiconsReact.DownloadIcon, null), react.jsx("span", null, isFiltered ? 'Filtered ' : '', " JSON"))), isFiltered && react.jsx("button", {
    css: {
      "padding": "0.5rem",
      "paddingLeft": "1.5rem",
      "paddingRight": "1.5rem",
      "display": "flex",
      "justifyContent": "center",
      "alignItems": "center",
      "--tw-bg-opacity": "1",
      "backgroundColor": "rgba(0, 0, 0, var(--tw-bg-opacity))",
      "borderRadius": "9999px"
    },
    "data-tw": "p-2 px-6 flex justify-center items-center bg-black rounded-full",
    onClick: function onClick() {
      return handleFiltersChange();
    }
  }, react.jsx("span", {
    css: {
      "marginRight": "0.5rem"
    },
    "data-tw": "mr-2"
  }, react.jsx(octiconsReact.SyncIcon, null)), "Clear filters"))));
}
var numberOfExtraRowsWhenEditing = 1;

var CellWrapper = function CellWrapper(props) {
  var _ref2, _cellData$__rawData__, _cellTypeMap;

  var rawRowIndex = props.rowIndex,
      columnIndex = props.columnIndex,
      data = props.data,
      style = props.style;
  var focusedColumnIndex = data.focusedColumnIndex,
      setFocusedColumnIndex = data.setFocusedColumnIndex,
      columnScales = data.columnScales;

  var _useGridStore2 = useGridStore(),
      columnNames = _useGridStore2.columnNames,
      filteredData = _useGridStore2.filteredData,
      categoryValues = _useGridStore2.categoryValues,
      focusedRowIndex = _useGridStore2.focusedRowIndex,
      handleFocusedRowIndexChange = _useGridStore2.handleFocusedRowIndexChange,
      cellTypes = _useGridStore2.cellTypes,
      isEditable = _useGridStore2.isEditable,
      onCellChange = _useGridStore2.onCellChange,
      onRowDelete = _useGridStore2.onRowDelete,
      focusedCellPosition = _useGridStore2.focusedCellPosition,
      handleFocusedCellPositionChange = _useGridStore2.handleFocusedCellPositionChange;

  var name = columnNames[columnIndex];
  var rowIndex = rawRowIndex - 1;
  var onCellChangeLocal = React.useCallback(function (value) {
    onCellChange(rowIndex, name, value);
  }, [onCellChange, rowIndex, name]);
  var onRowDeleteLocal = React.useCallback(function () {
    onRowDelete(rowIndex);
  }, [onRowDelete, rowIndex]);
  var onFocusChangeLocal = React.useCallback(function (diff) {
    if (!diff) {
      handleFocusedCellPositionChange(null);
    } else {
      var diffRow = diff[0],
          diffColumn = diff[1];
      var newRowIndex = Math.max(0, Math.min(rowIndex + diffRow, filteredData.length - 1 + (isEditable ? numberOfExtraRowsWhenEditing : 0)));
      var newColumnIndex = Math.max(0, Math.min(columnIndex + diffColumn, columnNames.length - 1));
      var newPosition = [newRowIndex, newColumnIndex];
      handleFocusedCellPositionChange(newPosition);
    }
  }, [rowIndex, columnIndex, filteredData, isEditable]);
  var onMouseEnter = React.useCallback(function () {
    setFocusedColumnIndex(columnIndex);
    handleFocusedRowIndexChange(rowIndex);
  }, [columnIndex, handleFocusedRowIndexChange, rowIndex, setFocusedColumnIndex]);

  if (rowIndex == -1) {
    return react.jsx(HeaderWrapper, props);
  } // @ts-ignore


  var type = cellTypes[name];
  var cellData = filteredData[rowIndex] || (_ref2 = {}, _ref2[name] = "", _ref2); // if (!cellData) return null;

  var value = cellData[name];
  var rawValue = (_cellData$__rawData__ = cellData['__rawData__']) == null ? void 0 : _cellData$__rawData__[name]; // @ts-ignore

  var formattedValue = ((_cellTypeMap = cellTypeMap[type || ""]) == null ? void 0 : _cellTypeMap.format == null ? void 0 : _cellTypeMap.format(value, rawValue)) || value;
  var possibleValues = type === 'category' ? categoryValues[name] : [];
  var possibleValue = possibleValues == null ? void 0 : possibleValues.find(function (d) {
    return d.value === value;
  });
  var categoryColor = possibleValue == null ? void 0 : possibleValue.color;
  var status = cellData.__status__;

  if (status === 'modified') {
    var modifiedColumnNames = cellData.__modifiedColumnNames__ || [];
    status = modifiedColumnNames.includes(name) ? 'modified' : 'modified-row';
  } // @ts-ignore®


  var scale = columnScales && columnScales[name];
  var statusColors = new Map([['new', '#ECFDF5'], ['old', '#FDF2F8'], ['modified', '#FEFBEB']]);
  var focusedStatusColors = new Map([['new', '#D1FBE5'], ['old', '#FBE7F3'], ['modified', '#FEF2C7']]);
  var statusColor = focusedRowIndex == rowIndex ? focusedStatusColors.get(status) : statusColors.get(status); // prettier-ignore

  var backgroundColor = focusedColumnIndex == columnIndex && scale ? scale(value) : statusColor ? statusColor : focusedRowIndex == rowIndex ? '#f3f4f6' : '#fff';
  return react.jsx(CellWrapperComputed, {
    type: type,
    value: value,
    rawValue: rawValue,
    formattedValue: formattedValue,
    categoryColor: categoryColor,
    background: backgroundColor,
    style: style,
    status: status,
    isFirstColumn: columnIndex === 0,
    isExtraBlankRow: rowIndex === filteredData.length,
    isNearRightEdge: columnIndex > columnNames.length - 3,
    isNearBottomEdge: rowIndex > filteredData.length - 3,
    isEditable: isEditable,
    isFocused: !!(focusedCellPosition && focusedCellPosition[0] === rowIndex && focusedCellPosition[1] === columnIndex),
    onFocusChange: onFocusChangeLocal,
    onCellChange: onCellChangeLocal,
    onRowDelete: onRowDeleteLocal,
    onMouseEnter: onMouseEnter
  });
};

var CellWrapperComputed = /*#__PURE__*/React__default.memo(function (props) {
  return react.jsx(Cell, props);
}, function (props, newProps) {
  if (props.value != newProps.value) return false;
  if (props.type != newProps.type) return false;
  if (props.background != newProps.background) return false;
  if (props.style != newProps.style) return false;
  if (props.categoryColor != newProps.categoryColor) return false;
  if (props.status != newProps.status) return false;
  if (props.isNearRightEdge != newProps.isNearRightEdge) return false;
  if (props.isNearBottomEdge != newProps.isNearBottomEdge) return false;
  if (props.isExtraBlankRow != newProps.isExtraBlankRow) return false;
  if (props.isEditable != newProps.isEditable) return false;
  if (props.isFirstColumn != newProps.isFirstColumn) return false;
  if (props.isFocused != newProps.isFocused) return false;
  if (props.style.left != newProps.style.left) return false;
  if (props.style.top != newProps.style.top) return false;
  if (props.style.position != newProps.style.position) return false;
  if (props.style.display != newProps.style.display) return false;
  if (props.style.marginTop != newProps.style.marginTop) return false;
  if (props.style.marginLeft != newProps.style.marginLeft) return false;
  return true;
});

var HeaderWrapper = function HeaderWrapper(props) {
  var columnIndex = props.columnIndex,
      data = props.data,
      style = props.style;

  var _useGridStore3 = useGridStore(),
      originalData = _useGridStore3.data,
      columnNames = _useGridStore3.columnNames,
      columnWidths = _useGridStore3.columnWidths,
      stickyColumnName = _useGridStore3.stickyColumnName,
      handleStickyColumnNameChange = _useGridStore3.handleStickyColumnNameChange,
      filters = _useGridStore3.filters,
      handleFilterChange = _useGridStore3.handleFilterChange,
      filteredData = _useGridStore3.filteredData,
      metadata = _useGridStore3.metadata,
      sort = _useGridStore3.sort,
      categoryValues = _useGridStore3.categoryValues,
      handleSortChange = _useGridStore3.handleSortChange,
      focusedRowIndex = _useGridStore3.focusedRowIndex,
      cellTypes = _useGridStore3.cellTypes,
      isEditable = _useGridStore3.isEditable,
      handleFocusedCellPositionChange = _useGridStore3.handleFocusedCellPositionChange,
      onHeaderCellChange = _useGridStore3.onHeaderCellChange,
      onHeaderDelete = _useGridStore3.onHeaderDelete,
      onHeaderAdd = _useGridStore3.onHeaderAdd;

  var columnNameRef = React__default.useRef('');
  var showFilters = data.showFilters;
  var columnName = columnNames[columnIndex];
  columnNameRef.current = columnName;
  var columnWidth = columnWidths[columnIndex]; // @ts-ignore

  var cellType = cellTypes[columnName] || "string"; // @ts-ignore

  var cellInfo = cellTypeMap[cellType] || {};
  var onHeaderCellChangeLocal = React.useCallback(function (value) {
    onHeaderCellChange(columnName, value);
  }, [onHeaderCellChange, columnName]);
  var onHeaderDeleteLocal = React.useCallback(function () {
    onHeaderDelete(columnName);
  }, [onHeaderDelete, columnName]);
  var onHeaderAddLocal = React.useCallback(function (newColumnName) {
    onHeaderAdd(newColumnName);
    handleFocusedCellPositionChange([0, columnNames.length]);
  }, [onHeaderAdd, handleFocusedCellPositionChange, columnNames]);
  var onSticky = React.useCallback(function () {
    handleStickyColumnNameChange(columnName);
  }, [handleStickyColumnNameChange, columnName]);
  var onFilterChange = React.useCallback(function (value) {
    handleFilterChange(columnNameRef.current, value);
  }, [handleFilterChange, columnNameRef]);
  var maxColumns = isEditable ? columnNames.length + 1 : columnNames.length;
  if (columnIndex >= maxColumns) return null;
  var isNewColumn = isEditable && columnIndex === columnNames.length;
  var focusedValue = typeof focusedRowIndex == 'number' && filteredData[0] ? (filteredData[focusedRowIndex] || {})[columnName] : undefined;
  var activeSortDirection = sort[0] == columnName ? sort[1] : undefined;
  var isSticky = stickyColumnName === columnName;
  var possibleValues = cellType === 'category' ? categoryValues[columnName] : undefined;
  return react.jsx(HeaderWrapperComputed, {
    style: style,
    columnName: columnName,
    cellType: cellType,
    cellInfo: cellInfo,
    width: columnWidth,
    activeSortDirection: activeSortDirection,
    originalData: originalData,
    filteredData: filteredData,
    filter: filters[columnName],
    focusedValue: focusedValue,
    showFilters: showFilters,
    possibleValues: possibleValues,
    isSticky: isSticky,
    isNewColumn: isNewColumn,
    metadata: metadata[columnName],
    isFirstColumn: columnIndex === 0,
    isEditable: isEditable,
    onChange: onHeaderCellChangeLocal,
    onDelete: onHeaderDeleteLocal,
    onAdd: onHeaderAddLocal,
    onSort: handleSortChange,
    onSticky: onSticky,
    onFilterChange: onFilterChange
  });
};

var HeaderWrapperComputed = /*#__PURE__*/React__default.memo(function (props) {
  return react.jsx(Header, props);
}, function (props, newProps) {
  if (props.cellType != newProps.cellType) return false;
  if (props.columnName != newProps.columnName) return false;
  if (props.activeSortDirection != newProps.activeSortDirection) return false;
  if (props.filteredData != newProps.filteredData) return false;
  if (props.filter != newProps.filter) return false;
  if (props.width != newProps.width) return false;
  if (props.isSticky != newProps.isSticky) return false;
  if (props.isNewColumn != newProps.isNewColumn) return false;
  if (props.isEditable != newProps.isEditable) return false;
  if (props.focusedValue != newProps.focusedValue) return false;
  if (props.style.width != newProps.style.width) return false;
  if (props.style.left != newProps.style.left) return false;
  if (props.style.top != newProps.style.top) return false;
  if (props.style.position != newProps.style.position) return false;
  if (props.style.display != newProps.style.display) return false;
  if (props.style.marginTop != newProps.style.marginTop) return false;
  if (props.style.marginLeft != newProps.style.marginLeft) return false;
  return true;
});

function useRespondToColumnChange(deps) {
  var ref = React__default.useRef();
  React__default.useEffect(function () {
    if (ref.current) {
      // @ts-ignore
      ref.current.resetAfterIndices({
        columnIndex: 0,
        rowIndex: 0,
        shouldForceUpdate: true
      });
    }
  }, deps);
  return ref;
}

function encodeFilterString(filters) {
  if (!filters) return '';
  return encodeURI(Object.keys(filters).map(function (columnName) {
    var value = filters[columnName];
    return [columnName, typeof value === 'string' ? value : Array.isArray(value) ? value.join(',') : ''].join('=');
  }).join('&'));
}

function GridWrapper(props) {
  return react.jsx(StoreWrapper, null, react.jsx("div", {
    css: {
      "display": "flex",
      "flexDirection": "column",
      "height": "100%"
    },
    "data-tw": "flex flex-col h-full",
    className: "github-octo-flat-ui"
  }, react.jsx(Grid, props)));
}

exports.Grid = GridWrapper;
//# sourceMappingURL=flat-ui.cjs.development.js.map
