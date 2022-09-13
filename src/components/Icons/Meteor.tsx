import styled from "styled-components";

const Container = styled.div`
    max-width: 312px;
    aspect-ratio: 1;
    overflow: visible!important;


    position: relative;
    img{
      border-radius: 21px;
    }
    svg{
        width: 150%;
        height: 150%;
        position: absolute;
        top:50%;
        left:50%;
        transform: translate(-50%, -50%)
    }

  .Rectangle_39851_183 {
    animation: 1.5s linear 0s 1 normal forwards running Rectangle_39851_183;
    animation-iteration-count: infinite;
    transform: translateX(123px) translateY(731px);
  }
  @keyframes Rectangle_39851_183 {
    0% {
      transform: translateX(123px) translateY(731px);
    }
    100% {
      transform: translateX(123px) translateY(-59px);
    }
  }
  .Rectangle_39849_378 {
    animation: 1.5s linear 0s 1 normal forwards running Rectangle_39849_378;
    animation-iteration-count: infinite;
    transform: translateX(6px) translateY(649px);
  }
  @keyframes Rectangle_39849_378 {
    0% {
      transform: translateX(6px) translateY(649px);
    }
    100% {
      transform: translateX(6px) translateY(-231px);
    }
  }
  .Rectangle_39847_541 {
    animation: 1.5s linear 0s 1 normal forwards running Rectangle_39847_541;
    animation-iteration-count: infinite;
    transform: translateX(422px) translateY(499px);
  }
  @keyframes Rectangle_39847_541 {
    0% {
      transform: translateX(422px) translateY(499px);
    }
    100% {
      transform: translateX(422px) translateY(-39px);
    }
  }
  .Rectangle_39848_566 {
    animation: 1.5s linear 0s 1 normal forwards running Rectangle_39848_566;
    animation-iteration-count: infinite;
    transform: translateX(117px) translateY(461px);
  }
  @keyframes Rectangle_39848_566 {
    0% {
      transform: translateX(117px) translateY(461px);
    }
    100% {
      transform: translateX(117px) translateY(-119px);
    }
  }
  .Rectangle_39850_124 {
    animation: 1.5s linear 0s 1 normal forwards running Rectangle_39850_124;
    animation-iteration-count: infinite;
    transform: translateX(330px) translateY(558px);
  }
  @keyframes Rectangle_39850_124 {
    0% {
      transform: translateX(330px) translateY(558px);
    }
    66.67% {
      transform: translateX(330px) translateY(-332.5px);
    }
    100% {
      transform: translateX(330px) translateY(-332.5px);
    }
  }
`;

export default ({ children }: any) => (
  <Container>
    {children}
    <svg
      className="meteor"
      width="424"
      height="450"
      viewBox="0 0 424 450"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <g width="424" height="450" data-name="流星">
        <g
          transform="translate(-6 0)"
          clipPath="url(#clip_1_685)"
          width="439"
          height="431"
          data-name="Frame 427318334"
        >
          <rect
            width="4"
            height="38"
            rx="2"
            fill="url(#paint_linear___941)"
            data-name="Rectangle 39851"
            className="Rectangle_39851_183"
          />
          <rect
            width="3"
            height="62"
            rx="0.5"
            fill="url(#paint_linear___79)"
            data-name="Rectangle 39849"
            className="Rectangle_39849_378"
          />
          <rect
            width="4"
            height="38"
            rx="2"
            fill="url(#paint_linear___145)"
            data-name="Rectangle 39847"
            className="Rectangle_39847_541"
          />
          <rect
            width="4"
            height="38"
            rx="2"
            fill="url(#paint_linear___315)"
            data-name="Rectangle 39848"
            className="Rectangle_39848_566"
          />
          <rect
            width="4"
            height="65"
            rx="2"
            fill="url(#paint_linear___745)"
            data-name="Rectangle 39850"
            className="Rectangle_39850_124"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip_1_685">
          <rect width="439" height="431" />
        </clipPath>
        <linearGradient
          id="paint_linear___941"
          x1="1"
          y1="0"
          x2="1"
          y2="38"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>

        <linearGradient
          id="paint_linear___79"
          x1="0.5"
          y1="0"
          x2="0.5"
          y2="62"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>

        <linearGradient
          id="paint_linear___145"
          x1="1"
          y1="0"
          x2="1"
          y2="38"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>

        <linearGradient
          id="paint_linear___315"
          x1="1"
          y1="0"
          x2="1"
          y2="38"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>

        <linearGradient
          id="paint_linear___745"
          x1="1"
          y1="0"
          x2="1"
          y2="65"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  </Container>
);
