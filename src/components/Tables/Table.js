import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

const Table = ({ columns, data }) => {

  const [tableData, setTableData] = useState();

  useEffect(() => {
    setTableData(data);
  }, []);


  const customStyles = {
    headCells: {
      style: {
        backgroundColor: "#e9e9ef"
      },
    },
  };

  return (
    <DataTable
      columns={columns}
      data={tableData}
      customStyles={customStyles}
      highlightOnHover
      pagination
      paginationServer
      sortServer
    />
  );
};

export default Table;
