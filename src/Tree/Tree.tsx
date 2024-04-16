import { forwardRef, MouseEventHandler, useEffect, useRef } from 'react';

type PureProps = {
  onClick?: MouseEventHandler<HTMLCanvasElement>;
};

const PureCanvas = forwardRef<HTMLCanvasElement, PureProps>((props, ref) => <canvas ref={ref} {...props} />);

const degToRad = (angle: number) => {
  return (angle / 180.0) * Math.PI;
};

const random = (min: number, max: number) => {
  return min + Math.floor(Math.random() * (max - min + 1));
};

const getRGB = (HEX: string) => {
  const arr = HEX.substring(1)
    .match(/.{2}/g)
    ?.map((replacer) => parseInt(replacer, 16) || 0)!;

  return {
    r: arr[0],
    g: arr[1],
    b: arr[2],
  };
};

type XY = {
  x: number;
  y: number;
};

type Props = {
  target: string;
  color: string;

  reset?: number;
  isResize?: boolean;

  defaultDepth?: number;
  defaultCount?: number;
};

export default function Tree({ target, color, reset = 0, isResize, defaultDepth = 11, defaultCount = 0 }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  const maxDepth = defaultDepth;
  const currColor = getRGB(color);

  const onDraw = (ctx: CanvasRenderingContext2D, start: XY, end: XY, width: number, strokeStyle: string) => {
    ctx.beginPath();

    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);

    ctx.lineWidth = width;
    ctx.strokeStyle = strokeStyle;

    ctx.stroke();
    ctx.closePath();
  };

  const createBranch = (ctx: CanvasRenderingContext2D, start: XY, angle: number, depth: number) => {
    if (maxDepth === depth) return;

    const len = depth === 0 ? random(10, 13) : random(0, 11);
    const end = {
      x: start.x + Math.cos(degToRad(angle)) * len * (maxDepth - depth),
      y: start.y + Math.sin(degToRad(angle)) * len * (maxDepth - depth),
    };

    let color = {
      r: currColor.r - (currColor.r / maxDepth) * (maxDepth - depth),
      g: currColor.g - (currColor.g / maxDepth) * (maxDepth - depth),
      b: currColor.b - (currColor.b / maxDepth) * (maxDepth - depth),
    };

    onDraw(ctx, start, end, maxDepth - depth, `rgb(${color.r},${color.g},${color.b})`);

    requestAnimationFrame(() => {
      createBranch(ctx, end, angle - random(15, 23), depth + 1);
      createBranch(ctx, end, angle + random(15, 23), depth + 1);
    });
  };

  const handleDefault = () => {
    const ctx = ref.current?.getContext('2d')!;

    for (let i = 0; i < defaultCount; i++) {
      createBranch(ctx, { x: random(0, ctx.canvas.width), y: ctx.canvas.height }, -90, 0);
    }
  };

  const handleClick: MouseEventHandler<HTMLCanvasElement> = (event) => {
    const { clientX } = event;
    const ctx = ref.current?.getContext('2d')!;

    createBranch(ctx, { x: clientX, y: ctx.canvas.height }, -90, 0);
  };
  const handleResize = () => {
    const ctx = ref.current?.getContext('2d')!;

    ctx.canvas.width = document.getElementById(target)?.clientWidth!;
    ctx.canvas.height = document.getElementById(target)?.clientHeight!;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  };

  useEffect(() => {
    handleResize();
    handleDefault();

    if (isResize) {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  useEffect(() => {
    if (reset !== 0) handleResize();
  }, [reset]);

  return <PureCanvas ref={ref} onClick={handleClick} />;
}
