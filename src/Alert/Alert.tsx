import React, { forwardRef } from "react";
import styled from "styled-components";
import {
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiFillWarning,
  AiOutlineClose,
} from "react-icons/ai";
import { BsFillInfoCircleFill } from "react-icons/bs";

export const alertTypeEnum = {
  SUCCESS: "success",
  INFO: "info",
  WARNING: "warning",
  ERROR: "error",
};

export type AlertTypeEnum = (typeof alertTypeEnum)[keyof typeof alertTypeEnum];

export interface AlertProps {
  type?: AlertTypeEnum;

  title?: string;
  content?: string;

  onClose?: () => void;
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
  const { type = alertTypeEnum.SUCCESS, title, content, onClose } = props;

  return (
    <Container ref={ref} type={type}>
      <Content>
        <div>
          {type === alertTypeEnum.SUCCESS && <AiFillCheckCircle size={25} />}
          {type === alertTypeEnum.INFO && <BsFillInfoCircleFill size={25} />}
          {type === alertTypeEnum.WARNING && <AiFillWarning size={25} />}
          {type === alertTypeEnum.ERROR && <AiFillCloseCircle size={25} />}
        </div>
        <div>
          <div className="title">{title}</div>
          <div>{content}</div>
        </div>
      </Content>
      {onClose && (
        <Close>
          <AiOutlineClose size={15} onClick={onClose} />
        </Close>
      )}
    </Container>
  );
});

Alert.displayName = "Alert";

export default Alert;

type ColorTypes = {
  [index: AlertTypeEnum]: {
    bg: string;
    color: string;
  };
};

const COLOR = {
  [alertTypeEnum.SUCCESS]: {
    bg: "#F1FFFF",
    color: "#43ACA7",
  },
  [alertTypeEnum.INFO]: {
    bg: "#dbeafe",
    color: "#2563eb",
  },
  [alertTypeEnum.WARNING]: {
    bg: "#fef3c7",
    color: "#a16207",
  },
  [alertTypeEnum.ERROR]: {
    bg: "#ffe4e6",
    color: "#e11d48",
  },
} as ColorTypes;

const Container = styled.div<{ type: AlertTypeEnum }>`
  padding: 1em;
  background: ${({ type }) => COLOR[type].bg};
  color: ${({ type }) => COLOR[type].color};
  min-width: 500px;
  width: min-content;
  word-break: break-all;
  position: relative;

  @media (max-width: 500px) {
    width: 90dvw;
    min-width: min-content;
  }

  & .title {
    font-weight: 600;
    font-size: 1.1em;
    margin-bottom: 0.5em;
  }
`;

const Content = styled.div`
  display: flex;
  gap: 1em;
`;

const Close = styled.div`
  position: absolute;
  top: 1em;
  right: 1em;
  cursor: pointer;
`;
