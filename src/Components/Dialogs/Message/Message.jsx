import React from "react";
import css from "./message.module.css";
import UserAvatar from "../../Render/Users Avatar/UserAvatar";

function Message(props) {
  console.log("renderMessage");
  if (props.isOwner) {
    return (
      <div className={css.messageByOwner}>
        <span>{props.message}</span>
        <UserAvatar
          generalInfo={props.usersInfo.generalInfo}
          id={props.id}
          width={40}
        />
      </div>
    );
  } else {
    return (
      <div className={css.message}>
        <UserAvatar
          generalInfo={props.usersInfo.generalInfo}
          id={props.id}
          width={40}
        />
        {props.message}
      </div>
    );
  }
}

export default React.memo(Message);
