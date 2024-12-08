import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import en_US from "@/locale/lang/en_US/index.js";
import ja from "@/locale/lang/ja/index.js";
import zh_CN from "@/locale/lang/zh_CN/index.js";

const defaultLocale = localStorage.getItem("i18nextLng") || "en_US";

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		debug: true,
		lang: defaultLocale,
		facingMode: "en_US",
		interpolation: {
			escapeValue: false,
		},
		resources: {
			en_US: { translation: en_US },
			zh_CN: { translation: zh_CN },
			ja: { translation: ja },
		},
	});

export default i18n;
// todo
export const { t } = i18n;
