import React from 'react';
import _ from 'lodash';
import { makeStyles } from '@material-ui/core';
import { useTranslation } from "react-i18next";

const useStyles = makeStyles({
    row: {
        border: '2px solid #ECECEC',
    },
    td: {
        padding: '3px 10px',
        verticalAlign: 'top',
        borderLeft: '1px solid #ECECEC '
    },
    button: {

    }
})

const Index = ({
    columns = [],
    rows = [],
    has_data = true
}) => {
    const {t} = useTranslation();
    const classes = useStyles()

    /**
     * 
     * @param {*} item  each rows from the data loop
     * @param {*} col  field name from the render header field
     */
    const renderCell = (item, col, index) => {

        const value = _.get(item, col.field);

        if (col.content) return col.content(item, index);

        return value;

    }

    if (!has_data)
        return (
            <tbody>
                <tr>
                    <td colSpan={ '100%' } className={ classes.td }>
                        <center>{t('scanning.nodata')}</center>
                    </td>
                </tr>
            </tbody>
        )

    return (
        <tbody>
            {
                rows.map((row, index) => (
                    <React.Fragment key={ index + row._id }>
                        <tr className={ classes.row }>
                            <td className={ classes.td }>
                                { index + 1 }
                            </td>
                            {
                                columns.map(col => (
                                    <td key={ row._id + col.field } className={ classes.td }>
                                        {renderCell(row, col, index) }
                                    </td>
                                ))
                            }
                        </tr>
                    </React.Fragment>
                ))
            }
        </tbody>
    );
}

export default Index;