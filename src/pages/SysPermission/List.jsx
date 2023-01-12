import { BaseProTable } from '../../components'
import { sysPermissionPath } from '../../utils'

export default () => {
  let columns = [
    { title: '权限名称', dataIndex: 'name', valueType: 'text' },
    { title: '权限类型', dataIndex: 'type', valueType: 'text' },
    { title: '前端path', dataIndex: 'path', valueType: 'text' },
    { title: '按钮类型', dataIndex: 'buttonType', valueType: 'text' },
    { title: '按钮位置', dataIndex: 'position', valueType: 'text' },
    { title: '图标', dataIndex: 'icon', valueType: 'text' }
  ]

  return <BaseProTable path={sysPermissionPath} columns={columns}/>
}
