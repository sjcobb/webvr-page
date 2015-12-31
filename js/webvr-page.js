(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){function Emitter(){this.callbacks={}}Emitter.prototype.emit=function(eventName){var callbacks=this.callbacks[eventName];if(!callbacks){return}var args=[].slice.call(arguments);args.shift();for(var i=0;i<callbacks.length;i++){callbacks[i].apply(this,args)}};Emitter.prototype.on=function(eventName,callback){if(eventName in this.callbacks){this.callbacks[eventName].push(callback)}else{this.callbacks[eventName]=[callback]}};module.exports=Emitter},{}],2:[function(require,module,exports){var WebVRPageManager=require("./webvr-page-manager.js");window.WebVRPageConfig=window.WebVRPageConfig||{};window.WebVRPageManager=WebVRPageManager},{"./webvr-page-manager.js":7}],3:[function(require,module,exports){var Modes={UNKNOWN:0,NORMAL:1,MAGIC_WINDOW:2,VR:3};module.exports=Modes},{}],4:[function(require,module,exports){var Util={};Util.getUniqueId=function(prefix){var i=Math.floor(Math.random()*999)+100;var pfx=prefix||"";function inc(pfx){if(!pfx){pfx=""}else{pfx+="-"}return pfx+i++}return inc}();Util.base64=function(mimeType,base64){return"data:"+mimeType+";base64,"+base64};Util.hasClass=function(elem,className){if(elem.classList){return elem.classList.contains(className)}else if(elem.className.indexOf(className)>=0){return true}return false};Util.addClass=function(elem,className){if(elem.classList){elem.classList.add(className)}else if(!this.hasClass(elem,className)){if(elem.className==""){elem.className=className}else{elem.className+=" "+className}}};Util.removeClass=function(elem,className){if(elem.classList){elem.classList.remove(className)}else if(this.hasClass(elem,className)){var reg=new RegExp("(\\s|^)"+className+"(\\s|$)");elem.className=elem.className.replace(reg," ")}};Util.getChildrenByTagName=function(elem,tagName){var arr=[],c=elem.children,len=c.length;var t=tagName.toUpperCase();for(var i=0;i<len;i++){if(t==c[i].tagName){arr.push(c[i])}}return arr};Util.parseText=function(str){return str.replace(/[0-9]/g,"")};Util.fullscreenClass=function(fullscreenClass){var head=document.getElementsByTagName("head")[0];var s=document.createElement("style");s.type="text/css";s.id="webvr-util-fullscreen-style";var rules="."+fullscreenClass+" {\n"+"	position: fixed !important;\n"+"	box-sizing: border-box !important;\n"+"	width: 100% !important;\n"+"	height: 100% !important;\n"+"	margin: 0 !important;\n"+"	left: 0 !important;\n"+"	top: 0 !important;\n"+" right:0 !important;\n"+" bottom:0 !important;\n"+"	z-index: 2147483647 !important;\n"+" background:black !important;\n"+"}\n";if(s.styleSheet){s.styleSheet.cssText=rules}else{var ruleNode=document.createTextNode(rules);s.appendChild(ruleNode)}head.appendChild(s);return fullscreenClass}("polyfill-full-screen");Util.isFullScreen=function(){if(document.fullscreenElement===null){return false}return true};(function(){var hasStyles=false;document.fullscreenElement=null;if(!("fullscreenEnabled"in document)){Object.defineProperty(document,"fullscreenEnabled",{get:function(){return document.msFullscreenEnabled||document.mozFullScreenEnabled||document.webkitFullscreenEnabled||function(){console.log("entering fullscreenEnabled polyfill function");var iframes=document.getElementsByTagName("iframe");window.ifs=iframes;for(var i=0;i<iframes.length;i++){console.log("trying iframe number:"+i);if(!iframes[i].allowfullscreen){console.log("found an iframe");return false}}return true}()}})}var escHandler=function(e){if(e.keyCode==27){e.stopImmediatePropagation();document.exitFullscreen()}};Element.prototype.requestFullscreen=Element.prototype.requestFullscreen||Element.prototype.webkitRequestFullscreen||Element.prototype.mozRequestFullScreen||Element.prototype.msRequestFullscreen||function(hmd){console.log("in requestFullscreen() polyfill");console.log("IN REQUESTFULLSCREEN, fullscreen element set to:"+("fullscreenElement"in document)+" and typeof:"+typeof document.fullscreenElement+" and value:"+document.fullscreenElement);if(this.nodeName==="IFRAME"&&!this.allowfullscreen){console.log("invalid iframe, setting fullscreenElement to NULL");document.fullscreenElement=null;return}if(document.fullscreenElement===null){document.fullscreenElement=this}document.addEventListener("keydown",escHandler,false);console.log("adding fullscreen class:"+Util.fullscreenClass);Util.addClass(this,Util.fullscreenClass);var event=new CustomEvent("fullscreenchange");if(typeof document.onfullscreenchange=="function"){console.log("dispatching from onfullscreenchange in requestFullscreen")}else{console.log("dispatching fullscreenchange in requestFullscreen");document.dispatchEvent(event)}};var toFS="true";var screenChange=function(e){e.stopImmediatePropagation();if(toFS==="true"){document.fullscreenElement=e.target;toFS="false"}else{toFS="true";document.fullscreenElement=null}console.log("dispatching fullscreenchange in screenChange, toggle:"+toFS);var bob=document.fullscreenElement;console.log("bob is a type:"+typeof bob+" and value:"+bob);var event=new CustomEvent("fullscreenchange",e);document.dispatchEvent(event)};document.addEventListener("webkitfullscreenchange",screenChange);document.addEventListener("mozfullscreenchange",screenChange);document.addEventListener("MSFullscreenChange",screenChange);document.exitFullscreen=document.exitFullscreen||document.mozCancelFullScreen||document.webkitExitFullscreen||document.msExitFullscreen||function(d){d.d=true;if(document.fullscreenEnabled===true){document.removeEventListener("keydown",escHandler,false);var event=new CustomEvent("fullscreenchange");if(typeof document.onfullscreenchange=="function"){document.onfullscreenchange(event)}else{document.dispatchEvent(event)}}};var screenError=function(e){console.error("A fullscreen request error has occurred");e.stopImmediatePropagation();var event=new CustomEvent("fullscreenerror",e);document.dispatchEvent(event)};document.addEventListener("webkitfullscreenerror",screenError,false);document.addEventListener("mozfullscreenerror",screenError,false);document.addEventListener("MSFullscreenError",screenError,false)})();Util.getQueryParameter=function(name){name=name.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var regex=new RegExp("[\\?&]"+name+"=([^&#]*)"),results=regex.exec(location.search);return results===null?"":decodeURIComponent(results[1].replace(/\+/g," "))};Util.isLandscapeMode=function(){return window.orientation==90||window.orientation==-90};module.exports=Util},{}],5:[function(require,module,exports){var Emitter=require("./emitter.js");var Modes=require("./modes.js");var Util=require("./util.js");var WebVRPageDialogs=require("./webvr-page-dialogs.js");function WebVRPageButtons(params){this.buttonClasses={button:"-button",panel:"-panel",back:"-back",fs:"-fullscreen",vr:"-vr",settings:"-settings"};this.defaultScale=.05;this.params=params;this.loadIcons_()}WebVRPageButtons.prototype=new Emitter;WebVRPageButtons.prototype.loadIcons_=function(){this.ICONS={};this.ICONS.cardboard=Util.base64("image/svg+xml","PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNHB4IiBoZWlnaHQ9IjI0cHgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI0ZGRkZGRiI+CiAgICA8cGF0aCBkPSJNMjAuNzQgNkgzLjIxQzIuNTUgNiAyIDYuNTcgMiA3LjI4djEwLjQ0YzAgLjcuNTUgMS4yOCAxLjIzIDEuMjhoNC43OWMuNTIgMCAuOTYtLjMzIDEuMTQtLjc5bDEuNC0zLjQ4Yy4yMy0uNTkuNzktMS4wMSAxLjQ0LTEuMDFzMS4yMS40MiAxLjQ1IDEuMDFsMS4zOSAzLjQ4Yy4xOS40Ni42My43OSAxLjExLjc5aDQuNzljLjcxIDAgMS4yNi0uNTcgMS4yNi0xLjI4VjcuMjhjMC0uNy0uNTUtMS4yOC0xLjI2LTEuMjh6TTcuNSAxNC42MmMtMS4xNyAwLTIuMTMtLjk1LTIuMTMtMi4xMiAwLTEuMTcuOTYtMi4xMyAyLjEzLTIuMTMgMS4xOCAwIDIuMTIuOTYgMi4xMiAyLjEzcy0uOTUgMi4xMi0yLjEyIDIuMTJ6bTkgMGMtMS4xNyAwLTIuMTMtLjk1LTIuMTMtMi4xMiAwLTEuMTcuOTYtMi4xMyAyLjEzLTIuMTNzMi4xMi45NiAyLjEyIDIuMTMtLjk1IDIuMTItMi4xMiAyLjEyeiIvPgogICAgPHBhdGggZmlsbD0ibm9uZSIgZD0iTTAgMGgyNHYyNEgwVjB6Ii8+Cjwvc3ZnPgo=");this.ICONS.fullscreen=Util.base64("image/svg+xml","PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNHB4IiBoZWlnaHQ9IjI0cHgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI0ZGRkZGRiI+CiAgICA8cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+CiAgICA8cGF0aCBkPSJNNyAxNEg1djVoNXYtMkg3di0zem0tMi00aDJWN2gzVjVINXY1em0xMiA3aC0zdjJoNXYtNWgtMnYzek0xNCA1djJoM3YzaDJWNWgtNXoiLz4KPC9zdmc+Cg==");this.ICONS.exitFullscreen=Util.base64("image/svg+xml","PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNHB4IiBoZWlnaHQ9IjI0cHgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI0ZGRkZGRiI+CiAgICA8cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+CiAgICA8cGF0aCBkPSJNNSAxNmgzdjNoMnYtNUg1djJ6bTMtOEg1djJoNVY1SDh2M3ptNiAxMWgydi0zaDN2LTJoLTV2NXptMi0xMVY1aC0ydjVoNVY4aC0zeiIvPgo8L3N2Zz4K");this.ICONS.back=Util.base64("image/svg+xml","PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNHB4IiBoZWlnaHQ9IjI0cHgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI0ZGRkZGRiI+CiAgICA8cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+CiAgICA8cGF0aCBkPSJNMjAgMTFINy44M2w1LjU5LTUuNTlMMTIgNGwtOCA4IDggOCAxLjQxLTEuNDFMNy44MyAxM0gyMHYtMnoiLz4KPC9zdmc+Cg==");this.ICONS.settings=Util.base64("image/svg+xml","PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNHB4IiBoZWlnaHQ9IjI0cHgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI0ZGRkZGRiI+CiAgICA8cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+CiAgICA8cGF0aCBkPSJNMTkuNDMgMTIuOThjLjA0LS4zMi4wNy0uNjQuMDctLjk4cy0uMDMtLjY2LS4wNy0uOThsMi4xMS0xLjY1Yy4xOS0uMTUuMjQtLjQyLjEyLS42NGwtMi0zLjQ2Yy0uMTItLjIyLS4zOS0uMy0uNjEtLjIybC0yLjQ5IDFjLS41Mi0uNC0xLjA4LS43My0xLjY5LS45OGwtLjM4LTIuNjVDMTQuNDYgMi4xOCAxNC4yNSAyIDE0IDJoLTRjLS4yNSAwLS40Ni4xOC0uNDkuNDJsLS4zOCAyLjY1Yy0uNjEuMjUtMS4xNy41OS0xLjY5Ljk4bC0yLjQ5LTFjLS4yMy0uMDktLjQ5IDAtLjYxLjIybC0yIDMuNDZjLS4xMy4yMi0uMDcuNDkuMTIuNjRsMi4xMSAxLjY1Yy0uMDQuMzItLjA3LjY1LS4wNy45OHMuMDMuNjYuMDcuOThsLTIuMTEgMS42NWMtLjE5LjE1LS4yNC40Mi0uMTIuNjRsMiAzLjQ2Yy4xMi4yMi4zOS4zLjYxLjIybDIuNDktMWMuNTIuNCAxLjA4LjczIDEuNjkuOThsLjM4IDIuNjVjLjAzLjI0LjI0LjQyLjQ5LjQyaDRjLjI1IDAgLjQ2LS4xOC40OS0uNDJsLjM4LTIuNjVjLjYxLS4yNSAxLjE3LS41OSAxLjY5LS45OGwyLjQ5IDFjLjIzLjA5LjQ5IDAgLjYxLS4yMmwyLTMuNDZjLjEyLS4yMi4wNy0uNDktLjEyLS42NGwtMi4xMS0xLjY1ek0xMiAxNS41Yy0xLjkzIDAtMy41LTEuNTctMy41LTMuNXMxLjU3LTMuNSAzLjUtMy41IDMuNSAxLjU3IDMuNSAzLjUtMS41NyAzLjUtMy41IDMuNXoiLz4KPC9zdmc+Cg==")};module.exports=WebVRPageButtons},{"./emitter.js":1,"./modes.js":3,"./util.js":4,"./webvr-page-dialogs.js":6}],6:[function(require,module,exports){var Emitter=require("./emitter.js");var Modes=require("./modes.js");var Util=require("./util.js");function WebVRPageDialogs(params){this.params=params||{}}WebVRPageDialogs.prototype=new Emitter;WebVRPageDialogs.prototype.createWindow_=function(){};WebVRPageDialogs.prototype.createButton_=function(){};WebVRPageDialogs.prototype.createErrorMsg=function(msg){if(document.createElement){var element=document.createElement("div");element.id=this.params.uid+"-error-message"||"error";element.style.fontFamily="monospace";element.style.fontSize="13px";element.style.fontWeight="normal";element.style.textAlign="center";element.style.background="#fff";element.style.color="#000";element.style.padding="1.5em";element.style.width="400px";element.style.margin="5em auto 0"}else{alert(msg)}};module.exports=WebVRPageDialogs},{"./emitter.js":1,"./modes.js":3,"./util.js":4}],7:[function(require,module,exports){var Emitter=require("./emitter.js");var Modes=require("./modes.js");var Util=require("./util.js");var WebVRPagePlayer=require("./webvr-page-player.js");function WebVRPageManager(renderer,effect,camera,params){this.params=params||{};this.prefix="webvr";this.uid=Util.getUniqueId(this.prefix);if(params){params.uid=this.uid}this.renderer=renderer;this.effect=effect;this.camera=camera;this.player=new WebVRPagePlayer(renderer,params);this.getDeviceByType_(HMDVRDevice).then(function(hmd){this.hmd=hmd}.bind(this));this.getDeviceByType_(PositionSensorVRDevice).then(function(input){this.input=input}.bind(this));var size=this.player.getSize();this.resize(size.width,size.height);this.listenMotion_();this.listenResize_();this.listenFullscreen_();this.listenOrientation_();this.emit("initialized")}WebVRPageManager.prototype=new Emitter;WebVRPageManager.Modes=Modes;WebVRPageManager.Util=Util;WebVRPageManager.prototype.render=function(scene){this.camera.updateProjectionMatrix();this.effect.render(scene,this.camera)};WebVRPageManager.prototype.getDeviceByType_=function(type){return new Promise(function(resolve,reject){navigator.getVRDevices().then(function(devices){for(var i=0;i<devices.length;i++){if(devices[i]instanceof type){resolve(devices[i]);break}}resolve(null)},function(){resolve(null)})})};WebVRPageManager.prototype.getDefaultDeviceFOV_=function(){return{downDegrees:40,leftDegrees:40,rightDegrees:40,upDegrees:40}};WebVRPageManager.prototype.cloneFOV_=function(fovObj){return{downDegrees:fovObj.downDegrees,upDegrees:fovObj.upDegrees,leftDegrees:fovObj.leftDegrees,rightDegrees:fovObj.rightDegrees}};WebVRPageManager.prototype.getFOV_=function(){var eyeFOVL,eyeFOVR;if(this.hmd){var h=this.hmd;if(h.getEyeParameters!==undefined){var eyeParamsL=h.getEyeParameters("left");var eyeParamsR=h.getEyeParameters("right");eyeFOVL=this.cloneFOV_(eyeParamsL.recommendedFieldOfView);eyeFOVR=this.cloneFOV_(eyeParamsR.recommendedFieldOfView)}else if(h.getRecommendedFOV!==undefined){var eyeParamsL=h.getRecommendedFOV("left");var eyeParamsR=h.getREcommendedFOV("right");eyeFOVL=this.cloneFOV_(eyeParamsL);eyeFOVR=this.cloneFOV_(eyeParamsR)}else{eyeFOVL=this.cloneFOV_(h.getRecommendedEyeFieldOfView("left"));eyeFOVR=this.cloneFOV_(h.getRecommendedEyeFieldOfView("right"))}}else{eyeFOVL=this.getDefaultDeviceFOV_();eyeFOVR=this.getDefaultDeviceFOV_()}return{eyeFOVL:eyeFOVL,eyeFOVR:eyeFOVR}};WebVRPageManager.prototype.adjustFOV_=function(width,height){if(this.hmd){var aspectChange=height/width;var fov=this.getFOV_();if(aspectChange>1){fov.eyeFOVL.upDegrees=fov.eyeFOVL.downDegrees=fov.eyeFOVR.upDegrees=fov.eyeFOVR.downDegrees*=aspectChange}console.log("going to adjust FOV, aspectChange:"+aspectChange);window.eff=this.effect;this.effect.setFOV(fov.eyeFOVL,fov.eyeFOVR)}};WebVRPageManager.prototype.listenMotion_=function(){};WebVRPageManager.prototype.listenFullscreen_=function(){document.addEventListener("fullscreenchange",this.onFullscreenChange_.bind(this));document.addEventListener("exitfullscreen",this.onExitFullscreen_.bind(this))};WebVRPageManager.prototype.listenOrientation_=function(){window.addEventListener("orientationchange",this.onOrientationChange_.bind(this))};WebVRPageManager.prototype.listenResize_=function(){this.view=window;this.view.addEventListener("resize",function(e){this.onResize_(e)}.bind(this),false)};WebVRPageManager.prototype.onResize_=function(e){console.log("resize event");var size=this.player.getSize();this.resize(size.width,size.height)};WebVRPageManager.prototype.resize=function(width,height){this.camera.aspect=width/height;this.camera.updateProjectionMatrix();this.renderer.setSize(width,height);this.effect.setSize(width,height)};WebVRPageManager.prototype.onOrientationChange_=function(e){console.log("Manager orientation change event, object is:"+e)};WebVRPageManager.prototype.onFullscreenChange_=function(e){console.log("Manager onFullscreenChange_, target:"+e.target);console.log("Manager onFullscreenChange_, document.fullscreenElement is a:"+typeof document.fullscreenElement+" value:"+document.fullscreenElement);if(document.fullscreenElement===null){console.log("Manager, exitFullscreen event triggered, dispatching exitfullscreen event");document.exitFullscreen();var event=new CustomEvent("exitfullscreen");document.dispatchEvent(event)}this.player.onFullscreenChange_(e)};WebVRPageManager.prototype.onExitFullscreen_=function(e){console.log("Manager onExitFullscreen_ custom event, object is:"+e);console.log("ABOUT TO RESET FOV");var fov=this.getFOV_();window.fov=fov;this.effect.setFOV(fov.eyeFOVL,fov.eyeFOVR);this.exitFullscreen()};WebVRPageManager.prototype.onErrorFullscreen_=function(e){console.log("Manager error on fullscreen change, object is:"+e)};WebVRPageManager.prototype.requestFullscreen=function(){if(this.params.webgl){console.log("Manager USER entering fullscreen");this.adjustFOV_(screen.width,screen.height);var canvas=this.player.requestFullscreen();canvas.requestFullscreen({vrDisplay:this.hmd})}};WebVRPageManager.prototype.exitFullscreen=function(){console.log("exiting exitFullscreen");this.player.exitFullscreen();document.exitFullscreen()};module.exports=WebVRPageManager},{"./emitter.js":1,"./modes.js":3,"./util.js":4,"./webvr-page-player.js":8}],8:[function(require,module,exports){var Emitter=require("./emitter.js");var Modes=require("./modes.js");var Util=require("./util.js");var WebVRPageDialogs=require("./webvr-page-dialogs.js");var WebVRPageButtons=require("./webvr-page-buttons.js");function WebVRPagePlayer(renderer,params){this.playerClasses={player:"player",caption:"-caption",canvas:"canvas"};this.params=params||{};this.uid=params.uid+"-"+this.playerClasses.player;this.captionDefault="WebVR Page Player Scene #"+parseInt(params.uid);this.canvasWarn="Your web browser does not support HTML5 canvas. You need to upgrade to a modern browser.";this.webglWarn="Your web browser cannot support 3D drawing necessary for VR. You need to upgrade to a modern browser";this.renderer=renderer;this.canvas=this.renderer.domElement;this.initFigure_();this.errorMsgIfNeeded_();this.initCaption_();this.initButtons_();this.aspect=this.getCurrentWidth()/this.getCurrentHeight()}WebVRPagePlayer.prototype=new Emitter;WebVRPagePlayer.prototype.errorMsgIfNeeded_=function(){if(!this.params.canvas){}else if(!this.params.webgl){}};WebVRPagePlayer.prototype.initFigure_=function(){var c=this.canvas;if(c.parentNode.tagName!="FIGURE"){this.dom=document.createElement("figure");c.parentNode.appendChild(this.dom);this.dom.appendChild(c)}else{this.dom=c.parentNode}var d=this.dom;var prefix=Util.parseText(this.params.uid);if(!d.id){d.id=this.uid}Util.addClass(d,prefix+this.playerClasses.player);if(!c.id){c.id=this.uid+this.playerClasses.canvas}Util.addClass(c,prefix+this.playerClasses.canvas);d.setAttribute("aria-describedby",this.uid+this.playerClasses.caption)};WebVRPagePlayer.prototype.initCaption_=function(){var figCaption=Util.getChildrenByTagName(this.dom,"figcaption");window.fig=figCaption;if(figCaption[0]){figCaption=figCaption[0]}else{figCaption=document.createElement("figcaption");this.dom.appendChild(figCaption)}figCaption.id=this.dom.getAttribute("aria-describedby");var prefix=Util.parseText(this.params.uid);Util.addClass(figCaption,prefix+this.playerClasses.player+this.playerClasses.caption);if(this.params.caption){figCaption.textContent=this.params.caption}else{if(figCaption.textContent==""){figCaption.textContent=this.captionDefault}}};WebVRPagePlayer.prototype.initButtons_=function(){this.buttons=new WebVRPageButtons(this.params)};WebVRPagePlayer.prototype.onFullscreenChange_=function(){console.log("Player onFullscreenChange event")};WebVRPagePlayer.prototype.requestFullscreen=function(e){console.log("Player requestFullscreen");var cn=this.getContainer();var cs=this.getCanvas();Util.addClass(cn,Util.fullscreenClass);return cn};WebVRPagePlayer.prototype.exitFullscreen=function(e){console.log("Player exitFullscreen");var cn=this.getContainer();var cs=this.getCanvas();Util.removeClass(cn,Util.fullscreenClass)};WebVRPagePlayer.prototype.getContainer=function(){return this.dom};WebVRPagePlayer.prototype.getCanvas=function(){return this.canvas};WebVRPagePlayer.prototype.getAspect=function(){return this.aspect};WebVRPagePlayer.prototype.getCurrentWidth=function(){return parseFloat(getComputedStyle(this.dom).getPropertyValue("width"))};WebVRPagePlayer.prototype.getCurrentHeight=function(){return parseFloat(getComputedStyle(this.dom).getPropertyValue("height"))};WebVRPagePlayer.prototype.getSize=function(){var h;if(document.fullscreenElement!==null){h=this.getCurrentHeight()}else{h=this.getCurrentWidth()/this.aspect}return{width:this.getCurrentWidth(),height:h}};module.exports=WebVRPagePlayer},{"./emitter.js":1,"./modes.js":3,"./util.js":4,"./webvr-page-buttons.js":5,"./webvr-page-dialogs.js":6}]},{},[2]);