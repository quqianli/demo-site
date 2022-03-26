// 系统
const sMsg = [
  {
    id: 4,
    title: '系统升级提示',
    date: '2021-10-23',
    content: '您好，系统将于2021-10-24 00:00:00 - 2021-10-24 08:00:00 进行服务升级，期间系统不可用，请谅解！',
    isRead: false
  },
  {
    id: 3,
    title: '系统升级提示',
    date: '2019-10-22',
    content: '您好，系统将于2019-10-23 00:00:00 - 2019-10-23 08:00:00 进行服务升级，期间系统不可用，请谅解！',
    isRead: true
  }
]
// 站内信
const pMsg =[
  {
    id: 2,
    title: '修改资料成功',
    date: '2019-10-23',
    content: '您刚刚修改了用户头像！',
    isRead: false
  },
  {
    id: 1,
    title: '注册成功',
    date: '2019-10-22',
    content: '恭喜您注册权限管理系统成功！',
    isRead: true
  }
]

export const list = () => {
  return {
    url: 'message/list/(system|private)',
    type: "get",
    response: (opts) => {
      const { pageNum, pageSize } = opts.data;
      const isPrivate = opts?.url?.split('/').pop() === 'private';
      const resData = isPrivate ? pMsg : sMsg;
      return {
        code: 200,
        data: {
          pageNum,
          pageSize,
          content: resData,
          totalSize: resData.length,
        }
      }
    }
  };
};
export const read = () => {
  return {
    url: `message/read/(system|private)/.+$`,
    type: "post",
    response: (opts) => {
      let index = -1;
      const arr = opts?.url.split('/');
      const id = arr.pop();
      const type = arr.pop();
      if (type === 'private') {
        index = pMsg.findIndex(v => v.id = id)
        index > -1 && (pMsg[index].isRead = true);
      } else {
        index = sMsg.findIndex(v => v.id = id)
        index > -1 && (sMsg[index].isRead = true);
      }
      return {
        code: 200,
        msg: null
      }
    },
  };
};
export const readAll = () => {
  return {
    url: 'message/readAll/.+',
    type: "post",
    response: (opts) => {
      if (opts?.url.split('/').pop() === 'private') {
        pMsg.forEach(v => {
          !v.isRead && (v.isRead = true);
        })
      } else {
        sMsg.forEach(v => {
          !v.isRead && (v.isRead = true);
        })
      }
      return {
        code: 200,
        msg: null
      }
    }
  };
};
export const remove = () => {
  return {
    url: 'message/(system|private)/.+$',
    method: "delete",
    response: (opts) => {
      let index = -1;
      const arr = opts?.url.split('/');
      const id = arr.pop();
      const type = arr.pop();
      if (type === 'private') {
        index = pMsg.findIndex(v => v.id = id)
        index > -1 && pMsg.splice(index, 1)
      } else {
        index = sMsg.findIndex(v => v.id = id)
        index > -1 && sMsg.splice(index, 1)
      }
      return {
        code: 200,
        msg: null
      }
    }
  }
};
