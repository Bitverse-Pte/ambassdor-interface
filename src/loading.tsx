import styled from "styled-components";

const Container = styled.div`
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
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 150px;
  }
`;

const Loading = () => {
  return (
    <Container>
      <img src={require("@/assets/walking.gif")} />
    </Container>
  );
};

export default Loading;
