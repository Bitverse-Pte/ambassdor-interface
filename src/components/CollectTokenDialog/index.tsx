import { claimToken, collectPoint, getUserToken } from "@/server";
import { useBoolean, useRequest } from "ahooks";
import { Collapse } from "react-collapse";
import { useEffect, useMemo, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useModel } from "umi";
import Button from "../Button";
import Loading from "../Loading";
import Modal from "../Modal";
import warning from "@/assets/dialog/warning.svg";
import { format } from "@/utils";
import Rotate from "../Rotate";

enum CLAIM_STATUS {
  Claimable = "Claimable",
  Processing = "Processing",
  Approve = "Approved",
  Freez = "Freeze",
}

const Icon = (props: any) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
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

const SucModal = styled(Modal)`
  .inner {
    width: 624px;
    position: relative;
    .header {
      margin-bottom: 50px;
    }
    .suc-img {
      width: 484px;
    }
    .content {
      font-weight: 400;
      font-size: 16px;
      line-height: 150%;
      color: #fff;
      margin-bottom: 36px;
      text-align: center;
    }
    button.md {
      border-radius: 12px;
      font-weight: 600;
      font-size: 20px;
      line-height: 30px;
      text-align: center;
      text-transform: capitalize;
      color: #05050e;
    }
    .claimed-amount {
      font-weight: 600;
      font-size: 26px;
      /* line-height: 150%; */
      .active {
        color: #00ebc8;
        font-weight: 600;
        font-size: 40px;
        /* line-height: 150%; */
      }
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
`;

const StyledModal = styled(Modal)`
  svg {
    cursor: pointer;
  }
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
      margin: 40px 0 20px;
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
    .ReactCollapse--collapse {
      transition: all linear 0.1s;
    }
    .curent-level {
      transition: all linear 0.2s;
      padding: 7px 14px 7px 14px;
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
      .loader {
        display: flex;
        align-items: center;
        justify-content: center;
        & svg {
          width: 32px;
          height: 32px;
        }
      }
    }
  }

  .level-container {
    height: 20px;
    cursor: pointer;
    .rotate,
    svg {
      width: 24px;
      height: 24px;
    }
    .rotate {
      margin-left: 16px;
    }
    .self-end {
      justify-self: flex-end;
    }
    display: grid;
    grid-template-columns: 1fr 2fr 2fr 2fr;
    align-items: center;

    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    text-transform: capitalize;
    color: #00dbc9;
    padding: 7px 14px 7px 14px;

    &:nth-of-type(odd) {
      background: linear-gradient(
          0deg,
          rgba(30, 45, 59, 0.96),
          rgba(30, 45, 59, 0.96)
        ),
        #00dbc9;
    }
    &:nth-of-type(even) {
      background: linear-gradient(0deg, #1e2d3b, #1e2d3b), #00dbc9;
    }

    &.active {
      position: relative;
      color: #fff;
      background: linear-gradient(
          0deg,
          rgba(30, 45, 59, 0.5),
          rgba(30, 45, 59, 0.5)
        ),
        #00dbc9;
      &::after,
      &::before {
        content: "";
        background: linear-gradient(
            0deg,
            rgba(30, 45, 59, 0.5),
            rgba(30, 45, 59, 0.5)
          ),
          #00dbc9;
        position: absolute;
        width: 5px;
        height: 100%;
        top: 0;
      }
      &::after {
        right: 0;
        transform: translate(5px, 0);
      }
      &::before {
        left: 0;
        transform: translate(-5px, 0);
      }
    }
  }
`;

const pendingMsg = "WELL DONE! YOU GOT 100 POINTS TO COLLECT!";
const successMsg = "successflly added to your account！";
const error = "";

const CollectTokenDialog = (props: any) => {
  const {
    user: { user, fetchUser, currentRoleConfig },
  } = useModel("userInfo");

  const { loading, data, run, error } = useRequest(claimToken, {
    manual: true,
  });

  const {
    loading: getUserTokenLoading,
    run: getUserTokenRun,
    data: getUserTokenData,
  } = useRequest(getUserToken, {
    manual: true,
  });

  useEffect(() => {
    if (user) {
      getUserTokenRun();
    }
  }, [user]);

  //   {
  //     "id": "1575072307343392769",
  //     "createBy": null,
  //     "createTime": "2022-09-28 18:37:56",
  //     "updateBy": null,
  //     "updateTime": null,
  //     "sysOrgCode": null,
  //     "name": "CLV1",
  //     "amount": 10,
  //     "status": "Claimable",
  //     "issueBy": "Level-Up: CLV1",
  //     "claimed": null,
  //     "issueDate": null,
  //     "lockTime": null,
  //     "ambassadorUserId": "2022092200000000394",
  //     "status_dictText": "Claimable"
  // }
  const userToken = useMemo(() => {
    if (!getUserTokenData) return null;
    return getUserTokenData?.data?.result?.records;
  }, [getUserTokenData]);

  const [currentTitle, setCurrentTtile] = useState("Token Details");
  const [
    claimSuccessModalStatus,
    { setTrue: showClaimSuccessModal, setFalse: hideClaimSuccessModal },
  ] = useBoolean(false);

  const claimSuccess = useMemo(() => {
    if (!data) return false;
    return data?.data?.code === 200;
  }, [data?.data?.result?.name]);

  const claimFailed = useMemo(() => {
    if (!data) return false;
    if (error) return true;
    return data?.data?.code !== 200;
  }, [data, error]);

  useEffect(() => {
    if (claimSuccess) {
      getUserTokenRun();
      showClaimSuccessModal();
    }
  }, [claimSuccess]);

  // useEffect(() => {
  //   if (claimSuccess) {
  //     setCurrentTtile("Succeed");
  //     fetchUser();
  //   }
  // }, [claimSuccess]);
  // useEffect(() => {
  //   if (claimFailed) {
  //     setCurrentTtile("Failed");
  //     fetchUser();
  //   }
  // }, [claimFailed]);

  const [tableOpen, { setTrue, setFalse, toggle }] = useBoolean(false);

  const configCombindProfile = useMemo(() => {
    if (!currentRoleConfig || !user) return [];
    const curLevel = user?.level;
    const lessLevelIndex = currentRoleConfig?.findIndex(
      (i) => i?.name === curLevel
    );

    return currentRoleConfig
      ?.map((i: any, index: number) => {
        if (index <= lessLevelIndex) {
          return {
            ...i,
            levelStatus: i?.token ? "TGE+365 Days" : "/",
          };
        }
        return {
          ...i,
          levelStatus: i?.token ? "After level up" : "/",
        };
      })
      ?.map((i) => {
        if (!userToken) return i;
        const _ = userToken.find((j) => j?.name === i?.name);
        return {
          ...i,
          ..._,
        };
      })
      .reverse();
  }, [user, currentRoleConfig, userToken]);

  const currentLevelConfig = useMemo(
    () => configCombindProfile?.find((i) => i?.name === user?.level),
    [user, configCombindProfile]
  );

  const [activeIndex, setIndex] = useState(
    configCombindProfile?.length - 1 || 0
  );


  const currentChosenLevel = useMemo(() => {
    if (!configCombindProfile || !configCombindProfile[activeIndex])
      return null;
    return tableOpen
      ? {
          ...configCombindProfile[activeIndex],
          level: configCombindProfile[activeIndex]?.name,
          token: configCombindProfile[activeIndex]?.token,
        }
      : {
          ...configCombindProfile[activeIndex],
          ...currentLevelConfig,
          level: currentLevelConfig?.name,
          token: currentLevelConfig?.token,
        };
  }, [configCombindProfile, tableOpen, currentLevelConfig, activeIndex]);

  return (
    <>
      <StyledModal {...props} title={currentTitle}>
        <div className="container row-between">
          {user?.level && <div className="level-shadow">{user?.level}</div>}

          <div className="left col">
            <div className="token-info row-between">
              <div className="col">
                <div className="row-end">
                  <strong>{format(user?.token || 0)}</strong>&nbsp;
                  <span>TELE</span>
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
                  style={{
                    justifyContent: "space-between",
                    position: tableOpen ? "absolute" : "relative",
                    opacity: tableOpen ? 0 : 1,
                    zIndex: tableOpen ? -3 : 1,
                  }}
                  onClick={toggle}
                >
                  <div className="tokens">
                    {currentLevelConfig?.name} -&nbsp;
                    {currentLevelConfig?.token
                      ? format(currentLevelConfig?.token) + " TELE"
                      : " /"}
                  </div>
                  {!getUserTokenLoading ? (
                    <div className="row">
                      <div className="days">
                        {currentLevelConfig?.status_dictText}
                      </div>
                      <Icon />
                    </div>
                  ) : (
                    <Loading />
                  )}
                </div>

                <Collapse isOpened={tableOpen}>
                  {configCombindProfile?.map((i, index) => (
                    <div
                      onClick={() => setIndex(index)}
                      key={i?.name}
                      className={`level-container ${
                        activeIndex === index ? "active" : ""
                      }`}
                    >
                      <div>{i?.name}</div>
                      <div style={{ textAlign: "center" }}>
                        {i?.token ? <>{format(i?.token)}TELE</> : "/"}
                      </div>
                      <div style={{ textAlign: "center" }}>
                        {i?.levelStatus || "/"}
                      </div>
                      <div className="row self-end">
                        <div
                          style={{
                            marginRight: `${
                              index === configCombindProfile?.length - 1
                                ? "0"
                                : "40px"
                            }`,
                          }}
                        >
                          {i?.status_dictText}
                        </div>
                        {index === configCombindProfile?.length - 1 && (
                          <Rotate className="rotate">
                            <Icon onClick={toggle} />
                          </Rotate>
                        )}
                      </div>
                    </div>
                  ))}
                </Collapse>
              </div>
            ) : null}
            <div
              className="tge"
              style={{
                margin: "20px 0 40px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <img src={warning} style={{ width: "20px" }} />
              <span
                style={{
                  fontSize: "14px",
                  color: "#B7B7B7",
                }}
              >
                $TELE token rewards will be released after TGE
              </span>
            </div>
            <div className="claim-container row">
              <Button
                loading={loading}
                disabled={
                  !getUserTokenData ||
                  !currentChosenLevel ||
                  !currentChosenLevel?.token ||
                  currentChosenLevel?.status !== CLAIM_STATUS.Claimable
                }
                radius={"12px"}
                onClick={() =>
                  currentChosenLevel && run({ name: currentChosenLevel?.level })
                }
              >
                CLAIM NOW
              </Button>
              <div>
                Claimable Now：
                <span
                  style={{ display: "inline-block", minWidth: "130px" }}
                  className="active"
                >
                  {currentChosenLevel?.status !== CLAIM_STATUS.Claimable
                    ? 0
                    : format(currentChosenLevel?.token)}
                  &nbsp;TELE
                </span>
              </div>
            </div>
          </div>
          <div className="right">
            <img src={require("@/assets/dialog/label.png")} alt="" />
          </div>
        </div>
      </StyledModal>

      <SucModal
        visible={claimSuccessModalStatus}
        onClose={hideClaimSuccessModal}
        title="Thank You"
      >
        <div className="container">
          <img
            className="suc-img"
            src={require("@/assets/claim-token-suc.png")}
            alt=""
          />
          <div className="col content">
            <div className="claimed-amount">
              <span className="active">
                {format(data?.data?.result?.amount)}
              </span>{" "}
              TELE
            </div>
            We will process your request！
          </div>
          <Button onClick={hideClaimSuccessModal}>Confirm</Button>
        </div>
      </SucModal>
    </>
  );
};

export default CollectTokenDialog;
