import { MouseEventHandler, useCallback, useEffect, useRef } from "react";
import { Point, Points } from "../types/Point";

const DynamicCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const isDown = useRef(false);
  const mouesPos = useRef<Point>({ x: 0, y: 0 });
  const offset = useRef<Point>({ x: 0, y: 0 });

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctxRef.current = ctx;
  }, []);

  const handleMouseDown = useCallback<MouseEventHandler<HTMLCanvasElement>>(
    (e) => {
      isDown.current = true;
      mouesPos.current = { x: e.clientX, y: e.clientY };
    },
    []
  );

  const handleMouseUp = useCallback<
    MouseEventHandler<HTMLCanvasElement>
  >(() => {
    isDown.current = false;
  }, []);

  const handleMouseMove = useCallback<MouseEventHandler<HTMLCanvasElement>>(
    (e) => {
      if (!isDown.current) return;
      const currentPoint = { x: e.clientX, y: e.clientY };
      const diff = Points.diff(mouesPos.current, currentPoint);
      offset.current = Points.add(offset.current, diff);
      mouesPos.current = currentPoint;

      if (!canvasRef.current || !ctxRef.current) return;

      ctxRef.current.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      ctxRef.current.fillStyle = "red";
      for (let x = -50; x < 50; x++) {
        ctxRef.current.fillText(
          x.toString(),
          x * 20 + offset.current.x,
          canvasRef.current.height / 2
        );
      }
      for (let y = -50; y < 50; y++) {
        ctxRef.current.fillText(
          y.toString(),
          canvasRef.current.width / 2,
          y * 20 + offset.current.y
        );
      }
    },
    []
  );

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseOut={handleMouseUp}
      onMouseMove={handleMouseMove}
      width={500}
      height={500}
      style={{
        border: "1px solid black",
      }}
    />
  );
};

export default DynamicCanvas;
