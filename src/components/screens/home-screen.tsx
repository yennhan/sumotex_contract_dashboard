'use client';
import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { coinSlideData } from '@/data/static/coin-slide-data';
import Avatar from '@/components/ui/avatar';
import TopupButton from '@/components/ui/topup-button';
import Button from '@/components/ui/button';
import axios from 'axios';
//images
import AuthorImage from '@/assets/images/author.jpg';



export default function HomeScreen() {

  const [wallet, setWallet] = useState({
    wallet_address:""
    
  });
  const [balance,setBalance]=useState(0);
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
        localStorage.setItem('private_key', privateKey);
        // Handle response data as needed
      })
      .catch((error) => {
        console.error('Error making POST request:', error.response || error);
        // Handle errors appropriately
      });
    };
    const fetchBalance = async (address:String) => {
      await clientAxios.post('https://rpc.sumotex.co/get-wallet-balance', 
      JSON.stringify({
        "pub_address":address
      }),{})
      .then(res => {
        console.log(res);
        setBalance(res.data.result.balance)
        // Handle response data as needed
      })
      .catch((error) => {
        console.error('Error making POST request:', error.response || error);
        // Handle errors appropriately
      });
    };

    fetchData();

  }, []); // Empty dependency array means this effect runs once on mount


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
        <Button shape="rounded">Create Contract</Button>
     
        </div>
        <div>
        <Button shape="rounded">Transfer Amount</Button>
        </div>
    
      </div>

      <div className="flex flex-wrap">
      </div>
    </>
  );
}