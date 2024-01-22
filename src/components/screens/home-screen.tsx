'use client';
import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import TopupButton from '@/components/ui/topup-button';
import Button from '@/components/ui/button';
import axios from 'axios';
import Input from '@/components/ui/forms/input';
import InputLabel from '@/components/ui/input-label';
import FileInput from '@/components/ui/file-input';
import { useCopyToClipboard } from 'react-use';
import TransactionTable from './transaction-table';
import { Check } from '@/components/icons/check';
import { Copy } from '@/components/icons/copy';
import BigNumber from 'bignumber.js';
import { Listbox } from '@/components/ui/listbox';
import { Transition } from '@headlessui/react';
import { ChevronDown } from '@/components/icons/chevron-down';
// import icons
import { EyeIcon } from '@/components/icons/eye';
import { EyeSlashIcon } from '@/components/icons/eyeslash';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

export default function HomeScreen() {

  const [loading,setLoading]=useState(true);
  const [state, setState] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState({
    wallet_address: "",
    private_key: ""
  });
  const [wallets, setWallets] = useState([]);
  const [transferState, setTransferRequest] = useState(0);
  const [transferTxn, setTransferTxn] = useState({
    gas_cost: 100,
    transaction_hash: ""
  });
  const [txnDetail, setTxnDetail] = useState({
    smtxValue: 0,
    walletAddress: ""

  })
  const [txn, setTxn] = useState([]);

  const [balance, setBalance] = useState(0);
  const clientAxios = axios.create();
  // useEffect to call the API once the component mounts
  const fetchWalletTransactions = async (address: string) => {

    await clientAxios.post('https://rpc.sumotex.co/get-caller-transactions',
      JSON.stringify({
        "pub_address": address
      }), {})
      .then(res => {
        setTxn(res.data.result.transactions);
        setLoading(false);

      })
      .catch((error) => {
        console.error('Error making POST request:', error.response || error);
        // Handle errors appropriately
      });
  }
  const checkWallet = async () => {
    const thePubAddress = selectedWallet.wallet_address
    await clientAxios.post('https://rpc.sumotex.co/check-account',
      JSON.stringify({
        "pub_address": thePubAddress
      }), {})
      .then(res => {
        return res.data.result
      })
      .catch((error) => {
        console.error('Error making POST request:', error.response || error);
        // Handle errors appropriately
      });
  }
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

  useEffect(() => {
    const walletsString = localStorage.getItem("wallets");
    const theWallets = walletsString ? JSON.parse(walletsString) : [];
    const isWallet: any = checkWallet();
    if (walletsString && theWallets) {
      setSelectedWallet(theWallets[0])
      fetchBalance(theWallets[0].wallet_address);
      //fetchWalletTransactions(theWallets[0].wallet_address);
      setWallets(theWallets);
    } else {
      createNewWallet();
    }
    //fetchBlocks();

  }, []); // Empty dependency array means this effect runs once on mount
  useEffect(() => {
    console.log(selectedWallet.wallet_address)
    fetchBalance(selectedWallet.wallet_address);
    fetchWalletTransactions(selectedWallet.wallet_address);
  }, [selectedWallet,loading])
  const mintSMTX = async () => {

  };
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
  const createTransactions = async () => {
    if (transferState == 0) {
      if (txnDetail.walletAddress == "") {
        toast.error("Empty wallet address")

      } else if (txnDetail.smtxValue == 0) {
        toast.error("Please insert a value for transfer, 18 decimal places")
      } else {
        await clientAxios.post('https://rpc.sumotex.co/create-transaction',
          JSON.stringify({
            "caller_address": selectedWallet.wallet_address,
            "to_address": txnDetail.walletAddress,
            "computed_value": Number(txnDetail.smtxValue),
            "transaction_type": "SimpleTransfer"
          }))
          .then(res => {
            setTransferTxn(res.data.result);
            setTransferRequest(1)
          })
          .catch((error) => {
            console.error('Error making POST request:', error.response || error);
            // Handle errors appropriately
          });
      }

    } else {
      await clientAxios.post('https://rpc.sumotex.co/sign-transaction',
        JSON.stringify({
          "caller_address": selectedWallet.wallet_address,
          "private_key": selectedWallet.private_key,
          "txn_hash": transferTxn.transaction_hash,
          "computed_value": Number(0),
          "transaction_type": "SimpleTransfer"
        }))
        .then(res => {
          setTransferRequest(2)
          fetchBalance(selectedWallet.wallet_address)
        })
        .catch((error) => {
          console.error('Error making POST request:', error.response || error);
          // Handle errors appropriately
        });
    }


  }
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name && value !== undefined) {
      setTxnDetail(prevTxn => {
        const txnDetail = { ...prevTxn, [name]: value };
        return txnDetail;
      });
    } else {
      console.error('onChange received undefined or no name:', name, value);
    }
  }
  const [copyButtonStatus, setCopyButtonStatus] = useState(false);
  const [_, copyToClipboard] = useCopyToClipboard();
  function handleCopyToClipboard() {
    copyToClipboard(selectedWallet.wallet_address);
    setCopyButtonStatus(true);
    setTimeout(() => {
      setCopyButtonStatus(copyButtonStatus);
    }, 2500);
  }

  const WalletList = () => {

    return (
      <div className="relative ">
        <Listbox value={selectedWallet} onChange={setSelectedWallet}>
          <Listbox.Button className="ml-4 flex w-auto items-center justify-between rounded-lg bg-gray-100 px-4 text-xs text-gray-900 dark:bg-gray-800 dark:text-white sm:text-sm lg:h-12">
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
              <Listbox.Option key={""} value={0}>
                <div className='pt-4'>
                  <Button onClick={() => createNewWallet()}>Create New Wallet</Button>
                </div>
              </Listbox.Option>
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
              Home
            </h2>
          </div>
        </div>
      </div>
      <ToastContainer
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
      />
      <div className='flex row '>
        <p>Wallet Address: </p>
        <WalletList />
      </div>

      <div className="flex row mt-4 grid gap-6 sm:my-10 md:grid-cols-1">
        <div className='w-auto items-center justify-between rounded-lg '>
          <div
            className='flex row'
          >Private Key
            <span
              className="pl-4"
              onClick={() => setState(!state)}
            >
              {state ? (
                <EyeIcon className="h-12 w-12 sm:h-6 sm:w-6" />
              ) : (
                <EyeSlashIcon className="h-4 w-4 sm:h-6 sm:w-6" />
              )}
            </span>

          </div>
          <Input
            value={selectedWallet.private_key}
            type={state ? 'text' : 'password'}
            disabled
            placeholder="private key"
            inputClassName="bg-white border-0 text-md"
          />

        </div>

        <p>Balance ($): {balance > 0 ? new BigNumber(balance).dividedBy(new BigNumber(10).pow(18)).toFixed(18) : "Loading..."} SMTX</p>

        <div>
          <Button shape="rounded"
            variant='ghost'
            disabled
            onClick={() => mintSMTX()}>Request SMTX</Button>

        </div>
        <div className="flex row mt-8 grid gap-4 sm:my-10 md:grid-cols-1 sm:grid-cols-1">
          <h1>Transfer SMTX here</h1>
          {transferState == 0 ?
            <div className='grid grid-cols-2 sm:grid-cols-1 md:grid-cols-1 flex row'>
              <div className="border border-dashed border-white p-4 dark:text-white mb-8 gap-4">
                <div className="">
                  {/* Name */}
                  <div className="mb-8">
                    <InputLabel title="Amount in $SMTX" important />
                    <Input
                      name="smtxValue"
                      type="number"
                      value={txnDetail.smtxValue}
                      onChange={onChange}
                      placeholder="$SMTX in 18 decimals places"
                    />
                  </div>
                  <div className="mb-8">
                    <InputLabel title="Wallet Address" important />
                    <Input
                      name="walletAddress"
                      type="text"
                      value={txnDetail.walletAddress}
                      onChange={onChange}
                      placeholder="Transfer to wallet address"
                    />
                  </div>
                  <div>
                  </div>
                </div>
                <Button shape="rounded" onClick={createTransactions} className=''>Submit Request</Button>
              </div>
            </div> : transferState == 1 ?
              <div className="border border-dashed border-white p-4  dark:text-white mb-8  gap-4">
                <p>Gas Cost: {transferTxn.gas_cost}</p>
                <p>Transcation Hash: {transferTxn.transaction_hash}</p>
                <div className='mt-4'>
                  <Button shape="rounded" onClick={createTransactions} className=''>Sign Transactions</Button>
                </div>

              </div> : transferState == 2 ? <div>
                <p>Transaction Completed!</p>
                <p>Transaction Hash:{transferTxn.transaction_hash}</p>
              </div> : null}
        </div>
        <h1>Transactions</h1>
        {!loading &&txn? <div>
          <TransactionTable data={txn} />
        </div> : <p>Loading...</p>}
      </div>

    </>
  );
}
