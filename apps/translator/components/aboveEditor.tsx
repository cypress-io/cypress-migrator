import { ReactElement } from "react"
import LanguagePills from "./languagePills"
import CopyButton from "./copyButton"

const AboveEditor = ({
  selectedLanguage,
  translated,
}: {
  selectedLanguage: "Protractor" | string
  translated: string
}): ReactElement => {
  return (
    <div className="grid grid-cols-3 gap-4 mb-2">
      <LanguagePills selectedLanguage={selectedLanguage} />
      <CopyButton translated={translated} />
    </div>
  )
}
export default AboveEditor
