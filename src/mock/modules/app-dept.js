/*
 * 机构管理模块
 */
const treeData = [
  {
    id: 1,
    createdBy: "admin",
    createdTime: "@date @time",
    lastUpdatedBy: "admin",
    lastUpdatedTime: "@date @time",
    name: "大具集团",
    parentId: null,
    level: 0,
    children: [
      {
        id: 5,
        createdBy: "admin",
        createdTime: "@date @time",
        lastUpdatedBy: "admin",
        lastUpdatedTime: "@date @time",
        name: "北京分公司",
        parentId: 1,
        children: [
          {
            id: 7,
            createdBy: "admin",
            createdTime: "@date @time",
            lastUpdatedBy: "admin",
            lastUpdatedTime: "@date @time",
            name: "技术部",
            parentId: 5,
            level: 2,
            children: [
              {
                id: 71,
                createdBy: "admin",
                createdTime: "@date @time",
                lastUpdatedBy: "admin",
                lastUpdatedTime: "@date @time",
                name: "开发组",
                parentId: 7,
                children: [],
                level: 3,
              },
              {
                id: 72,
                createdBy: "admin",
                createdTime: "@date @time",
                lastUpdatedBy: "admin",
                lastUpdatedTime: "@date @time",
                name: "运维组",
                parentId: 7,
                children: [],
                level: 3,
              },
            ]
          },
          {
            id: 10,
            createdBy: "admin",
            createdTime: "@date @time",
            lastUpdatedBy: "admin",
            lastUpdatedTime: "@date @time",
            name: "市场部",
            parentId: 5,
            children: [],
            level: 2,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    createdBy: "admin",
    createdTime: "@date @time",
    lastUpdatedBy: "admin",
    lastUpdatedTime: "@date @time",
    name: "wowo集团",
    parentId: null,
    children: [
      {
        id: 4,
        createdBy: "admin",
        createdTime: "@date @time",
        lastUpdatedBy: "admin",
        lastUpdatedTime: "@date @time",
        name: "上海分公司",
        parentId: 2,
        children: [
          {
            id: 8,
            createdBy: "admin",
            createdTime: "@date @time",
            lastUpdatedBy: "admin",
            lastUpdatedTime: "@date @time",
            name: "技术部",
            parentId: 4,
            children: [],
            level: 2,
          },
        ],
        level: 1,
      },
      {
        id: 6,
        createdBy: "admin",
        createdTime: "@date @time",
        lastUpdatedBy: "admin",
        lastUpdatedTime: "@date @time",
        name: "北京分公司",
        parentId: 2,
        children: [
          {
            id: 9,
            createdBy: "admin",
            createdTime: "@date @time",
            lastUpdatedBy: "admin",
            lastUpdatedTime: "@date @time",
            name: "技术部",
            parentId: 6,
            children: [],
            level: 2,
          },
          {
            id: 11,
            createdBy: "admin",
            createdTime: "@date @time",
            lastUpdatedBy: "admin",
            lastUpdatedTime: "@date @time",
            name: "市场部",
            parentId: 6,
            children: [],
            level: 2,
          },
        ],
        level: 1,
      },
    ],
    level: 0,
  },
  {
    id: 3,
    createdBy: "admin",
    createdTime: "@date @time",
    lastUpdatedBy: "admin",
    lastUpdatedTime: "@date @time",
    name: "云国集团",
    parentId: null,
    children: [
      {
        id: 12,
        createdBy: "admin",
        createdTime: "@date @time",
        lastUpdatedBy: "admin",
        lastUpdatedTime: "@date @time",
        name: "深圳站",
        parentId: 3,
        children: [],
        level: 1,
      },
      {
        id: 13,
        createdBy: "admin",
        createdTime: "@date @time",
        lastUpdatedBy: "admin",
        lastUpdatedTime: "@date @time",
        name: "上海站",
        parentId: 3,
        children: [],
        level: 1,
      },
      {
        id: 14,
        createdBy: "admin",
        createdTime: "@date @time",
        lastUpdatedBy: "admin",
        lastUpdatedTime: "@date @time",
        name: "北京站",
        parentId: 3,
        children: [],
        level: 1,
      },
    ],
    level: 0,
  },
];
export function listTree() {
  // 查询机构树
  return {
    url: "app/dept/listTree",
    method: "get",
    response: {
      code: 200,
      msg: null,
      data: treeData,
    },
  };
}

export function listOtherTreeById() {
  return {
    url: `app/dept/listOtherTree`,
    method: "get",
    response: (opts) => {
      function filterTree (data, id) {
        const newTree = data.filter(v => v.id !== id)
        newTree.forEach(v => v.children && (v.children = filterTree(v.children, id)))
        return newTree
      }
      const { id } = opts.data || {};
      return {
        code: 200,
        data: filterTree(JSON.parse(JSON.stringify(treeData)), id),
      };
    },
  };
}

export function operations() {
  return {
    url: "app/dept/(save|update|delete)",
    method: "post",
    response: {
      code: 200,
    },
  };
}
