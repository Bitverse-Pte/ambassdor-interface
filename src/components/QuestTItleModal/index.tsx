import { useEffect, useMemo } from "react";
import styled from "styled-components";
import { useModel } from "umi";
import Loading from "../Loading";
import Modal from "../Modal";
import defaultImg from "@/assets/default-quest-bg.png"

const StyledModal = styled(Modal)`
  .inner {
    max-width: inherit;
    width: 890px;
    height: max-content;
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
    padding: 80px 0 30px;
  }

  .container {
    align-items: flex-start !important;
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
    & * {
      color: #fff !important;
      text-align: left !important;
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
        object-fit: contain;
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
    .period.rewards {
      margin-bottom: 0 !important;
    }
    .period.rewards {
      margin-bottom: 8px 0 48px !important;
    }
  }
`;

const QuestTitleModal = () => {
  const {
    questModal: { run, data, loading, questModalState, questModalSetFalse },
  } = useModel("questModal");

  //   useEffect(()=>{
  //     if(questModalState){
  //         // run()
  //     }
  //   }, [questModalState])

  const quest = useMemo(
    () => (data?.data?.result?.records ? data?.data?.result?.records[0] : null),
    [data]
  );

  return (
    <StyledModal
      visible={questModalState}
      onClose={questModalSetFalse}
      onCancel={questModalSetFalse}
      title="Quest Title"
    >
      {!loading && quest ? (
        <div className="container row-between">
          <div className="col left">
            <div className="row">
              <div className="label">Story Line</div>
              <div className="label">Story Line</div>
              <div className="label">Story Line</div>
            </div>
            <div className="period">
              Valid period:&nbsp;<span>11/11/2022-11/11/2022</span>
            </div>
            <div className="desc">
              <div dangerouslySetInnerHTML={{ __html: quest?.description }} />
            </div>
          </div>

          <div className="right col">
            <div className="period rewards">
              rewards:&nbsp;<span>1000 TELE ｜ 1 NFT</span>
            </div>
            <div className="period date">
              Date:&nbsp;<span>11/11/2022</span>
            </div>

            <div className="img-container col">
              <img src={quest?.image} alt="" />
            </div>
            <div className="col">
              <span className="link-desc">Please enter the link below</span>
              <div className="period col">
                <div style={{marginBottom: '12px'}}>Quest url link:</div>
                <a target={"_blank"} href={quest?.url}>
                  {quest?.url}
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
