import React, { useState, useRef } from 'react';
import './DataTable.css';
import 'bulma/css/bulma.css';
import { FilterList } from '@mui/icons-material';

const DataTable = ({ columns, rows }) => {
  const [filterOptions, setFilterOptions] = useState({});
  const [sortConfig, setSortConfig] = useState(null);
  const [activeFilterColumn, setActiveFilterColumn] = useState(null);
  const filterRef = useRef(null);
  const [filterPosition, setFilterPosition] = useState({ top: 0, left: 0 });
  const [showFilter, setShowFilter] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

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

  const handleHeaderClick = (column, isFilterIconClicked) => {
    setActiveFilterColumn(column.field);
    const filterElement = filterRef.current;
    if (filterElement) {
      const rect = filterElement.getBoundingClientRect();
      setFilterPosition({ top: rect.top + window.scrollY, left: rect.left - 300 });
    }

    if (isFilterIconClicked) {
      setShowFilter(!showFilter);
      setFilterOpen(!filterOpen);
    } else {
      setShowFilter(false);
      setFilterOpen(false);
      handleSort(column);
    }
  };

  const handleFilterReset = (field) => {
    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      [field]: {
        text: '',
        min: '',
        max: '',
      },
    }));
    setFilterOpen(false);
  };

  return (
    <div className="table-container">
      {showFilter && (
        <div className="filter-sidebar">
          {activeFilterColumn && (
            <div className="filter-popup box" ref={filterRef} style={{ top: filterPosition.top, left: filterPosition.left }}>
              <div>
                <strong className="has-text-info">Filter for {columns.find((col) => col.field === activeFilterColumn).headerName}</strong>
              </div>
              <input
                type="text"
                placeholder="Text filter"
                value={filterOptions[activeFilterColumn]?.text || ''}
                onChange={(e) => handleFilterChange(activeFilterColumn, 'text', e.target.value)}
                className="input is-small mb-2"
              />
              {columns.find((col) => col.field === activeFilterColumn)?.type === 'number' && (
                <>
                  <input
                    type="number"
                    placeholder="Min"
                    value={filterOptions[activeFilterColumn]?.min || ''}
                    onChange={(e) => handleFilterChange(activeFilterColumn, 'min', e.target.value)}
                    className="input is-small mb-2"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={filterOptions[activeFilterColumn]?.max || ''}
                    onChange={(e) => handleFilterChange(activeFilterColumn, 'max', e.target.value)}
                    className="input is-small mb-2"
                  />
                </>
              )}
              <div className="buttons">
                <button className="button is-small is-info mr-2" onClick={() => handleFilterReset(activeFilterColumn)}>
                  Reset Filters
                </button>
                <button className="button is-small" onClick={() => { setActiveFilterColumn(null); setFilterOpen(false); setShowFilter(false); }}>
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      <div className={`table-wrapper ${filterOpen ? 'with-filter' : ''}`}>
        <table className="table is-striped is-hoverable is-fullwidth">
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.field}
                  onClick={() => handleHeaderClick(column, false)}
                  className={`sortable ${sortConfig && sortConfig.key === column.field ? sortConfig.direction : ''}`}
                >
                  <span className="has-text-info">{column.headerName}</span>
                  {sortConfig && sortConfig.key === column.field && (
                    <span className="ml-1">{sortConfig.direction === 'ascending' ? ' ▲' : ' ▼'}</span>
                  )}
                  <span className="filter-icon" onClick={(e) => { e.stopPropagation(); handleHeaderClick(column, true); }}>
                    <FilterList />
                  </span>
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
      </div>
    </div>
  );
};

export default DataTable;
