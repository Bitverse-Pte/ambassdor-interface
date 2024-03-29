import { useSize } from "ahooks";
import { useRef } from "react";
import styled from "styled-components";

const Container = styled.div<{ gradient?: string }>`
  background: ${({ gradient }) => gradient};
  border-radius: 20px;
  position: relative;
  min-width: 300px;
  aspect-ratio: 0.9;
  /* padding-top: calc(370px / 415px * 19.2%); */
  max-width: 370px;
  max-height: 415px;
  display: flex;
  align-items: flex-end;
  transition: transform 0.2s ease-in-out;

  .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .label {
    background: #ffffff;
    border: 1px solid #ffffff;
    border-radius: 6px;
    font-weight: 400;
    /* font-size: 37%; */
    font-size: 14px;
    font-family: "Dela Gothic One";
    line-height: 20px;
    color: #05050e;
    padding: 0 17px 3px;
    margin-top: 5px;
  }

  :hover {
    img {
      transform: translate(-50%, -25%);
    }
  }

  img {
    width: 84%;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -15%);
    transition: all linear 0.12s;
  }

  .inner {
    min-height: 210px;
    width: calc(100% - 8px);
    margin: 0 auto;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(6px);
    box-sizing: border-box;
    /* Note: backdrop-filter has minimal browser support */

    border-radius: 0px 0px 17px 17px;
    padding: 24px 0 8px;
    margin-bottom: 3px;
  }

  .insert {
    width: 100%;
    margin-top: 24px;
  }

  .f-20 {
    font-weight: 500;
    font-size: 20px;
    /* font-size: 55%; */
    line-height: 30px;
    /* identical to box height */
    text-transform: capitalize;
    color: #ffffff;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-right: 12px;
  }

  .f-16 {
    font-weight: 500;
    font-size: 16px;
    /* font-size: 42%; */
    line-height: 24px;
    /* identical to box height */
    text-transform: capitalize;
    color: #ffffff;
    opacity: 0.5;
  }
  .desc {
    margin-top: 4px;
    /* width: 164px; */
    height: 24px;
    * {
    overflow: hidden; //超出的文本隐藏
    text-overflow: ellipsis; //溢出用省略号显示
    white-space: nowrap; //溢出不换行
    }
  }
  .p {
    padding: 0 20px;
    align-items: flex-start !important;
  }
  .ellipsis {
    display: block;
    overflow: hidden; //超出的文本隐藏
    text-overflow: ellipsis; //溢出用省略号显示
    white-space: nowrap; //溢出不换行
  }

  .coming-soon {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(5px);
    border-radius: 0px 0px 17px 17px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    font-family: "Dela Gothic One";
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 35px;
  }
`;

const removeHtmlStyle = (html: string) =>
  html ? html.replaceAll(/style="[^\"]*?"/g, "") : "";

export default ({
  onClick,
  src,
  title,
  des,
  gradient,
  label,
  children,
  style,
  valid,
  ...props
}: any) => {
  const ref: any = useRef()
  const size = useSize(ref)
  
  return (
    <Container gradient={gradient} style={style} onClick={onClick} {...props}>
      <img src={src} alt={title} />
      <div className="inner" ref={ref}>
        <div className="row p">
          <div className="f-20">{title}</div>
          <div className="label">{label}</div>
        </div>

        <div
          className="f-16 desc p ellipsis"
          dangerouslySetInnerHTML={{ __html: removeHtmlStyle(des) }}
        />
        <div className="insert">{children}</div>
      </div>
      {!valid && <div style={{ height: ((size?.height) || 210) + 4 + 'px'}} className="coming-soon">Coming Soon...</div>}
    </Container>
  );
};
