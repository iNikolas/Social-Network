import React, { CSSProperties, useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { profileReducerAC } from "../../../../Redux/profileReducer";
import { PropsType } from "../profileInfo";

const connector = connect(null, { ...profileReducerAC });
export type ProfileStatusWithHooksPropsType = ConnectedProps<typeof connector>;

const ProfileStatusWithHooks: React.FC<
  ProfileStatusWithHooksPropsType & PropsType
> = (props) => {
  const Style: CSSProperties = {
    display: "block",
    textAlign: "center",
    border: "1px dashed grey",
    margin: "auto",
  };
  const [editMode, setEditMode] = useState(false);
  const [statusField, changeStatusField] = useState(
    props.profileStatusInputArea
  );
  useEffect(() => {
    changeStatusField(props.profileStatusInputArea);
  }, [props.profileStatusInputArea]);
  useEffect(() => {
    props.getStatusFieldThunkCreator(props.id);
  }, []);

  const activateEditMode = () => {
    setEditMode(true);
  };

  const deactivateEditMode = (event: React.ChangeEvent<HTMLInputElement>) => {
    let text = event.target.value;
    if (!text) {
      text = "...";
      props.editProfileStatusField(text);
    }
    setEditMode(false);
  };

  const editStatusField = (event: React.ChangeEvent<HTMLInputElement>) => {
    let text = event.target.value;
    props.editProfileStatusField(text);
  };

  const confirmStatusField = (event: React.KeyboardEvent<HTMLInputElement>) => {
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

export default connector(ProfileStatusWithHooks);
