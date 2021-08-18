import React from 'react';
import { DataGrid } from '@material-ui/data-grid'


function index({
    columns = [],
    rows = []
}) {
    return (
        <div style={{
            height: 500,
            width:'100%'
        }}>
            <DataGrid
                columns={columns}
                rows={rows}
                pageSize={10}
                checkboxSelection
            />
        </div>
    );
}

export default index;