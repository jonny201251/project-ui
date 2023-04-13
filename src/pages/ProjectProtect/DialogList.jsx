import { projectDialogPath } from '../../utils'
import { BaseList } from '../../components'


export default (props) => {
  const columns = [
    {
      title: '项目类别', dataIndex: 'projectType', valueType: 'text',
      valueEnum: {
        一般项目: { text: '一般项目' },
        重大项目: { text: '重大项目' },
        一般项目非: { text: '一般项目非' },
      },
      formItemProps: { rules: [{ required: true, message: '此项为必填项' }] },
    },
    {
      title: '项目名称', dataIndex: 'name', valueType: 'text',
      formItemProps: { rules: [{ required: true, message: '此项为必填项' }] },
    },
    { title: '任务号', dataIndex: 'taskCode', valueType: 'text' },
    { title: '预计签约金额', dataIndex: 'expectMoney', valueType: 'text', hideInSearch: true },
    { title: '申请人', dataIndex: 'displayName', valueType: 'text', hideInSearch: true },
    { title: '申请部门', dataIndex: 'deptName', valueType: 'text', hideInSearch: true },
    { title: '申请时间', dataIndex: 'createDatetime', valueType: 'text', hideInSearch: true },
  ]

  return <BaseList
    form={props.form} selectedId={props.selectedId}
    path={projectDialogPath} columns={columns} search={{ span: 12, defaultCollapsed: false }}
  />
}
