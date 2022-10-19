import React from 'react';
import FeatherIcon from 'feather-icons-react';
import PropTypes from 'prop-types';

const ActionButtons = (props) => {

    const {
        preview: { handleClick: handlePreview, tooltip: previewTooltip = 'Preview' } = {},
        add: { handleClick: handleAdd, tooltip: addTooltip = 'Add' } = {},
        edit: { handleClick: handleEdit, tooltip: editTooltip = 'Edit' } = {},
        delete: { handleClick: handleDelete, tooltip: deleteTooltip = 'Delete' } = {},
    } = props;


    const loadPreviewAction = (index) => {
        return (
            <div key={index} onClick={handlePreview} title={previewTooltip}>
                <FeatherIcon
                    icon="file-text"
                    size="22"
                // className="ms-2"
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
                    className="ms-2"
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
                    className="ms-2"
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
                    className="ms-2"
                />
            </div>
        )
    }


    const actionMapper = {
        'preview': loadPreviewAction,
        'add': loadAddAction,
        'edit': loadEditAction,
        'delete': loadDeleteAction,
    }

    return <div className='d-flex justify-content-between'>
        {Object.keys(actionMapper).map((action, index) => props[`${action}`] && actionMapper[`${action}`] && actionMapper[`${action}`](index))}
    </div>
};

ActionButtons.propTypes = {
    preview: PropTypes.object,
    add: PropTypes.object,
    edit: PropTypes.object,
    delete: PropTypes.object,
};

export default ActionButtons;
