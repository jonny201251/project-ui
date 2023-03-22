import { projectProtectPath } from '../../utils'
import { BaseProTableProcess } from '../../components'

export default () => {
  const columns = [
    { title: '项目类别', dataIndex: 'type', valueType: 'text' },
    { title: '项目名称', dataIndex: 'name', valueType: 'text' },
    { title: '任务号', dataIndex: 'taskCode', valueType: 'text' },
    { title: 'WBS编号', dataIndex: 'wbs', valueType: 'text' },
    { title: '项目状态', dataIndex: 'status', valueType: 'text' },
    { title: '申请人', dataIndex: 'displayName', valueType: 'text' },
    { title: '申请部门', dataIndex: 'deptName', valueType: 'text' },
    { title: '申请时间', dataIndex: 'createDatetime', valueType: 'text' },
    {
      title: '流程状态', valueType: 'text',
      renderText: (text, record) => (record.processInst ? record.processInst.processStatus : '草稿'),
      valueEnum: {
        草稿: { text: '草稿', status: 'Default' },
        审批中: { text: '审批中', status: 'Processing' },
        完成: { text: '完成', status: 'Success' },
        退回: { text: '退回', status: 'Error' },
        退回申请人: { text: '退回申请人', status: 'Error' },
        申请人撤回: { text: '申请人撤回', status: 'Error' },
      },
    },
    { title: '当前步骤', dataIndex: ['processInst', 'displayProcessStep'], valueType: 'text' },
  ]

  return <BaseProTableProcess path={projectProtectPath} columns={columns} search={true}/>
}
