'use client';
import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import axios from 'axios';
import BlockTable from './block-table';
export default function ScannerScreen() {

    const [block,setBlock]=useState([]);
    const clientAxios = axios.create();
    // useEffect to call the API once the component mounts
    const fetchBlocks = async () => {
        await clientAxios.post('https://rpc.sumotex.co/get-blocks',
        JSON.stringify({
          "pub_address": ""
        }), {})
        .then(res => {
            setBlock(res.data.result)

        })
        .catch((error) => {
          console.error('Error making POST request:', error.response || error);
          // Handle errors appropriately
        });
    };
    useEffect(() => {

        fetchBlocks();
    }, []); // Empty dependency array means this effect runs once on mount

    return (
        <>
            <div className="flex flex-wrap">
                <div className="mb-6 grid grid-cols-3 gap-12 sm:mb-10">
                    <div className="col-span-3 flex items-center justify-between lg:col-span-2">
                        <h2 className="text-lg font-medium uppercase tracking-wider text-gray-900 dark:text-white  sm:text-2xl">
                            Blocks
                        </h2>
                    </div>
                </div>
            </div>
          
            {block && block.length>0?<div className="">
                <BlockTable data={block}/>
            </div>:null}
        </>
    );
}
