import { ReactNode, useRef } from 'react';
import styled from 'styled-components';
import Petal from './Petal';

interface SakuraProps {
  children?: ReactNode;
  total?: number;
}

export default function Sakura(props: SakuraProps) {
  const { children, total = 200 } = props;
  const ref = useRef<HTMLDivElement>(null);

  const maxTotal = Math.min(total, 500);

  const options = {
    fallSpeed: 1,
    maxSize: 14,
    minSize: 10,
    delay: 300,
    colors: {
      gradientColorStart: 'rgba(255,183,197,0.9)',
      gradientColorEnd: 'rgba(255, 197, 208, 0.9)',
      gradientColorDegree: 120,
    },
  };

  return (
    <Container id="sakura" ref={ref}>
      {Array.from(Array(maxTotal).keys()).map(() => (
        <Petal options={options} />
      ))}
      {children}
    </Container>
  );
}

const Container = styled.div`
  overflow-x: hidden;
  width: 100%;
  height: 100%;
  position: relative;
`;
