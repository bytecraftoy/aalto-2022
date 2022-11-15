import { Disclosure, Transition } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';

/**
 * A collapsible infobox based on
 * headlessUI Disclosure.
 *
 */
export const InfoModal = () => {
    return (
        <div className="w-full px-4 pt-6 pb-6">
            <div className="mx-auto bg-white text-black w-full max-w-xl rounded-2xl p-2 shadow-lg">
                <Disclosure>
                    {({ open }) => (
                        <>
                            <Disclosure.Button className="px-10 py-8 text-2xl font-medium leading-6  bg-blue-500 hover:bg-blue-600 text-white flex w-full justify-between rounded-lg text-left transition-colors">
                                <div className="flex flex-row justify-around items-center w-full">
                                    <span>Info</span>
                                </div>

                                <ChevronUpIcon
                                    className={`${
                                        open ? '' : 'rotate-180 transform'
                                    } h-5 w-5 `}
                                />
                            </Disclosure.Button>
                            <Transition
                                show={open}
                                enter="transition duration-100 ease-out"
                                enterFrom="transform opacity-0"
                                enterTo="transform opacity-100"
                                leave="transition duration-100 ease-out"
                                leaveFrom="transform opacity-100"
                                leaveTo="transform opacity-0"
                            >
                                <Disclosure.Panel
                                    static
                                    className="border-t px-8 py-8"
                                >
                                    <p className="text-black font-medium text-lg">
                                        Did you ever hear the tragedy of Darth
                                        Plagueis The Wise? I thought not. It’s
                                        not a story the Jedi would tell you.
                                        It’s a Sith legend. Darth Plagueis was a
                                        Dark Lord of the Sith, so powerful and
                                        so wise he could use the Force to
                                        influence the midichlorians to create
                                        life... He had such a knowledge of the
                                        dark side that he could even keep the
                                        ones he cared about from dying. The dark
                                        side of the Force is a pathway to many
                                        abilities some consider to be unnatural.
                                        He became so powerful... the only thing
                                        he was afraid of was losing his power,
                                        which eventually, of course, he did.
                                        Unfortunately, he taught his apprentice
                                        everything he knew, then his apprentice
                                        killed him in his sleep. Ironic. He
                                        could save others from death, but not
                                        himself.
                                    </p>
                                </Disclosure.Panel>
                            </Transition>
                        </>
                    )}
                </Disclosure>
            </div>
        </div>
    );
};
