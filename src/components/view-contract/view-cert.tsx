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
import BigNumber from 'bignumber.js';
import moment from 'moment';
import Image from '@/components/ui/image';
import ContractTransactionTable from './view-transaction';
import ViewFunctionScreen from './view-function';

export default function ViewCertScreen() {

    const [selectedWallet, setSelectedWallet] = useState({
        wallet_address: "",
        private_key: ""
    });
    const [token,setToken]=useState(-1);
    const [wallets, setWallets] = useState([]);
    const [contractAddress, setContractAddress] = useState("");
    const [txnDetail, setTxn] = useState({
        // Add other expected properties with default values here
    });
    const [tokenDetail, setTokenDetail] = useState({
        ipfs: ""

    });
    const [loading, setLoading] = useState(true);
    const [txn, setContractTxn] = useState([]);
    const clientAxios = axios.create();
    const fetchContractTransactions = async (thePubAddress: String) => {
        await clientAxios.post('https://rpc.sumotex.co/get-caller-transactions',
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
    const fetchContractDetail = async (theCA: String) => {
        try {
            await fetch('https://rpc.sumotex.co/read-contract', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "contract_address": theCA
                })
            })
                .then(res => {
                    if (!res.ok) {
                        throw new Error(`HTTP error! Status: ${res.status}`);
                    }
                    return res.json();
                })
                .then(data => {
                    setContractDetail(data.result.contract_detail);
                })
                .catch(error => console.error('Error:', error));
        } catch (error) {
            console.error('Error:', error);
        }
    }
    const getTotalTokens = async (contractAddress: String) => {
        try {
            await fetch('https://rpc.sumotex.co/call-contract', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "contract_address": contractAddress,
                    "caller_address": "02a70cc88b21ffe4c2dc43ea57b149c3a31db11cc8d1f3a580bd8573785b8b9fc3",
                    "private_key": "021b5dc9824a6c37a7a2a3b06f1eb451db4db9a36e3a75a1888baa19c92dff45",
                    "function_name": "total_tokens",
                    "args_values": "[]",
                    "args_input": "[]",
                    "args_output": "[{\"name\": \"output\", \"type\": \"i64\"}]"
                })
            })
                .then(res => {
                    if (!res.ok) {
                        throw new Error(`HTTP error! Status: ${res.status}`);
                    }
                    return res.json();
                })
                .then(data => {
                    console.log(data);
                })
                .catch(error => console.error('Error:', error));
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const readToken = async (address:String,id: Number) => {
        try {
            await fetch('https://rpc.sumotex.co/read-token-by-id', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "contract_address": address,
                    "token_id": Number(id)
                })
            })
                .then(res => {
                    if (!res.ok) {
                        throw new Error(`HTTP error! Status: ${res.status}`);
                    }
                    return res.json();
                })
                .then(data => {
                    setTokenDetail(data.result);
                    setLoading(false);
                })
                .catch(error => {
                    toast(error)
                    console.error('Fetch Error:', error);
                });
        } catch (error) {
            console.error('Try-Catch Error:', error);
        }

    }
    const readTxn = async (txn_hash:String) => {
        try {
            await fetch('https://rpc.sumotex.co/read-transaction', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "txn_hash": txn_hash
                })  
            })
                .then(res => {
                    if (!res.ok) {
                        throw new Error(`HTTP error! Status: ${res.status}`);
                    }
                    return res.json();
                })
                .then(data => {
                    setTxn(data.result);
                    console.log(data.result);
                })
                .catch(error => {
                    toast(error)
                    console.error('Fetch Error:', error);
                });
        } catch (error) {
            console.error('Try-Catch Error:', error);
        }

    }
    useEffect(() => {
        const walletsString = localStorage.getItem("wallets");
        const theWallets = walletsString ? JSON.parse(walletsString) : [];
        if (walletsString && theWallets) {
            //fetchWalletTransactions(theWallets[0].wallet_address);
            setWallets(theWallets);
            setSelectedWallet(theWallets[0]);
        }
        async function fetchData() {
            const urlParams = new URLSearchParams(window.location.search);
            const addressFromURL = urlParams.get('contractAddress');
            const tokenId = urlParams.get('token_id');
            if (addressFromURL && tokenId) {
                await setContractAddress(addressFromURL);

                try {
                    await Promise.all([
                        //fetchContractDetail(addressFromURL),
                        setToken(Number(tokenId)),
  
                        //getTotalTokens(addressFromURL),
                    ]);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
        }
        
        fetchData();
    }, []); // Dependency array depends on your specific needs
    useEffect(()=>{
        setLoading(true);
        const urlParams = new URLSearchParams(window.location.search);
        const addressFromURL = urlParams.get('contractAddress');
        const tokenId = urlParams.get('token_id');
        const txn_hash = urlParams.get('txn_hash');
        if(addressFromURL){
            readToken(addressFromURL,Number(tokenId));
            readTxn(txn_hash);
        }

    },[contractAddress])
    useEffect(()=>{
        const urlParams = new URLSearchParams(window.location.search);
        const addressFromURL = urlParams.get('contractAddress');
        const tokenId = urlParams.get('token_id');
        const txn_hash = urlParams.get('txn_hash');
        if(txn_hash){
            readTxn(txn_hash);
        }

    },[contractAddress])
    useEffect(()=>{
        if (selectedWallet.wallet_address!==""){
            fetchContractBTransactions(selectedWallet.wallet_address);
            fetchContractTransactions(selectedWallet.wallet_address);
        }
    },[selectedWallet])
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
                    'flex items-center justify-between dark:text-gray-300 py-2 border-black grid grid-cols-2 flex',
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
    return (
        <>
            <div className="flex flex-wrap">
                <div className="mb-6 grid grid-cols-3 sm:mb-10">
                    <div className="col-span-3 flex items-center justify-between lg:col-span-2">
                        <h2 className="text-lg font-medium uppercase tracking-wider text-gray-900 dark:text-white  sm:text-2xl">
                            View NFT
                        </h2>
                    </div>
                </div>
            </div>
            <ToastContainer
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
            />
            <div className="flex row mt-8 grid gap-2 sm:my-10 md:grid-cols-2">
                <div className='grid flex row'>
                    <div className="border border-solid border-gray-200 p-4 rounded  dark:text-white gap-4">
                        {loading ? <div>Loading</div> : <div className="flex flex-col">
                            <Image alt="NFTs"
                                className='border rounded'
                                width={600}
                                height={700}
                                src={tokenDetail.ipfs} />
                            <div className="mt-1.5 inline-flex items-center text-sm -tracking-wider text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white xl:mt-2.5">
                                <p>Contract Address: {contractAddress}</p>
                            </div>
                            <div className="mt-1.5 inline-flex items-center text-sm -tracking-wider text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white xl:mt-2.5">
                                <p>Token ID: {token} </p>
                            </div>
                            <div className="mt-1.5 inline-flex items-center text-sm -tracking-wider text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white xl:mt-2.5">
                                <p>Owner Address: {tokenDetail.owner_address} </p>
                            </div>
                            <div className="mt-1.5 inline-flex items-center text-sm -tracking-wider text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white xl:mt-2.5">
                                <p>Email: {tokenDetail.owner_id} </p>
                            </div>
                            <div className='mt-8'>
                            <p>Transaction Details</p>
                                </div>
                         
                            <div className="mt-1.5 inline-flex items-center text-sm -tracking-wider text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white xl:mt-2.5">
                            <div
                                    className={` rounded-br-lg rounded-tr-lg p-4 dark:bg-transparent sm:p-8 ${'dark:2xl:bg-light-dark'}`}>
                                    <div className="mb-5 border-b border-dashed border-gray-200 pb-5 dark:border-gray-800 xs:mb-7 xs:pb-6">
                                        <div className="flex flex-col gap-2 xs:gap-[18px]">
                                            <TransactionInfo label={'Nonce'} value={txnDetail.nonce} />
                                            <TransactionInfo label={'Transaction Hash'} value={txnDetail.txn_hash} />
                                            <TransactionInfo label={'From Address'} value={txnDetail.caller_address} />
                                            <TransactionInfo label={'To Address'} value={txnDetail.to_address} />
                                            <TransactionInfo label={'Transaction Type'} value={txnDetail.txn_type} />
                                            <TransactionInfo label={'Status'} value={txnDetail.status == 0 ? "Pending" : txnDetail.status == 1 ? "In progress" : txnDetail.status == 2 ? "Completed" : ""} />
                                            <TransactionInfo label={'Value'} 
                                                value={new BigNumber(txnDetail.value).dividedBy(new BigNumber(10).pow(18)).toFixed(18) +" SMTX"}/>
                                            <TransactionInfo label={'Gas Fee'}  
                                             value={new BigNumber(txnDetail.gas_cost).dividedBy(new BigNumber(10).pow(18)).toFixed(18) +" SMTX"}/>
                                            <TransactionInfo label={'Date'} value={moment.unix(txnDetail.timestamp).format("DD/MM/YYYY HH:MM")} />
                                            <TransactionInfo label={'Signature'} value={txnDetail.signature} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>}
                        <div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}
