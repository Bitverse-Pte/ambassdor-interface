import styled from "styled-components";
import { useMemo, useState } from "react";
import NavBar from "../Navbar";
import Level from "./Level";
import Quest from "./Quest";
import NFT from "./NFT";

const Container = styled.div`
  width: 100%;
  min-height: 1027px;
  padding: 0 92px;
  box-sizing: border-box;

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

export default () => {
  const [chartIdx, setChartIdx] = useState(NAVLIST.Level);
  const navList = useMemo(() => navs.map((item) => item), []);

  return (
    <Container>
      <div className="view-port-chart">
        <div className="draggable-module-ctr">
          <NavBar list={navList} currentIdx={chartIdx} onChange={setChartIdx} />
        </div>

        {chartIdx === NAVLIST.Level && (
          <div className={`nav-detail-ctr nav-detail-ctr-left`}>
            <Level show={chartIdx === NAVLIST.Level} />
          </div>
        )}

        {chartIdx === NAVLIST.Quest && (
          <div className={`nav-detail-ctr nav-detail-ctr-left`}>
            <Quest show={chartIdx === NAVLIST.Quest} />
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
