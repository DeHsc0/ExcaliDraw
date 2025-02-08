export interface RectData {
    x: number;
    y: number;
    width: number;
    height: number
  }
  
  export interface CircleData {
    x: number;
    y: number;
    radius: number
  }

  export type EllipseData = {
    centerX: number;
    centerY: number;
    radiusX: number;
    radiusY: number;
    rotation?: number
  }

  export interface DiamondData {
    startX : number; 
    startY : number; 
    currentX : number; 
    currentY : number; 
    midX : number; 
    midY : number
}

  export interface DiamondPoints {
    topX : number;
    topY : number;
    bottomX : number;
    bottomY : number;
    leftX : number; 
    leftY : number;
    rightX : number; 
    rightY : number
}

  
  export type DrawingMode = 'rect' | 'circle' | "ellipse" | "select" | "diamond" | null;