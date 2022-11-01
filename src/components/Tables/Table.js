import React, { useEffect, useState } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import { useSelector } from "react-redux";

const Table = ({ columns, data, handleChange }) => {

  const [tableData, setTableData] = useState();

  const { layoutMode } = useSelector((state) => ({ layoutMode: state.Layout.layoutMode }));

  useEffect(() => {
    setTableData(data);
  }, []);

  const lightCustomStyles = {
    headCells: {
      style: {
        backgroundColor: "#e9e9ef",
        fontSize: "15px"
      },
    },
  };
  const darkCustomStyles = {
    headCells: {
      style: {
        backgroundColor: "#2c302e",
        fontSize: "15px"
      },
    },
  }

  createTheme('solarized', {
    text: {
      primary: '#000000',
      secondary: '#000000',
      disabled: 'rgba(0, 0, 0, 0.38)'
    },
    background: {
      default: 'transparent',
    },
    divider: {
      default: 'rgba(0,0,0,.12)',
    },
    action: {
      button: 'rgba(0,0,0,.54)',
      hover: 'rgba(0,0,0,.08)',
      disabled: 'rgba(0,0,0,.12)',
    },
  });

  createTheme('dark', {
    text: {
      primary: '#6f767e',
      secondary: '#6f767e',
      disabled: 'rgba(0, 0, 0, 0.38)'
    },
    background: {
      default: 'transparent',
    },
    highlightOnHover: {
      default: 'rgba(0,0,0,.08)',
      text: '#6f767e',
    },
  });

  return (
    <DataTable
      columns={columns}
      data={tableData}
      theme={layoutMode === 'light' ? "solarized" : "dark"}
      fixedHeaderScrollHeight="400px"
      customStyles={layoutMode === 'light' ? lightCustomStyles : darkCustomStyles}
      sortServer
      fixedHeader
      pagination
      paginationServer
      highlightOnHover
      onRowClicked={handleChange ? handleChange : null}
    />
  );
};

export default Table;
