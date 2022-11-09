import React from 'react';
import FeatherIcon from 'feather-icons-react';
import PropTypes from 'prop-types';
import { isModulePermisssion } from 'helpers/util';
import { ROLE_PERMISSIONS } from 'constants/RolePermissions';

const ActionButtons = (props) => {

    const {
        actions,
        preview: { handleClick: handlePreview, tooltip: previewTooltip = 'Preview', isPermission: previewPermission } = {},
        add: { handleClick: handleAdd, tooltip: addTooltip = 'Add', isPermission: addPermission } = {},
        edit: { handleClick: handleEdit, tooltip: editTooltip = 'Edit', isPermission: editPermission } = {},
        delete: { handleClick: handleDelete, tooltip: deleteTooltip = 'Delete', isPermission: deletePermission } = {},
        download: { handleClick: handleDownload, tooltip: downloadTooltip = 'Download', isPermission: downloadPermission } = {},
    } = props;


    // console.log('object :>> ', actions);

    const loadPreviewAction = (index) => {
        return (
            <div key={index} onClick={handlePreview} title={previewTooltip}>
                <FeatherIcon
                    icon="file-text"
                    size="22"
                    className="actionBtn"
                />
            </div>
        )
    }
    const loadAddAction = (index) => {
        return (
            <div key={index} onClick={handleAdd} title={addTooltip}>
                <FeatherIcon
                    icon="file-plus"
                    size="22"
                    className="actionBtn ms-2"
                />
            </div>
        )
    }
    const loadEditAction = (index) => {
        return (
            <div key={index} onClick={handleEdit} title={editTooltip}>
                <FeatherIcon
                    icon="edit-3"
                    size="22"
                    className="actionBtn ms-2"
                />
            </div>
        )
    }
    const loadDeleteAction = (index) => {
        return (
            <div key={index} onClick={handleDelete} title={deleteTooltip}>
                <FeatherIcon
                    icon="trash-2"
                    size="22"
                    className="actionBtn ms-2"
                />
            </div>
        )
    }
    const loadDownloadAction = (index) => {
        return (
            <div key={index} onClick={handleDownload} title={downloadTooltip}>
                <FeatherIcon
                    icon="download"
                    size="22"
                    className="actionBtn ms-2"
                />
            </div>
        )
    }

    const actionMapper = {
        'preview': previewPermission ? isModulePermisssion(previewPermission) && loadPreviewAction : loadPreviewAction,
        'add': addPermission ? isModulePermisssion(addPermission) && loadAddAction : loadAddAction,
        'edit': editPermission ? isModulePermisssion(editPermission) && loadEditAction : loadEditAction,
        'delete': deletePermission ? isModulePermisssion(deletePermission) && loadDeleteAction : loadDeleteAction,
        'download': downloadPermission ? isModulePermisssion(downloadPermission) && loadDownloadAction : loadDownloadAction
    }

    return (
        <>
            <div className='d-flex justify-content-between'>
                {Object.keys(actionMapper).map((action, index) => props[`${action}`] && actionMapper[`${action}`] && actionMapper[`${action}`](index))}
            </div>
            {/* <div className='d-flex justify-content-between'>
                {
                    Object.keys(actions).map((action, index) => {
                        return (
                            isModulePermisssion(actions[action].isPermission) &&
                            <div key={index} onClick={actions[action].handleClick} title={actions[action].tooltip} >
                                <FeatherIcon
                                    icon={actions[action].icon}
                                    size="22"
                                    className="actionBtn ms-2"
                                />
                            </div>
                        )
                    })
                }
            </div> */}
            {/* @fas - psh coding */}
        </>
    )
};

ActionButtons.propTypes = {
    preview: PropTypes.object,
    add: PropTypes.object,
    edit: PropTypes.object,
    delete: PropTypes.object,
    download: PropTypes.object
};

export default ActionButtons;
