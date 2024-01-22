'use client';
import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import Button from '@/components/ui/button';
import axios from 'axios';
import Input from '@/components/ui/forms/input';
import InputLabel from '@/components/ui/input-label';
import { Suspense } from 'react';
import { StaticImageData } from 'next/image';
import ParamTab, { TabPanel } from '@/components/ui/param-tab';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Loader from '@/components/ui/loader';
import { useParams } from 'react-router-dom'; // Import useParams from react-router-dom
import routes from '@/config/routes';
import ContractTransactionTable from './view-transaction';
import ViewFunctionScreen from './view-function';
export default function ViewContractScreen() {

    const [contractAddress, setContractAddress] = useState("");
    const [loading, setLoading] = useState(false);
    const [txn, setContractTxn] = useState([]);
    const clientAxios = axios.create();
    const fetchContractTransactions = async (thePubAddress: String) => {
        await clientAxios.post('https://rpc.sumotex.co/get-caller-transactions',
            JSON.stringify({
                "pub_address": thePubAddress
            }), {})
            .then(res => {
                var theArray:[]= res.data.result.transactions;
                console.log(theArray)
                if (Array.isArray(theArray)) {
                    setContractTxn(txn => [...txn, ...theArray]);
                } else {
                    console.error('Received data is not an array:', theArray);
                }
            })
            .catch((error) => {
                console.error('Error making POST request:', error.response || error);
                // Handle errors appropriately
            });
    }
    const fetchContractBTransactions = async (thePubAddress: String) => {
        await clientAxios.post('https://rpc.sumotex.co/get-receiver-transactions',
            JSON.stringify({
                "pub_address": thePubAddress
            }), {})
            .then(res => {
                var theArray: [] = res.data.result.transactions;
                if (Array.isArray(theArray)) {
                    setContractTxn(txn => [...txn, ...theArray]);
                } else {
                    console.error('Received data is not an array:', theArray);
                }
            })
            .catch((error) => {
                console.error('Error making POST request:', error.response || error);
                // Handle errors appropriately
            });
    }
    const getTotalTokens = async (contractAddress:String) => {
        await clientAxios.post("https://rpc.sumotex.co/call-contract",
            JSON.stringify({
                "contract_address": contractAddress,
                "caller_address": "03a43d2ee9aadf9049c6e6c608d0269aac3bd7d8fd5b8f5bf315afebae860f228c",
                "private_key": "4b1bb5d4a73e777fbcd978044c8de20d0f714abb76e2e9fdd555cd44ec72beb8",
                "function_name": "total_tokens",
                "args_values": "[]",
                "args_input": "[]",
                "args_output": "[{\"name\": \"output\", \"type\": \"i64\"}]"
            }), {})
            .then(res => {
                console.log(res);
            })
            .catch((error) => {
                console.error('Error making total tokens request:', error.response || error);
                // Handle errors appropriately
            });
    }
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const addressFromURL = urlParams.get('contractAddress');
        if (addressFromURL) {
            setContractAddress(addressFromURL)
            fetchContractTransactions(addressFromURL)
            fetchContractBTransactions(addressFromURL)
            getTotalTokens(addressFromURL);
        }

    }, [contractAddress]); // Empty dependency array means this effect runs once on mount



    return (
        <>
            <div className="flex flex-wrap">
                <div className="mb-6 grid grid-cols-3 gap-12 sm:mb-10">
                    <div className="col-span-3 flex items-center justify-between lg:col-span-2">
                        <h2 className="text-lg font-medium uppercase tracking-wider text-gray-900 dark:text-white  sm:text-2xl">
                            Contract
                        </h2>
                    </div>
                </div>
            </div>
            <ToastContainer
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
            />
            <div className="flex row mt-8 grid gap-6 sm:my-10 md:grid-cols-1">
                <div className='grid grid-cols-1 flex row'>
                    <div className="border border-solid border-gray-200 p-4 rounded  dark:text-white gap-4">
                        <div className="flex flex-col">
                            {/* Name */}
                            <div className="mt-1.5 inline-flex items-center text-sm -tracking-wider text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white xl:mt-2.5">
                                <p>Name Tag:{contractAddress}</p>
                            </div>
                            <div className="mt-1.5 inline-flex items-center text-sm -tracking-wider text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white xl:mt-2.5">
                                <p>Contract Balance: $0 SMTX</p>
                            </div>
                            <div className="mt-1.5 inline-flex items-center text-sm -tracking-wider text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white xl:mt-2.5">
                                <p>Actions: 1</p>
                            </div>
                        </div>
                        <div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="mt-5 flex flex-col pb-5 xl:mt-9">
                <Suspense fallback={<Loader variant="blink" />}>
                    <ParamTab
                        tabMenu={[
                            {
                                title: 'Transactions',
                                path: 'transactions',
                            },

                            {
                                title: 'Internal Actions',
                                path: 'internalAction',
                            },
                            {
                                title: 'Token Holders',
                                path: 'tokenHolder',
                            },
                            {
                                title: 'Contract',
                                path: 'action',
                            },
                        ]}
                    >
                        <TabPanel className="focus:outline-none">
                            <div className="space-y-6">
                                {txn && txn.length > 0 ? <ContractTransactionTable data={txn} /> : null}
                            </div>
                        </TabPanel>
                        <TabPanel className="focus:outline-none">
                            <div className="flex flex-col-reverse">
                                <ContractTransactionTable data={txn} />
                            </div>
                        </TabPanel>
                        <TabPanel className="focus:outline-none">
                            <div className="flex flex-col-reverse">
                            </div>
                        </TabPanel>
                        <TabPanel className="focus:outline-none">
                            <div className="flex flex-col-reverse">
                                <ViewFunctionScreen />
                            </div>
                        </TabPanel>
                    </ParamTab>
                </Suspense>
            </div>
        </>
    );
}
