import store from '../store'
import uk from '../locales/uk.json'
import en from '../locales/en.json'

const locales = {
  'uk-Ua': uk,
  'en-Us': en
}
export default function localizeFilter (key) {
  const locale = store.getters.info.locale || 'uk-Ua'
  return locales[locale][key] || `[Localize error] key ${key} not found`
}
