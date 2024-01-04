'use client';
import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import TopupButton from '@/components/ui/topup-button';
import Button from '@/components/ui/button';
import axios from 'axios';
import Input from '@/components/ui/forms/input';
import InputLabel from '@/components/ui/input-label';
import FileInput from '@/components/ui/file-input';

export default function HomeScreen() {

  const [wallet, setWallet] = useState({
    wallet_address: "",
    private_key: ""

  });
  const [nftContract, setNFTContract]=useState({
    name:"",
    symbol:""
  })
  const [balance, setBalance] = useState(0);
  const clientAxios = axios.create();
  // useEffect to call the API once the component mounts
  useEffect(() => {
    const fetchData = async () => {
      await clientAxios.post('https://rpc.sumotex.co/create-wallet', JSON.stringify({}))
        .then(res => {
          setWallet(res.data.result);
          fetchBalance(res.data.result.wallet_address);
          const privateKey = res.data.result.private_key;

          // Save the private key to local storage
          localStorage.setItem('wallet_address', res.data.result.wallet_address);
          localStorage.setItem('private_key', privateKey);
          // Handle response data as needed
        })
        .catch((error) => {
          console.error('Error making POST request:', error.response || error);
          // Handle errors appropriately
        });
    };
    const fetchBalance = async (address: String) => {
      await clientAxios.post('https://rpc.sumotex.co/get-wallet-balance',
        JSON.stringify({
          "pub_address": address
        }), {})
        .then(res => {
          setBalance(res.data.result.balance)
          // Handle response data as needed
        })
        .catch((error) => {
          console.error('Error making POST request:', error.response || error);
          // Handle errors appropriately
        });
    };
    const fetchBlocks = async () => {
      await clientAxios.get('https://rpc.sumotex.co/get-block')
        .then(res => {
          console.log(res.data.result.blocks);
        })
        .catch((error) => {
          console.error('Error making POST request:', error.response || error);
          // Handle errors appropriately
        });
    };

    const thePubAddress = localStorage.getItem("wallet_address");
    const thePrivateKey = localStorage.getItem("private_key");
    if (thePubAddress && thePrivateKey) {
      setWallet({
        wallet_address: thePubAddress,
        private_key: thePrivateKey
      })
    } else {
      fetchData();
    }
    fetchBlocks();
  }, []); // Empty dependency array means this effect runs once on mount

  const createBlock = async () => {
    await clientAxios.get('https://rpc.sumotex.co/create-block')
      .then(res => {
        console.log(res);
      })
      .catch((error) => {
        console.error('Error making POST request:', error.response || error);
        // Handle errors appropriately
      });
  };
  const mintToken = async () => {
    await clientAxios.post('https://rpc.sumotex.co/create-block')
      .then(res => {
        console.log(res);
      })
      .catch((error) => {
        console.error('Error making POST request:', error.response || error);
        // Handle errors appropriately
      });
  };
  const mintSMTX = async () => {
    await clientAxios.post('https://rpc.sumotex.co/create-block')
      .then(res => {
        console.log(res);
      })
      .catch((error) => {
        console.error('Error making POST request:', error.response || error);
        // Handle errors appropriately
      });
  };
  const createNFTContract = async () => {
    await clientAxios.post('https://rpc.sumotex.co/create-nft-contract',
      {
        "caller_address": "",
        "private_key": "",
        "contract_name": "",
        "contract_symbol":"",
        "transaction_type": "ContractCreation"

      })
      .then(res => {
        console.log(res);
      })
      .catch((error) => {
        console.error('Error making POST request:', error.response || error);
        // Handle errors appropriately
      });
  };
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name && value !== undefined) {
      // setStoreDetail(prevStore => ({
      //     ...prevStore,
      //     [name]: value
      // }));
      // setStoreDetail(prevStore => {
      //     const updatedStore = { ...prevStore, [name]: value };
      //     return updatedStore;
      // });
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
              Home
            </h2>
          </div>
        </div>
      </div>

      <div className="flex row mt-8 grid gap-6 sm:my-10 md:grid-cols-1">
        <p>Wallet Address: {wallet.wallet_address}</p>
        <p>Balance: {balance}</p>
        <div>
            <Button shape="rounded"
              variant='ghost'
              onClick={() => mintSMTX()}>Mint SMTX</Button>
          </div>
        <div className='grid grid-cols-2 flex row'>
          <div className="border border-dashed border-black p-4 bg-white mb-8  gap-4">
            <div className="">
              {/* Name */}
              <div className="mb-8">
                <InputLabel title="NFT Name" important />
                <Input
                  name="nftName"
                  type="text"
                  //value={store.storeLink}
                  onChange={onChange}
                  placeholder="gloo.work/store-shortener"
                />
              </div>
              <div className="mb-8">
                <InputLabel title="Max Supply" important />
                <Input
                  name="max supply"
                  type="text"
                  //value={store.name}
                  onChange={onChange}
                  placeholder="Name for the store or username"
                />
              </div>
              <div className="mb-8">
                <InputLabel title="WASM Contract" important />
                <FileInput onFilesChanged={handleFileChange} />
              </div>
              <div className='mb-8'>
                <div className='flex row mb-4'>
                  <InputLabel
                    title="Socials"
                    subTitle="Add socials links (keeping it empty will not enable social link)"
                    important />

                </div>
              </div>
            </div>
            <div>
            <Button shape="rounded"
              variant='ghost'
              onClick={() => createNFTContract()}
            >Create NFT Contract</Button>
          </div>
          </div>

        </div>
        <div>
            <Button shape="rounded"
              variant='ghost'
            >Create Token Contract</Button>
          </div>
        <div className='flex row gap-4'>
          <div>
            <Button shape="rounded">Transfer Amount</Button>
          </div>
          <div>
            <Button shape="rounded" onClick={() => createBlock()}>Create Block</Button>
          </div>
          <div>
            <Button shape="rounded" onClick={() => mintToken()}>Mint Token</Button>
          </div>
        </div>

      </div>

      <div className="flex flex-wrap">
      </div>
    </>
  );
}
