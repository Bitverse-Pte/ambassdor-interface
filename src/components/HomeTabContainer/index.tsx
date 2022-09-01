import styled from "styled-components";
import { useMemo, useState } from "react";
import NavBar from "../Navbar";
import Level from "./Level";
import Quest from "./Quest";
import NFT from "./NFT";
import CardTypeQuest from "./Quest/CardTypeQuest";

const Container = styled.div`
  width: 100%;
  /* min-height: 1027px; */
  padding: 0 92px;
  box-sizing: border-box;

  .row{
    display: flex;
    align-items: center;
  }

  .row-between{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .sub-nav{
    background: rgba(217, 217, 217, 0.1);
    border-radius: 16px;
    align-self: flex-end;
    position: relative;
    .block{
      background: #00ECC9;
      border-radius: 16px;
      width: 142px;
      height: 100%;
      position: absolute;
      top: 0%;
      left: 0%;
      transition: transform linear .2s;
    }

    &>div:not(.block){
      transition: all linear .2s;
      position: relative;
      z-index: 2;
      padding: 7px 0;
      width: 142px;
      font-weight: 500;
      font-size: 20px;
      line-height: 30px;
      text-align: center;
      text-transform: capitalize;
      color: #00EBC8;
      cursor: pointer;
      border-radius: 16px;
      &:hover{
        filter: opacity(.7);
      }
      &.active{
        color: #05050E;
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
  const navList = useMemo(() => navs.map((item) => item), []);

  const [currentSubNav, setCurrentSubNav] = useState(0)

  return (
    <Container>
      <div className="view-port-chart">
        <div className="draggable-module-ctr row-between">
          <NavBar list={navList} currentIdx={chartIdx} onChange={setChartIdx} />
          {
            chartIdx === NAVLIST.Quest && (<div className="sub-nav row">
              <div className="block" style={{transform: `translate(${currentSubNav * 100}%, 0)`}}/>
              {
                questSubLevel?.map((i, index)=>(
                  <div className={index === currentSubNav ? 'active': ''} onClick={()=>{setCurrentSubNav(index)}}>{i}</div>
                ))
              }
            </div>)
          }
        </div>

        {chartIdx === NAVLIST.Level && (
          <div className={`nav-detail-ctr nav-detail-ctr-left`}>
            <Level show={chartIdx === NAVLIST.Level} />
          </div>
        )}

        {chartIdx === NAVLIST.Quest && (
          <div className={`nav-detail-ctr nav-detail-ctr-left`}>
            {
              currentSubNav === 0 && (<CardTypeQuest color="linear-gradient(90deg, #10CEC3 3.8%, #006B69 95.11%);" label={questSubLevel[currentSubNav]} show={chartIdx === NAVLIST.Quest} />)
            }
            {
              currentSubNav === 1 && (<CardTypeQuest color="linear-gradient(90deg, #FFA826 -6.84%, #FF7A00 103.42%);" label={questSubLevel[currentSubNav]} show={chartIdx === NAVLIST.Quest} />)
            }
            {
              currentSubNav === 2 && (<Quest show={chartIdx === NAVLIST.Quest} />)
            }
            
          </div>
        )}

        {chartIdx === NAVLIST.NFT && (
          <div className={`nav-detail-ctr nav-detail-ctr-left`}>
            <NFT show={chartIdx === NAVLIST.NFT} />
          </div>
        )}
      </div>
    </Container>
  );
};
