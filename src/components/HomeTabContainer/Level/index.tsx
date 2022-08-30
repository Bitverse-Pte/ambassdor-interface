import styled from "styled-components";
import Meteor from "@/components/Icons/Meteor";
import dragonEgg from "@/assets/level/teleport-dragon-egg.png";
import StoryLine from "./StoryLine";
import Timeline from "@/components/Timeline";
import mountain from "@/assets/level/mountain.png";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper";
import Lock from "@/components/Icons/Lock";
import { useModel } from "umi";
import { useMemo } from "react";

const Container = styled.div`
  max-width: 1400px;
  width: 100%;
  margin: auto;
  .desc {
    margin-bottom: 30px;
  }
  .row-between {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .column {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .left {
    padding: 177px 0 170px;
    margin-bottom: 16px;
    flex: 3;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url(${mountain});
    background-position: center;
    background-size: auto;
    background-repeat: no-repeat;
    position: relative;
    overflow: hidden;
    &:after {
      position: absolute;
      content: "";
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      box-shadow: 0 0 120px 60px #05050e inset;
    }
    .shadow {
      position: absolute;
      width: 465.6px;
      height: 395.99px;
      background: #59c3aa;
      opacity: 0.4;
      filter: blur(200px);
      transform: translate(-15%, -20%) rotate(-11.42deg);
      & ~ div {
        border: 2px solid #05050e;
        border-radius: 21px;
        overflow: hidden;
      }
    }
  }
  .right {
    flex: 2;
  }
  .swiper-button-next,
  .swiper-button-prev {
    background: #05050e;
    width: 112px;
    height: 112px;
    border-radius: 50%;
    color: #fff;
  }

  .swiper-button-next {
    box-shadow: -5px -5px 20px -6px #ffbe83, -5px 5px 20px -6px #064cff,
      5px 5px 20px -6px #599cff, 5px -5px 20px -6px #59c3aa;
      margin-right: 10px;
  }

  .swiper-button-prev {
    box-shadow: 5px -5px 20px -6px #ffbe83, 5px 5px 20px -6px #064cff,
      -5px 5px 20px -6px #599cff, -5px -5px 20px -6px #59c3aa;
      margin-left: 10px;
  }
`;

const mockLevel = [
  {
    title: "CL1 xxxx",
    storyLine:
      "In the beginning, at the dawn of the web3 era, a cosmic egg exploded suddenly in an unparalleled big bang. The big bang shook time and space, Telly broke out of the shell.",
    rewards:
      "Description His name is XXX, born in XXX planet, when the broken moment, a lovely eye appeared",
  },
  {
    title: "CL2 xxxx",
    storyLine:
      "In the beginning, at the dawn of the web3 era, a cosmic egg exploded suddenly in an unparalleled big bang. The big bang shook time and space, Telly broke out of the shell.",
    rewards:
      "Description His name is XXX, born in XXX planet, when the broken moment, a lovely eye appeared",
  },
  {
    title: "CL3 xxxx",
    storyLine:
      "In the beginning, at the dawn of the web3 era, a cosmic egg exploded suddenly in an unparalleled big bang. The big bang shook time and space, Telly broke out of the shell.",
    rewards:
      "Description His name is XXX, born in XXX planet, when the broken moment, a lovely eye appeared",
  },
];

const steps = [
  {
    label: "CL1",
    value: 0,
    steps: 0,
    stepsCompleted: 0,
    date: null,
    hasIncident: false,
  },
  {
    label: "CL2",
    value: 1000,
    steps: 1000,
    stepsCompleted: 1000,
    date: null,
    hasIncident: false,
  },
  {
    label: "CL3",
    value: 2000,
    steps: 1000,
    stepsCompleted: 230,
    date: null,
    hasIncident: false,
  },
  {
    label: "CL4",
    value: 3000,
    steps: 1000,
    stepsCompleted: 0,
    date: null,
    hasIncident: false,
  },
  {
    label: "CL5",
    value: 4000,
    steps: 1000,
    stepsCompleted: 0,
    date: null,
    hasIncident: false,
  },
  {
    label: "CL6",
    value: 5000,
    steps: 1000,
    stepsCompleted: 0,
    date: null,
    hasIncident: false,
  },
  {
    label: "CL7",
    value: 6000,
    steps: 1000,
    stepsCompleted: 0,
    date: null,
    hasIncident: false,
  },
];

export default ({ show }: any) => {
  return (
    <Container>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        {mockLevel.map((i) => (
          <SwiperSlide key={i.title}>
            <div className="column">
              <div className="row-between desc" style={{ width: "100%" }}>
                <div className="left">
                  <div className="shadow" />
                  <Meteor>
                    <img src={dragonEgg} />
                  </Meteor>
                </div>

                <div className="right">
                  <StoryLine
                    title={mockLevel[0].title}
                    storyLine={mockLevel[0].storyLine}
                    rewards={mockLevel[0].rewards}
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Timeline milestones={steps} />
    </Container>
  );
};
