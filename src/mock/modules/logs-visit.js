// 分页查询
export function listPage() {
  return {
    url: "logs/visit/listPage",
    method: "get",
    response: (opts) => {
      const { pageNum, pageSize } = opts.data;
      const totalSize = 105;
      const content = pageNum * pageSize < totalSize ? `content|${pageSize}` : `content|${totalSize%pageSize}`
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
              createdTime: "@date @time",
              "username|1": ["admin", 'visitor', 'master', '@word'],
              "status|1": ["登录", "退出"],
              ip: "@ip",
              duration: "@integer(0, 1000)",
            },
          ],
        },
      };
    },
  };
}
