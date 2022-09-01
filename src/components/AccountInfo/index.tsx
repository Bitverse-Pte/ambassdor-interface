import { abbreviateNumber } from "@/utils";
import { useWeb3React } from "@web3-react/core";
import styled, { keyframes } from "styled-components";
import Button from "../Button";
import Connect from "../Connect";
import defaultAvatar from "@/assets/default-avatar.png";
import LevelC from "@/assets/level-C.svg";
import teleportDragon from "@/assets/teleport-dragon-1.png";
import Progress from "../Progress";
import { useBoolean } from "ahooks";
import { useModel } from "umi";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import CollectTokenDialog from "../CollectTokenDialog";
import CollectPointsDialog from "../CollectPointsDialog";
import { useMemo } from "react";

const move = keyframes`
from,to{
  transform: translate(-50%, calc(100% + 19px));
}
50%{
  transform: translate(-50%, calc(100% + 19px + 15%));
}

`

const Container = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  .p-0-40 {
    padding: 0 15px 0 40px;
  }
  .row {
    display: flex;
    align-items: center;
  }
  .column {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
  .row-between {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .level {
    font-weight: 400;
    font-size: 24px;
    line-height: 36px;
    .username {
      width: 142px;
      overflow: hidden; //超出的文本隐藏
      text-overflow: ellipsis; //溢出用省略号显示
      white-space: nowrap; //溢出不换行
    }
  }
  .active {
    color: #00DBC9;
  }
  .login-dragon {
    transform: translate(0px, -8%);
  }
  .progress {
    width: 230px;
    margin-top: 24px;
    span {
      transition: all linear 0.2s;
      font-weight: 300;
      font-size: 16px;
      line-height: 24px;
    }
  }
`;

const Avatar = styled.div`
  width: 180px;
  height: 180px;
  border-radius: 50%;
  border: 2px dashed #00DBC9;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  div {
    background: #4a4a4a;
    border: 2px solid #00DBC9;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
    background: url(${defaultAvatar}), #4a4a4a no-repeat;
    background-size: cover;
    background-position: center;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
`;

const Points = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  &:last-of-type{
    align-items: flex-end;
  }
  .row-between {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .title {
    font-weight: 400;
    font-size: 24px;
    line-height: 24px;
    text-transform: capitalize;
    color: #ffffff;
    margin-right: 36px;
  }
  .amount {
    font-weight: 600;
    font-size: 40px;
    line-height: 40px;
    text-transform: capitalize;
    color: #00ecca;
  }

  .action-btn {
    margin-top: 9px;
  }
  .point-cache {
    animation: ${move} linear 1s infinite;
    &::after{
      content: '';
      width: 0;
      height: 0;
      border: 8px solid transparent;
      border-bottom: 11px solid rgba(66, 66, 75, 0.6);
      position: absolute;
      top: -45%;
      left: 50%;
      transform: translate(-50%, 1px);
      backdrop-filter: blur(6px);
      z-index: -1;
    }
    position: relative;
    width: max-content;
    padding: 12px 24px;
    background: rgba(66, 66, 75, 0.6);
    backdrop-filter: blur(8px);
    border-radius: 8px;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, calc(100% + 19px));
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;
    display: flex;
    align-items: center;
    .star {
      color: #FFF849;
    }
  }
`;

const UserAvatar = ({ src }: { src: string }) => {
  return (
    <Avatar>
      <div>
        <img src={src} alt="" />
      </div>
    </Avatar>
  );
};

const UserPoints = ({ title, amount, actionName, action, children }: any) => {
  const handleClick = () => {
    action && action();
  };

  return (
    <Points>
      <div className="row-between" >
        <div className="title">{title}</div>
        <div className="amount">{abbreviateNumber(amount)}</div>
      </div>
      <Button
        style={{ width: "190px" }}
        className="action-btn"
        radius="60px"
        onClick={handleClick}
      >
        {actionName}
      </Button>
      {children}
    </Points>
  );
};

const precent = 20;

export default () => {
  const { account } = useWeb3React();
  // @ts-ignore
  const {
    user: { user, loading, curRole },
  } = useModel("userInfo");

  // @ts-ignore
  const { config: { contributor, ambassador } } = useModel('config')

  const [
    collectPointsDialog,
    { setTrue: showCollectPointsDialog, setFalse: closeCollectPointsDialog },
  ] = useBoolean(false);

  const [
    collectTokensDialog,
    { setTrue: showCollectTokensDialog, setFalse: closeCollectTokensDialog },
  ] = useBoolean(false);
  
    // const prevLevel = useMemo(()=>{
    //   if(!curRole || user?.level) return '-'
    //   const c = curRole.filter(i=>i?.name === user?.level)
    //   if(!c.length) return '-'
    //   return c[0]
    //   console.log('c', c)

    // }, [curRole])

  return (
    <Container>
      {account ? (
        <div className="row-between p-0-40">
          <UserAvatar src={user?.avatar} />
          <div className="column">
            <div className="row level">
              <img src={LevelC} />
              <Tippy content={user?.address}>
                <span className="username">{user?.username}</span>
              </Tippy>
            </div>
            <div className="progress">
              <Progress loading={loading} precent={precent} />
              <div className="row-between">
                <span className={precent > 0 ? "active" : ""}>
                  {user?.level || "---"}
                </span>
                <span className={precent >= 100 ? "active" : ""}>
                  {user?.level || "---"}
                </span>
              </div>
            </div>
          </div>

          <UserPoints
            title={"Point"}
            amount={user?.point || 0}
            action={showCollectPointsDialog}
            actionName={"Collect"}
          >
            {user?.pointCache ? (
              <div className="point-cache">
                <div className="star" >★</div>&nbsp;
                You got&nbsp;<span style={{ color: "#00DBC9" }}>{user?.pointCache || 0} points </span>&nbsp;to
                collect!
              </div>
            ) : null}
          </UserPoints>
          <UserPoints
            title={"Token"}
            amount={user?.token || 0}
            action={showCollectTokensDialog}
            actionName={"Details"}
          />

          <img className="login-dragon" src={teleportDragon} />
        </div>
      ) : (
        <div style={{ width: "250px", margin: "auto" }}>
          <Button radius={"200px"}>
            <Connect>{account ? null : ""}</Connect>
          </Button>
        </div>
      )}

      {collectPointsDialog && (
        <CollectPointsDialog
          visible={collectPointsDialog}
          onClose={closeCollectPointsDialog}
        />
      )}

      {collectTokensDialog && (
        <CollectTokenDialog
          visible={collectTokensDialog}
          onClose={closeCollectTokensDialog}
        />
      )}
    </Container>
  );
};
