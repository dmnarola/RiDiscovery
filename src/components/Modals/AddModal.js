import React, { useState } from "react";

import { Card, CardBody, Modal } from "reactstrap";

const AddModal = (props) => {
  const [modal_standard, setmodal_standard] = useState(false);

  function tog_standard() {
    setmodal_standard(!modal_standard);
    removeBodyCss();
  }

  return (
    <Card>
      <CardBody>
        <div>
          <button
            type="button"
            onClick={() => {
              tog_standard();
            }}
            className="btn btn-primary "
            data-toggle="modal"
            data-target="#myModal"
          >
            Add
          </button>

          <Modal
            isOpen={modal_standard}
            toggle={() => {
              tog_standard();
            }}
          >
            <div className="modal-header">
              <h5 className="modal-title mt-0" id="myModalLabel">
                Modal Heading
              </h5>
              <button
                type="button"
                onClick={() => {
                  setmodal_standard(false);
                }}
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">{props.children}</div>
            <div className="modal-footer">
              <button
                type="button"
                onClick={() => {
                  tog_standard();
                }}
                className="btn btn-secondary "
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary ">
                Save changes
              </button>
            </div>
          </Modal>
        </div>
      </CardBody>
    </Card>
  );
};

export default AddModal;
