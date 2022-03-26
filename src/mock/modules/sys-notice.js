// 分页查询
export function listPage() {
  return {
    url: "sys/notice/listPage",
    method: "get",
    response: (opts) => {
      const { pageNum, pageSize } = opts.data;
      const totalSize = 4;
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
              'createdBy|1': ["admin", 'admin2'],
              title: "@ctitle(5, 20)",
              createdTime: "@date @time",
              content: "@cparagraph(1, 2)",
              'publishTime|1': ['', '@date @time'],
            },
          ],
        },
      };
    },
  };
}

export function operations() {
  return {
    url: "sys/notice/(save|update|delete)",
    method: "post",
    response: {
      code: 200,
    }
  }
}

