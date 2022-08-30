import { collectPoint } from "@/server";
import { useBoolean, useRequest } from "ahooks";
import { useEffect, useMemo, useState } from "react";
import styled, { keyframes } from "styled-components";
import Button from "../Button";
import Loading from "../Loading";
import Modal from "../Modal";

const StyledModal = styled(Modal)`
  .inner {
    min-width: 624px;
    max-width: max-content;
    position: relative;
  }

  .row{
    display: flex;
    align-items: center;
  }
  .col{
    display: flex;
    flex-direction: column;
  }
  .row-between{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .row-end{
    display: flex;
    align-items: flex-end;
  }

  .container {
    color: #fff;

    .token-detail-table{
        margin: 40px 0;
    }

    .divider{
        margin: 0 72px 0 58px ;
        height: 116.5px;
        width: 1px;
        background-color: rgba(255,255,255,.4);
    }
    .right{
        width: 389px;
        height: 347px;
        img{
            position: absolute;
            top: 0;
            z-index: -1;
            right: 0;
        }
    }
    .token-info{
        span{
            font-size: 24px;
            line-height: 36px;
            font-weight: 700;
        }
        strong{
            font-weight: 700;
            font-size: 64px;
        }

        .hint{
            font-weight: 400;
            font-size: 24px;
            line-height: 36px;
            color: #00DBC9;

        }
    }
    .claim-container{
        font-weight: 500;
        font-size: 24px;
        line-height: 36px;
        color: #fff;
        .active{
            color: #00DBC9;
        }

        button.md{
            width: fit-content;
            margin-right: 34px;
        }
    }
  }
`;

const pendingMsg = "WELL DONE! YOU GOT 100 POINTS TO COLLECT!";
const successMsg = "has been Successflly added to your account！";
const error = "";

const CollectTokenDialog = (props: any) => {
  const { loading, data, run, error } = useRequest(collectPoint, {
    manual: true,
  });

  const [currentTitle, setCurrentTtile] = useState("token details");
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
    }
  }, [claimSuccess]);
  useEffect(() => {
    if (claimFailed) {
      setCurrentTtile("Failed");
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

  return (
    <StyledModal {...props} title={currentTitle}>
      <div className="container row-between">
        <div className="left col">
          <div className="token-info row-between">
            <div className="col">
              <div className="row-end">
                <strong>3000</strong>&nbsp;<span>TELE</span>
              </div>
              <div className="hint">
                Total
              </div>
            </div>

            <div className="divider"/>

            <div className="col">
              <div className="row-end">
                <strong>365</strong>
                <span>Days</span>
              </div>
              <div className="hint">
                To Collect
              </div>
            </div>
          </div>

            <div className="token-detail-table"></div>

            <div className="claim-container row">
                <Button radius={'12px'}>CLAIM NOW</Button>
                <div>
                    claimable now：<span className="active">0 TELE</span>
                </div>
            </div>

        </div>
        <div className="right">
          <img src={require("@/assets/dialog/label.png")} alt="" />
        </div>
      </div>
    </StyledModal>
  );
};

export default CollectTokenDialog;
