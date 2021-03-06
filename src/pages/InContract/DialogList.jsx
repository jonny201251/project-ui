import { budgetProjectDialogPath } from '../../utils'
import { BaseList } from '../../components'

export default (props) => {
  const columns = [
    { title: '项目名称', dataIndex: 'name', valueType: 'text', colSize: 2 },
    { title: '任务号', dataIndex: 'taskCode', valueType: 'text', hideInSearch: true },
    { title: 'WBS号', dataIndex: 'wbs', valueType: 'text', hideInSearch: true },
  ]

  return <BaseList
    form={props.form} selectedId={props.selectedId}
    path={budgetProjectDialogPath} columns={columns} search={{ span: 8 }}
  />
}
