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
interface BlocksDrawerProps {
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
    const isValueArray = Array.isArray(value); 
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
            <div  className=' grid-cols-3'>
            {isValueArray ? (
                    // Render each element of the array
                    value.map((item, index) => (
                        <p key={index} className='text-xs'>
                            {item},
                        </p>
                    ))
                ) : (
                    // Render a single value or placeholder if it's not an array
                    <p className='text-sm inline-block word-break-all'>
                        {value ? value : '_ _'}
                    </p>
                )}
            </div>
          
        </div>
    );
}

function BlockDrawer({
    isOpen,
    setIsOpen,
    selectedData,
}: BlocksDrawerProps) {
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
                                            <TransactionInfo label={'Block'} value={data.id} />
                                            <TransactionInfo label={'Hash'} value={data.public_hash} />
                                            <TransactionInfo label={'Prev Hash'} value={data.previous_hash} />
                                            <TransactionInfo label={'Private Hash'} value={data.private_hash} />
                                            <TransactionInfo label={'Date'} value={moment.unix(data.timestamp).format("DD/MM/YYYY HH:MM")} />
                                            <TransactionInfo label={'Transactions'} value={data.transactions} />
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

export default BlockDrawer;
