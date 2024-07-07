import React, { useState, useMemo } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Checkbox, MenuItem, Menu, FormControlLabel, IconButton } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import './DataTable.css'; // Assuming you have a CSS file for custom styles

const DataTable = ({ columns, rows }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [filterColumn, setFilterColumn] = useState(null);
  const [filterValues, setFilterValues] = useState({});
  const open = Boolean(anchorEl);

  const handleFilterClick = (event, column) => {
    setAnchorEl(event.currentTarget);
    setFilterColumn(column);
  };

  const handleFilterChange = (value, column) => {
    setFilterValues((prev) => ({
      ...prev,
      [column.field]: value,
    }));
  };

  const handleCheckboxChange = (checked, option, column) => {
    setFilterValues((prev) => {
      const prevValues = prev[column.field] || [];
      let updatedValues = [];
      if (checked) {
        updatedValues = [...prevValues, option];
      } else {
        updatedValues = prevValues.filter((value) => value !== option);
      }
      return {
        ...prev,
        [column.field]: updatedValues,
      };
    });
  };

  const handleClose = () => {
    setAnchorEl(null);
    setFilterColumn(null);
  };

  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      return Object.entries(filterValues).every(([column, values]) => {
        if (!values || values.length === 0) return true;
        const cellValue = row[column] ? row[column].toString().toLowerCase() : '';
        return values.some((value) => cellValue.includes(value.toLowerCase()));
      });
    });
  }, [rows, filterValues]);

  const enhancedColumns = useMemo(() => {
    return columns.map((column) => ({
      ...column,
      headerClassName: 'highlight-header',
      renderHeader: (params) => (
        <Box display="flex" alignItems="center">
          {column.filterOptions && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <IconButton onClick={(event) => handleFilterClick(event, column)} size="small">
                <FilterListIcon fontSize="small" />
              </IconButton>
              <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                {filterColumn === column && (
                  <>
                    <MenuItem>
                      <input
                        type="text"
                        value={filterValues[column.field] || ''}
                        onChange={(event) => handleFilterChange(event.target.value, column)}
                        placeholder={`Filter ${column.headerName}`}
                      />
                    </MenuItem>
                    {column.filterOptions.map((option) => (
                      <MenuItem key={option}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={
                                filterValues[column.field]?.includes(option) || false
                              }
                              onChange={(event) =>
                                handleCheckboxChange(
                                  event.target.checked,
                                  option,
                                  column
                                )
                              }
                            />
                          }
                          label={option}
                        />
                      </MenuItem>
                    ))}
                  </>
                )}
              </Menu>
            </div>
          )}
          <span>{params.colDef.headerName}</span>
        </Box>
      ),
      disableColumnMenu: true, // Disable the default column menu
    }));
  }, [
    columns,
    filterColumn,
    filterValues,
    handleFilterClick,
    handleFilterChange,
    handleCheckboxChange,
    anchorEl,
    open,
    handleClose,
  ]);

  const rowsWithSerialNo = useMemo(() => {
    return rows.map((row, index) => ({ ...row, serialNo: index + 1 }));
  }, [rows]);

  return (
    <Box>
      <DataGrid
        columns={enhancedColumns}
        rows={filteredRows.length ? filteredRows : rowsWithSerialNo}
        pageSize={5}
        autoHeight
        components={{
          NoRowsOverlay: () => (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
              }}
            >
              {filteredRows.length === 0 && <span>No records found.</span>}
            </div>
          ),
        }}
      />
    </Box>
  );
};

export default DataTable;