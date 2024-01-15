'use client';

import React from 'react';
import { Star } from '@/components/icons/star';
import { useBreakpoint } from '@/lib/hooks/use-breakpoint';
import { useIsMounted } from '@/lib/hooks/use-is-mounted';
import { CoinPriceData } from '@/data/static/coin-market-data';
import moment from 'moment';
import BlockDrawerTable from './block-drawer-table';
import BlockAccordionTable from './block-accordion-table';

const COLUMNS = [
    {
        Header: '#',
        accessor: 'id',
        minWidth: 20,
        maxWidth: 20,
    },
    {
        Header: "Date",
        accessor: 'timestamp',
        // @ts-ignore
        Cell: ({ cell: { value } }) => (
            <p className="">{moment.unix(value).format("MM/DD/YYYY HH:MM")}</p>
        ),
        minWidth: 60,
        maxWidth: 60,
    },
    {
        Header: "Current Hash",
        accessor: 'public_hash',
        // @ts-ignore
        Cell: ({ cell: { value } }) => (
            <p className="">{value}</p>
        ),
        minWidth: 300,
        maxWidth: 500,
    },
    {
        Header: () => <div className="ml-4">Prev Hash</div>,
        accessor: 'previous_hash',
        // @ts-ignore
        Cell: ({ cell: { value } }) => (
            <p className="ml-4">{value}</p>
        ),
        minWidth: 320,
        maxWidth: 500,
    },
    {
        Header: () => "-",
        accessor: 'value',
        // @ts-ignore
        Cell: ({ cell: { value } }) => (
            <div className="">
                <p className="">
                    <button className="">
                        View
                    </button>
                </p>
            </div>
        ),
        minWidth: 40,
        maxWidth: 40,
    },
];


export default function BlockTable(props: any) {
    // const { coins } = useCoins();
    // const data = React.useMemo(() => coins, [coins]);
    const data = React.useMemo(() => props.data, []);
    const columns = React.useMemo(() => COLUMNS, []);

    const isMounted = useIsMounted();
    const breakpoint = useBreakpoint();
    return isMounted &&
        ['xs', 'sm', 'md', 'lg', 'xl'].indexOf(breakpoint) !== -1 ? (
        <BlockDrawerTable columns={columns} data={data} />
    ) : (
        <BlockAccordionTable columns={columns} data={data} />
    );
}
