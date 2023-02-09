import {createContext, useMemo, useState} from "react";


import ua from './ua.json';
import en from './en.json';
import ru from './ru.json';

// context for language mode
const LANGUAGE_KEY = 'language'


const dictionaryList = {ua, en, ru};
const languageOptions = {
  ua: 'Український',
  en: 'English',
  ru: 'Руский'
};
export type LanguageType = keyof typeof languageOptions

const defaultLanguage: LanguageType = localStorage.getItem(LANGUAGE_KEY) === 'ua' ? 'ua' :
  localStorage.getItem(LANGUAGE_KEY) === 'ru' ? 'ru': 'en'

interface LanguageModeType {
  dictionary: any,
  language: string,
  languageOptions: typeof languageOptions,
  setLanguageMode: (value: LanguageType) => void
}

export const LanguageModeContext = createContext<LanguageModeType>({
  dictionary: dictionaryList[defaultLanguage],
  language: defaultLanguage,
  languageOptions: languageOptions,
  setLanguageMode: (value: LanguageType) => {
    console.log(value)
  }
})

export const useLanguageMode = (): [LanguageModeType] => {
  const [mode, setMode] = useState<LanguageType>(defaultLanguage)
  const languageMode = useMemo(
    () => {
      return ({
        dictionary: dictionaryList[mode],
        language: mode,
        languageOptions: languageOptions,
        setLanguageMode: (value: LanguageType) => {
          setMode(value)
          localStorage.setItem(LANGUAGE_KEY, value)
        }

      })
    }, [mode]
  )

  return [languageMode]
}

