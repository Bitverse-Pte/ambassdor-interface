import styled from "styled-components";

const Container = styled.div`
    max-width: 300px;
  .f-26 {
    font-weight: 600;
    font-size: 26px;
    line-height: 39px;
    margin-bottom: 31px;
  }

  .f-18 {
    font-weight: 500;
    font-size: 18px;
    line-height: 27px;
  }

  .f-16 {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
  }

  .divider {
    background: #ffffff;
    height: 1px;
    width: 162px;
    margin: 30px 0 33px;
  }

  .sub{
    color: rgba(255,255,255,.5);
    margin-bottom: 12px;
  }

  .story-line.column, .rewards.column{
    align-items: flex-start;
  }

`;

export default ({title, storyLine, rewards}: any) => {
  return <Container>
    <div className="title f-26">{title}</div>
    <div className="story-line column">
        <div className="sub f-18">StoryLine</div>
        <div className="f-16">{storyLine}</div>
    </div>
    <div className="divider"/>
    <div className="rewards column">
        <div className="sub f-18">Rewards</div>
        <div className="f-16">{rewards}</div>
    </div>
  </Container>;
};
