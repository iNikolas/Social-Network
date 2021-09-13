import axios from "axios";

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: { "API-KEY": "bf20d415-39bf-466e-8f6a-edbac4dc9ddc" },
});

const samuraiJsAPI = {
  auth: {
    authMe: () =>
      axiosInstance.get("auth/me").then((response) => response.data),
    login: (email, password, rememberMe = false, captcha) =>
      axiosInstance
        .post("auth/login", { email, password, rememberMe, captcha })
        .then((response) => response.data),
    logout: () =>
      axiosInstance.delete("auth/login").then((response) => response.data),
  },
  profile: {
    userId: (id) =>
      axiosInstance.get(`profile/${id}`).then((response) => response.data),
    status: (status) =>
      axiosInstance.put("profile/status/", { status: status }),
    getStatus: (id) =>
      axiosInstance
        .get(`profile/status/${id}`)
        .then((response) => response.data),
    photo: (file) =>
      axiosInstance
        .put("profile/photo/", file, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => response.data),
    profile: (profileData) =>
      axiosInstance
        .put("profile", profileData)
        .then((response) => response.data),
  },
  users: {
    users: (count = 10, page = 1, term = "", friend = null) =>
      axiosInstance
        .get(
          `users/?page=${page}&count=${count}&term=${term}&friend=${friend}&friend=${friend}`
        )
        .then((response) => response.data),
  },
  follow: {
    userId: {
      isFollowed: (id) =>
        axiosInstance.get(`follow/${id}`).then((response) => response.data),
      follow: (id) =>
        axiosInstance.post(`follow/${id}`).then((response) => response.data),
      unfollow: (id) =>
        axiosInstance.delete(`follow/${id}`).then((response) => response.data),
    },
  },
  security: {
    getCaptchaUrl: () =>
      axiosInstance
        .get("security/get-captcha-url")
        .then((response) => response.data),
  },
};

export default samuraiJsAPI;
