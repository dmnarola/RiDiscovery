import React from "react";
import { Modal } from "reactstrap";

const DialogBox = (props) => {
  const {
    handleToggle,
    isModelOpen,
    title,
    children,
    actions,
    modelSize
  } = props;

  return (
    <Modal
      size={modelSize}
      isOpen={isModelOpen}
      toggle={handleToggle}
    >
      <div className="modal-header">
        <h5 className="modal-title mt-0" id="myModalLabel">
          {title}
        </h5>
        <button
          type="button"
          onClick={handleToggle}
          className="close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">{children}</div>
      {actions && <div className="modal-footer">{actions}</div>}
    </Modal>
  );
};

export default DialogBox;
