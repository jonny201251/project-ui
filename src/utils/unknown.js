import { history } from '../.umi/core/history';

export const contextPath = '/project';
//dev[开发环境],prod[生产环境]，控制OperateButton.jsx中的按钮、BackLayout.jsx中的菜单导航
export const env = 'pro';
export const session = {
  setItem: (key, value) => {
    sessionStorage.setItem(key, JSON.stringify(value));
  },
  getItem: (key) => {
    const user = sessionStorage.getItem('user');
    if (!user) {
      history.push('/login');
    }
    return JSON.parse(sessionStorage.getItem(key));
  },
};
export const dateFormat = 'YYYY-MM-DD';
export const dateTimeFormat = 'YYYY-MM-DD HH:mm:ss';
