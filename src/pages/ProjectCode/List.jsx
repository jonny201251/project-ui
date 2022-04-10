import { projectCodePath } from '../../utils'
import { BaseProTable } from '../../components'

export default () => {
  const columns = [
    { title: '任务号', dataIndex: 'taskCode', valueType: 'text' },
    { title: '项目名称', dataIndex: 'projectName', valueType: 'text' },
    { title: '申请人', dataIndex: 'displayName', valueType: 'text' },
    { title: '申请部门', dataIndex: 'deptName', valueType: 'text' },
    { title: '申请时间', dataIndex: 'createDatetime', valueType: 'text' },
    { title: '状态', dataIndex: 'status', valueType: 'text' },
  ]

  return <BaseProTable path={projectCodePath} columns={columns} search={true}/>
}
