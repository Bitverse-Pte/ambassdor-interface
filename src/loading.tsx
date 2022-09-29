import styled from "styled-components";

const Container = styled.div`
  @keyframes loadingFade {
    0% {
      opacity: 0;
    }
    /* 50% {
      opacity: 0.8;
    } */
    100% {
      opacity: 1;
    }
  }

  z-index: 23;
  position: fixed;
  background-color: #05050e;
  width: 100vw;
  height: 100vh;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  .container {
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  img {
    width: 150px;
  }
  .loading {
    margin-top: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid #ffffff;
    border-radius: 7px;
    padding: 5px 8px 5px 5px;
    .loading-dot {
      float: left;
      width: 4px;
      height: 11px;
      margin: 0 2px;
      background: #01ebc8;

      border-radius: 1px;

      opacity: 0;
      animation: loadingFade 4s infinite;
    }
  }
  .content {
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    /* identical to box height, or 125% */

    text-align: center;
    text-transform: capitalize;

    color: #ffffff;
  }

  .progress {
    margin-top: 16px;
    margin-bottom: 16px;
    width: 330px;
    height: 12px;
    border: 2px solid #ffffff;
    border-radius: 7px;
    padding: 6px;
    background: repeating-linear-gradient(
        90deg,
        #000 0 2px,
        #01ebc8 0 5px
      )
      0/0% no-repeat content-box content-box;
    position: relative;
    animation: p4 6s infinite steps(100);
  }

  @keyframes p4 {
    100% {
      background-size: 120%;
    }
  }

`;

const Loading = () => {
  return (
    <Container>
      <div className="container">
        <img src={require("@/assets/walking.gif")} />
        <div className="progress" />

        {/* <div className="loading"> */}
        {/* {
          new Array(40).fill(1).map((i, index) => (
            <div
              key={index}
              style={{ animationDelay: index * 0.1 + "s" }}
              className="loading-dot"
            />
          ))} */}
        {/* </div> */}
        <div className="content">Loading...</div>
      </div>
    </Container>
  );
};

export default Loading;
