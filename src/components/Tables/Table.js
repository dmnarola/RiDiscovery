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



  const initialState = {
    limit: pageSize,
    page: currentPage,
  }

  const [obj, setObj] = useState({
    ...initialState,
    ...extra,
    ...filter
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
      makeAPICall({ option: dataURL, data: obj }).then(resp => {
        setTableData(resp?.data);
        setResPaginator(resp?.data === null ? 0 : resp?.totalRecords);
      }).finally(() => {
        setLoading(false);
      });
    }
  }, [dataURL, obj, isRefresh]);


  useEffect(() => {
    if (filter) {
      if (Object.keys(filter)?.length) {
        setObj({
          ...initialState,
          ...filter
        })
      }
      else {
        setObj(initialState)
      }
    }
  }, [filter]);


  const handlePageChange = (pgNo) => {
    let options = {
      ...obj,
      page: pgNo,
    };
    setObj(options);
    setCurrentPage(pgNo);
  };

  const handlePerRowsChange = (pgSize) => {
    let options = {
      ...obj,
      limit: pgSize,
      page: 1,
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
          <div className="spinner-grow text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      }
      theme={layoutMode === 'light' ? "solarized" : "dark"}
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


    />
  );
};

export default Table;
