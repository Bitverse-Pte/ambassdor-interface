import styled from "styled-components";
import { useEffect, useMemo, useState } from "react";
import { useModel } from "umi";
import {
  useBoolean,
  useSessionStorageState,
} from "ahooks";
import NavBar from "../Navbar";
import Level from "./Level";
import Quest from "./Quest";
import NFT from "./NFT";
import CardTypeQuest from "./Quest/CardTypeQuest";
import Modal from "../Modal";


import Portal from "../Portal";
import { ROLE } from "@/interface";
import Button from "../Button";

const FullScreen = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  z-index: 667;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    /* width: ; */
    height: 90vh;
  }
`;

const StyledModal = styled(Modal)`
  .inner {
    max-width: 50vw;
    .content {
      margin-top: 36px;
      max-height: 60vh;
      overflow: auto;
      img {
        width: 500px;
        cursor: pointer;
      }
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
    &.sub-level-nav {
      & > div:not(.block) {
        font-weight: 500;
        font-size: 16px;
        line-height: 20px;
        padding: 12px 0;
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

  .no-role {
    margin-top: 216px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    img{
      width: 180px;
    }
    span {
      display: inline-block;
      margin: 32px 0;
      font-weight: 500;
      font-size: 24px;
      line-height: 36px;
      /* identical to box height */

      text-align: center;
      text-transform: capitalize;

      color: #ffffff;
    }
    button {
      border-radius: 20px;
      font-weight: 400;
      font-size: 24px;
      line-height: 36px;
      /* identical to box height */

      text-align: center;
      text-transform: capitalize;

      color: #05050e;
      width: 190px;
      height: 36px;
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
export const levelSubLevel = ["Contributor", "Ambassador"];

export default () => {
  const [chartIdx, setChartIdx] = useSessionStorageState("topic-tabs", {
    defaultValue: NAVLIST.Level,
  });
  const [showLevelDialog, { setTrue, setFalse }] = useBoolean(false);
  const [currentSubNav, setCurrentSubNav] = useSessionStorageState('quest-tabs', {
    defaultValue: 0
  });

  const {
    user: { isAmbassador, isExactContributor },
  } = useModel("userInfo");
  const [
    tvFullScreenStatus,
    { setTrue: tvFullScreenTrue, setFalse: tvFullScreenFalse },
  ] = useBoolean(false);

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
                  fillRule="evenodd"
                  clipRule="evenodd"
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
    [setTrue]
  );

  const handleChartIdxChange = (e: any) => {
    setCurrentSubNav(0);
    setChartIdx(e);
  };

  // useEffect(() => {
  //   if (isAmbassador) {
  //     handleChartIdxChange(1);
  //   }
  // }, [isAmbassador]);

  return (
    <Container>
      <div className="view-port-chart">
        <div className="draggable-module-ctr row-between">
          <NavBar
            list={navList}
            currentIdx={chartIdx}
            onChange={handleChartIdxChange}
          />

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

          {chartIdx === NAVLIST.Level && (
            <div className="sub-nav sub-level-nav row">
              <div
                className="block"
                style={{ transform: `translate(${currentSubNav * 100}%, 0)` }}
              />
              {levelSubLevel?.map((i, index) => (
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
            <Level
              show={chartIdx === NAVLIST.Level}
              displayRole={currentSubNav ? ROLE.ambassador : ROLE.contributor}
            />
          </div>
        )}

        {chartIdx === NAVLIST.Quest &&
          (!isAmbassador && !isExactContributor ? (
            <div className="no-role">
              <img src={require('@/assets/nodata.png')} alt="" />
              <span>
                Go apply our Ambassador Program, Earn exculsive Rewards!
              </span>
              <Button onClick={()=>window.open('https://ambassador.teleport.network/', '_blank')}>Apply</Button>
            </div>
          ) : (
            <div className={`nav-detail-ctr nav-detail-ctr-left`}>
              {currentSubNav === 0 && (
                <CardTypeQuest
                  type="Monthly"
                  color="linear-gradient(90deg, #10CEC3 3.8%, #006B69 95.11%);"
                  label={questSubLevel[currentSubNav]}
                  show={chartIdx === NAVLIST.Quest}
                />
              )}
              {currentSubNav === 1 && (
                <CardTypeQuest
                  type="Storyline"
                  color="linear-gradient(90deg, #AA58B7 -6.84%, #580897 103.42%);"
                  label={questSubLevel[currentSubNav]}
                  show={chartIdx === NAVLIST.Quest}
                />
              )}
              {currentSubNav === 2 && (
                <Quest show={chartIdx === NAVLIST.Quest} />
              )}
            </div>
          ))}

        {chartIdx === NAVLIST.NFT && (
          <div className={`nav-detail-ctr nav-detail-ctr-left`}>
            <NFT show={chartIdx === NAVLIST.NFT} />
          </div>
        )}
      </div>

      <StyledModal visible={showLevelDialog} onClose={setFalse}>
        <div>
          <img
            style={{ paddingRight: "20px" }}
            onClick={tvFullScreenTrue}
            src={require("@/assets/level-progressive.jpeg")}
            alt=""
          />
        </div>
      </StyledModal>

      {tvFullScreenStatus && (
        <Portal>
          <FullScreen onClick={tvFullScreenFalse}>
            <img src={require("@/assets/level-progressive.jpeg")} alt="" />
          </FullScreen>
        </Portal>
      )}
    </Container>
  );
};
