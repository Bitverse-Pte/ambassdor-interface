import { abbreviateNumber, format } from "@/utils";
import { useWeb3React } from "@web3-react/core";
import styled, { keyframes } from "styled-components";
import Button from "../Button";
import Connect from "../Connect";
import defaultAvatar from "@/assets/default-avatar.png";
import LevelC from "@/assets/level-C.svg";
import LevelA from "@/assets/level-A.svg";
import teleportDragon from "@/assets/teleport-dragon-1.png";
import Progress from "../Progress";
import { useBoolean } from "ahooks";
import { useModel } from "umi";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import CollectTokenDialog from "../CollectTokenDialog";
import CollectPointsDialog from "../CollectPointsDialog";
import useNextLevel from "@/hooks/useNextLevel";
import useLevelList from "@/hooks/useLevelList";
import { ROLE } from "@/interface";
import { useMemo } from "react";
import BigNumebr from 'bignumber.js'

const move = keyframes`
from,to{
  transform: translate(-50%, calc(100% + 19px));
}
50%{
  transform: translate(-50%, calc(100% + 19px + 15%));
}

`;

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
    color: #00dbc9;
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
  margin-right: 22px;
  /* border: 2px dashed #00DBC9; */
  position: relative;
  svg {
    stroke: #00ecc9;
    stroke-width: 2;
    stroke-dasharray: 7;
    position: absolute;
    fill: transparent;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 180px;
    height: 180px;
  }

  background-image: linear-gradient(
    to right,
    #000 0%,
    #000 50%,
    transparent 75%
  );
  background-size: 20px 10px;
  background-repeat: repeat-x;

  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  div {
    background: #4a4a4a;
    border: 2px solid #00dbc9;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
    background: url(${defaultAvatar}), #02483e no-repeat;
    background-size: cover;
    background-position: center;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      min-width: 160px;
      min-height: 160px;
    }
  }
`;

const Points = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  &:last-of-type {
    margin-left: 4%;
  }
  &:first-of-type {
    margin-right: 4%;
  }
  .row-between {
    width: 100%;
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
    &::after {
      content: "";
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
      color: #fff849;
    }
  }
`;

const UserAvatar = ({ src }: { src: string }) => {
  return (
    <Avatar>
      <svg xmlns="http://www.w3.org/2000/svg">
        <circle cx="90" cy="90" r="90" />
      </svg>
      <div>
        <img src={src} alt="" />
      </div>
    </Avatar>
  );
};

const UserPoints = ({
  title,
  amount,
  actionName,
  action,
  children,
  disabled,
}: any) => {
  const handleClick = () => {
    action && action();
  };

  return (
    <Points>
      <div className="row-between">
        <div className="title">{title}</div>
        <div className="amount">{format(amount)}</div>
      </div>
      <Button
        className="action-btn"
        radius="60px"
        onClick={handleClick}
        disabled={disabled}
      >
        {actionName}
      </Button>
      {children}
    </Points>
  );
};

// const precent = 20;

export default () => {
  const {
    user: { auth, user, loading, isAmbassador },
  } = useModel("userInfo");
  

  const nextLevel = useNextLevel();
  const levelList: any = useLevelList({
    forceRole: false
  });
  const currentLevel = useMemo(()=>levelList ? levelList.find(i=>i?.name === user?.level): null, [levelList, user])

  const precent = useMemo(()=>{
    if(!currentLevel) return 0;
    return (user?.point - currentLevel?.min) / currentLevel?.max * 100
  }, [currentLevel, user?.point])

  const { account } = useWeb3React();

  const [
    collectPointsDialog,
    { setTrue: showCollectPointsDialog, setFalse: closeCollectPointsDialog },
  ] = useBoolean(false);

  const [
    collectTokensDialog,
    { setTrue: showCollectTokensDialog, setFalse: closeCollectTokensDialog },
  ] = useBoolean(false);

  return (
    <Container>
      {account && auth ? (
        <div className="row-between p-0-40">
          <UserAvatar src={user?.avatar} />
          <div className="column">
            <div className="row level">
              <img src={user ? (isAmbassador ? LevelA : LevelC) : undefined} />
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
                  {nextLevel?.name || "---"}
                </span>
              </div>
            </div>
          </div>

          <div
            style={{
              marginLeft: "44px",
              padding: "0 44px",
              display: "flex",
              alignItems: "center",
              flex: 1,
            }}
          >
            <UserPoints
              title={"Point"}
              amount={(user?.point) || 0}
              disabled={!user?.pointCache || user?.pointCache <= 0}
              action={() => {
                if (user?.pointCache && user?.pointCache > 0) {
                  showCollectPointsDialog();
                }
              }}
              actionName={"Collect"}
            >
              {user?.pointCache ? (
                <div className="point-cache">
                  <div className="star">★</div>&nbsp; You got&nbsp;
                  <span style={{ color: "#00DBC9" }}>
                    {user?.pointCache || 0} points
                  </span>
                  &nbsp;to collect!
                </div>
              ) : null}
            </UserPoints>
            <UserPoints
              title={"Token"}
              amount={user?.token || 0}
              action={showCollectTokensDialog}
              actionName={"Details"}
            />
          </div>

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
