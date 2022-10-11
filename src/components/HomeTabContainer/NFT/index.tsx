import { useBoolean, useRequest, useSessionStorageState } from "ahooks";
import styled, { css } from "styled-components";
import { useEffect, useMemo, useState } from "react";
import NavBar from "@/components/Navbar";
import Lock from "@/components/Icons/Lock";
import labelLeft from "@/assets/label-left.svg";
import labelRight from "@/assets/label-right.svg";
import { useModel } from "umi";
import { getUserNFT, getUserNftProgress } from "@/server";
import IconTopRightArrow from "@/components/Icons/IconTopRightArrow";
import IconExpandArrow from "@/components/Icons/IconExpandArrow";
import { fuzzAddress } from "@/utils";
import Progress from "@/components/Icons/Progress";

const IconLock = () => (
  <svg
    width="60"
    height="70"
    viewBox="0 0 60 70"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21 21C21 16.0294 25.0294 12 30 12C34.9706 12 39 16.0294 39 21V29H21V21Z"
      stroke="white"
      strokeWidth="6"
    />
    <mask id="path-2-inside-1_2304_23301" fill="white">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15 26C12.2386 26 10 28.2386 10 31V50C10 52.7614 12.2386 55 15 55H45C47.7614 55 50 52.7614 50 50V31C50 28.2386 47.7614 26 45 26H15ZM33 39C33 39.8836 32.5543 40.678 31.8451 41.227C31.9449 41.4648 32 41.726 32 42V45C32 46.1046 31.1046 47 30 47C28.8954 47 28 46.1046 28 45V42C28 41.9047 28.0067 41.811 28.0196 41.7192C26.8266 41.2412 26 40.2033 26 39C26 37.3431 27.567 36 29.5 36C31.433 36 33 37.3431 33 39Z"
      />
    </mask>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15 26C12.2386 26 10 28.2386 10 31V50C10 52.7614 12.2386 55 15 55H45C47.7614 55 50 52.7614 50 50V31C50 28.2386 47.7614 26 45 26H15ZM33 39C33 39.8836 32.5543 40.678 31.8451 41.227C31.9449 41.4648 32 41.726 32 42V45C32 46.1046 31.1046 47 30 47C28.8954 47 28 46.1046 28 45V42C28 41.9047 28.0067 41.811 28.0196 41.7192C26.8266 41.2412 26 40.2033 26 39C26 37.3431 27.567 36 29.5 36C31.433 36 33 37.3431 33 39Z"
      fill="white"
    />
    <path
      d="M31.8451 41.227L26.9479 34.9011L22.093 38.6595L24.4678 44.3213L31.8451 41.227ZM28.0196 41.7192L35.9418 42.8322L36.8139 36.6246L30.9951 34.2931L28.0196 41.7192ZM18 31C18 32.6569 16.6569 34 15 34V18C7.8203 18 2 23.8203 2 31H18ZM18 50V31H2V50H18ZM15 47C16.6569 47 18 48.3431 18 50H2C2 57.1797 7.8203 63 15 63V47ZM45 47H15V63H45V47ZM42 50C42 48.3431 43.3431 47 45 47V63C52.1797 63 58 57.1797 58 50H42ZM42 31V50H58V31H42ZM45 34C43.3431 34 42 32.6569 42 31H58C58 23.8203 52.1797 18 45 18V34ZM15 34H45V18H15V34ZM36.7424 47.5529C39.1069 45.7224 41 42.7169 41 39H25C25 37.0503 26.0018 35.6336 26.9479 34.9011L36.7424 47.5529ZM40 42C40 40.6446 39.7259 39.3329 39.2225 38.1327L24.4678 44.3213C24.1639 43.5968 24 42.8073 24 42H40ZM40 45V42H24V45H40ZM30 55C35.5228 55 40 50.5228 40 45H24C24 41.6863 26.6863 39 30 39V55ZM20 45C20 50.5228 24.4772 55 30 55V39C33.3137 39 36 41.6863 36 45H20ZM20 42V45H36V42H20ZM20.0974 40.6062C20.0328 41.0654 20 41.5311 20 42H36C36 42.2783 35.9805 42.5565 35.9418 42.8322L20.0974 40.6062ZM18 39C18 44.1338 21.4801 47.7172 25.0441 49.1453L30.9951 34.2931C32.173 34.7651 34 36.2729 34 39H18ZM29.5 28C24.3501 28 18 31.8123 18 39H34C34 40.8181 33.1206 42.1907 32.2315 42.9527C31.3592 43.7004 30.3685 44 29.5 44V28ZM41 39C41 31.8123 34.6499 28 29.5 28V44C28.6315 44 27.6408 43.7004 26.7685 42.9527C25.8794 42.1907 25 40.8181 25 39H41Z"
      fill="white"
      mask="url(#path-2-inside-1_2304_23301)"
    />
  </svg>
);

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
        filter: grayscale(1) brightness(0.5);
      `}
    width: 301px;
    height: 327px;
    /* margin-top: -141px; */
    margin-top: 44px;

    img {
      width: 100%;
      height: 100%;
    }
    & + .lock {
      z-index: 3;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -100%);
      svg {
        width: 67px;
        height: 77px;
      }
    }
    & + .processing {
      z-index: 3;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -125%);
      svg {
        margin-right: -23px;
        position: relative;
        z-index: 3;
      }

      span {
        margin-top: 4px;
        width: 176px;
        border-radius: 6px;
        display: inline-block;
        padding: 8px 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, 0.8);
        font-family: "Dela Gothic One";
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        text-align: center;
        text-transform: capitalize;
        color: #01ecca;
        transition: all linear 0.2s;
      }
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
    align-items: flex-start;
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
    (props?: any) => Promise.all([getUserNFT(props), getUserNftProgress()]),
    { manual: true }
  );

  useEffect(() => {
    if (show) {
      run();
    }
  }, [show]);

  const userNFT = useMemo(
    () => (data && data[0] ? data[0]?.data?.result?.records : []),
    [data]
  );

  const onProgress = useMemo(
    () =>
      data && data[1]
        ? data[1]?.data?.result?.records?.map((i) => i?.nftType)
        : [],
    [data]
  );

  const {
    user: { contributorNFT, ambassadorNFT, isAmbassador, isContributor },
  } = useModel("userInfo");

  // const [chartIdx, setChartIdx] = useState(NFT_NAV_LIST.Contributor);
  const [chartIdx, setChartIdx] = useSessionStorageState('secondary-tabs', {defaultValue: NFT_NAV_LIST.Contributor});
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

        {chartIdx === NFT_NAV_LIST.Contributor ? (
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
                      {onProgress?.includes(i?.level) ? (
                        <Progress>
                          <img
                            src={require(`@/assets/level/nft/${i?.name}.png`)}
                          />
                        </Progress>
                      ) : animated ? (
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
                        {userNFT?.length && userNFT[index]?.tokenId && userNFT[index]?.nftType?.startsWith('CLV') ? (
                          <>
                            <br />
                            <span
                              style={{
                                display: "inline-block",
                                marginTop: "8px",
                              }}
                            >
                              ID: #{userNFT[index]?.tokenId}
                            </span>
                          </>
                        ) : null}
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

                  {onProgress?.includes(activeNft?.level) ? (
                    <div className="row processing">
                      <IconLock />

                      <span>Processing</span>
                    </div>
                  ) : !activeNft?.unlocked ? (
                    <div className="lock">
                      <IconLock />
                    </div>
                  ) : null}

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
                              #{userNFT[active]?.tokenId} <IconTopRightArrow />{" "}
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
        ): null}

        {chartIdx === NFT_NAV_LIST.Ambassador ? (
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
                        {userNFT?.length && userNFT[index]?.tokenId && userNFT[index]?.nftType?.startsWith('ALV') ? (
                          <>
                            <br />
                            <span
                              style={{
                                display: "inline-block",
                                marginTop: "8px",
                              }}
                            >
                              ID: #{userNFT[index]?.tokenId}
                            </span>
                          </>
                        ) : null}
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

                  {onProgress?.includes(activeNft?.level) ? (
                    <div className="row processing">
                      <IconLock />

                      <span>Processing</span>
                    </div>
                  ) : !activeNft?.unlocked ? (
                    <div className="lock">
                      <IconLock />
                    </div>
                  ) : null}

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
                              #{userNFT[active]?.tokenId} <IconTopRightArrow />{" "}
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
        ): null}
      </div>
    </Container>
  );
};
