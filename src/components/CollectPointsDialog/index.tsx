import { collectPoint } from "@/server";
import { useBoolean, useRequest } from "ahooks";
import { useEffect, useMemo, useState } from "react";
import styled, { keyframes } from "styled-components";
import Button from "../Button";
import Loading from "../Loading";
import Modal from "../Modal";

import success from "@/assets/dialog/success.svg";
import failed from "@/assets/dialog/error.svg";
import { useModel } from "umi";

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


const CollectPointsDialog = (props: any) => {
  // @ts-ignore
  const {
    user: { user, fetchUser },
  } = useModel("userInfo");

  const { loading, data, run, error } = useRequest(collectPoint, {
    manual: true,
  });

  const [currentTitle, setCurrentTtile] = useState("Congratulations!");
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
      fetchUser()
    }
  }, [claimSuccess]);
  useEffect(() => {
    if (claimFailed) {
      setCurrentTtile("Failed");
      fetchUser()
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
      run();
      return;
    }
  };


  const pendingMsg = useMemo(()=>{
    return `WELL DONE! YOU GOT ${user?.pointCache || 0} POINTS TO COLLECT!`
  }, [user?.pointCache]);

  const successMsg = "has been Successflly added to your account!";

  return (
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
          <div className="desc" style={{marginTop: '-26px'}}>
            <div className="points">
              <span className="active">{user?.pointCache || 0}</span>&nbsp;
              Points
            </div>
            <span className="tip">
              {claimSuccess ? successMsg : pendingMsg}
            </span>
          </div>
        )}

        <Button disabled={!user?.pointCache || user?.pointCache <= 0} loading={loading} radius="16px" onClick={handleCollect}>
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
  );
};

export default CollectPointsDialog;
