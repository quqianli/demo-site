/*
 * 系统登录模块
 */
import { users } from "../data";
// 登录
export function login() {
  return {
    url: "login",
    method: "post",
    response: (opts) => {
      const name = opts.data.account;
      if (
        users.find((v) => v.name === name && v.password === opts.data.password)
      ) {
        return {
          code: 200,
          msg: "",
          data: {
            token: name + "@eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cC",
            name,
          },
        };
      }
      return {
        code: -1,
        msg: "用户名或密码错误",
      };
    },
  };
}
// export function login() {
//   return {
//     url: "login",
//     method: "post",
//     response: () => {
//       return {
//         code: -1,
//         msg: "用户名或密码不正确！",
//       };
//     },
//   };
// }
// 登出接口
export function logout() {
  return {
    url: "logout",
    method: "get",
    response: {
      code: 200,
      msg: null,
      data: {},
    },
  };
}
