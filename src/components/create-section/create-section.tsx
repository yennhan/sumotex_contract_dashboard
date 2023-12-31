'use client';
import { useState } from 'react';
import { useCopyToClipboard } from 'react-use';
import { Check } from '@/components/icons/check';
import { Copy } from '@/components/icons/copy';
import cn from 'classnames';
import { Transition } from '@/components/ui/transition';
import { Listbox } from '@/components/ui/listbox';
import Image from '@/components/ui/image';
import Button from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import InputLabel from '@/components/ui/input-label';
import { DndContext } from '@dnd-kit/core';
import { Draggable } from '../create-store/Draggable';
import { Droppable } from '../create-store/Droppable';
import { DiceIcon } from '@/components/icons/dice';
import { useModal } from '@/components/modal-views/context';
import SectionType from '@/components/create-section/section-types-props';
import ActiveLink from '../ui/links/active-link';

export default function CreateSection() {
    const { openModal } = useModal();
    let [sectionType, setSectionType] = useState('/create-membership');

    const onSelectSection = ()=>{
        if (sectionType=='1'){

        }
    }
    return (
        <>
            <div className="mx-auto w-full sm:pt-0 lg:px-8 xl:px-10 2xl:px-0">
                <div className="mb-6 grid grid-cols-1 gap-12 sm:mb-10">
                    <div className="col-span-3 flex items-center justify-between lg:col-span-2">
                        <h2 className="text-lg font-medium uppercase tracking-wider text-gray-900 dark:text-white  sm:text-2xl">
                            Add Sections
                        </h2>
                    </div>
                </div>
                <div className="mb-8 grid">
                    <div className='mb-4'>
                        <div className='flex row'>
                            <InputLabel
                                title="Sections"
                                subTitle="Add sections to your store"
                                important />
                        </div>
                    </div>
                    <div className="mb-6 items-center justify-between gap-2">
                            <SectionType value={sectionType} onChange={setSectionType} />
                    </div>
                    <ActiveLink
                    href={sectionType}
                    >
                    <Button shape="pill" onClick={onSelectSection}>Create Section</Button>
                    </ActiveLink>
                
                
                </div>
            </div>
        </>
    );
}
