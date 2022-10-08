import { useBoolean, useRequest, useSessionStorageState } from "ahooks";
import styled, { css } from "styled-components";
import { useEffect, useMemo, useState } from "react";
import NavBar from "@/components/Navbar";
import Lock from "@/components/Icons/Lock";
import labelLeft from "@/assets/label-left.svg";
import labelRight from "@/assets/label-right.svg";
import { useModel } from "umi";
import { getUserNFT } from "@/server";
import { IconDropdown } from "react-day-picker";
import IconTopRightArrow from "@/components/Icons/IconTopRightArrow";
import IconExpandArrow from "@/components/Icons/IconExpandArrow";
import { fuzzAddress } from "@/utils";

const NFTDetail = styled.div<{ disabled?: boolean }>`
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.075) 0%,
    rgba(255, 255, 255, 0.0225) 100%
  );
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  box-sizing: border-box;
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .avatar {
    transition: filter linear 0.2s;
    ${({ disabled }) =>
      disabled &&
      css`
        filter: grayscale(1);
      `}
    width: 301px;
    height: 327px;
    /* margin-top: -141px; */
    margin-top: 44px;

    img {
      width: 100%;
      height: 100%;
    }
  }
  .label {
    width: 100%;
    /* margin-bottom: 42px; */
    margin-bottom: 80px;
    .left {
      width: 396px;
      height: 34px;
      line-height: 34px;
      background: url(${labelLeft}) no-repeat;
      background-position: left;
      margin-bottom: -10px;
      padding-left: 36px;
      font-weight: 400;
      font-size: 16px;
      font-family: "Dela Gothic One";
      color: #fff;
    }
    .right {
      width: 277.5px;
      height: 34px;
      background: url(${labelRight}) no-repeat;
      background-position: right;
      /* opacity: 0.2; */
      margin: 0 0 0 auto;
      /* transform: matrix(-1, 0, 0, 1, 0, 0); */
    }
  }
  .desc-container {
    box-sizing: border-box;
    padding: 0 50px 66px;
    width: 100%;
    .row {
      display: flex;
      align-items: center;
      margin-bottom: 16px;
      & > div:nth-of-type(1) {
        width: 45px;
        text-align: left;
        font-weight: 600;
        font-size: 16px;
        line-height: 24px;
        color: #ffffff;
      }
      & > div:nth-of-type(2) {
        flex: 1;
      }
      & > div:nth-of-type(3) {
        width: 20px;
        text-align: right;
        font-weight: 500;
        font-size: 14px;
        line-height: 21px;
        color: #ffffff;
        opacity: 0.6;
      }
    }
  }
`;

const NftCard = styled.div<{ unlocked?: boolean }>`
  /* filter: grayscale(${({ unlocked }) => (!unlocked ? 1 : 0)}); */
  transition: all linear 0.2s;

  & > div:first-of-type{
    background: #FFFFFF;
    border: 2px solid #000000;
    border-radius: 12px;
    padding: 1px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 178px;
    height: 178px;
    transition: all linear .1s;
    &:hover{
      box-shadow: 0px 0px 30px rgba(0, 235, 200, 0.5);
    }
  }


  img {
    background: #ffffff;
    /* border: 2px solid #000000; */
    border-radius: 10px;
    transition: all linear 0.2s;
    width: 176px;
  }
  .name {
    margin-top: 14px;
    text-align: center;
    transition: all linear 0.2s;
  }

  ${({ unlocked }) =>
    unlocked &&
    css`
      &.active,
      &:hover {
        .name {
          color: #00ebc8;
        }
        img {
          box-shadow: 0px 0px 30px rgba(0, 235, 200, 0.5);
        }
      }
    `}
`;

const Container = styled.div`
  padding: 59px 56px 81px;
  background: rgba(217, 217, 217, 0.1);
  border-radius: 20px;
  width: 100%;
  /* height: 863px; */
  box-sizing: border-box;
  margin-top: 52px;

  .claim-button.primary.md {
    margin: 39px auto auto;
    width: 333px;
    font-weight: 600;
    font-size: 20px;
    line-height: 30px;
  }

  .column {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .grid {
    display: grid;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 100px;
    grid-template-columns: 1fr 1fr;
  }

  .x-nav-bar {
    height: auto;
    margin-bottom: 65px;
    padding: 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    width: 627px;
    .x-nav-item {
      font-family: "Poppins";
      font-style: normal;
      font-weight: 500;
      font-size: 24px;
      line-height: 44px;
      padding: 0px 0 10px;
      margin-right: 50px;
      flex: none;
      &.x-nav-item-active {
        position: relative;
        &::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translate(-50%, 0);
          width: 10px;
          height: 3px;
          background: #ffffff;
          border-radius: 39px;
        }
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
  .nft-container {
    display: grid;
    justify-content: flex-start;
    align-items: center;
    gap: 25px;
    grid-template-columns: repeat(3, minmax(182px, max-content));
  }

  .nft-detail {
    padding: 16px 24px;
    width: 388px;
    margin: auto;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.075) 0%,
      rgba(255, 255, 255, 0.0225) 100%
    );
    box-sizing: border-box;
    border-radius: 0px 0px 12px 12px;
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-top: none;
    max-height: 60px;
    overflow: hidden;
    transition: all linear 0.2s;
    &.active {
      max-height: 152px;
    }
    .detail-btn {
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      margin-bottom: 8px;
      span {
        color: rgba(255, 255, 255, 0.5);
      }
      svg {
        cursor: pointer;
        transition: all linear 0.2s;
      }
      &.active svg {
        transform: rotate(180deg);
      }
    }
    .col {
      opacity: 0;
      transition: all linear 0.2s;
      &.active {
        opacity: 1;
      }
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      .row {
        margin-bottom: 4px;
        a {
          color: #fff;
          /* text-decoration: none; */
        }
      }
    }
  }
`;

export enum NFT_NAV_LIST {
  "Contributor",
  "Ambassador",
}

export const navs = ["Contributor", "Ambassador"];

export default ({ show }: any) => {
  const { run, data, loading } = useRequest(
    (props?: any) => getUserNFT(props),
    {
      manual: true,
    }
  );

  useEffect(() => {
    if (show) {
      run();
    }
  }, [show]);

  const userNFT = useMemo(() => (data ? data?.data?.result?.records : []), [
    data,
  ]);

  // useEffect(()=>{
  //   if(data){
  //     setActivedNfts(data?.data?.result?.records)
  //   }
  // }, [data])

  const {
    user: { contributorNFT, ambassadorNFT, isAmbassador, isContributor },
  } = useModel("userInfo");

  const [chartIdx, setChartIdx] = useState(NFT_NAV_LIST.Contributor);
  const navList = useMemo(() => navs.map((item) => ({ item })), []);
  const [active, setActive] = useState(0);
  const [animated, setFalse] = useSessionStorageState("animated", {
    defaultValue: 0,
  });
  const [showDetail, { toggle: toggleShowDetail }] = useBoolean(false);

  const nfts = useMemo(() => {
    if (chartIdx === NFT_NAV_LIST.Contributor) {
      if (!userNFT || !userNFT?.length || isAmbassador) return contributorNFT;
      if (isContributor) {
        return contributorNFT?.map((i, index) => ({
          ...i,
          ...userNFT[index],
          unlocked: userNFT[index] ? true : false,
        }));
      }
      return contributorNFT;
      // if (isAmbassador) {
      //   return contributorNFT?.map((i, index) => ({
      //     ...i,
      //     ...userNFT[index],
      //     unlocked: true,
      //   }));
      // }
    }

    if (chartIdx === NFT_NAV_LIST.Ambassador) {
      if (!userNFT || !userNFT?.length || isContributor) return ambassadorNFT;
      return ambassadorNFT?.map((i, index) => ({
        ...i,
        ...userNFT[index],
        unlocked: userNFT[index] ? true : false,
      }));
    }
  }, [contributorNFT, ambassadorNFT, userNFT, chartIdx]);

  const activeNft = useMemo(() => {
    if (!nfts?.length) return null;
    return nfts[active];
  }, [active, nfts]);

  const handleClickChartIndex = (e: any) => {
    setActive(0);
    setChartIdx(e);
  };

  return (
    <Container>
      <div className="view-port-chart">
        <div className="draggable-module-ctr">
          <NavBar
            list={navList}
            currentIdx={chartIdx}
            onChange={handleClickChartIndex}
          />
        </div>

        {chartIdx === NFT_NAV_LIST.Contributor && (
          <div className="grid">
            <div className={`nav-detail-ctr nav-detail-ctr-left nft-container`}>
              {nfts?.length
                ? nfts?.map((i, index) => (
                    <NftCard
                      onClick={() => {
                        setActive(index);
                      }}
                      unlocked={i?.unlocked}
                      key={i?.name}
                    >
                      {animated ? (
                        <Lock
                          allowAnimation={false}
                          autoPlay={false}
                          skipAnimationForceUnlocked={i?.unlocked}
                        >
                          <img
                            src={require(`@/assets/level/nft/${i?.name}.png`)}
                          />
                        </Lock>
                      ) : (
                        <Lock
                          allowAnimation={false}
                          delay={index * 100}
                          autoPlay={!animated && i?.unlocked}
                          onAnimationEnd={() => {
                            setFalse(1);
                          }}
                        >
                          <img
                            src={require(`@/assets/level/nft/${i?.name}.png`)}
                          />
                        </Lock>
                      )}

                      <div className="name">
                        {i?.name} <br />{" "}
                        <span
                          style={{ display: "inline-block", marginTop: "8px" }}
                        >
                          {i?.level}
                        </span>
                      </div>
                    </NftCard>
                  ))
                : "This part of the task will be released at a specific time, stay tuned and look forward to it!"}
            </div>
            {activeNft ? (
              <div className="column">
                <NFTDetail disabled={!activeNft?.unlocked}>
                  <div className="avatar">
                    <img
                      src={require(`@/assets/level/nft/${nfts[active]?.name}.png`)}
                      alt=""
                    />
                  </div>
                  <div className="label">
                    <div className="left">{activeNft.name}</div>
                    <div className="right" />
                  </div>
                  {/* <div className="desc-container">
                    {activeNft?.power?.length &&
                      activeNft?.power.map((i) => (
                        <div className="row" key={i.key}>
                          <div className="power-name">{i.key}</div>
                          <div className="power-bar">
                            <Progress
                              duration="1s"
                              precent={(Number(i.value) / Number(i.max)) * 100}
                            />
                          </div>
                          <div className="power-value">{i.value}</div>
                        </div>
                      ))}
                  </div> */}
                </NFTDetail>
                {/* <Button disabled={!activeNft.unlocked} className="claim-button">
                  Claim
                </Button> */}
                {userNFT &&
                userNFT[active] &&
                userNFT[active]?.nftType.startsWith("CLV") ? (
                  <div className={`nft-detail ${showDetail ? "active" : ""}`}>
                    <div
                      className={`row detail-btn ${showDetail ? "active" : ""}`}
                    >
                      <span>Detail</span>
                      <IconExpandArrow onClick={toggleShowDetail} />
                    </div>
                    <div className={`col ${showDetail ? "active" : ""}`}>
                      {userNFT[active]?.tokenId ? (
                        <div className="row">
                          <span>Token ID:</span>
                          <a href={userNFT[active]?.url} target="_blank">
                            <span>
                              {userNFT[active]?.tokenId} <IconTopRightArrow />{" "}
                            </span>
                          </a>
                        </div>
                      ) : null}

                      <div className="row">
                        <span>Contract Address:</span>
                        <a
                          href={
                            userNFT[active]?.url?.split("/tx")[0] +
                            "/address/" +
                            userNFT[active]?.address
                          }
                          target="_blank"
                        >
                          <span>
                            {fuzzAddress(userNFT[active]?.address)}{" "}
                            <IconTopRightArrow />{" "}
                          </span>
                        </a>
                      </div>
                      <div className="row">
                        <span>Token Standard:</span>
                        <span>ERC-721</span>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        )}

        {chartIdx === NFT_NAV_LIST.Ambassador && (
          <div className="grid">
            <div className={`nav-detail-ctr nav-detail-ctr-left nft-container`}>
              {nfts?.length
                ? nfts?.map((i, index) => (
                    <NftCard
                      onClick={() => {
                        setActive(index);
                      }}
                      unlocked={i?.unlocked || false}
                      key={i?.name}
                    >
                      <Lock
                        allowAnimation={false}
                        delay={index * 100}
                        autoPlay={i?.unlocked}
                      >
                        <img
                          src={require(`@/assets/level/nft/${i?.name}.png`)}
                        />
                      </Lock>

                      <div className="name">
                        {i?.name} <br />{" "}
                        <span
                          style={{ display: "inline-block", marginTop: "8px" }}
                        >
                          {i?.level}
                        </span>
                      </div>
                    </NftCard>
                  ))
                : "This part of the task will be released at a specific time, stay tuned and look forward to it!"}
            </div>
            {activeNft ? (
              <div className="column">
                <NFTDetail disabled={!activeNft?.unlocked}>
                  <div className="avatar">
                    <img
                      src={require(`@/assets/level/nft/${nfts[active]?.name}.png`)}
                      alt=""
                    />
                  </div>
                  <div className="label">
                    <div className="left">{activeNft.name}</div>
                    <div className="right" />
                  </div>
                  {/* <div className="desc-container">
                    {activeNft?.power?.length &&
                      activeNft?.power.map((i) => (
                        <div className="row" key={i.key}>
                          <div className="power-name">{i.key}</div>
                          <div className="power-bar">
                            <Progress
                              duration="1s"
                              precent={(Number(i.value) / Number(i.max)) * 100}
                            />
                          </div>
                          <div className="power-value">{i.value}</div>
                        </div>
                      ))}
                  </div> */}
                </NFTDetail>
                {/* <Button disabled={!activeNft.unlocked} className="claim-button">
                  Claim
                </Button> */}
                {userNFT &&
                userNFT[active] &&
                userNFT[active]?.nftType.startsWith("ALV") ? (
                  <div className={`nft-detail ${showDetail ? "active" : ""}`}>
                    <div
                      className={`row detail-btn ${showDetail ? "active" : ""}`}
                    >
                      <span>Detail</span>
                      <IconExpandArrow onClick={toggleShowDetail} />
                    </div>
                    <div className={`col ${showDetail ? "active" : ""}`}>
                      {userNFT[active]?.tokenId ? (
                        <div className="row">
                          <span>Token ID:</span>
                          <a href={userNFT[active]?.url} target="_blank">
                            <span>
                              {userNFT[active]?.tokenId} <IconTopRightArrow />{" "}
                            </span>
                          </a>
                        </div>
                      ) : null}

                      <div className="row">
                        <span>Contract Address:</span>
                        <a
                          href={
                            userNFT[active]?.url?.split("/tx")[0] +
                            "/address/" +
                            userNFT[active]?.address
                          }
                          target="_blank"
                        >
                          <span>
                            {fuzzAddress(userNFT[active]?.address)}{" "}
                            <IconTopRightArrow />{" "}
                          </span>
                        </a>
                      </div>
                      <div className="row">
                        <span>Token Standard:</span>
                        <span>ERC-721</span>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        )}
      </div>
    </Container>
  );
};
