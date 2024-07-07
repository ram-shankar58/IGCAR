import React, { useState } from 'react';
import DataTable from 'react-data-table-component';

const ReusableTable = ({ headers, data }) => {
    const [filterText, setFilterText] = useState('');
    const [filteredData, setFilteredData] = useState(data);

    const handleFilter = (e) => {
        const value = e.target.value;
        setFilterText(value);
        setFilteredData(
            data.filter(item => 
                headers.some(header => 
                    item[header.title.toLowerCase()].toString().toLowerCase().includes(value.toLowerCase())
                )
            )
        );
    };

    const columns = headers.map(header => ({
        name: header.title,
        selector: row => row[header.title.toLowerCase()],
        sortable: true,
    }));

    return (
        <div>
            <input
                type="text"
                placeholder="Filter..."
                value={filterText}
                onChange={handleFilter}
            />
            <DataTable
                columns={columns}
                data={filteredData}
                pagination
            />
        </div>
    );
};

export default ReusableTable;
