import styled from "styled-components";
import tunnel from "@/assets/teleport-tunnel.svg";
import dragon from "@/assets/teleport-dragon.svg";
import AccountInfo from "@/components/AccountInfo";
import mask from "@/assets/home-mask.svg";
import einstein from "@/assets/dragons/einstein.png";
import explore from "@/assets/dragons/explore.png";
import galaxy from "@/assets/dragons/galaxy.png";
import guardians from "@/assets/dragons/guardians.png";
import psychedelic from "@/assets/dragons/psychedelic.png";
import QuestCard from "@/components/QuestCard";
import { useMemo, useState } from "react";
import HomeTabContainer from "@/components/HomeTabContainer";
import { useWeb3React } from "@web3-react/core";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { useModel } from "umi";
import { useRequest } from "ahooks";
import { getPublicQuestList, getQuestList } from "@/server";
import Loading from "../Loading";

// active: "N"
// assignTo: "contributor"
// assignTo_dictText: "contributor"
// createBy: null
// createTime: "2022-08-25 03:54:25"
// deadline: "2022-08-06 15:59:59"
// description: "<h2>Teleport Network</h2><h2> Content &amp; Marketing Task<br></h2><div style=\"font-size: 14px;text-align: center;\"><br></div><div style=\"font-size: 14px;text-align: center;\">Please complete below TASK</div><p><br></p><div style=\"font-size: 14px;text-align: center;\"><b>TIME: 8th, Jul - 8th, Agu, 2022(UTC)</b></div><p><br></p><div style=\"font-size: 14px;text-align: center;\"><i><div>Points will be added to your personal account after the task is completed</div></i></div>"
// fraudType: null
// gleamCreateAt: "2022-07-06 21:30:31"
// gradient: "linear-gradient(90deg, #4ABE91 0%, #F2D524 106.68%)"
// id: "9KN2l"
// image: "https://gleam-prod-user-assets.s3.amazonaws.com/user-assets/1956602/mcmuJUDrgwo19MLc/contributor-task.png"
// issueDate: "2022-07-09 01:00:00"
// questKey: "9KN2l"
// rewards: null
// src: "/static/galaxy.81453237.png"
// syncTime: "2022-08-25 03:54:25"
// sysOrgCode: null
// title: "Content & Marketing Task- Clv"
// type: "Monthly"
// type_dictText: "Monthly"
// updateBy: "admin"
// updateTime: "2022-09-02 00:05:18"
// url: "https://gleam.io/9KN2l/content-marketing-task-c"

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
];

const Container = styled.div`
  min-height: calc(100vh - 60px);
  background-image: url(${mask});
  background-size: contain;
  background-position: bottom;
  background-repeat: no-repeat;
  .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .user-container {
    position: relative;
    z-index: 2;
    padding: 70px 0;
    background: url(${tunnel});
    background-repeat: no-repeat;
    .status-container {
      margin: auto;
      max-width: 1440px;
      width: 100vw;
      height: 200px;
      background: rgba(18, 23, 21, 0.5);
      border: 1px solid rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(6px);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .teleport-dragon {
      position: absolute;
      top: 50%;
      transform: translateY(-60%);
      right: 30%;
      /* z-index: 1; */
    }
    .status-container {
      position: relative;
    }
  }
  .cards-container {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
    width: 100vw;
    overflow: hidden;
    margin-top: 134px;
    .card {
      width: calc(100% - 16px);
      box-sizing: border-box;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      /* padding: 20px 46px; */
      padding: 5.7% 13.2%;
      gap: 2px;
      background: rgba(0, 0, 0, 0.4);
      border-radius: 12px;
      font-weight: 500;
      /* font-size: 55%; */

      & div:nth-of-type(1) {
        font-size: 20px;
        line-height: 30px;
      }
      & div:nth-of-type(2) {
        font-size: 16px;
        line-height: 24px;
      }
    }

    .mySwiper {
      /* height: 850px; */
      padding: 0px 0 270px 0;
      margin-top: -110px;
      .swiper-slide {
        width: 370px;
        /* margin: 0 30px; */
      }

      .swiper-slide > div {
        transition: all linear 0.2s;
        filter: opacity(0.5);
        transform: translateY(0px);
      }

      .swiper-slide-prev,
      .swiper-slide-next,
      .swiper-slide-duplicate-prev,
      .swiper-slide-duplicate-next {
        & > div {
          /* top: 110px; */
          transform: translateY(110px);
          filter: opacity(0.8);
        }
      }
      .swiper-slide-active,
      .swiper-slide-duplicate-active {
        & > div {
          /* top: 110px; */
          transform: translateY(220px);
          filter: opacity(1);
        }
      }
    }
  }

  .h1 {
    font-family: "Dela Gothic One";
    font-style: normal;
    font-weight: 400;
    font-size: 60px;
    line-height: 80px;
    /* identical to box height, or 133% */

    text-transform: uppercase;
    position: relative;

    color: #ffffff;
    /* margin-bottom: 218px; */
    z-index: 1;
    &::after {
      content: "";
      position: absolute;

      width: 160px;
      height: 8px;
      left: 50%;
      top: 125px;
      transform: translate(-50%, 0%);

      background: #00ffe1;
      z-index: 1;
    }
  }
  .cards-wrap {
    /* margin-top: -220px; */
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    /* transform: perspective(1200px) rotateX(25deg); */
  }
`;

const Home = () => {
  const { account } = useWeb3React();
  const [questCardsOrder, setOrder]: any = useState(
    JSON.parse(JSON.stringify(questCard))
  );

  const {
    questModal: { questModalSetTrue, run: questModalRun },
  } = useModel("questModal");

  const handleClick = (
    i: {
      questKey: any;
      key: any;
      src: any;
      gradient: any;
      label: any;
      title: any;
      des: any;
    },
    index: number
  ) => {
    questModalRun({ questKey: i?.questKey, page: 0 });
    questModalSetTrue();
  };

  const { data, loading } = useRequest(getPublicQuestList);
  const popularQuest = useMemo(() => {
    if (!data?.data?.result?.records) return questCard;
    return questCard.map((i: any, index: any) => ({
      ...i,
      ...data?.data?.result?.records[index],
      status: data?.data?.result?.records[index] ? true : false,
    }));
  }, [data]);

  console.log(popularQuest);

  return (
    <Container>
      <section className="user-container">
        {!account && (
          <div className="teleport-dragon">
            <img src={dragon} />
          </div>
        )}

        <div className="status-container">
          <AccountInfo />
        </div>
      </section>

      <section style={{ marginTop: "84px", marginBottom: "250px" }}>
        <HomeTabContainer />
      </section>

      <section className="cards-container">
        <h1 className="h1">Popular quest</h1>
        <div className="row cards-wrap">
          <Swiper
            effect={"coverflow"}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: false,
            }}
            slidesPerView={3.4}
            loop
            slideToClickedSlide
            centeredSlides
            modules={[EffectCoverflow]}
            height={650}
            // autoHeight
            className="mySwiper"
          >
            {popularQuest?.map((i: any, index: number) => (
              <SwiperSlide
                key={i?.questKey}
                onClick={() => handleClick(i, index)}
              >
                <QuestCard
                  className="card-item"
                  key={i?.questKey}
                  src={i?.src}
                  gradient={i?.gradient}
                  label={i?.type}
                  title={i?.title}
                  des={i?.description}
                  valid={i?.status}
                  style={{
                    margin: "80px auto",
                  }}
                >
                  {i?.status ? (
                    <div className="card">
                      <div>quest Rewards</div>
                      <div>{i?.rewrds || 0} points</div>
                    </div>
                  ) : loading ? (
                    <div className="card">
                      <Loading />
                    </div>
                  ) : null}
                </QuestCard>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </Container>
  );
};

export default Home;
