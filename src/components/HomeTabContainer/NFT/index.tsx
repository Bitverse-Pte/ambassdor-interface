import { useRequest } from "ahooks";
import styled, { css } from "styled-components";
import axios from "axios";
import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactFragment,
  ReactPortal,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import NavBar from "@/components/Navbar";
import Lock from "@/components/Icons/Lock";
import Progress from "@/components/Progress";
import labelLeft from "@/assets/label-left.svg";
import labelRight from "@/assets/label-right.svg";
import Button from "@/components/Button";
import { useModel } from "umi";
import { getUserNFT } from "@/server";
import { uriToHttp } from "@/utils";

const mock = {
  data: [
    {
      id: 1,
      name: "CL1 xxxx",
      src: "@/assets/nfts/egg-dragon.png",
      unlocked: true,
      power: [
        {
          key: "STR",
          value: "1",
          max: "10",
        },
        {
          key: "CON",
          value: "8",
          max: "10",
        },
        {
          key: "DEX",
          value: "5",
          max: "10",
        },
        {
          key: "INT",
          value: "3",
          max: "10",
        },
        {
          key: "LUCK",
          value: "7",
          max: "10",
        },
      ],
    },
    {
      id: 2,
      name: "CL2 Era Starter",
      src: "@/assets/nfts/baby-dragon.png",
      unlocked: true,
      power: [
        {
          key: "STR",
          value: "3",
          max: "10",
        },
        {
          key: "CON",
          value: "1",
          max: "10",
        },
        {
          key: "DEX",
          value: "2",
          max: "10",
        },
        {
          key: "INT",
          value: "3",
          max: "10",
        },
        {
          key: "LUCK",
          value: "10",
          max: "10",
        },
      ],
    },
    {
      id: 3,
      name: "CL3 Order organizer",
      src: "@/assets/nfts/default.png",

      unlocked: false,
      power: [
        {
          key: "STR",
          value: "1",
          max: "10",
        },
        {
          key: "CON",
          value: "8",
          max: "10",
        },
        {
          key: "DEX",
          value: "5",
          max: "10",
        },
        {
          key: "INT",
          value: "3",
          max: "10",
        },
        {
          key: "LUCK",
          value: "7",
          max: "10",
        },
      ],
    },
    {
      id: 4,
      name: "CL3 Order organizer",
      src: "@/assets/nfts/default.png",

      unlocked: false,
      power: [
        {
          key: "STR",
          value: "1",
          max: "10",
        },
        {
          key: "CON",
          value: "8",
          max: "10",
        },
        {
          key: "DEX",
          value: "5",
          max: "10",
        },
        {
          key: "INT",
          value: "3",
          max: "10",
        },
        {
          key: "LUCK",
          value: "7",
          max: "10",
        },
      ],
    },
    {
      id: 5,
      name: "CL3 Order organizer",
      src: "@/assets/nfts/default.png",

      unlocked: false,
      power: [
        {
          key: "STR",
          value: "1",
          max: "10",
        },
        {
          key: "CON",
          value: "8",
          max: "10",
        },
        {
          key: "DEX",
          value: "5",
          max: "10",
        },
        {
          key: "INT",
          value: "3",
          max: "10",
        },
        {
          key: "LUCK",
          value: "7",
          max: "10",
        },
      ],
    },
    {
      id: 6,
      name: "CL3 Order organizer",
      src: "@/assets/nfts/default.png",

      unlocked: false,
      power: [
        {
          key: "STR",
          value: "1",
          max: "10",
        },
        {
          key: "CON",
          value: "8",
          max: "10",
        },
        {
          key: "DEX",
          value: "5",
          max: "10",
        },
        {
          key: "INT",
          value: "3",
          max: "10",
        },
        {
          key: "LUCK",
          value: "7",
          max: "10",
        },
      ],
    },
  ],
};

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

  img {
    background: #ffffff;
    /* border: 2px solid #000000; */
    border-radius: 12px;
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
    .x-nav-item {
      font-family: "Poppins";
      font-style: normal;
      font-weight: 500;
      font-size: 24px;
      line-height: 36px;
      flex: none;
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
    grid-template-columns: repeat(3, minmax(176px, max-content));
  }
`;

export enum NFT_NAV_LIST {
  "All",
  "Contributor",
  "Ambassador",
  "Special",
}

export const navs = ["All", "Contributor", "Ambassador", "Special"];

export default ({ show }: any) => {
  // getUserNFT

  const { run, data, loading } = useRequest((props)=>getUserNFT(props), {
    manual: true,
  });

  useEffect(() => {
    if (show) {
      run({pageSize: 6, pageNo: 1});
    }
  }, [show]);

  console.log('/jeecg-boot/am/profile/user-nft', data)
  const userNFT = useMemo(()=> data? data?.data?.result : [], [data])

  const {
    user: { user, curRoleNft, isAmbassador, isContributor },
  } = useModel("userInfo");

  console.log("curRoleNft", curRoleNft);

  const nfts = useMemo(() => {
    if (!curRoleNft) return [];
    return curRoleNft;
  }, [curRoleNft]);

  const [chartIdx, setChartIdx] = useState(NFT_NAV_LIST.All);
  const navList = useMemo(() => navs.map((item) => item), []);
  const [active, setActive] = useState(0);

  const activeNft = useMemo(() => {
    if (!nfts?.length) return null;
    return nfts[active];
  }, [active, nfts]);

  return (
    <Container>
      <div className="view-port-chart">
        <div className="draggable-module-ctr">
          <NavBar list={navList} currentIdx={chartIdx} onChange={setChartIdx} />
        </div>

        {chartIdx === NFT_NAV_LIST.All && (
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
                      {i?.unlocked ? (
                        <img
                          src={require(`@/assets/level/nft/${i?.name}.png`)}
                        />
                      ) : (
                        <Lock allowAnimation={false}>
                          <img
                            src={require(`@/assets/level/nft/${i?.name}.png`)}
                          />
                        </Lock>
                      )}

                      <div className="name">{i?.name}</div>
                    </NftCard>
                  ))
                : "This part of the task will be released at a specific time, stay tuned and look forward to it!"}
            </div>
            {activeNft ? (
              <div className="column">
                <NFTDetail disabled={!activeNft.unlocked}>
                  <div className="avatar">
                    <img src={require(`@/assets/level/nft/${nfts[active]?.name}.png`)} alt="" />
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
              </div>
            ) : null}
          </div>
        )}

        {chartIdx === NFT_NAV_LIST.Contributor && (
          <div className={`nav-detail-ctr nav-detail-ctr-left`}>
            Contributor
          </div>
        )}

        {chartIdx === NFT_NAV_LIST.Ambassador && (
          <div className={`nav-detail-ctr nav-detail-ctr-left`}>Ambassador</div>
        )}

        {chartIdx === NFT_NAV_LIST.Special && (
          <div className={`nav-detail-ctr nav-detail-ctr-left`}>Special</div>
        )}
      </div>
    </Container>
  );
};
