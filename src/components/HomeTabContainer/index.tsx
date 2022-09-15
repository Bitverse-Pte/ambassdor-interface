import styled from "styled-components";
import { useMemo, useState } from "react";
import NavBar from "../Navbar";
import Level from "./Level";
import Quest from "./Quest";
import NFT from "./NFT";
import CardTypeQuest from "./Quest/CardTypeQuest";
import Modal from "../Modal";
import { useBoolean } from "ahooks";

const StyledModal = styled(Modal)`
  .inner {
    max-width: 50vw;
    .content {
      max-height: 80vh;
      overflow: auto;
    }
  }
`;

const Container = styled.div`
  width: 100%;
  /* min-height: 1027px; */
  padding: 0 92px;
  box-sizing: border-box;

  .row {
    display: flex;
    align-items: center;
  }

  .row-between {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .sub-nav {
    background: rgba(217, 217, 217, 0.1);
    border-radius: 16px;
    align-self: flex-end;
    position: relative;
    .block {
      background: #00ecc9;
      border-radius: 16px;
      width: 142px;
      height: 100%;
      position: absolute;
      top: 0%;
      left: 0%;
      transition: transform linear 0.2s;
    }

    & > div:not(.block) {
      transition: all linear 0.2s;
      position: relative;
      z-index: 2;
      padding: 7px 0;
      width: 142px;
      font-weight: 500;
      font-size: 20px;
      line-height: 30px;
      text-align: center;
      text-transform: capitalize;
      color: #00ebc8;
      cursor: pointer;
      border-radius: 16px;
      &:hover {
        filter: opacity(0.7);
      }
      &.active {
        color: #05050e;
      }
    }
  }

  // 导航内容区样式
  .nav-detail-ctr {
    width: 100%;

    &.with-animation {
      transition: all 240ms linear;
    }

    &.nav-detail-ctr-left-hide {
      transform: translate3d(-100%, 0, 0);
    }

    &.nav-detail-ctr-right-hide {
      transform: translate3d(100%, 0, 0);
    }
  }
`;

export enum NAVLIST {
  "Level",
  "Quest",
  "NFT",
}

export const navs = ["Level", "Quest", "NFT"];
export const questSubLevel = ["Monthly", "Storyline", "History"];

export default () => {
  const [chartIdx, setChartIdx] = useState(NAVLIST.Level);
  const [showLevelDialog, { setTrue, setFalse }] = useBoolean(false);

  const navList = useMemo(
    () =>
      navs.map((item) => ({
        item,
        suffix:
          item === navs[0] ? (
            <div onClick={setTrue}>
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="16" cy="16.0001" r="12.8333" stroke="white" />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M16 8C17.2028 8 18.1335 9.03419 17.9843 10.2051L17.0075 17.2042C16.9496 17.6588 16.5556 18 16.0886 18H15.9114C15.4444 18 15.0504 17.6588 14.9925 17.2042L14.0157 10.2051C13.8665 9.03419 14.7972 8 16 8Z"
                  fill="white"
                />
                <path
                  d="M16 20C17.1046 20 18 20.8954 18 22C18 23.1046 17.1046 24 16 24C14.8954 24 14 23.1046 14 22C14 20.8954 14.8954 20 16 20Z"
                  fill="white"
                />
              </svg>
            </div>
          ) : null,
      })),
    []
  );

  const [currentSubNav, setCurrentSubNav] = useState(0);

  return (
    <Container>
      <div className="view-port-chart">
        <div className="draggable-module-ctr row-between">
          <NavBar list={navList} currentIdx={chartIdx} onChange={setChartIdx} />
          {chartIdx === NAVLIST.Quest && (
            <div className="sub-nav row">
              <div
                className="block"
                style={{ transform: `translate(${currentSubNav * 100}%, 0)` }}
              />
              {questSubLevel?.map((i, index) => (
                <div
                  key={index}
                  className={index === currentSubNav ? "active" : ""}
                  onClick={() => {
                    setCurrentSubNav(index);
                  }}
                >
                  {i}
                </div>
              ))}
            </div>
          )}
        </div>

        {chartIdx === NAVLIST.Level && (
          <div className={`nav-detail-ctr nav-detail-ctr-left`}>
            <Level show={chartIdx === NAVLIST.Level} />
          </div>
        )}

        {chartIdx === NAVLIST.Quest && (
          <div className={`nav-detail-ctr nav-detail-ctr-left`}>
            {currentSubNav === 0 && (
              <CardTypeQuest
                type="monthly"
                color="linear-gradient(90deg, #10CEC3 3.8%, #006B69 95.11%);"
                label={questSubLevel[currentSubNav]}
                show={chartIdx === NAVLIST.Quest}
              />
            )}
            {currentSubNav === 1 && (
              <CardTypeQuest
                type="storyline"
                color="linear-gradient(90deg, #FFA826 -6.84%, #FF7A00 103.42%);"
                label={questSubLevel[currentSubNav]}
                show={chartIdx === NAVLIST.Quest}
              />
            )}
            {currentSubNav === 2 && <Quest show={chartIdx === NAVLIST.Quest} />}
          </div>
        )}

        {chartIdx === NAVLIST.NFT && (
          <div className={`nav-detail-ctr nav-detail-ctr-left`}>
            <NFT show={chartIdx === NAVLIST.NFT} />
          </div>
        )}
      </div>

      <StyledModal visible={showLevelDialog} onClose={setFalse}>
        <div>
          <img src={require("@/assets/level.png")} alt="" />
        </div>
      </StyledModal>
    </Container>
  );
};
