'use client';
import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import Button from '@/components/ui/button';
import axios from 'axios';
import Input from '@/components/ui/forms/input';
import InputLabel from '@/components/ui/input-label';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import routes from '@/config/routes';
import moment from 'moment';
import AnchorLink from '@/components/ui/links/anchor-link';
export default function ListContractScreen() {

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
    const [contractList, setContractList] = useState([]);
    const [ipfs, setIPFS] = useState("");
    const [wallets, setWallets] = useState([]);
    const clientAxios = axios.create();
    // useEffect to call the API once the component mounts
    useEffect(() => {
        const walletsString = localStorage.getItem("wallets");
        const theWallets = walletsString ? JSON.parse(walletsString) : [];
        if (walletsString && theWallets) {
          //fetchWalletTransactions(theWallets[0].wallet_address);
          setWallets(theWallets);
        }

    }, []); // Empty dependency array means this effect runs once on mount
    useEffect(() => {
        fetchWalletTransactions();
    }, [wallets]); // Empty dependency array means this effect runs once on mount
    const fetchWalletTransactions = async () => {
        const thePubAddress = wallets[0].wallet_address;
        await clientAxios.post('https://rpc.sumotex.co/get-caller-transactions',
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
    const mintToken = async (contractAddress: String) => {
        const thePubAddress = await localStorage.getItem("wallet_address");
        const thePrivateKey = await localStorage.getItem("private_key");
        try {
            fetch('https://rpc.sumotex.co/mint-token', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "contract_address": contractAddress,
                    "caller_address": thePubAddress,
                    "caller_private_key": thePrivateKey,
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
                    toast("Token Minted: " + data.result.token_id)
                    setIPFS("")
                })
                .catch(error => console.error('Error:', error));
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <>
            <div className="flex flex-wrap">

                <div className="mb-6 grid grid-cols-3 gap-12 sm:mb-10">
                    <div className="col-span-3 flex items-center justify-between lg:col-span-2">
                        <h2 className="text-lg font-medium uppercase tracking-wider text-gray-900 dark:text-white  sm:text-2xl">
                            Created NFT Contract
                        </h2>
                    </div>
                </div>
            </div>
            <ToastContainer
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
            />
            <h1>List of Contracts</h1>
            <div className="flex flex-wrap">
                {contractList.map((item, index) => (
                    <div key={index} className='col-span-6 m-6 p-4 border-solid border border-white rounded'>
                        <div className=' mb-4'>
                            <p className='text-xs'>Contract Address: {item.to_address} </p>
                            <p className='text-xs'>Created Date:{moment.unix(item.timestamp).format("DD/MM/YYYY HH:MM")} </p>
                        </div>
                        <div>
                            <AnchorLink
                                href={routes.viewNft + "contractAddress=" + item.to_address}
                                className="ml-2 font-medium underline dark:text-white-300"
                            >
                                View
                            </AnchorLink>
                        </div>
                    </div>
                ))}


            </div>
        </>
    );
}
