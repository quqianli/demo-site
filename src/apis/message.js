import request from "@/request";
// 列表
export const list = (data) => {
  const type = data.type;
  delete data.type;
  return request({
    url: `/message/list/${type}`,
    method: "get",
    data,
  });
};
// 标记为已读
export const read = (data) => {
  const { id, type } = data;
  delete data.id;
  delete data.type;
  return request({
    url: `/message/read/${type}/${id}`,
    method: "post",
    data,
  });
};
// 标记全部为已读
export const readAll = (data) => {
  const type = data.type;
  delete data.type;
  return request({
    url: `/message/readAll/${type}`,
    method: "post",
    data,
  });
};
// 删除
export const remove = (data) => {
  const { id, type } = data;
  delete data.id;
  delete data.type;
  return request({
    url: `/message/${type}/${id}`,
    method: "delete",
    data,
  });
};
