(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-manager-destory"],{"1a19":function(t,n,a){var e=a("24fb");n=e(!1),n.push([t.i,'@charset "UTF-8";\n/* 水平间距 */\n/* 水平间距 */.topSpace[data-v-031cad40]{width:100%;background-color:grey;text-align:center}.topSpace .t[data-v-031cad40]{line-height:1.8;font-size:%?40?%;font-weight:bolder}.xh[data-v-031cad40]{margin-top:%?2?%;padding:%?50?%;background-color:#fff}',""]),t.exports=n},"1e56":function(t,n,a){"use strict";var e=a("4ea4");a("a9e3"),Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;e(a("64c8"));var o=a("4f87"),i=o.getETH(),u={data:function(){return{data:{tokenId:""}}},onLoad:function(){o.ready()},methods:{cllickXH:function(){var t=this,n=o.getNFT();console.log("cllickXH:",this.data),this.data.tokenId&&Number(this.data.tokenId)&&i.getAccounts((function(a,e){if(!a){var o=e[0];n.methods.burn(t.data.tokenId).send({from:o},(function(t,n){console.log("burn:",t,n),t?uni.showToast({title:"销毁失败"}):uni.showToast({title:"销毁成功"})}))}}))}}};n.default=u},"1fd6":function(t,n,a){"use strict";a.d(n,"b",(function(){return o})),a.d(n,"c",(function(){return i})),a.d(n,"a",(function(){return e}));var e={navigation:a("64c8").default,uniFormsItem:a("9d02").default,uniEasyinput:a("b335").default},o=function(){var t=this,n=t.$createElement,a=t._self._c||n;return a("v-uni-view",[a("navigation",{attrs:{address:!0}}),a("v-uni-view",{staticClass:"topSpace"},[a("v-uni-text",{staticClass:"t"},[t._v("销毁")])],1),a("v-uni-view",{staticClass:"xh"},[a("uni-forms-item",{attrs:{required:!0,name:"tokenId",label:"tokenId"}},[a("uni-easyinput",{attrs:{type:"number",placeholder:"请输入需要销毁的tokenId"},model:{value:t.data.tokenId,callback:function(n){t.$set(t.data,"tokenId",n)},expression:"data.tokenId"}})],1),a("v-uni-button",{on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.cllickXH.apply(void 0,arguments)}}},[t._v("销毁")])],1)],1)},i=[]},4346:function(t,n,a){var e=a("1a19");"string"===typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);var o=a("4f06").default;o("7d3ef65f",e,!0,{sourceMap:!1,shadowMode:!1})},5186:function(t,n,a){"use strict";var e=a("4346"),o=a.n(e);o.a},5308:function(t,n,a){"use strict";a.r(n);var e=a("1fd6"),o=a("f783");for(var i in o)"default"!==i&&function(t){a.d(n,t,(function(){return o[t]}))}(i);a("5186");var u,r=a("f0c5"),c=Object(r["a"])(o["default"],e["b"],e["c"],!1,null,"031cad40",null,!1,e["a"],u);n["default"]=c.exports},f783:function(t,n,a){"use strict";a.r(n);var e=a("1e56"),o=a.n(e);for(var i in e)"default"!==i&&function(t){a.d(n,t,(function(){return e[t]}))}(i);n["default"]=o.a}}]);