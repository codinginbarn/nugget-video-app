var NUGGET;(()=>{"use strict";var e={d:(t,i)=>{for(var n in i)e.o(i,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:i[n]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{asset:()=>f,canvas:()=>y,directory:()=>b,element:()=>p});const i={randomUUID:"undefined"!=typeof crypto&&crypto.randomUUID&&crypto.randomUUID.bind(crypto)};let n;const s=new Uint8Array(16);function l(){if(!n&&(n="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!n))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return n(s)}const o=[];for(let e=0;e<256;++e)o.push((e+256).toString(16).slice(1));const r=function(e,t,n){if(i.randomUUID&&!t&&!e)return i.randomUUID();const s=(e=e||{}).random||(e.rng||l)();if(s[6]=15&s[6]|64,s[8]=63&s[8]|128,t){n=n||0;for(let e=0;e<16;++e)t[n+e]=s[e];return t}return function(e,t=0){return(o[e[t+0]]+o[e[t+1]]+o[e[t+2]]+o[e[t+3]]+"-"+o[e[t+4]]+o[e[t+5]]+"-"+o[e[t+6]]+o[e[t+7]]+"-"+o[e[t+8]]+o[e[t+9]]+"-"+o[e[t+10]]+o[e[t+11]]+o[e[t+12]]+o[e[t+13]]+o[e[t+14]]+o[e[t+15]]).toLowerCase()}(s)},a={},d={},c={scroller:void 0,isPaused:!0,progress:split_inner_bottom.scrollLeft,start:function(){let e=document.querySelector("#playToggle");e.setAttribute("onclick","nugget.element.player.stop()"),e.innerHTML='<span class="material-symbols-outlined icon-white icon-md"> stop_circle </span>',c.scroller=setInterval((function(){let e=Number(timeline_bar.style.left.split("px")[0])+4;timeline_bar.style.left=`${e}px`,c.progress=e,split_inner_bottom.innerWidth+split_inner_bottom.offsetWidth>=split_inner_bottom.offsetWidth&&c.stop(),h.play()}),20),c.isPaused=!1},stop:function(){clearInterval(c.scroller),c.isPaused=!0;let e=document.querySelector("#playToggle");e.setAttribute("onclick","nugget.element.player.start()"),e.innerHTML='<span class="material-symbols-outlined icon-white icon-md"> play_circle </span>',h.pauseAllVideo()},reset:function(){timeline_bar.style.left="0px",c.progress=0,c.isPaused=!0}},m={state:{isDrag:!1,isResize:!1,resizeLocation:"left",resizeRangeLeft:0,resizeRangeRight:0,e:void 0,blob:"",elementId:"",criteria:{x:0,y:0,duration:1e3},criteriaResize:{x:0,y:0}},event:{drag:{onmousedown:function(e){m.state.elementId=e.getAttribute("value"),m.state.isDrag=!0,m.state.e=e,m.state.criteria.x=valueEvent.mouse.x-Number(m.state.e.style.left.replace(/[^0-9]/g,"")),m.state.criteria.y=valueEvent.mouse.y},onmouseup:function(e){m.state.isDrag=!1}},resize:{onmousedownrange:function(e,t="left"){m.state.e=e.parentNode.parentNode,m.state.elementId=m.state.e.getAttribute("value"),m.state.isResize=!0,m.state.resizeLocation=t,m.state.isDrag=!1,m.state.criteria.duration=a[m.state.elementId].duration+Number(m.state.e.style.left.replace(/[^0-9]/g,"")),m.state.criteriaResize.x=Number(m.state.e.style.left.replace(/[^0-9]/g,"")),m.state.resizeRangeLeft=Number(m.state.e.querySelector(".element-bar-hiddenspace-left").style.width.split("px")[0]),m.state.resizeRangeRight=Number(m.state.e.querySelector(".element-bar-hiddenspace-right").style.width.split("px")[0])},onmousedown:function(e,t="left"){m.state.elementId=e.parentNode.getAttribute("value"),m.state.isResize=!0,m.state.resizeLocation=t,m.state.isDrag=!1,m.state.e=e.parentNode,m.state.criteriaResize.x="left"==t?valueEvent.mouse.x-Number(m.state.e.style.left.replace(/[^0-9]/g,"")):Number(m.state.e.style.left.replace(/[^0-9]/g,"")),m.state.criteriaResize.y=valueEvent.mouse.y,m.state.criteria.duration=a[m.state.elementId].duration+Number(m.state.e.style.left.replace(/[^0-9]/g,""))},onmouseup:function(e){m.state.isResize=!1}}},append:function(e){let t,i=document.querySelector("#split_inner_bottom"),n=a[e].duration,s=a[e].filetype,l=a[e].localpath.split("/"),o=l[l.length-1],r=m.getRandomColor();"video"==s&&(t=`<div class="element-bar" style="width: ${n}px; left: 0px; background-color: ${r};" onmousedown="nugget.element.bar.event.drag.onmousedown(this)" value="${e}">\n            ${o}\n            <div class="element-bar-hiddenspace-left position-absolute">\n                <div class="element-bar-resize-hiddenspace-left position-absolute" onmousedown="nugget.element.bar.event.resize.onmousedownrange(this, 'left')">\n                </div>\n            </div>\n            <div class="element-bar-hiddenspace-right position-absolute">\n                <div class="element-bar-resize-hiddenspace-right position-absolute" onmousedown="nugget.element.bar.event.resize.onmousedownrange(this, 'right')">\n                </div>\n            </div>\n            </div>`);let d="video"!=s?`<div class="element-bar" style="width: ${n}px; left: 0px; background-color: ${r};" onmousedown="nugget.element.bar.event.drag.onmousedown(this)" value="${e}">\n            ${o}\n            <div class="element-bar-resize-left position-absolute" onmousedown="nugget.element.bar.event.resize.onmousedown(this, 'left')"></div>\n            <div class="element-bar-resize-right position-absolute" onmousedown="nugget.element.bar.event.resize.onmousedown(this, 'right')"></div>\n            </div>`:t;i.insertAdjacentHTML("beforeend",d)},drag:function(e,t){let i=m.state.elementId;m.state.e.style.left=`${e}px`,a[i].startTime=e},resizeDurationInTimeline:function(e,t="left"){let i=m.state.elementId,n=m.state.criteria.duration;"left"==t?(m.state.e.style.left=`${e}px`,m.state.e.style.width=n-e+"px",a[i].startTime=e,a[i].duration=Number(m.state.e.style.width.split("px")[0])):(m.state.e.style.left=`${m.state.criteriaResize.x}px`,m.state.e.style.width=split_inner_bottom.scrollLeft+valueEvent.mouse.x-m.state.criteriaResize.x+"px",a[i].startTime=m.state.criteriaResize.x,a[i].duration=Number(m.state.e.style.width.split("px")[0]))},resizeRangeOnElement:function(e,t="left"){let i=m.state.elementId,n=m.state.criteria.duration,s=Number(m.state.e.style.width.split("px")[0]),l=(m.state.resizeRangeLeft,m.state.resizeRangeRight,m.state.e.querySelector(".element-bar-hiddenspace-left")),o=m.state.e.querySelector(".element-bar-hiddenspace-right"),r=window.innerWidth,d=split_inner_bottom.scrollWidth,c=Number(m.state.e.style.left.split("px")[0]),u=d-r-split_inner_bottom.scrollLeft,h=r-s-c>0?r-s-c-10:0;"left"==t?(l.style.width=e+split_inner_bottom.scrollLeft-5+"px",a[i].trim.startTime=Number(l.style.width.split("px")[0])):(o.style.width=u+window.innerWidth-e-m.state.criteriaResize.x-h+"px",a[i].trim.endTime=n-Number(o.style.width.split("px")[0]))},getRandomColor:function(){return"#"+Math.round(16777215*Math.random()).toString(16)+"51"}},u={state:{activeElementId:"",isDrag:!1,isResize:!1,e:void 0,elementId:"",criteriaDrag:{x:0,y:0},criteriaResize:{x:0,y:0,w:0,h:0},resizeDirection:"",resizeTargetElementId:""},event:{click:{activateOutline:function(e){u.event.click.deactivateAllOutline(),u.state.activeElementId=e,document.querySelector(`#element-${e}`).classList.add("element-outline")},deactivateAllOutline:function(){console.log("S");for(const e in a)Object.hasOwnProperty.call(a,e)&&document.querySelector(`#element-${e}`).classList.remove("element-outline");u.state.activeElementId=""}},drag:{onmousedown:function(e){u.event.click.activateOutline(e.id.split("element-")[1]),u.state.isDrag=!0,u.state.e=e,u.state.criteriaDrag.x=valueEvent.mouse.x-Number(u.state.e.style.left.replace(/[^0-9]/g,"")),u.state.criteriaDrag.y=valueEvent.mouse.y-Number(u.state.e.style.top.replace(/[^0-9]/g,""))},onmouseup:function(e){u.state.isDrag=!1}},resize:{onmousedown:function(e,t="n"){let i=document.querySelector(`#element-${e}`);u.state.isDrag=!1,u.state.criteriaResize.w=Number(i.style.width.split("px")[0]),u.state.criteriaResize.h=Number(i.style.height.split("px")[0]),u.state.criteriaResize.x=Number(i.style.left.split("px")[0]),u.state.criteriaResize.y=Number(i.style.top.split("px")[0]),u.state.isResize=!0,u.state.resizeTargetElementId=e,u.state.resizeDirection=t}},textinput:{onkeyup:function(e){let t=document.querySelector(`#element-${e}`).querySelector("input").value;console.log(e,t),a[e].text=t}}},add:{image:function(e,t){let i=document.createElement("img"),n=u.generateUUID();i.src=e,i.onload=function(){var s=i.width/10,l=i.height/10;a[n]={startTime:0,duration:1e3,location:{x:0,y:0},width:s,height:l,localpath:t,filetype:"image"},d[n]={blob:e},h.show.image(n),m.append(n)}},video:function(e,t){let i=document.createElement("video"),n=u.generateUUID();i.src=e,i.preload="metadata",i.onloadedmetadata=function(){let s=i.videoWidth/10,l=i.videoHeight/10,o=200*i.duration;a[n]={startTime:0,duration:o,location:{x:0,y:0},trim:{startTime:0,endTime:o},width:s,height:l,localpath:t,filetype:"video"},d[n]={blob:e},h.show.video(n),m.append(n)}},text:function(){let e=u.generateUUID();a[e]={startTime:0,duration:1e3,text:"텍스트",location:{x:0,y:0},localpath:"/TESTELEMENT",filetype:"text"},h.show.text(e),m.append(e)}},drag:function(e,t){let i=u.state.e,n=["img","video","input"],s="";for(let e=0;e<n.length;e++)i.querySelector(n[e])&&(s=n[e]);let l=i.querySelector(s).parentNode.getAttribute("id").split("element-")[1];i.style.top=`${t}px`,i.style.left=`${e}px`,a[l].location.x=e,a[l].location.y=t},dragover:function(e){e.stopPropagation(),e.preventDefault()},drop:function(e){e.stopPropagation(),e.preventDefault()},onmouseup:function(e){u.state.isResize=!1,u.state.isDrag=!1;for(const e in a)Object.hasOwnProperty.call(a,e)&&document.querySelector(`#element-${e}`)},generateUUID:function(){return r()},resize:{action:function(e,t){u.state.isDrag=!1;let i=u.state.resizeTargetElementId,n=document.querySelector(`#element-${i}`);switch(u.state.resizeDirection){case"n":n.style.top=`${u.state.criteriaResize.y+t}px`,n.style.height=u.state.criteriaResize.h-t+"px";break;case"s":n.style.top=`${u.state.criteriaResize.y}px`,n.style.height=`${t}px`;break;case"w":n.style.left=`${u.state.criteriaResize.x+e}px`,n.style.width=u.state.criteriaResize.w-e+"px";break;case"e":n.style.left=`${u.state.criteriaResize.x}px`,n.style.width=`${e}px`}a[i].location.y=Number(n.style.top.split("px")[0]),a[i].location.x=Number(n.style.left.split("px")[0]),a[i].width=Number(n.style.width.split("px")[0]),a[i].height=Number(n.style.height.split("px")[0])}}},h={previewRatio:1920/preview.width,show:{image:function(e){let t=d[e].blob;null==document.getElementById(`element-${e}`)?control.insertAdjacentHTML("beforeend",`\n                <div id="element-${e}" class="element-drag" style='width: ${a[e].width}px; height: ${a[e].height}px; top: 0px; left: 0px;' onmousedown="nugget.element.control.event.drag.onmousedown(this)" onclick="nugget.element.control.event.click.activateOutline('${e}')">\n                <img src="${t}" alt="" class="element-image" draggable="false">\n                <div class="resize-n" onmousedown="nugget.element.control.event.resize.onmousedown('${e}', 'n')"></div>\n                <div class="resize-s" onmousedown="nugget.element.control.event.resize.onmousedown('${e}', 's')"></div>\n                <div class="resize-w" onmousedown="nugget.element.control.event.resize.onmousedown('${e}', 'w')"></div>\n                <div class="resize-e" onmousedown="nugget.element.control.event.resize.onmousedown('${e}', 'e')"></div>\n    \n                </div>\n                `):document.querySelector(`#element-${e}`).classList.remove("d-none")},video:function(e){let t=d[e].blob;if(null==document.getElementById(`element-${e}`)){control.insertAdjacentHTML("beforeend",`\n                <div id="element-${e}" class="element-drag" style='width: ${a[e].width}px; height: ${a[e].height}px; top: 0px; left: 0px;' onmousedown="nugget.element.control.event.drag.onmousedown(this)" onclick="nugget.element.control.event.click.activateOutline('${e}')">\n                <video src="${t}" alt="" class="element-video" draggable="false"></video>\n                <div class="resize-n" onmousedown="nugget.element.control.event.resize.onmousedown('${e}', 'n')"></div>\n                <div class="resize-s" onmousedown="nugget.element.control.event.resize.onmousedown('${e}', 's')"></div>\n                <div class="resize-w" onmousedown="nugget.element.control.event.resize.onmousedown('${e}', 'w')"></div>\n                <div class="resize-e" onmousedown="nugget.element.control.event.resize.onmousedown('${e}', 'e')"></div>\n    \n                </div>\n                `);let i=document.getElementById(`element-${e}`).querySelector("video"),n=(a[e].startTime-c.progress)/200;i.currentTime=n}else{let t=document.getElementById(`element-${e}`).querySelector("video"),i=-(a[e].startTime-c.progress)/200;t.currentTime>0&&!t.paused&&!t.ended&&t.readyState>2?(c.isPaused&&console.log("paused"),console.log("isPlaying")):(t.currentTime=i,t.play()),document.querySelector(`#element-${e}`).classList.remove("d-none")}},text:function(e){null==document.getElementById(`element-${e}`)?control.insertAdjacentHTML("beforeend",`\n                <div id="element-${e}" class="element-drag" style='top: 0px; left: 0px;' onmousedown="nugget.element.control.event.drag.onmousedown(this)" onclick="nugget.element.control.event.click.activateOutline('${e}')">\n                <input type="text" class="form-transparent element-text" draggable="false" onkeyup="nugget.element.control.event.textinput.onkeyup('${e}')" value="텍스트">\n                <div class="resize-n" onmousedown="nugget.element.control.event.resize.onmousedown('${e}', 'n')"></div>\n                <div class="resize-s" onmousedown="nugget.element.control.event.resize.onmousedown('${e}', 's')"></div>\n                <div class="resize-w" onmousedown="nugget.element.control.event.resize.onmousedown('${e}', 'w')"></div>\n                <div class="resize-e" onmousedown="nugget.element.control.event.resize.onmousedown('${e}', 'e')"></div>\n    \n                </div>\n                `):document.querySelector(`#element-${e}`).classList.remove("d-none")}},hide:function(e){"video"==a[e].filetype&&h.pauseVideo(e),document.querySelector(`#element-${e}`).classList.add("d-none")},play:function(){let e;for(e in a){location.origin,d[e];let t=a[e].filetype,i=a[e].startTime>c.progress||a[e].startTime+a[e].duration<c.progress;"video"==t&&(i=a[e].startTime+a[e].trim.startTime>c.progress||a[e].startTime+a[e].trim.endTime<c.progress),i?h.hide(e):h.show[t](e)}},pauseVideo:function(e){document.getElementById(`element-${e}`).querySelector("video").pause()},pauseAllVideo:function(){let e;for(e in a)"video"==a[e].filetype&&document.getElementById(`element-${e}`).querySelector("video").pause()}},p={timeline:a,player:c,bar:m,control:u,preview:h},g={mediaRecorder:void 0,resize:function(){let e=document.getElementById("split_col_2").offsetWidth,t=(document.getElementById("split_col_2").offsetHeight,.95*e),i=9*t/16;preview.width=t,preview.height=i,preview.style.width=`${t}px`,preview.style.height=`${i}px`,video.style.width=`${t}px`,video.style.height=`${i}px`,nugget.element.preview.previewRatio=1920/t},render:function(e){let t,i=e.getContext("2d");for(t in preview.clear(),nugget.element.timeline){let e=`blob:${location.origin}/${t}`;if(nugget.element.timeline[t].startTime>nugget.element.player.progress||nugget.element.timeline[t].startTime+nugget.element.timeline[t].duration<nugget.element.player.progress);else{let n=new Image;n.src=e,i.drawImage(n,nugget.element.timeline[t].location.x,nugget.element.timeline[t].location.y,nugget.element.timeline[t].width,nugget.element.timeline[t].height)}}let n=document.getElementById("split_inner_bottom");n.scrollWidth-n.offsetWidth<=nugget.element.player.progress+1&&null!=g.mediaRecorder&&g.mediaRecorder.stop()},clear:function(e){preview.width=preview.width},export:function(){let e=[];return new Promise((function(t,i){let n=preview.captureStream(60);g.mediaRecorder=new MediaRecorder(n,{mimeType:"video/webm; codecs=vp9"}),g.mediaRecorder.start(0),g.mediaRecorder.ondataavailable=function(t){e.push(event.data)},g.mediaRecorder.onstop=function(i){let n=new Blob(e,{type:"video/webm"}),s=URL.createObjectURL(n);t({url:s,blobVideo:n}),exportVideo.src=s,exportVideoModal.show()},nugget.element.player.start(),g.render()}))}},y={preview:g},v={nowDirectory:"",loadPrevDirectory:function(){let e=v.nowDirectory.split("/"),t=e.slice(-e.length,-1);ipc.requestAllDir(t.join("/"))},add:function(e,t){fetch(`file://${e}`).then((e=>e.blob())).then((t=>{let i=URL.createObjectURL(t),n=t.type.split("/")[0],s=document.querySelector("element-control");"image"==n?s.addImage(i,e):"video"==n&&s.addVideo(i,e)}))}},f=v,b={select:function(){const e=document.createElement("input"),t=document.querySelector("#projectFolder");e.setAttribute("type","file"),e.setAttribute("webkitdirectory",""),e.click(),e.addEventListener("change",(function(){const e=this.files[0].path.split("/");e.pop();const i=e.join("/");t.value=i}),!1)}};class w extends HTMLElement{constructor(){super(),this.nowDirectory=""}render(){const e=this.template();this.innerHTML=e}template(){return'<div class="row px-2"></div>'}getFile(e){let t=e.split("."),i=t.length;i<=2||t[i-1],this.querySelector("div").insertAdjacentHTML("beforeend",`<asset-file asset-name="${e}"></asset-file>`)}getFolder(e){let t=e.split(".").length;t<=2||splitedFilename[t-1],this.querySelector("div").insertAdjacentHTML("beforeend",`<asset-folder asset-name="${e}"></asset-folder>`)}clearList(){this.querySelector("div").innerHTML=""}connectedCallback(){this.render()}}class x extends HTMLElement{constructor(){super(),this.classList.add("col-4","d-flex","flex-column","bd-highlight","overflow-hidden","mt-1","asset"),this.filename=this.getAttribute("asset-name"),this.directory=document.querySelector("asset-list").nowDirectory}render(){const e=this.template();this.innerHTML=e}template(){return`<span class="material-symbols-outlined icon-lg align-self-center"> draft </span>\n        <b class="align-self-center text-ellipsis-scroll text-light text-center">${this.filename}</b>`}handleClick(){this.patchToControl(`${this.directory}/${this.filename}`,`${this.directory}`)}patchToControl(e,t){fetch(`file://${e}`).then((e=>e.blob())).then((t=>{let i=URL.createObjectURL(t),n=t.type.split("/")[0],s=document.querySelector("element-control");"image"==n?s.addImage(i,e):"video"==n&&s.addVideo(i,e)}))}connectedCallback(){this.render(),this.addEventListener("click",this.handleClick.bind(this))}disconnectedCallback(){this.removeEventListener("click",this.handleClick)}}class z extends HTMLElement{constructor(){super(),this.classList.add("col-4","d-flex","flex-column","bd-highlight","overflow-hidden","mt-1","asset"),this.foldername=this.getAttribute("asset-name"),this.directory=document.querySelector("asset-list").nowDirectory}render(){const e=this.template();this.innerHTML=e}template(){return`<span class="material-symbols-outlined icon-lg align-self-center"> folder </span>\n        <b class="align-self-center text-ellipsis text-light text-center">${this.foldername}</b>`}handleClick(){ipc.requestAllDir(`${this.directory}/${this.foldername}`)}connectedCallback(){this.render(),this.addEventListener("click",this.handleClick.bind(this))}disconnectedCallback(){this.removeEventListener("click",this.handleClick)}}class $ extends HTMLElement{constructor(){super(),this.directory=""}render(){const e=this.template();this.innerHTML=e}template(){return'<div class="row p-0 mt-2">\n        <div class="col-2">\n            <button class="btn btn-transparent btn-sm"><span class="material-symbols-outlined icon-sm"> arrow_upward </span> </button>\n        </div>\n        <div class="col-10">\n            <input type="text" class="form-control" aria-describedby="basic-addon1" value="" disabled>\n        </div>\n        </div>'}updateDirectoryInput(e){this.querySelector("div").querySelectorAll("div")[1].querySelector("input").value=e}clickPrevDirectoryButton(){this.directory=document.querySelector("asset-list").nowDirectory;let e=this.directory.split("/"),t=e.slice(-e.length,-1);ipc.requestAllDir(t.join("/"))}connectedCallback(){this.render(),this.querySelector("div").querySelectorAll("div")[0].querySelector("button").addEventListener("click",this.clickPrevDirectoryButton.bind(this))}disconnectedCallback(){this.querySelector("div").querySelectorAll("div")[0].querySelector("button").removeEventListener("click",this.clickPrevDirectoryButton)}}class T extends HTMLElement{constructor(){super(),this.timeline={}}render(){const e=this.template();this.classList.add("col-12","cursor-default","h-100","line"),this.innerHTML=e}template(){return'<div id="timeline_bar" class="timeline-bar" style="left: 0px;"></div>'}replaceTimelineBarHeight(e){this.querySelector(".timeline-bar").style.height=`${e}px`}getTimelineScrollHeight(){return this.scrollHeight}addElementBar(e){const t=this.templateElementBar(e);this.insertAdjacentHTML("beforeend",t);let i=this.getTimelineScrollHeight();this.replaceTimelineBarHeight(i)}templateElementBar(e){this.timeline[e].duration;let t=this.timeline[e].filetype,i=this.timeline[e].localpath.split("/"),n=(i[i.length-1],this.getElementType(t));return"static"==n?`<element-bar element-id="${e}" element-type="static"></element-bar>`:"dynamic"==n?`<element-bar element-id="${e}" element-type="dynamic"></element-bar>`:"none"}getElementType(e){let t="undefined";const i={static:["image","text","png","jpg","jpeg"],dynamic:["video","mp4","mp3","mov"]};for(const n in i)if(Object.hasOwnProperty.call(i,n)&&i[n].indexOf(e)>=0){t=n;break}return t}connectedCallback(){this.render()}}class E extends HTMLElement{constructor(){super(),this.timeline=document.querySelector("element-timeline").timeline,this.elementId=this.getAttribute("element-id"),this.elementBarType=this.getAttribute("element-type")||"static",this.width=this.timeline[this.elementId].duration,this.isDrag=!1,this.isResize=!1,this.resizeLocation="left",this.initialDuration=1e3,this.initialPosition={x:0,y:0};let e=this.timeline[this.elementId].localpath.split("/");this.filepath=e[e.length-1],this.resizeEventHandler}render(){let e;e="static"==this.elementBarType?this.templateStatic():this.templateDynamic();const t=this.getRandomColor();this.classList.add("element-bar","d-block"),this.setAttribute("style",`width: ${this.width}px; left: 0px; background-color: ${t};`),this.setAttribute("value",this.elementId),this.innerHTML=e}templateStatic(){return`\n        ${this.filepath}\n        <div class="element-bar-resize-left position-absolute" onmousedown="this.parentNode.resizeMousedown(this, 'left')"></div>\n        <div class="element-bar-resize-right position-absolute" onmousedown="this.parentNode.resizeMousedown(this, 'right')"></div>\n        `}templateDynamic(){return`\n        ${this.filepath}\n        <div class="element-bar-hiddenspace-left position-absolute">\n            <div class="element-bar-resize-hiddenspace-left position-absolute" onmousedown="this.parentNode.parentNode.resizeRangeMousedown(this, 'left')">\n            </div>\n        </div>\n        <div class="element-bar-hiddenspace-right position-absolute">\n            <div class="element-bar-resize-hiddenspace-right position-absolute" onmousedown="this.parentNode.parentNode.resizeRangeMousedown(this, 'right')">\n            </div>\n        </div>\n        `}getRandomArbitrary(e,t){return Math.round(Math.random()*(t-e)+e)}getRandomColor(){Math.round(16777215*Math.random()).toString(16);return`rgb(${this.getRandomArbitrary(45,167)},${this.getRandomArbitrary(23,139)},${this.getRandomArbitrary(56,180)})`}drag(e){if(this.isDrag){let t=e.pageX-this.initialPosition.x;e.pageY,this.initialPosition.y,this.style.left=`${t}px`,this.timeline[this.elementId].startTime=t}}dragMousedown(e){this.addEventListener("mousemove",this.drag),console.log("DRG"),this.isDrag=!0,this.initialPosition.x=e.pageX-Number(this.style.left.replace(/[^0-9]/g,"")),this.initialPosition.y=e.pageY}dragMouseup(){this.removeEventListener("mousemove",this.drag),this.isDrag=!1}resize(e){this.isDrag=!1;let t=e.pageX-this.initialPosition.x,i=(e.pageY,this.initialPosition.y,this.initialDuration),n=document.querySelector("element-timeline").scrollLeft;"left"==this.resizeLocation?(this.style.left=`${t}px`,this.style.width=i-t+"px",this.timeline[this.elementId].startTime=t,this.timeline[this.elementId].duration=Number(this.style.width.split("px")[0])):(this.style.width=n+e.pageX-Number(this.style.left.split("px")[0])+"px",this.timeline[this.elementId].duration=Number(this.style.width.split("px")[0]))}resizeRange(e){this.isDrag=!1;let t=e.pageX-this.initialPosition.x,i=this.initialDuration,n=Number(this.style.width.split("px")[0]),s=this.querySelector(".element-bar-hiddenspace-left"),l=this.querySelector(".element-bar-hiddenspace-right"),o=document.querySelector("element-timeline"),r=window.innerWidth,a=o.scrollWidth,d=Number(this.style.width.split("px")[0]),c=Number(this.style.left.split("px")[0]),m=r-n-c<0?a-(c+d):0,u=o.scrollLeft,h=a-r-u,p=r-n-c>0?r-n-c-10:0;"left"==this.resizeLocation?(s.style.width=this.initialPosition.x+t+u-c+"px",this.timeline[this.elementId].trim.startTime=Number(s.style.width.split("px")[0])):(l.style.width=h+r-t-this.initialPosition.x-p-m+"px",this.timeline[this.elementId].trim.endTime=i-Number(l.style.width.split("px")[0]))}resizeMousedown(e,t){console.log(this,Number(this.style.left.split("px")[0])),this.isResize=!0,this.resizeLocation=t,this.isDrag=!1,this.initialPosition.x="left"==t?e.pageX-Number(this.style.left.split("px")[0]):Number(this.style.left.split("px")[0]),this.initialPosition.y=e.pageY,this.initialDuration=this.timeline[this.elementId].duration+Number(this.style.left.replace(/[^0-9]/g,"")),this.resizeEventHandler=this.resize.bind(this),document.addEventListener("mousemove",this.resizeEventHandler)}resizeRangeMousedown(e,t){this.isResize=!0,this.resizeLocation=t,this.resizeRangeLeft=Number(this.querySelector(".element-bar-hiddenspace-left").style.width.split("px")[0]),this.resizeRangeRight=Number(this.querySelector(".element-bar-hiddenspace-right").style.width.split("px")[0]),this.isDrag=!1,this.initialPosition.x=Number(this.style.left.replace(/[^0-9]/g,"")),this.initialDuration=this.timeline[this.elementId].duration+Number(this.style.left.replace(/[^0-9]/g,"")),this.resizeEventHandler=this.resizeRange.bind(this),document.addEventListener("mousemove",this.resizeEventHandler)}resizeMouseup(){document.removeEventListener("mousemove",this.resizeEventHandler),this.isResize=!1}connectedCallback(){this.render(),this.addEventListener("mousedown",this.dragMousedown.bind(this)),this.addEventListener("mouseup",this.dragMouseup.bind(this)),document.addEventListener("mouseup",this.resizeMouseup.bind(this))}disconnectedCallback(){this.removeEventListener("mousedown",this.dragMousedown),this.removeEventListener("mouseup",this.dragMouseup)}}class S extends HTMLElement{constructor(){super(),this.scroller=void 0,this.isPaused=!0,this.progress=0,this.activeElementId="",this.previewRatio=1920/1080,this.resize()}resize(){let e=document.getElementById("split_col_2").offsetWidth,t=(document.getElementById("split_col_2").offsetHeight,.95*e),i=9*t/16;preview.width=t,preview.height=i,preview.style.width=`${t}px`,preview.style.height=`${i}px`,video.style.width=`${t}px`,video.style.height=`${i}px`,this.previewRatio=1920/t}addImage(e,t){const i=this.generateUUID(),n=document.querySelector("element-timeline");let s=document.createElement("img");s.src=e,s.onload=()=>{var l=s.width/10,o=s.height/10;n.timeline[i]={blob:e,startTime:0,duration:1e3,location:{x:0,y:0},width:l,height:o,localpath:t,filetype:"image"},this.showImage(i),n.addElementBar(i)}}addVideo(e,t){let i=document.createElement("video");const n=this.generateUUID(),s=document.querySelector("element-timeline");i.src=e,i.preload="metadata",i.onloadedmetadata=()=>{let l=i.videoWidth/10,o=i.videoHeight/10,r=200*i.duration;s.timeline[n]={blob:e,startTime:0,duration:r,location:{x:0,y:0},trim:{startTime:0,endTime:r},width:l,height:o,localpath:t,filetype:"video"},this.showVideo(n),s.addElementBar(n)}}addText(){const e=this.generateUUID(),t=document.querySelector("element-timeline");t.timeline[e]={startTime:0,duration:1e3,text:"텍스트",textcolor:"#ffffff",fontsize:20,location:{x:0,y:0},localpath:"/TEXTELEMENT",filetype:"text"},this.showText(e),t.addElementBar(e)}showImage(e){document.querySelector("element-timeline").timeline[e].blob,null==document.getElementById(`element-${e}`)?this.insertAdjacentHTML("beforeend",`<element-control-asset element-id="${e}" element-filetype="image"></element-control-asset>\n            `):document.querySelector(`#element-${e}`).classList.remove("d-none")}showVideo(e){const t=document.querySelector("element-timeline");if(null==document.getElementById(`element-${e}`)){this.insertAdjacentHTML("beforeend",`<element-control-asset element-id="${e}" element-filetype="video"></element-control-asset>`);let i=document.getElementById(`element-${e}`).querySelector("video"),n=(t.timeline[e].startTime-this.progress)/200;i.currentTime=n}else{let i=document.getElementById(`element-${e}`).querySelector("video"),n=-(t.timeline[e].startTime-this.progress)/200;i.currentTime>0&&!i.paused&&!i.ended&&i.readyState>2?(this.isPaused&&console.log("paused"),console.log("isPlaying")):(i.currentTime=n,i.play()),document.querySelector(`#element-${e}`).classList.remove("d-none")}}showText(e){null==document.getElementById(`element-${e}`)?this.insertAdjacentHTML("beforeend",`<element-control-asset element-id="${e}" element-filetype="text"></element-control-asset>\n            `):document.querySelector(`#element-${e}`).classList.remove("d-none")}changeText(e){const t=document.querySelector("element-timeline");let i=document.querySelector(`#element-${e}`).querySelector("input").value;t.timeline[e].text=i}changeTextColor(e){const t=document.querySelector("element-timeline");let i=document.querySelector("#optionTargetElement").value;document.querySelector(`#element-${i}`).querySelector("input").style.color=e.value,t.timeline[i].textcolor=e.value}changeTextSize(e){console.log(e);const t=document.querySelector("element-timeline");let i=document.querySelector("#optionTargetElement").value;document.querySelector(`#element-${i}`).querySelector("input").style.fontSize=`${e.value}px`,t.timeline[i].fontsize=Number(e.value)}progressToTime(){let e=5*this.progress;return new Date(e).toISOString().slice(11,22)}generateUUID(){return r()}hideElement(e){"video"==document.querySelector("element-timeline").timeline[e].filetype&&this.pauseVideo(e),document.querySelector(`#element-${e}`).classList.add("d-none")}play(){const e=document.querySelector("element-timeline").timeline,t=document.querySelector("element-timeline").querySelector("div"),i=document.querySelector("#time");let n=document.querySelector("#playToggle");n.setAttribute("onclick","elementControlComponent.stop()"),n.innerHTML='<span class="material-symbols-outlined icon-white icon-md"> stop_circle </span>',this.scroller=setInterval((()=>{let n=Number(t.style.left.split("px")[0])+4;this.progress=n,t.style.left=`${n}px`,i.innerHTML=this.progressToTime(),this.innerWidth+this.offsetWidth>=this.offsetWidth&&this.stop();for(let t in e){let i=e[t].filetype,n=e[t].startTime>this.progress||e[t].startTime+e[t].duration<this.progress;"video"==i&&(n=e[t].startTime+e[t].trim.startTime>this.progress||e[t].startTime+e[t].trim.endTime<this.progress),n?this.hideElement(t):"image"==i?this.showImage(t):"video"==i?this.showVideo(t):"text"==i&&this.showText(t)}}),20),this.isPaused=!1}stop(){clearInterval(this.scroller);const e=document.querySelector("#playToggle"),t=document.querySelector("#time");this.isPaused=!0,e.setAttribute("onclick","elementControlComponent.play()"),e.innerHTML='<span class="material-symbols-outlined icon-white icon-md"> play_circle </span>',t.innerHTML=this.progressToTime(),this.pauseAllVideo()}pauseVideo(e){document.getElementById(`element-${e}`).querySelector("video").pause()}pauseAllVideo(){const e=document.querySelector("element-timeline").timeline;let t;for(t in e)"video"==e[t].filetype&&document.getElementById(`element-${t}`).querySelector("video").pause()}reset(){const e=document.querySelector("#time"),t=document.querySelector("element-timeline").querySelector("div");this.progress=0,this.isPaused=!0,e.innerHTML=this.progressToTime(),t.style.left="0px"}}class L extends HTMLElement{constructor(){super(),this.timeline=document.querySelector("element-timeline").timeline,this.elementId=this.getAttribute("element-id"),this.elementFiletype=this.getAttribute("element-filetype")||"image",this.isDrag=!1,this.isResize=!1,this.initialPosition={x:0,y:0,w:0,h:0},this.resizeDirection="n",this.resizeEventHandler,this.dragdownEventHandler,this.dragupEventHandler}render(){let e;"image"==this.elementFiletype?e=this.templateImage()+this.templateResize():"video"==this.elementFiletype?e=this.templateVideo()+this.templateResize():"text"==this.elementFiletype&&(e=this.templateText()+this.templateResize("horizon")),this.classList.add("element-drag"),this.setAttribute("id",`element-${this.elementId}`),this.setAttribute("style",`width: ${this.timeline[this.elementId].width}px; height: ${this.timeline[this.elementId].height}px; top: 0px; left: 0px;`),this.innerHTML=e}templateImage(){return`\n        <img src="${this.timeline[this.elementId].blob}" alt="" class="element-image" draggable="false">`}templateVideo(){return`\n        <video src="${this.timeline[this.elementId].blob}" alt="" class="element-video" draggable="false"></video>`}templateText(){return`<input type="text" class="form-transparent element-text" draggable="false" onkeyup="document.querySelector('element-control').changeText('${this.elementId}')" value="텍스트">`}templateResize(e="full"){let t='<div class="resize-n" onmousedown="this.parentNode.resizeMousedown(\'n\')"></div>',i='<div class="resize-s" onmousedown="this.parentNode.resizeMousedown(\'s\')"></div>',n='<div class="resize-w" onmousedown="this.parentNode.resizeMousedown(\'w\')"></div>',s='<div class="resize-e" onmousedown="this.parentNode.resizeMousedown(\'e\')"></div>';return"full"==e?`\n            ${t}\n            ${i}\n            ${n}\n            ${s}\n            <div class="resize-ne" onmousedown="this.parentNode.resizeMousedown('ne')"></div>\n            <div class="resize-nw" onmousedown="this.parentNode.resizeMousedown('nw')"></div>\n            <div class="resize-se" onmousedown="this.parentNode.resizeMousedown('se')"></div>\n            <div class="resize-sw" onmousedown="this.parentNode.resizeMousedown('sw')"></div>\n            `:"vertical"==e?`\n            ${t}\n            ${i}\n            `:"horizon"==e?`\n            ${n}\n            ${s}\n            `:void 0}pxToInteger(e="0px"){return Number(e.split("px")[0])}drag(e){if(this.isDrag){let t=e.clientX-this.initialPosition.x,i=e.clientY-this.initialPosition.y,n=["img","video","input"],s="";for(let e=0;e<n.length;e++)this.querySelector(n[e])&&(s=n[e]);t>window.innerWidth?document.removeEventListener("mousemove",this.dragdownEventHandler):(this.style.top=`${i}px`,this.style.left=`${t}px`,this.timeline[this.elementId].location.x=t,this.timeline[this.elementId].location.y=i)}}dragMousedown(e){this.isResize||(this.isDrag=!0,this.initialPosition.x=e.pageX-this.pxToInteger(this.style.left),this.initialPosition.y=e.pageY-this.pxToInteger(this.style.top),this.dragdownEventHandler=this.drag.bind(this),document.addEventListener("mousemove",this.dragdownEventHandler))}dragMouseup(){document.removeEventListener("mousemove",this.dragdownEventHandler),this.isDrag=!1}getGcd(e,t){return 0==t?e:this.getGcd(t,e%t)}resize(e){this.isDrag=!1;const t=document.querySelector("#video").getBoundingClientRect();let i=e.pageX-t.left-this.initialPosition.x,n=e.pageY-t.top-this.initialPosition.y;switch(this.initialPosition.w,this.initialPosition.h,this.resizeDirection){case"n":this.style.top=`${this.initialPosition.y+n}px`,this.style.height=this.initialPosition.h-n+"px";break;case"s":this.style.top=`${this.initialPosition.y}px`,this.style.height=`${n}px`;break;case"w":this.style.left=`${this.initialPosition.x+i}px`,this.style.width=this.initialPosition.w-i+"px";break;case"e":this.style.left=`${this.initialPosition.x}px`,this.style.width=`${i}px`;break;case"ne":this.style.top=`${this.initialPosition.y+n}px`,this.style.height=this.initialPosition.h-n+"px",this.style.width=`${i}px`;break;case"nw":this.style.top=`${this.initialPosition.y+n}px`,this.style.height=this.initialPosition.h-n+"px",this.style.left=`${this.initialPosition.x+i}px`,this.style.width=this.initialPosition.w-i+"px";break;case"sw":this.style.height=`${n}px`,this.style.left=`${this.initialPosition.x+i}px`,this.style.width=this.initialPosition.w-i+"px";break;case"se":this.style.top=`${this.initialPosition.y}px`,this.style.height=`${n}px`,this.style.left=`${this.initialPosition.x}px`,this.style.width=`${i}px`}this.timeline[this.elementId].location.y=Number(this.style.top.split("px")[0]),this.timeline[this.elementId].location.x=Number(this.style.left.split("px")[0]),this.timeline[this.elementId].width=Number(this.style.width.split("px")[0]),this.timeline[this.elementId].height=Number(this.style.height.split("px")[0])}resizeMousedown(e){this.isDrag=!1,this.isResize=!0,this.resizeDirection=e,this.initialPosition.w=Number(this.style.width.split("px")[0]),this.initialPosition.h=Number(this.style.height.split("px")[0]),this.initialPosition.x=Number(this.style.left.split("px")[0]),this.initialPosition.y=Number(this.style.top.split("px")[0]),this.resizeEventHandler=this.resize.bind(this),document.addEventListener("mousemove",this.resizeEventHandler)}resizeMouseup(){document.removeEventListener("mousemove",this.resizeEventHandler),this.isResize=!1}activateOutline(){const e=document.querySelector("element-control");this.deactivateAllOutline(),e.activeElementId=this.elementId,this.classList.add("element-outline")}deactivateAllOutline(){const e=document.querySelector("element-control"),t=document.querySelector("element-timeline");for(const e in t.timeline)Object.hasOwnProperty.call(t.timeline,e)&&document.querySelector(`#element-${e}`).classList.remove("element-outline");e.activeElementId=""}dblClick(){let e=new bootstrap.Offcanvas(document.getElementById("option_top")),t=["option_text"];for(let e=0;e<t.length;e++){const i=t[e];document.querySelector(`#${i}`).classList.add("d-none")}"text"==this.elementFiletype&&(document.querySelector("#option_text").classList.remove("d-none"),document.querySelector("#optionTargetElement").value=this.elementId,e.show())}connectedCallback(){this.render(),this.addEventListener("mousedown",this.dragMousedown.bind(this)),this.addEventListener("mouseup",this.dragMouseup.bind(this)),this.addEventListener("mousedown",this.activateOutline.bind(this)),this.addEventListener("dblclick",this.dblClick.bind(this)),document.addEventListener("mouseup",this.resizeMouseup.bind(this))}}customElements.define("asset-list",w),customElements.define("asset-file",x),customElements.define("asset-folder",z),customElements.define("asset-browser",$),customElements.define("element-timeline",T),customElements.define("element-bar",E),customElements.define("element-control",S),customElements.define("element-control-asset",L),NUGGET=t})();