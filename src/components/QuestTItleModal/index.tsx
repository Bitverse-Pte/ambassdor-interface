import { useEffect, useMemo } from "react";
import styled from "styled-components";
import { useModel } from "umi";
import Loading from "../Loading";
import Modal from "../Modal";
import defaultImg from "@/assets/default-quest-bg.png";
import { format } from "date-fns";
import Button from "../Button";

const StyledModal = styled(Modal)`
  .inner {
    max-width: inherit;
    width: 890px;
    height: max-content;
    padding: 48px 50px;
  }
  .content {
    margin-top: 40px;
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

  .loading {
    padding: 30px 0;
  }

  .container {
    align-items: stretch !important;
    .left {
      flex: 1;
    }
  }

  .label {
    background: #ffffff;
    border: 1px solid #ffffff;
    border-radius: 6px;
    padding: 0 12px;
    color: #05050e;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    font-family: "Dela Gothic One";
  }

  .period {
    color: rgba(255, 255, 255, 0.6);
    margin: 8px 0 36px;
    span {
      color: #fff;
    }
    a {
      color: #00ecc9;
    }
  }

  .desc {
    flex: 1;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 14px;
    padding: 24px;
    max-height: 408px;
    overflow-x: hidden;
    overflow-y: auto;

    & * {
      color: #fff !important;
      text-align: left !important;
      line-height: 1.3;
    }
  }
  .right {
    margin-left: 32px;
    .img-container {
      overflow: hidden;
      width: 366px;
      height: 206px;
      border-radius: 16px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        background: url(${defaultImg}) no-repeat;
        background-size: contain;
      }
    }
    .link-desc {
      display: block;
      margin-top: 26px;
      margin-bottom: 26px;
      color: #fff;
    }
    .period.rewards,
    .period.link {
      margin-bottom: 0 !important;
    }
    .period.rewards {
      margin-bottom: 8px 0 48px !important;
    }
  }
`;

const QuestTitleModal = () => {
  const {
    questModal: {
      data,
      loading,
      actions,
      questModalState,
      questModalSetFalse,
    },
  } = useModel("questModal");

  const quest = useMemo(
    () => (data?.data?.result?.records ? data?.data?.result?.records[0] : null),
    [data]
  );

  const curActions = useMemo(()=>{
    if(actions?.records){
      return actions?.records?.filter((i: any)=>i?.categories)
    }
    return null
  }, [actions])

  return (
    <StyledModal
      visible={questModalState}
      onClose={questModalSetFalse}
      onCancel={questModalSetFalse}
      title="Quest Title"
    >
      {!loading && quest ? (
        <div className="container row-between">
          <div className="column left">
            <div className="row">
              <div className="label">{quest?.active === 'Y' ? quest?.type : 'EXPIRED'}</div>
            </div>
            <div className="period">
              Valid period:&nbsp;
              <span>
                {format(new Date(quest?.issueDate), "dd/MM/yyyy")}-
                {format(new Date(quest?.deadline), "dd/MM/yyyy")}
              </span>
            </div>
            <div className="desc">
              <div dangerouslySetInnerHTML={{ __html: quest?.description }} />
            </div>
          </div>

          <div className="right column">
            <div className="period rewards">
              rewards:&nbsp;<span>{quest?.rewards || "-"}</span>
            </div>
            <div className="period date">
              Date:&nbsp;
              <span>{format(new Date(quest?.issueDate), "dd/MM/yyyy")}</span>
            </div>

            <div className="img-container column">
              <img src={quest?.image} alt="" />
            </div>
            <div className="column">
              <span className="link-desc">Please enter the link below</span>
              <div className="period column link">
                <div style={{ marginBottom: "12px" }}>Quest url link:</div>
                <div style={{ marginBottom: "32px" }}>{quest?.url}</div>
                <a target={"_blank"} href={quest?.url}>
                  <Button>Enter</Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="loading">
          <Loading />
        </div>
      )}
    </StyledModal>
  );
};

export default QuestTitleModal;
