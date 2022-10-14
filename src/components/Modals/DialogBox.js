import React from "react";
import { Modal } from "reactstrap";
import RHFButton from "../form-controls/RHFButton";

const DialogBox = (props) => {
  const {
    setIsModelOpen,
    isModelOpen,
    handleToggle,
    handleOnSubmit,
    btnName,
    title,
    children,
    modelSize
  } = props;

  return (
    <Modal
      size={modelSize}
      isOpen={isModelOpen}
      toggle={() => {
        handleToggle();
        handleOnSubmit
      }}
    >
      <div className="modal-header">
        <h5 className="modal-title mt-0" id="myModalLabel">
          {title}
        </h5>
        <button
          type="button"
          onClick={() => {
            setIsModelOpen(false);
          }}
          className="close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">{children}</div>
      <div className="modal-footer">
        <RHFButton
          btnName={btnName}
          onClick={handleOnSubmit}
        />
        <RHFButton btnName="cancel" outline={true} onClick={handleToggle} />
      </div>
    </Modal>
  );
};

export default DialogBox;
