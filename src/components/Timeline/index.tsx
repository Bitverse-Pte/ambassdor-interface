import React from "react";
import styled from "styled-components";

const Container = styled.div`
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
      width: 100%;
      position: absolute;
      top: 26px;
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
    }
    .line {
      background: rgba(179, 180, 179, 0.5);
      position: relative;
      top: 10px;
      width: calc(100% - 1px);
      overflow: hidden;
      height: 6px;
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
        margin-left: 16px;
        transition: all linear 0.08s;
        position: absolute;
        left: 18px;
      }
      &:hover {
        .hover-label {
          opacity: 1;
        }
      }
    }

    .status {
      background: #b3b4b3;
      border-radius: 50%;
      width: 14px;
      height: 14px;
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

export default function Timeline({ milestones }: any) {
  if (!Array.isArray(milestones)) {
    return null;
  }

  const [totalSteps, totalStepsCompleted, lastCompleted] = milestones.reduce(
    (prev, m, i) => [
      prev[0] + m.steps,
      prev[1] + m.stepsCompleted,
      m.steps === m.stepsCompleted ? i : prev[2],
    ],
    [0, 0, -1]
  );

  return (
    <Container className="timeline">
      <div className="line">
        <div
          className="line-progression"
          style={{ width: `${(totalStepsCompleted / totalSteps) * 100}%` }}
        ></div>
      </div>
      <div className="tooltip">
        <div style={{ left: `${(totalStepsCompleted / totalSteps) * 100}%` }}>
          <div className="triangle" />
          <span>{totalStepsCompleted}</span>
        </div>
      </div>
      <ol>
        {milestones.map((m, i) => (
          <li
            className="milestone"
            style={{ width: `${(m.steps / totalSteps) * 100}%` }}
            key={m.label + i}
          >
            <div className="content">
              <span
                className={`status${
                  m.steps === m.stepsCompleted ? " status--checked" : ""
                }`}
              />
              {lastCompleted === i && (
                <div className="pulse">
                  <div className="circle middle" />
                  <div className="circle delay1" />
                  <div className="circle delay2" />
                  <div className="circle delay3" />
                </div>
              )}
              <span className="milestone-label top">
                <span>{`${m.label}${
                  m.date ? ` ${new Date(m.date).toLocaleDateString()}` : ""
                }`}</span>
                <span className="hover-label">123</span>
              </span>
              <span className="milestone-label">
                {`${m.value}${
                  m.date ? ` ${new Date(m.date).toLocaleDateString()}` : ""
                }`}
              </span>
            </div>
          </li>
        ))}
      </ol>
    </Container>
  );
}
