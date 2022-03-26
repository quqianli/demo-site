import request from "@/request";

/*
 * 角色管理模块
 */

// 分页查询
export const listPage = (data) => {
  return request({
    url: "app/role/listPage",
    method: "get",
    data,
  });
};

// 查询全部
export const listSimple = () => {
  return request({
    url: "app/role/listSimple",
    method: "get",
  });
};

// 新增
export const save = (data) => {
  return request({
    url: "app/role/save",
    method: "post",
    data,
  });
};
// 编辑
export const update = (data) => {
  const { id } = data;
  delete data.id;
  return request({
    url: `app/role/update/${id}`,
    method: "post",
    data,
  });
};
// 删除
export const remove = (data) => {
  return request({
    url: "app/role/delete",
    method: "post",
    data,
  });
};
// 绑定资源
export const bindResouce = (data) => {
  return request({
    url: "app/role/bindResouce",
    method: "post",
    data,
  });
};