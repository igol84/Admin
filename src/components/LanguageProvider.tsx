import {LanguageModeContext, useLanguageMode} from "../language";

interface Props {
  children: JSX.Element
}

const LanguageProvider = (props: Props) => {
  const {children} = props
  const [LanguageMode] = useLanguageMode()


  return (
    <LanguageModeContext.Provider value={LanguageMode}>
      {children}
    </LanguageModeContext.Provider>
  )
}

export default LanguageProvider