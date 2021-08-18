import i18n from 'i18next';

import LanguageDetector from 'i18next-browser-languagedetector';

/**
 *  TODO tsa - anyone - if you want to add some value or keyword,plz notice and sort the value alphabetically
 *  use this link 
 *  easy link to sort json :  https://novicelab.org/jsonabc/
 */

export const FONT_CN = 'zh'
export const FONT_EN = 'en'

export const LANGUAGES = [
    {
        name: 'English',
        value: FONT_EN
    },
    {
        name: '中文',
        value: FONT_CN
    },

]

i18n.use(LanguageDetector)
    .init({
        resources: {
            'en': {
                translation: {
                    "header": {
                        "title_text": "Management Dashboard"
                    },
                }
            },

            'zh': {
                translation: {
                    "header": {
                        "title_text": "管理仪表板"
                    },
                    
                }
            },


        },
        debug: true,
        ns: ["translation"],
        defaultNS: 'translation',
        fallbackLng: FONT_EN,
        keySeparator: '.',
        interpolation: {
            formatSeparator: ','
        },
        react: {
            wait: true
        }
    })

export default i18n