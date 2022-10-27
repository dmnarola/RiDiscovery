import { useState } from "react";
import { FormFeedback } from "reactstrap";
import userimg from "../../assets/images/users/avatar-1.jpg";
import "../../assets/scss/profilepic.scss";

const RHFFileUpload = ({
  name,
  errorobj,
  getFileData,
  defaultImage,
  setValue,
  isValidate = false,
}) => {
  const [userImage, setUserImage] = useState(defaultImage || userimg);

  let isError = false;
  let errorMessage = "";

  if (errorobj && Object.prototype.hasOwnProperty.call(errorobj, name)) {
    isError = true;
    errorMessage = errorobj[name]?.message;
  }

  const onFileSelectHandler = async (e) => {
    const objectUrl = URL.createObjectURL(e?.target?.files[0]);
    setUserImage(objectUrl);
    getFileData({ file: e?.target?.files[0], base64: objectUrl });
    setValue(name, e?.target?.files[0]);
  };

  return (
    <div className="profile-container">
      <img src={userImage} alt={userImage} className="profileCover" />
      <div className="avatar-upload">
        <input
          name={name}
          accept="image/*"
          id="userProfile"
          type="file"
          onChange={(e) => onFileSelectHandler(e)}
        />
        <label htmlFor="userProfile" />
      </div>
      {isError && isValidate && (
        <FormFeedback type="invalid">{errorMessage}</FormFeedback>
      )}
    </div>
  );
};

export default RHFFileUpload;
