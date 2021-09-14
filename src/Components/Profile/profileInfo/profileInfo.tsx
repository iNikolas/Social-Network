import React from "react";
import css from "./profileInfo.module.css";
import ProfileStatusWithHooks from "./ProfileStatus/profileStatusWithHooks";

export interface PropsType {
  id: number;
  profileStatusInputArea: string;
  editProfileStatusField: (text: string) => void;
}

const ProfileInfo: React.FC<PropsType> = (props) => {
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
