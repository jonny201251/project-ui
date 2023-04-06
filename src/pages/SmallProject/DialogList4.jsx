import { projectCode2Path } from '../../utils'
import { BaseList } from '../../components'

export default (props) => {
  const columns = [
    { title: '项目名称', dataIndex: 'projectName', valueType: 'text', colSize: 2 },
    { title: '任务号', dataIndex: 'taskCode', valueType: 'text', hideInSearch: true },
    { title: '创建人', dataIndex: 'loginName', valueType: 'text', hideInSearch: true },
  ]

  return <BaseList
    form={props.form} selectedId={props.selectedId}
    path={projectCode2Path} columns={columns} search={{ span: 8 }}
  />
}
