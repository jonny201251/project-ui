import { projectIoPath } from '../../utils'
import { BaseProTable } from '../../components'

export default () => {
  const columns = [
    { title: '项目名称', dataIndex: 'name', valueType: 'text' },
    { title: 'WBS编号', dataIndex: 'wbs', valueType: 'text' },
    { title: '往来类型', dataIndex: 'type2', valueType: 'text' },
    { title: '影响收支', dataIndex: 'haveInOut', valueType: 'text' },
    { title: '往来款', dataIndex: 'money', valueType: 'text' },
    { title: '往来方名称', dataIndex: 'providerName', valueType: 'text' },
  ]

  return <BaseProTable path={projectIoPath} columns={columns} search={true}/>
}
