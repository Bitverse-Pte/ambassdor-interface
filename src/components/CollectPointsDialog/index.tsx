import { collectPoint } from "@/server";
import { useBoolean, usePrevious, useRequest } from "ahooks";
import { useEffect, useMemo, useState } from "react";
import styled, { keyframes } from "styled-components";
import Button from "../Button";
import Loading from "../Loading";
import Modal from "../Modal";

import success from "@/assets/dialog/success.svg";
import failed from "@/assets/dialog/error.svg";
import { useModel } from "umi";
import Lock from "../Icons/Lock";
import Portal from "../Portal";
import { format } from "@/utils";

const springish = keyframes`
  /* 0.00% {transform: translate3d(50.00px, 0, 0) scale(0);}
  10.16% {transform: translate3d(-41.06px, 0, 0) scale(1.4106);}
  21.39% {transform: translate3d(16.09px, 0, 0) scale(0.8391);}
  32.62% {transform: translate3d(-6.31px, 0, 0) scale(1.0631);}
  43.85% {transform: translate3d(2.47px, 0, 0) scale(0.9753);}
  55.08% {transform: translate3d(-0.97px, 0, 0) scale(1.0097);}
  66.31% {transform: translate3d(0.38px, 0, 0) scale(0.9962);}
  77.54% {transform: translate3d(-0.15px, 0, 0) scale(1.0015);}
  88.77% {transform: translate3d(0.06px, 0, 0) scale(0.9994);}
  100.00% {transform: translate3d(-0.02px, 0, 0) scale(1.0002);} */


  0%{
    transform: rotate(0);
  }
  20%, 60%{
    transform: rotate(-6deg);
  }
  40%, 80%{
    transform: rotate(6deg);
  }
  100%{
    transform: rotate(0);
  }

`;

const FixedHint = styled.div<{ active?: boolean }>`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.3);
  transition: filter, backdrop-filter linear 0.2s;
  z-index: ${({ active }) => (active ? 667 : 0)};
  filter: opacity(${({ active }) => (active ? 1 : 0)});
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(${({ active }) => (active ? '6px' : 0)});

  @keyframes ding {
    50% {
      transform: translate(-70%, -100%) rotate(177deg);
      /* change transform-origin to have the first rotation hinge on the bottom of the group */
      transform-origin: 50% 100%;
    }
    57% {
      transform: translate(-70%, 100%) rotate(177deg);
      /* change transform-origin to have the following rotations hinge on the top of the group (which currently sits at the bottom) */
      transform-origin: 50% 0%;
    }
    60% {
      transform: translate(-65%, 100%) rotate(210deg);
      transform-origin: 50% 0%;
    }
    63%,
    90% {
      transform: translate(-70%, 100%) rotate(177deg);
      transform-origin: 50% 0%;
    }
  }

  @keyframes echo {
    0% {
      transform: translate(-50%, -50%) scale(0);
      opacity: 1;
      visibility: visible;
    }
    70% {
      opacity: 0;
      visibility: hidden;
    }
    100% {
      transform: translate(-50%, -50%) scale(4);
      opacity: 0;
      visibility: hidden;
    }
  }

  .hint-container {
    border: none;
    background: none;
    border-radius: 50%;
    width: 180px;
    height: 180px;
    filter: drop-shadow(0 2px 5px #100314);
    position: relative;
    & svg {
      width: 100%;
      height: 100%;
    }
    &.play svg #triangle__wand {
      animation: ding 3.5s 1s cubic-bezier(0.59, 0.06, 0.62, 1) forwards;
      /* transform origin by default set to the top of the group */
      transform-origin: 50% 0%;
    }
    &.play::before {
      content: "";
      position: absolute;
      top: 37%;
      left: 45%;
      width: 100%;
      height: 100%;
      transform: translate(-50%, -50%);
      background: #fbd2e4;
      border-radius: inherit;
      /* have the circle on top of the button */
      z-index: 10;
      /* animation to highlight the circle before removing it from view */
      animation: echo 1s 3.1s ease-out both;
    }
  }
`;

const StyledModal = styled(Modal)`
  .inner {
    min-width: 624px;
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .loading i {
      display: block;
    }
    .collect-img {
      width: 484px;
    }
    .collect-success-img,
    .collect-failed-img {
      width: 120px;
      margin: 36px 0 20px;
      animation: ${springish};
      animation-duration: 0.24s;
      animation-iteration-count: 2;
      animation-timing-function: cubic-bezier(0.445, 0.05, 0.55, 0.95);
    }
    .collect-failed-img {
      margin: 36px 0;
    }
    .desc {
      margin-bottom: 36px;
      color: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .active {
      font-family: "Dela Gothic One";
      color: #00ebc8;
      font-weight: 600;
      font-size: 40px;
      line-height: 68px;
    }
    .points {
      font-family: "Dela Gothic One";
      font-weight: 600;
      font-size: 22px;
      line-height: 30px;
    }
    .tip {
      font-weight: 400;
      font-size: 16px;
      line-height: 22px;
    }
  }
`;

const LevelUpModal = styled(Modal)`
  z-index: 668;
  .inner {
    width: 610px;
    .container {
      margin-top: 36px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      button.md {
        border-radius: 12px;
        margin-top: 36px;
      }
    }
    .desc {
      font-weight: 400;
      font-size: 26px;
      line-height: 44px;
      text-align: center;
      text-transform: capitalize;

      color: #ffffff;
    }
    .img-container {
      margin: auto;
      width: 176px;
      height: 176px;
      margin-bottom: 16px;
      img {
        width: 100%;
        height: 100%;
      }
      .active .shining-shadow {
        animation-duration: 5s;
      }
    }
  }
`;

const CollectPointsDialog = (props: any) => {
  // @ts-ignore
  const {
    user: { user, fetchUser, curRoleNft },
  } = useModel("userInfo");

  const { loading, data, run, error } = useRequest(collectPoint, {
    manual: true,
  });

  const [currentTitle, setCurrentTtile] = useState("Congratulations!");
  const [previousPrice, setPrice] = useState(0);
  const [previousLevel, setLevel] = useState("");

  const claimSuccess = useMemo(() => {
    if (!data) return false;
    return data?.data?.code === 200;
  }, [data]);

  const claimFailed = useMemo(() => {
    if (!data) return false;
    if (error) return true;
    return data?.data?.code !== 200;
  }, [data, error]);

  useEffect(() => {
    if (claimSuccess) {
      setCurrentTtile("Succeed");
      fetchUser();
    }
  }, [claimSuccess]);
  useEffect(() => {
    if (claimFailed) {
      setCurrentTtile("Failed");
      fetchUser();
    }
  }, [claimFailed]);

  const handleCollect = () => {
    if (claimSuccess) {
      props.onClose();
      return;
    }
    if (claimFailed) {
      run();
      return;
    }
    if (!loading) {
      setPrice(user?.pointCache);
      run();
      return;
    }
  };

  const pendingMsg = useMemo(() => {
    return `WELL DONE! YOU GOT ${format(user?.pointCache || 0)} POINTS TO COLLECT!`;
  }, [user?.pointCache]);

  const successMsg = "successflly added to your account!";

  const ifLevelUp = useMemo(() => {
    const latestLevel = data?.data?.result?.level;
    if (latestLevel && latestLevel !== previousLevel) return true;
    return false;
  }, [previousLevel, data]);

  const [
    levelupHintModal,
    { setFalse: hideHint, setTrue: showHint },
  ] = useBoolean(false);
  const [levelupModal, { setFalse, setTrue }] = useBoolean(false);

  useEffect(() => {
    if (ifLevelUp) {
      // showHint();
      setTrue();
    }
  }, [ifLevelUp]);

  const currentLevel = useMemo(() => {
    if (ifLevelUp) {
      const latestLevel = data?.data?.result?.level;
      return curRoleNft.filter((i) => i?.level === latestLevel)[0];
    }
    return null;
  }, [ifLevelUp, data]);

  const [
    confirmButton,
    { setTrue: showConfirmButton, setFalse: hideConfirmButton },
  ] = useBoolean(false);

  const [ifNftImageOnload, {setTrue: nftImageOnloaded, setFalse: nftImageUnload}] = useBoolean(false);

  useEffect(() => {
    if (props?.visible) {
      hideConfirmButton();
      hideHint();
      setFalse();
      nftImageUnload();
      setLevel(user?.level);
    }
  }, [props?.visible]);


  return (
    <>
      <StyledModal {...props} title={currentTitle}>
        <div className="container">
          {claimSuccess ? (
            <img className="collect-success-img" src={success} alt="" />
          ) : claimFailed ? (
            <img className="collect-failed-img" src={failed} alt="" />
          ) : (
            <img
              className="collect-img"
              src={require("@/assets/dialog/collect-points.png")}
              alt=""
            />
          )}
          {claimFailed ? null : (
            <div className="desc" style={{ marginTop: "-26px" }}>
              <div className="points">
                <span className="active">
                  {claimSuccess ? format(previousPrice) : format(user?.pointCache || 0) || 0}
                </span>
                &nbsp; Points
              </div>
              <span className="tip">
                {claimSuccess ? successMsg : pendingMsg}
              </span>
            </div>
          )}

          <Button
            disabled={
              (!user?.pointCache || user?.pointCache <= 0) && !claimSuccess
            }
            loading={loading}
            radius="16px"
            onClick={handleCollect}
          >
            {loading ? (
              <Loading />
            ) : claimSuccess ? (
              "Confirm"
            ) : claimFailed ? (
              "Try Again"
            ) : (
              "Collect"
            )}
          </Button>
        </div>
      </StyledModal>

      {/* <Portal>
        <FixedHint active={levelupHintModal}>
          <div className={`hint-container ${levelupHintModal ? "play" : ""}`}>
            <svg
              viewBox="0 0 100 100"
              width="100"
              height="100"
              onAnimationEnd={() => {
                setTrue();
                hideHint();
              }}
            >
              <circle r="50" cx="50" cy="50" fill="#FC3F77" />

              <g id="triangle" transform="translate(25 20) scale(0.5)">
                <path
                  d="M 90 100 h -80 a 10 10 0 0 1 -10 -10 l 45 -80 a 10 10 0 0 1 10 0 l 40 70"
                  fill="none"
                  stroke="#FBD2E4"
                  stroke-width="10"
                  stroke-linejoin="round"
                  stroke-linecap="round"
                />
                <g id="triangle__wand">
                  <path
                    d="M 50 32 v 37"
                    fill="none"
                    stroke="#FBD2E4"
                    stroke-width="7"
                    stroke-linejoin="round"
                    stroke-linecap="round"
                  />

                  <circle r="4.5" cx="50" cy="82" fill="#FBD2E4" />
                </g>
              </g>
            </svg>
          </div>
        </FixedHint>
      </Portal> */}

      <LevelUpModal
        visible={levelupModal && currentLevel}
        onClose={setFalse}
        title={"level up!"}
      >
        <div className="container">
          <div className="img-container">
            {currentLevel?.name ? (
              <Lock
                allowAnimation={ifNftImageOnload}
                autoPlay={ifNftImageOnload}
                delay={1000}
                onAnimationEnd={showConfirmButton}
              >
                <img
                onLoad={()=>{nftImageOnloaded()}}
                  src={require(`@/assets/level/nft/${currentLevel?.name}.png`)}
                  alt=""
                />
              </Lock>
            ) : null}
          </div>

          <div className="desc">
            <span>{currentLevel?.level}</span> &nbsp;
            <span>{currentLevel?.name}</span>
          </div>

          <Button disabled={!confirmButton} onClick={setFalse}>
            Confirm
          </Button>
        </div>
      </LevelUpModal>
    </>
  );
};

export default CollectPointsDialog;
