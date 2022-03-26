import request from "@/request";
// 登录
export const login = (data) => {
  return request({
    url: "login",
    method: "post",
    data,
  });
};

// 登出
export const logout = () => {
  return request({
    url: "logout",
    method: "get",
  });
};
