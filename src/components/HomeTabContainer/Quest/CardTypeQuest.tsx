import Loading from "@/components/Loading";
import { getQuestList } from "@/server";
import { useRequest } from "ahooks";
import { useEffect, useMemo } from "react";
import styled from "styled-components";
import { useModel } from "umi";
import ReactPaginate from "react-paginate";
import Tippy from "@tippyjs/react";


const removeHtmlStyle = (html: string) => html.replaceAll(/style="[^\"]*?"/g, '')


const Container = styled.div`
    .loading{
        padding: 168px 0 117px;
    }
  .grid {
    width: 100%;
    padding: 168px 0 117px;
    display: grid;
    grid-gap: 84px;
    justify-content: center;
    grid-template-columns: repeat(
      auto-fit,
      min(424px, calc(100% / 3 - 28px * 2))
    );
  }

  .list {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .pagination{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;

    li{
        background: rgba(255, 255, 255, 0.3);
        border-radius: 4px;
        width: 28px;
        height: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        a{
            color: #fff;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
    .selected{
        background: #00C6A9;
    }
    .disabled{
        filter: opacity(0.5);
    }
  }
`;

const Card = styled.div<{ backgroundColor?: string }>`
  background: ${({ backgroundColor }) => backgroundColor};
  aspect-ratio: 425/224;
  border-radius: 12px;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;

  .col {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  .row-between {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .vertical-divider {
    width: 1px;
    height: 30px;
    background: #ffffff;
    opacity: 0.2;
    border-radius: 32px;
    margin: 0 34px;
  }

  .top {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    flex: 1;
    padding: 0 30px;
    box-sizing: border-box;
    .left {
      font-weight: 500;
      /* font-size: 20px; */
      line-height: 30px;
      font-size: 110%;
    }
    .col {
      font-weight: 500;
      /* font-size: 16px; */
      line-height: 24px;
      font-size: 90%;
    }
  }
  .divider {
    width: 100%;
    height: 4px;
    background: #05050e;
    padding: 2px 0 0 0;
    box-sizing: border-box;
    .line {
      width: 44%;
      height: 2px;
      background: ${({ backgroundColor }) => backgroundColor};
    }
  }
  .bottom {
    width: 100%;
    height: 38%;
    background: linear-gradient(
        0deg,
        rgba(255, 255, 255, 0.1),
        rgba(255, 255, 255, 0.1)
      ),
      #0a0a13;
    padding: 0 24px;
    box-sizing: border-box;
    .title{
        width: 112px;
        overflow: hidden; //超出的文本隐藏
        text-overflow: ellipsis; //溢出用省略号显示
        white-space: nowrap; //溢出不换行
    }
    .desc {
      height: 24px;
      width: 158px;
      overflow: hidden; //超出的文本隐藏
      text-overflow: ellipsis; //溢出用省略号显示
      white-space: nowrap; //溢出不换行
      color: rgba(255, 255, 255, 0.5);
      margin-top: 3px;
      font-size: 80%;
      font-size: 16px;
      & *{
        line-height: 24px;
        width: 158px;
        overflow: hidden; //超出的文本隐藏
        text-overflow: ellipsis; //溢出用省略号显示
        white-space: nowrap; //溢出不换行
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
  }
`;

const CardTypeQuest = ({ show, label, color }: any) => {
  const { loading, data, run, error } = useRequest(getQuestList, {
    manual: true,
  });

  const {
    user: { auth },
  } = useModel("userInfo");

  const {
    questModal: { questModalSetTrue, run: questModalRun },
  } = useModel("questModal");

  useEffect(() => {
    if (auth) {
      run();
    }
  }, [auth]);

  const quests = useMemo(() => data?.data?.result?.records, [data]);
  const currentPage = useMemo(() => data?.data?.result?.current, [data]);
  const totalPage = useMemo(() => data?.data?.result?.pages, [data]);

  const handlePageClick = (event: any) => {
    run({page: event?.selected})
  };

  const handleClick = (questKey: string)=>{
    questModalRun({questKey, page: 0})
    questModalSetTrue()
  }

  return (
    <Container>
      {!loading && quests ? (
        <div className="list">
          <div className="grid">
            {quests?.map((i) => (
              <Card key={i?.id} backgroundColor={color} onClick={()=>handleClick(i?.questKey)}>
                <div className="top">
                  <div className="left">Quest Rewards</div>
                  <div className="vertical-divider" />
                  <div className="col">
                    <div>{i?.rewards || 0} Points</div>
                    <div>cl1 NFT</div>
                  </div>
                </div>
                <div className="divider">
                  <div className="line" />
                </div>
                <div className="bottom row-between">
                  <div className="col">
                    <Tippy content={i?.title}>
                      <div className="title">{i?.title}</div>
                    </Tippy>
                    <Tippy content={
                         <div dangerouslySetInnerHTML={
                          {__html: removeHtmlStyle(i?.description)}
                        }/>
                    }>
                      <div className="desc">
                        <div dangerouslySetInnerHTML={
                          {__html: removeHtmlStyle(i?.description)}
                        }/>
                      </div>
                    </Tippy>
                  </div>
                  <div className="label">{label}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <div className="loading"><Loading /></div>
      )}
      {
        totalPage && (
            <ReactPaginate
            className="pagination"
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            pageCount={totalPage}
            previousLabel="<"
          />
        )
      }
      
    </Container>
  );
};

export default CardTypeQuest;
