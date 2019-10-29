import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-xhr-backend";

const languages = ["en", "es", "ar"];

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      // for all available options read the backend's repository readme file
      loadPath: "../static/frontend/locales/{{lng}}/{{ns}}.json"
    },
    lng: languages,

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    },
    backend: {
      // for all available options read the backend's repository readme file
      loadPath: "../static/frontend/locales/{{lng}}/{{ns}}.json"
    }
  });

export default i18n;
