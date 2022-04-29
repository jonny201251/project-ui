import { budgetProjectDialog2Path } from '../../utils'
import { BaseList } from '../../components'

export default (props) => {
  const columns = [
    {
      title: '项目类型', dataIndex: 'type',
      valueType: 'select',
      valueEnum: { 一般项目: { text: '一般项目' }, 重大项目: { text: '重大项目' } },
      // initialValue: '一般项目',
      formItemProps: {
        rules: [{ required: true, message: '该字段是必填字段' }],
      },
      hideInTable: true,
    },
    {
      title: '项目名称', dataIndex: 'name', valueType: 'text',
      formItemProps: {
        rules: [{ required: true, message: '该字段是必填字段' }],
      },
    },
    { title: '任务号', dataIndex: 'taskCode', valueType: 'text', hideInSearch: true },
    { title: 'WBS编号', dataIndex: 'wbs', valueType: 'text', hideInSearch: true },
    {
      title: '成本类型', dataIndex: 'costType', valueType: 'select',
      valueEnum: { 材料及设备费: { text: '材料及设备费' }, 劳务费: { text: '劳务费' }, 技术服务费: { text: '技术服务费' }, 工程款: { text: '工程款' } },
      formItemProps: {
        rules: [{ required: true, message: '该字段是必填字段' }],
      },
    },
    { title: '税费', dataIndex: 'costRate', valueType: 'text', hideInSearch: true },
    { title: '供方名称', dataIndex: 'companyName', valueType: 'text', hideInSearch: true },
  ]

  return <BaseList
    form={props.form} selectedId={props.selectedId}
    path={budgetProjectDialog2Path} columns={columns} search={{ span: 8, defaultCollapsed: false }}
  />
}
