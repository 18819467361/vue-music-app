webpackJsonp([1],{"2hML":function(t,e){},MCX1:function(t,e){},MZZa:function(t,e){},"N/U/":function(t,e){},NHnr:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=s("7+uW"),a={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"m-header"},[e("div",{staticClass:"icon"}),this._v(" "),e("h1",{staticClass:"text"},[this._v("YJY Music")])])}]};var i={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"tab"},[e("router-link",{staticClass:"tab-item",attrs:{tag:"div","active-class":"active",to:"/recommend"}},[e("span",{staticClass:"tab-link"},[this._v("推荐")])]),this._v(" "),e("router-link",{staticClass:"tab-item",attrs:{tag:"div","active-class":"active",to:"/singer"}},[e("span",{staticClass:"tab-link"},[this._v("歌手")])]),this._v(" "),e("router-link",{staticClass:"tab-item",attrs:{tag:"div","active-class":"active",to:"/rank"}},[e("span",{staticClass:"tab-link"},[this._v("排行")])]),this._v(" "),e("router-link",{staticClass:"tab-item",attrs:{tag:"div","active-class":"active",to:"/search"}},[e("span",{staticClass:"tab-link"},[this._v("搜索")])])],1)},staticRenderFns:[]};var r={components:{MHeader:s("VU/8")({},a,!1,function(t){s("N/U/")},"data-v-266dd1be",null).exports,Tab:s("VU/8")({},i,!1,function(t){s("2hML")},"data-v-4b7dbb93",null).exports},name:"App"},o={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("m-header"),this._v(" "),e("tab"),this._v(" "),e("keep-alive",[e("router-view")],1)],1)},staticRenderFns:[]};var c=s("VU/8")(r,o,!1,function(t){s("xq8x")},null,null).exports,l=s("/ocq"),d=s("woOf"),h=s.n(d),u=s("PKY1"),v=s.n(u);var f={fetchData:function(t,e,s){t+=(t.indexOf("?")<0?"?":"&")+function(t){var e="";for(var s in t){var n=void 0!==t[s]?t[s]:"";e+="&"+s+"="+encodeURIComponent(n)}return e?e.substring(1):""}(e),v()(t,{jsonpCallbackFunction:"jsonp1"}).then(function(t){return t.json()}).then(function(t){s(t)}).catch(function(t){console.log("parseing failed",t)})}},m={g_tk:5381,inCharset:"utf-8",outCharset:"utf-8",notice:0,format:"jsonp",jsonpCallback:"jsonp1"};var p={data:function(){return{nowIndex:0,interval:3500,slideInterval:"",isLoad:!1,isShow:!0,delay:!1,slideTrans:"slide-trans-left",slideTransOld:"slide-trans-left-old"}},props:{slideData:Array,default:[]},computed:{},watch:{slideData:function(){""!==this.slideData&&(console.log("onwatch"),this.isLoad=!0,this.slideShow())}},mounted:function(){},methods:{slideShow:function(){var t=this;console.log("onslide");var e=this.slideData.length;null!==this.slideInterval&&(this.slideInterval=setInterval(function(){t.slideTrans="slide-trans-left",t.slideTransOld="slide-trans-left-old",t.isShow=!1,setTimeout(function(){t.nowIndex<e-1?t.nowIndex++:t.nowIndex=0,t.isShow=!t.isShow},10)},this.interval))},pauseShow:function(){clearInterval(this.slideInterval)},panRight:function(){var t=this,e=this;this.pauseShow(),!0===this.delay?setTimeout(function(){t.delay=!1},1e3):(this.delay=!0,console.log("fallback"),e.slideTransOld="slide-trans-right-old",e.isShow=!1,setTimeout(function(){e.slideTrans="slide-trans-right";var t=e.slideData.length;0!==e.nowIndex?e.nowIndex--:e.nowIndex=t-1,e.isShow=!0},10)),this.slideShow()},panLeft:function(){var t=this,e=this;this.pauseShow(),!0===this.delay?setTimeout(function(){t.delay=!1},1e3):(this.delay=!0,console.log("onahead"),e.isShow=!1,setTimeout(function(){var t=e.slideData.length;e.nowIndex<t-1?e.nowIndex++:e.nowIndex=0,e.isShow=!0},10)),this.slideShow()}}},_={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"slider"},[s("v-touch",{on:{panleft:t.panLeft,panright:t.panRight}},[t.isLoad?s("div",{staticClass:"slider-group"},[s("a",{staticClass:"slider-link",attrs:{href:t.slideData[t.nowIndex].linkUrl}},[s("transition",{attrs:{name:t.slideTrans}},[t.isShow?s("img",{staticClass:"slider-img",attrs:{src:t.slideData[t.nowIndex].picUrl}}):t._e()]),t._v(" "),s("transition",{attrs:{name:t.slideTransOld}},[t.isShow?t._e():s("img",{staticClass:"slider-img",attrs:{src:t.slideData[t.nowIndex].picUrl}})])],1)]):t._e(),t._v(" "),s("div",{staticClass:"dots-wrapper"},[t.isLoad?s("div",{staticClass:"dots"},t._l(t.slideData,function(e,n){return s("span",{key:n,class:["dotsKey",{active:n===t.nowIndex}]})})):t._e()])])],1)},staticRenderFns:[]};var w={data:function(){return{recommends:[]}},components:{Slider:s("VU/8")(p,_,!1,function(t){s("sGRI")},"data-v-1475f18a",null).exports},created:function(){this._fetchRecommend()},methods:{_fetchRecommend:function(){var t,e;t=this.setComponents,e=h()({},m,{platform:"h5",uin:0,needNewCode:1}),f.fetchData("https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg",e,t)},setComponents:function(t){0===t.code&&(this.recommends=t.data),console.log(this.recommends,"component")}}},C={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"recommend"},[e("div",{staticClass:"recommend-content"},[e("div",{staticClass:"slider-wrapper"},[e("slider",{attrs:{slideData:this.recommends.slider}})],1),this._v(" "),this._m(0)])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"recommend-list"},[e("h1",{staticClass:"list-title"},[this._v("热门歌单推荐")]),this._v(" "),e("ul",[e("li")])])}]};var g=s("VU/8")(w,C,!1,function(t){s("MZZa")},"data-v-4c14ff7b",null).exports,x={render:function(){var t=this.$createElement;return(this._self._c||t)("div",{staticClass:"m-header"},[this._v("\n 歌手页面\n")])},staticRenderFns:[]};var b=s("VU/8")({},x,!1,function(t){s("Q7mO")},"data-v-2205353c",null).exports,I={render:function(){var t=this.$createElement;return(this._self._c||t)("div",{staticClass:"m-header"},[this._v("\n  搜索页面\n")])},staticRenderFns:[]};var k=s("VU/8")({},I,!1,function(t){s("sz3/")},"data-v-74ca4a85",null).exports,S={render:function(){var t=this.$createElement;return(this._self._c||t)("div",{staticClass:"m-header"},[this._v("\n  排行页面\n")])},staticRenderFns:[]};var R=s("VU/8")({},S,!1,function(t){s("MCX1")},"data-v-523ecbde",null).exports;n.a.use(l.a);var T=new l.a({routes:[{path:"/",redirect:"/recommend"},{path:"/recommend",component:g},{path:"/singer",component:b},{path:"/rank",component:R},{path:"/search",component:k}]}),y=(s("j1ja"),s("v5o6")),U=s.n(y),D=s("I0MY"),E=s.n(D);U.a.attach(document.body),n.a.config.productionTip=!1,n.a.use(E.a,{name:"v-touch"}),new n.a({el:"#app",router:T,components:{App:c},template:"<App/>"})},Q7mO:function(t,e){},sGRI:function(t,e){},"sz3/":function(t,e){},xq8x:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.783bbff907a1d8904070.js.map