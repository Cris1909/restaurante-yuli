
import {UserConfig} from 'next-i18next'

interface I18nConfig extends Omit<UserConfig, "i18n"> {
    locales: string[];
    defaultLocale: string;
}

const i18nConfig: I18nConfig = {
    locales: ["en", "es"],
    defaultLocale: "es",
};

export default i18nConfig;
