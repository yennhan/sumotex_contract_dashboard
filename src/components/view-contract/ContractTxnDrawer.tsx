import { useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import { Close } from '@/components/icons/close';
import Button from '@/components/ui/button/button';
import SingleComparisonChart from '@/components/ui/chats/single-comparision-chart';
import Scrollbar from '@/components/ui/scrollbar';
import cn from 'classnames';
import BigNumber from 'bignumber.js';
import moment from 'moment';
interface TransactionsDrawerProps {
    isOpen: boolean;
    selectedData: {};
    setIsOpen: (isOpen: boolean) => void;
}
interface TransactionInfoTypes {
    label: string;
    value?: string | number |Array<String>;
    className?: string;
}

function TransactionInfo({
    label,
    value,
    className,
}: TransactionInfoTypes) {
    return (
        <div
            className={cn(
                'flex items-center justify-between dark:text-gray-300 py-2 border-black grid grid-cols-4 flex',
                className
            )}
        >
            <div className=''>
            <span className="font-medium">{label}</span>
            </div>
            <div  className=' grid-cols-2'>
            <p className='text-sm inline-block word-break-all'>{value ? value : '_ _'}</p>
            </div>
          
         
        </div>
    );
}

function ContractTransactionsDrawer({
    isOpen,
    setIsOpen,
    selectedData,
}: TransactionsDrawerProps) {
    const [data, setData] = useState(selectedData);
    useEffect(() => {
        setData(selectedData)
    }, [selectedData])
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-40 overflow-hidden"
                onClose={() => setIsOpen(false)}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Dialog.Overlay className="fixed inset-0 bg-gray-700 bg-opacity-60 backdrop-blur" />
                </Transition.Child>
                <Transition.Child
                    as={Fragment}
                    enter="transform transition ease-out duration-300"
                    enterFrom="ltr:translate-x-full rtl:-translate-x-full"
                    enterTo="translate-x-0"
                    leave="transform transition ease-in duration-300"
                    leaveFrom="translate-x-0"
                    leaveTo="ltr:translate-x-full rtl:-translate-x-full"
                >
                    <div className="fixed inset-y-0 w-full max-w-full bg-white/95 shadow-[0_0_80px_rgba(17,24,39,0.2)] backdrop-blur ltr:right-0 rtl:left-0 dark:bg-dark/90 sm:w-[550px] md:w-[650px] lg:w-[700px]">
                        <div className=" w-full">
                            <div className="flex h-16 items-center justify-between gap-6 border-b border-dashed border-gray-200 px-4 dark:border-gray-700 sm:px-6">
                                <h3 className="text-base font-medium uppercase text-gray-900 dark:text-white">
                                    Transaction Details
                                </h3>
                                <Button
                                    title="Close"
                                    color="white"
                                    shape="circle"
                                    variant="transparent"
                                    size="small"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <Close className="h-auto w-2.5" />
                                </Button>
                            </div>
                            <Scrollbar style={{ height: 'calc(50% - 64px)' }}>
                                <div
                                    className={`h-full rounded-br-lg rounded-tr-lg p-4 dark:bg-transparent sm:p-8 ${'dark:2xl:bg-light-dark'}`}>
                                    <div className="mb-5 border-b border-dashed border-gray-200 pb-5 dark:border-gray-800 xs:mb-7 xs:pb-6">
                                        <div className="flex flex-col gap-2 xs:gap-[18px]">
                                            <TransactionInfo label={'Nonce'} value={data.nonce} />
                                            <TransactionInfo label={'Transaction Hash'} value={data.txn_hash} />
                                            <TransactionInfo label={'From Address'} value={data.caller_address} />
                                            <TransactionInfo label={'To Address'} value={data.to_address} />
                                            <TransactionInfo label={'Transaction Type'} value={data.txn_type} />
                                            <TransactionInfo label={'Status'} value={data.status == 0 ? "Pending" : data.status == 1 ? "In progress" : data.status == 2 ? "Completed" : ""} />
                                            <TransactionInfo label={'Value'} 
                                                value={new BigNumber(data.value).dividedBy(new BigNumber(10).pow(18)).toFixed(18) +" SMTX"}/>
                                            <TransactionInfo label={'Gas Fee'}  
                                             value={new BigNumber(data.gas_cost).dividedBy(new BigNumber(10).pow(18)).toFixed(18) +" SMTX"}/>
                                            <TransactionInfo label={'Date'} value={moment.unix(data.timestamp).format("DD/MM/YYYY HH:MM")} />
                                            <TransactionInfo label={'Signature'} value={data.signature} />
                                        </div>
                                    </div>
                                </div>
                            </Scrollbar>
                        </div>
                    </div>
                </Transition.Child>
            </Dialog>
        </Transition>
    );
}

export default ContractTransactionsDrawer;
