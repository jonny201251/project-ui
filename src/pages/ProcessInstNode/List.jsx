import ProTable from '@ant-design/pro-table'
import { processInstNodePath, proTableRequest } from '../../utils'
import OperateButtonProcess from '../ProcessInst/OperateButtonProcess'

export default (props) => {
  let { processInstId } = props

  const columns = [
    { title: '任务节点', dataIndex: 'taskName', valueType: 'text' },
    { title: '所在部门', dataIndex: 'deptName', valueType: 'text' },
    { title: '审批人', dataIndex: 'displayName', valueType: 'text' },
    {
      title: '审批按钮', dataIndex: 'buttonName', valueType: 'text',
      render: (text, record, _, action) => {
        if (text === '退回' || text === '退回申请人' || text === '申请人撤回') {
          return <span style={{ color: 'red' }}>{text}</span>
        } else {
          return text
        }
      },
    },
    { title: '审批意见', dataIndex: 'comment', valueType: 'text' },
    { title: '到达时间', dataIndex: 'startDatetime', valueType: 'text' },
    { title: '完成时间', dataIndex: 'endDatetime', valueType: 'text' },
  ]

  return <ProTable
    bordered
    rowKey="id"
    columns={columns}
    columnEmptyText={true}
    //列表数据
    pagination={false}
    params={{ list: processInstNodePath.list, processInstId }}
    request={proTableRequest}
    //
    tableAlertRender={false}
    options={false}
    search={false}
  />
}
