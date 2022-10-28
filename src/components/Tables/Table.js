import { layoutTheme } from "constants/layout";
import React, { useEffect, useState } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import { useSelector } from "react-redux";
import styled from "styled-components";
// layoutMode

const Table = ({ columns, data }) => {

  const [tableData, setTableData] = useState();

  const { layoutMode } = useSelector((state) => ({ layoutMode: state.Layout.layoutMode }));
  // checked={layoutMode === layoutTheme.LIGHTMODE} DARKMODE
  useEffect(() => {
    setTableData(data);
  }, []);


  console.log('layoutMode :>> ', layoutMode);

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
      customStyles={layoutMode === 'light' ? lightCustomStyles : darkCustomStyles}
      highlightOnHover
      pagination
      paginationServer
      sortServer
    />
  );
};

export default Table;
