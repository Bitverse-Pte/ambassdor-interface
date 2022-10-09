import { useHover } from "ahooks";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  /* max-width: 312px; */
  aspect-ratio: 1;
  z-index: 2;
  position: relative;
  overflow: hidden;

  .processing{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 8px 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0,0,0,0.8);
    font-family: 'Dela Gothic One';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    text-transform: capitalize;
    color: #01ECCA;
    transition: all linear 0.2s;
  }
  img{
    filter: grayscale(1) brightness(0.5);
    transition: all linear 0.2s;
    width: 176px;
  }
`;

const Wrapper = styled.div`
  position: relative;
  cursor: pointer;
`;
// onAnimationEnd
export default ({
  children,
}: any) => {
  const handleClick = () => {};
  const ref = useRef(null);
  const isHovering = useHover(ref);

  return (
    <Wrapper>
      <Container onClick={handleClick} ref={ref}>
        {children}
        <div className="processing">Processing</div>
      </Container>
    </Wrapper>
  );
};
