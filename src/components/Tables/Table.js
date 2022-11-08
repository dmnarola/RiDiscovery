import { makeAPICall } from "helpers/api_helper";
import { COMPANY } from "helpers/services/Company";
import React, { useEffect, useState } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import { useSelector } from "react-redux";

const Table = (props) => {

  const {
    columns,
    tableDATA, // for static data
    dataURL,
    useSelfToken,
    query,
    search,
    filter,
    showPagination: paginationSetting,
    populateValue,
    sorting,
    selectValues,
    customStyles = {},
    expandableRows = false,
    expandedComponent,
    extra,
    isRefresh,
  } = props;

  const { layoutMode } = useSelector((state) => ({ layoutMode: state.Layout.layoutMode }));

  const showPagination = paginationSetting ? paginationSetting : true;
  const [tableData, setTableData] = useState(tableDATA);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [resPaginator, setResPaginator] = useState(0);
  const defaultSort = sorting ? Object.keys(sorting)[0] : null;


  const [obj, setObj] = useState({
    // query: filter ? filter.query : query ? query : {},
    options: {
      limit: pageSize,
      page: currentPage, // page // offset logic need to create  (offset === page)
      // sort: sorting,
      ...extra
      // pagination: true,
    },
    // search: filter ? filter.search : search ? search : undefined,
  });


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


  useEffect(() => {
    if (obj) {
      setLoading(true);
      makeAPICall({ option: dataURL, data: obj?.options }).then(resp => {
        setTableData(resp?.data);
        setResPaginator(resp?.data === null ? 0 : resp?.totalRecords);
      }).finally(() => {
        setLoading(false);
      });
    }
  }, [dataURL, obj, isRefresh]);


  const handlePageChange = (pgNo) => {
    let options = {
      ...obj,
      options: {
        ...obj.options,
        page: pgNo,
      },
    };
    setObj(options);
    setCurrentPage(pgNo);
  };

  const handlePerRowsChange = (pgSize) => {
    let options = {
      ...obj,
      options: {
        ...obj.options,
        limit: pgSize,
        page: 1,
      },
    };
    setCurrentPage(1);
    setObj(options);
    setPageSize(pgSize);
  };


  return (
    <DataTable
      columns={columns}
      data={tableData}
      progressPending={loading}
      progressComponent={
        <div className='d-flex justify-content-center my-4 gap-1'>
          <span className=''>
            loading...
          </span>
        </div>
      }
      theme={layoutMode === 'light' ? "solarized" : "dark"}
      fixedHeaderScrollHeight="400px"
      customStyles={layoutMode === 'light' ? lightCustomStyles : darkCustomStyles}
      sortServer
      fixedHeader
      highlightOnHover
      defaultSortFieldId={defaultSort}
      defaultSortAsc={true}


      paginationServer
      pagination={showPagination}
      onChangePage={handlePageChange}
      onChangeRowsPerPage={handlePerRowsChange}
      paginationPerPage={pageSize}
      paginationTotalRows={resPaginator ? resPaginator : 0}


    // onSort={(column, sortDirection) => {
    //   handleSort(column, sortDirection);
    // }}




    />
  );
};

export default Table;
