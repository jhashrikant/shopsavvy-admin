import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { Button } from "@/components/ui/button"

export default function MyModal({ handleaddNewCategory, handlekeypress, handleLabelchange, labelname }) {
    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
        // handleCloseModal();
    }

    function openModal() {
        setIsOpen(true)
    }

    return (
        <>
            <div className=" inset-0 flex items-center justify-center">
                <Button
                    type="button"
                    onClick={openModal}
                // className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
                >
                    + Add new
                </Button>
            </div>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Add new Label
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            onKeyDown={handlekeypress}
                                            onChange={handleLabelchange}
                                            value={labelname}
                                            // value={labelName}
                                            // onChange={handleLabelNameChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                            placeholder="Enter label name"
                                        />
                                    </div>

                                    <div className="mt-4">
                                        <Button
                                            type="submit"
                                            onClick={handleaddNewCategory}
                                        // type="button"
                                        // onClick={handleSave}
                                        // className="inline-flex justify-center w-full rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        >
                                            Save Changes
                                        </Button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
