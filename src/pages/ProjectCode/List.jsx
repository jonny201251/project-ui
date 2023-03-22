import { projectCodePath } from '../../utils'
import { BaseProTable2 } from '../../components'

export default () => {
  const columns = [
    { title: '项目名称', dataIndex: 'projectName', valueType: 'text' },
    { title: '任务号/备案号', dataIndex: 'taskCode', valueType: 'text' },
    { title: '状态', dataIndex: 'status', valueType: 'text' },
    { title: '创建人', dataIndex: 'displayName', valueType: 'text' },
    { title: '创建部门', dataIndex: 'deptName', valueType: 'text' },
    { title: '创建时间', dataIndex: 'createDatetime', valueType: 'text' },
  ]

  return <BaseProTable2 path={projectCodePath} columns={columns} search={true}/>
}
