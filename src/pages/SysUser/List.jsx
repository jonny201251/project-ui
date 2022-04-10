import { sysUserPath } from '../../utils'
import { BaseProTable } from '../../components'

export default () => {
  const columns = [
    { title: '登录账号', dataIndex: 'loginName', valueType: 'text' },
    { title: '用户姓名', dataIndex: 'displayName', valueType: 'text' },
    { title: '所在部门', dataIndex: 'deptName', valueType: 'text' },
  ]

  return <BaseProTable path={sysUserPath} columns={columns}/>
}
