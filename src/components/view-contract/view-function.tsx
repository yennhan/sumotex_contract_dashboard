'use client';
import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import Button from '@/components/ui/button';
import axios from 'axios';
import Input from '@/components/ui/forms/input';
import InputLabel from '@/components/ui/input-label';
import { Suspense } from 'react';
import { StaticImageData } from 'next/image';
import CodeViewer from './view-contract-code';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Loader from '@/components/ui/loader';
import routes from '@/config/routes';
import testCode from './test_code.json';

import erc721 from './sample721ABI.json';
export default function ViewFunctionScreen() {
    const [sampleCode, setCode] = useState(testCode);
    const [abi, setABI] = useState(erc721);
    const [loading, setLoading] = useState(false);
    const [txn, setContractTxn] = useState([]);
    const [selectedButton, setSelectedButton] = useState(1);
    const clientAxios = axios.create();
    // useEffect to call the API once the component mounts
    useEffect(() => {

    }, []); // Empty dependency array means this effect runs once on mount
    const fetchContracTransactions = async () => {
        const thePubAddress = await localStorage.getItem("wallet_address");
        await clientAxios.post('https://rpc.sumotex.co/get-caller-transactions',
            JSON.stringify({
                "pub_address": thePubAddress
            }), {})
            .then(res => {
                var theArray = res.data.result.transactions;
                var newArray = theArray.filter(function (el: any) {
                    return el.txn_type == "ContractCreation"
                })
            })
            .catch((error) => {
                console.error('Error making POST request:', error.response || error);
                // Handle errors appropriately
            });
    }
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (name && value !== undefined) {

        } else {
            console.error('onChange received undefined or no name:', name, value);
        }
    }

    return (
        <>
            <ToastContainer
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
            />
            <div className="flex flex-col pb-2">
                <Suspense fallback={<Loader variant="blink" />}>
                    <div className='flex row gap-2 text-white'>
                        <Button
                            title="code"
                            color={selectedButton == 1 ? "success" : "primary"}
                            variant={"solid"}
                            size="medium"
                            onClick={() => setSelectedButton(1)}
                        >
                            Code
                        </Button>
                        <Button
                            title="read"
                            color={selectedButton == 2 ? "success" : "primary"}
                            variant={"solid"}
                            size="medium"
                            onClick={() => setSelectedButton(2)}
                        >
                            Read Contract
                        </Button>
                        <Button
                            title="write"
                            color={selectedButton == 3 ? "success" : "primary"}
                            variant={"solid"}
                            size="medium"
                            onClick={() => setSelectedButton(3)}
                        >
                            Write Contract
                        </Button>
                        <Button
                            title="write"
                            color={selectedButton == 4 ? "success" : "primary"}
                            variant={"solid"}
                            size="medium"
                            onClick={() => setSelectedButton(4)}
                        >
                            ABI
                        </Button>
                    </div>
                    {selectedButton == 1 ? <div className='mt-4'>
                        <CodeViewer
                            code={sampleCode}
                        />
                    </div> : selectedButton == 2 ?
                        <div className='mt-4'>
                            {abi.map((item, index) => {
                                return (item.inputs.length == 0 ? <div className='m-4'>
                                    <h2 className='uppercase mb-4'>{item.name}</h2>
                                    <div className=''>
                                        <Button
                                            color="info"
                                            size="mini"
                                        >Submit</Button>
                                    </div>

                                </div> : null)
                            })}

                        </div> : selectedButton == 3 ? <div className='mt-4'>
                            {abi.map((item, index) => {
                                return (item.inputs.length > 0 ? <div className='m-4'>
                                    <h2 className='uppercase mb-4'>{item.name}</h2>
                                    {item.inputs.map((input, index2) => {
                                        return (
                                            <div className='m-4 ml-4'>
                                                <InputLabel title={input.name} />
                                                <Input  
                                                    className=''
                                                    name={input.name}
                                                    type="text"
                                                    value={""}
                                                    onChange={onChange}
                                                    placeholder={input.name}
                                                />
                                            </div>
                                        )
                                    })}
                                    <div className='ml-4'>
                                        <Button
                                            color="info"
                                            size="mini"
                                        >Submit</Button>
                                    </div>

                                </div> : null)
                            })}

                        </div> : selectedButton == 4 ? <div className='mt-4'>
                            <CodeViewer
                                code={{
                                    lang: 'json',
                                    value: JSON.stringify(abi, null, 2)
                                }}
                            />

                        </div> : null}

                </Suspense>
            </div>
        </>
    );
}
