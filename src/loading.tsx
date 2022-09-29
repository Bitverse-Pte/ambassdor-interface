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

  position: fixed;
  background-color: #05050e;
  width: 100vw;
  height: 100vh;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  img {
    position: absolute;
    top: 44%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 150px;
  }
  .loading {
    position: absolute;
    top: 56%;
    left: 50%;
    transform: translate(-50%, -50%);
    /* width: 150px; */
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid #ffffff;
    border-radius: 7px;
    padding: 5px;
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
    position: absolute;
    top: 58%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin-top: 16px;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    /* identical to box height, or 125% */

    text-align: center;
    text-transform: capitalize;

    color: #ffffff;
  }
`;

const Loading = () => {
  return (
    <Container>
      <img src={require("@/assets/walking.gif")} />

      <div className="loading">
        {// animation-delay
        new Array(40).fill(1).map((i, index) => (
          <div
            key={index}
            style={{ animationDelay: index * 0.1 + "s" }}
            className="loading-dot"
          />
        ))}
      </div>
      <div className="content">Loading...</div>

    </Container>
  );
};

export default Loading;
