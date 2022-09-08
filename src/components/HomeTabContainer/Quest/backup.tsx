import { getJoinedQuest, getActionList } from "@/server"
import { useRequest } from "ahooks"
import { useMemo } from "react"
import styled from "styled-components"
import { useTable, useExpanded } from 'react-table'

const Container = styled.div`
 background-color: rgba(255,255,255,0.06);
 /* padding: 0 47px 47px; */
`

const StyledTable = styled.div`
font-weight: 400;
font-size: 16px;
line-height: 24px;
    thead{
        background: #1A1A22;
        border-radius: 0px;
        font-weight: 500;
        font-size: 16px;
        line-height: 24px;
        text-transform: capitalize;
        color: #6A8D8D;
    }
    tbody{
        padding: 0 47px 47px;
        tr{
            background: linear-gradient(0deg, rgba(30, 45, 59, 0.5), rgba(30, 45, 59, 0.5)), rgba(0, 219, 201, 0.06);
        }
    }
`

const Table = ({ columns, data }: any) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        // @ts-ignore
        state: { expanded },
    } = useTable(
        {
            columns,
            data,
        },
        useExpanded // Use the useExpanded plugin hook
    )
    return (
        <>
            <StyledTable {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup, index) => (
                        <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                            {headerGroup.headers.map((column, index) => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()} key={i}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </StyledTable>
        </>
    )
}

export default ({ show }: any) => {

    const { data: actionListData } = useRequest(getActionList)
    const { data: qustListData } = useRequest(getJoinedQuest)

    const actions = useMemo(() => actionListData?.data?.result, [actionListData])

    // No. Quest Rewards Type Post-Date Status expand
    const columns = [
        {
            Header: 'No.',
            accessor: 'id',
            id: 'id'
        },
        {
            Header: 'Quest',
            accessor: 'actionType',
            id: 'Quest'
        },
        {
            Header: 'Rewards',
            accessor: 'age',
            id: 'Rewards'
        },
        {
            Header: 'Type',
            accessor: 'actionType',
            id: 'Type'
        },
        {
            Header: 'Post Date',
            accessor: 'syncTime',
            id: 'Post Date'
        },
        {
            Header: 'Status',
            accessor: 'status',
            id: 'Status'
        },
        // {
        //     // Build our expander column
        //     id: 'expander', // Make sure it has an ID
        //     Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }: any) => (
        //         <span {...getToggleAllRowsExpandedProps()}>
        //             {isAllRowsExpanded ? '👇' : '👉'}
        //         </span>
        //     ),
        //     Cell: ({ row }: any) =>
        //         // Use the row.canExpand and row.getToggleRowExpandedProps prop getter
        //         // to build the toggle for expanding a row
        //         row.canExpand ? (
        //             <span
        //                 {...row.getToggleRowExpandedProps({
        //                     style: {
        //                         // We can even use the row.depth property
        //                         // and paddingLeft to indicate the depth
        //                         // of the row
        //                         paddingLeft: `${row.depth * 2}rem`,
        //                     },
        //                 })}
        //             >
        //                 {row.isExpanded ? '👇' : '👉'}
        //             </span>
        //         ) : null,
        // },
    ]


    if (!actions) return;



    return (<Container>
        <Table columns={columns} data={actions} />
    </Container>)
}

