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
import Input from '@/components/ui/forms/input';
import Textarea from '@/components/ui/forms/textarea';
import InputLabel from '@/components/ui/input-label';
import StorePreview from './store-preview';
import FileInput from '@/components/ui/file-input';
import { DndContext } from '@dnd-kit/core';
import { Draggable } from './Draggable';
import { Droppable } from './Droppable';
import { Instagram } from '@/components/icons/brands/instagram';
import { Twitter } from '@/components/icons/brands/twitter';
import { Facebook } from '@/components/icons/brands/facebook';
import { Tiktok } from '@/components/icons/brands/tiktok';
import { DiceIcon } from '@/components/icons/dice';
import { useModal } from '@/components/modal-views/context';
import { Telegram } from '../icons/brands/telegram';
export default function CreateSchedulerSection() {
    const { openModal } = useModal();
    const [parent, setParent] = useState([
        {
            id: 1,
            name: ""
        },
        {
            id: 2,
            name: ""
        },
        {
            id: 3,
            name: ""
        }
    ]);
    const [copyButtonStatus, setCopyButtonStatus] = useState(false);
    const [_, copyToClipboard] = useCopyToClipboard();

    let [store, setStoreDetail] = useState({
        name: "",
        biography: "",
        storeLink: "",
        profilePicture: "",
        social: {}
    })
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (name && value !== undefined) {
            // setStoreDetail(prevStore => ({
            //     ...prevStore,
            //     [name]: value
            // }));
            setStoreDetail(prevStore => {
                const updatedStore = { ...prevStore, [name]: value };
                console.log('Updated Store:', updatedStore); // Add this line
                return updatedStore;
            });
        } else {
            console.error('onChange received undefined or no name:', name, value);
        }
    }
    const handleSocialChange = (event: any) => {
        const { name, value } = event.target;
        setStoreDetail(prevStore => ({
            ...prevStore,
            social: {
                ...prevStore.social,
                [name]: value
            }
        }));
    };

    const handleCopyToClipboard = () => {
        copyToClipboard(store.storeLink);
        setCopyButtonStatus(true);
        setTimeout(() => {
            setCopyButtonStatus(copyButtonStatus);
        }, 2500);
    }


    const onCreateStore = () => {
        // Implement store creation logic here
        console.log('Creating store with details:', store);
    };
    const handleDragEnd = (event) => {
        const { active, over } = event;

        // Proceed only if the draggable item is dropped over a different item or the droppable area
        if (over && active.id !== over.id) {
            setParent((oldItems) => {
                const oldIndex = oldItems.findIndex(item => item.id.toString() === active.id.toString());

                let newIndex;
                if (over.id === 'droppable') {
                    // Define behavior when dropped on the droppable area (e.g., move to the end)
                    newIndex = oldItems.length - 1;
                } else {
                    // Find index of the item being dropped over
                    newIndex = oldItems.findIndex(item => item.id.toString() === over.id.toString());
                }

                if (newIndex === -1 || oldIndex === newIndex) {
                    return oldItems; // Return existing order if invalid drop or no change in position
                }

                // Reorder the items
                const reorderedItems = Array.from(oldItems);
                const [movedItem] = reorderedItems.splice(oldIndex, 1);
                reorderedItems.splice(newIndex, 0, movedItem);

                return reorderedItems;
            });
        }
    };

    return (
        <>
            <div className="mx-auto w-full sm:pt-0 lg:px-8 xl:px-10 2xl:px-0">
                <div className="mb-6 grid grid-cols-3 gap-12 sm:mb-10">
                    <div className="col-span-3 flex items-center justify-between lg:col-span-2">
                        <h2 className="text-lg font-medium uppercase tracking-wider text-gray-900 dark:text-white  sm:text-2xl">
                            My Store
                            <div className='flex row mt-4'>
                                <div className="text truncate text-ellipsis text-align-right text-xs text-gray-500 rtl:pr-4 dark:text-gray-300 sm:text-sm">
                                    SUMO.work/{store.storeLink || "sample"}
                                </div>
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
                            </div>
                        </h2>

                    </div>
                </div>

                <div className="mb-8 grid grid-cols-1 gap-12 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        {/* Name */}
                        <div className="mb-8">
                            <InputLabel title="Store link" important />
                            <Input
                                name="storeLink"
                                type="text"
                                value={store.storeLink}
                                onChange={onChange}
                                placeholder="SUMO.work/store-shortener"
                            />
                        </div>
                        <div className="mb-8">
                            <InputLabel title="Name" important />
                            <Input
                                name="name"
                                type="text"
                                value={store.name}
                                onChange={onChange}
                                placeholder="Name for the store or username"
                            />

                        </div>
                        <div className="mb-8">
                            <InputLabel title="biography" important />
                            <Input
                                name="biography"
                                type="text"
                                value={store.biography}
                                onChange={onChange}
                                placeholder="Biography"
                            />

                        </div>
                        <div className="mb-8">
                            <InputLabel title="Add Profile Picture" important />
                            <FileInput onFilesChanged={handleFileChange} />
                        </div>
                        <div className='mb-8'>
                            <div className='flex row'>
                                <InputLabel
                                    title="Socials"
                                    subTitle="Add socials links (keeping it empty will not enable social link)"
                                    important />

                            </div>
                            <>
                                <div className='flex row gap-2'>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center">
                                            <Twitter className="h-5 w-5 mr-2" /> {/* Icon */}
                                            <span>Twitter</span> {/* Label Text */}
                                        </div>
                                        <Input
                                            name="twitter"
                                            type="text"
                                            placeholder="Twitter URL"
                                            className="mt-1"
                                            onChange={handleSocialChange}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center">
                                            <Instagram className="h-5 w-5 mr-2" /> {/* Icon */}
                                            <span>Instagram</span> {/* Label Text */}
                                        </div>
                                        <Input
                                            name="instagram"
                                            type="text"
                                            placeholder="Instagram handler"
                                            className="mt-1"
                                            onChange={handleSocialChange}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center">
                                            <Tiktok className="h-5 w-5 mr-2" /> {/* Icon */}
                                            <span>Tiktok</span> {/* Label Text */}
                                        </div>
                                        <Input
                                            name="tiktok"
                                            type="text"
                                            placeholder="tiktok handler"
                                            className="mt-1"
                                            onChange={handleSocialChange}
                                        />
                                    </div>
                                </div>
                                <div className='flex row gap-2 mt-4'>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center">
                                            <Telegram className="h-5 w-5 mr-2" /> {/* Icon */}
                                            <span>Telegram</span> {/* Label Text */}
                                        </div>
                                        <Input
                                            name="telegram"
                                            type="text"
                                            placeholder="Telegram handler"
                                            className="mt-1"
                                            onChange={handleSocialChange}
                                        />
                                    </div>
                                    <div className='flex row'>
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-center">
                                                <Facebook className="h-5 w-5 mr-2" /> {/* Icon */}
                                                <span>Facebook</span> {/* Label Text */}
                                            </div>
                                            <Input
                                                name="facebook"
                                                type="text"
                                                placeholder="facebook page/profile"
                                                className="mt-1"
                                                onChange={handleSocialChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </>
                        </div>
                        <div className='mb-2 mt-2'>
                            <InputLabel title="Sections" important />
                            <DndContext onDragEnd={handleDragEnd}>
                                <Droppable id="droppable">
                                    {parent.map(component => (
                                        <Draggable key={component.id} id={component.id}>
                                            <div className="flex mt-2">
                                                <DiceIcon
                                                    className='h-9 w-9'
                                                /><div className='ml-2 flex w-full bg-black text-white p-2'>Draggable ID {component.id}</div>
                                            </div>
                                        </Draggable>
                                    ))}
                                    <Button className='mt-4 border-0 bg-black' onClick={openMyModal}>Add Section</Button>
                                </Droppable>

                            </DndContext>

                        </div>
                    </div>
                    <div className='fixed right-0 m-4 z-40 overflow-hidden'>
                        <StorePreview previewData={store} />
                    </div>
                </div>
                <Button shape="pill" onClick={onCreateStore}>CREATE</Button>
            </div>
        </>
    );
}
