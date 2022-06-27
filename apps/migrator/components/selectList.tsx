import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { ReactElement } from 'react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/solid'

import { selectAvailableLanguages, selectLanguage, setLanguage, useAppDispatch, useAppSelector } from '../app'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const SelectList = (): ReactElement => {
  const dispatch = useAppDispatch()

  const selectedLanguage = useAppSelector(selectLanguage)
  const availableLanguages = useAppSelector(selectAvailableLanguages)

  return (
    <Listbox value={selectedLanguage} onChange={(value) => dispatch(setLanguage(value))}>
      {({ open }) => (
        <div className="mt-1 relative">
          <Listbox.Button
              className="language-selected bg-white relative w-3/4 sm:w-full pl-3 pr-10 py-2 px-3 text-left cursor-default ring-1 ring-indigo-500"
              data-test="language-select-button"
            >
              <span className="text-indigo-400 lg:text-5xl md:text-3xl text-2xl font-semibold capitalize mr-2">{selectedLanguage}</span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <ChevronDownIcon className="lg:h-10 lg:w-10 md:h-9 md:w-9 h-6 w-6
              text-indigo-400" aria-hidden="true"/>
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options
                className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm language-options-list"
                data-test="language-select-options"
              >
                {availableLanguages.map((item) => (
                  <Listbox.Option
                    key={item}
                    className={({ active, selected }) =>
                      classNames(
                        active || selected ? 'text-gray-900 bg-jade-200' : 'text-gray-900',
                        'cursor-default select-none relative py-2 pl-3 pr-9 language-option capitalize',
                      )
                    }
                    value={item.toLowerCase()}
                  >
                    {({ selected, active }) => (
                      <>
                        <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block lg:text-3xl md:text-2xl sm:text-xl')}>
                          {item}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-gray-900' : 'text-gray-900',
                              'absolute inset-y-0 right-0 flex items-center px-4',
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
      )}
    </Listbox>
  )
}

export default SelectList
