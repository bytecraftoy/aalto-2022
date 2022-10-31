import { Disclosure, Transition } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';

export const TailwindTestModal = () => {
    return (
        <div className="w-full px-4 pt-16">
            <div className="mx-auto w-full max-w-xl rounded-2xl bg-slate-700 p-2">
                <Disclosure>
                    {({ open }) => (
                        <>
                            <Disclosure.Button className="px-10 py-8 text-2xl font-medium leading-6 text-stone-400 flex w-full justify-between rounded-lg bg-slate-700 text-left hover:bg-slate-600 transition-colors">
                                <span>Missile information</span>
                                <ChevronUpIcon
                                    className={`${
                                        open ? '' : 'rotate-180 transform'
                                    } h-5 w-5 text-slate-500`}
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
                                    className="border-t border-slate-600 px-8 py-8"
                                >
                                    <p className="text-stone-400 font-medium text-lg">
                                        The missile knows where it is at all
                                        times. It knows this because it knows
                                        where it isn’t. By subtracting where it
                                        is from where it isn’t, or where it
                                        isn’t from where it is (whichever is
                                        greater), it obtains a difference, or
                                        deviation. The guidance subsystem uses
                                        deviations to generate corrective
                                        commands to drive the missile from a
                                        position where it is to a position where
                                        it isn’t, and arriving at a position
                                        where it wasn’t, it now is.
                                        Consequently, the position where it is,
                                        is now the position that it wasn’t, and
                                        it follows that the position that it
                                        was, is now the position that it isn’t.
                                        In the event that the position that it
                                        is in is not the position that it
                                        wasn’t, the system has acquired a
                                        variation, the variation being the
                                        difference between where the missile is,
                                        and where it wasn’t. If variation is
                                        considered to be a significant factor,
                                        it too may be corrected by the GEA.
                                        However, the missile must also know
                                        where it was. The missile guidance
                                        computer scenario works as follows.
                                        Because a variation has modified some of
                                        the information the missile has
                                        obtained, it is not sure just where it
                                        is. However, it is sure where it isn’t,
                                        within reason, and it knows where it
                                        was. It now subtracts where it should be
                                        from where it wasn’t, or vice-versa, and
                                        by differentiating this from the
                                        algebraic sum of where it shouldn’t be,
                                        and where it was, it is able to obtain
                                        the deviation and its variation, which
                                        is called error.
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
