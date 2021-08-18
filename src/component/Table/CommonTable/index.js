import React, { useEffect, useState } from 'react';

import TableHeader from './TableHeader';
import TableBody from './TableBody';
import { TableContainer } from '@material-ui/core';
import Pagination from '../Pagination';

export default React.memo(({
    columns = [],
    rows = [],
    showAll = true,
    onSort = _ => { },
    fetch
}) => {

    const [currentRow, setcurrentRow] = useState(0);

    const filter_columns = columns.filter(col => col.check)
    const has_data = rows.length > 0

    let header_col = filter_columns
    if (!showAll)
        if (!has_data)
            header_col = filter_columns.slice(0, 6)


    useEffect(() => {
        if (rows.length > 0)
            setcurrentRow(rows.length)
    }, [rows])

    const ref = React.useRef(0);

    console.log(`table is running for ${ref.current++}`)

    return (
        <TableContainer>
            <table style={{
                width: '100%',
                borderCollapse: 'collapse'
            }}>

                <TableHeader
                    columns={header_col}
                    onSort={onSort}
                    sortedColumn={{}}
                />

                <TableBody
                    columns={header_col}
                    rows={rows}
                    has_data={has_data}
                />
            </table>

            {
                typeof (fetch) === "function" &&
                <Pagination
                    length={currentRow}
                    fetch={fetch}
                />
            }
        </TableContainer>
    );
})
