import React from "react";
import css from "./Users.module.css";
import { PropsFromUsersContainer } from "./UsersContainer";

interface Props extends PropsFromUsersContainer {}

let Users: React.FC<Props> = (props) => {
  let friendsId = props.usersInfo.friendsList.map((entry) => entry.id);
  let avatars = props.usersInfo.generalInfo.map((user) => {
    let isFollowed = false;
    let i;
    for (i = 0; i < friendsId.length; i++) {
      if (friendsId[i] === user.id) {
        isFollowed = true;
      }
    }

    return (
      <div className={css.table}>
        <div className={css.tableRow}>
          <section className={css.avatarBlock}>
            <img className={css.avatar} src={user.avatar} title={user.name} />
          </section>
          <section className={css.info}>
            <span className={css.caption}>Name: </span>
            <span className={css.description}>{user.name}. </span>
            <br /> <span className={css.caption}>Lives in: </span>
            <span className={css.description}>
              {user.location.country}, {user.location.city}.{" "}
            </span>
            <br /> <span className={css.caption}>Short description: </span>
            <span className={css.description}>{user.status}</span>
          </section>
        </div>
        <div className={css.button}>
          {isFollowed ? (
            <button
              className={css.unfollow}
              onClick={() => props.unfollow(user.id)}
            >
              Unfollow
            </button>
          ) : (
            <button
              className={css.follow}
              onClick={() => props.follow(user.id)}
            >
              Follow
            </button>
          )}
        </div>
      </div>
    );
  });
  return <div className={css.wrapper}>{avatars}</div>;
};

export default Users;
