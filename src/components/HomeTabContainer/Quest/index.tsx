import { getJoinedQuest, getActionList } from '@/server';
import { useBoolean, useClickAway, useRequest } from 'ahooks';
import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import ToggleIcon from '@/components/ToggleIcon';
import IconExpandArrow from '@/components/Icons/IconExpandArrow';
import IconTopRightArrow from '@/components/Icons/IconTopRightArrow';
import Loading from '@/components/Loading';
import { format } from 'date-fns';
import { DayPicker, DateRange } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import IconCalendar from '@/components/Icons/IconCalendar';
import Button from '@/components/Button';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const DayPickerContainer = styled.div`
  position: relative;
  .daypicker-container {
    padding: 22px 47px;
    display: flex;
    align-items: center;
    .date-trigger {
      border: 1px solid rgba(195, 212, 233, 0.2);
      border-radius: 70px;
      padding: 10px 16px;
      font-weight: 500;
      font-size: 14px;
      line-height: 150%;
      color: #a1a1a4;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 245px;
      cursor: pointer;
    }
  }

  .rdp {
    position: absolute;
    left: 680px;
    top: 0;
    margin: 0;
    background: #2b2b35;
    border-radius: 12px;
    padding: 22px 17px;
    z-index: 8;

    --rdp-cell-size: 40px;
    --rdp-accent-color: #00DBC9;
    --rdp-background-color: transparent;
    --rdp-accent-color-dark: #00DBC9;
    --rdp-background-color-dark: #00DBC9;
    --rdp-outline: none;
    --rdp-outline-selected: none;
  }
  .rdp-caption {
    font-weight: 600;
    font-size: 14px;
    line-height: 24px;
    color: #f8f7fa;
    display: flex;
    justify-content: center;
    .rdp-caption_label {
      font-weight: 600;
      font-size: 14px;
      line-height: 24px;
    }

    .rdp-dropdown_month,
    .rdp-dropdown_year {
      margin-right: 17px;
      padding: 6px 6px 6px 12px;
      border-radius: 6px;
      transition: all linear 0.1s;
      cursor: pointer;
      &:hover {
        background: #3d3d4d;
      }
    }
  }

  .rdp-tbody{
    .rdp-row > .rdp-cell:first-of-type > button{
      border-top-left-radius: 50%;
      border-bottom-left-radius: 50%;
    }

    .rdp-row > .rdp-cell:last-of-type > button{
      border-top-right-radius: 50%;
      border-bottom-right-radius: 50%;
    }
  }

  .rdp-cell {
    font-weight: 400;
    font-size: 13px;
    line-height: 24px;
    color: #c9c8cc;
    cursor: pointer;
    padding: 3px 0;

    .rdp-day {
      transition: all linear 0.1s;
      span {
        transition: all linear 0.1s;
      }
    }

    .rdp-day_selected {
      span {
        font-weight: 600 !important;
        color: #05050e;
      }
    }

    .rdp-day_range_start,
    .rdp-day_range_end {
      border-radius: 50%;
      position: relative;
    }

    .rdp-day_range_middle {
      background: rgba(0, 236, 201, 0.2);
      &:hover {
        border-radius: 0 !important;
      }
      span {
        color: #fff;
      }
    }

    .rdp-day {
      &:hover {
        span {
          color: #f8f7fa !important;
          font-weight: 600;
        }
        background: #3d3d4d;
        border-radius: 50%;
      }
    }

    .rdp:not([dir='rtl']) .rdp-day_range_start:not(.rdp-day_range_end) {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      &:after{
        content: '';
      }
    }

    .rdp:not([dir='rtl']) .rdp-day_range_end:not(.rdp-day_range_start) {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      &:after{
        content: '';
      }
    }
  }
`;

const Container = styled.div`
  background: rgba(255, 255, 255, 0.06);
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  padding-bottom: 47px;
  margin-top: 29px;
  .grid-title,
  .grid-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
    box-sizing: border-box;
    align-content: center;
    height: 50px;
  }
  .grid-title {
    color: #6a8d8d;
    padding: 12px 60px;
    align-items: center;
    background: #1a1a22;
  }
  .grid-container {
    padding: 0 47px;
  }
  .grid-content {
    padding: 12px;
    transition: all linear 0.2s;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    & > div {
      display: flex;
      align-items: center;
    }
    &:hover {
      background: rgba(0, 219, 201, 0.4);
    }
  }
  .expand-container {
    transition: max-height, min-height linear 0.1s, opacity 0.12s linear;
    min-height: 0px;
    max-height: 0px;
    opacity: 0;
    display: flex;
    &.active {
      min-height: 50px;
      max-height: fit-content;
      opacity: 1;
    }

    .grid-title,
    .grid-content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
      box-sizing: border-box;
      align-content: center;
      height: 50px;
    }
    .grid-title {
      color: #6a8d8d;
      padding: 12px 60px;
      align-items: center;
      background: #1a1a22;
    }
    .grid-container {
      padding: 0;
      width: 100%;
    }
    .grid-content {
      padding: 12px;
      transition: all linear 0.2s;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      color: rgba(255, 255, 255, 0.4);
      & > div {
        display: flex;
        align-items: center;
        overflow: hidden; //超出的文本隐藏
        text-overflow: ellipsis; //溢出用省略号显示
        white-space: nowrap; //溢出不换行
      }
      &:nth-of-type(odd) {
        background: rgba(255, 255, 255, 0.06);
      }
      &:nth-of-type(even) {
        background: rgba(255, 255, 255, 0.1);
      }

      &:hover {
        background: rgba(0, 219, 201, 0.4);
      }
    }
  }
`;

const ExpandContainer = ({ row, children }: any) => {
  const [status, { toggle }] = useBoolean(false);
  const { run, loading, data, error } = useRequest((id) => getActionList({ questKey: id }), {
    manual: true,
  });

  useEffect(() => {
    if (status) {
      run(row?.id);
    }
  }, [status]);

  const actionData = useMemo(() => data?.data?.result, [data]);

  const columns = [
    {
      name: 'No.',
      key: 'id',
      id: 'id',
      formatter({ index }: any) {
        return <div>/</div>;
      },
    },
    {
      name: 'Quest',
      key: 'title',
      id: 'Quest',
      grid: 'span 2',
      formatter({ row }: any) {
        return (
          <a style={{ color: 'rgba(255,255,255,.4)', textDecoration: 'none' }} href={row?.landingUrl} target="_blank">
            <Tippy content={row?.title}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span
                  style={{
                    maxWidth: '262px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    marginRight: '4px',
                    display: 'block',
                    flex: 1,
                  }}
                >
                  {row?.title || '/'}
                </span>{' '}
                <IconTopRightArrow />
              </div>
            </Tippy>
          </a>
        );
      },
    },
    {
      name: 'Rewards',
      key: 'rewards',
      id: 'Rewards',
      formatter({ row }: any) {
        return row?.rewards || 0 + ' points';
      },
    },
    {
      name: 'Type',
      key: 'type',
      id: 'Type',
      formatter({ row }: any) {
        return row?.actionType || '/';
      },
    },
    {
      name: 'Post Date',
      key: 'updateTime',
      id: 'Post Date',
      grid: 'span 2',
    },
    {
      name: 'Status',
      key: 'deadlineTime',
      id: 'Status',
      formatter({ row }: any) {
        return <div>{row?.status || '/'}</div>;
      },
    },
    {
      key: 'available',
      name: '',
      grid: 'none',
      width: '32px',
      formatter({ row, onExpandClick, expandStatus, ...props }: any) {
        return <div style={{ width: '32px' }} />;
      },
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {React.cloneElement(children, {
        expandStatus: status,
        onExpandClick: toggle,
      })}
      <div className={status ? `expand-container active` : `expand-container`}>
        {!loading ? (
          <div className="grid-container">
            {actionData?.map((i: any, index: number) => (
              <Row columns={columns} i={i} index={index} key={index} />
            ))}
          </div>
        ) : (
          <div
            style={{
              margin: '36px 0',
              width: '100%',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Loading />
          </div>
        )}
      </div>
    </div>
  );
};

const Expand = ({ row, onExpandClick, expandStatus }: any) => {
  return (
    <ToggleIcon state={expandStatus} onClick={onExpandClick}>
      <IconExpandArrow />
    </ToggleIcon>
  );
};

const Row = ({ columns, index, i, onExpandClick, expandStatus }: any) => {
  if (!columns) return null;
  return (
    <div className="grid-content" key={columns[index]?.key}>
      {columns?.map((j: any) => (
        <div
          key={j.key + 'row'}
          style={{
            width: i?.width || 'auto',
            gridColumnStart: `${j?.grid || 'span 1'}`,
          }}
        >
          {j?.formatter ? j?.formatter({ row: i, index, onExpandClick, expandStatus }) : i[j.key]}
        </div>
      ))}
    </div>
  );
};

export default ({ show }: any) => {
  // const { data: actionListData } = useRequest(getActionList)
  const { data: qustListData } = useRequest(getJoinedQuest);
  // const actions = useMemo(() => actionListData?.data?.result, [actionListData])
  const questList = useMemo(() => qustListData?.data?.result, [qustListData]);

  const columns = useMemo(
    () => [
      {
        name: 'No.',
        key: 'id',
        id: 'id',
        formatter({ index }: any) {
          return <>{index + 1}</>;
        },
      },
      {
        name: 'Quest',
        key: 'title',
        id: 'Quest',
        grid: 'span 2',
        formatter({ row }: any) {
          return (
            <a style={{ color: '#fff', textDecoration: 'none' }} href={row?.url} target="_blank">
              <Tippy content={row?.title}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span
                    style={{
                      maxWidth: '262px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      marginRight: '4px',
                      flex: 1,
                      display: 'block',
                    }}
                  >
                    {row?.title}
                  </span>
                  <IconTopRightArrow />
                </div>
              </Tippy>
            </a>
          );
        },
      },
      {
        name: 'Rewards',
        key: 'rewards',
        id: 'Rewards',
        formatter({ row }: any) {
          return row?.rewards || 0 + ' points';
        },
      },
      {
        name: 'Type',
        key: 'type',
        id: 'Type',
        formatter({ row }: any) {
          return row?.type || '/';
        },
      },
      {
        name: 'Post Date',
        key: 'issueDate',
        id: 'Post Date',
        grid: 'span 2',
      },
      {
        name: 'Status',
        key: 'deadlineTime',
        id: 'Status',
        formatter({ row }: any) {
          return <div style={{ opacity: 0.4 }}>{row?.type || '/'}</div>;
        },
      },
      {
        key: 'available',
        name: '',
        grid: 'none',
        width: '32px',
        formatter({ row, onExpandClick, expandStatus, ...props }: any) {
          return <Expand row={row} expandStatus={expandStatus} onExpandClick={onExpandClick} />;
        },
      },
    ],
    [],
  );

  const [showDayPicker, { setFalse, setTrue }] = useBoolean(false);

  const [selected, setSelected] = React.useState<DateRange | undefined>();
  const fromDate = useMemo(() => (selected?.from ? format(selected?.from, 'yyyy-MM-dd') : '-'), [selected?.from]);
  const toDate = useMemo(() => (selected?.to ? format(selected?.to, 'yyyy-MM-dd') : '-'), [selected?.to]);

  useClickAway(
    () => {
      if (showDayPicker) {
        setFalse();
      }
    },
    () => document.getElementsByClassName('daypicker-target')[0],
  );

  return (
    <Container>
      <DayPickerContainer className="daypicker-target">
        <DayPicker
          style={{ display: showDayPicker ? 'inline-block' : 'none' }}
          showOutsideDays
          fromYear={2022}
          toYear={2100}
          captionLayout="dropdown"
          mode="range"
          selected={selected}
          onSelect={setSelected}
          footer={
            <div
              style={{
                marginTop: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
              }}
            >
              <Button className="" type="cancel" onClick={setFalse}>
                Cancel
              </Button>
              <Button className="" onClick={setFalse}>
                Set Data
              </Button>
            </div>
          }
        />
        <div className="daypicker-container">
          <div className="date-trigger from-date" onClick={setTrue}>
            <div>{fromDate}</div>
            <IconCalendar />
          </div>
          <div style={{ margin: '0 16px' }}>-</div>
          <div className="date-trigger to-date" onClick={setTrue}>
            <div>{toDate}</div>
            <IconCalendar />
          </div>
        </div>
      </DayPickerContainer>

      <div className="grid-title">
        {columns?.map((i) => (
          <div
            style={{
              width: i?.width || 'auto',
              gridColumnStart: `${i?.grid || 'span 1'}`,
            }}
            key={i?.key}
          >
            {i?.name}
          </div>
        ))}
      </div>
      {questList ? (
        <div className="grid-container">
          {questList?.map((i: any, index: number) => (
            <ExpandContainer row={i}>
              <Row columns={columns} i={i} index={index} />
            </ExpandContainer>
          ))}
        </div>
      ) : (
        <div
          style={{
            marginTop: '48px',
            width: '100%',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Loading />
        </div>
      )}
    </Container>
  );
};
