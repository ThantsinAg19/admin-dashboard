
import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    td: {
        padding: '10px 10px',
        borderLeft: '1px solid #ECECEC',
        borderRight: '1px solid #ECECEC'
    }
})

const Index =  ({
    columns = [],
    sortedColumn,
    onSort = _ => null
}) => {

    const { t } = useTranslation();
    const classes = useStyles()

    return (
        <thead>
            <tr style={{
                border: '3px solid #e9e9ef',
                
            }}>
                <td className={classes.td}>
                    {t('no')}
                </td>
                {columns.map(col => (
                    <td key={col.field}
                        className={classes.td}
                        onClick={() => onSort(col.field)}
                    >
                        <b>{t(`${col.header}`)}</b>
                    </td>
                ))}
            </tr>
        </thead>
    );
}

export default Index