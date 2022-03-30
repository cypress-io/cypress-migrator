import { Switch } from '@headlessui/react'
import { selectDisplayDiff, setDisplayDiff, useAppDispatch, useAppSelector } from '../app'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const DiffToggle = () => {
  const enabled = useAppSelector(selectDisplayDiff)
  const dispatch = useAppDispatch()
  const setEnabled = () => dispatch(setDisplayDiff(!enabled))

  return (
    <Switch.Group as="div" className="flex items-center">
      <Switch
        checked={enabled}
        onChange={() => setEnabled()}
        className={classNames(
          enabled ? 'bg-jade-300' : 'bg-gray-400',
          'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-jade-300',
        )}
      >
        <span
          aria-hidden="true"
          className={classNames(
            enabled ? 'translate-x-5' : 'translate-x-0',
            'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
          )}
        />
      </Switch>
      <Switch.Label as="span" className="ml-3">
        <span className="text-sm font-medium text-gray-900">Display Diff Coloring</span>
      </Switch.Label>
    </Switch.Group>
  )
}
export default DiffToggle
