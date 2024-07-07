// src/components/DataTable.js
import React, { useState, useRef } from 'react';
import './DataTable.css';
import 'bulma/css/bulma.css';

const DataTable = ({ columns, rows }) => {
  const [filterOptions, setFilterOptions] = useState({});
  const [sortConfig, setSortConfig] = useState(null);
  const [activeFilterColumn, setActiveFilterColumn] = useState(null);
  const filterRef = useRef(null);
  const [filterPosition, setFilterPosition] = useState({ top: 0, left: 0 });

  const handleSort = (column) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === column.field && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key: column.field, direction });
  };

  const sortedRows = [...rows].sort((a, b) => {
    if (sortConfig) {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
    }
    return 0;
  });

  const handleFilterChange = (field, type, value) => {
    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      [field]: {
        ...prevOptions[field],
        [type]: value,
      },
    }));
  };

  const applyFilter = (rows) => {
    return rows.filter((row) => {
      return columns.every((column) => {
        const filter = filterOptions[column.field];
        if (!filter) return true;

        const { text, min, max } = filter;
        const cellValue = row[column.field].toString().toLowerCase();

        let isValid = true;
        if (text && !cellValue.includes(text.toLowerCase())) isValid = false;
        if (min && parseFloat(cellValue) < parseFloat(min)) isValid = false;
        if (max && parseFloat(cellValue) > parseFloat(max)) isValid = false;

        return isValid;
      });
    });
  };

  const filteredRows = applyFilter(sortedRows);

  const handleHeaderClick = (column, event) => {
    const rect = event.target.getBoundingClientRect();
    setFilterPosition({ top: rect.top + window.scrollY, left: rect.right + window.scrollX });
    setActiveFilterColumn(column.field);
  };

  return (
    <div className="table-container">
      <table className="table is-striped is-hoverable">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.field}
                onClick={(event) => handleHeaderClick(column, event)}
              >
                {column.headerName}
                {sortConfig && sortConfig.key === column.field && (
                  <span>{sortConfig.direction === 'ascending' ? ' ▲' : ' ▼'}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredRows.map((row) => (
            <tr key={row.id}>
              {columns.map((column) => (
                <td key={column.field}>{row[column.field]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {activeFilterColumn && (
        <div className="filter-popup" ref={filterRef} style={{ top: filterPosition.top, left: filterPosition.left }}>
          <input
            type="text"
            placeholder="Text filter"
            value={filterOptions[activeFilterColumn]?.text || ''}
            onChange={(e) => handleFilterChange(activeFilterColumn, 'text', e.target.value)}
            className="input is-small"
          />
          {columns.find(col => col.field === activeFilterColumn)?.type === 'number' && (
            <>
              <input
                type="number"
                placeholder="Min"
                value={filterOptions[activeFilterColumn]?.min || ''}
                onChange={(e) => handleFilterChange(activeFilterColumn, 'min', e.target.value)}
                className="input is-small"
              />
              <input
                type="number"
                placeholder="Max"
                value={filterOptions[activeFilterColumn]?.max || ''}
                onChange={(e) => handleFilterChange(activeFilterColumn, 'max', e.target.value)}
                className="input is-small"
              />
            </>
          )}
          <button className="button is-small" onClick={() => setActiveFilterColumn(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default DataTable;
