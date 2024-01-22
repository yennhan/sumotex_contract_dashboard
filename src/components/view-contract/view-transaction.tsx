'use client';

import React, { useEffect,useState } from 'react';
import { Star } from '@/components/icons/star';
import { useBreakpoint } from '@/lib/hooks/use-breakpoint';
import { useIsMounted } from '@/lib/hooks/use-is-mounted';
import ContractTransactionAccordionTable from './contract-accordion-table';
import ContractTransactionDrawerTable from './contract-drawer-table';
import { CoinPriceData } from '@/data/static/coin-market-data';
import BigNumber from 'bignumber.js';
import moment from 'moment';
const COLUMNS = [
    {
        Header: '#',
        accessor: 'nonce',
        minWidth: 60,
        maxWidth: 60,
    },
    {
        Header: () => <div className="">Type</div>,
        accessor: 'txn_type',
        minWidth: 60,
        maxWidth: 150,
    },
    {
        Header: () => <div className="">Date</div>,
        accessor: 'timestamp',
        // @ts-ignore
        Cell: ({ cell: { value } }) => (
            <div className="">{moment.unix(value).format("DD/MM/YYYY HH:MM")}</div>
        ),
        minWidth: 100,
        maxWidth: 200,
    },
    {
        Header: () => <div className="">From</div>,
        accessor: 'caller_address',
        // @ts-ignore
        Cell: ({ cell: { value } }) => (
            <div className="">{value.slice(0,4)}...{value.slice(-4)}</div>
        ),
        minWidth: 100,
        maxWidth: 150,
    },
    {
        Header: () => <div className="">To</div>,
        accessor: 'to_address',
        // @ts-ignore
        Cell: ({ cell: { value } }) => (
            <div className="">{value.slice(0,4)}...{value.slice(-4)}</div>
        ),
        minWidth: 100,
        maxWidth: 150,
    },

    {
        Header: () => <div className="">Hash</div>,
        accessor: 'txn_hash',
        // @ts-ignore
        Cell: ({ cell: { value } }) => (
            <div className="flex items-center">
                {value.slice(0,10)}...
            </div>
        ),
        minWidth: 200,
        maxWidth: 250,
    },
    {
        Header: () => <div className="">Status</div>,
        accessor: 'status',
        //0=Submit
        //1=Sign but pending block creation
        // @ts-ignore
        Cell: ({ cell: { value } }) => (
            <div className="">{value==0?"Pending":value==1?"In progress":value==2?"Completed":null}</div>
        ),
        minWidth: 80,
        maxWidth: 150,
    },
    {
        Header: () => <div className="">Value</div>,
        accessor: 'value',
        // @ts-ignore
        Cell: ({ cell: { value } }) => (
            <div className="-tracking-[1px] ltr:text-right rtl:text-left">
                <p className="mb-0.5 ">
                {new BigNumber(value).dividedBy(new BigNumber(10).pow(18)).toFixed(18)}
                    <span className="inline-block text-sm ltr:ml-1.5 rtl:mr-1.5 md:ltr:ml-2 md:rtl:mr-2">
                        SMTX
                    </span>
                </p>
            </div>
        ),
        minWidth: 100,
        maxWidth: 200,
    },
    {
        Header: () => <div className="">Gas Fee</div>,
        accessor: 'gas_cost',
        // @ts-ignore
        Cell: ({ cell: { value } }) => (
            <div className="-tracking-[1px]">
                <p className="mb-0.5 ">
                {new BigNumber(value).dividedBy(new BigNumber(10).pow(18)).toFixed(18)}
                    <span className="inline-block text-sm ltr:ml-1.5 rtl:mr-1.5 md:ltr:ml-2 md:rtl:mr-2">
                        SMTX
                    </span>
                </p>
            </div>
        ),
        minWidth: 100,
        maxWidth: 200,
    },
];


export default function ContractTransactionTable(props:any) {
    // const { coins } = useCoins();
    // const data = React.useMemo(() => coins, [coins]);

    const [data,setData]=useState([])
    const columns = React.useMemo(() => COLUMNS, []);
    useEffect(()=>{
        setData(props.data)
    },[props])
    const isMounted = useIsMounted();
    const breakpoint = useBreakpoint();

    return isMounted &&
        ['xs', 'sm', 'md', 'lg', 'xl'].indexOf(breakpoint) !== -1 ? (
        <ContractTransactionDrawerTable columns={columns} data={data} />
    ) : (
        <ContractTransactionAccordionTable columns={columns} data={data} />
    );
}
