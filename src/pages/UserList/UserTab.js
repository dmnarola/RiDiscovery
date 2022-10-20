import Table from 'components/Tables/Table';
import React from 'react'
import DataTable from 'react-data-table-component'

const UserTab = (props) => {
    const { columns, userDetails } = props

    const customStyles = {
        rows: {
            style: {
                minHeight: '72px', // override the row height
                border: "none"
            },
        },
        headCells: {
            style: {
                paddingLeft: '8px', // override the cell padding for head cells
                paddingRight: '8px',
                fontSize: '16px'
            },
        },
        cells: {
            style: {
                paddingLeft: '8px', // override the cell padding for cells
                paddingRight: '8px',
            },
        },
    };

    return (
        <>
            <div className="d-flex mb-5">
                <div className="ms-3">
                    <div className="profile-container">
                        <img
                            src={userDetails?.image}
                            alt="image"
                            className="profileCover"
                            name="userProfile"
                        />
                    </div>
                </div>
                <div className="flex-grow-1 align-self-center ms-3">
                    <div className="text-muted">
                        <h5>{userDetails?.firstName} {userDetails?.lastName}</h5>
                        <p className="mb-1">{userDetails?.email}</p>
                    </div>
                </div>
            </div>
            <div>
                <DataTable
                    columns={columns}
                    data={[userDetails]}
                    customStyles={customStyles}
                />

                {/* <table className="table table-borderless">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">First</th>
                            <th scope="col">Last</th>
                            <th scope="col">Handle</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td colSpan="2">Larry the Bird</td>
                            <td>@twitter</td>
                        </tr>
                    </tbody>
                </table> */} {/* @Foram >> we can also use this simple html table ele */}
            </div>
        </>
    )
}

export default UserTab
