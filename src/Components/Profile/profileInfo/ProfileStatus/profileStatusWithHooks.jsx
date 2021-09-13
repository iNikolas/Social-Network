import React, { useEffect, useState } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { profileReducerAC } from "../../../../Redux/profileReducer";

const ProfileStatusWithHooks = (props) => {
  let Style = {
    display: "block",
    textAlign: "center",
    border: "1px dashed grey",
    margin: "auto",
  };

  let [editMode, setEditMode] = useState(false);
  let [statusField, changeStatusField] = useState(props.profileStatusInputArea);
  useEffect(() => {
    changeStatusField(props.profileStatusInputArea);
  }, [props.profileStatusInputArea]);
  useEffect(() => {
    props.getStatusFieldThunkCreator(props.id);
  }, []);

  const activateEditMode = () => {
    setEditMode(true);
  };

  const deactivateEditMode = (event) => {
    let text = event.target.value;
    if (!text) {
      text = "...";
      props.editProfileStatusField(text);
    }
    setEditMode(false);
  };

  const editStatusField = (event) => {
    let text = event.target.value;
    props.editProfileStatusField(text);
  };

  const confirmStatusField = (event) => {
    let text = props.profileStatusInputArea;
    if (event.key === "Enter") {
      props.confirmStatusFieldThunkCreator(text);
      setEditMode(false);
    }
  };

  return (
    <div>
      {!editMode && (
        <div>
          <span style={Style} onClick={activateEditMode}>
            {statusField}
          </span>
        </div>
      )}
      {editMode && (
        <div>
          <input
            value={statusField}
            autoFocus={true}
            style={Style}
            onBlur={deactivateEditMode}
            onChange={editStatusField}
            onKeyPress={confirmStatusField}
          />
        </div>
      )}
    </div>
  );
};

export default compose(connect(null, { ...profileReducerAC }))(
  ProfileStatusWithHooks
);
