(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-manager-blindbox-mint~pages-manager-normal-mint"],{"0e09":function(e,t,r){"use strict";var n=r("46d4"),a=r.n(n);a.a},"257e":function(e,t,r){"use strict";function n(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}Object.defineProperty(t,"__esModule",{value:!0}),t.default=n},"262e":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=i;var n=a(r("b380"));function a(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&(0,n.default)(e,t)}},"2caf":function(e,t,r){"use strict";r("4ae1"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=o;var n=u(r("7e84")),a=u(r("d967")),i=u(r("99de"));function u(e){return e&&e.__esModule?e:{default:e}}function o(e){var t=(0,a.default)();return function(){var r,a=(0,n.default)(e);if(t){var u=(0,n.default)(this).constructor;r=Reflect.construct(a,arguments,u)}else r=a.apply(this,arguments);return(0,i.default)(this,r)}}},"46d4":function(e,t,r){var n=r("9d91");"string"===typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);var a=r("4f06").default;a("020f17e1",n,!0,{sourceMap:!1,shadowMode:!1})},"4ea8":function(e,t,r){"use strict";r.r(t);var n=r("b935"),a=r.n(n);for(var i in n)"default"!==i&&function(e){r.d(t,e,(function(){return n[e]}))}(i);t["default"]=a.a},"53ca":function(e,t,r){"use strict";function n(e){return"function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?t.default=n=function(e){return typeof e}:t.default=n=function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},n(e)}r("a4d3"),r("e01a"),r("d28b"),r("d3b7"),r("3ca3"),r("ddb0"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=n},6062:function(e,t,r){"use strict";var n=r("6d61"),a=r("6566");e.exports=n("Set",(function(e){return function(){return e(this,arguments.length?arguments[0]:void 0)}}),a)},"7e84":function(e,t,r){"use strict";function n(e){return t.default=n=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},n(e)}r("3410"),r("131a"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=n},"901d":function(e,t,r){"use strict";r.r(t);var n=r("b81a"),a=r("4ea8");for(var i in a)"default"!==i&&function(e){r.d(t,e,(function(){return a[e]}))}(i);r("0e09");var u,o=r("f0c5"),s=Object(o["a"])(a["default"],n["b"],n["c"],!1,null,"29eb240c",null,!1,n["a"],u);t["default"]=s.exports},"99de":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=u;var n=i(r("53ca")),a=i(r("257e"));function i(e){return e&&e.__esModule?e:{default:e}}function u(e,t){return!t||"object"!==(0,n.default)(t)&&"function"!==typeof t?(0,a.default)(e):t}},"9d91":function(e,t,r){var n=r("24fb");t=n(!1),t.push([e.i,'@charset "UTF-8";\n/* 水平间距 */\n/* 水平间距 */',""]),e.exports=t},b380:function(e,t,r){"use strict";function n(e,r){return t.default=n=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},n(e,r)}r("131a"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=n},b81a:function(e,t,r){"use strict";var n;r.d(t,"b",(function(){return a})),r.d(t,"c",(function(){return i})),r.d(t,"a",(function(){return n}));var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-uni-view",{staticClass:"uni-forms",class:{"uni-forms--top":!e.border}},[r("v-uni-form",{on:{submit:function(t){t.stopPropagation(),arguments[0]=t=e.$handleEvent(t),e.submitForm.apply(void 0,arguments)},reset:function(t){arguments[0]=t=e.$handleEvent(t),e.resetForm.apply(void 0,arguments)}}},[e._t("default")],2)],1)},i=[]},b935:function(e,t,r){"use strict";var n=r("4ea4");r("99af"),r("7db0"),r("4160"),r("c975"),r("a9e3"),r("b64b"),r("d3b7"),r("ac1f"),r("25f0"),r("5319"),r("1276"),r("159b"),r("ddb0"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=n(r("ade3"));r("96cf");var i=n(r("1da1")),u=n(r("e143")),o=n(r("ed1a"));u.default.prototype.binddata=function(e,t,r){if(r)this.$refs[r].setValue(e,t);else{var n;for(var a in this.$refs){var i=this.$refs[a];if(i&&i.$options&&"uniForms"===i.$options.name){n=i;break}}if(!n)return console.error("当前 uni-froms 组件缺少 ref 属性");n.setValue(e,t)}};var s={name:"uniForms",components:{},emits:["input","reset","validate","submit"],props:{value:{type:Object,default:function(){return{}}},modelValue:{type:Object,default:function(){return{}}},rules:{type:Object,default:function(){return{}}},validateTrigger:{type:String,default:""},labelPosition:{type:String,default:"left"},labelWidth:{type:[String,Number],default:""},labelAlign:{type:String,default:"left"},errShowType:{type:String,default:"undertext"},border:{type:Boolean,default:!1}},data:function(){return{formData:{}}},computed:{dataValue:function(){return"{}"===JSON.stringify(this.modelValue)?this.value:this.modelValue}},watch:{rules:function(e){this.init(e)},labelPosition:function(){this.childrens.forEach((function(e){e.init()}))}},created:function(){this.unwatchs=[],this.childrens=[],this.inputChildrens=[],this.checkboxChildrens=[],this.formRules=[],this.init(this.rules)},methods:{init:function(e){0!==Object.keys(e).length?(this.formRules=e,this.validator=new o.default(e),this.registerWatch()):this.formData=this.dataValue},registerWatch:function(){var e=this;this.unwatchs.forEach((function(e){return e()})),this.childrens.forEach((function(e){e.init()})),Object.keys(this.dataValue).forEach((function(t){var r=e.$watch("dataValue."+t,(function(r){if(r)if("[object Object]"===r.toString())for(var n in r){var a="".concat(t,"[").concat(n,"]");e.formData[a]=e._getValue(a,r[n])}else e.formData[t]=e._getValue(t,r)}),{deep:!0,immediate:!0});e.unwatchs.push(r)}))},setRules:function(e){this.init(e)},setValue:function(e,t,r){var n=this.childrens.find((function(t){return t.name===e}));return n?(t=this._getValue(n.name,t),this.formData[e]=t,n.val=t,n.triggerCheck(t,r)):null},resetForm:function(e){var t=this;this.childrens.forEach((function(e){e.errMsg="";var r=t.inputChildrens.find((function(t){return t.rename===e.name}));r&&(r.errMsg="",r.is_reset=!0,r.$emit("input",r.multiple?[]:""),r.$emit("update:modelValue",r.multiple?[]:""))})),this.childrens.forEach((function(e){e.name&&(t.formData[e.name]=t._getValue(e.name,""))})),this.$emit("reset",e)},validateCheck:function(e){null===e&&(e=null),this.$emit("validate",e)},validateAll:function(e,t,r,n){var a=this;return(0,i.default)(regeneratorRuntime.mark((function i(){var u,o,s,l,c,f,d,m,h,p,v,b,g;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:for(s in u=[],o=function(e){var t=a.childrens.find((function(t){return t.name===e}));t&&u.push(t)},e)o(s);if(n||"function"!==typeof r||(n=r),!n&&"function"!==typeof n&&Promise&&(l=new Promise((function(e,t){n=function(r,n){r?t(r):e(n)}}))),c=[],f={},!a.validator){i.next=25;break}i.t0=regeneratorRuntime.keys(u);case 9:if((i.t1=i.t0()).done){i.next=23;break}return d=i.t1.value,m=u[d],h=m.isArray?m.arrayField:m.name,m.isArray?-1!==m.name.indexOf("[")&&-1!==m.name.indexOf("]")&&(p=m.name.split("["),v=p[0],b=p[1].replace("]",""),f[v]||(f[v]={}),f[v][b]=a._getValue(h,e[h])):f[h]=a._getValue(h,e[h]),i.next=16,m.triggerCheck(e[h],!0);case 16:if(g=i.sent,!g){i.next=21;break}if(c.push(g),"toast"!==a.errShowType&&"modal"!==a.errShowType){i.next=21;break}return i.abrupt("break",23);case 21:i.next=9;break;case 23:i.next=26;break;case 25:f=e;case 26:if(Array.isArray(c)&&0===c.length&&(c=null),Array.isArray(r)&&r.forEach((function(e){f[e]=a.dataValue[e]})),"submit"===t?a.$emit("submit",{detail:{value:f,errors:c}}):a.$emit("validate",c),n&&"function"===typeof n&&n(c,f),!l||!n){i.next=34;break}return i.abrupt("return",l);case 34:return i.abrupt("return",null);case 35:case"end":return i.stop()}}),i)})))()},submitForm:function(){},submit:function(e,t,r){var n=this,a=function(e){var t=n.childrens.find((function(t){return t.name===e}));t&&void 0===n.formData[e]&&(n.formData[e]=n._getValue(e,n.dataValue[e]))};for(var i in this.dataValue)a(i);return r||console.warn("submit 方法即将废弃，请使用validate方法代替！"),this.validateAll(this.formData,"submit",e,t)},validate:function(e,t){return this.submit(e,t,!0)},validateField:function(e,t){var r=this;e=[].concat(e);var n={};return this.childrens.forEach((function(t){-1!==e.indexOf(t.name)&&(n=Object.assign({},n,(0,a.default)({},t.name,r.formData[t.name])))})),this.validateAll(n,"submit",[],t)},resetFields:function(){this.resetForm()},clearValidate:function(e){var t=this;e=[].concat(e),this.childrens.forEach((function(r){var n=t.inputChildrens.find((function(e){return e.rename===r.name}));(0===e.length||-1!==e.indexOf(r.name))&&(r.errMsg="",n&&(n.errMsg=""))}))},_getValue:function(e,t){var r=this,n=this.formRules[e]&&this.formRules[e].rules||[],a=n.find((function(e){return e.format&&r.type_filter(e.format)})),i=n.find((function(e){return e.format&&"boolean"===e.format||"bool"===e.format}));return a&&(t=isNaN(t)?t:""===t||null===t?null:Number(t)),i&&(t=!!t),t},type_filter:function(e){return"int"===e||"double"===e||"number"===e||"timestamp"===e}}};t.default=s},d967:function(e,t,r){"use strict";function n(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}r("d3b7"),r("4ae1"),r("25f0"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=n},ed1a:function(e,t,r){"use strict";var n=r("4ea4");r("99af"),r("4de4"),r("c740"),r("4160"),r("c975"),r("b64b"),r("d3b7"),r("e25e"),r("4d63"),r("ac1f"),r("25f0"),r("6062"),r("3ca3"),r("466d"),r("5319"),r("2ca0"),r("ddb0"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=n(r("262e")),i=n(r("2caf"));r("96cf");var u=n(r("1da1")),o=n(r("d4ec")),s=n(r("bee2")),l={email:/^\S+?@\S+?\.\S+?$/,idcard:/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,url:new RegExp("^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$","i")},c={int:"integer",bool:"boolean",double:"number",long:"number",password:"string"};function f(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",r=["label"];r.forEach((function(t){void 0===e[t]&&(e[t]="")}));var n=t;for(var a in e){var i=new RegExp("{"+a+"}");n=n.replace(i,e[a])}return n}function d(e,t){return void 0===e||null===e||("string"===typeof e&&!e||(!(!Array.isArray(e)||e.length)||"object"===t&&!Object.keys(e).length))}var m={integer:function(e){return m.number(e)&&parseInt(e,10)===e},string:function(e){return"string"===typeof e},number:function(e){return!isNaN(e)&&"number"===typeof e},boolean:function(e){return"boolean"===typeof e},float:function(e){return m.number(e)&&!m.integer(e)},array:function(e){return Array.isArray(e)},object:function(e){return"object"===typeof e&&!m.array(e)},date:function(e){return e instanceof Date},timestamp:function(e){return!(!this.integer(e)||Math.abs(e).toString().length>16)},file:function(e){return"string"===typeof e.url},email:function(e){return"string"===typeof e&&!!e.match(l.email)&&e.length<255},url:function(e){return"string"===typeof e&&!!e.match(l.url)},pattern:function(e,t){try{return new RegExp(e).test(t)}catch(r){return!1}},method:function(e){return"function"===typeof e},idcard:function(e){return"string"===typeof e&&!!e.match(l.idcard)},"url-https":function(e){return this.url(e)&&e.startsWith("https://")},"url-scheme":function(e){return e.startsWith("://")},"url-web":function(e){return!1}},h=function(){function e(t){(0,o.default)(this,e),this._message=t}return(0,s.default)(e,[{key:"validateRule",value:function(){var e=(0,u.default)(regeneratorRuntime.mark((function e(t,r,n,a,i){var u,o,s,l,c,f,d,m,h;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(u=null,o=r.rules,s=o.findIndex((function(e){return e.required})),!(s<0)){e.next=8;break}if(null!==n&&void 0!==n){e.next=6;break}return e.abrupt("return",u);case 6:if("string"!==typeof n||n.length){e.next=8;break}return e.abrupt("return",u);case 8:if(l=this._message,void 0!==o){e.next=11;break}return e.abrupt("return",l["default"]);case 11:c=0;case 12:if(!(c<o.length)){e.next=35;break}if(f=o[c],d=this._getValidateType(f),Object.assign(f,{label:r.label||'["'.concat(t,'"]')}),!p[d]){e.next=20;break}if(u=p[d](f,n,l),null==u){e.next=20;break}return e.abrupt("break",35);case 20:if(!f.validateExpr){e.next=26;break}if(m=Date.now(),h=f.validateExpr(n,i,m),!1!==h){e.next=26;break}return u=this._getMessage(f,f.errorMessage||this._message["default"]),e.abrupt("break",35);case 26:if(!f.validateFunction){e.next=32;break}return e.next=29,this.validateFunction(f,n,a,i,d);case 29:if(u=e.sent,null===u){e.next=32;break}return e.abrupt("break",35);case 32:c++,e.next=12;break;case 35:return null!==u&&(u=l.TAG+u),e.abrupt("return",u);case 37:case"end":return e.stop()}}),e,this)})));function t(t,r,n,a,i){return e.apply(this,arguments)}return t}()},{key:"validateFunction",value:function(){var e=(0,u.default)(regeneratorRuntime.mark((function e(t,r,n,a,i){var u,o,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return u=null,e.prev=1,o=null,e.next=5,t.validateFunction(t,r,a||n,(function(e){o=e}));case 5:s=e.sent,(o||"string"===typeof s&&s||!1===s)&&(u=this._getMessage(t,o||s,i)),e.next=12;break;case 9:e.prev=9,e.t0=e["catch"](1),u=this._getMessage(t,e.t0.message,i);case 12:return e.abrupt("return",u);case 13:case"end":return e.stop()}}),e,this,[[1,9]])})));function t(t,r,n,a,i){return e.apply(this,arguments)}return t}()},{key:"_getMessage",value:function(e,t,r){return f(e,t||e.errorMessage||this._message[r]||t["default"])}},{key:"_getValidateType",value:function(e){var t="";return e.required?t="required":e.format?t="format":e.arrayType?t="arrayTypeFormat":e.range?t="range":void 0!==e.maximum||void 0!==e.minimum?t="rangeNumber":void 0!==e.maxLength||void 0!==e.minLength?t="rangeLength":e.pattern?t="pattern":e.validateFunction&&(t="validateFunction"),t}}]),e}(),p={required:function(e,t,r){return e.required&&d(t,e.format||typeof t)?f(e,e.errorMessage||r.required):null},range:function(e,t,r){for(var n=e.range,a=e.errorMessage,i=new Array(n.length),u=0;u<n.length;u++){var o=n[u];m.object(o)&&void 0!==o.value?i[u]=o.value:i[u]=o}var s=!1;return Array.isArray(t)?s=new Set(t.concat(i)).size===i.length:i.indexOf(t)>-1&&(s=!0),s?null:f(e,a||r["enum"])},rangeNumber:function(e,t,r){if(!m.number(t))return f(e,e.errorMessage||r.pattern.mismatch);var n=e.minimum,a=e.maximum,i=e.exclusiveMinimum,u=e.exclusiveMaximum,o=i?t<=n:t<n,s=u?t>=a:t>a;return void 0!==n&&o?f(e,e.errorMessage||r["number"][i?"exclusiveMinimum":"minimum"]):void 0!==a&&s?f(e,e.errorMessage||r["number"][u?"exclusiveMaximum":"maximum"]):void 0!==n&&void 0!==a&&(o||s)?f(e,e.errorMessage||r["number"].range):null},rangeLength:function(e,t,r){if(!m.string(t)&&!m.array(t))return f(e,e.errorMessage||r.pattern.mismatch);var n=e.minLength,a=e.maxLength,i=t.length;return void 0!==n&&i<n?f(e,e.errorMessage||r["length"].minLength):void 0!==a&&i>a?f(e,e.errorMessage||r["length"].maxLength):void 0!==n&&void 0!==a&&(i<n||i>a)?f(e,e.errorMessage||r["length"].range):null},pattern:function(e,t,r){return m["pattern"](e.pattern,t)?null:f(e,e.errorMessage||r.pattern.mismatch)},format:function(e,t,r){var n=Object.keys(m),a=c[e.format]?c[e.format]:e.format||e.arrayType;return n.indexOf(a)>-1&&!m[a](t)?f(e,e.errorMessage||r.typeError):null},arrayTypeFormat:function(e,t,r){if(!Array.isArray(t))return f(e,e.errorMessage||r.typeError);for(var n=0;n<t.length;n++){var a=t[n],i=this.format(e,a,r);if(null!==i)return i}return null}},v=function(e){(0,a.default)(r,e);var t=(0,i.default)(r);function r(e,n){var a;return(0,o.default)(this,r),a=t.call(this,r.message),a._schema=e,a._options=n||null,a}return(0,s.default)(r,[{key:"updateSchema",value:function(e){this._schema=e}},{key:"validate",value:function(){var e=(0,u.default)(regeneratorRuntime.mark((function e(t,r){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(n=this._checkFieldInSchema(t),n){e.next=5;break}return e.next=4,this.invokeValidate(t,!1,r);case 4:n=e.sent;case 5:return e.abrupt("return",n.length?n[0]:null);case 6:case"end":return e.stop()}}),e,this)})));function t(t,r){return e.apply(this,arguments)}return t}()},{key:"validateAll",value:function(){var e=(0,u.default)(regeneratorRuntime.mark((function e(t,r){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(n=this._checkFieldInSchema(t),n){e.next=5;break}return e.next=4,this.invokeValidate(t,!0,r);case 4:n=e.sent;case 5:return e.abrupt("return",n);case 6:case"end":return e.stop()}}),e,this)})));function t(t,r){return e.apply(this,arguments)}return t}()},{key:"validateUpdate",value:function(){var e=(0,u.default)(regeneratorRuntime.mark((function e(t,r){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(n=this._checkFieldInSchema(t),n){e.next=5;break}return e.next=4,this.invokeValidateUpdate(t,!1,r);case 4:n=e.sent;case 5:return e.abrupt("return",n.length?n[0]:null);case 6:case"end":return e.stop()}}),e,this)})));function t(t,r){return e.apply(this,arguments)}return t}()},{key:"invokeValidate",value:function(){var e=(0,u.default)(regeneratorRuntime.mark((function e(t,r,n){var a,i,u,o,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:a=[],i=this._schema,e.t0=regeneratorRuntime.keys(i);case 3:if((e.t1=e.t0()).done){e.next=15;break}return u=e.t1.value,o=i[u],e.next=8,this.validateRule(u,o,t[u],t,n);case 8:if(s=e.sent,null==s){e.next=13;break}if(a.push({key:u,errorMessage:s}),r){e.next=13;break}return e.abrupt("break",15);case 13:e.next=3;break;case 15:return e.abrupt("return",a);case 16:case"end":return e.stop()}}),e,this)})));function t(t,r,n){return e.apply(this,arguments)}return t}()},{key:"invokeValidateUpdate",value:function(){var e=(0,u.default)(regeneratorRuntime.mark((function e(t,r,n){var a,i,u;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:a=[],e.t0=regeneratorRuntime.keys(t);case 2:if((e.t1=e.t0()).done){e.next=13;break}return i=e.t1.value,e.next=6,this.validateRule(i,this._schema[i],t[i],t,n);case 6:if(u=e.sent,null==u){e.next=11;break}if(a.push({key:i,errorMessage:u}),r){e.next=11;break}return e.abrupt("break",13);case 11:e.next=2;break;case 13:return e.abrupt("return",a);case 14:case"end":return e.stop()}}),e,this)})));function t(t,r,n){return e.apply(this,arguments)}return t}()},{key:"_checkFieldInSchema",value:function(e){var t=Object.keys(e),n=Object.keys(this._schema);if(new Set(t.concat(n)).size===n.length)return"";var a=t.filter((function(e){return n.indexOf(e)<0})),i=f({field:JSON.stringify(a)},r.message.TAG+r.message["defaultInvalid"]);return[{key:"invalid",errorMessage:i}]}}]),r}(h);function b(){return{TAG:"",default:"验证错误",defaultInvalid:"提交的字段{field}在数据库中并不存在",validateFunction:"验证无效",required:"{label}必填",enum:"{label}超出范围",timestamp:"{label}格式无效",whitespace:"{label}不能为空",typeError:"{label}类型无效",date:{format:"{label}日期{value}格式无效",parse:"{label}日期无法解析,{value}无效",invalid:"{label}日期{value}无效"},length:{minLength:"{label}长度不能少于{minLength}",maxLength:"{label}长度不能超过{maxLength}",range:"{label}必须介于{minLength}和{maxLength}之间"},number:{minimum:"{label}不能小于{minimum}",maximum:"{label}不能大于{maximum}",exclusiveMinimum:"{label}不能小于等于{minimum}",exclusiveMaximum:"{label}不能大于等于{maximum}",range:"{label}必须介于{minimum}and{maximum}之间"},pattern:{mismatch:"{label}格式不匹配"}}}v.message=new b;var g=v;t.default=g}}]);