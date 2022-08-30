import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Navbar = styled.div`
&.x-nav-bar {
  position: relative;
  display: flex;
  align-items: flex-end!important;
  padding: 0 16px;
  align-items: center;
  /* border-bottom: 1px solid var(--trade-line-grey); */
  height: 100px;

  .x-nav-item {
    flex: 1;
    max-width: 242px;
    margin-right: 86px;
    cursor: pointer;
    user-select: none;
    white-space: nowrap;
    color: #fff;
    font-weight: 400;
    font-size: 40px;
    line-height: 60px;
    font-family: 'Dela Gothic One';
    transition: all 0.1s linear;
    opacity: 0.6;
    &:hover{
      opacity: .8;
    }
    &.x-nav-item-active {
      opacity: 1;
    }
  }

  .x-nav-indicator {
    position: absolute;
    bottom: -1px;
    left: 16px;
    height: 1px;
    width: 20px;
    background: var(--trade-color-operate);
    transition: all 0ms linear;
  }
}
`

interface NavBarOptions {
  list: string[];
  currentIdx: number;
  onChange?: (idx: number) => void;
  className?: string;
}

export default function NavBar(options: NavBarOptions) {
  const { list = [], currentIdx = 0, onChange, className } = options;

  const barRef = React.createRef<HTMLDivElement>();
  const [curIdx, setCurIdx] = useState(currentIdx);
  const [curIdxChange, setCurIdxChange] = useState(false);

  const handleNavClick = (ev: React.MouseEvent) => {
    const target = ev.target as HTMLElement;

    if (target.className.includes('x-nav-item') && barRef.current) {
      const itemList = Array.from(
        barRef.current.querySelectorAll<HTMLElement>('.x-nav-item')
      );
      let getIdx = -1;

      itemList.some((item, idx): boolean => {
        if (item === target) {
          getIdx = idx;
          return true;
        }
        return false;
      });

      if (getIdx !== curIdx) {
        if (!curIdxChange) {
          setCurIdxChange(true);
        }
        setCurIdx(getIdx);
        if (onChange) {
          onChange(getIdx);
        }
      }
    }
  };

  useEffect(() => {
    if (curIdx !== currentIdx) {
      setCurIdx(currentIdx);
    }
  }, [curIdx, currentIdx]);

  return (
    <Navbar
      className={`x-nav-bar${className ? ` ${className}`: ''}`}
      onClick={handleNavClick}
      ref={barRef}
    >
      {list.map((item, idx) => (
        <div
          key={item}
          className={
            idx === curIdx ? 'x-nav-item x-nav-item-active' : 'x-nav-item'
          }
        >
          {item}
        </div>
      ))}
      {/* <div
        className="x-nav-indicator"
        style={{
          transitionDuration: curIdxChange ? '200ms' : '0ms',
          width: `${indicatorWidth === null ? 0 : indicatorWidth}px`,
          left: `${indicatorLeft}px`,
        }}
      /> */}
    </Navbar>
  );
}
