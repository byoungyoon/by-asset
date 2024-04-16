import { forwardRef, useEffect, useRef } from 'react';

const PureCanvas = forwardRef<HTMLCanvasElement>((props, ref) => <canvas ref={ref} style={{ background: '' }} />);

const degToRad = (angle: number) => {
  return (angle / 180.0) * Math.PI;
};

const random = (min: number, max: number) => {
  return min + Math.floor(Math.random() * (max - min + 1));
};

const getRGB = (HEX: string) => {
  const arr = HEX.match(/.{2}/g)?.map((replacer) => parseInt(replacer, 16) || 0)!;

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
  color: string;
};

export default function Tree({ color }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  const maxDepth = 11;
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

  const handleClick = (ctx: CanvasRenderingContext2D) => (event: MouseEvent) => {
    const { clientX } = event;

    createBranch(ctx, { x: clientX, y: window.innerHeight }, -90, 0);
  };
  const handleResize = (ctx: CanvasRenderingContext2D) => () => {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  };

  useEffect(() => {
    const ctx = ref.current?.getContext('2d')!;

    handleResize(ctx)();

    window.addEventListener('resize', handleResize(ctx));
    window.addEventListener('click', handleClick(ctx));
    return () => {
      window.removeEventListener('resize', handleResize(ctx));
      window.removeEventListener('click', handleClick(ctx));
    };
  }, []);

  return <PureCanvas ref={ref} />;
}
