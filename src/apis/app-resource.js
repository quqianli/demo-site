import request from "@/request";

/*
 * 菜单管理模块
 */

// 查找导航菜单树
export const listTree = () => {
  return request({
    url: "app/resource/listTree",
    method: "get",
  });
};

// 查询
export const listTreeParents = (data) => {
  return request({
    url: `app/resource/listParents`,
    method: "get",
    data
  });
};
// 新增
export const save = (data) => {
  return request({
    url: "app/resource/save",
    method: "post",
    data,
  });
};
// 编辑
export const update = (data) => {
  const { id } = data;
  delete data.id;
  return request({
    url: `app/resource/update/${id}`,
    method: "post",
    data,
  });
};
// 删除
export const remove = (data) => {
  return request({
    url: "app/resource/delete",
    method: "post",
    data,
  });
};
