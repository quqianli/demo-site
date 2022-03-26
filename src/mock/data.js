export const roles = [
  {
    name: 'admin',
    label: '超级管理员'
  },
  {
    name: 'master',
    label: '应用管理员'
  },
  {
    name: 'visitor',
    label: '普通用户'
  }
];
export const users = [
  {
    id: 4,
    name: "test",
    roleId: "master",
    password: "test",
    createdBy: 'admin',
    createdTime: '@date @time'
  },
  {
    id: 3,
    name: "visitor",
    roleId: 'visitor',
    password: "visitor",
    createdBy: 'system',
    createdTime: '@date @time'
  },
  {
    id: 2,
    name: "master",
    roleId: "master",
    password: "master",
    createdBy: 'system',
    createdTime: '@date @time'
  },
  {
    id: 1,
    name: "admin",
    roleId: "admin",
    password: "admin",
    createdBy: 'system',
    createdTime: '@date @time'
  },
];

export const menuTreeData = [
  {
    id: 1,
    parentId: 0,
    name: 'App',
    path: "/app",
    icon: "menu",
    children: [
      {
        id: 11,
        parentId: 1,
        name: 'AppUser',
        path: "/app/user",
        icon: "user",
      },
      {
        id: 12,
        parentId: 1,
        name: 'AppDept',
        path: "/app/dept",
        icon: "office-building",
      },
      {
        id: 13,
        parentId: 1,
        name: 'AppRole',
        path: "/app/role",
        icon: "avatar",
      },
      {
        id: 14,
        parentId: 1,
        name: 'AppResource',
        path: "/app/resource",
        icon: "management",
      },
    ],
  },
  {
    id: 2,
    parentId: 0,
    name: 'Sys',
    path: "/sys",
    icon: "setting",
    children: [
      {
        id: 21,
        parentId: 2,
        name: 'SysUser',
        path: "/sys/user",
        icon: "user-filled",
      },
      {
        id: 22,
        parentId: 2,
        name: 'SysNotice',
        path: "/sys/notice",
        icon: "chat-dot-round",
      },
    ],
  },
  {
    id: 3,
    parentId: 0,
    name: 'Logs',
    path: "/logs",
    icon: "document",
    children: [
      {
        id: 31,
        parentId: 3,
        name: 'LogsVisit',
        path: "/logs/visit",
        icon: "tickets",
      },
      {
        id: 32,
        parentId: 3,
        name: 'LogsOperation',
        path: "/logs/operation",
        icon: "operation",
      },
    ],
  },
];