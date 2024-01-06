'use client';
import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import Button from '@/components/ui/button';
import axios from 'axios';
import Input from '@/components/ui/forms/input';
import InputLabel from '@/components/ui/input-label';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import FileInput from '@/components/ui/file-input';

export default function NFTContractScreen() {

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
    const [nft, setNFTContract] = useState({
        name: "",
        symbol: "",
        maxSupply: 1000
    })
    const clientAxios = axios.create();
    // useEffect to call the API once the component mounts
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
    }, []); // Empty dependency array means this effect runs once on mount

    const createNFTContract = async () => {
        const thePubAddress = localStorage.getItem("wallet_address");
        const thePrivateKey = localStorage.getItem("private_key");
        setLoading(true);
        if(nft.name!==""){
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
                        "contract_name": nft.name,
                        "contract_symbol": nft.symbol,
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
        }else{
            toast.error("Fill up your NFT Collections Name")
        }

    };
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (name && value !== undefined) {
            setNFTContract(prevStore => {
                const nftContract = { ...prevStore, [name]: value };
                return nftContract;
            });
        } else {
            console.error('onChange received undefined or no name:', name, value);
        }
    }
    const handleFileChange = async (files: Array<File>) => {
        console.log(files[0])
    };
    return (
        <>
            <div className="flex flex-wrap">
       
                <div className="mb-6 grid grid-cols-3 gap-12 sm:mb-10">
                    <div className="col-span-3 flex items-center justify-between lg:col-span-2">
                        <h2 className="text-lg font-medium uppercase tracking-wider text-gray-900 dark:text-white  sm:text-2xl">
                            Create NFT Contract
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
                <div className='grid grid-cols-2 flex row'>

                    <div className="border border-dashed border-black p-4  dark:text-white mb-8  gap-4">
                        {stage == 0 ? <div className="">
                            {/* Name */}
                            <div className="mb-8">
                                <InputLabel title="NFT Collections" important />
                                <Input
                                    name="name"
                                    type="text"
                                    value={nft.name}
                                    onChange={onChange}
                                    placeholder="NFT Collections name"
                                />
                            </div>
                            <div className="mb-8">
                                <InputLabel title="Max Supply" important />
                                <Input
                                    name="maxSupply"
                                    type="text"
                                    value={nft.maxSupply}
                                    onChange={onChange}
                                    placeholder="Max Supply"
                                />
                            </div>
                            {/* <div className="mb-8">
                <InputLabel title="WASM Contract" important />
                <FileInput onFilesChanged={handleFileChange} />
              </div> */}
                        </div> : stage == 1 ? <div>
                        </div> : null}
                        <div>
                        </div>
                    </div>
                </div>
                <div>
                    <Button
                        shape="rounded"
                        variant='ghost'
                        isLoading={loading}
                        onClick={() => createNFTContract()}
                    >Create Token Contract</Button>
                </div>
            </div>
            <div className="flex flex-wrap">
            </div>
        </>
    );
}
