import { budgetDialog2Path } from '../../utils'
import { BaseList } from '../../components'

export default (props) => {
  const columns = [
    { title: '项目名称', dataIndex: 'name', valueType: 'text', },
    { title: '任务号', dataIndex: 'taskCode', valueType: 'text' },
    { title: 'WBS编号', dataIndex: 'wbs', valueType: 'text', hideInSearch: true },
    {
      title: '成本类型', dataIndex: 'costType', valueType: 'select',
      valueEnum: { 材料及设备费: { text: '材料及设备费' }, 劳务费: { text: '劳务费' }, 技术服务费: { text: '技术服务费' }, 工程款: { text: '工程款' } },
    },
    { title: '支出金额', dataIndex: 'money', valueType: 'text', hideInSearch: true },
    { title: '申请人', dataIndex: 'displayName', valueType: 'text', hideInSearch: true },
    { title: '申请部门', dataIndex: 'deptName', valueType: 'text', hideInSearch: true },
  ]

  return <BaseList
    rowKey={'budgetId'}
    form={props.form} selectedId={props.selectedId}
    path={budgetDialog2Path} columns={columns} search={{ span: 12, defaultCollapsed: false }}
  />
}
