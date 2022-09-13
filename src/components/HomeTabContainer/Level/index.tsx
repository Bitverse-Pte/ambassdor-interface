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
import { useMemo, useRef } from "react";

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
    width: 112px;
    height: 112px;
    border-radius: 50%;
  }

  /* .swiper-button-next {
    margin-right: 10px;
  }

  .swiper-button-prev {
    margin-left: 10px;
  } */
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
  const nextRef = useRef(null);
  const prevRef = useRef(null);

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
        navigation={{
          nextEl: nextRef.current,
          prevEl: prevRef.current,
        }}
        modules={[Navigation]}
        className="mySwiper"
      >
          <svg
        ref={nextRef}
        className="swiper-button-next"
        width="164"
        height="173"
        viewBox="0 0 164 173"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_f_334_6734)">
          <circle
            cx="94.5"
            cy="76.5"
            r="37.5"
            transform="rotate(-90 94.5 76.5)"
            fill="#59C3AA"
          />
        </g>
        <g filter="url(#filter1_f_334_6734)">
          <circle
            cx="94.5"
            cy="102.5"
            r="37.5"
            transform="rotate(-90 94.5 102.5)"
            fill="#599CFF"
          />
        </g>
        <g filter="url(#filter2_f_334_6734)">
          <circle
            cx="77.5"
            cy="69.5"
            r="37.5"
            transform="rotate(-90 77.5 69.5)"
            fill="#FFBE83"
          />
        </g>
        <g filter="url(#filter3_f_334_6734)">
          <circle
            cx="69.5"
            cy="103.5"
            r="37.5"
            transform="rotate(-90 69.5 103.5)"
            fill="#064CFF"
          />
        </g>
        <circle
          cx="82"
          cy="92"
          r="56"
          transform="rotate(-90 82 92)"
          fill="#05050E"
        />
        <path d="M67 92L97 92" stroke="white" strokeWidth="3" />
        <path
          d="M82.25 108L98.5 91.75L82.25 75.5"
          stroke="white"
          strokeWidth="3"
        />
        <defs>
          <filter
            id="filter0_f_334_6734"
            x="25"
            y="7"
            width="139"
            height="139"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="16"
              result="effect1_foregroundBlur_334_6734"
            />
          </filter>
          <filter
            id="filter1_f_334_6734"
            x="25"
            y="33"
            width="139"
            height="139"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="16"
              result="effect1_foregroundBlur_334_6734"
            />
          </filter>
          <filter
            id="filter2_f_334_6734"
            x="8"
            y="0"
            width="139"
            height="139"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="16"
              result="effect1_foregroundBlur_334_6734"
            />
          </filter>
          <filter
            id="filter3_f_334_6734"
            x="0"
            y="34"
            width="139"
            height="139"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="16"
              result="effect1_foregroundBlur_334_6734"
            />
          </filter>
        </defs>
      </svg>

      <svg
        ref={prevRef}
        className="swiper-button-prev"
        width="164"
        height="173"
        viewBox="0 0 164 173"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_f_334_6742)">
          <circle
            r="37.5"
            transform="matrix(4.37114e-08 -1 -1 -4.37114e-08 69.5 76.5)"
            fill="#59C3AA"
          />
        </g>
        <g filter="url(#filter1_f_334_6742)">
          <circle
            r="37.5"
            transform="matrix(4.37114e-08 -1 -1 -4.37114e-08 69.5 102.5)"
            fill="#599CFF"
          />
        </g>
        <g filter="url(#filter2_f_334_6742)">
          <circle
            r="37.5"
            transform="matrix(4.37114e-08 -1 -1 -4.37114e-08 86.5 69.5)"
            fill="#FFBE83"
          />
        </g>
        <g filter="url(#filter3_f_334_6742)">
          <circle
            r="37.5"
            transform="matrix(4.37114e-08 -1 -1 -4.37114e-08 94.5 103.5)"
            fill="#064CFF"
          />
        </g>
        <circle
          r="56"
          transform="matrix(4.37114e-08 -1 -1 -4.37114e-08 82 92)"
          fill="#05050E"
        />
        <path d="M97 92L67 92" stroke="white" strokeWidth="3" />
        <path
          d="M81.75 108L65.5 91.75L81.75 75.5"
          stroke="white"
          strokeWidth="3"
        />
        <defs>
          <filter
            id="filter0_f_334_6742"
            x="0"
            y="7"
            width="139"
            height="139"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="16"
              result="effect1_foregroundBlur_334_6742"
            />
          </filter>
          <filter
            id="filter1_f_334_6742"
            x="0"
            y="33"
            width="139"
            height="139"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="16"
              result="effect1_foregroundBlur_334_6742"
            />
          </filter>
          <filter
            id="filter2_f_334_6742"
            x="17"
            y="0"
            width="139"
            height="139"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="16"
              result="effect1_foregroundBlur_334_6742"
            />
          </filter>
          <filter
            id="filter3_f_334_6742"
            x="25"
            y="34"
            width="139"
            height="139"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="16"
              result="effect1_foregroundBlur_334_6742"
            />
          </filter>
        </defs>
      </svg>

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
