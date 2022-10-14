import React, { useState } from "react";
import { Card, CardBody, Modal } from "reactstrap";
import RHFButton from "../form-controls/RHFButton";

const DialogBox = (props) => {
  const {
    setIsModelOpen,
    isModelOpen,
    handleToggle,
    handleSubmit,
    btnName,
    title,
    children,
  } = props;

  return (
    <Modal
      size="lg"
      isOpen={isModelOpen}
      toggle={() => {
        handleToggle();
        props.handleSubmitMethod
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
          onClick={props.handleSubmitMethod}
          type="submit"
        />
        <RHFButton btnName="cancel" outline={true} onClick={handleToggle} />
      </div>
    </Modal>
  );
};

export default DialogBox;
