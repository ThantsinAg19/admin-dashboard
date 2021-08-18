import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
    open_dialog,
    set_temp_data
} from '../../../module/reducer/reducer.components'
import AppButton, { ButtonType } from '../../AppButton'
import {useTranslation} from 'react-i18next';

const Index =  (props) => {

    const dispatch = useDispatch();

    const {t} = useTranslation();

    const history = useHistory();

    const handler = () => {
        if (props.route) {
            history.push({
                pathname: props.route,
                state: props.data,
                currentIndex: props.index
            });
        }

        else {

            dispatch(set_temp_data(props))
            dispatch(open_dialog())
        }
    }

    return (
        <AppButton
            variant={ButtonType.variant.contained}
            color={ButtonType.color.primary}
            onClick={handler}
        >
            {t('update')}
        </AppButton>
    )
}

export default Index;