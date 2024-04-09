import { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import './petal.css';

type Props = {
  options: optionTypes;
};

type optionTypes = {
  fallSpeed: number;
  maxSize: number;
  minSize: number;
  delay: number;
  colors: {
    gradientColorStart: string;
    gradientColorEnd: string;
    gradientColorDegree: number;
  };
};

export default function Petal(props: Props) {
  const { options } = props;

  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  const randomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const animationNames = {
    blowAnimations: ['blow-soft-left', 'blow-medium-left', 'blow-soft-right', 'blow-medium-right'],
    swayAnimations: ['sway-0', 'sway-1', 'sway-2', 'sway-3', 'sway-4', 'sway-5', 'sway-6', 'sway-7', 'sway-8'],
  };

  // animation control
  const animations = useMemo(() => {
    const randomArrayElem = (arr: string[]) => {
      return arr[Math.floor(Math.random() * arr.length)];
    };

    const blowAnimation = randomArrayElem(animationNames.blowAnimations);
    const swayAnimation = randomArrayElem(animationNames.swayAnimations);

    const fallTime =
      (document.documentElement.clientHeight * 0.007 + Math.round(Math.random() * 10)) * options.fallSpeed;

    const animationsArr = [
      `fall ${fallTime}s linear 0s infinite`,
      `${blowAnimation} ${(fallTime > 30 ? fallTime : 30) - 20 + randomInt(0, 20)}s linear 0s infinite`,
      `${swayAnimation} ${randomInt(2, 4)}s linear 0s infinite`,
    ];
    return animationsArr.join(', ');
  }, [count]);

  // css control
  const actionCss = useMemo(() => {
    const height = randomInt(options.minSize, options.maxSize);
    const width = height - Math.floor(randomInt(0, options.minSize) / 3);

    return {
      background: `linear-gradient(${options.colors.gradientColorDegree}deg, ${options.colors.gradientColorStart}, ${options.colors.gradientColorEnd})`,
      borderRadius: `${randomInt(options.maxSize, options.maxSize + Math.floor(Math.random() * 10))}px ${randomInt(1, Math.floor(width / 4))}px`,
      height: `${height}px`,
      width: `${width}px`,
      left: `${Math.random() * document.documentElement.clientWidth - 100}px`,
      marginTop: `${-(Math.floor(Math.random() * 200) + 15)}px`,
    };
  }, [count]);

  const prefixes = ['webkit', 'moz', 'MS', 'o', ''];
  const prefixedEvent = (element: HTMLDivElement, type: string, callback: () => void) => {
    for (let i = 0; i < prefixes.length; i++) {
      let animType = type;

      if (!prefixes[i]) {
        animType = type.toLowerCase();
      }

      element.addEventListener(prefixes[i] + animType, callback, false);
    }
  };

  const elementInViewport = (element: HTMLDivElement) => {
    const rect = element.getBoundingClientRect();

    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  useEffect(() => {
    if (ref.current) {
      prefixedEvent(ref.current, 'AnimationEnd', () => {
        if (!elementInViewport(ref.current!)) {
        }
      });

      prefixedEvent(ref.current, 'AnimationIteration', () => {
        if (!elementInViewport(ref.current!)) {
        }
      });
    }
  }, [ref.current]);

  return <CustomPetal ref={ref} animations={animations} css={actionCss} />;
}

const CustomPetal = styled.div<{ animations: string; css: { [key: string]: string } }>`
  position: absolute;
  ${({ css }) =>
    `
        background : ${css.background};
        border-radius : ${css.borderRadius};
        height : ${css.height};
        width : ${css.width};
        margin-top : ${css.marginTop};
        left : ${css.left};
    `}

  -webkit-animation: ${({ animations }) => animations};
  animation: ${({ animations }) => animations};
`;
