import {
  profileReducer,
  initialState,
  profileReducerAC,
} from "./profileReducer";

it("length of the Post Array should be increased by 1", () => {
  let action = profileReducerAC.addPost("Приветик");
  let newState = profileReducer(initialState, action);

  expect(newState.posts.length).toBe(initialState.posts.length + 1);
});

it("get Profile Info", () => {
  let action = profileReducerAC.getProfileInfo("Приветик");
  let newState = profileReducer(initialState, action);

  expect(newState.data).toBe("Приветик");
});
