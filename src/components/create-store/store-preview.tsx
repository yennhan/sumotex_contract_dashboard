import React, { useState, useEffect } from 'react';
import Image from '@/components/ui/image';
import AuthorImage from '@/assets/images/profile_icon.png';
import NFT1 from '@/assets/images/nft/nft-1.jpg';
import Avatar from '@/components/ui/avatar';
import { Instagram } from '@/components/icons/brands/instagram';
import { Twitter } from '@/components/icons/brands/twitter';
import { Facebook } from '@/components/icons/brands/facebook';
import { Telegram } from '@/components/icons/brands/telegram';
import { Tiktok } from '@/components/icons/brands/tiktok';
import { LinkedinIcon } from 'react-share';
import Link from 'next/link';

export default function StorePreview(inputStore: any) {
  let [store, setStoreDetail] = useState(inputStore.previewData)
  useEffect(() => {
    setStoreDetail(inputStore.previewData);
  }, [inputStore])
  return (
    <div className="w-full xs:w-96 border rounded">
      <div className="relative flex flex-grow flex-col overflow-hidden rounded-lg bg-white shadow-card transition-all duration-200 hover:shadow-large dark:bg-light-dark">
        <div className="flex row items-center p-4">
          <Image
            src={store.profilePicture || AuthorImage}
            width={60}
            height={100}
            alt={store.name}
            className="rounded-lg border-white bg-gray-300 ltr:mr-3 rtl:ml-3 dark:bg-gray-400"
          />
          <div className='flex-col'>
            <div className=" text-lg font-bold text-black transition">
              {store.name || "SUMO Store"}
            </div>
            <div className='text-sm'>
              {store.biography}
            </div>
            <div className='flex row'>
              {
                Object.entries(store.social).map(([key, value], index) => (
                  <div key={index}>
                    {key == 'twitter' && value != "" ?
                      <a onClick={() => window.open("https://twitter.com/" + value)}>
                        <Twitter className="text-[#11235A] h-6 w-6 m-2" />
                      </a>
                      :
                      key == 'tiktok' && value != "" ?
                        <a onClick={() => window.open("https://tiktok.com/" + value)}>
                          <Tiktok className="h-6 w-6 m-2" />
                        </a>
                        :
                        key == 'instagram' && value != "" ?
                          <a onClick={() => window.open("https://instagram.com/" + value)}>
                            <Instagram className="h-6 w-6 m-2 b-2" />
                          </a>
                          :
                          key == 'telegram' && value != "" ?
                            <a onClick={() => window.open("https://telegram.com/" + value)}>
                              <Telegram className="h-6 w-6 m-2" />
                            </a>
                            :
                            key == 'facebook' && value != "" ?
                              <a onClick={() => window.open("https://facebook.com/" + value)}>
                                <Facebook className="h-6 w-6 m-2" />
                              </a>
                              : null}
                  </div>
                ))
              }
            </div>
          </div>
        </div>
        <div className="p-5">
          <div className="text-sm font-medium text-black dark:text-white">

          </div>
          <div className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
          </div>
        </div>
      </div>
    </div>
  );
}
