import en_US from "antd/locale/en_US";
import ja_JP from "antd/locale/ja_JP";
import zh_CN from "antd/locale/zh_CN";
import { useTranslation } from "react-i18next";

import type { Locale as AntdLocal } from "antd/es/locale";
import { LocalEnum } from "#/enum";

// todo 学习keyof typeof关键字 record
// keyof typeof LocalEnum：typeof LocalEnum 表示获取 LocalEnum 的类型，
// 然后 keyof 操作符获取 LocalEnum 的所有键（即枚举值的名称）。
type Locale = keyof typeof LocalEnum;
type Language = {
	locale: keyof typeof LocalEnum;
	icon: string;
	label: string;
	antdLocal: AntdLocal;
};

// record和map 关键区别：
// 特性	Record<K, T>	Map
// 定义时机	编译时静态类型	运行时动态对象
// 键的类型	键只能是 string、number 或 symbol 类型	键可以是任意类型（包括对象、函数等）
// 值的类型	所有键的值的类型相同	值的类型可以是任意类型，可以动态修改
// 键是否动态	键是固定的，定义时确定	键是动态的，可以在运行时修改
// 存储方式	用于描述静态的键值对类型	用于存储动态的键值对
// 顺序	键的顺序不可保证（对象的键没有顺序）	保持键值对插入的顺序
// 性能	用于静态结构，不涉及频繁增删操作	用于动态结构，支持增删改查操作
// 4. 使用场景对比：
// Record：适合用于描述静态对象类型，在编译时就确定好键和对应值的类型。它通常用于类型约束或映射固定的键值对。
// 例如：创建一个配置对象，或者枚举类型映射表。
// Map：适合用于需要频繁增删查改操作的场景，尤其是当键值对的键可以是任意类型时。它的键和值在运行时动态变化。
// 例如：存储用户会话信息，缓存数据，频繁动态更新的键值对集合。
// 5. 性能：
// Record：由于其静态性质，Record 对象是非常轻量级的，只在编译时进行类型检查，运行时性能极好。
// Map：Map 由于是一个动态结构，在运行时执行添加、删除和查找时可能会有一些开销。不过它的查找效率较高，特别是在键值对较多时。
export const LANGUAGE_MAP: Record<Locale, Language> = {
	[LocalEnum.zh_CN]: {
		locale: LocalEnum.zh_CN,
		label: "Chinese",
		icon: "ic-locale_zh_CN",
		antdLocal: zh_CN,
	},
	[LocalEnum.en_US]: {
		locale: LocalEnum.en_US,
		label: "English",
		icon: "ic-locale_en_US",
		antdLocal: en_US,
	},
	[LocalEnum.ja_JP]: {
		locale: LocalEnum.ja_JP,
		label: "japanese",
		icon: "ic-locale_ja_JP",
		antdLocal: ja_JP,
	},
};

export default function useLocale() {
	const { i18n } = useTranslation();

	/**
	 * localstorage -> i18nextLng change
	 */
	const setLocale = (locale: Locale) => {
		i18n.changeLanguage(locale);
	};

	const locale = (i18n.resolvedLanguage || LocalEnum.en_US) as Locale;

	const language = LANGUAGE_MAP[locale];

	return {
		locale,
		language,
		setLocale,
	};
}
