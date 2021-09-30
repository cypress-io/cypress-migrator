import { ReactElement } from 'react'
import { LanguagePills, CopyButton } from '.'
import { useAppSelector, selectLanguage } from '../app'

const AboveEditor = ({
  translated,
}: {
  translated: string
}): ReactElement => {
  const selectedLanguage: string = useAppSelector(selectLanguage);
  
  return (
    <div className="grid grid-cols-3 gap-4 mb-2">
      <LanguagePills selectedLanguage={selectedLanguage} />
      <CopyButton translated={translated} />
    </div>
  )
}
export default AboveEditor
