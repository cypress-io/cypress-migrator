import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { ReactElement } from 'react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'

import { useAppDispatch, useAppSelector } from '../app/hooks'
import { selectAvailableLanguages, selectLanguage, setLanguage } from '../app/translatorSlice'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const SelectList = (): ReactElement => {
  const dispatch = useAppDispatch()

  const selectedLanguage = useAppSelector(selectLanguage);
  const availableLanguages = useAppSelector(selectAvailableLanguages)

  return (
    <Listbox value={selectedLanguage} onChange={(value) => dispatch(setLanguage(value))}>
      {({ open }) => (
        <>
          <div className="mt-1 relative">
            <Listbox.Button className="language-selected bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <span className="block text-2xl capitalize">{selectedLanguage}</span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm language-options-list">
                {availableLanguages.map((item) => (
                  <Listbox.Option
                    key={item}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white bg-indigo-600' : 'text-gray-900',
                        'cursor-default select-none relative py-2 pl-3 pr-9 language-option',
                      )
                    }
                    value={item.toLowerCase()}
                  >
                    {({ selected, active }) => (
                      <>
                        <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block text-2xl')}>
                          {item}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4',
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}

export default SelectList
