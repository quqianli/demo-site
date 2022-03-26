/*
 * 角色管理模块
 */
// 分页查询
export function listPage() {
  return {
    url: "app/role/listPage",
    method: "get",
    response: (opts) => {
      const { pageNum, pageSize } = opts.data;
      const totalSize = 14;
      const content =
        pageNum * pageSize < totalSize
          ? `content|${pageSize}`
          : `content|${totalSize % pageSize}`;
      return {
        code: 200,
        msg: null,
        data: {
          pageNum,
          pageSize,
          totalSize,
          [content]: [
            {
              id: "@increment",
              "createdBy|1": ["admin", "master", "admin2"],
              createTime: "@date @time",
              createdTime: "@date @time",
              "lastUpdateBy|1": ["admin", "master", "admin2"],
              lastUpdateTime: "@date @time",
              name: "@word",
              "remark|1": ["测试人员", "开发人员", "项目经理", "@cword(3,6)"],
              "resourceIds|1": [
                "1, 22, 23, 24",
                "28",
                "39,40,43,44,45,27,28,29,30",
              ],
            },
          ],
        },
      };
    },
  };
}

// 查询全部
export function listSimple() {
  return {
    url: "app/role/listSimple",
    method: "get",
    response: {
      code: 200,
      msg: null,
      data: [
        {
          id: 1,
          name: "admin",
        },
        {
          id: 2,
          name: "dev",
        },
        {
          id: 3,
          name: "test",
        },
        {
          id: 4,
          name: "mng",
        },
      ],
    },
  };
}
// 操作
export function operations() {
  return {
    url: "app/role/(save|update|delete|bindResouce)",
    method: "post",
    response: {
      code: 200,
    },
  };
}
