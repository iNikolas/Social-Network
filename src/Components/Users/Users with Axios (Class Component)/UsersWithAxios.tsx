import React, { ReactElement } from "react";
import css from "./UsersWithAxious.module.css";
import avatar from "../../../img/Avatar/defaultAvatar.jpg";
import Loader from "../../Common/loader/Loader";
import { Link } from "react-router-dom";
import { PropsFromRedux } from "./UsersWithAxiosContainer";

interface Props extends PropsFromRedux {
  updateOnRequest: () => void;
  onPageChanged: (pageNumber: number) => void;
}

const UsersWithAxios: React.FC<Props> = (props) => {
  let totalPageAmount = Math.ceil(
    props.users.totalCount / props.users.pageSize
  );

  let pageCounterRender: Array<ReactElement> = [];
  for (let i = 1; i < props.users.totalCount; i++) {
    let minTarget, maxTarget, currentPage;
    currentPage = props.users.currentPage;
    minTarget = currentPage - 3;
    maxTarget = currentPage + 3;
    minTarget < 0 ? (minTarget = 0) : (minTarget = minTarget);
    if (i < minTarget) {
      pageCounterRender = pageCounterRender;
    } else if (i > maxTarget) {
      pageCounterRender = pageCounterRender;
    } else {
      if (i < totalPageAmount) {
        pageCounterRender.push(
          <span
            className={
              i === props.users.currentPage
                ? css.selectedPage
                : css.unselectedPage
            }
            onClick={(event) => {
              props.onPageChanged(i);
            }}
          >
            {i}
          </span>
        );
      }
    }
  }
  if (props.users.currentPage > 4) {
    pageCounterRender.unshift(
      <span
        className={
          1 === props.users.currentPage ? css.selectedPage : css.unselectedPage
        }
        onClick={(event) => {
          props.onPageChanged(1);
        }}
      >{`1...`}</span>
    );
  }
  if (props.users.currentPage < totalPageAmount - 4) {
    pageCounterRender.push(
      <span
        className={
          totalPageAmount === props.users.currentPage
            ? css.selectedPage
            : css.unselectedPage
        }
        onClick={(event) => {
          props.onPageChanged(totalPageAmount);
        }}
      >{`...${totalPageAmount}`}</span>
    );
  } else {
    pageCounterRender.push(
      <span
        className={
          totalPageAmount === props.users.currentPage
            ? css.selectedPage
            : css.unselectedPage
        }
        onClick={(event) => {
          props.onPageChanged(totalPageAmount);
        }}
      >
        {totalPageAmount}
      </span>
    );
  }

  return (
    <div className={css.wrapper}>
      <div className={css.pages}>
        {props.users.isFetching ? <Loader /> : pageCounterRender}
      </div>
      {props.users.isFetching
        ? null
        : props.users.items.map((user) => (
            <div className={css.table}>
              <div className={css.tableRow}>
                <section className={css.avatarBlock}>
                  <Link to={"/profile/" + user.id}>
                    <img
                      className={css.avatar}
                      src={
                        user.photos.small === null ? avatar : user.photos.small
                      }
                      title={user.name}
                    />
                  </Link>
                </section>
                <section className={css.info}>
                  <span className={css.caption}>Name: </span>
                  <span className={css.description}>{user.name}. </span>
                  <br /> <span className={css.caption}>User ID: </span>
                  <span className={css.description}>{user.id}. </span>
                  <br />{" "}
                  <span className={css.caption}>Short description: </span>
                  <span className={css.description}>{user.status}</span>
                </section>
              </div>
              <div className={css.button}>
                {user.followed ? (
                  <button
                    disabled={props.users.fetchingIdArray.some(
                      (item) => item === user.id
                    )}
                    className={css.unfollow}
                    onClick={(event) => {
                      props.followUnfollowThunkTemplate("unfollow", user.id);
                      props.updateOnRequest();
                    }}
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    disabled={props.users.fetchingIdArray.some(
                      (item) => item === user.id
                    )}
                    className={css.follow}
                    onClick={(event) => {
                      props.followUnfollowThunkTemplate("follow", user.id);
                      props.updateOnRequest();
                    }}
                  >
                    Follow
                  </button>
                )}
              </div>
            </div>
          ))}
    </div>
  );
};

export default UsersWithAxios;
