import { LitElement, PropertyValues, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { ITimelineStore, useTimelineStore } from "../../states/timelineStore";
import { millisecondsToPx, pxToMilliseconds } from "../../utils/time";
import { IUIStore, uiStore } from "../../states/uiStore";
import { ImageElementType } from "../../@types/timeline";
import { KeyframeController } from "../../controllers/keyframe";

@customElement("keyframe-editor")
export class KeyframeEditor extends LitElement {
  tension: number;
  divBody: any;
  svgBody: any;
  poly: {};
  path: {};
  hiddenPath: {};
  padding: { start: number; end: number };
  lineCount: number;
  points: number[][][];
  selectLine: number;
  keyframePointBody: any;
  prevElementId: any;
  isDrag: boolean;
  clickDot: string;
  clickIndex: number;
  verticalScroll: number;

  constructor() {
    super();

    this.tension = 1;
    this.divBody = undefined;
    this.svgBody = {};
    this.poly = {};
    this.path = {};
    this.hiddenPath = {};

    this.padding = {
      start: 0,
      end: 0,
    };

    this.lineCount = 1;
    this.points = [[[0, 0]], [[0, 0]]];

    this.prevElementId = "";

    this.selectLine = 0;

    this.clickIndex = -1;
    this.clickDot = "";
    this.isDrag = false;

    this.verticalScroll = 0;

    this.addEventListener("scroll", this.handleScroll.bind(this));

    try {
      // position이면 2개 나머지는 1개
      this.lineCount = 2;

      this.clearLineEditorGroup();

      for (let line = 0; line < this.lineCount; line++) {
        this.addLineEditor(line);
      }

      this.changeLineEditor(0);
    } catch (error) {}
  }

  private keyframeControl = new KeyframeController(this);

  @property()
  isShow;

  @property()
  elementId;

  @property()
  animationType;

  @query("#keyframeEditerCanvasRef") canvas!: HTMLCanvasElement;

  @property()
  timelineState: ITimelineStore = useTimelineStore.getInitialState();

  @property()
  timeline: any = this.timelineState.timeline;

  @property()
  timelineRange = this.timelineState.range;

  @property()
  timelineScroll = this.timelineState.scroll;

  @property()
  timelineCursor = this.timelineState.cursor;

  @property()
  uiState: IUIStore = uiStore.getInitialState();

  @property()
  resize = this.uiState.resize;

  createRenderRoot() {
    useTimelineStore.subscribe((state) => {
      this.timeline = state.timeline;
      this.timelineRange = state.range;
      this.timelineScroll = state.scroll;
      this.timelineCursor = state.cursor;

      this.drawCanvas();
    });

    uiStore.subscribe((state) => {
      this.resize = state.resize;

      this.drawCanvas();
    });

    return this;
  }

  render() {
    try {
      if (this.isShow) {
        if (this.prevElementId != this.elementId) {
          if (
            this.timeline[this.elementId].animation[this.animationType]
              .isActivate
          ) {
            this.points = [
              ...this.timeline[this.elementId].animation[this.animationType]
                .points,
            ];
          } else {
            this.points = [[[0, 0]], [[0, 0]]];
          }
          this.prevElementId = this.elementId;
        }
      }

      if (this.isShow) {
        this.showKeyframeEditorButtonGroup();

        this.classList.add(
          "h-100",
          "w-100",
          "position-absolute",
          "overflow-hidden",
        );

        this.timeline[this.elementId].animation[this.animationType].isActivate =
          true;

        return html` <div>
          <div class="btn-group p-2" role="group" id="timelineOptionLineEditor">
            <button
              line="0"
              @click=${() => this.changeLineEditor("0")}
              type="button"
              class="btn ${this.selectLine == 0
                ? "btn-primary"
                : "btn-secondary"} btn-sm"
            >
              x
            </button>

            <button
              line="1"
              @click=${() => this.changeLineEditor("1")}
              type="button"
              class="btn ${this.selectLine == 1
                ? "btn-primary"
                : "btn-secondary"} btn-sm"
            >
              y
            </button>
          </div>
          <canvas
            id="keyframeEditerCanvasRef"
            style="width: 100%; left: ${this.resize.timelineVertical
              .leftOption}px; position: absolute;"
            @mousewheel=${this._handleMouseWheel}
            @mousedown=${this._handleMouseDown}
            @mousemove=${this._handleMouseMove}
            @mouseup=${this._handleMouseUp}
          ></canvas>
        </div>`;
      } else {
        this.hideKeyframeEditorButtonGroup();
      }
    } catch (error) {}
  }

  private drawDots(ctx) {
    const pointsX = this.timeline[this.elementId].animation.position.x;
    const pointsY = this.timeline[this.elementId].animation.position.y;

    this.drawDotsLoop({
      ctx: ctx,
      dots: pointsX,
      color: "#403af0",
      subColor: "#b7bcf7",
    });

    this.drawDotsLoop({
      ctx: ctx,
      dots: pointsY,
      color: "#e83535",
      subColor: "#ed7979",
    });
  }

  drawDotsLoop({ ctx, dots, color, subColor }) {
    for (let index = 0; index < dots.length; index++) {
      const element = dots[index];
      ctx.fillStyle = color;

      ctx.beginPath();

      const x =
        millisecondsToPx(
          element.p[0] + this.timeline[this.elementId].startTime,
          this.timelineRange,
        ) - this.timelineScroll;

      const y = element.p[1] + this.verticalScroll;
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.fill();

      ctx.fillStyle = subColor;

      ctx.beginPath();
      const sx =
        millisecondsToPx(
          element.cs[0] + this.timeline[this.elementId].startTime,
          this.timelineRange,
        ) - this.timelineScroll;
      const sy = element.cs[1] + this.verticalScroll;
      ctx.arc(sx, sy, 4, 0, 2 * Math.PI);
      ctx.fill();

      ctx.beginPath();
      const ex =
        millisecondsToPx(
          element.ce[0] + this.timeline[this.elementId].startTime,
          this.timelineRange,
        ) - this.timelineScroll;
      const ey = element.ce[1] + this.verticalScroll;
      ctx.arc(ex, ey, 4, 0, 2 * Math.PI);
      ctx.fill();

      ctx.strokeStyle = subColor;

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(sx, sy);
      ctx.stroke();

      ctx.strokeStyle = subColor;

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(ex, ey);
      ctx.stroke();
    }
  }

  private drawLines(ctx) {
    const pointsX = this.timeline[this.elementId].animation.position.ax;
    const pointsY = this.timeline[this.elementId].animation.position.ay;

    ctx.strokeStyle = "#403af0";
    ctx.beginPath();
    for (let index = 0; index < pointsX.length; index++) {
      const element = pointsX[index];
      const x =
        millisecondsToPx(
          element[0] + this.timeline[this.elementId].startTime,
          this.timelineRange,
        ) - this.timelineScroll;
      ctx.lineTo(x, element[1] + this.verticalScroll);
    }
    ctx.stroke();

    ctx.strokeStyle = "#e83535";
    ctx.beginPath();
    for (let index = 0; index < pointsY.length; index++) {
      const element = pointsY[index];
      const x =
        millisecondsToPx(
          element[0] + this.timeline[this.elementId].startTime,
          this.timelineRange,
        ) - this.timelineScroll;
      ctx.lineTo(x, element[1] + this.verticalScroll);
    }
    ctx.stroke();
  }

  private drawCursor(ctx) {
    const now =
      millisecondsToPx(this.timelineCursor, this.timelineRange) -
      this.timelineScroll;

    ctx.fillStyle = "#dbdaf0";
    ctx.beginPath();
    ctx.rect(now, 0, 2, this.canvas.height);
    ctx.fill();
  }

  private drawLeftPadding(ctx) {
    const targetTimeline: ImageElementType | any =
      this.timeline[this.elementId];

    const startPx =
      millisecondsToPx(targetTimeline.startTime, this.timelineRange) -
      this.timelineScroll;

    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.rect(0, 0, startPx, this.canvas.height);
    ctx.fill();
  }

  private drawRightPadding(ctx) {
    const targetTimeline: ImageElementType | any =
      this.timeline[this.elementId];

    const startPx =
      millisecondsToPx(
        targetTimeline.startTime + targetTimeline.duration,
        this.timelineRange,
      ) - this.timelineScroll;

    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.rect(startPx, 0, this.canvas.width - startPx, this.canvas.height);
    ctx.fill();
  }

  private drawCanvas() {
    if (!this.isShow) {
      return false;
    }

    try {
      const ctx = this.canvas.getContext("2d");
      if (ctx) {
        const dpr = window.devicePixelRatio;
        this.canvas.style.width = `${window.innerWidth}px`;

        this.canvas.width = window.innerWidth * dpr;
        this.canvas.height =
          document.querySelector("element-timeline").offsetHeight * dpr;

        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.scale(dpr, dpr);

        ctx.fillStyle = "#0f1012";
        ctx.beginPath();
        ctx.rect(0, 0, this.canvas.width, this.canvas.height);
        ctx.fill();

        this.drawLeftPadding(ctx);
        this.drawRightPadding(ctx);
        this.drawCursor(ctx);
        this.drawDots(ctx);
        this.drawLines(ctx);
      }
    } catch (error) {}
  }

  updated() {
    this.drawCanvas();
  }

  showKeyframeEditorButtonGroup() {}

  hideKeyframeEditorButtonGroup() {
    let keyframeEditor: any = document.getElementById("option_bottom");
    keyframeEditor.classList.remove("show");
    keyframeEditor.classList.add("hide");
    document
      .querySelector("element-timeline-canvas")
      .closeAnimationPanel(this.elementId);
  }

  addPadding({ px, type }) {
    let keyframePadding = this.divBody.querySelector("keyframe-padding");
    let keyframePoint = this.keyframePointBody;
    let svgBody: any = this.svgBody;

    const typeFunction = {
      start: () => {
        keyframePadding.style.width = `${px}px`;
        keyframePoint.style.left = `${px}px`;
        svgBody.style.left = `${px}px`;
      },
    };

    this.padding["start"] = px;
    typeFunction[type]();
  }

  highlightLineEditorButton(line) {
    for (let index = 0; index < this.lineCount; index++) {
      let button = document
        .querySelector("#timelineOptionLineEditor")
        .querySelector(`button[line='${index}']`);
      button.classList.remove("btn-primary");
      button.classList.add("btn-secondary");
    }

    let targeButton = document
      .querySelector("#timelineOptionLineEditor")
      .querySelector(`button[line='${line}']`);
    targeButton.classList.remove("btn-secondary");
    targeButton.classList.add("btn-primary");
  }

  changeLineEditor(line) {
    this.selectLine = Number(line);
    this.requestUpdate();
  }

  addLineEditor(line) {
    document
      .querySelector("#timelineOptionLineEditor")
      .insertAdjacentHTML(
        "beforeend",
        `<button line="${line}" onclick="document.querySelector('keyframe-editor').changeLineEditor('${line}')" type="button" class="btn btn-secondary btn-sm">Line${line}</button>`,
      );
  }

  clearLineEditorGroup() {
    document.querySelector("#timelineOptionLineEditor").innerHTML = "";
  }

  getRemovedDuplicatePoint({ x, line }) {
    let tmp: any = [];
    this.points[line].forEach((element) => {
      if (element[0] != x) {
        tmp.push(element);
      }
    });
    return tmp;
  }

  handleScroll(e) {
    let optionBottom = document.querySelector("#option_bottom");
    let isShowOptionBottom = optionBottom.classList.contains("show");
    if (isShowOptionBottom == false) {
      return 0;
    }
    let elementTimeline = document.querySelector("element-timeline");
    elementTimeline.scrollTo(this.scrollLeft, elementTimeline.scrollTop);
  }

  _handleMouseWheel(e) {
    const newScroll = this.timelineScroll + e.deltaX;
    this.verticalScroll -= e.deltaY;

    this.drawCanvas();

    if (newScroll >= 0) {
      this.timelineState.setScroll(newScroll);
    }
  }

  _handleMouseMove(e) {
    //console.log(e);
    const px =
      pxToMilliseconds(e.offsetX, this.timelineRange) +
      pxToMilliseconds(this.timelineScroll, this.timelineRange) -
      this.timeline[this.elementId].startTime;
    const py = e.offsetY - this.verticalScroll;
    const lineToAlpha = this.selectLine == 0 ? "x" : "y";

    //console.log(px);

    if (this.isDrag) {
      this.timeline[this.elementId].animation.position[lineToAlpha][
        this.clickIndex
      ][this.clickDot][0] = px;
      this.timeline[this.elementId].animation.position[lineToAlpha][
        this.clickIndex
      ][this.clickDot][1] = py;

      this.keyframeControl.interpolate(
        this.selectLine,
        this.elementId,
        "position",
      );

      this.drawCanvas();
    }
  }

  _handleMouseDown(e) {
    const lineToAlpha = this.selectLine == 0 ? "x" : "y";

    const padding = 100;
    const px =
      pxToMilliseconds(e.offsetX, this.timelineRange) +
      pxToMilliseconds(this.timelineScroll, this.timelineRange) -
      this.timeline[this.elementId].startTime;
    const py = e.offsetY - this.verticalScroll;

    for (
      let index = 0;
      index <
      this.timeline[this.elementId].animation.position[lineToAlpha].length;
      index++
    ) {
      const element =
        this.timeline[this.elementId].animation.position[lineToAlpha][index];

      if (
        element.cs[0] > px - padding &&
        element.cs[0] < px + padding &&
        element.cs[1] > py - padding &&
        element.cs[1] < py + padding
      ) {
        this.clickIndex = index;
        this.clickDot = "cs";
        this.isDrag = true;
      }

      if (
        element.ce[0] > px - padding &&
        element.ce[0] < px + padding &&
        element.ce[1] > py - padding &&
        element.ce[1] < py + padding
      ) {
        this.clickIndex = index;
        this.clickDot = "ce";
        this.isDrag = true;
      }
    }

    if (!this.isDrag) {
      this.keyframeControl.addPoint({
        x: px,
        y: py,
        line: this.selectLine,
        elementId: this.elementId,
        animationType: this.animationType,
      });
      this.drawCanvas();
    }

    return;
  }

  _handleMouseUp() {
    this.isDrag = false;
  }
}
