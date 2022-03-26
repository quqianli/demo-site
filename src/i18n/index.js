import { createI18n } from 'vue-i18n'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'
import localZhCn from './languages/zh-cn'
import localEn from './languages/en'

const i18n = createI18n({
  legacy: false,
  locale: 'zh-cn',
  fallbackLocale: 'zh-cn',
  messages: {
    'zh-cn': localZhCn,
    'en': localEn
  }
})
export default i18n

export const elementLocales = {
  'zh-cn': zhCn,
  en
}