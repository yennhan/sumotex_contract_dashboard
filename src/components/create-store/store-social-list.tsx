'use client';
import { useState } from 'react';
import { Instagram } from '@/components/icons/brands/instagram';
import { Twitter } from '@/components/icons/brands/twitter';
import { Facebook } from '@/components/icons/brands/facebook';
import { Telegram } from '@/components/icons/brands/telegram';


export default function StoreSocialList() {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-7 pt-5 dark:border-gray-700 dark:bg-light-dark sm:px-7 sm:pb-8 sm:pt-6">
            <div className="text-lg font-medium uppercase -tracking-wide text-gray-900 ltr:text-left rtl:text-right dark:text-white lg:text-xl">
                Add Social Link
            </div>
            <div className="flex flex-wrap gap-2 pt-4 md:gap-2.5 xl:pt-5">
                <div className="product-share flex flex-shrink-0 flex-wrap items-center gap-2 md:gap-2.5">
                    <span className="text-md flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition-all hover:border-gray-300 hover:text-gray-900 dark:border-gray-700 dark:text-gray-400 xl:h-14 xl:w-14">
                        <Twitter className="h-5 w-5 lg:h-6 lg:w-6" />
                    </span>
                    <span className="mt-2 block text-xs -tracking-widest text-gray-600 dark:text-gray-400">
                        Twitter
                    </span>
                    <span className="text-md flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition-all hover:border-gray-300 hover:text-gray-900 dark:border-gray-700 dark:text-gray-400 xl:h-14 xl:w-14">
                        <Facebook className="h-5 w-5 lg:h-6 lg:w-6" />
                    </span>
                    <span className="mt-2 block text-xs -tracking-widest text-gray-600 dark:text-gray-400">
                        Facebook
                    </span>
                    <span className="text-md flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition-all hover:border-gray-300 hover:text-gray-900 dark:border-gray-700 dark:text-gray-400 xl:h-14 xl:w-14">
                        <Telegram className="h-5 w-5 lg:h-6 lg:w-6" />
                    </span>
                    <span className="mt-2 block text-xs -tracking-widest text-gray-600 dark:text-gray-400">
                        Telegram
                    </span>
                    <span className="text-md flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition-all hover:border-gray-300 hover:text-gray-900 dark:border-gray-700 dark:text-gray-400 xl:h-14 xl:w-14">
                        <Instagram className="h-5 w-5 lg:h-6 lg:w-6" />
                    </span>
                    <span className="mt-2 block text-xs -tracking-widest text-gray-600 dark:text-gray-400">
                        Linkedin
                    </span>
                </div>
                <button >
                </button>
            </div>
        </div>
    );
}
