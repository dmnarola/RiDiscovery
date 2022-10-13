import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

const Table = ({ columns, data }) => {
  // console.log("columns :>> ", columns);

  const [tableData, setTableData] = useState();

  useEffect(() => {
    setTableData(data);
  }, []);

  // console.log("tableData :>> ", tableData);

  return (
    <DataTable
      columns={columns}
      data={tableData}
      highlightOnHover
      pagination
      paginationServer
      sortServer
    />
  );
};

export default Table;
