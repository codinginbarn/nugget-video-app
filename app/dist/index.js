var nugget;(()=>{"use strict";var e={d:(t,i)=>{for(var n in i)e.o(i,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:i[n]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{asset:()=>u,canvas:()=>d,element:()=>o});const i={},n={scroller:void 0,isPaused:!0,progress:split_inner_bottom.scrollLeft,start:function(){let e=document.querySelector("#playToggle");e.setAttribute("onclick","nugget.element.player.stop()"),e.innerHTML='<i class="fas fa-pause text-light"></i>',n.scroller=setInterval((function(){let e=Number(timeline_bar.style.left.split("px")[0])+4;timeline_bar.style.left=`${e}px`,n.progress=e,split_inner_bottom.innerWidth+split_inner_bottom.offsetWidth>=split_inner_bottom.offsetWidth&&n.stop(),r.play()}),20),n.isPaused=!1},stop:function(){clearInterval(n.scroller),n.isPaused=!0;let e=document.querySelector("#playToggle");e.setAttribute("onclick","nugget.element.player.start()"),e.innerHTML='<i class="fas fa-play text-light"></i>',r.pauseAllVideo()},reset:function(){timeline_bar.style.left="0px",n.progress=0,n.isPaused=!0}},s={state:{isDrag:!1,isResize:!1,resizeLocation:"left",resizeRangeLeft:0,resizeRangeRight:0,e:void 0,blob:"",criteria:{x:0,y:0,duration:1e3},criteriaResize:{x:0,y:0}},event:{drag:{onmousedown:function(e){s.state.blob=e.getAttribute("value"),s.state.isDrag=!0,s.state.e=e,s.state.criteria.x=valueEvent.mouse.x-Number(s.state.e.style.left.replace(/[^0-9]/g,"")),s.state.criteria.y=valueEvent.mouse.y},onmouseup:function(e){s.state.isDrag=!1}},resize:{onmousedownrange:function(e,t="left"){s.state.e=e.parentNode.parentNode,s.state.blob=s.state.e.getAttribute("value"),s.state.isResize=!0,s.state.resizeLocation=t,s.state.isDrag=!1,s.state.criteria.duration=i[s.state.blob.split("/")[3]].duration+Number(s.state.e.style.left.replace(/[^0-9]/g,"")),s.state.criteriaResize.x=Number(s.state.e.style.left.replace(/[^0-9]/g,"")),s.state.resizeRangeLeft=Number(s.state.e.querySelector(".element-bar-hiddenspace-left").style.width.split("px")[0]),s.state.resizeRangeRight=Number(s.state.e.querySelector(".element-bar-hiddenspace-right").style.width.split("px")[0])},onmousedown:function(e,t="left"){s.state.blob=e.parentNode.getAttribute("value"),s.state.isResize=!0,s.state.resizeLocation=t,s.state.isDrag=!1,s.state.e=e.parentNode,s.state.criteriaResize.x="left"==t?valueEvent.mouse.x-Number(s.state.e.style.left.replace(/[^0-9]/g,"")):Number(s.state.e.style.left.replace(/[^0-9]/g,"")),s.state.criteriaResize.y=valueEvent.mouse.y,s.state.criteria.duration=i[s.state.blob.split("/")[3]].duration+Number(s.state.e.style.left.replace(/[^0-9]/g,""))},onmouseup:function(e){s.state.isResize=!1}}},append:function(e){let t,n=document.querySelector("#split_inner_bottom"),s=e.split("/")[3],l=i[s].duration,r=i[s].filetype,o=i[s].localpath.split("/"),a=o[o.length-1];"video"==r&&(t=`<div class="element-bar" style="width: ${l}px; left: 0px;" onmousedown="nugget.element.bar.event.drag.onmousedown(this)" value="${e}">\n            ${a}\n            <div class="element-bar-hiddenspace-left position-absolute">\n                <div class="element-bar-resize-hiddenspace-left position-absolute" onmousedown="nugget.element.bar.event.resize.onmousedownrange(this, 'left')">\n                </div>\n            </div>\n            <div class="element-bar-hiddenspace-right position-absolute">\n                <div class="element-bar-resize-hiddenspace-right position-absolute" onmousedown="nugget.element.bar.event.resize.onmousedownrange(this, 'right')">\n                </div>\n            </div>\n            </div>`);let d="video"!=r?`<div class="element-bar" style="width: ${l}px; left: 0px;" onmousedown="nugget.element.bar.event.drag.onmousedown(this)" value="${e}">\n            ${a}\n            <div class="element-bar-resize-left position-absolute" onmousedown="nugget.element.bar.event.resize.onmousedown(this, 'left')"></div>\n            <div class="element-bar-resize-right position-absolute" onmousedown="nugget.element.bar.event.resize.onmousedown(this, 'right')"></div>\n            </div>`:t;n.insertAdjacentHTML("beforeend",d)},drag:function(e,t){let n=s.state.blob.split("/")[3];s.state.e.style.left=`${e}px`,i[n].startTime=e},resizeDurationInTimeline:function(e,t="left"){let n=s.state.blob.split("/")[3],l=s.state.criteria.duration;"left"==t?(s.state.e.style.left=`${e}px`,s.state.e.style.width=l-e+"px",i[n].startTime=e,i[n].duration=Number(s.state.e.style.width.split("px")[0])):(s.state.e.style.left=`${s.state.criteriaResize.x}px`,s.state.e.style.width=split_inner_bottom.scrollLeft+valueEvent.mouse.x-s.state.criteriaResize.x+"px",i[n].startTime=s.state.criteriaResize.x,i[n].duration=Number(s.state.e.style.width.split("px")[0]))},resizeRangeOnElement:function(e,t="left"){let n=s.state.blob.split("/")[3],l=s.state.criteria.duration,r=(s.state.resizeRangeLeft,s.state.resizeRangeRight,s.state.e.querySelector(".element-bar-hiddenspace-left")),o=s.state.e.querySelector(".element-bar-hiddenspace-right");"left"==t?(r.style.width=e-5+"px",i[n].trim.startTime=Number(r.style.width.split("px")[0])):(o.style.width=window.innerWidth-e-s.state.criteriaResize.x+"px",i[n].trim.endTime=l-Number(o.style.width.split("px")[0]))}},l={state:{isResize:!1,criteriaResize:{x:0,y:0,w:0,h:0},resizeDirection:"",resizeTargetElementId:""},upload:{image:function(e,t){let n=document.createElement("img"),l=e.split("/")[3];n.src=e,n.onload=function(){var o=n.width/10,a=n.height/10;i[l]={startTime:0,duration:1e3,location:{x:0,y:0},width:o,height:a,localpath:t,filetype:"image"},r.show.image(e),s.append(e)}},video:function(e,t){let n=document.createElement("video"),l=e.split("/")[3];n.src=e,n.preload="metadata",n.onloadedmetadata=function(){let o=n.videoWidth/10,a=n.videoHeight/10,d=200*n.duration;i[l]={startTime:0,duration:d,location:{x:0,y:0},trim:{startTime:0,endTime:0},width:o,height:a,localpath:t,filetype:"video"},r.show.video(e),s.append(e)}}},drag:function(e,t,n){let s=["img","video"],l="";for(let t=0;t<s.length;t++)e.querySelector(s[t])&&(l=s[t]);let r=e.querySelector(l).getAttribute("src").split("/")[3];e.style.top=`${n}px`,e.style.left=`${t}px`,i[r].location.x=t,i[r].location.y=n,preview.clear()},dragover:function(e){e.stopPropagation(),e.preventDefault()},drop:function(e){e.stopPropagation(),e.preventDefault()},onmouseup:function(e){l.state.isResize=!1;for(const e in i)Object.hasOwnProperty.call(i,e)&&document.querySelector(`#element-${e}`).setAttribute("draggable","true")},resize:{init:function(e,t="n"){let i=document.querySelector(`#element-${e}`);i.setAttribute("draggable","false"),l.state.criteriaResize.w=Number(i.style.width.split("px")[0]),l.state.criteriaResize.h=Number(i.style.height.split("px")[0]),l.state.criteriaResize.x=Number(i.style.left.split("px")[0]),l.state.criteriaResize.y=Number(i.style.top.split("px")[0]),l.state.isResize=!0,l.state.resizeTargetElementId=e,l.state.resizeDirection=t},action:function(e,t){let n=l.state.resizeTargetElementId,s=document.querySelector(`#element-${n}`);switch(l.state.resizeDirection){case"n":s.style.top=`${l.state.criteriaResize.y+t}px`,s.style.height=l.state.criteriaResize.h-t+"px";break;case"s":s.style.top=`${l.state.criteriaResize.y}px`,s.style.height=`${t}px`;break;case"w":s.style.left=`${l.state.criteriaResize.x+e}px`,s.style.width=l.state.criteriaResize.w-e+"px";break;case"e":s.style.left=`${l.state.criteriaResize.x}px`,s.style.width=`${e}px`}i[n].location.y=Number(s.style.top.split("px")[0]),i[n].location.x=Number(s.style.left.split("px")[0]),i[n].width=Number(s.style.width.split("px")[0]),i[n].height=Number(s.style.height.split("px")[0])}}},r={previewRatio:1920/preview.width,show:{image:function(e){let t=e.split("/")[3];null==document.getElementById(`element-${t}`)?control.insertAdjacentHTML("beforeend",`\n                <div id="element-${t}" class="element-drag" style='width: ${i[t].width}px; height: ${i[t].height}px; top: 0px; left: 0px;' draggable="true">\n                <img src="${e}" alt="" class="element-image" draggable="false">\n                <div class="resize-n" onmousedown="nugget.element.control.resize.init('${t}', 'n')"></div>\n                <div class="resize-s" onmousedown="nugget.element.control.resize.init('${t}', 's')"></div>\n                <div class="resize-w" onmousedown="nugget.element.control.resize.init('${t}', 'w')"></div>\n                <div class="resize-e" onmousedown="nugget.element.control.resize.init('${t}', 'e')"></div>\n    \n                </div>\n                `):document.querySelector(`#element-${t}`).classList.remove("d-none")},video:function(e){let t=e.split("/")[3];if(null==document.getElementById(`element-${t}`)){control.insertAdjacentHTML("beforeend",`\n                <div id="element-${t}" class="element-drag" style='width: ${i[t].width}px; height: ${i[t].height}px; top: 0px; left: 0px;' draggable="true">\n                <video src="${e}" alt="" class="element-video" draggable="false"></video>\n                <div class="resize-n" onmousedown="nugget.element.control.resize.init('${t}', 'n')"></div>\n                <div class="resize-s" onmousedown="nugget.element.control.resize.init('${t}', 's')"></div>\n                <div class="resize-w" onmousedown="nugget.element.control.resize.init('${t}', 'w')"></div>\n                <div class="resize-e" onmousedown="nugget.element.control.resize.init('${t}', 'e')"></div>\n    \n                </div>\n                `);let s=document.getElementById(`element-${t}`).querySelector("video"),l=(i[t].startTime-n.progress)/200;console.log(l),s.currentTime=l}else{let e=document.getElementById(`element-${t}`).querySelector("video"),s=-(i[t].startTime-n.progress)/200;e.currentTime>0&&!e.paused&&!e.ended&&e.readyState>2?(n.isPaused&&console.log("paused"),console.log("isPlaying")):(e.currentTime=s,e.play()),document.querySelector(`#element-${t}`).classList.remove("d-none")}}},hide:function(e){let t=e.split("/")[3];"video"==i[t].filetype&&r.pauseVideo(t),document.querySelector(`#element-${t}`).classList.add("d-none")},play:function(){let e;for(e in i){let t=`blob:${location.origin}/${e}`,s=i[e].filetype,l=i[e].startTime>n.progress||i[e].startTime+i[e].duration<n.progress;"video"==s&&(l=i[e].startTime+i[e].trim.startTime>n.progress||i[e].startTime+i[e].trim.endTime<n.progress),l?r.hide(t):r.show[s](t)}},pauseVideo:function(e){document.getElementById(`element-${e}`).querySelector("video").pause()},pauseAllVideo:function(){let e;for(e in i)"video"==i[e].filetype&&document.getElementById(`element-${e}`).querySelector("video").pause()}},o={timeline:i,player:n,bar:s,control:l,preview:r},a={mediaRecorder:void 0,resize:function(){let e=.65*window.innerWidth,t=9*e/16;preview.width=e,preview.height=t,preview.style.width=`${e}px`,preview.style.height=`${t}px`,video.style.width=`${e}px`,video.style.height=`${t}px`,nugget.element.preview.previewRatio=1920/e},render:function(e){let t,i=e.getContext("2d");for(t in preview.clear(),nugget.element.timeline){let e=`blob:${location.origin}/${t}`;if(nugget.element.timeline[t].startTime>nugget.element.player.progress||nugget.element.timeline[t].startTime+nugget.element.timeline[t].duration<nugget.element.player.progress);else{let n=new Image;n.src=e,i.drawImage(n,nugget.element.timeline[t].location.x,nugget.element.timeline[t].location.y,nugget.element.timeline[t].width,nugget.element.timeline[t].height)}}let n=document.getElementById("split_inner_bottom");n.scrollWidth-n.offsetWidth<=nugget.element.player.progress+1&&null!=a.mediaRecorder&&a.mediaRecorder.stop()},clear:function(e){preview.width=preview.width},export:function(){let e=[];return new Promise((function(t,i){let n=preview.captureStream(60);a.mediaRecorder=new MediaRecorder(n,{mimeType:"video/webm; codecs=vp9"}),a.mediaRecorder.start(0),a.mediaRecorder.ondataavailable=function(t){e.push(event.data)},a.mediaRecorder.onstop=function(i){let n=new Blob(e,{type:"video/webm"}),s=URL.createObjectURL(n);t({url:s,blobVideo:n}),exportVideo.src=s,exportVideoModal.show()},nugget.element.player.start(),a.render()}))}},d={preview:a},c={nowDirectory:"",loadFile:function(e,t){document.querySelector("#assetBrowser").insertAdjacentHTML("beforeend",`\n            <div class="col-6 d-flex flex-column bd-highlight overflow-hidden asset mt-1" onclick="nugget.asset.add('${t}/${e}', '${t}')">\n                <i class="fas fa-file icon-lg align-self-center"></i>\n                <b class="align-self-center text-light">${e}</b>\n            </div>`)},loadFolder:function(e,t){document.querySelector("#assetBrowser").insertAdjacentHTML("beforeend",`\n            <div class="col-6 d-flex flex-column bd-highlight overflow-hidden asset mt-1" onclick="ipc.requestAllDir('${t}/${e}')">\n                <i class="fas fa-folder icon-lg align-self-center"></i>\n                <b class="align-self-center text-light">${e}</b>\n            </div>`)},loadPrevDirectory:function(){let e=c.nowDirectory.split("/"),t=e.slice(-e.length,-1);ipc.requestAllDir(t.join("/"))},add:function(e,t){fetch(`file://${e}`).then((e=>e.blob())).then((t=>{let i=URL.createObjectURL(t),n=t.type.split("/")[0];nugget.element.control.upload[n](i,e)}))}},u=c;nugget=t})();