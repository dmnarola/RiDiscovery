import React from "react";
import { Button } from "reactstrap";
import FeatherIcon from "feather-icons-react";

const RHFButton = (props) => {
  const {
    type = "button",
    btnName = "Submit",
    color = "primary",
    icon = "",
    outline = false,
    onClick = () => {},
  } = props;

  return (
    <Button color={color} outline={outline} type={type} onClick={onClick}>
      {icon && (
        <>
          <FeatherIcon icon={icon} size="22" />{" "}
        </>
      )}
      {btnName}
    </Button>
  );
};

export default RHFButton;
