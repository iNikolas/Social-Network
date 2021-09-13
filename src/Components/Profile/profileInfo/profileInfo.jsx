import React from "react";
import css from "./profileInfo.module.css";
import ProfileStatusWithHooks from "./ProfileStatus/profileStatusWithHooks";

const ProfileInfo = (props) => {
  return (
    <div className={css.content}>
      <img
        src="https://www.w3bai.com/w3css/img_fjords_wide.jpg"
        alt="long img"
      />
      <ProfileStatusWithHooks {...props} />
    </div>
  );
};

export default ProfileInfo;
