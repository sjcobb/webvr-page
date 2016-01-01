(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){var Distortion=require("./distortion/distortion.js");var Util=require("./util.js");var DeviceList=require("./device/device-list.js");function DeviceInfo(){this.ua=(navigator.userAgent||navigator.vendor||window.opera).toLowerCase();this.devList=new DeviceList;this.detectGL_();this.detectDisplay_();this.detectDevice_();this.findDevice()}DeviceInfo.prototype.getDevice=function(){return this.device};DeviceInfo.prototype.detectGL_=function(){var cs,ctx,canvas,webGL,glVersion,glVendor,glShaderVersion;this.canvas=!!window.CanvasRenderingContext2D;if(this.canvas){this.webGL=false;cs=document.createElement("canvas");var names=["3d","webgl","experimental-webgl","experimental-webgl2","moz-webgl"];for(i in names){try{ctx=cs.getContext(names[i]);if(ctx&&typeof ctx.getParameter=="function"){this.webGL=true}}catch(e){}}}if(ctx){this.glVersion=ctx.getParameter(ctx.VERSION).toLowerCase();this.glVendor=ctx.getParameter(ctx.VENDOR).toLowerCase();this.glShaderVersion=ctx.getParameter(ctx.SHADING_LANGUAGE_VERSION).toLowerCase()}cs=ctx=null};DeviceInfo.prototype.detectDisplay_=function(){this.display={touch:!!"ontouchstart in window",pixelRatio:window.devicePixelRatio||1,screenWidth:Math.max(window.screen.width,window.screen.height)||0,screenHeight:Math.min(window.screen.width,window.screen.height)||0};this.display.pixelWidth=this.display.screenWidth*this.display.pixelRatio;this.display.pixelHeight=this.display.screenHeight*this.display.pixelRatio;this.display.retina=this.display.pixelRatio>1;var long=Math.max(this.display.screenWidth,this.display.screenHeight);var short=Math.min(this.display.screenWidth,this.display.screenHeight);this.display.longest=Math.max(long,short)};DeviceInfo.prototype.detectDevice_=function(){var m;var ua=this.ua;this.os={ios:/(iphone|ipad|ipod)/.test(ua),crios:/(cros|crmo)/.test(ua),linux:ua.indexOf("linux")>=0,android:ua.indexOf("android")>=0,windowsphone:ua.indexOf("windows phone")>=0,blackberry:/(blackberry|bb10|rim[0-9])/.test(ua),tizen:ua.indexOf("tizen")>=0,firefoxos:/mobile.*(firefox)/i.test(ua)};this.os.mac=!this.os.ios&&ua.indexOf("mac os x")>=0;this.os.windows=!this.os.windowsphone&&ua.indexOf("windows")>=0;if(this.os.ios){m=ua.match(/os (\d+)_(\d+)_?(\d+)?/);if(m&&m[1]&&m[2]){this.os.version=parseFloat(m[1]+"."+m[2])}}else if(this.os.android){m=ua.match(/android (\d+(?:\.\d+)+)[;)]/);if(m&&m[0]){this.os.version=parseFloat(m[0])}}else if(this.os.windowsphone){m=ua.match(/Windows Phone ([0-9]+\.[0-9]+)/);if(m&&m[1]){this.os.version=parseFloat(m[1])}}else if(this.os.blackberry){if(ua.indexOf("bb10")>=0){m=ua.match(/bb10.*version\/([0-9]{2}\.[0-9]{1})/);if(m&&m[0]){this.os.version=parseFloat(m[0])}}}else if(this.os.tizen){m=ua.match(/tizen.*[0-9]{2}\.[0-9]{1}/)}else{this.os.version=0}this.mobile=this.os.ios||this.os.android||/mobi|ip(hone|od|ad)|touch|blackberry|bb10|windows phone|kindle|silk|htc|(hpw|web)os|opera mini|fxios/.test(ua);this.tablet=/ipad|tablet|nexus[\s]+(7|9|10)|playbook|silk|ideapad|slate|touchpad|playbook|toshiba|xoom/.test(ua);this.gameConsole=/(nintendo|wiiu|3ds|playstation|xbox)/.test(ua);this.tv=/(google|apple|smart|hbb|opera|pov|net).*tv|(lg|aquos|inettv).*browser|(roku|kylo|aquos|viera|espial|boxee|dlnadoc|crkey|ce-html)/.test(ua);this.desktop=!this.mobile&&!this.tablet&&!this.gameConsole&&!this.tv||window.screenX!=0};DeviceInfo.prototype.findDevice=function(){var ua=this.ua;var devices={};this.device={iphone:ua.indexOf("iphone"),ipad:ua.indexOf("ipad"),ipod:ua.indexOf("ipod"),windowsphone:ua.indexOf("windows phone"),android:ua.indexOf("android")};if(this.device.android){devices=this.devList.getList(this.devList.DEVICE_ANDROID)}else if(this.device.iphone){devices=this.devList.getList(this.devList.DEVICE_IPHONE)}else if(this.device.ipad){devices=this.devList.getList(this.devList.DEVICE_IPAD)}else if(this.device.ipod){devices=this.devList.getList(this.devList.DEVICE_IPOD)}else if(this.device.windowsphone){devices=this.devList.getList(this.devList.DEVICE_WINDOWS_PHONE)}else{}for(var i in devices){if(devices[i].detect(this.ua,this.display,this.glVersion)){this.device=devices[i];break}}if(this.device){}else{}};module.exports=DeviceInfo},{"./device/device-list.js":2,"./distortion/distortion.js":3,"./util.js":7}],2:[function(require,module,exports){function DeviceList(){this.DEVICE_ALL=0,this.DEVICE_IPHONE=1,this.DEVICE_IPAD=2,this.DEVICE_IPOD=3,this.DEVICE_ANDROID=4,this.DEVICE_WINDOWS_PHONE=5,this.DEVICE_TIZEN=6,this.DEVICE_BLACKBERRY=7,this.DEVICE_GAME_CONSOLE=8,this.DEVICE_TV=9;this.getList=function(whichList){if(!whichList){whichList=this.DEVICE_ALL}switch(whichList){case this.DEVICE_ALL:return this.merge(this.list.iphone,this.list.android,this.list.windowsphone);break;case this.DEVICE_IPHONE:return this.list.iphone;break;case this.DEVICE_ANDROID:return this.list.android;break;case this.DEVICE_WINDOWS_PHONE:return this.list.windowsphone;break;default:break}};this.merge=function(){for(var i=1;i<arguments.length;i++){for(var a in arguments[i]){arguments[0][a]=arguments[i][a]}}return arguments[0]};this.list={};this.list.iphone={iphone3:{name:"iPhone 3",detect:function(ua,display,glVersion){return display.longest<=480&&!display.retina&&glVersion.indexOf("535")>=0},width:360,height:480,widthMeters:.0492,heightMeters:.628,bevelMeters:0},iphone4:{name:"iPhone 4",detect:function(ua,display,glVersion){return display.longest<=480&&display.retina&&glVersion.indexOf("535")>=0},width:640,height:960,widthMeters:.075,heightMeters:.0495,bevelMeters:.004},iphone5:{name:"iPhone 5",detect:function(ua,display,glVersion){return display.longest<=568&&glVersion.indexOf("543")},width:640,height:1136,widthMeters:.09011,heightMeters:.05127,bevelMeters:.00343},iphone5s:{name:"iPhone 5s",detect:function(ua,display,glVersion){return display.longest<=568&&glVersion.indexOf("a7")},width:640,height:1136,widthMeters:.09011,heightMeters:.05127,bevelMeters:.00343},iphone6:{name:"iPhone 6",detect:function(ua,display,glVersion){return display.longest<=736&&glVersion.indexof("a8")},width:750,height:1334,widthMeters:.1038,heightMeters:.0584,bevelMeters:.004},iphone6plus:{name:"iPhone 6 Plus",detect:function(ua,display,glVersion){return display.longest<=736&&glVersion.indexOf("a8")},width:1242,height:2208,widthMeters:.12235,heightMeters:.06954,bevelMeters:.00471},iphone6s:{name:"iPhone 6s",detect:function(ua,display,glVersion){return display.longest<=736&&glVersion.indexOf("a9")},width:750,height:1334,widthMeters:.1038,heightMeters:.0584,bevelMeters:.004}};this.list.ipad={};this.list.ipod={};this.list.android={note4:{name:"Note 4",detect:function(ua,display,glVersion){return ua.indexOf("sm-n910c")>=0},width:2560,height:1440,widthMeters:.125,heightMeters:.7,bevelMeters:0},note5:{name:"Note 5",detect:function(ua,display,glVersion){return ua.indexOf("sm-a920")>=0},width:2560,height:1440,widthMeters:.125,heightMeters:.7,bevelMeters:0},nexus5:{name:"Nexus 5",detect:function(ua,display,glVersion){return ua.indexOf("nexus 5 ")>=0},width:1920,height:1080,widthMeters:.11,heightMeters:.062,bevelMeters:.004},nexus6:{name:"Nexus 6",detect:function(ua,display,glVersion){return ua.indexOf("nexus 6")>=0},width:2560,height:1440,widthMeters:.1593,heightMeters:.083,bevelMeters:.004},nexus6p:{name:"Nexus 6P",detect:function(ua,display,glVersion){return ua.indexOf("nexus 6p")>=0},width:2560,height:1440,widthMeters:.126,heightMeters:.0705,bevelMeters:.004},galaxygrand:{name:"Galaxy Grand",detect:function(ua,display,glVersion){return ua.indexOf("sm-g7102")>=0},width:800,height:480,widthMeters:.109,heightMeters:.065,bevelMeters:.004},galaxygrandprime:{name:"Galaxy Grand Prime",detect:function(ua,display,glVersion){return ua.indexOf("sm-g530h")>=0},width:960,height:540,widthMeters:.1108,heightMeters:.0623,bevelMeters:0},galaxys3:{name:"Galaxy S3",detect:function(ua,display,glVersion){return ua.indexOf("gt-i9300")>=0},width:0,height:0,widthMeters:.106,heightMeters:.06,bevelMeters:.005},galaxys4:{name:"Galaxy S4",detect:function(ua,display,glVersion){return ua.indexOf("gt-i9505")>=0},width:1920,height:1080,widthMeters:.111,heightMeters:.0625,bevelMeters:.004},galaxys5:{name:"Galaxy S5",detect:function(ua,display,glVersion){return/(sm-g900|scl23|sc04f)/.test(ua)},width:0,height:0,widthMeters:.113,heightMeters:.066,bevelMeters:.005},galaxys5mini:{name:"Galaxy S5 Mini",detect:function(ua,display,glVersion){return ua.indexOf("sm-g800f")>=0},width:1280,height:720,widthMeters:.0997,heightMeters:.561,bevelMeters:0},galaxys6:{name:"Galaxy S6",detect:function(ua,display,glVersion){return ua.indexOf("sm-g920")>=0;return/(sm-g950|sm-g925)/.test(ua)},width:2560,height:1440,widthMeters:.114,heightMeters:.0635,bevelMeters:.0035},galaxya3:{name:"Galaxy A3",detect:function(ua,display,glVersion){return ua.indexOf("sm-a300")>=0},width:1280,height:720,widthMeters:.1042,heightMeters:.0586,bevelMeters:0},galaxya5:{name:"Galaxy A5",detect:function(ua,display,glVersion){return/sm-(a500|a510)/.test(ua)},width:1920,height:1080,widthMeters:.1329,heightMeters:.0747,bevelMeters:0},galaxya7:{name:"Galaxy A7",detect:function(ua,display,glVersion){return ua.indexOf("sm-a700")>=0},width:1920,height:1080,widthMeters:.1216,heightMeters:.0684,bevelMeters:0},galaxya9:{name:"Galaxy A9",detect:function(ua,display,glVersion){return ua.indexOf("sm-a900")>=0},width:1920,height:1080,widthMeters:.1329,heightMeters:.0747,bevelMeters:0},htcone:{name:"HTC One",detect:function(ua,display,glVersion){return/htc.*one/.test(ua)},width:1920,height:1080,widthMeters:.1307,heightMeters:.735,bevelMeters:0},zenfone6:{name:"ASUS ZenFone 6",detect:function(ua,display,glVersion){return ua.indexOf("asus_t00g")>=0},width:1280,height:720,widthMeters:.1327,heightMeters:.746,bevelMeters:0}};this.list.windowsphone={lumina1520:{name:"Lumina 1520",detect:function(ua,display,glVersion){return ua.indexOf("lumina 1520")>=0},width:1920,height:1080,widthMeters:.1329,heightMeters:.0747,bevelMeters:0},lumina950:{name:"Lumina 950",detect:function(ua,display,glVersion){return ua.indexOf("lumina 950")>=0},width:2560,height:1440,widthMeters:.1262,heightMeters:.0756,bevelMeters:0},lumina930:{name:"Lumina 930",detect:function(ua,display,glVersion){return ua.indexOf("lumina 930")>=0},width:1920,height:1080,widthMeters:.1106,heightMeters:.0622,bevelMeters:0},lumina550:{name:"Lumina 550",detect:function(ua,display,glVersion){return ua.indexOf("lumina 550")>=0},width:1280,height:720,widthMeters:.1032,heightMeters:.058,bevelMeters:0}};this.list.blackberry={blackberryleap:{name:"Blackberry Leap",detect:function(ua,display,glVersion){return ua.indexOf("str100")>=0},width:1280,height:720,widthMeters:.1105,heightMeters:.0622,bevelMeters:0},blackberrypriv:{name:"Blackberry Priv",detect:function(ua,display,glVersion){return ua.indexOf("stv100-3")>=0},width:2560,height:1440,widthMeters:.1204,heightMeters:.0677,bevelMeters:0}};this.list.tizen={samsungz:{name:"Samsung Z",detect:function(ua,display,glVersion){return ua.indexOf("sm-910f")>=0},width:1280,height:720,widthMeters:.1062,heightMeters:.0598,bevelMeters:0},samsungz3:{name:"Samsung Z3",detect:function(ua,display,glVersion){return ua.indexOf("sm-z300")>=0},width:1280,height:720,widthMeters:.1106,heightMeters:.0622,bevelMeters:0}}}module.exports=DeviceList},{}],3:[function(require,module,exports){function Distortion(coefficients){this.coefficients=coefficients}Distortion.prototype.distortInverse=function(radius){var r0=radius/.9;var r1=radius*.9;var dr0=radius-this.distort(r0);while(Math.abs(r1-r0)>1e-4){var dr1=radius-this.distort(r1);var r2=r1-dr1*((r1-r0)/(dr1-dr0));r0=r1;r1=r2;dr0=dr1}return r1};Distortion.prototype.distort=function(radius){return radius*this.distortionFactor_(radius)};Distortion.prototype.distortionFactor_=function(radius){var result=1;var rFactor=1;var rSquared=radius*radius;for(var i=0;i<this.coefficients.length;i++){var ki=this.coefficients[i];rFactor*=rSquared;result+=ki*rFactor}return result};module.exports=Distortion},{}],4:[function(require,module,exports){function Emitter(){this.callbacks={}}Emitter.prototype.emit=function(eventName){var callbacks=this.callbacks[eventName];if(!callbacks){return}var args=[].slice.call(arguments);args.shift();for(var i=0;i<callbacks.length;i++){callbacks[i].apply(this,args)}};Emitter.prototype.on=function(eventName,callback){if(eventName in this.callbacks){this.callbacks[eventName].push(callback)}else{this.callbacks[eventName]=[callback]}};module.exports=Emitter},{}],5:[function(require,module,exports){var WebVRPageManager=require("./webvr-page-manager.js");window.WebVRPageConfig=window.WebVRPageConfig||{};window.WebVRPageManager=WebVRPageManager},{"./webvr-page-manager.js":10}],6:[function(require,module,exports){var Modes={UNKNOWN:0,NORMAL:1,MAGIC_WINDOW:2,VR:3};module.exports=Modes},{}],7:[function(require,module,exports){var Util={};Util.getUniqueId=function(prefix){var i=Math.floor(Math.random()*999)+100;var pfx=prefix||"";function inc(pfx){if(!pfx){pfx=""}else{pfx+="-"}return pfx+i++}return inc}();Util.base64=function(mimeType,base64){return"data:"+mimeType+";base64,"+base64};Util.hasClass=function(elem,className){if(elem.classList){return elem.classList.contains(className)}else if(elem.className.indexOf(className)>=0){return true}return false};Util.addClass=function(elem,className){if(elem.classList){elem.classList.add(className)}else if(!this.hasClass(elem,className)){if(elem.className==""){elem.className=className}else{elem.className+=" "+className}}};Util.removeClass=function(elem,className){if(elem.classList){elem.classList.remove(className)}else if(this.hasClass(elem,className)){var reg=new RegExp("(\\s|^)"+className+"(\\s|$)");elem.className=elem.className.replace(reg," ")}};Util.getChildrenByTagName=function(elem,tagName){var arr=[],c=elem.children,len=c.length;var t=tagName.toUpperCase();for(var i=0;i<len;i++){if(t==c[i].tagName){arr.push(c[i])}}return arr};Util.parseText=function(str){return str.replace(/[0-9]/g,"")};Util.fullscreenClass=function(fullscreenClass){var head=document.getElementsByTagName("head")[0];var s=document.createElement("style");s.type="text/css";s.id="webvr-util-fullscreen-style";var rules="."+fullscreenClass+" {\n"+"	position: fixed !important;\n"+"	box-sizing: border-box !important;\n"+"	width: 100% !important;\n"+"	height: 100% !important;\n"+"	margin: 0 !important;\n"+"	left: 0 !important;\n"+"	top: 0 !important;\n"+" right:0 !important;\n"+" bottom:0 !important;\n"+"	z-index: 2147483647 !important;\n"+" background:black !important;\n"+"}\n";if(s.styleSheet){s.styleSheet.cssText=rules}else{var ruleNode=document.createTextNode(rules);s.appendChild(ruleNode)}head.appendChild(s);return fullscreenClass}("polyfill-full-screen");Util.isFullScreen=function(){if(document.fullscreenElement===null){return false}return true};(function(){var hasStyles=false;document.fullscreenElement=null;if(!("fullscreenEnabled"in document)){Object.defineProperty(document,"fullscreenEnabled",{get:function(){return document.msFullscreenEnabled||document.mozFullScreenEnabled||document.webkitFullscreenEnabled||function(){console.log("entering fullscreenEnabled polyfill function");var iframes=document.getElementsByTagName("iframe");window.ifs=iframes;for(var i=0;i<iframes.length;i++){console.log("trying iframe number:"+i);if(!iframes[i].allowfullscreen){console.log("found an iframe");return false}}return true}()}})}var escHandler=function(e){if(e.keyCode==27){e.stopImmediatePropagation();document.exitFullscreen()}};Element.prototype.requestFullscreen=Element.prototype.requestFullscreen||Element.prototype.webkitRequestFullscreen||Element.prototype.mozRequestFullScreen||Element.prototype.msRequestFullscreen||function(hmd){console.log("in requestFullscreen() polyfill");console.log("IN REQUESTFULLSCREEN, fullscreen element set to:"+("fullscreenElement"in document)+" and typeof:"+typeof document.fullscreenElement+" and value:"+document.fullscreenElement);if(this.nodeName==="IFRAME"&&!this.allowfullscreen){console.log("invalid iframe, setting fullscreenElement to NULL");document.fullscreenElement=null;return}if(document.fullscreenElement===null){document.fullscreenElement=this}document.addEventListener("keydown",escHandler,false);console.log("adding fullscreen class:"+Util.fullscreenClass);Util.addClass(this,Util.fullscreenClass);var event=new CustomEvent("fullscreenchange");if(typeof document.onfullscreenchange=="function"){console.log("dispatching from onfullscreenchange in requestFullscreen")}else{console.log("dispatching fullscreenchange in requestFullscreen");document.dispatchEvent(event)}};var toFS="true";var screenChange=function(e){e.stopImmediatePropagation();if(toFS==="true"){document.fullscreenElement=e.target;toFS="false"}else{toFS="true";document.fullscreenElement=null}console.log("dispatching fullscreenchange in screenChange, toggle:"+toFS);var bob=document.fullscreenElement;console.log("bob is a type:"+typeof bob+" and value:"+bob);var event=new CustomEvent("fullscreenchange",e);document.dispatchEvent(event)};document.addEventListener("webkitfullscreenchange",screenChange);document.addEventListener("mozfullscreenchange",screenChange);document.addEventListener("MSFullscreenChange",screenChange);document.exitFullscreen=document.exitFullscreen||document.mozCancelFullScreen||document.webkitExitFullscreen||document.msExitFullscreen||function(d){d.d=true;if(document.fullscreenEnabled===true){document.removeEventListener("keydown",escHandler,false);var event=new CustomEvent("fullscreenchange");if(typeof document.onfullscreenchange=="function"){document.onfullscreenchange(event)}else{document.dispatchEvent(event)}}};var screenError=function(e){console.error("A fullscreen request error has occurred");e.stopImmediatePropagation();var event=new CustomEvent("fullscreenerror",e);document.dispatchEvent(event)};document.addEventListener("webkitfullscreenerror",screenError,false);document.addEventListener("mozfullscreenerror",screenError,false);document.addEventListener("MSFullscreenError",screenError,false)})();Util.getQueryParameter=function(name){name=name.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var regex=new RegExp("[\\?&]"+name+"=([^&#]*)"),results=regex.exec(location.search);return results===null?"":decodeURIComponent(results[1].replace(/\+/g," "))};Util.isLandscapeMode=function(){return window.orientation==90||window.orientation==-90};module.exports=Util},{}],8:[function(require,module,exports){var Emitter=require("./emitter.js");var Modes=require("./modes.js");var Util=require("./util.js");var WebVRPageDialogs=require("./webvr-page-dialogs.js");function WebVRPageButtons(params){this.buttonClasses={button:"-button",panel:"-panel",back:"-back",fs:"-fullscreen",vr:"-vr",settings:"-settings"};this.defaultScale=.05;this.params=params;this.loadIcons_()}WebVRPageButtons.prototype=new Emitter;WebVRPageButtons.prototype.loadIcons_=function(){this.ICONS={};this.ICONS.cardboard=Util.base64("image/svg+xml","PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNHB4IiBoZWlnaHQ9IjI0cHgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI0ZGRkZGRiI+CiAgICA8cGF0aCBkPSJNMjAuNzQgNkgzLjIxQzIuNTUgNiAyIDYuNTcgMiA3LjI4djEwLjQ0YzAgLjcuNTUgMS4yOCAxLjIzIDEuMjhoNC43OWMuNTIgMCAuOTYtLjMzIDEuMTQtLjc5bDEuNC0zLjQ4Yy4yMy0uNTkuNzktMS4wMSAxLjQ0LTEuMDFzMS4yMS40MiAxLjQ1IDEuMDFsMS4zOSAzLjQ4Yy4xOS40Ni42My43OSAxLjExLjc5aDQuNzljLjcxIDAgMS4yNi0uNTcgMS4yNi0xLjI4VjcuMjhjMC0uNy0uNTUtMS4yOC0xLjI2LTEuMjh6TTcuNSAxNC42MmMtMS4xNyAwLTIuMTMtLjk1LTIuMTMtMi4xMiAwLTEuMTcuOTYtMi4xMyAyLjEzLTIuMTMgMS4xOCAwIDIuMTIuOTYgMi4xMiAyLjEzcy0uOTUgMi4xMi0yLjEyIDIuMTJ6bTkgMGMtMS4xNyAwLTIuMTMtLjk1LTIuMTMtMi4xMiAwLTEuMTcuOTYtMi4xMyAyLjEzLTIuMTNzMi4xMi45NiAyLjEyIDIuMTMtLjk1IDIuMTItMi4xMiAyLjEyeiIvPgogICAgPHBhdGggZmlsbD0ibm9uZSIgZD0iTTAgMGgyNHYyNEgwVjB6Ii8+Cjwvc3ZnPgo=");this.ICONS.fullscreen=Util.base64("image/svg+xml","PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNHB4IiBoZWlnaHQ9IjI0cHgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI0ZGRkZGRiI+CiAgICA8cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+CiAgICA8cGF0aCBkPSJNNyAxNEg1djVoNXYtMkg3di0zem0tMi00aDJWN2gzVjVINXY1em0xMiA3aC0zdjJoNXYtNWgtMnYzek0xNCA1djJoM3YzaDJWNWgtNXoiLz4KPC9zdmc+Cg==");this.ICONS.exitFullscreen=Util.base64("image/svg+xml","PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNHB4IiBoZWlnaHQ9IjI0cHgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI0ZGRkZGRiI+CiAgICA8cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+CiAgICA8cGF0aCBkPSJNNSAxNmgzdjNoMnYtNUg1djJ6bTMtOEg1djJoNVY1SDh2M3ptNiAxMWgydi0zaDN2LTJoLTV2NXptMi0xMVY1aC0ydjVoNVY4aC0zeiIvPgo8L3N2Zz4K");this.ICONS.back=Util.base64("image/svg+xml","PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNHB4IiBoZWlnaHQ9IjI0cHgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI0ZGRkZGRiI+CiAgICA8cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+CiAgICA8cGF0aCBkPSJNMjAgMTFINy44M2w1LjU5LTUuNTlMMTIgNGwtOCA4IDggOCAxLjQxLTEuNDFMNy44MyAxM0gyMHYtMnoiLz4KPC9zdmc+Cg==");this.ICONS.settings=Util.base64("image/svg+xml","PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNHB4IiBoZWlnaHQ9IjI0cHgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI0ZGRkZGRiI+CiAgICA8cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+CiAgICA8cGF0aCBkPSJNMTkuNDMgMTIuOThjLjA0LS4zMi4wNy0uNjQuMDctLjk4cy0uMDMtLjY2LS4wNy0uOThsMi4xMS0xLjY1Yy4xOS0uMTUuMjQtLjQyLjEyLS42NGwtMi0zLjQ2Yy0uMTItLjIyLS4zOS0uMy0uNjEtLjIybC0yLjQ5IDFjLS41Mi0uNC0xLjA4LS43My0xLjY5LS45OGwtLjM4LTIuNjVDMTQuNDYgMi4xOCAxNC4yNSAyIDE0IDJoLTRjLS4yNSAwLS40Ni4xOC0uNDkuNDJsLS4zOCAyLjY1Yy0uNjEuMjUtMS4xNy41OS0xLjY5Ljk4bC0yLjQ5LTFjLS4yMy0uMDktLjQ5IDAtLjYxLjIybC0yIDMuNDZjLS4xMy4yMi0uMDcuNDkuMTIuNjRsMi4xMSAxLjY1Yy0uMDQuMzItLjA3LjY1LS4wNy45OHMuMDMuNjYuMDcuOThsLTIuMTEgMS42NWMtLjE5LjE1LS4yNC40Mi0uMTIuNjRsMiAzLjQ2Yy4xMi4yMi4zOS4zLjYxLjIybDIuNDktMWMuNTIuNCAxLjA4LjczIDEuNjkuOThsLjM4IDIuNjVjLjAzLjI0LjI0LjQyLjQ5LjQyaDRjLjI1IDAgLjQ2LS4xOC40OS0uNDJsLjM4LTIuNjVjLjYxLS4yNSAxLjE3LS41OSAxLjY5LS45OGwyLjQ5IDFjLjIzLjA5LjQ5IDAgLjYxLS4yMmwyLTMuNDZjLjEyLS4yMi4wNy0uNDktLjEyLS42NGwtMi4xMS0xLjY1ek0xMiAxNS41Yy0xLjkzIDAtMy41LTEuNTctMy41LTMuNXMxLjU3LTMuNSAzLjUtMy41IDMuNSAxLjU3IDMuNSAzLjUtMS41NyAzLjUtMy41IDMuNXoiLz4KPC9zdmc+Cg==")};module.exports=WebVRPageButtons},{"./emitter.js":4,"./modes.js":6,"./util.js":7,"./webvr-page-dialogs.js":9}],9:[function(require,module,exports){var Emitter=require("./emitter.js");var Modes=require("./modes.js");var Util=require("./util.js");function WebVRPageDialogs(params){this.params=params||{}}WebVRPageDialogs.prototype=new Emitter;WebVRPageDialogs.prototype.createWindow_=function(){};WebVRPageDialogs.prototype.createButton_=function(){};WebVRPageDialogs.prototype.createErrorMsg=function(msg){if(document.createElement){var element=document.createElement("div");element.id=this.params.uid+"-error-message"||"error";element.style.fontFamily="monospace";element.style.fontSize="13px";element.style.fontWeight="normal";element.style.textAlign="center";element.style.background="#fff";element.style.color="#000";element.style.padding="1.5em";element.style.width="400px";element.style.margin="5em auto 0"}else{alert(msg)}};module.exports=WebVRPageDialogs},{"./emitter.js":4,"./modes.js":6,"./util.js":7}],10:[function(require,module,exports){var Emitter=require("./emitter.js");var Modes=require("./modes.js");var DeviceInfo=require("./device-info.js");var Util=require("./util.js");var WebVRPagePlayer=require("./webvr-page-player.js");function WebVRPageManager(renderer,effect,camera,params){this.params=params||{};this.prefix="webvr";this.uid=Util.getUniqueId(this.prefix);if(params){params.uid=this.uid}this.renderer=renderer;this.effect=effect;this.camera=camera;this.player=new WebVRPagePlayer(renderer,params);this.deviceInfo=new DeviceInfo;window.deviceInfo=this.deviceInfo;this.getDeviceByType_(HMDVRDevice).then(function(hmd){this.hmd=hmd}.bind(this));this.getDeviceByType_(PositionSensorVRDevice).then(function(input){this.input=input}.bind(this));var size=this.player.getSize();this.resize(size.width,size.height);this.listenMotion_();this.listenResize_();this.listenFullscreen_();this.listenOrientation_();this.emit("initialized")}WebVRPageManager.prototype=new Emitter;WebVRPageManager.Modes=Modes;WebVRPageManager.Util=Util;WebVRPageManager.prototype.render=function(scene){this.camera.updateProjectionMatrix();this.effect.render(scene,this.camera)};WebVRPageManager.prototype.getDeviceByType_=function(type){return new Promise(function(resolve,reject){navigator.getVRDevices().then(function(devices){for(var i=0;i<devices.length;i++){if(devices[i]instanceof type){resolve(devices[i]);break}}resolve(null)},function(){resolve(null)})})};WebVRPageManager.prototype.getDefaultDeviceFOV_=function(){return{downDegrees:40,leftDegrees:40,rightDegrees:40,upDegrees:40}};WebVRPageManager.prototype.cloneFOV_=function(fovObj){return{downDegrees:fovObj.downDegrees,upDegrees:fovObj.upDegrees,leftDegrees:fovObj.leftDegrees,rightDegrees:fovObj.rightDegrees}};WebVRPageManager.prototype.getFOV_=function(){var eyeFOVL,eyeFOVR;if(this.hmd){var h=this.hmd;if(h.getEyeParameters!==undefined){var eyeParamsL=h.getEyeParameters("left");var eyeParamsR=h.getEyeParameters("right");eyeFOVL=this.cloneFOV_(eyeParamsL.recommendedFieldOfView);eyeFOVR=this.cloneFOV_(eyeParamsR.recommendedFieldOfView)}else if(h.getRecommendedFOV!==undefined){var eyeParamsL=h.getRecommendedFOV("left");var eyeParamsR=h.getREcommendedFOV("right");eyeFOVL=this.cloneFOV_(eyeParamsL);eyeFOVR=this.cloneFOV_(eyeParamsR)}else{eyeFOVL=this.cloneFOV_(h.getRecommendedEyeFieldOfView("left"));eyeFOVR=this.cloneFOV_(h.getRecommendedEyeFieldOfView("right"))}}else{eyeFOVL=this.getDefaultDeviceFOV_();eyeFOVR=this.getDefaultDeviceFOV_()}return{eyeFOVL:eyeFOVL,eyeFOVR:eyeFOVR}};WebVRPageManager.prototype.adjustFOV_=function(width,height){if(this.hmd){var aspectChange=height/width;var fov=this.getFOV_();if(aspectChange>1){fov.eyeFOVL.upDegrees=fov.eyeFOVL.downDegrees=fov.eyeFOVR.upDegrees=fov.eyeFOVR.downDegrees*=aspectChange}console.log("going to adjust FOV, aspectChange:"+aspectChange);window.eff=this.effect;this.effect.setFOV(fov.eyeFOVL,fov.eyeFOVR)}};WebVRPageManager.prototype.listenMotion_=function(){};WebVRPageManager.prototype.listenFullscreen_=function(){document.addEventListener("fullscreenchange",this.onFullscreenChange_.bind(this));document.addEventListener("exitfullscreen",this.onExitFullscreen_.bind(this))};WebVRPageManager.prototype.listenOrientation_=function(){window.addEventListener("orientationchange",this.onOrientationChange_.bind(this))};WebVRPageManager.prototype.listenResize_=function(){this.view=window;this.view.addEventListener("resize",function(e){this.onResize_(e)}.bind(this),false)};WebVRPageManager.prototype.onResize_=function(e){console.log("resize event");var size=this.player.getSize();this.resize(size.width,size.height)};WebVRPageManager.prototype.resize=function(width,height){this.camera.aspect=width/height;this.camera.updateProjectionMatrix();this.renderer.setSize(width,height);this.effect.setSize(width,height)};WebVRPageManager.prototype.onOrientationChange_=function(e){console.log("Manager orientation change event, object is:"+e)};WebVRPageManager.prototype.onFullscreenChange_=function(e){console.log("Manager onFullscreenChange_, target:"+e.target);console.log("Manager onFullscreenChange_, document.fullscreenElement is a:"+typeof document.fullscreenElement+" value:"+document.fullscreenElement);if(document.fullscreenElement===null){console.log("Manager, exitFullscreen event triggered, dispatching exitfullscreen event");document.exitFullscreen();var event=new CustomEvent("exitfullscreen");document.dispatchEvent(event)}this.player.onFullscreenChange_(e)};WebVRPageManager.prototype.onExitFullscreen_=function(e){console.log("Manager onExitFullscreen_ custom event, object is:"+e);console.log("ABOUT TO RESET FOV");var fov=this.getFOV_();window.fov=fov;this.effect.setFOV(fov.eyeFOVL,fov.eyeFOVR);this.exitFullscreen()};WebVRPageManager.prototype.onErrorFullscreen_=function(e){console.log("Manager error on fullscreen change, object is:"+e)};WebVRPageManager.prototype.requestFullscreen=function(){if(this.params.webgl){console.log("Manager USER entering fullscreen");this.adjustFOV_(screen.width,screen.height);var canvas=this.player.requestFullscreen();canvas.requestFullscreen({vrDisplay:this.hmd})}};WebVRPageManager.prototype.exitFullscreen=function(){console.log("exiting exitFullscreen");this.player.exitFullscreen();document.exitFullscreen()};module.exports=WebVRPageManager},{"./device-info.js":1,"./emitter.js":4,"./modes.js":6,"./util.js":7,"./webvr-page-player.js":11}],11:[function(require,module,exports){var Emitter=require("./emitter.js");var Modes=require("./modes.js");var Util=require("./util.js");var WebVRPageDialogs=require("./webvr-page-dialogs.js");var WebVRPageButtons=require("./webvr-page-buttons.js");function WebVRPagePlayer(renderer,params){this.playerClasses={player:"player",caption:"-caption",canvas:"canvas"};this.params=params||{};this.uid=params.uid+"-"+this.playerClasses.player;this.captionDefault="WebVR Page Player Scene #"+parseInt(params.uid);this.canvasWarn="Your web browser does not support HTML5 canvas. You need to upgrade to a modern browser.";this.webglWarn="Your web browser cannot support 3D drawing necessary for VR. You need to upgrade to a modern browser";this.renderer=renderer;this.canvas=this.renderer.domElement;this.initFigure_();this.errorMsgIfNeeded_();this.initCaption_();this.initButtons_();this.aspect=this.getCurrentWidth()/this.getCurrentHeight()}WebVRPagePlayer.prototype=new Emitter;WebVRPagePlayer.prototype.errorMsgIfNeeded_=function(){if(!this.params.canvas){}else if(!this.params.webgl){}};WebVRPagePlayer.prototype.initFigure_=function(){var c=this.canvas;if(c.parentNode.tagName!="FIGURE"){this.dom=document.createElement("figure");c.parentNode.appendChild(this.dom);this.dom.appendChild(c)}else{this.dom=c.parentNode}var d=this.dom;var prefix=Util.parseText(this.params.uid);if(!d.id){d.id=this.uid}Util.addClass(d,prefix+this.playerClasses.player);if(!c.id){c.id=this.uid+this.playerClasses.canvas}Util.addClass(c,prefix+this.playerClasses.canvas);d.setAttribute("aria-describedby",this.uid+this.playerClasses.caption)};WebVRPagePlayer.prototype.initCaption_=function(){var figCaption=Util.getChildrenByTagName(this.dom,"figcaption");window.fig=figCaption;if(figCaption[0]){figCaption=figCaption[0]}else{figCaption=document.createElement("figcaption");this.dom.appendChild(figCaption)}figCaption.id=this.dom.getAttribute("aria-describedby");var prefix=Util.parseText(this.params.uid);Util.addClass(figCaption,prefix+this.playerClasses.player+this.playerClasses.caption);if(this.params.caption){figCaption.textContent=this.params.caption}else{if(figCaption.textContent==""){figCaption.textContent=this.captionDefault}}};WebVRPagePlayer.prototype.initButtons_=function(){this.buttons=new WebVRPageButtons(this.params)};WebVRPagePlayer.prototype.onFullscreenChange_=function(){console.log("Player onFullscreenChange event")};WebVRPagePlayer.prototype.requestFullscreen=function(e){console.log("Player requestFullscreen");var cn=this.getContainer();var cs=this.getCanvas();Util.addClass(cn,Util.fullscreenClass);return cn};WebVRPagePlayer.prototype.exitFullscreen=function(e){console.log("Player exitFullscreen");var cn=this.getContainer();var cs=this.getCanvas();Util.removeClass(cn,Util.fullscreenClass)};WebVRPagePlayer.prototype.getContainer=function(){return this.dom};WebVRPagePlayer.prototype.getCanvas=function(){return this.canvas};WebVRPagePlayer.prototype.getAspect=function(){return this.aspect};WebVRPagePlayer.prototype.getCurrentWidth=function(){return parseFloat(getComputedStyle(this.dom).getPropertyValue("width"));

};WebVRPagePlayer.prototype.getCurrentHeight=function(){return parseFloat(getComputedStyle(this.dom).getPropertyValue("height"))};WebVRPagePlayer.prototype.getSize=function(){var h;if(document.fullscreenElement!==null){h=this.getCurrentHeight()}else{h=this.getCurrentWidth()/this.aspect}return{width:this.getCurrentWidth(),height:h}};module.exports=WebVRPagePlayer},{"./emitter.js":4,"./modes.js":6,"./util.js":7,"./webvr-page-buttons.js":8,"./webvr-page-dialogs.js":9}]},{},[5]);