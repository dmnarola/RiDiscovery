import React, { useState } from 'react'
import ApplicationAddEdit from './ApplicationAddEdit'
import KickoffAddEdit from './KickoffAddEdit'

export const ApplicationAdd = () => {
    const [flag, setFlag] = useState(true)

    return (<React.Fragment>
        {!flag && <ApplicationAddEdit setFlag={setFlag} />}
        {flag && <KickoffAddEdit />}
    </React.Fragment>
    )
}
