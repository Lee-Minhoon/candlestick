export interface Point {
  x: number;
  y: number;
}

export class Points {
  static diff = (p1: Point, p2: Point) => {
    return { x: p2.x - p1.x, y: p2.y - p1.y };
  };

  static add = (p1: Point, p2: Point) => {
    return { x: p2.x + p1.x, y: p2.y + p1.y };
  };
}
