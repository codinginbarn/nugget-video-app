import { ParsedFrame } from "gifuct-js";

export type CubicKeyframeType = {
  type: "cubic" | "linear";
  p: number[];
  cs: number[];
  ce: number[];
};

export type ImageElementType = {
  key?: string;
  priority?: number;
  blob?: string;
  startTime?: number;
  duration?: number;
  opacity?: number;
  location?: { x: number; y: number };
  rotation?: number;
  width?: number;
  height?: number;
  localpath?: string;
  filetype?: string;
  ratio?: number;
  animation?: {
    position?: {
      isActivate?: boolean;
      x?: CubicKeyframeType[];
      y?: CubicKeyframeType[];

      ax?: number[][];
      ay?: number[][];
    };
    opacity?: {
      isActivate?: boolean;
      x?: CubicKeyframeType[];
      allpoints?: number[][];
    };
  };
};

export type GifElementType = {
  key?: string;
  priority?: number;
  blob?: string;
  startTime?: number;
  duration?: number;
  opacity?: number;
  location?: { x: number; y: number };
  rotation?: number;
  width?: number;
  height?: number;
  localpath?: string;
  filetype?: string;
  ratio?: number;
};

export type ShapeElementType = {
  key?: string;
  priority?: number;
  blob?: string;
  startTime?: number;
  duration?: number;
  opacity?: number;
  location?: { x: number; y: number };
  rotation?: number;
  width?: number;
  height?: number;
  oWidth?: number; // 원래 shape 사이즈
  oHeight?: number;
  filetype?: string;
  ratio?: number;
  localpath?: string;
  shape?: number[][]; // [[x, y]...]
  option?: {
    fillColor?: string;
  };
};

export type VideoElementType = {
  key?: string;

  priority?: number;
  blob?: string;
  startTime?: number;
  duration?: number;
  location?: { x: number; y: number };
  trim?: { startTime: number; endTime: number };
  rotation?: number;
  width?: number;
  height?: number;
  localpath?: string;
  isExistAudio?: boolean;
  filetype?: string;
  codec?: { video: string; audio: string };
  ratio?: number;
  speed?: number;
};

export type TextElementType = {
  key?: string;
  blob?: string;

  priority?: number;
  startTime?: number;
  duration?: number;
  text?: string;
  textcolor?: string;
  fontsize?: number;
  fontpath?: string;
  fontname?: string;
  fontweight?: string;
  fonttype?: string;
  letterSpacing?: number;
  options?: {
    isBold?: boolean;
    isItalic?: boolean;
    align?: "left" | "center" | "right";
  };
  background?: {
    enable?: boolean;
    color?: string;
  };
  location?: { x: number; y: number };
  rotation?: number;
  localpath?: string;
  filetype?: string;
  height?: number;
  width?: number;
  widthInner?: number;
  ratio?: number;

  animation?: {
    position?: {
      isActivate?: boolean;
      points?: number[][];
      allpoints?: number[][];
    };
    opacity?: {
      isActivate?: boolean;
      points?: number[][];
      allpoints?: number[][];
    };
  };
};

export type AudioElementType = {
  key?: string;

  priority?: number;
  startTime?: number;
  duration?: number;
  location?: { x: number; y: number };
  trim?: { startTime: number; endTime: number };
  localpath?: string;
  filetype?: string;
  speed?: number;
};

export interface Timeline {
  [elementId: string]: ImageElementType &
    VideoElementType &
    TextElementType &
    AudioElementType &
    GifElementType;
}
