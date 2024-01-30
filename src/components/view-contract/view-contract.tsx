'use client';
import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import Button from '@/components/ui/button';
import axios from 'axios';
import Input from '@/components/ui/forms/input';
import InputLabel from '@/components/ui/input-label';
import { Suspense } from 'react';
import { StaticImageData } from 'next/image';
import AnchorLink from '@/components/ui/links/anchor-link';
import ParamTab, { TabPanel } from '@/components/ui/param-tab';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Loader from '@/components/ui/loader';
import { useCopyToClipboard } from 'react-use';
import { Copy } from '@/components/icons/copy';
import { Check } from '@/components/icons/check';
import { useParams } from 'react-router-dom'; // Import useParams from react-router-dom
import routes from '@/config/routes';
import { Listbox } from '@/components/ui/listbox';
import { Transition } from '@headlessui/react';
import { ChevronDown } from '@/components/icons/chevron-down';
import Image from '@/components/ui/image';
import ContractTransactionTable from './view-transaction';
import ViewFunctionScreen from './view-function';

export default function ViewContractScreen() {

    const [selectedWallet, setSelectedWallet] = useState({
        wallet_address: "",
        private_key: ""
    });
    const [wallets, setWallets] = useState([]);
    const [contractAddress, setContractAddress] = useState("");
    const [contractDetail, setContractDetail] = useState({
        balance: 0,
        nonce: 0,
        // Add other expected properties with default values here
    });
    const [form, setForm] = useState({
        email: ""

    });
    const [mintDetail, setMintDetail] = useState({
        token_id: 0,
        txn_hash: 0,
        // Add other expected properties with default values here
    });
    const [status, setStatus] = useState(0);
    const [minting, setMinting] = useState(false);
    const [ipfs, setIPFS] = useState("https://sumotex.mypinata.cloud/ipfs/QmPyaimVL6wMqccYb2dVB3BQ3xwBSUM2jfXZBjHDdQG5vr");
    const [loading, setLoading] = useState(true);
    const [txn, setContractTxn] = useState([]);
    const clientAxios = axios.create();
    const [copyButtonStatus, setCopyButtonStatus] = useState(false);
    const [_, copyToClipboard] = useCopyToClipboard();
    function handleCopyToClipboard() {
        copyToClipboard(selectedWallet.wallet_address);
        setCopyButtonStatus(true);
        setTimeout(() => {
            setCopyButtonStatus(copyButtonStatus);
        }, 2500);
    }

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


    const mintToken = async () => {
        if (form.email !== "") {
            setMinting(true);
            try {
                fetch('https://rpc.sumotex.co/mint-token', {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "contract_address": contractAddress,
                        "caller_address": selectedWallet.wallet_address,
                        "caller_private_key": selectedWallet.private_key,
                        "owner_id": form.email,
                        "ipfs_detail": ipfs
                    })
                })
                    .then(res => {
                        if (!res.ok) {
                            throw new Error(`HTTP error! Status: ${res.status}`);
                        }
                        return res.json();
                    })
                    .then(data => {
                        setMinting(false);
                        setStatus(1);
                        setMintDetail(data.result);
                        send_email();
                        toast("Token minted, token ID:" + data.result.token_id)
                    })
                    .catch(error => {
                        toast(error)
                        console.error('Fetch Error:', error);
                    });
            } catch (error) {
                console.error('Try-Catch Error:', error);
            }
        } else {
            toast("Please fill up your email address");
        }

    }
    const createNewWallet = async () => {
        await clientAxios.post('https://rpc.sumotex.co/create-wallet', JSON.stringify({}))
          .then(res => {
            const pub_address = res.data.result.wallet_address;
            const privateKey = res.data.result.private_key;
            const theWallet = {
              wallet_address: pub_address,
              private_key: privateKey
            }
            const newWallets = [...wallets, theWallet];
            localStorage.setItem('wallets', JSON.stringify(newWallets));
            setWallets(newWallets);
            setSelectedWallet(theWallet)
          })
          .catch((error) => {
            console.error('Error making POST request:', error.response || error);
            // Handle errors appropriately
          });
      }
    const send_email = async () => {
        try {
            fetch('https://generator-wasm.sumotex.co/send_email', {
                method: 'POST',
                mode:'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    recipient:form.email,
                    subject:"Minted Certificate",
                    body:"Link here: https://app.sumotex.co"+routes.viewCert+".html"+"contractAddress="+contractAddress + "&txn_hash=" + mintDetail.txn_hash + "&token_id=" +mintDetail.token_id
                })
            })
                .then(res => {
                    if (!res.ok) {
                        throw new Error(`HTTP error! Status: ${res.status}`);
                    }
                    return res.json();
                })
                .then(data => {

                    toast("Email send!")
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
        }else{
            createNewWallet();
        }
        async function fetchData() {
            const urlParams = new URLSearchParams(window.location.search);
            const addressFromURL = urlParams.get('contractAddress');

            if (addressFromURL) {
                setContractAddress(addressFromURL);
                try {
                    await Promise.all([
                        fetchContractTransactions(addressFromURL),
                        fetchContractBTransactions(addressFromURL),
                        fetchContractDetail(addressFromURL),
                        //getTotalTokens(addressFromURL),
                    ]);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
                setLoading(false);
            }
        }
        fetchData();
    }, []); // Dependency array depends on your specific needs
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (name && value !== undefined) {
            setForm(prevForm => {
                const formDetail = { ...prevForm, [name]: value };
                return formDetail;
            });
        } else {
            console.error('onChange received undefined or no name:', name, value);
        }
    }
    const WalletList = () => {

        return (
            <div className="relative ">
                <Listbox value={selectedWallet} onChange={setSelectedWallet}>
                    <Listbox.Button className="flex w-auto items-center justify-between rounded-lg bg-gray-100 px-4 text-xs text-gray-900 dark:bg-gray-800 dark:text-white sm:text-sm lg:h-12">
                        {wallets.length > 0 ? selectedWallet.wallet_address : null}
                        <ChevronDown className="ltr:ml-2 rtl:mr-2" />
                        <div
                            title="Copy Address"
                            className="flex cursor-pointer items-center px-4 text-gray-500 transition hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                            onClick={() => handleCopyToClipboard()}
                        >
                            {copyButtonStatus ? (
                                <Check className="h-auto w-3.5 text-green-500" />
                            ) : (
                                <Copy className="h-auto w-3.5" />
                            )}
                        </div>
                    </Listbox.Button>
                    <Transition
                        enter="ease-out duration-200"
                        enterFrom="opacity-0 translate-y-2"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 -translate-y-0"
                        leaveTo="opacity-0 translate-y-2"
                    >
                        <Listbox.Options className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-lg bg-white p-3 shadow-large dark:bg-light-dark sm:w-full">
                            {wallets.length > 0 ? wallets.map((item) => (
                                <Listbox.Option key={item.wallet_address} value={item}>
                                    {({ selected }) => (
                                        <div
                                            className={`block cursor-pointer rounded-lg px-3 py-2 text-xs font-medium text-gray-900 transition dark:text-white sm:text-sm  ${selected
                                                ? 'my-1 bg-gray-100 dark:bg-gray-800'
                                                : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                                                }`}
                                        >
                                            {item.wallet_address}
                                        </div>
                                    )}
                                </Listbox.Option>
                            )) : null}
                        </Listbox.Options>
                    </Transition>
                </Listbox>
            </div>
        );
    }
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
                        {loading ? null : <div className="flex flex-col">
                            {/* Name */}
                            <div className="mt-1.5 inline-flex items-center text-sm -tracking-wider text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white xl:mt-2.5">
                                <p>Contract Address: {contractAddress}</p>
                            </div>
                            <div className="mt-1.5 inline-flex items-center text-sm -tracking-wider text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white xl:mt-2.5">
                                <p>Contract Balance: ${contractDetail ? contractDetail.balance : "Loading"} SMTX</p>
                            </div>
                            <div className="mt-1.5 inline-flex items-center text-sm -tracking-wider text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white xl:mt-2.5">
                                <p>Actions: {contractDetail ? contractDetail.nonce : "Loading"} </p>
                            </div>
                        </div>}
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
                                title: 'Mint',
                                path: 'mint',
                            },
                            {
                                title: 'Contract',
                                path: 'action',
                            },
                        ]}
                    >
                        <TabPanel className="focus:outline-none">
                            {!loading && txn && txn.length > 0 ? <div className="space-y-6">
                                <ContractTransactionTable data={txn} />
                            </div> : null}
                        </TabPanel>
                        <TabPanel className="focus:outline-none">
                            <div className="flex flex-col-reverse">
                                <ContractTransactionTable data={txn} />
                            </div>
                        </TabPanel>
                        <TabPanel className="focus:outline-none">
                            <div className="flex flex-col-reverse">
                                <p>Coming soon</p>
                            </div>
                        </TabPanel>
                        <TabPanel className="focus:outline-none">
                            <div className="flex flex-col align-center">
                                <Image alt="NFTs"
                                    className='border rounded'
                                    width={600}
                                    height={700}
                                    src={ipfs} />
                                {/* Name */}
                                <div className='mt-8'>
                                    <InputLabel title="Mint to" important />
                                    <WalletList />
                                </div>
                                <div className=" mt-8 mb-8">
                                    <InputLabel title="Email Address" important />
                                    <Input
                                        name="email"
                                        type="text"
                                        value={form.email}
                                        onChange={onChange}
                                        placeholder="Email"
                                    />
                                </div>
                                {status == 0 ? <Button
                                    shape="rounded"
                                    color="success"
                                    isLoading={minting}
                                    onClick={() => mintToken()}
                                >Mint</Button>
                                    : <AnchorLink
                                        href={routes.viewCert+".html"+"contractAddress="+contractAddress + "&txn_hash=" + mintDetail.txn_hash + "&token_id=" +mintDetail.token_id}
                                        className="ml-2 font-medium underline dark:text-white-300"
                                    >
                                        <Button
                                        color="info"
                                        >
                                        View Minted
                                        </Button>
                                       
                                    </AnchorLink>}

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
