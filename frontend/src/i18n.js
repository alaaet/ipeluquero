import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-xhr-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import store from "./store";
// not like to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init
const langs = ["en", "es", "ar"];
// grab current state
const state = store.getState();
const lang = state.auth.lang ? state.auth.lang : "en";
i18n
  // load translation using xhr -> see /public/locales
  // learn more: https://github.com/i18next/i18next-xhr-backend
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: lang,
    debug: false,
    lng: lang,
    whitelist: langs,
    interpolation: {
      //escapeValue: false, // not needed for react as it escapes by default
    },
    backend: {
      // for all available options read the backend's repository readme file
      loadPath: "../static/frontend/locales/{{lng}}/{{ns}}.json"
    }
  });

export default i18n;
