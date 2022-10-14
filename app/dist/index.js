var NUGGET;(()=>{"use strict";var e={d:(t,i)=>{for(var s in i)e.o(i,s)&&!e.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:i[s]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{asset:()=>s,directory:()=>n,mime:()=>l,project:()=>o});const i={nowDirectory:"",loadPrevDirectory:function(){let e=i.nowDirectory.split("/"),t=e.slice(-e.length,-1);ipc.requestAllDir(t.join("/"))},add:function(e,t){fetch(`file://${e}`).then((e=>e.blob())).then((t=>{let i=URL.createObjectURL(t),s=t.type.split("/")[0],n=document.querySelector("element-control");"image"==s?n.addImage(i,e):"video"==s&&n.addVideo(i,e)}))}},s=i,n={select:function(){const e=document.createElement("input"),t=document.querySelector("#projectFolder");e.setAttribute("type","file"),e.setAttribute("webkitdirectory",""),e.click(),e.addEventListener("change",(function(){const e=this.files[0].path.split("/");e.pop();const i=e.join("/");t.value=i}),!1)}},l={mimeArray:{png:{type:"image"},jpg:{type:"image"},jpeg:{type:"image"},gif:{type:"image"},mp4:{type:"video"},mov:{type:"video"},avi:{type:"video"},wmv:{type:"video"},mpg:{type:"video"},mkv:{type:"video"},webm:{type:"video"},mp3:{type:"audio"},wav:{type:"audio"}},lookup:function(e){const t=e.split(".");return t.length<=1?{type:"unknown"}:this.mimeArray[t[t.length-1]]?{type:this.mimeArray[t[t.length-1]].type}:{type:"unknown"}}},o={save:function(){const e=new JSZip,t=document.querySelector("element-timeline").timeline,i=Number(document.querySelector("#projectDuration").value),s=document.querySelector("#projectFolder").value,n={videoDuration:i,previewRatio:elementControlComponent.previewRatio,videoDestination:`${s}/result.mp4`};e.file("timeline.json",JSON.stringify(t)),e.file("renderOptions.json",JSON.stringify(n)),e.generateAsync({type:"blob"}).then((async function(e){const t=Buffer.from(await e.arrayBuffer());fs.writeFile(`${s}/project.ngt`,t,(()=>console.log("saved!")))}))},load:function(){new JSZip;const e=document.querySelector("element-timeline"),t=document.createElement("input");t.setAttribute("type","file"),t.setAttribute("accept",".ngt"),t.click(),t.addEventListener("change",(function(){let t=this.files[0].path;fs.readFile(t,(function(t,i){if(t)throw t;JSZip.loadAsync(i).then((function(t){t.file("timeline.json").async("string").then((async t=>{let i=JSON.parse(t);console.log(i["0f5195f2-4ffb-4a41-9a6a-069db9eefd11"]),await e.patchTimeline(i)}))}))}))}),!1)}};class r extends HTMLElement{constructor(){super(),this.nowDirectory=""}render(){const e=this.template();this.innerHTML=e}template(){return'<div class="row px-2"></div>'}getFile(e){let t=e.split("."),i=t.length;i<=2||t[i-1],this.querySelector("div").insertAdjacentHTML("beforeend",`<asset-file asset-name="${e}"></asset-file>`)}getFolder(e){let t=e.split(".").length;t<=2||splitedFilename[t-1],this.querySelector("div").insertAdjacentHTML("beforeend",`<asset-folder asset-name="${e}"></asset-folder>`)}clearList(){this.querySelector("div").innerHTML=""}connectedCallback(){this.render()}}class a extends HTMLElement{constructor(){super(),this.classList.add("col-4","d-flex","flex-column","bd-highlight","overflow-hidden","mt-1","asset"),this.filename=this.getAttribute("asset-name"),this.directory=document.querySelector("asset-list").nowDirectory}render(){const e=NUGGET.mime.lookup(this.filename).type;let t;t="image"==e?this.templateImage(`file://${this.directory}/${this.filename}`):this.template(e),this.innerHTML=t}template(e="unknown"){return`<span class="material-symbols-outlined icon-lg align-self-center"> ${{video:"video_file",audio:"audio_file",unknown:"draft"}[e]} </span>\n        <b class="align-self-center text-ellipsis-scroll text-light text-center">${this.filename}</b>`}templateImage(e){return`<img src="${e}" alt="" class="align-self-center asset-preview">\n        <b class="align-self-center text-ellipsis-scroll text-light text-center">${this.filename}</b>`}handleClick(){this.patchToControl(`${this.directory}/${this.filename}`,`${this.directory}`)}patchToControl(e,t){fetch(`file://${e}`).then((e=>e.blob())).then((t=>{let i=URL.createObjectURL(t),s=t.type.split("/")[0],n=document.querySelector("element-control");"image"==s?n.addImage(i,e):"video"==s?n.addVideo(i,e):"audio"==s&&n.addAudio(i,e)}))}connectedCallback(){this.render(),this.addEventListener("click",this.handleClick.bind(this))}disconnectedCallback(){this.removeEventListener("click",this.handleClick)}}class d extends HTMLElement{constructor(){super(),this.classList.add("col-4","d-flex","flex-column","bd-highlight","overflow-hidden","mt-1","asset"),this.foldername=this.getAttribute("asset-name"),this.directory=document.querySelector("asset-list").nowDirectory}render(){const e=this.template();this.innerHTML=e}template(){return`<span class="material-symbols-outlined icon-lg align-self-center"> folder </span>\n        <b class="align-self-center text-ellipsis text-light text-center">${this.foldername}</b>`}handleClick(){ipc.requestAllDir(`${this.directory}/${this.foldername}`)}connectedCallback(){this.render(),this.addEventListener("click",this.handleClick.bind(this))}disconnectedCallback(){this.removeEventListener("click",this.handleClick)}}class h extends HTMLElement{constructor(){super(),this.directory=""}render(){const e=this.template();this.innerHTML=e}template(){return'<div class="row p-0 mt-2">\n        <div class="col-2">\n            <button class="btn btn-transparent btn-sm"><span class="material-symbols-outlined icon-sm"> arrow_upward </span> </button>\n        </div>\n        <div class="col-10">\n            <input type="text" class="form-control" aria-describedby="basic-addon1" value="" disabled>\n        </div>\n        </div>'}updateDirectoryInput(e){this.querySelector("div").querySelectorAll("div")[1].querySelector("input").value=e}clickPrevDirectoryButton(){this.directory=document.querySelector("asset-list").nowDirectory;let e=this.directory.split("/"),t=e.slice(-e.length,-1);ipc.requestAllDir(t.join("/"))}connectedCallback(){this.render(),this.querySelector("div").querySelectorAll("div")[0].querySelector("button").addEventListener("click",this.clickPrevDirectoryButton.bind(this))}disconnectedCallback(){this.querySelector("div").querySelectorAll("div")[0].querySelector("button").removeEventListener("click",this.clickPrevDirectoryButton)}}class m extends HTMLElement{constructor(){super(),this.elementControl,window.addEventListener("DOMContentLoaded",(()=>{this.elementControl=document.querySelector("element-control")})),this.timeline={}}render(){const e=this.template();this.classList.add("col-12","cursor-default","h-100","line"),this.innerHTML=e}template(){return"\n        <element-timeline-editor></element-timeline-editor>\n        <element-timeline-bar></element-timeline-bar>\n\n        "}replaceTimelineBarHeight(e){this.querySelector(".timeline-bar").style.height=`${e}px`}getTimelineScrollHeight(){return this.scrollHeight}async patchTimeline(e){this.timeline=e;for(const t in e)if(Object.hasOwnProperty.call(e,t)){const i=e[t];if("image"==i.filetype){let e=await this.getBlobUrl(`file://${i.localpath}`);this.timeline[t].blob=String(e),this.elementControl.showImage(t)}else if("video"==i.filetype){let e=await this.getBlobUrl(`file://${i.localpath}`);this.timeline[t].blob=String(e),this.elementControl.showVideo(t)}else if("text"==i.filetype)this.elementControl.showText(t);else if("audio"==i.filetype){let e=await this.getBlobUrl(`file://${i.localpath}`);this.timeline[t].blob=String(e),this.elementControl.showAudio(t)}this.addElementBar(t)}}resetTimelineData(){this.timeline={}}async getBlobUrl(e){const t=await fetch(e),i=await t.blob();return URL.createObjectURL(i)}addElementBar(e){const t=this.templateElementBar(e);this.insertAdjacentHTML("beforeend",t);let i=this.getTimelineScrollHeight();this.replaceTimelineBarHeight(i)}templateElementBar(e){this.timeline[e].duration;let t=this.timeline[e].filetype,i=this.timeline[e].localpath.split("/"),s=(i[i.length-1],this.getElementType(t));return"static"==s?`<element-bar element-id="${e}" element-type="static"></element-bar>`:"dynamic"==s?`<element-bar element-id="${e}" element-type="dynamic"></element-bar>`:"none"}getElementType(e){let t="undefined";const i={static:["image","text","png","jpg","jpeg"],dynamic:["video","audio","mp4","mp3","mov"]};for(const s in i)if(Object.hasOwnProperty.call(i,s)&&i[s].indexOf(e)>=0){t=s;break}return t}keydown(e){e.preventDefault(),console.log(e.keyCode),32==e.keyCode&&(1==this.elementControl.isPaused?this.elementControl.play():this.elementControl.stop())}connectedCallback(){this.render(),document.addEventListener("keydown",this.keydown.bind(this))}}class c extends HTMLElement{constructor(){super()}render(){this.classList.add("timeline-bar"),this.setAttribute("id","timeline_bar"),this.style.left="0px"}move(e){this.style.left=`${e}px`}connectedCallback(){this.render()}}class u extends HTMLElement{constructor(){super()}render(){const e=this.template();this.classList.add("timeline-editor","ruler"),this.innerHTML=e,this.addTickNumber(10)}template(){return'<ul class="ruler-x">\n        <li></li><li></li><li></li><li></li><li></li> \x3c!-- repeat --\x3e\n      </ul>'}addTickNumber(e){let t="<li></li>".repeat(e);this.querySelector("ul").innerHTML=t}updateRulerLength(e){let t=200*Number(e.value);this.changeWidth(t),this.addTickNumber(Number(e.value))}changeWidth(e){this.style.width=`${e}px`}mousedown(e){const t=document.querySelector("element-timeline-bar"),i=document.querySelector("element-timeline"),s=document.querySelector("element-control");s.progress=e.pageX+i.scrollLeft,s.stop(),s.showTime(),s.appearAllElementInTime(),t.move(e.pageX+i.scrollLeft)}connectedCallback(){this.render(),this.addEventListener("mousedown",this.mousedown.bind(this))}}class p extends HTMLElement{constructor(){super(),this.timeline=document.querySelector("element-timeline").timeline,this.elementId=this.getAttribute("element-id"),this.elementBarType=this.getAttribute("element-type")||"static",this.width=this.timeline[this.elementId].duration,this.startTime=this.timeline[this.elementId].startTime,this.isDrag=!1,this.isResize=!1,this.resizeLocation="left",this.initialDuration=1e3,this.initialPosition={x:0,y:0};let e=this.timeline[this.elementId].localpath.split("/");this.filepath=e[e.length-1],this.resizeEventHandler,this.dragEventHandler}render(){let e;e="static"==this.elementBarType?this.templateStatic():this.templateDynamic();const t=this.getRandomColor();this.classList.add("element-bar","d-block"),this.setAttribute("style",`width: ${this.width}px; left: ${this.startTime}px; background-color: ${t};`),this.setAttribute("value",this.elementId),this.innerHTML=e}templateStatic(){return`\n        ${this.filepath}\n        <div class="element-bar-resize-left position-absolute" onmousedown="this.parentNode.resizeMousedown(this, 'left')"></div>\n        <div class="element-bar-resize-right position-absolute" onmousedown="this.parentNode.resizeMousedown(this, 'right')"></div>\n        `}templateDynamic(){return`\n        ${this.filepath}\n        <div class="element-bar-hiddenspace-left position-absolute">\n            <div class="element-bar-resize-hiddenspace-left position-absolute" onmousedown="this.parentNode.parentNode.resizeRangeMousedown(this, 'left')">\n            </div>\n        </div>\n        <div class="element-bar-hiddenspace-right position-absolute">\n            <div class="element-bar-resize-hiddenspace-right position-absolute" onmousedown="this.parentNode.parentNode.resizeRangeMousedown(this, 'right')">\n            </div>\n        </div>\n        `}getRandomArbitrary(e,t){return Math.round(Math.random()*(t-e)+e)}getRandomColor(){return`rgb(${this.getRandomArbitrary(45,167)},${this.getRandomArbitrary(23,139)},${this.getRandomArbitrary(56,180)})`}drag(e){if(this.isDrag){let t=e.pageX-this.initialPosition.x;e.pageY,this.initialPosition.y,this.style.left=`${t}px`,this.timeline[this.elementId].startTime=t}}dragMousedown(e){this.addEventListener("mousemove",this.drag),this.isDrag=!0,this.initialPosition.x=e.pageX-Number(this.style.left.replace(/[^0-9]/g,"")),this.initialPosition.y=e.pageY,this.dragEventHandler=this.drag.bind(this),document.addEventListener("mousemove",this.dragEventHandler)}dragMouseup(){document.removeEventListener("mousemove",this.dragEventHandler),this.isDrag=!1}resize(e){this.isDrag=!1;let t=e.pageX-this.initialPosition.x,i=(e.pageY,this.initialPosition.y,this.initialDuration),s=document.querySelector("element-timeline").scrollLeft;"left"==this.resizeLocation?(this.style.left=`${t}px`,this.style.width=i-t+"px",this.timeline[this.elementId].startTime=t,this.timeline[this.elementId].duration=Number(this.style.width.split("px")[0])):(this.style.width=s+e.pageX-Number(this.style.left.split("px")[0])+"px",this.timeline[this.elementId].duration=Number(this.style.width.split("px")[0]))}resizeRange(e){this.isDrag=!1;let t=e.pageX-this.initialPosition.x,i=this.initialDuration,s=Number(this.style.width.split("px")[0]),n=this.querySelector(".element-bar-hiddenspace-left"),l=this.querySelector(".element-bar-hiddenspace-right"),o=document.querySelector("element-timeline"),r=window.innerWidth,a=o.scrollWidth,d=Number(this.style.width.split("px")[0]),h=Number(this.style.left.split("px")[0]),m=r-s-h<0?a-(h+d):0,c=o.scrollLeft,u=a-r-c,p=r-s-h>0?r-s-h-10:0;"left"==this.resizeLocation?(n.style.width=this.initialPosition.x+t+c-h+"px",this.timeline[this.elementId].trim.startTime=Number(n.style.width.split("px")[0])):(l.style.width=u+r-t-this.initialPosition.x-p-m+"px",this.timeline[this.elementId].trim.endTime=i-Number(l.style.width.split("px")[0]))}resizeMousedown(e,t){this.isResize=!0,this.resizeLocation=t,this.isDrag=!1,this.initialPosition.x="left"==t?e.pageX-Number(this.style.left.split("px")[0]):Number(this.style.left.split("px")[0]),this.initialPosition.y=e.pageY,this.initialDuration=this.timeline[this.elementId].duration+Number(this.style.left.replace(/[^0-9]/g,"")),this.resizeEventHandler=this.resize.bind(this),document.addEventListener("mousemove",this.resizeEventHandler)}resizeRangeMousedown(e,t){this.isResize=!0,this.resizeLocation=t,this.resizeRangeLeft=Number(this.querySelector(".element-bar-hiddenspace-left").style.width.split("px")[0]),this.resizeRangeRight=Number(this.querySelector(".element-bar-hiddenspace-right").style.width.split("px")[0]),this.isDrag=!1,this.initialPosition.x=Number(this.style.left.replace(/[^0-9]/g,"")),this.initialDuration=this.timeline[this.elementId].duration+Number(this.style.left.replace(/[^0-9]/g,"")),this.resizeEventHandler=this.resizeRange.bind(this),document.addEventListener("mousemove",this.resizeEventHandler)}resizeMouseup(){document.removeEventListener("mousemove",this.resizeEventHandler),this.isResize=!1}connectedCallback(){this.render(),this.addEventListener("mousedown",this.dragMousedown.bind(this)),document.addEventListener("mouseup",this.dragMouseup.bind(this)),document.addEventListener("mouseup",this.resizeMouseup.bind(this))}disconnectedCallback(){this.removeEventListener("mousedown",this.dragMousedown),this.removeEventListener("mouseup",this.dragMouseup)}}const y={randomUUID:"undefined"!=typeof crypto&&crypto.randomUUID&&crypto.randomUUID.bind(crypto)};let g;const v=new Uint8Array(16);function b(){if(!g&&(g="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!g))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return g(v)}const f=[];for(let e=0;e<256;++e)f.push((e+256).toString(16).slice(1));const w=function(e,t,i){if(y.randomUUID&&!t&&!e)return y.randomUUID();const s=(e=e||{}).random||(e.rng||b)();if(s[6]=15&s[6]|64,s[8]=63&s[8]|128,t){i=i||0;for(let e=0;e<16;++e)t[i+e]=s[e];return t}return function(e,t=0){return(f[e[t+0]]+f[e[t+1]]+f[e[t+2]]+f[e[t+3]]+"-"+f[e[t+4]]+f[e[t+5]]+"-"+f[e[t+6]]+f[e[t+7]]+"-"+f[e[t+8]]+f[e[t+9]]+"-"+f[e[t+10]]+f[e[t+11]]+f[e[t+12]]+f[e[t+13]]+f[e[t+14]]+f[e[t+15]]).toLowerCase()}(s)};class x extends HTMLElement{constructor(){super(),this.elementTimeline,this.timeline,this.timelineBar,window.addEventListener("DOMContentLoaded",(()=>{this.elementTimeline=document.querySelector("element-timeline"),this.timeline=document.querySelector("element-timeline").timeline,this.timelineBar=document.querySelector("element-timeline-bar")})),this.scroller=void 0,this.resizeTimeout=void 0,this.isResizeStart=!1,this.previousPreviewSize={w:1920,h:1080},this.isPaused=!0,this.isPlay={},this.progress=0,this.activeElementId="",this.previewRatio=1920/1080,this.resizeEvent()}async resizeEvent(){this.resizePreview();let e={w:2-this.previousPreviewSize.w/Number(preview.style.width.split("px")[0]),h:2-this.previousPreviewSize.h/Number(preview.style.height.split("px")[0])};this.matchAllElementsSizeToPreview(e),this.previousPreviewSize.w=Number(preview.style.width.split("px")[0]),this.previousPreviewSize.h=Number(preview.style.height.split("px")[0])}resizePreview(){let e=document.getElementById("split_col_2").offsetWidth,t=(document.getElementById("split_col_2").offsetHeight,.95*e),i=9*t/16;preview.width=t,preview.height=i,preview.style.width=`${t}px`,preview.style.height=`${i}px`,video.style.width=`${t}px`,video.style.height=`${i}px`,this.previewRatio=1920/t}matchAllElementsSizeToPreview(e){for(const t in this.timeline)if(Object.hasOwnProperty.call(this.timeline,t)){let i=document.querySelector(`#element-${t}`),s=Number(i.style.height.split("px")[0])*e.h,n=Number(i.style.width.split("px")[0])*e.w,l=Number(i.style.top.split("px")[0])*e.h,o=Number(i.style.left.split("px")[0])*e.w;"text"!=this.timeline[t].filetype&&i.resizeStyle({x:o,y:l,w:n,h:s})}}addImage(e,t){const i=this.generateUUID(),s=document.createElement("img");s.src=e,s.onload=()=>{var n=s.width/10,l=s.height/10;this.timeline[i]={blob:e,startTime:0,duration:1e3,location:{x:0,y:0},width:n,height:l,localpath:t,filetype:"image"},this.showImage(i),this.elementTimeline.addElementBar(i)}}addVideo(e,t){const i=this.generateUUID(),s=document.createElement("video");s.src=e,s.preload="metadata",s.onloadedmetadata=()=>{let n=s.videoWidth/10,l=s.videoHeight/10,o=200*s.duration;this.timeline[i]={blob:e,startTime:0,duration:o,location:{x:0,y:0},trim:{startTime:0,endTime:o},width:n,height:l,localpath:t,filetype:"video"},this.showVideo(i),this.elementTimeline.addElementBar(i)}}addText(){const e=this.generateUUID();this.timeline[e]={startTime:0,duration:1e3,text:"텍스트",textcolor:"#ffffff",fontsize:20,location:{x:0,y:0},localpath:"/TEXTELEMENT",filetype:"text"},this.showText(e),this.elementTimeline.addElementBar(e)}addAudio(e,t){const i=this.generateUUID(),s=document.createElement("audio");s.src=e,s.onloadedmetadata=()=>{let n=200*s.duration;this.timeline[i]={blob:e,startTime:0,duration:n,location:{x:0,y:0},trim:{startTime:0,endTime:n},localpath:t,filetype:"audio"},this.showAudio(i),this.elementTimeline.addElementBar(i)}}showImage(e){null==document.getElementById(`element-${e}`)?this.insertAdjacentHTML("beforeend",`<element-control-asset element-id="${e}" element-filetype="image"></element-control-asset>`):document.querySelector(`#element-${e}`).classList.remove("d-none")}showVideo(e){if(null==document.getElementById(`element-${e}`)){this.insertAdjacentHTML("beforeend",`<element-control-asset element-id="${e}" element-filetype="video"></element-control-asset>`);let t=document.getElementById(`element-${e}`).querySelector("video"),i=(this.timeline[e].startTime-this.progress)/200;t.currentTime=i}else{let t=document.getElementById(`element-${e}`).querySelector("video"),i=-(this.timeline[e].startTime-this.progress)/200;t.currentTime>0&&!t.paused&&!t.ended&&t.readyState>2?(this.isPaused&&console.log("paused"),console.log("isPlaying")):this.isPaused?(t.pause(),this.isPlay[e]=!1):(this.isPlay[e]||(t.currentTime=i,t.play()),this.isPlay[e]=!0),document.querySelector(`#element-${e}`).classList.remove("d-none")}}showAudio(e){if(null==document.getElementById(`element-${e}`)){this.insertAdjacentHTML("beforeend",`<element-control-asset element-id="${e}" element-filetype="audio"></element-control-asset>`);let t=document.getElementById(`element-${e}`).querySelector("audio"),i=(this.timeline[e].startTime-this.progress)/200;t.currentTime=i}else{let t=document.getElementById(`element-${e}`).querySelector("audio"),i=-(this.timeline[e].startTime-this.progress)/200;t.currentTime>0&&!t.paused&&!t.ended&&t.readyState>2?(this.isPaused&&console.log("paused"),console.log("isPlaying")):(t.currentTime=i,this.isPaused?t.pause():t.play()),document.querySelector(`#element-${e}`).classList.remove("d-none")}}showText(e){null==document.getElementById(`element-${e}`)?this.insertAdjacentHTML("beforeend",`<element-control-asset element-id="${e}" element-filetype="text"></element-control-asset>`):document.querySelector(`#element-${e}`).classList.remove("d-none")}changeText(e){let t=document.querySelector(`#element-${e}`).querySelector("input").value;this.timeline[e].text=t}changeTextColor(e){let t=document.querySelector("#optionTargetElement").value;document.querySelector(`#element-${t}`).querySelector("input").style.color=e.value,this.timeline[t].textcolor=e.value}changeTextSize(e){let t=document.querySelector("#optionTargetElement").value;document.querySelector(`#element-${t}`).querySelector("input").style.fontSize=`${e.value}px`,this.timeline[t].fontsize=Number(e.value)}progressToTime(){let e=5*this.progress;return new Date(e).toISOString().slice(11,22)}generateUUID(){return w()}showTime(){document.querySelector("#time").innerHTML=this.progressToTime()}hideElement(e){"video"==this.timeline[e].filetype?this.pauseVideo(e):"audio"==this.timeline[e].filetype&&this.pauseAudio(e),document.querySelector(`#element-${e}`).classList.add("d-none")}appearAllElementInTime(){for(let e in this.timeline){let t=this.timeline[e].filetype,i=this.timeline[e].startTime>this.progress||this.timeline[e].startTime+this.timeline[e].duration<this.progress;"video"!=t&&"audio"!=t||(i=this.timeline[e].startTime+this.timeline[e].trim.startTime>this.progress||this.timeline[e].startTime+this.timeline[e].trim.endTime<this.progress),i?this.hideElement(e):"image"==t?this.showImage(e):"video"==t?this.showVideo(e):"text"==t?this.showText(e):"audio"==t&&this.showAudio(e)}}play(){let e=document.querySelector("#playToggle");e.setAttribute("onclick","elementControlComponent.stop()"),e.innerHTML='<span class="material-symbols-outlined icon-white icon-md"> stop_circle </span>',this.scroller=setInterval((()=>{let e=Number(this.timelineBar.style.left.split("px")[0])+4;this.progress=e,this.timelineBar.move(e),this.showTime(),this.innerWidth+this.offsetWidth>=this.offsetWidth&&this.stop(),this.appearAllElementInTime()}),20),this.isPaused=!1}stop(){clearInterval(this.scroller);const e=document.querySelector("#playToggle");this.isPaused=!0;for(const e in this.timeline)Object.hasOwnProperty.call(this.timeline,e)&&(this.isPlay[e]=!1);e.setAttribute("onclick","elementControlComponent.play()"),e.innerHTML='<span class="material-symbols-outlined icon-white icon-md"> play_circle </span>',this.showTime(),this.pauseAllDynamicElements()}pauseVideo(e){let t=-(this.timeline[e].startTime-this.progress)/200,i=document.getElementById(`element-${e}`).querySelector("video");i.currentTime=t,i.pause()}pauseAudio(e){document.getElementById(`element-${e}`).querySelector("audio").pause()}pauseAllDynamicElements(){let e;for(e in this.timeline){let t=this.timeline[e].filetype;"video"==t?this.pauseVideo(e):"audio"==t&&this.pauseAudio(e)}}reset(){this.progress=0,this.isPaused=!0,this.showTime(),this.appearAllElementInTime(),this.timelineBar.move(0)}}class T extends HTMLElement{constructor(){super(),this.timeline=document.querySelector("element-timeline").timeline,this.elementId=this.getAttribute("element-id"),this.elementFiletype=this.getAttribute("element-filetype")||"image",this.isDrag=!1,this.isResize=!1,this.initialPosition={x:0,y:0,w:0,h:0},this.resizeDirection="n",this.resizeEventHandler,this.dragdownEventHandler,this.dragupEventHandler}render(){let e;"image"==this.elementFiletype?e=this.templateImage()+this.templateResize():"video"==this.elementFiletype?e=this.templateVideo()+this.templateResize():"text"==this.elementFiletype?e=this.templateText()+this.templateResize("horizon"):"audio"==this.elementFiletype&&(e=this.templateAudio()),this.classList.add("element-drag"),this.setAttribute("id",`element-${this.elementId}`),this.setAttribute("style",`width: ${this.timeline[this.elementId].width}px; top: ${this.timeline[this.elementId].location.y}px; left: ${this.timeline[this.elementId].location.x}px;`),"text"!==this.elementFiletype&&this.setAttribute("style",`width: ${this.timeline[this.elementId].width}px; top: ${this.timeline[this.elementId].location.y}px; left: ${this.timeline[this.elementId].location.x}px; height: ${this.timeline[this.elementId].height}px;`),this.innerHTML=e}templateImage(){return`\n        <img src="${this.timeline[this.elementId].blob}" alt="" class="element-image" draggable="false">`}templateVideo(){return`\n        <video src="${this.timeline[this.elementId].blob}" alt="" class="element-video" draggable="false"></video>`}templateAudio(){return`\n        <audio src="${this.timeline[this.elementId].blob}" class="d-none" draggable="false"></video>`}templateText(){return`<input type="text" class="asset-transparent element-text" draggable="false" style="color: rgb(255, 255, 255); font-size: 20px;" onkeyup="document.querySelector('element-control').changeText('${this.elementId}')" value="${this.timeline[this.elementId].text}">`}templateResize(e="full"){let t='<div class="resize-n" onmousedown="this.parentNode.resizeMousedown(\'n\')"></div>',i='<div class="resize-s" onmousedown="this.parentNode.resizeMousedown(\'s\')"></div>',s='<div class="resize-w" onmousedown="this.parentNode.resizeMousedown(\'w\')"></div>',n='<div class="resize-e" onmousedown="this.parentNode.resizeMousedown(\'e\')"></div>';return"full"==e?`\n            ${t}\n            ${i}\n            ${s}\n            ${n}\n            <div class="resize-ne" onmousedown="this.parentNode.resizeMousedown('ne')"></div>\n            <div class="resize-nw" onmousedown="this.parentNode.resizeMousedown('nw')"></div>\n            <div class="resize-se" onmousedown="this.parentNode.resizeMousedown('se')"></div>\n            <div class="resize-sw" onmousedown="this.parentNode.resizeMousedown('sw')"></div>\n            `:"vertical"==e?`\n            ${t}\n            ${i}\n            `:"horizon"==e?`\n            ${s}\n            ${n}\n            `:void 0}pxToInteger(e="0px"){return Number(e.split("px")[0])}drag(e){if(this.isDrag){let t=e.clientX-this.initialPosition.x,i=e.clientY-this.initialPosition.y,s=["img","video","input"],n="";for(let e=0;e<s.length;e++)this.querySelector(s[e])&&(n=s[e]);t>window.innerWidth?document.removeEventListener("mousemove",this.dragdownEventHandler):(this.style.top=`${i}px`,this.style.left=`${t}px`,this.timeline[this.elementId].location.x=t,this.timeline[this.elementId].location.y=i)}}dragMousedown(e){this.isResize||(this.isDrag=!0,this.initialPosition.x=e.pageX-this.pxToInteger(this.style.left),this.initialPosition.y=e.pageY-this.pxToInteger(this.style.top),this.dragdownEventHandler=this.drag.bind(this),document.addEventListener("mousemove",this.dragdownEventHandler))}dragMouseup(){document.removeEventListener("mousemove",this.dragdownEventHandler),this.isDrag=!1}getGcd(e,t){return 0==t?e:this.getGcd(t,e%t)}resize(e){this.isDrag=!1;const t=document.querySelector("#video").getBoundingClientRect();let i=e.pageX-t.left-this.initialPosition.x,s=e.pageY-t.top-this.initialPosition.y;switch(this.initialPosition.w,this.initialPosition.h,this.resizeDirection){case"n":this.resizeStyle({y:this.initialPosition.y+s,h:this.initialPosition.h-s});break;case"s":this.resizeStyle({y:this.initialPosition.y,h:s});break;case"w":this.resizeStyle({x:this.initialPosition.x+i,w:this.initialPosition.w-i});break;case"e":this.resizeStyle({x:this.initialPosition.x,w:i});break;case"ne":this.resizeStyle({y:this.initialPosition.y+s,h:this.initialPosition.h-s,w:i});break;case"nw":this.resizeStyle({x:this.initialPosition.x+i,y:this.initialPosition.y+s,h:this.initialPosition.h-s,w:this.initialPosition.w-i});break;case"sw":this.resizeStyle({x:this.initialPosition.x+i,h:s,w:this.initialPosition.w-i});break;case"se":this.resizeStyle({x:this.initialPosition.x,y:this.initialPosition.y,h:s,w:i})}this.timeline[this.elementId].location.y=Number(this.style.top.split("px")[0]),this.timeline[this.elementId].location.x=Number(this.style.left.split("px")[0]),this.timeline[this.elementId].width=Number(this.style.width.split("px")[0]),this.timeline[this.elementId].height=Number(this.style.height.split("px")[0])}resizeStyle({x:e,y:t,w:i,h:s}){this.style.left=0==!e?`${e}px`:this.style.left,this.style.top=0==!t?`${t}px`:this.style.top,this.style.width=0==!i?`${i}px`:this.style.width,this.style.height=0==!s?`${s}px`:this.style.height}resizeMousedown(e){this.isDrag=!1,this.isResize=!0,this.resizeDirection=e,this.initialPosition.w=Number(this.style.width.split("px")[0]),this.initialPosition.h=Number(this.style.height.split("px")[0]),this.initialPosition.x=Number(this.style.left.split("px")[0]),this.initialPosition.y=Number(this.style.top.split("px")[0]),this.resizeEventHandler=this.resize.bind(this),document.addEventListener("mousemove",this.resizeEventHandler)}resizeMouseup(){document.removeEventListener("mousemove",this.resizeEventHandler),this.isResize=!1}activateOutline(){const e=document.querySelector("element-control");this.deactivateAllOutline(),e.activeElementId=this.elementId,this.classList.add("element-outline")}deactivateAllOutline(){const e=document.querySelector("element-control"),t=document.querySelector("element-timeline");for(const e in t.timeline)Object.hasOwnProperty.call(t.timeline,e)&&document.querySelector(`#element-${e}`).classList.remove("element-outline");e.activeElementId=""}dblClick(){let e=new bootstrap.Offcanvas(document.getElementById("option_top")),t=["option_text"];for(let e=0;e<t.length;e++){const i=t[e];document.querySelector(`#${i}`).classList.add("d-none")}"text"==this.elementFiletype&&(document.querySelector("#option_text").classList.remove("d-none"),document.querySelector("#optionTargetElement").value=this.elementId,e.show())}connectedCallback(){this.render(),this.addEventListener("mousedown",this.dragMousedown.bind(this)),document.addEventListener("mouseup",this.dragMouseup.bind(this)),this.addEventListener("mousedown",this.activateOutline.bind(this)),this.addEventListener("dblclick",this.dblClick.bind(this)),document.addEventListener("mouseup",this.resizeMouseup.bind(this))}}customElements.define("asset-list",r),customElements.define("asset-file",a),customElements.define("asset-folder",d),customElements.define("asset-browser",h),customElements.define("element-timeline",m),customElements.define("element-timeline-bar",c),customElements.define("element-timeline-editor",u),customElements.define("element-bar",p),customElements.define("element-control",x),customElements.define("element-control-asset",T),NUGGET=t})();