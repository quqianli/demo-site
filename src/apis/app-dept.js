import request from "@/request";

/*
 * 机构管理模块
 */
// 查询机构树
export const listTree = () => {
  return request({
    url: "app/dept/listTree",
    method: "get",
  });
};
// 查询
export const listOtherTreeById = (data) => {
  return request({
    url: `app/dept/listOtherTree`,
    method: "get",
    data
  });
};

// 新增
export const save = (data) => {
  return request({
    url: "app/dept/save",
    method: "post",
    data,
  });
};
// 编辑
export const update = (data) => {
  const { id } = data;
  delete data.id;
  return request({
    url: `app/dept/update/${id}`,
    method: "post",
    data,
  });
};

// 删除
export const remove = (data) => {
  return request({
    url: "app/dept/delete",
    method: "post",
    data,
  });
};