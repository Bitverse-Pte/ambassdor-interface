import { ROLE } from "@/interface";
import { useHover, useSize } from "ahooks";
import React, { useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { useModel } from "umi";
import IconRocket from "./IconRocket";
import BigNumber from "bignumber.js";
import { format } from "@/utils";
import Tippy from "@tippyjs/react";

const Row = styled.div`
  display: flex;
  align-items: center;
`;

const Container = styled.div`
  @keyframes float {
    0% {
      transform: translate(0, calc(-50% + 5px));
    }
    50% {
      transform: translate(0, calc(-50% - 5px));
    }
    100% {
      transform: translate(0, calc(-50% + 5px));
    }
  }

  @keyframes launch {
    0% {
      transform: rotate(0deg) translate(0px, -50%);
    }
    10% {
      transform: rotate(0deg) translate(20px, -50%);
    }
    50% {
      transform: rotate(205deg) translate(30px, -50%);
    }
    to {
      transform: rotate(205deg) translate(450px, -50%);
    }
  }

  @keyframes ripple {
    0% {
      border-radius: 50%;
      box-shadow: 0 0 0 0 rgba(175, 166, 255, 0.3),
        0 0 0 5px rgba(175, 166, 255, 0.3), 0 0 0 10px rgba(175, 166, 255, 0.3),
        0 0 0 15px rgba(175, 166, 255, 0.3);
    }
    100% {
      border-radius: 50%;
      box-shadow: 0 0 0 5px rgba(175, 166, 255, 0.3),
        0 0 0 10px rgba(175, 166, 255, 0.3), 0 0 0 15px rgba(175, 166, 255, 0.3),
        0 0 0 20px rgba(175, 166, 255, 0);
    }
  }

  @keyframes waves {
    0% {
      transform: translate(-50%, -50%) scale(0.2);
      opacity: 0.2;
    }

    60% {
      transform: translate(-50%, -50%) scale(0.8);
      opacity: 0.06;
    }
    70% {
      transform: translate(-50%, -50%) scale(0.8);
      opacity: 0;
    }
  }

  @keyframes trackline-progress-load {
    0% {
      transform: translateX(-100%);
    }
  }

  @keyframes myo-trackline-pulse {
    0%,
    100% {
      transform: scale(1);
      opacity: 0;
    }
    1% {
      opacity: 0.4;
    }
    70% {
      opacity: 0.2;
    }
    99% {
      transform: scale(5);
      opacity: 0;
    }
  }

  @keyframes point-active {
    0%,
    50% {
      transform: scale(1.2);
      background: #00eccd;
    }
    100% {
      transform: scale(1);
      background: #29b9ad;
    }
  }

  &.timeline {
    position: relative;
    width: calc(100% - 36px);
    margin: auto;
    .tooltip {
      &.locked {
        .triangle {
          border-bottom-color: #c9fff9;
        }
        color: #c9fff9;
      }
      width: 100%;
      position: absolute;
      top: 24px;
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      color: #00ebc9;
      opacity: 0.6;

      & > div {
        position: absolute;
        transform: translate(-50%, 0px);
      }
      .triangle {
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-bottom: 5px solid #00ebc9;
        margin: auto auto 3px auto;
        height: 0;
        width: 0;
      }
      span {
        display: block;
        margin-top: 3px;
        line-height: 1;
      }
    }

    .extra-line {
      background: rgba(179, 180, 179, 0.5);
      position: absolute;
      top: 10px;
      overflow: visible;
      height: 6px;
      right: 0;
      transform: translate(100%, 0);
      svg {
        &.default {
          animation-duration: 2s;
          animation-name: float;
          animation-timing-function: linear;
          animation-fill-mode: forwards;
          animation-iteration-count: infinite;
        }
        &.launch {
          animation-duration: 2s;
          animation-name: launch;

          animation-timing-function: ease-in;
          animation-fill-mode: forwards;
        }
        position: absolute;
        top: 50%;
        left: 40px;
        transform: translate(0%, -50%);
        cursor: pointer;
        /* animation-timing-function: cubic-bezier(0.31, -0.58, 1, -0.21); */
        /* animation: rocket cubic-bezier(0.31, -0.58, 1, -0.21) 2s infinite; */
      }
    }

    .line {
      background: rgba(179, 180, 179, 0.5);
      position: relative;
      top: 10px;
      width: calc(100% - 1px);
      overflow-x: hidden;
      overflow-y: visible;
      height: 6px;
    }

    .level-locked-svg {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translate(-50%, -50%);
      z-index: 3;
    }

    .line-progression {
      background: #00ebc9;
      height: 6px;
      animation: trackline-progress-load 2s 300ms ease-out both;
    }

    ol {
      margin: 0;
      list-style-type: none;
      display: flex;
      flex-wrap: nowrap;
      padding-inline-start: initial;
      position: relative;
    }

    .milestone {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }

    .content {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;

      .hover-label {
        opacity: 0;
        margin-left: 28px;
        transition: all linear 0.08s;
        display: none;
        /* position: absolute; */
        /* left: 18px; */
      }
      &:hover {
        .hover-label {
          opacity: 1;
          display: inline-block;
        }
      }
    }

    .status {
      background: #b3b4b3;
      border-radius: 50%;
      width: 14px;
      height: 14px;
      cursor: pointer;
      /* box-shadow: 0px 0px 4px #00aa91; */
    }

    .status--checked {
      background: #00ebc9;
      box-shadow: 0px 0px 4px #00aa91;
      & ~ span {
        color: #00ebc9;
      }
    }

    .milestone-label {
      position: absolute;
      top: 40px;
      text-align: center;
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      color: #b3b4b3;
      &.top {
        top: -50px;
        display: flex;
        align-items: center;
        white-space: nowrap;
        z-index: 22;
        span {
          transition: all linear 0.2s;
        }
      }
    }

    .pulse {
      width: 14px;
      height: 14px;
      position: absolute;
      border-radius: 50%;
      z-index: 1;
      background: #00ebc9;
      box-shadow: 0px 0px 4px #00aa91;
      cursor: pointer;
      .circle {
        /* 72 48 30 14 */
        height: 72px;
        width: 72px;
        border-radius: 50%;
        background: #00ebc9;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        opacity: 0;
      }
      .middle {
        width: 8px;
        height: 8px;
        background: #fff;
        opacity: 1;
        z-index: 1;
        position: relative;
      }
      .delay1 {
        animation: waves 4s linear infinite;
      }
      .delay2 {
        animation: waves 4s linear 0.4s forwards infinite;
      }
      .delay3 {
        animation: waves 4s linear 0.8s forwards infinite;
      }
      .delay4 {
        animation: waves 4s linear 1.2s forwards infinite;
      }
    }
  }
`;

const Hover = ({ m }: any) => {
  const ref = useRef(null);
  const ifHover = useHover(ref);

  return (
    <span className="milestone-label top" ref={ref}>
      {ifHover ? (
        <span>
          {m.label}&nbsp;&nbsp;{m.name}
        </span>
      ) : (
        <span>{m.label}</span>
      )}
    </span>
  );
};

export default function Timeline({
  handleSlide,
  milestones,
  curStepsCompleted,
  max,
  curIndex,
  locked = false,
  lockedValue
}: any) {
  if (!Array.isArray(milestones)) {
    return null;
  }

  const {
    user: { isContributor, curRole },
  } = useModel("userInfo");

  const [totalSteps, totalStepsCompleted, lastCompleted] = milestones.reduce(
    (prev, m, i) => [
      +prev[0] + +m.steps,
      +prev[1] + +m.stepsCompleted,
      m.steps === m.stepsCompleted ? i : prev[2],
    ],
    [0, 0, -1]
  );

  const curCompleting = useMemo(() => lastCompleted + 1, [lastCompleted]);

  const stepWidth = useMemo(() => 1 / (milestones.length - 1), [milestones]);

  const dis = useMemo(() => {
    // const nextIndex = lastCompleted+1 >= milestones.length ? milestones.length : lastCompleted+1;
    const dis = milestones[curCompleting]?.max - milestones[curCompleting]?.min;
    const cur =
      ((milestones[curCompleting]?.stepsCompleted -
        milestones[curCompleting]?.min) /
        dis) *
      stepWidth;

    const f = curCompleting * stepWidth + cur;
    return f > 1 ? 1 : f;
  }, [stepWidth, curCompleting, milestones]);

  const handleClick = (item: any, index: number) => {
    handleSlide(item, index);
  };

  const ifInExtra = useMemo(() => {
    return isContributor && curStepsCompleted >= max;
  }, [isContributor, curStepsCompleted, max]);

  const ref = useRef(null);
  const size = useSize(ref);

  const [currentClass, setCurClass] = useState("default");

  const showQuestModral = () => {
    setCurClass("launch");
  };

  const handleAnimationEnd = (e) => {
    if (e.animationName === "launch") {
      setCurClass("default");
      window.open("https://forms.gle/mYfPqwPyFbuhaZxXA", "_blank");
      // questModalRun({ questKey: i?.questKey });
      // questModalSetTrue()
    }
  };

  return (
    <Row>
      <Container className="timeline">
        {
          locked ?(
            <Tippy content={<span>Contributor Level Points: <span style={{color: '#00ECC9'}}>{lockedValue}</span></span>}>
            <svg
              style={{
                left: `calc(${dis * 100}% - 7px)`,
              }}
              width="18"
              height="21"
              viewBox="0 0 18 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="level-locked-svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M11.7143 7.64706V5.14706C11.7143 3.60391 10.4991 2.35294 9 2.35294C7.50094 2.35294 6.28571 3.60391 6.28571 5.14706V7.64706H11.7143ZM9 0C6.23858 0 4 2.30442 4 5.14706V10H14V5.14706C14 2.30442 11.7614 0 9 0Z"
                fill="#C9FFF8"
              />
              <mask id="path-2-inside-1_71_58600" fill="white">
                <rect y="7" width="18" height="14" rx="3" />
              </mask>
              <rect
                y="7"
                width="18"
                height="14"
                rx="3"
                fill="#C9FFF8"
                stroke="#C9FFF8"
                stroke-width="14"
                mask="url(#path-2-inside-1_71_58600)"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.95675 14.5512C10.3297 14.2711 10.5709 13.8251 10.5709 13.3227C10.5709 12.4747 9.88346 11.7873 9.03545 11.7873C8.18745 11.7873 7.5 12.4747 7.5 13.3227C7.5 13.8251 7.74125 14.2711 8.11421 14.5512V16.3936C8.11421 16.9024 8.52668 17.3149 9.03548 17.3149C9.54429 17.3149 9.95675 16.9024 9.95675 16.3936V14.5512Z"
                fill="#05050E"
              />
            </svg>
          </Tippy>
          ):null
        }
        {/* locked */}
       

        <div className="line" ref={ref}>
          <div
            className="line-progression"
            // style={{ width: `${(totalStepsCompleted / totalSteps) * 100}%` }}
            style={{
              width: `calc(${dis * 100}% - 7px)`,
            }}
          ></div>
        </div>

        {ifInExtra ? (
          <div
            style={{
              width: `calc((max(100vw, 1440px) - ${size?.width}px) / 2)`,
            }}
            className={`extra-line`}
          >
            <IconRocket
              onAnimationEnd={handleAnimationEnd}
              className={currentClass}
              onClick={showQuestModral}
            />
          </div>
        ) : null}

        <div className={`${locked ? "locked" : ""} tooltip`}>
          <div
            // style={{ left: `${(totalStepsCompleted / totalSteps) * 100}%` }}
            style={{
              left: `calc(${dis * 100}% - 7px)`,
            }}
          >
            <div className="triangle" />
            <span>{curStepsCompleted}</span>
          </div>
        </div>
        <ol>
          {milestones.map((m, i) => (
            <li
              className="milestone"
              // style={{ width: `${(m.steps / totalSteps) * 100}%` }}
              style={{
                width: i === 0 ? 0 : `${stepWidth * 100}%`,
              }}
              key={m.label + i}
            >
              <div className="content" onClick={() => handleClick(m, i)}>
                <span
                  className={`status${
                    (m.max > m.stepsCompleted && m.min <= m.stepsCompleted) ||
                    m.stepsCompleted === m.steps
                      ? // activeIndex === i
                        " status--checked"
                      : ""
                  }`}
                />
                {// (curIndex ?  : m.max > m.stepsCompleted && m.min <= m.stepsCompleted)
                curIndex === i && (
                  <div className="pulse">
                    <div className="circle middle" />
                    <div className="circle delay1" />
                    <div className="circle delay2" />
                    <div className="circle delay3" />
                  </div>
                )}
                <Hover m={m} />
                <span className="milestone-label">{format(m.value)}</span>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </Row>
  );
}
