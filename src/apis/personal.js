import request from "@/request";
// 用户基本信息
export const userInfo = (data) => {
  return request({
    url: 'personal/userinfo',
    method: "get",
    data,
  });
};


export const menuTree = (data) => {
  return request({
    url: "personal/menuTree",
    method: "get",
    data,
  });
};

export const changeProfile = (data) => {
  return request({
    url: "/personal/changeProfile",
    method: "post",
    data,
  });
};
// 修改密码
export const changePsw = (data) => {
  return request({
    url: "/personal/changepsw",
    method: "post",
    data,
  });
};

