import styled, { css } from "styled-components";
import Meteor from "@/components/Icons/Meteor";
import StoryLine from "./StoryLine";
import Timeline from "@/components/Timeline";
import mountain from "@/assets/level/mountain.png";

import { Swiper, SwiperSlide, useSwiper } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper";
import Lock from "@/components/Icons/Lock";
import { useModel } from "umi";
import { useEffect, useMemo, useRef, useState } from "react";
import useLevelList from "@/hooks/useLevelList";
import Loading from "@/components/Loading";

const Container = styled.div`
  max-width: 1400px;
  width: 100%;
  margin: auto;
  .loader{
    padding: 200px 0 20px
  }
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
    /* background: url(${mountain}); */
    background-position: center;
    /* background-size: auto; */
    background-repeat: no-repeat;
    position: relative;
    overflow: hidden;
    border-radius: 24px;
    .shadow {
      position: absolute;
      width: 465.6px;
      height: 395.99px;
      background: #59c3aa;
      opacity: 0.4;
      filter: blur(200px);
      transform: translate(-15%, -20%) rotate(-11.42deg);
      & ~ div {
        /* border: 2px solid #05050e; */
        border-radius: 21px;
        overflow: hidden;
        img{
          width: 330px;
          height: 330px;
        }
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

  .swiper-button-next {
    right: 0;
    transform: translate(-2px, 0);
  }

  .swiper-button-prev {
    left: 0;
    transform: translate(2px, 0);
  }
`;

const Left = styled.div<{ name: string }>`
  ${({ name }) =>
    name &&
    css`
      & div.effect {
        width: 100%;
        height: 100%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        position: absolute;
        background: url(${require(`@/assets/level/bg/${name}.png`)}), #05050d;
        background-size: cover;
        background-position: center;
        &:after {
          position: absolute;
          content: "";
          width: 100%;
          height: 100%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);

          background: radial-gradient(
            ellipse at center,
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 1) 100%
          );

          box-shadow: 0 0 80px 100px #05050e inset;
        }
      }
    `}
`;


const SwiperController = ({lastCompleted, index}:any)=>{
  const swiper = useSwiper()

  useEffect(() => {
    if (!swiper || !lastCompleted) return;
    swiper.slideTo(lastCompleted);
  }, [swiper, lastCompleted]);

  useEffect(()=>{
    if (!swiper) return;
    swiper.slideTo(index)
  }, [index])

  return null
}

export default ({ show }: any) => {
  const nextRef = useRef(null);
  const prevRef = useRef(null);
  const levelList = useLevelList();

  const {
    user: { user, curRoleNft },
  } = useModel("userInfo");

  // @ts-ignore
  const {
    config: { contributor },
  }: any = useModel("config");

  const steps = useMemo(() => {
    if (contributor === "contributor") return null;
    const t = levelList.map(
      (
        i: {
          [x: string]: any;
          name: any;
          points: any;
        },
        index: any
      ) => ({
        ...i,
        ...curRoleNft[index],
        label: i.name,
        value: i.min,
        steps: i.max,
        stepsCompleted:
          user?.point < i.min ? 0 : user?.point >= i.max ? i.max : user?.point,
        date: null,
        hasIncident: false,
      })
    );

    return t;
  }, [levelList, user]);

  const [activeIndex, setIndex] = useState(0);

  const lastCompleted = useMemo(() => {
    if (!steps) return 0;
    return steps.findIndex((i) => {
      return i?.stepsCompleted < i?.max && i?.stepsCompleted > i?.min;
    });
  }, [steps]);

  const handleSlide = (item: any, index: any)=>{
    setIndex(index)
  }


  return (
    <Container>
      {steps ? (
        <>
          <Swiper
            // initialSlide={lastCompleted}
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
            // onActiveIndexChange={(e) => {
            //   setIndex(+e.activeIndex + 1);
            // }}
          >

            <SwiperController index={activeIndex} lastCompleted={lastCompleted}/>

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

              {curRoleNft.map((i, index) => (
                <SwiperSlide key={i.name}>
                  <div className="column">
                    <div className="row-between desc" style={{ width: "100%" }}>
                      <Left
                        name={i?.name.replaceAll(" ", "-")}
                        className="left"
                      >
                        <div className="shadow" />
                        <div className="effect" />
                        <Meteor>
                          {/* <img src={imageUrl} /> */}
                          {index <= lastCompleted ? (
                            <img
                              src={require(`@/assets/level/nft/${i.name}.png`)}
                            />
                          ) : (
                            <Lock allowAnimation={false}>
                              <img
                                src={require(`@/assets/level/nft/${i.name}.png`)}
                              />
                            </Lock>
                          )}
                        </Meteor>
                      </Left>

                      <div className="right">
                        <StoryLine
                          title={i?.name}
                          storyLine={i?.description}
                          rewards={i?.rewards || "-"}
                        />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}

          </Swiper>
          {/* {
        steps 
      } */}
          <Timeline
            handleSlide={handleSlide}
            milestones={steps}
            curStepsCompleted={user?.point || 0}
            max={steps?.lastIndex ? steps[steps?.lastIndex]?.min : 0}
          />
        </>
      ) : (
        <Loading />
      )}
    </Container>
  );
};
