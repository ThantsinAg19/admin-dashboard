import React from 'react'
import {
    Link
} from '@material-ui/core'
import { FONT_CN, FONT_EN } from '../../constant/Language';
import i18n from 'i18next';

const Index = () => {
    
    /**
     * 
     * @param {} e  => event
     * @param {*} lang  => changed value
     */
    const handleClick = (e, lang) => {
        e.preventDefault();
        i18n.changeLanguage(lang);
    }

    return (
        <div
            style={{
                position: 'absolute',
                right: 50,
                top: 20,
                fontSize: 16
            }}>
            <Link color="inherit" href={""} onClick={e => handleClick(e, FONT_EN)}>
                Eng
            </Link>
            &nbsp;|&nbsp;
            <Link color="inherit" href={""} onClick={e => handleClick(e, FONT_CN)}>
                中文
            </Link>
        </div>
    )
}

export default Index;