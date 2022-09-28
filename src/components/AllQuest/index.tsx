import { getAllPublicQuestList, getPublicQuestList } from "@/server";
import { useRequest } from "ahooks";
import { useEffect, useMemo, useState } from "react";
import ReactPaginate from "react-paginate";
import styled from "styled-components";
import Button from "../Button";
import Loading from "../Loading";
import bg from "@/assets/quest/bg.svg";
import QuestCard from "../QuestCard";
import mask from "@/assets/home-mask.svg";

import einstein from "@/assets/dragons/einstein.png";
import explore from "@/assets/dragons/explore.png";
import galaxy from "@/assets/dragons/galaxy.png";
import guardians from "@/assets/dragons/guardians.png";
import psychedelic from "@/assets/dragons/psychedelic.png";
import { useModel } from "umi";
import CardTypeQuest from "../HomeTabContainer/Quest/CardTypeQuest";
import Tippy from "@tippyjs/react";
import { format } from "@/utils";

const removeHtmlStyle = (html: string) =>
  html.replaceAll(/style="[^\"]*?"/g, "");

const questCard = [
  {
    status: false,
    title: "-",
    des: "-",
    label: "-",
    src: einstein,
    gradient:
      "linear-gradient(90deg, #F95136 0%, #C54152 67.19%, #872E72 100%)",
  },
  {
    status: false,
    title: "-",
    des: "-",
    label: "-",
    src: guardians,
    gradient: "linear-gradient(92.04deg, #009EFD 0.04%, #12EFCF 126.57%)",
  },
  {
    status: false,
    title: "-",
    des: "-",
    label: "-",
    src: psychedelic,
    gradient: "linear-gradient(90deg, #4ABE91 0%, #F2D524 106.68%)",
  },
  {
    status: false,
    title: "-",
    des: "-",
    label: "-",
    src: galaxy,
    gradient: "linear-gradient(90deg, #4ABE91 0%, #F2D524 106.68%)",
  },
  {
    status: false,
    title: "-",
    des: "-",
    label: "-",
    src: explore,
    gradient: "linear-gradient(90deg, #4ABE91 0%, #F2D524 106.68%)",
  },
  {
    status: false,
    title: "-",
    des: "-",
    label: "-",
    src: einstein,
    gradient:
      "linear-gradient(90deg, #F95136 0%, #C54152 67.19%, #872E72 100%)",
  },
  {
    status: false,
    title: "-",
    des: "-",
    label: "-",
    src: guardians,
    gradient: "linear-gradient(92.04deg, #009EFD 0.04%, #12EFCF 126.57%)",
  },
  {
    status: false,
    title: "-",
    des: "-",
    label: "-",
    src: psychedelic,
    gradient: "linear-gradient(90deg, #4ABE91 0%, #F2D524 106.68%)",
  },
  {
    status: false,
    title: "-",
    des: "-",
    label: "-",
    src: galaxy,
    gradient: "linear-gradient(90deg, #4ABE91 0%, #F2D524 106.68%)",
  },
];

const Card = styled.div<{ backgroundColor?: string; active?: boolean }>`
  /* filter: grayscale(${({ active }) => (active ? 0 : 1)}); */
  /* #71757A */
  background: ${({ backgroundColor, active }) =>
    active ? backgroundColor : "#71757A"};
  aspect-ratio: 425/224;
  border-radius: 12px;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
  cursor: pointer;

  .col {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  .row-between {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .vertical-divider {
    width: 1px;
    height: 30px;
    background: #ffffff;
    opacity: 0.2;
    border-radius: 32px;
    margin: 0 34px;
  }

  .top {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    flex: 1;
    padding: 0 30px;
    box-sizing: border-box;
    .left {
      font-weight: 500;
      /* font-size: 20px; */
      line-height: 30px;
      font-size: 110%;
    }
    .col {
      font-weight: 500;
      /* font-size: 16px; */
      line-height: 24px;
      font-size: 90%;
    }
  }
  .divider {
    width: 100%;
    height: 4px;
    background: #05050e;
    padding: 2px 0 0 0;
    box-sizing: border-box;
    .line {
      width: 44%;
      height: 2px;
      background: ${({ backgroundColor, active }) =>
        active ? backgroundColor : "#71757A"};
    }
  }
  .bottom {
    width: 100%;
    height: 38%;
    background: linear-gradient(
        0deg,
        rgba(255, 255, 255, 0.1),
        rgba(255, 255, 255, 0.1)
      ),
      #0a0a13;
    padding: 0 24px;
    box-sizing: border-box;
    .title {
      /* width: 112px; */
      overflow: hidden; //超出的文本隐藏
      text-overflow: ellipsis; //溢出用省略号显示
      white-space: nowrap; //溢出不换行
    }
    .desc {
      height: 24px;
      width: 158px;
      overflow: hidden; //超出的文本隐藏
      text-overflow: ellipsis; //溢出用省略号显示
      white-space: nowrap; //溢出不换行
      color: rgba(255, 255, 255, 0.5);
      margin-top: 3px;
      font-size: 80%;
      font-size: 16px;
      & * {
        line-height: 24px;
        width: 158px;
        overflow: hidden; //超出的文本隐藏
        text-overflow: ellipsis; //溢出用省略号显示
        white-space: nowrap; //溢出不换行
      }
    }
    .label {
      background: #ffffff;
      border: 1px solid #ffffff;
      border-radius: 6px;
      padding: 0 12px;
      color: #05050e;
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      font-family: "Dela Gothic One";
    }
  }
`;

const Container = styled.div`
  min-width: 1440px;
  min-height: calc(100vh - 60px);
  background-image: url(${mask});
  background-size: contain;
  background-position: bottom;
  background-repeat: no-repeat;
  .banner {
    display: flex;
    align-items: center;
    background: url(${bg}), linear-gradient(180deg, #001b5c 0%, #001f1f 100%);
    height: 600px;
    width: 100%;
    padding: 126px 80px 144px;
    box-sizing: border-box;
    min-width: 1440px;
    background-repeat: no-repeat;
    background-size: cover;

    .left {
      img {
        position: absolute;
        transform: translate(0%, -10%);
        right: 0;
      }
      /* margin: auto; */
      width: 1440px;
      margin: auto;
      position: relative;
      display: flex;
      flex-direction: column;
      .title {
        font-weight: 800;
        font-size: 68px;
        line-height: 80px;
        color: #ffffff;
      }
      .desc {
        font-weight: 400;
        font-size: 30px;
        line-height: 40px;
        letter-spacing: 0.02em;
        color: #33eec1;
        margin-top: 20px;
        margin-bottom: 60px;
      }
      button.primary.md {
        border-radius: 60px;
        width: 224px;
        height: 50px;
      }
    }
  }
  .content {
    width: 1440px;
    margin: 56px auto auto;
    padding: 72px 80px;
    box-sizing: border-box;
  }
  .tabs {
    display: flex;
    align-items: center;
    padding-bottom: 24px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.4);
    gap: 40px;

    div {
      cursor: pointer;
      color: #b1b1b1;
      transition: all linear 0.2s;
      font-weight: 500;
      font-size: 20px;
      line-height: 30px;
      &.active,
      &:hover {
        color: #fff;
      }
    }
  }
  .cards {
    padding: 110px 44px 0;
  }
  .loader {
    padding: 0 0 110px;
  }
  .card-wrapper {
    display: grid;
    grid-gap: 100px 70px;
    justify-content: flex-start;
    grid-template-columns: repeat(
      auto-fit,
      min(370px, calc(100% / 3 - 27px * 2))
    );
    & > div.card-item {
      height: 415px;
    }
  }

  .pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    margin-top: 114px;

    li {
      background: rgba(255, 255, 255, 0.3);
      border-radius: 4px;
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      a {
        color: #fff;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    .selected {
      background: #00c6a9;
    }
    .disabled {
      filter: opacity(0.5);
    }
  }
  .inner {
    display: flex;
    flex-direction: column;
    .label {
      margin-top: 0;
    }
    .p .f-20 {
      overflow: hidden; //超出的文本隐藏
      text-overflow: ellipsis; //溢出用省略号显示
      white-space: nowrap; //溢出不换行
      margin-right: 12px;
    }
    .insert {
      flex: 1;
      background: rgba(0, 0, 0, 0.4);
      border-radius: 12px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: calc(100% - 16px);
      margin: auto auto 0;
      max-height: 96px;
      .card {
        div {
          text-align: center;
        }
        div:nth-of-type(1) {
          font-weight: 500;
          font-size: 20px;
          line-height: 30px;
        }
        div:nth-of-type(2) {
          margin-top: 2px;
          font-weight: 500;
          font-size: 16px;
          line-height: 24px;
        }
      }
    }
  }
`;

const AllQuest = () => {
  const tabs = ["All", "Popular quest", "Monthly", "Storyline"];
  const [activeIndex, setActiveIndex] = useState(0);
  const [curParam, setParam] = useState({});

  const { data, loading, run } = useRequest(getAllPublicQuestList, {
    manual: true,
  });

  useEffect(() => {
    run({
      ...curParam,
    });
  }, [curParam]);

  const records = useMemo(() => data?.data?.result?.records, [data]);
  const totalPage = useMemo(() => data?.data?.result?.pages, [data]);

  const handlePageClick = (event: any) => {
    run({ ...curParam, pageNo: event?.selected + 1, pageSize: 9 });
  };

  const popularQuest = useMemo(() => {
    if (!data?.data?.result?.records) return questCard;
    return questCard
      .map((i: any, index: any) => ({
        ...i,
        ...data?.data?.result?.records[index],
        status: data?.data?.result?.records[index] ? true : false,
      }))
      .filter((i) => i?.status);
  }, [data]);

  const {
    questModal: { questModalSetTrue, run: questModalRun },
  } = useModel("questModal");

  const handleClick = (i: any) => {
    questModalRun({ questKey: i?.questKey });
    questModalSetTrue();
  };

  const handleIndexClick = (index: number) => {
    setActiveIndex(index);
    if (index === 0) {
      setParam({});
      return;
    }
    if (index === 1) {
      setParam({
        pageSize: 9,
        pageNo: 1,
        active: "Y",
      });
      return;
    }
    if (index === 2) {
      setParam({
        pageSize: 9,
        pageNo: 1,
        type: "Monthly",
      });
      return;
    }
    if (index === 3) {
      setParam({
        pageSize: 9,
        pageNo: 1,
        type: "Storyline",
      });
      return;
    }
  };

  return (
    <Container>
      <div className="banner">
        <div className="left">
          <img src={require("@/assets/quest/dragon.png")} />

          <div className="title" style={{marginBottom: '16px', width: '60%'}}>
            Complete quests and earn Tokens & NFT rewards
          </div>
          {/* <div className="desc">Complete tasks and earn Tokens & NFT rewards</div> */}
          <Button
            onClick={() =>
              window.open(
                "https://gleam.io/competitions/HlwYN-clv1-task",
                "_blank"
              )
            }
          >
            Apply
          </Button>
        </div>
      </div>
      <div className="content">
        <div className="tabs">
          {tabs?.map((i, index) => (
            <div
              className={activeIndex === index ? "active" : ""}
              onClick={() => {
                handleIndexClick(index);
              }}
              key={i}
            >
              {i}
            </div>
          ))}
        </div>
        <div className="cards">
          {!loading ? (
            <div className="card-wrapper">
              {records?.length ? (
                activeIndex === 2 || activeIndex === 3 ? (
                  popularQuest?.map((i) => (
                    <Card
                      active={i?.active === "Y"}
                      key={i?.id}
                      backgroundColor={
                        activeIndex === 2
                          ? "linear-gradient(90deg, #10CEC3 3.8%, #006B69 95.11%);"
                          : "linear-gradient(90deg, #AA58B7 -6.84%, #580897 103.42%);"
                      }
                      onClick={() => handleClick(i)}
                    >
                      <div className="top">
                        <div className="left">Quest Rewards</div>
                        <div className="vertical-divider" />
                        <div className="col">
                          <div>{format(i?.rewards || 0)} Points</div>
                          <div>cl1 NFT</div>
                        </div>
                      </div>
                      <div className="divider">
                        <div className="line" />
                      </div>
                      <div className="bottom row-between">
                        <div className="col title" style={{flex: 1}}>
                          <Tippy content={i?.title}>
                            <div className="title">{i?.title}</div>
                          </Tippy>
                          <Tippy
                            content={
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: removeHtmlStyle(i?.description),
                                }}
                              />
                            }
                          >
                            <div className="desc">
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: removeHtmlStyle(i?.description),
                                }}
                              />
                            </div>
                          </Tippy>
                        </div>
                        <div className="label">
                          {i?.active === "N" ? "EXPIRED" : i?.type}
                        </div>
                      </div>
                    </Card>
                  ))
                ) : (
                  popularQuest?.map((i) => (
                    <QuestCard
                      onClick={() => {
                        handleClick(i);
                      }}
                      className="card-item"
                      key={i?.questKey}
                      src={i?.src}
                      gradient={i?.gradient}
                      label={i?.active === "N" ? "EXPIRED" : i?.type}
                      title={i?.title}
                      des={i?.description}
                      valid={i?.status}
                    >
                      {i?.status ? (
                        <div className="card">
                          <div>quest Rewards</div>
                          <div>{format(i?.rewrds || 0)} points</div>
                        </div>
                      ) : loading ? (
                        <div className="card">
                          <Loading />
                        </div>
                      ) : null}
                    </QuestCard>
                  ))
                )
              ) : (
                <div>null</div>
              )}
            </div>
          ) : (
            <Loading />
          )}
        </div>
        {totalPage ? (
          <ReactPaginate
            className="pagination"
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            pageCount={totalPage}
            previousLabel="<"
          />
        ) : null}
      </div>
    </Container>
  );
};

export default AllQuest;
