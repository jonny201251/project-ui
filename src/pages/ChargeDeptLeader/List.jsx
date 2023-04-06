import { chargeDeptLeaderPath } from '../../utils'
import { BaseProTable } from '../../components'

export default () => {
  const columns = [
    { title: '业务主管领导', dataIndex: 'loginName', valueType: 'text' },
  ]

  return <BaseProTable path={chargeDeptLeaderPath} columns={columns} rowKey={'loginName'}/>
}
