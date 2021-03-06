import samuraiJsAPI from "../../API/api";
import { mappingTemplate } from "../../utility/object-helpers";

const FOLLOW = "usersInfoReducerWithAxios/FOLLOW_";
const UNFOLLOW = "usersInfoReducerWithAxios/UNFOLLOW_";
const SET_USERS = "usersInfoReducerWithAxios/SET-USERS_";
const SET_CURRENT_PAGE = "usersInfoReducerWithAxios/SET-CURRENT-PAGE";
const SET_ISFETCHING = "usersInfoReducerWithAxios/SET-ISFETCHING";
const ADD_USER_TO_FETCHING_LIST =
  "usersInfoReducerWithAxios/ADD-USER-TO-FETCHING-LIST";
const REMOVE_USER_FROM_FETCHING_LIST =
  "usersInfoReducerWithAxios/REMOVE-USER-FROM-FETCHING-LIST";

export type FollowUnfollowThunkTemplateType = (
  cond: "follow" | "unfollow",
  id: number
) => (dispatch: Function) => void;

interface usersInfoWithAxiosAcType {
  follow: (idNumber: number) => { type: typeof FOLLOW; id: typeof idNumber };
  unfollow: (idNumber: number) => {
    type: typeof UNFOLLOW;
    id: typeof idNumber;
  };
  setUsersInfo: (usersInfoData: Promise<object>) => {
    type: typeof SET_USERS;
    items: typeof usersInfoData;
  };
  setCurrentPage: (pageNumber: number) => {
    type: typeof SET_CURRENT_PAGE;
    pageNumber: typeof pageNumber;
  };
  setPreloader: (stance: boolean) => {
    type: typeof SET_ISFETCHING;
    stance: typeof stance;
  };
  addUserToFetchingArr: (userId: number) => {
    type: typeof ADD_USER_TO_FETCHING_LIST;
    payload: typeof userId;
  };
  removeUserFromFetchingArr: (userId: number) => {
    type: typeof REMOVE_USER_FROM_FETCHING_LIST;
    payload: typeof userId;
  };
  getUsersThunkCreator: (
    pageSize: number,
    currentPage: number,
    cond?: string
  ) => (dispatch: Function) => void;
  followUnfollowThunkTemplate: FollowUnfollowThunkTemplateType;
}

export type RegularActionType = {
  type: string;
  [key: string]: any;
};

export const usersInfoWithAxiosAC: usersInfoWithAxiosAcType = {
  follow: (idNumber) => ({ type: FOLLOW, id: idNumber }),
  unfollow: (idNumber) => ({ type: UNFOLLOW, id: idNumber }),
  setUsersInfo: (usersInfoData) => ({ type: SET_USERS, items: usersInfoData }),
  setCurrentPage: (pageNumber) => ({
    type: SET_CURRENT_PAGE,
    pageNumber: pageNumber,
  }),
  setPreloader: (stance) => ({ type: SET_ISFETCHING, stance: stance }),
  addUserToFetchingArr: (userId) => ({
    type: ADD_USER_TO_FETCHING_LIST,
    payload: userId,
  }),
  removeUserFromFetchingArr: (userId) => ({
    type: REMOVE_USER_FROM_FETCHING_LIST,
    payload: userId,
  }),
  getUsersThunkCreator: function (
    pageSize,
    currentPage,
    cond = "withFetching"
  ) {
    return async (dispatch) => {
      if (cond === "withFetching") dispatch(this.setPreloader(true));
      const response = await samuraiJsAPI.users.users(pageSize, currentPage);
      dispatch(this.setUsersInfo(response));
      dispatch(this.setPreloader(false));
    };
  },

  followUnfollowThunkTemplate(cond, id) {
    return async (dispatch) => {
      dispatch(this.addUserToFetchingArr(id));
      const response = await samuraiJsAPI.follow.userId[cond](id);
      if (response.resultCode === 0) dispatch(this[cond](id));
      dispatch(this.removeUserFromFetchingArr(id));
    };
  },
};

type ItemsType = Array<{
  name: string;
  id: number;
  photos: {
    small: string | null;
    large: string | null;
  };
  status: string | null;
  followed: boolean;
}>;

export type InitialStateType = {
  items: ItemsType;
  totalCount: number;
  error: null | string;
  pageSize: number;
  currentPage: number;
  isFetching: boolean;
  fetchingIdArray: Array<null | number>;
};

let initialState: InitialStateType = {
  items: [],
  totalCount: 0,
  error: null,
  pageSize: 10,
  currentPage: 1,
  isFetching: false,
  fetchingIdArray: [],
};

export const usersInfoWithAxiosReducer = (
  state = initialState,
  action: RegularActionType
): InitialStateType => {
  switch (action.type) {
    case FOLLOW:
      return followUnfollow("follow");
    case UNFOLLOW:
      return followUnfollow();
    case SET_USERS:
      return {
        ...state,
        ...action.items,
        items: [...action.items.items],
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.pageNumber,
      };
    case SET_ISFETCHING:
      return {
        ...state,
        isFetching: action.stance,
      };
    case ADD_USER_TO_FETCHING_LIST:
      if (state.fetchingIdArray.every((value) => value !== action.payload)) {
        return {
          ...state,
          fetchingIdArray: [...state.fetchingIdArray, action.payload],
        };
      } else {
        return state;
      }
    case REMOVE_USER_FROM_FETCHING_LIST:
      if (state.fetchingIdArray.some((value) => value === action.payload)) {
        let newFetchingIdArray = state.fetchingIdArray.map((value) => {
          return value === action.payload ? null : value;
        });
        return {
          ...state,
          fetchingIdArray: newFetchingIdArray,
        };
      } else {
        return state;
      }
    default:
      return state;
  }

  function followUnfollow(type = "unfollow") {
    return {
      ...state,
      items: mappingTemplate(state.items, "id", action.id, () => ({
        followed: type === "follow" ? true : false,
      })),
    };
  }
};

export default usersInfoWithAxiosReducer;
