import { sysRolePath } from '../../utils'
import { BaseProTable } from '../../components'

export default () => {
  const columns = [
    { title: '名称', dataIndex: 'name', valueType: 'text' },
    { title: '备注', dataIndex: 'remark', valueType: 'text' },
  ]

  return <BaseProTable path={sysRolePath} columns={columns}/>
}
