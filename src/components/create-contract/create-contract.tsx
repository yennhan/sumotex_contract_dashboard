'use client';
import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import Button from '@/components/ui/button';
import axios from 'axios';
import Input from '@/components/ui/forms/input';
import InputLabel from '@/components/ui/input-label';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import EditableCodeViewer from './code-editor';
import { useCopyToClipboard } from 'react-use';
import { Check } from '@/components/icons/check';
import { Copy } from '@/components/icons/copy';
import ParamTab, { TabPanel } from '@/components/ui/param-tab';
import Loader from '@/components/ui/loader';
import { useParams } from 'react-router-dom'; // Import useParams from react-router-dom
export default function CreateContractScreen() {

    const [loading, setLoading] = useState(false);
    const [stage, setStage] = useState(0);
    const [contractDetail, setContractDetail] = useState({
        "contract_address": "",
        "gas_cost": 0,
        "txn_hash": ""
    })
    const [wallet, setWallet] = useState({
        wallet_address: "",
        private_key: ""

    });
    const [contractList, setContractList] = useState([]);
    const clientAxios = axios.create();
    const [abiCode, setABICode] = useState([]);
    const [contractCode, setContractCode] = useState("");
    const [fileContent, setFileContent] = useState('');
    // useEffect to call the API once the component mounts
    const defaultERC721RsFilePath = '/template/templateERC721.rs'; // Replace with your default Rust file path
    useEffect(() => {
        const thePubAddress = localStorage.getItem("wallet_address");
        const thePrivateKey = localStorage.getItem("private_key");
        if (thePubAddress && thePrivateKey) {
            setWallet({
                wallet_address: thePubAddress,
                private_key: thePrivateKey
            })
        } else {
        }
        fetchWalletTransactions();
        loadRsFile(defaultERC721RsFilePath);
    }, []); // Empty dependency array means this effect runs once on mount
    useEffect(() => {
        convertToJsonString()

    }, [fileContent]); // Empty dependency array means this effect runs once on mount

    const loadRsFile = (filePath) => {
        fetch(filePath)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.text();
            })
            .then((content) => {
                setFileContent(content);

            })
            .catch((error) => {
                console.error(`Error fetching ${filePath}:`, error);
            });
    };

    const convertToJsonString = () => {
        try {
            const jsonString = JSON.stringify(fileContent);
            setContractCode(jsonString);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const fetchWalletTransactions = async () => {
        const thePubAddress = await localStorage.getItem("wallet_address");
        await clientAxios.post('https://rpc.sumotex.co/get-wallet-transactions',
            JSON.stringify({
                "pub_address": thePubAddress
            }), {})
            .then(res => {
                var theArray = res.data.result.transactions;
                var newArray = theArray.filter(function (el: any) {
                    return el.txn_type == "ContractCreation"
                })
                setContractList(newArray)
            })
            .catch((error) => {
                console.error('Error making POST request:', error.response || error);
                // Handle errors appropriately
            });
    }
    const compileContract = async () => {
        try {
            fetch('https://generator-wasm.sumotex.co/compile', {
                method: 'POST',
                mode: 'cors', // Try different modes here
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    source_code: contractCode
                })
            })
                .then(res => {
                    if (!res.ok) {
                        throw new Error(`HTTP error! Status: ${res.status}`);
                    }
                    return res.json();
                })
                .then(data => {
                    setABICode(JSON.parse(data.abi))

                    toast("WASM and ABI generated!")
                })
                .catch(error => {
                    console.error('Fetch Error:', error);
                });
        } catch (error) {
            console.error('Try-Catch Error:', error);
        }
    }
    const [copyButtonStatus, setCopyButtonStatus] = useState(false);
    const [_, copyToClipboard] = useCopyToClipboard();
    function handleCopyToClipboard() {
      copyToClipboard(abiCode);
      setCopyButtonStatus(true);
      toast.success("ABI copied");
      setTimeout(() => {
        setCopyButtonStatus(copyButtonStatus);
        
      }, 2500);
    }
    const createNFTContract = async () => {
        const thePubAddress = localStorage.getItem("wallet_address");
        const thePrivateKey = localStorage.getItem("private_key");
        setLoading(true);
        if ("nft.name" !== "") {
            if (stage == 0) {
                try {
                    fetch('https://rpc.sumotex.co/create-nft-contract', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            "call_address": thePubAddress,
                            "private_key": thePrivateKey,
                            "contract_name": "nft.name",
                            "contract_symbol": "nft.symbol",
                            "transaction_type": "ContractCreation"

                        })
                    })
                        .then(res => {

                            if (!res.ok) {
                                throw new Error(`HTTP error! Status: ${res.status}`);
                            }

                            return res.json();
                        })
                        .then(data => {
                            setContractDetail(data.result)
                            setLoading(false)
                            toast("Contract created! Sign it")
                            setStage(1)
                        })
                        .catch(error => console.error('Error:', error));
                } catch (error) {
                    console.error('Error:', error);
                }
            } else if (stage == 1) {
                try {
                    fetch('https://rpc.sumotex.co/sign-transaction', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            "caller_address": thePubAddress,
                            "private_key": thePrivateKey,
                            "transaction_type": "ContractCreation",
                            "computed_value": contractDetail.gas_cost,
                            "txn_hash": contractDetail.txn_hash

                        })
                    })
                        .then(res => {
                            if (!res.ok) {
                                throw new Error(`HTTP error! Status: ${res.status}`);
                            }

                            return res.json();
                        })
                        .then(data => {
                            setLoading(false)
                            setStage(2);
                            toast("Contract signed")
                        })
                        .catch(error => console.error('Error:', error));
                } catch (error) {
                    console.error('Error:', error);
                }
            }

        } else {
            setLoading(false);
            toast.error("Fill up your NFT Collections Name")
        }

    };
    const handleUpdateCode = (updatedCode: string) => {
        setContractCode(updatedCode); // Update the state in the parent component
        // Additional actions based on the updated code
    };
    // const TemplateList = () => {

    //     return (
    //         <div className="relative ">
    //             <Listbox value={1}>
    //                 <Listbox.Button className="ml-4 flex w-auto items-center justify-between rounded-lg bg-gray-100 px-4 text-xs text-gray-900 dark:bg-gray-800 dark:text-white sm:text-sm lg:h-12">
    //                     {"Sample Template"}
    //                     <ChevronDown className="ltr:ml-2 rtl:mr-2" />

    //                 </Listbox.Button>
    //                 <Transition
    //                     enter="ease-out duration-200"
    //                     enterFrom="opacity-0 translate-y-2"
    //                     enterTo="opacity-100"
    //                     leave="ease-in duration-200"
    //                     leaveFrom="opacity-100 -translate-y-0"
    //                     leaveTo="opacity-0 translate-y-2"
    //                 >
    //                     <Listbox.Options className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-lg bg-white p-3 shadow-large dark:bg-light-dark sm:w-full">
    //                     </Listbox.Options>

    //                 </Transition>

    //             </Listbox>
    //         </div>
    //     );
    // }

    return (
        <div className='h-full'>
            <div className="flex flex-wrap">
                <div className="mb-6 grid grid-cols-3 gap-2 sm:mb-10">
                    <div className="col-span-3 flex items-center justify-between lg:col-span-2">
                        <h2 className="text-lg font-medium uppercase tracking-wider text-gray-900 dark:text-white  sm:text-2xl">
                            Create NFT Contracts
                        </h2>
                    </div>
                </div>
            </div>
            <ToastContainer
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
            />
            <ParamTab
                tabMenu={[
                    {
                        title: 'Code Editor',
                        path: 'codeEditor',
                    },

                    {
                        title: 'ABI Actions',
                        path: 'abiAction',
                    },
                    {
                        title: 'WASM File',
                        path: 'wasmFile',
                    }
                ]}
            >
                <TabPanel className="focus:outline-none">
                    <div className='grid grid-cols-12 flex h-[100vh]'>
                        <div className='col-span-10 h-full'>
                            {contractCode !== "" ? <EditableCodeViewer
                                initialCode={contractCode}
                                onCodeChange={handleUpdateCode}
                            /> : <div>
                                Loading...
                            </div>}

                        </div>
                        <div className='col-span-2'>
                            <div className='flex flex-col justify-center text-center gap-4'>
                                <Button
                                    shape="rounded"
                                    variant='solid'
                                    color="info"
                                    size="large"
                                    onClick={() => compileContract()}
                                >
                                    Compile
                                </Button>

                                <div>
                                    <Button
                                        shape="rounded"
                                        variant='solid'
                                        color="primary"
                                        size="large"
                                    >
                                        Copy WASM
                                    </Button>
                                </div>
                                <div>
                                    <Button
                                        shape="rounded"
                                        variant='solid'
                                        color="primary"
                                        size="large"
                                    >
                                        Copy ABI code
                                    </Button>
                                </div>
                                {stage == 0 ? <div>
                                    <Button
                                        shape="rounded"
                                        variant='solid'
                                        color="success"
                                        size="large"
                                        isLoading={loading}
                                        onClick={() => createNFTContract()}
                                    >DEPLOY Contract</Button>
                                </div> : stage == 1 ?
                                    <div>
                                        <Button
                                            shape="rounded"
                                            variant='solid'
                                            color="success"
                                            isLoading={loading}
                                            onClick={() => createNFTContract()}
                                        >Sign Contract</Button>
                                    </div> : null}
                            </div>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel className="focus:outline-none">
                    <div className='flex row mb-4'>
                    <p>Copy to clipboard</p>
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
                    </div>


                <div className="flex flex-col-reverse border border-white">
                    <pre>
                        <code>{JSON.stringify(abiCode, null, 2)}</code>
                    </pre>
                </div>

                </TabPanel>
                <TabPanel className="focus:outline-none">
                    <div className="flex flex-col-reverse">
                        <Button>Download WASM file</Button>
                    </div>
                </TabPanel>
            </ParamTab>

        </div>
    );
}
