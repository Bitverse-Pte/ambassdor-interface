import { collectPoint } from "@/server";
import { useBoolean, useRequest } from "ahooks";
import { Collapse } from "react-collapse";
import { useEffect, useMemo, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useModel } from "umi";
import Button from "../Button";
import Loading from "../Loading";
import Modal from "../Modal";
import warning from "@/assets/dialog/warning.svg";

const Icon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z"
      stroke="#00DBC9"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20 11L16 15L12 11"
      stroke="#00DBC9"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20 18L16 22L12 18"
      stroke="#00DBC9"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const StyledModal = styled(Modal)`
  .inner {
    min-width: 624px;
    max-width: max-content;
    position: relative;
    .header {
      margin-bottom: 50px;
    }
  }

  .row {
    display: flex;
    align-items: center;
  }
  .col {
    display: flex;
    flex-direction: column;
  }
  .row-between {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .row-end {
    display: flex;
    align-items: flex-end;
  }

  .container {
    color: #fff;
    .level-shadow {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-80%, -70%);
      color: rgba(0, 219, 201, 0.06);
      font-size: 273px;
      font-weight: 700;
      z-index: -1;
    }
    .token-detail-table {
      margin: 40px 0;
    }

    .divider {
      margin: 0 72px 0 58px;
      height: 116.5px;
      width: 1px;
      background-color: rgba(255, 255, 255, 0.4);
    }
    .right {
      width: 389px;
      height: 347px;
      img {
        position: absolute;
        top: 0;
        z-index: -1;
        right: 0;
      }
    }
    .token-info {
      span {
        font-size: 24px;
        line-height: 36px;
        font-weight: 700;
      }
      strong {
        font-weight: 700;
        font-size: 64px;
      }

      .hint {
        font-weight: 400;
        font-size: 24px;
        line-height: 36px;
        color: #00dbc9;
      }
    }
    .claim-container {
      font-weight: 500;
      font-size: 24px;
      line-height: 36px;
      color: #fff;
      .active {
        color: #00dbc9;
      }

      button.md {
        width: fit-content;
        margin-right: 34px;
        font-weight: 500;
        font-size: 16px;
        line-height: 24px;
      }
    }
    .ReactCollapse--collapse{
      transition: all linear .1s;
    }
    .curent-level {
      padding: 7px 14px 7px 4px;
      background: linear-gradient(
          0deg,
          rgba(30, 45, 59, 0.96),
          rgba(30, 45, 59, 0.96)
        ),
        #00dbc9;
      font-weight: 400;
      font-size: 16px;
      line-height: 20px;
      /* identical to box height, or 125% */

      text-transform: capitalize;

      color: #00dbc9;
      .days {
        margin-right: 20px;
      }
    }
  }
`;

const pendingMsg = "WELL DONE! YOU GOT 100 POINTS TO COLLECT!";
const successMsg = "has been Successflly added to your account！";
const error = "";

const CollectTokenDialog = (props: any) => {
  const {
    user: { user, fetchUser },
  } = useModel("userInfo");

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
      run();
      return;
    }
  };

  const [tableOpen, { setTrue, setFalse, toggle }] = useBoolean(false);
console.log('user', user)
  const {
    user: { currentRoleConfig },
  } = useModel("userInfo");

  console.log("currentRoleConfig", currentRoleConfig);

  const configCombindProfile = useMemo(()=>{
    if(!currentRoleConfig || !user) return []
    const curLevel = user?.level
    const lessLevelIndex = currentRoleConfig?.findIndex(i=>i?.name === curLevel)

    return currentRoleConfig?.map((i: any, index: number)=>{
      if(index < lessLevelIndex) {
        return ({
          ...i, 
          levelStatus: i?.token ? 'TGE+365 Days' : '/',
        })
      }
      return ({
        ...i,
        levelStatus: i?.token ? 'After level up' : '/',
      })
    }).reverse()
  }, [user, currentRoleConfig])

  console.log('configCombindProfile', configCombindProfile)

  return (
    <StyledModal {...props} title={currentTitle}>
      <div className="container row-between">
        {user?.level && <div className="level-shadow">{user?.level}</div>}

        <div className="left col">
          <div className="token-info row-between">
            <div className="col">
              <div className="row-end">
                <strong>{user?.token || 0}</strong>&nbsp;<span>TELE</span>
              </div>
              <div className="hint">Total</div>
            </div>

            <div className="divider" />

            <div className="col">
              <div className="row-end">
                <strong>365</strong>
                <span>Days</span>
              </div>
              <div className="hint">To Collect</div>
            </div>
          </div>

          {configCombindProfile?.length ? (
            <div className="token-detail-table">
              <div
                className="curent-level row"
                style={{ justifyContent: "space-between" }}
                onClick={toggle}
              >
                <div className="tokens">cl 3 - 3,000 TELE</div>
                <div className="row">
                  <div className="days">365 Days</div>
                  <Icon />
                </div>
              </div>
              <Collapse isOpened={tableOpen}>
                {configCombindProfile?.map(i=>(
                  <div key={i?.name} className="row">
                    <div>{i?.name}</div>
                    <div>{i?.token}TELE</div>
                    <div>{i?.levelStatus || '/'}</div>
                    <div>processing</div>
                    <Icon />
                  </div>
                ))}
              </Collapse>
            </div>
          ) : null}

          <div
            className="tge"
            style={{
              margin: "-20px 0 40px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <img src={warning} style={{ width: "20px" }} />
            <span>
              $TELE token rewards will be able to release after Teleport’s TGE
            </span>
          </div>

          <div className="claim-container row">
            <Button disabled radius={"12px"}>
              CLAIM NOW
            </Button>
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
