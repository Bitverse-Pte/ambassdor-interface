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

// import { Swiper, SwiperSlide } from "swiper/react";

// // Import Swiper styles
// import "swiper/css";
// import "swiper/css/pagination";



const questCard = [
  {
    src: einstein,
    gradient:
      "linear-gradient(90deg, #F95136 0%, #C54152 67.19%, #872E72 100%)",
    title: "Quest Title",
    des: "This is a description",
    label: "Hot",
    key: "einstein",
  },
  {
    src: guardians,
    gradient: "linear-gradient(92.04deg, #009EFD 0.04%, #12EFCF 126.57%)",
    title: "Quest Title2",
    des: "This is a description",
    label: "Hot",
    key: "guardians",
  },
  {
    src: psychedelic,
    gradient: "linear-gradient(90deg, #4ABE91 0%, #F2D524 106.68%)",
    title: "Quest Title3",
    des: "This is a description",
    label: "Hot",
    key: "psychedelic",
  },
  {
    src: galaxy,
    gradient: "linear-gradient(90deg, #4ABE91 0%, #F2D524 106.68%)",
    title: "Quest Title4",
    des: "This is a description",
    label: "Hot",
    key: "galaxy",
  },
  {
    src: explore,
    gradient: "linear-gradient(90deg, #4ABE91 0%, #F2D524 106.68%)",
    title: "Quest Title5",
    des: "This is a description",
    label: "Hot",
    key: "explore",
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
      font-size: 55%;
      /* font-size: 20px; */
      line-height: 30px;
    }
  }

  h1 {
    font-family: "Dela Gothic One";
    font-style: normal;
    font-weight: 400;
    font-size: 60px;
    line-height: 80px;
    /* identical to box height, or 133% */

    text-transform: uppercase;
    position: relative;

    color: #ffffff;
    margin-bottom: 218px;
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
    margin-top: 70px;
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
  console.log("questCardsOrder", questCardsOrder);

  const [active, setActive] = useState(2)
    
  const cardsTransform = useMemo(()=>{
    
  }, [active])

  const handleClick = (
    i: { key: any; src: any; gradient: any; label: any; title: any; des: any },
    index: number
  ) => {
    setActive(index)
    // console.log(i, index);
    // if (index === 2) return;
    // // x % 5 + 2 > 4 ? x % 5 + 2 - 5 : x % 5 + 2
    // setOrder((old: any[]) => {
    //   const _old = JSON.parse(JSON.stringify(old));
    //   const step = Math.abs(index - 2);

    //   const prev = _old.filter((i: any, _index: number) => _index < index);
    //   const last = _old.filter((i: any, _index: number) => _index > index);

    //   if (index < 2) {
    //     // plus
    //     return [...last, _old[index], ...prev];
    //   } else {
    //     // minus
    //     return [...prev, _old[index], ...last];
    //   }
    // });
  };

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

      <section style={{marginTop: '84px'}}>
        <HomeTabContainer />
      </section>

      <section className="cards-container">
        <h1>Popular quest</h1>
        <div className="row cards-wrap">
          {questCardsOrder?.map(
            (
              i: {
                key: any;
                src: any;
                gradient: any;
                label: any;
                title: any;
                des: any;
              },
              index: number
            ) => (
              <QuestCard
                onClick={() => handleClick(i, index)}
                className="card-item"
                key={i?.key}
                src={i.src}
                gradient={i.gradient}
                label={i.label}
                title={i.title}
                des={i.des}
                style={{
                  margin: "0 30px",
                  filter: `opacity(${1 / (Math.abs(index - 2) + 0.3)})`,
                  top: `${-1 *
                    Math.abs(index - 2) *
                    110}px`
                }}
              >
                <div className="card">
                  <div>quest Rewards</div>
                  <div>1000 points, cl1 NFT</div>
                </div>
              </QuestCard>
            )
          )}
        </div>
      </section>
    </Container>
  );
};

export default Home;
