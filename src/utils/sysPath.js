import { contextPath } from './unknown'
import SysDicForm from '../pages/SysDic/Form'
import SysDicList from '../pages/SysDic/List'
import SysRoleForm from '../pages/SysRole/Form'
import SysRoleList from '../pages/SysRole/List'
import SysUserForm from '../pages/SysUser/Form'
import SysUserList from '../pages/SysUser/List'
import SysDeptForm from '../pages/SysDept/Form'
import SysDeptList from '../pages/SysDept/List'

//flag、导出名称、sysPermission.path,三个地方名称一样
export const sysDicPath = {
  flag: 'sysDicPath', Form: SysDicForm, List: SysDicList,
  list: contextPath + '/sysDic/list',
  get: contextPath + '/sysDic/get',
  add: contextPath + '/sysDic/add',
  edit: contextPath + '/sysDic/edit',
  delete: contextPath + '/sysDic/delete',
  getLabelValue: contextPath + '/sysDic/getLabelValue',
}
export const sysRolePath = {
  flag: 'sysRolePath', Form: SysRoleForm, List: SysRoleList,
  list: contextPath + '/sysRole/list',
  get: contextPath + '/sysRole/get',
  add: contextPath + '/sysRole/add',
  edit: contextPath + '/sysRole/edit',
  delete: contextPath + '/sysRole/delete',
  all: contextPath + '/sysRole/all',
}
export const sysUserPath = {
  flag: 'sysUserPath', Form: SysUserForm, List: SysUserList,
  list: contextPath + '/sysUser/list',
  get: contextPath + '/sysUser/get',
  add: contextPath + '/sysUser/add',
  edit: contextPath + '/sysUser/edit',
  delete: contextPath + '/sysUser/delete',
  login: contextPath + '/sysUser/login',
  all: contextPath + '/sysUser/all',
  logout: contextPath + '/sysUser/logout',
  changePassword: contextPath + '/sysUser/changePassword',
}
export const sysDeptPath = {
  flag: 'sysDeptPath', Form: SysDeptForm, List: SysDeptList,
  list: contextPath + '/sysDept/list',
  get: contextPath + '/sysDept/get',
  add: contextPath + '/sysDept/add',
  edit: contextPath + '/sysDept/edit',
  delete: contextPath + '/sysDept/delete',
  getTreeSelect: contextPath + '/sysDept/getTreeSelect',
}
export const preloadPath={
  get: contextPath + '/preload/get',
}

