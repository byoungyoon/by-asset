import { useEffect, useMemo, useRef, useState } from "react";
import { animated, SpringValue, useTransition } from "@react-spring/web";
import Alert, { alertTypeEnum, AlertTypeEnum } from "./Alert";
import styled from "styled-components";

const ALERT_CONFIG = {
  tension: 125,
  friction: 20,
  precision: 0.1,
};

export type ItemTypes = {
  key: number;
  type: AlertTypeEnum;
  message: string;
  timeout?: number;
};

export type AddAlert = (
  type: AlertTypeEnum,
  message: string,
  timeout?: number
) => void;

export interface AnimateAlertProps {
  children: (add: AddAlert) => void;
}

export const AnimateAlert = (props: AnimateAlertProps) => {
  const { children } = props;

  const [items, setItems] = useState<ItemTypes[]>([]);
  const keyRef = useRef<number>(0);

  const refMap = useMemo(() => new WeakMap(), []);
  const cancelMap = useMemo(() => new WeakMap(), []);

  useEffect(() => {
    children((type: AlertTypeEnum, message: string, timeout?: number) => {
      setItems((state) => [
        ...state,
        {
          key: keyRef.current++,
          type: type,
          message: message,
          timeout: timeout,
        },
      ]);
    });
  }, []);

  const removeItem = (key: number) => {
    setItems((state) => state.filter((item) => item.key !== key));
  };

  const transitions = useTransition(items, {
    from: { opacity: 0, height: 0, life: "100%" },
    keys: (item) => item.key,
    enter: (item) => async (next, cancel) => {
      cancelMap.set(item, cancel);
      await next({ opacity: 1, height: refMap.get(item).offsetHeight });
      await next({ life: "0%" });
    },
    leave: [{ opacity: 0 }, { height: 0 }],
    onRest: (result, ctrl, item) => removeItem(item.key),
    config: (item, index, phase) => (key) =>
      phase === "enter" && key === "life"
        ? { duration: item.timeout ? item.timeout : 5000 }
        : ALERT_CONFIG,
  });

  const onClose = (item: ItemTypes, life: SpringValue<string>) => () => {
    if (cancelMap.has(item) && life.get() !== "0%") cancelMap.get(item)();
  };

  const getTitle = (title: string) => {
    return title.replace(/\b[a-z]/g, (char) => char.toUpperCase());
  };

  return (
    <Container>
      {transitions(({ life, ...style }, item) => (
        <Animate style={style}>
          <Alert
            ref={(ref: HTMLDivElement) => ref && refMap.set(item, ref)}
            type={item.type}
            title={getTitle(item.type)}
            content={item.message}
            onClose={onClose(item, life)}
          />
          <AnimateBar type={item.type} style={{ right: life }} />
        </Animate>
      ))}
    </Container>
  );
};

export default AnimateAlert;

type ColorTypes = {
  [index: AlertTypeEnum]: {
    bar: string;
  };
};

const COLOR = {
  [alertTypeEnum.SUCCESS]: {
    bar: "#43ACA7",
  },
  [alertTypeEnum.INFO]: {
    bar: "#2563eb",
  },
  [alertTypeEnum.WARNING]: {
    bar: "#a16207",
  },
  [alertTypeEnum.ERROR]: {
    bar: "#e11d48",
  },
} as ColorTypes;

const Container = styled.div`
  position: fixed;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999;
  margin: auto;
`;

const Animate = styled(animated.div)`
  margin-bottom: 8px;
  position: relative;
`;

const AnimateBar = styled(animated.div)<{ type: AlertTypeEnum }>`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 5px;

  background: ${({ type }) => COLOR[type].bar};
`;
