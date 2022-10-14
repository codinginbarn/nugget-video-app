class ElementTimeline extends HTMLElement { 
    constructor() {
        super();

        //this.directory = ''
        this.elementControl

        window.addEventListener('DOMContentLoaded', () => {
            this.elementControl = document.querySelector("element-control");
        });

        this.timeline = {

        }
    }

    render(){
        const template = this.template();
        this.classList.add("col-12", "cursor-default", "h-100", "line")
        this.innerHTML = template;
    }


    template() {
        return `
        <element-timeline-editor></element-timeline-editor>
        <element-timeline-bar></element-timeline-bar>

        `
    }

    replaceTimelineBarHeight(height) {
        let timelineBar = this.querySelector(".timeline-bar")
        timelineBar.style.height = `${height}px`
    }

    getTimelineScrollHeight() {
        return this.scrollHeight
    }

    async patchTimeline(timeline) {
        this.timeline = timeline
        for (const elementId in timeline) {
            if (Object.hasOwnProperty.call(timeline, elementId)) {
                const element = timeline[elementId];
                if (element.filetype == 'image') {
                    let blobUrl = await this.getBlobUrl(`file://${element.localpath}`)
                    this.timeline[elementId].blob = String(blobUrl)
                    this.elementControl.showImage(elementId)
                } else if (element.filetype == 'video') {
                    let blobUrl = await this.getBlobUrl(`file://${element.localpath}`)
                    this.timeline[elementId].blob = String(blobUrl)
                    this.elementControl.showVideo(elementId)
                } else if (element.filetype == 'text') {
                    this.elementControl.showText(elementId)
                } else if (element.filetype == 'audio') {
                    let blobUrl = await this.getBlobUrl(`file://${element.localpath}`)
                    this.timeline[elementId].blob = String(blobUrl)
                    this.elementControl.showAudio(elementId)
                }
                this.addElementBar(elementId)
                
            }
        }
    }

    resetTimelineData() {
        this.timeline = {}
    }

    async getBlobUrl(url) {
        const response = await fetch(url);
        const data = await response.blob()
        return URL.createObjectURL(data);
    }

    addElementBar(elementId) {
        const templateBar = this.templateElementBar(elementId)
        this.insertAdjacentHTML("beforeend", templateBar)

        let height = this.getTimelineScrollHeight()
        this.replaceTimelineBarHeight(height)
    }

    templateElementBar(elementId) {
        let width = this.timeline[elementId].duration
        let filetype = this.timeline[elementId].filetype

        let elementSplitedFilepath = this.timeline[elementId].localpath.split('/')
        let elementFilepath = elementSplitedFilepath[elementSplitedFilepath.length-1]

        let elementType = this.getElementType(filetype)

        if (elementType == 'static') {
            return `<element-bar element-id="${elementId}" element-type="static"></element-bar>`

        } else if (elementType == 'dynamic') {
            return `<element-bar element-id="${elementId}" element-type="dynamic"></element-bar>`
        } else {
            return `none`
        }
    }



    getElementType(filetype) {
        let elementType = 'undefined'
        const elementFileExtensionType = {
            "static": ['image', 'text', 'png', 'jpg', 'jpeg'],
            "dynamic": ['video', 'audio', 'mp4', 'mp3', 'mov']
        }

        for (const type in elementFileExtensionType) {
            if (Object.hasOwnProperty.call(elementFileExtensionType, type)) {
                const extensionList = elementFileExtensionType[type];

                if(extensionList.indexOf(filetype) >= 0)  {
                    elementType = type
                    break
                }
                
            }
        }

        return elementType
    }

    keydown(event) {
        event.preventDefault();
        console.log(event.keyCode)
        if(event.keyCode == 32) { // Space
            if (this.elementControl.isPaused == true) {
                this.elementControl.play()
            } else {
                this.elementControl.stop()
            }
        }
    }

    connectedCallback() {
        this.render();
        document.addEventListener('keydown', this.keydown.bind(this));

    }
}


class ElementTimelineBar extends HTMLElement { 
    constructor() {
        super();
    }

    render(){
        this.classList.add("timeline-bar")
        this.setAttribute("id", "timeline_bar")
        this.style.left = `0px`
    }

    move(px) {
        this.style.left = `${px}px`
    }

    connectedCallback() {
        this.render();

    }
}

class ElementTimelineEditor extends HTMLElement { 
    constructor() {
        super();

    }

    render(){
        const template = this.template();
        this.classList.add("timeline-editor", "ruler")
        this.innerHTML = template;
        this.addTickNumber(10)
    }


    template() {
        return `<ul class="ruler-x">
        <li></li><li></li><li></li><li></li><li></li> <!-- repeat -->
      </ul>`
    }

    addTickNumber(licount) {
        let addedli = '<li></li>'.repeat(licount)
        this.querySelector("ul").innerHTML = addedli

    }


    updateRulerLength(e) {
        let duration = Number(e.value) * 200
        this.changeWidth(duration)
        this.addTickNumber(Number(e.value))
    }


    changeWidth(px) {
        this.style.width = `${px}px`
    }


    mousedown(e) {
        const elementTimelineBar = document.querySelector("element-timeline-bar")
        const elementTimeline = document.querySelector("element-timeline")
        const elementControl = document.querySelector("element-control")
        
        
        elementControl.progress = e.pageX + elementTimeline.scrollLeft
        elementControl.stop()
        elementControl.showTime() 
        elementControl.appearAllElementInTime()

        elementTimelineBar.move(e.pageX + elementTimeline.scrollLeft)

    }



    connectedCallback() {
        this.render();
        this.addEventListener('mousedown', this.mousedown.bind(this));

    }
}


export { ElementTimeline, ElementTimelineBar, ElementTimelineEditor }