(function(e){function t(t){for(var n,r,o=t[0],c=t[1],l=t[2],d=0,m=[];d<o.length;d++)r=o[d],Object.prototype.hasOwnProperty.call(i,r)&&i[r]&&m.push(i[r][0]),i[r]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(e[n]=c[n]);u&&u(t);while(m.length)m.shift()();return s.push.apply(s,l||[]),a()}function a(){for(var e,t=0;t<s.length;t++){for(var a=s[t],n=!0,o=1;o<a.length;o++){var c=a[o];0!==i[c]&&(n=!1)}n&&(s.splice(t--,1),e=r(r.s=a[0]))}return e}var n={},i={app:0},s=[];function r(t){if(n[t])return n[t].exports;var a=n[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,r),a.l=!0,a.exports}r.m=e,r.c=n,r.d=function(e,t,a){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},r.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(r.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(a,n,function(t){return e[t]}.bind(null,n));return a},r.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=t,o=o.slice();for(var l=0;l<o.length;l++)t(o[l]);var u=c;s.push([0,"chunk-vendors"]),a()})({0:function(e,t,a){e.exports=a("56d7")},"0006":function(e,t,a){e.exports=a.p+"img/bg-1.97a8fab2.png"},"174c":function(e,t,a){"use strict";var n=a("9da2"),i=a.n(n);i.a},1771:function(e,t,a){var n={"./bg-1.png":"0006","./bg-1_white.png":"4ff1","./csharplogo.png":"91b2","./logo.png":"cf05","./logo.svg":"9b19"};function i(e){var t=s(e);return a(t)}function s(e){if(!a.o(n,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return n[e]}i.keys=function(){return Object.keys(n)},i.resolve=s,e.exports=i,i.id="1771"},"391e":function(e,t,a){"use strict";var n=a("cc49"),i=a.n(n);i.a},"3d85":function(e,t,a){},"4ff1":function(e,t,a){e.exports=a.p+"img/bg-1_white.4be2098c.png"},"56d7":function(e,t,a){"use strict";a.r(t);var n={};a.r(n),a.d(n,"default",(function(){return ut}));var i={};a.r(i),a.d(i,"default",(function(){return dt}));a("d3b7"),a("ac1f"),a("5319"),a("e260"),a("e6cf"),a("cca6"),a("a79d");var s=a("2b0e"),r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-app",[a("v-layout",{attrs:{"fill-height":""}},[a("Sidebar"),a("v-main",[a("router-view")],1)],1),a("v-snackbar",{staticClass:"sp-snackbar",staticStyle:{"margin-left":"8%"},attrs:{value:e.showAlert,"multi-line":!0,timeout:e.timeout},on:{input:e.hideAlert}},[a("div",{class:[e.alertType+"--text"],staticStyle:{display:"flex","align-items":"center",margin:"auto"}},[a("v-icon",{class:[e.alertType+"--text"],staticStyle:{"margin-right":"20px"},attrs:{color:"white"}},[e._v(e._s(e.alertIcon))]),e._v(" "+e._s(e.message)+" ")],1),a("v-btn",{staticStyle:{position:"absolute",right:"16px",top:"8px",", font-size":"12px"},attrs:{icon:"",text:""},on:{click:e.hideAlert}},[a("v-icon",{attrs:{color:"white"}},[e._v("mdi-close")])],1)],1)],1)},o=[],c=a("5530"),l=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-navigation-drawer",{attrs:{permanent:"",color:"primary",dark:"","fill-height":""}},[e.loggedIn&&e.userInfo?a("v-list",[a("v-list-item",{staticClass:"px-2"}),a("v-list-item",{attrs:{link:""}},[a("v-list-item-content",[a("v-list-item-title",{staticClass:"title"},[e._v(" "+e._s(e.userInfo.firstName+" "+e.userInfo.lastName)+" ")]),a("v-list-item-subtitle",[e._v(e._s(e.userInfo.email))]),a("v-list-item-subtitle",[e._v(e._s(e.userInfo.userName))])],1)],1)],1):e._e(),a("v-divider"),a("v-list",{attrs:{nav:"",dense:""}},[e.loggedIn?a("v-list-item",{attrs:{link:""}},[a("v-list-item-icon",[a("v-icon",[e._v("mdi-account-multiple")])],1),a("v-list-item-title",[e._v("Ustwienia konta")])],1):e._e(),e.loggedIn?a("v-list-item",{attrs:{link:""}},[a("v-list-item-icon",[a("v-icon",[e._v("mdi-clipboard-list-outline")])],1),a("v-list-item-title",[e._v("Lista zamówień")])],1):e._e(),e.loggedIn?a("v-list-item",{attrs:{link:"",to:"/menu"}},[a("v-list-item-icon",[a("v-icon",[e._v("mdi-book-open-outline")])],1),a("v-list-item-title",[e._v("Oferta")])],1):e._e(),e.loggedIn?a("v-list-item",{attrs:{link:"",to:"/list"}},[a("v-list-item-icon",[a("v-icon",[e._v("mdi-account-child-outline")])],1),a("v-list-item-title",[e._v("Lista podopiecznych")])],1):e._e(),e.loggedIn?e._e():a("v-list-item",{attrs:{link:"",to:"/login"}},[a("v-list-item-icon",[a("v-icon",[e._v("mdi-account-arrow-left-outline")])],1),a("v-list-item-title",[e._v("Logowanie")])],1),e.loggedIn?a("v-list-item",{attrs:{link:"",to:"/permissions"}},[a("v-list-item-icon",[a("v-icon",[e._v("mdi-account-box-multiple-outline")])],1),a("v-list-item-title",[e._v("Prawa użytkowników")])],1):e._e(),a("v-list-item",{attrs:{link:"",to:"/about"}},[a("v-list-item-icon",[a("v-icon",[e._v("mdi-information-outline")])],1),a("v-list-item-title",[e._v("O nas")])],1),e.loggedIn?a("v-list-item",{attrs:{to:"/login"},on:{click:e.logout}},[a("v-list-item-icon",[a("v-icon",[e._v("mdi-account-arrow-right-outline")])],1),a("v-list-item-title",[e._v("Wyloguj")])],1):e._e()],1)],1)},u=[],d=a("2f62"),m={computed:Object(c["a"])({},Object(d["c"])("user",["userInfo","loggedIn","userInfo"])),methods:Object(c["a"])({},Object(d["b"])("user",["logout"]))},p=m,f=a("2877"),v=a("6544"),b=a.n(v),g=a("ce7e"),h=a("132d"),k=a("8860"),y=a("da13"),w=a("5d23"),_=a("34c3"),x=a("f774"),j=Object(f["a"])(p,l,u,!1,null,null,null),O=j.exports;b()(j,{VDivider:g["a"],VIcon:h["a"],VList:k["a"],VListItem:y["a"],VListItemContent:w["a"],VListItemIcon:_["a"],VListItemSubtitle:w["b"],VListItemTitle:w["c"],VNavigationDrawer:x["a"]});var V={components:{Sidebar:O},name:"App",data:function(){return{}},computed:Object(c["a"])(Object(c["a"])({},Object(d["c"])("user",["userInfo","loggedIn"])),Object(d["c"])("toastMessage",["timeout","alertType","alertIcon","message","showAlert"])),methods:Object(c["a"])({},Object(d["b"])("toastMessage",["hideAlert"]))},z=V,P=(a("9b56"),a("7496")),I=a("8336"),A=a("a722"),T=a("f6c4"),C=a("2db4"),U=Object(f["a"])(z,r,o,!1,null,"8b4a093e",null),N=U.exports;b()(U,{VApp:P["a"],VBtn:I["a"],VIcon:h["a"],VLayout:A["a"],VMain:T["a"],VSnackbar:C["a"]});var S=a("8c4f"),E=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-container",{staticClass:"container-custom",style:{backgroundImage:"url("+a("4ff1")+")"},attrs:{"fill-height":"",fluid:""}},[n("v-row",{attrs:{justify:"center",align:"center"}},[n("v-col",[n("h1",[e._v(" Fit Kid Catering "),n("svg",{attrs:{viewBox:"0 0 72 72",xmlns:"http://www.w3.org/2000/svg"}},[n("path",{attrs:{fill:"#b1cc33",stroke:"#b1cc33","stroke-miterlimit":"10","stroke-width":"2",d:"M57.4 40.6l5-.8-.3-1a2.948 2.948 0 002.1-3.7 3.087 3.087 0 00-1.7-2 5.075 5.075 0 001.264-3.134A4.906 4.906 0 0063.1 27.3a5.097 5.097 0 00-5.7-2.3 2.961 2.961 0 00-3.3-3.7 4.978 4.978 0 00-8.5-4.4 3.102 3.102 0 00-2.1-2.2 3.44 3.44 0 00-2.6.5 4.956 4.956 0 00-4.7-3.4 4.846 4.846 0 00-4.8 3.8 2.803 2.803 0 00-2.9-.8 3.087 3.087 0 00-2 1.7 4.974 4.974 0 00-5.8-.6 5.097 5.097 0 00-2.3 5.7 2.961 2.961 0 00-3.7 3.3 4.978 4.978 0 00-4.4 8.5 2.99 2.99 0 00-.1 5.8v1l3.1.7"}}),n("circle",{attrs:{cx:"21.697",cy:"34.3",r:"6",fill:"#ea5a47"}}),n("circle",{attrs:{cx:"36.697",cy:"33.3",r:"6",fill:"#ea5a47"}}),n("circle",{attrs:{cx:"51.697",cy:"33.3",r:"6",fill:"#ea5a47"}}),n("path",{attrs:{fill:"#fff",d:"M65 35a29 29 0 01-58 0z"}}),n("path",{attrs:{fill:"#d0cfce",d:"M49 35c0 16-4 29-13 29a29.02 29.02 0 0029-29z"}}),n("g",{attrs:{fill:"none",stroke:"#000","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2"}},[n("path",{attrs:{d:"M50.27 28.202a5.162 5.162 0 012.98.04 5.83 5.83 0 012.56 1.689M33.277 29.229a5.829 5.829 0 012.828-1.187 5.16 5.16 0 012.937.512M17.584 30.93a5.83 5.83 0 012.56-1.689 5.161 5.161 0 012.98-.039"}}),n("path",{attrs:{d:"M63.65 30.936a4.905 4.905 0 00-.55-3.536 5.097 5.097 0 00-5.7-2.3 2.961 2.961 0 00-3.3-3.7 4.978 4.978 0 00-8.5-4.4 3.102 3.102 0 00-2.1-2.2 3.44 3.44 0 00-2.6.5 4.956 4.956 0 00-4.7-3.4 4.846 4.846 0 00-4.8 3.8 2.803 2.803 0 00-2.9-.8 3.087 3.087 0 00-2 1.7 4.974 4.974 0 00-5.8-.6 5.097 5.097 0 00-2.3 5.7 2.961 2.961 0 00-3.7 3.3 5.036 5.036 0 00-5.3 2.4 4.755 4.755 0 00-.644 2.886M65 35a29 29 0 01-58 0z"}})])])]),n("validation-observer",{ref:"observer"},[n("form",[n("validation-provider",{attrs:{name:"Name",rules:"required|max:256"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.errors;return[n("v-text-field",{attrs:{color:"primary","error-messages":a,label:"Nazwa użytkownika",required:""},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}})]}}])}),n("validation-provider",{attrs:{name:"password",rules:"required|max:256"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.errors;return[n("v-text-field",{attrs:{"error-messages":a,color:"primary",label:"Hasło",required:"",name:"password","append-icon":e.pass?"visibility":"visibility_off",type:e.pass?"password":"text"},on:{"click:append":function(){return e.pass=!e.pass}},model:{value:e.myPass,callback:function(t){e.myPass=t},expression:"myPass"}})]}}])}),n("v-btn",{staticClass:"mr-4 login-btn",attrs:{color:"accent",outlined:""},on:{click:e.submit}},[e._v(" zaloguj ")]),n("v-btn",{staticClass:"login-btn",attrs:{color:"primary",outlined:""},on:{click:e.clear}},[e._v(" wyczyść ")]),n("v-card",{attrs:{flat:""}},[n("v-card-title",{staticClass:"card-title"},[e._v("nie masz konta? "),n("v-btn",{staticClass:"register-btn",attrs:{text:"",small:"",color:"teal",to:"/register"}},[e._v("Zarejestruj się")])],1)],1)],1)])],1)],1)],1)},L=[],M=(a("b0c0"),a("4c93")),D=a("7bb1");Object(D["d"])("eager"),Object(D["c"])("required",Object(c["a"])(Object(c["a"])({},M["c"]),{},{message:"to pole nie może być puste"})),Object(D["c"])("max",Object(c["a"])(Object(c["a"])({},M["a"]),{},{message:"pole nie może być dłuższe niż 256 znaków"})),Object(D["c"])("min",Object(c["a"])(Object(c["a"])({},M["a"]),{},{message:"pole nie może być krótsze niż 4 znaki"}));var R={components:{ValidationProvider:D["b"],ValidationObserver:D["a"]},data:function(){return{name:"",email:"",select:null,errors:null,pass:String,myPass:"",dialog:!1}},methods:Object(c["a"])(Object(c["a"])({},Object(d["b"])("user",["login"])),{},{submit:function(){this.$refs.observer.validate()&&this.login({username:this.name,password:this.myPass})},clear:function(){this.myPass="",this.name="",this.$refs.observer.reset()}}),computed:Object(c["a"])({},Object(d["c"])("user",["userInfo","loggedIn"])),beforeMount:function(){this.loggedIn&&this.$router.push("/menu")}},q=R,$=(a("391e"),a("b0af")),B=a("99d9"),K=a("62ad"),F=a("a523"),J=a("0fd9"),W=a("8654"),G=Object(f["a"])(q,E,L,!1,null,"20d9484d",null),H=G.exports;b()(G,{VBtn:I["a"],VCard:$["a"],VCardTitle:B["d"],VCol:K["a"],VContainer:F["a"],VRow:J["a"],VTextField:W["a"]});var Z=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-container",{staticClass:"container-custom",style:{backgroundImage:"url("+a("4ff1")+")"},attrs:{"fill-height":"",fluid:""}},[n("v-row",{attrs:{justify:"center",align:"center"}},[n("v-col",[n("h1",[e._v("Rejestracja")]),n("validation-observer",{ref:"observer"},[n("form",[n("validation-provider",{attrs:{name:"Name",rules:"required|min:6|max:256"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.errors;return[n("v-text-field",{attrs:{color:"primary","error-messages":a,label:"Nazwa",required:""},model:{value:e.nick,callback:function(t){e.nick=t},expression:"nick"}})]}}])}),n("validation-provider",{attrs:{name:"Name",rules:"required|max:256"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.errors;return[n("v-text-field",{attrs:{color:"primary","error-messages":a,label:"Imię",required:""},model:{value:e.surname,callback:function(t){e.surname=t},expression:"surname"}})]}}])}),n("validation-provider",{attrs:{name:"Name",rules:"required|max:256"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.errors;return[n("v-text-field",{attrs:{color:"primary","error-messages":a,label:"Nazwisko",required:""},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}})]}}])}),n("validation-provider",{attrs:{name:"Email",rules:"required|max:256"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.errors;return[n("v-text-field",{attrs:{color:"primary","error-messages":a,label:"Adres E-mail",required:""},model:{value:e.email,callback:function(t){e.email=t},expression:"email"}})]}}])}),n("ValidationObserver",[n("validation-provider",{attrs:{name:"password",rules:"required|max:256|password:@confirm|min:6"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.errors;return[n("v-text-field",{attrs:{"error-messages":a,color:"primary",label:"Hasło",required:"",name:"password","append-icon":e.pass?"visibility":"visibility_off",type:e.pass?"password":"text"},on:{"click:append":function(){return e.pass=!e.pass}},model:{value:e.myPass,callback:function(t){e.myPass=t},expression:"myPass"}})]}}])}),n("validation-provider",{attrs:{name:"confirm",rules:"required|max:256|min:6"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.errors;return[n("v-text-field",{attrs:{"error-messages":a,color:"primary",label:"Powtórz hasło",required:"",name:"password1","append-icon":e.pass1?"visibility":"visibility_off",type:e.pass1?"password":"text"},on:{"click:append":function(){return e.pass1=!e.pass1}},model:{value:e.confirmation,callback:function(t){e.confirmation=t},expression:"confirmation"}})]}}])})],1),n("v-btn",{staticClass:"mr-4 login-btn",attrs:{color:"accent",outlined:""},on:{click:e.submit}},[e._v(" zarejestruj ")])],1)])],1)],1)],1)},Q=[];Object(D["d"])("eager"),Object(D["c"])("required",Object(c["a"])(Object(c["a"])({},M["c"]),{},{message:"to pole nie może być puste"})),Object(D["c"])("max",Object(c["a"])(Object(c["a"])({},M["a"]),{},{message:"pole nie może być dłuższe niż 256 znaków"})),Object(D["c"])("min",Object(c["a"])(Object(c["a"])({},M["b"]),{},{message:"pole nie może być krótsze niż 6 znaków"})),Object(D["c"])("password",{params:["target"],validate:function(e,t){var a=t.target;return e===a},message:"Hasła muszą być identyczne!"});var X={components:{ValidationProvider:D["b"],ValidationObserver:D["a"]},data:function(){return{nick:"",surname:"",myPass:"",myPass1:"",name:"",lastname:"",email:"",confirmation:"",pass:!0,pass1:!0}},methods:Object(c["a"])(Object(c["a"])({},Object(d["b"])("user",["register"])),{},{submit:function(){var e=this;this.$refs.observer.validate().then((function(t){t&&e.register({username:e.nick,password:e.myPass,email:e.email,firstname:e.surname,lastname:e.name})}))}}),computed:Object(c["a"])({},Object(d["c"])("user",["userInfo","loggedIn"])),beforeMount:function(){this.loggedIn&&this.$router.push("/")}},Y=X,ee=(a("9cab"),Object(f["a"])(Y,Z,Q,!1,null,"1e57ee62",null)),te=ee.exports;b()(ee,{VBtn:I["a"],VCol:K["a"],VContainer:F["a"],VRow:J["a"],VTextField:W["a"]});var ae=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-container",{staticClass:"container-custom",style:{backgroundImage:"url("+a("4ff1")+")"},attrs:{fluid:""}},[n("v-container",[n("v-row",{attrs:{justify:"center","align-content":"center"}},[n("v-col",{attrs:{md:"6"}},[n("h1",[e._v("About")]),n("br"),n("h4",[e._v(" Jesteśmy firmą cateringową z Pcimia Dolnego, która od 35 lat zapewnia smaczne i zdrowe posiłki dla przedszkoli. Zapoznajcie się z naszą ofertą i znajdźcie coś dla siebie! ")]),n("br"),n("h2",[e._v("Autorzy:")])])],1),n("v-row",{attrs:{justify:"center"}},e._l(e.people,(function(e){return n("AboutCard",{key:e.id,attrs:{person:e}})})),1)],1)],1)},ne=[],ie=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-col",{attrs:{md:"2"}},[n("v-card",{attrs:{elevation:"10"}},[n("v-img",{attrs:{src:a("1771")("./"+e.person.logo),contain:"","max-height":"150px",gradient:"to bottom, rgba(255,255,255,.5), rgba(255,255,255,.5)"}},[n("v-card-title",[e._v(e._s(e.person.surname)+" "+e._s(e.person.name))]),n("v-card-subtitle",[e._v(e._s(e.person.description))]),n("v-card-actions",[n("v-btn",{attrs:{href:e.person.link,color:"deep-purple lighten-2",text:"",target:"_blank"}},[e._v("GITHUB ")])],1)],1)],1)],1)},se=[],re={name:"AboutCard",props:{person:Object}},oe=re,ce=a("adda"),le=Object(f["a"])(oe,ie,se,!1,null,null,null),ue=le.exports;b()(le,{VBtn:I["a"],VCard:$["a"],VCardActions:B["a"],VCardSubtitle:B["b"],VCardTitle:B["d"],VCol:K["a"],VImg:ce["a"]});var de={name:"About",components:{AboutCard:ue},data:function(){return{people:[{id:"1",name:"Magdalena",surname:"Kochman",description:"Kierownik projektu, front-end Vue.js",link:"https://github.com/Magda98",logo:"logo.png"},{id:"2",name:"Piotr",surname:"Knapik",description:"Back-end C#",link:"https://github.com/WhiteRaidho",logo:"csharplogo.png"},{id:"3",name:"Jakub",surname:"Kida",description:"Back-end C#",link:"https://github.com/JKida10",logo:"csharplogo.png"},{id:"4",name:"Kamil",surname:"Król",description:"Front-end Vue.js",link:"https://github.com/krolik1337",logo:"logo.png"}]}}},me=de,pe=(a("174c"),Object(f["a"])(me,ae,ne,!1,null,"f7c1180e",null)),fe=pe.exports;b()(pe,{VCol:K["a"],VContainer:F["a"],VRow:J["a"]});var ve=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-container",{attrs:{"fill-height":""}})},be=[],ge={data:function(){return{}}},he=ge,ke=Object(f["a"])(he,ve,be,!1,null,null,null),ye=ke.exports;b()(ke,{VContainer:F["a"]});var we=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-container",{staticClass:"container",style:{backgroundImage:"url("+a("4ff1")+")"},attrs:{"fill-height":"",fluid:""}},[n("v-container",{style:{top:"70px",position:"absolute"}},[n("v-row",{attrs:{justify:"center"}},[n("h1",[e._v("Oferta:")]),n("br")]),n("v-row",{attrs:{justify:"center"}},[n("v-tabs",{attrs:{centered:"","background-color":"light-green accent-1"},model:{value:e.tab,callback:function(t){e.tab=t},expression:"tab"}},[n("v-tabs-slider",{attrs:{color:"black"}}),e._l(e.days,(function(t){return n("v-tab",{key:t},[e._v(" "+e._s(t)+" ")])}))],2),n("br")],1),n("v-row",{attrs:{justify:"center",align:"center"}},[n("v-col",{attrs:{md:"10"}},[n("v-tabs-items",{model:{value:e.tab,callback:function(t){e.tab=t},expression:"tab"}},e._l(e.days,(function(t){return n("v-tab-item",{key:t},[n("v-card",{attrs:{elevation:"3"}},[n("v-card-title",[e._v(" Jadłospis "),n("v-spacer"),n("v-text-field",{attrs:{"append-icon":"mdi-magnify",label:"Wyszukaj","single-line":"","hide-details":""},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}})],1),n("v-data-table",{attrs:{headers:e.headers,items:e._dishes(t),search:e.search,"show-select":"","multi-sort":"","hide-default-footer":""},model:{value:e.selected,callback:function(t){e.selected=t},expression:"selected"}})],1)],1)})),1),n("br"),n("v-btn",{attrs:{block:"",elevation:"3",color:"light-green accent-1"},on:{click:e.order}},[e._v("Dodaj do zamówienia")])],1)],1)],1)],1)},_e=[],xe=(a("4de4"),a("4160"),a("159b"),{name:"Menu",components:{},methods:{_dishes:function(e){return this.dishes.filter((function(t){return t.day==e}))},order:function(){var e=[];function t(t){e.push(t.id)}this.selected.forEach(t),alert("Do zamówienia dodano posiłki o id: "+e)}},data:function(){return{tab:null,search:"",selected:[],days:["Poniedziałek","Wtorek","Środa","Czwartek","Piątek","Sobota","Niedziela"],headers:[{text:"Posiłek",align:"start",sortable:!0,value:"name"},{text:"Rodzaj",value:"type"},{text:"Cena (PLN)",value:"price"}],dishes:[{id:1,name:"Pierogi Ruskie",price:"21.37",type:"Obiad jednodaniowy",day:"Poniedziałek"},{id:2,name:"Jajecznica",price:"12.34",type:"Śniadanie",day:"Poniedziałek"},{id:3,name:"Barszcz biały z jajkiem i kiełbasą",price:"21.37",type:"Obiad jednodaniowy",day:"Poniedziałek"},{id:4,name:"Rosół + kotlet schabowy z ziemniakami i surówką",price:"21.37",type:"Obiad dwudaniowy",day:"Poniedziałek"},{id:5,name:"Gofery z dżemorem",price:"21.37",type:"Podwieczorek",day:"Poniedziałek"},{id:6,name:"Pierogi Ruskie",price:"21.37",type:"Obiad jednodaniowy",day:"Wtorek"},{id:7,name:"Jajecznica",price:"12.34",type:"Śniadanie",day:"Wtorek"},{id:8,name:"Cebulon",price:"21.37",type:"Obiad jednodaniowy",day:"Wtorek"},{id:9,name:"Rosół + kotlet schabowy z ziemniakami i surówką",price:"21.37",type:"Obiad dwudaniowy",day:"Wtorek"},{id:10,name:"Gofery z dżemorem",price:"21.37",type:"Podwieczorek",day:"Wtorek"}]}}}),je=xe,Oe=(a("9653"),a("8fea")),Ve=a("2fa4"),ze=a("71a3"),Pe=a("c671"),Ie=a("fe57"),Ae=a("aac8"),Te=a("9a96"),Ce=Object(f["a"])(je,we,_e,!1,null,"c5671bba",null),Ue=Ce.exports;b()(Ce,{VBtn:I["a"],VCard:$["a"],VCardTitle:B["d"],VCol:K["a"],VContainer:F["a"],VDataTable:Oe["a"],VRow:J["a"],VSpacer:Ve["a"],VTab:ze["a"],VTabItem:Pe["a"],VTabs:Ie["a"],VTabsItems:Ae["a"],VTabsSlider:Te["a"],VTextField:W["a"]});var Ne=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-container",{attrs:{"fill-height":""}},[a("OrderList",{attrs:{kidList:e.listaDzieci}})],1)},Se=[],Ee=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-container",e._l(e.kidList,(function(t,n){return a("v-row",{key:n},[a("v-card",{staticClass:"ma-5",attrs:{elevation:"4",outlined:""}},[a("v-card-title",[e._v(e._s(t.name))]),a("v-card-text",[e._v(e._s(t.institution))]),a("v-card-actions",[a("v-btn",{attrs:{link:"",to:"list/"+t.id,color:"secondary",text:""}},[e._v(" Lista zamówień ")])],1)],1)],1)})),1)},Le=[],Me={props:{kidList:Array},beforeMount:function(){}},De=Me,Re=Object(f["a"])(De,Ee,Le,!1,null,null,null),qe=Re.exports;b()(Re,{VBtn:I["a"],VCard:$["a"],VCardActions:B["a"],VCardText:B["c"],VCardTitle:B["d"],VContainer:F["a"],VRow:J["a"]});var $e={components:{OrderList:qe},data:function(){return{listaDzieci:[{id:1,name:"Jan Kowalski",institution:"Szkoła podstawowa Łańcut",institutuionID:"SP10",parent:"Adam nowak"},{id:2,name:"Alicja Adams",institution:"Szkoła podstawowa Łańcut",institutuionID:"SP10",parent:"Adam Nowal"}]}}},Be=$e,Ke=Object(f["a"])(Be,Ne,Se,!1,null,null,null),Fe=Ke.exports;b()(Ke,{VContainer:F["a"]});var Je=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("p",[e._v("lista posiłkow dla danego dzicka w danych dniach, Id dziecka w URL")])},We=[],Ge={},He=Ge,Ze=Object(f["a"])(He,Je,We,!1,null,null,null),Qe=Ze.exports,Xe=function(){var e=this,t=e.$createElement,a=e._self._c||t;return e.userList?a("v-card",[a("v-card-title",[a("v-spacer"),a("v-row",[a("v-col",[a("v-text-field",{directives:[{name:"debounce",rawName:"v-debounce:500ms",value:e.search,expression:"search",arg:"500ms"}],staticClass:"field",attrs:{clearable:"",label:" Imie i Nazwisko","single-line":"","hide-details":""},on:{input:e.search},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}})],1),a("v-col",[a("v-text-field",{directives:[{name:"debounce",rawName:"v-debounce:500ms",value:e.search,expression:"search",arg:"500ms"}],staticClass:"field",attrs:{clearable:"",label:"E-mail","single-line":"","hide-details":""},model:{value:e.email,callback:function(t){e.email=t},expression:"email"}})],1),a("v-col",[a("v-text-field",{directives:[{name:"debounce",rawName:"v-debounce:500ms",value:e.search,expression:"search",arg:"500ms"}],staticClass:"field",attrs:{clearable:"",label:"Nazwa","single-line":"","hide-details":""},model:{value:e.nick,callback:function(t){e.nick=t},expression:"nick"}})],1)],1)],1),a("v-data-table",{staticClass:"elevation-1",attrs:{headers:e.headers,items:e.userList},scopedSlots:e._u([{key:"top",fn:function(){return[a("v-dialog",{attrs:{"max-width":"500px"},model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[a("v-card",[a("v-card-title",[a("span",{staticClass:"headline"},[e._v(e._s(e.editedItem.userName))])]),a("v-card-text",[e.permissions?a("v-container",e._l(e.permissions,(function(t){return a("v-row",{key:t.key},[a("div",{staticStyle:{width:"100%","font-weight":"bold"}},[e._v(" "+e._s(t.name)+": ")]),e._l(t.sections[0],(function(t){return a("v-col",{key:t.key},[e.currentUserPermissions?a("v-checkbox",{attrs:{label:t.value,color:"success","hide-details":""},model:{value:e.checkbox[t.key],callback:function(a){e.$set(e.checkbox,t.key,a)},expression:"checkbox[item_permision.key]"}}):e._e()],1)}))],2)})),1):e._e()],1),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"error",text:""},on:{click:e.close}},[e._v(" Anuluj ")]),a("v-btn",{attrs:{color:"secondary",text:""},on:{click:e.save}},[e._v(" zapisz ")])],1)],1)],1)]},proxy:!0},{key:"item.actions",fn:function(t){var n=t.item;return[a("v-btn",{staticClass:"mr-2",attrs:{small:"",color:"secondary"},on:{click:function(t){return e.editItem(n)}}},[a("v-icon",{attrs:{left:"",dark:""}},[e._v(" mdi-pencil ")]),e._v(" uprawnienia ")],1)]}}],null,!1,2650157728)})],1):e._e()},Ye=[],et={data:function(){return{editedItem:{},surname:"",nick:"",name:"",email:"",dialog:!1,checkbox:{AdminAccess:!1,UserAccess:!1},headers:[{text:"Id",value:"id"},{text:"Imię",value:"firstName"},{text:"Nazwisko",value:"lastName"},{text:"E-mail",value:"email"},{text:"Nazwa",value:"userName"},{text:"Edycja",value:"actions",sortable:!1}]}},computed:Object(c["a"])({},Object(d["c"])("admin",["userList","currentUserPermissions","permissions"])),methods:Object(c["a"])(Object(c["a"])({},Object(d["b"])("admin",["getPermissions","getUsers","getUserPermissions","setUserPermissions"])),{},{search:function(){this.getUsers({UserName:this.nick,Email:this.email,FirstName:this.surname,LastName:this.name})},close:function(){this.dialog=!1},save:function(){var e=this;this.setUserPermissions({id:this.editedItem.id,AdminAccess:this.checkbox.AdminAccess,UserAccess:this.checkbox.UserAccess,key:this.permissions[0].key}).then((function(){e.dialog=!1}))},editItem:function(e){var t=this;this.editedItem=Object.assign({},e),this.getUserPermissions(e.id).then((function(){t.dialog=!0,t.checkbox.AdminAccess="Allow"===t.currentUserPermissions[0].value.AdminAccess,t.checkbox.UserAccess="Allow"===t.currentUserPermissions[0].value.UserAccess}))}}),beforeMount:function(){this.getPermissions(),this.getUsers({UserName:this.nick,Email:this.email,FirstName:this.surname,LastName:this.name})}},tt=et,at=(a("e74e"),a("ac7c")),nt=a("169a"),it=Object(f["a"])(tt,Xe,Ye,!1,null,"1f3bf2d8",null),st=it.exports;b()(it,{VBtn:I["a"],VCard:$["a"],VCardActions:B["a"],VCardText:B["c"],VCardTitle:B["d"],VCheckbox:at["a"],VCol:K["a"],VContainer:F["a"],VDataTable:Oe["a"],VDialog:nt["a"],VIcon:h["a"],VRow:J["a"],VSpacer:Ve["a"],VTextField:W["a"]}),s["a"].use(S["a"]);var rt,ot=[{path:"/login",name:"Login",component:H},{path:"/list",name:"KidsList",component:Fe},{path:"/permissions",name:"UserList",component:st},{path:"/list/:id",name:"DishList",component:Qe},{path:"/register",name:"Register",component:te},{path:"/",name:"Home",component:ye},{path:"/about",name:"About",component:fe},{path:"/menu",name:"Menu",component:Ue}],ct=new S["a"]({mode:"history",base:"/",routes:ot}),lt=ct,ut=function(){},dt=function(){},mt=a("ade3"),pt="LOGIN_USER",ft="LOGOUT_USER",vt="GET_TOKEN",bt="SAVE_TOKEN",gt="GET_TOKEN_AF",ht=(a("2ef0"),a("bc3a")),kt=a.n(ht),yt=kt.a.create({baseURL:"https://fitkidcateringapp.azurewebsites.net",headers:{Accept:"application/json","Content-Type":"application/json"}}),wt={login:function(e,t){yt.post("/api/user/authenticate",{Username:t.username,Password:t.password}).then((function(t){console.log(t.data.status),e(t.data)})).catch((function(e){return console.log(e)}))},getUserData:function(e){yt.get("/api/user").then((function(t){e(t.data)})).catch((function(e){return console.log(e)}))},register:function(e,t){yt.post("/api/user",{UserName:t.username,Password:t.password,Email:t.email,FirstName:t.firstname,LastName:t.lastname}).then((function(t){e(t.data)})).catch((function(e){return console.log(e)}))},refreshToken:function(e,t){yt.get("/api/user/authenticate/refresh").then((function(t){e(t.data),yt.defaults.headers.common["Authorization"]="Bearer ".concat(t.data.token)})).catch((function(e){return console.log(e)}))},getUserPermissions:function(e,t){yt.get("/api/admin/permissions/inspect/".concat(t.id)).then((function(t){e(t.data)})).catch((function(e){return console.log(e)}))},setUserPermissions:function(e,t){console.log(t),yt.post("/api/admin/permissions/inspect/".concat(t.id),[{key:t.key,value:{AdminAccess:!0===t.AdminAccess?"Allow":"Deny",UserAccess:!0===t.UserAccess?"Allow":"Deny"}}]).then((function(t){e(t.data)})).catch((function(e){return console.log(e)}))},getUsers:function(e,t){yt.get("api/admin/users",{params:{limit:0,UserName:t.UserName,Email:t.Email,Name:t.LastName}}).then((function(t){e(t.data)})).catch((function(e){console.log(e)}))},getPermissions:function(e){yt.get("/api/admin/permissions").then((function(t){e(t.data)})).catch((function(e){console.log(e)}))}},_t=(a("72bf"),{id:"",logged_in:!1,getToken:!1,token:String,refToken:String,expires:String,userInfo:{}}),xt={userId:function(e){return e.id},noTokenProvided:function(e){return e.noTokenProvided},getToken:function(e){e.getToken},userInfo:function(e){return e.userInfo},userProfile:function(e){return e.userInfo},loggedIn:function(e){return e.logged_in},isExpired:function(e){return new Date(e.expires)<new Date}},jt={login:function(e,t){var a=this,n=e.commit;e.state;wt.login((function(e){n("saveToken",e),n(vt,{}),lt.push({path:"menu"}),a.dispatch("user/getUserData"),a.dispatch("toastMessage/alert",{message:"Zostałeś poprawnie zalogowany",type:"success"})}),t)},getUserData:function(e){var t=e.commit;wt.getUserData((function(e){t("saveUserInfo",e)}))},refreshToken:function(e){var t=e.state,a=e.commit;wt.refreshToken((function(e){a("saveToken",e),a(vt,{})}),{token:t.token,ref:t.refToken,exp:t.expires})},logout:function(e){var t=e.commit;t(ft),lt.push({path:"login"})},register:function(e,t){var a=this;e.commit,e.state;wt.register((function(e){lt.push({path:"login"}),a.dispatch("toastMessage/alert",{message:"Zostałeś poprawnie zarejestrowany",type:"success"})}),t)}},Ot=(rt={noToken:function(e){e.noTokenProvided=!0},saveUserInfo:function(e,t){e.userInfo=t},saveToken:function(e,t){e.logged_in=!0,e.token=t.token,e.refToken=t.refresh,e.expires=t.expires}},Object(mt["a"])(rt,pt,(function(e){e.logged_in=!0})),Object(mt["a"])(rt,ft,(function(e){e.logged_in=!1,e.token="",e.refToken="",e.expires=""})),Object(mt["a"])(rt,vt,(function(e){e.getToken=!0})),Object(mt["a"])(rt,gt,(function(e){e.getToken=!1})),Object(mt["a"])(rt,bt,(function(e,t){var a=t.token;e.token=a})),rt),Vt={namespaced:!0,state:_t,getters:xt,actions:jt,mutations:Ot},zt=(a("72bf"),{userList:[],permissions:{},currentUserPermissions:{}}),Pt={userList:function(e){return e.userList},currentUserPermissions:function(e){return e.currentUserPermissions},permissions:function(e){return e.permissions}},It={getPermissions:function(e){var t=e.commit;wt.getPermissions((function(e){t("permissions",e)}))},getUsers:function(e,t){var a=e.commit;wt.getUsers((function(e){a("users",e)}),t)},getUserPermissions:function(e,t){var a=e.commit;return new Promise((function(e,n){wt.getUserPermissions((function(t){a("userPermissions",t),e()}),{id:t})}))},setUserPermissions:function(e,t){var a=this;e.commit;return new Promise((function(e,n){wt.setUserPermissions((function(t){a.dispatch("toastMessage/alert",{message:"Uprawnienia zostały zmienione",type:"success"}),e()}),t)}))}},At={permissions:function(e,t){e.permissions=t},users:function(e,t){e.userList=t},userPermissions:function(e,t){e.currentUserPermissions=t}},Tt={namespaced:!0,state:zt,getters:Pt,actions:It,mutations:At},Ct={alertType:"success",alertIcon:"mdi-checkbox-marked-circle-outline",message:"",timeout:2e3,showAlert:!1},Ut={timeout:function(e){return e.timeout},alertType:function(e){return e.alertType},alertIcon:function(e){return e.alertIcon},message:function(e){return e.message},showAlert:function(e){return e.showAlert}},Nt={alert:function(e,t){var a=e.commit;a("showAlert",t)},hideAlert:function(e){var t=e.commit;t("hideAlert")}},St={hideAlert:function(e){e.showAlert=!1},showAlert:function(e,t){switch(e.alertType=t.type,e.message=t.message,e.showAlert=!0,e.timeout=t.timeout,t.type||"success"){case"success":e.alertIcon="mdi-checkbox-marked-circle-outline";break;case"error":case"warning":e.alertIcon="mdi-minus-circle-outline";break;case"info":e.alertIcon="mdi-alert-circle-outline";break}}},Et={namespaced:!0,state:Ct,getters:Ut,actions:Nt,mutations:St},Lt=a("bfa9");s["a"].use(d["a"]);var Mt=new Lt["a"]({storage:window.localStorage,key:"pracownia",strictMode:!0}),Dt=new d["a"].Store({actions:n,getters:i,modules:{user:Vt,admin:Tt,toastMessage:Et},mutations:{RESTORE_MUTATION:Mt.RESTORE_MUTATION},strict:!0,plugins:[Mt.plugin]}),Rt=a("f309");a("d1e78");s["a"].use(Rt["a"]);var qt=new Rt["a"]({icons:{iconfont:"md"},theme:{themes:{light:{primary:"#607D8B",secondary:"#689F38",accent:"#009688",error:"#b71c1c"}}}}),$t=a("d1d6"),Bt=a.n($t);s["a"].use(Bt.a,{defaultTime:"700ms"}),s["a"].prototype.$http=yt,yt.defaults.timeout=1e4,s["a"].config.productionTip=!1,yt.interceptors.request.use((function(e){var t=Dt.state.user.token;return t&&(e.headers.common["Authorization"]="Bearer ".concat(t)),e}),(function(e){return Promise.reject(e)})),yt.interceptors.response.use((function(e){return 200===e.status||201===e.status?(e.data.refresh||Dt.dispatch("user/refreshToken"),Promise.resolve(e)):Promise.reject(e)}),(function(e){if(console.log(e.response),e.response.status){switch(e.response.status){case 400:console.log(e.response),e.response.data.message?Dt.dispatch("toastMessage/alert",{message:"Błąd: ".concat(e.response.data.message),type:"error"}):Dt.dispatch("toastMessage/alert",{message:"Błąd: ".concat(JSON.stringify(e.response.data.errors)),type:"error"});break;case 401:Dt.dispatch("user/logout");break;case 403:lt.replace({path:"/menu",query:{redirect:lt.currentRoute.fullPath}}),Dt.dispatch("toastMessage/alert",{message:"Brak dostępu",type:"error"});break;case 404:alert("page not exist");break;case 502:setTimeout((function(){lt.replace({path:"/login",query:{redirect:lt.currentRoute.fullPath}})}),1e3)}return Promise.reject(e.response)}})),new s["a"]({router:lt,store:Dt,vuetify:qt,api:yt,render:function(e){return e(N)}}).$mount("#app")},"91b2":function(e,t,a){e.exports=a.p+"img/csharplogo.0e18550b.png"},9200:function(e,t,a){},9653:function(e,t,a){"use strict";var n=a("3d85"),i=a.n(n);i.a},"9b19":function(e,t,a){e.exports=a.p+"img/logo.07d1e22e.svg"},"9b56":function(e,t,a){"use strict";var n=a("bd44"),i=a.n(n);i.a},"9cab":function(e,t,a){"use strict";var n=a("ec64"),i=a.n(n);i.a},"9da2":function(e,t,a){},bd44:function(e,t,a){},cc49:function(e,t,a){},cf05:function(e,t,a){e.exports=a.p+"img/logo.82b9c7a5.png"},e74e:function(e,t,a){"use strict";var n=a("9200"),i=a.n(n);i.a},ec64:function(e,t,a){}});
//# sourceMappingURL=app.5b66c400.js.map