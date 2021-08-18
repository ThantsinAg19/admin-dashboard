import React, { useState, useEffect, useCallback } from 'react';
import TablePagination from '@material-ui/core/TablePagination';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import _ from 'lodash';

const Index = ({ length = 0, fetch }) => {

    const { pathname, search } = useLocation();
    const history = useHistory();

    const dispatch = useDispatch();

    const query = new URLSearchParams(search);
    /**
     * state
     */
    const [page, setPage] = useState(query.get('page') || 1);
    const [limit, setLimit] = useState(query.get('limit') || 10);

    const [totalDocs, ] = useState(0);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debounce_calling = useCallback(_.debounce(() => { dispatch(fetch) }, 800), [])

    const handleChangePage = (event, newPage) => {
        setPage(newPage + 1);
    }

    const handleChangeRowsPerPage = (event) => {
        setLimit(parseInt(event.target.value || 10, 10));
        setPage(1);
    }

    useEffect(() => {
        history.replace({
            pathname,
            search: `?page=${page}&limit=${limit}`
        })
        debounce_calling()
    }, [history, pathname, page, limit, debounce_calling])

    // useEffect(() => {
    //     const total = query.get('total')
    //     if (total > 0)
    //         setTotalDocs(parseInt(total));
    // }, [query])

    return (
        <TablePagination
            component="div"
            rowsPerPageOptions={[5, 10, 25, 50, 100]}
            count={(totalDocs)}
            page={parseInt(page) - 1}
            onChangePage={handleChangePage}
            rowsPerPage={parseInt(limit)}
            onChangeRowsPerPage={handleChangeRowsPerPage}
        />
    )
}

export default Index;