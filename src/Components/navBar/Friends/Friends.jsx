import React from "react";
import css from "./Friends.module.css";
import { NavLink } from "react-router-dom";
import UserAvatar from "../../Render/Users Avatar/UserAvatar";

const Friends = (props) => {
  let i, j, isRepeated, randomGeneratedId;
  let randomFriendList = [],
    alreadyGeneratedNumbers = [];
  let amountOfCycles = 4;
  let friendsAmount = props.usersInfo.friendsList.length;

  if (friendsAmount < amountOfCycles) {
    amountOfCycles = friendsAmount;
  }
  for (i = 0; i < amountOfCycles; i++) {
    isRepeated = true;

    while (isRepeated) {
      randomGeneratedId = Math.floor(Math.random() * friendsAmount);
      alreadyGeneratedNumbers[i] = randomGeneratedId;
      isRepeated = false;

      for (j = 0; j < alreadyGeneratedNumbers.length; j++) {
        if (alreadyGeneratedNumbers[j - 1] === randomGeneratedId) {
          isRepeated = true;
        }
      }
    }

    randomFriendList[i] = props.usersInfo.friendsList[randomGeneratedId];
  }
  let FinalFriendListComponent = randomFriendList.map((id) => (
    <UserAvatar
      generalInfo={props.usersInfo.generalInfo}
      id={id.id}
      width={30}
    />
  ));
  return (
    <div>
      <div className={css.item}>
        <NavLink to={"/friends"} activeClassName={css.active}>
          My Friends:
        </NavLink>
      </div>
      <div>{FinalFriendListComponent}</div>
    </div>
  );
};

export default Friends;
