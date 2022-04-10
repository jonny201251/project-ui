import { useRef } from 'react'
import ProTable from '@ant-design/pro-table'
import { processInstPath, proTableRequest } from '../../utils'
import OperateButtonProcess from './OperateButtonProcess'

export default () => {
  const actionRef = useRef()
  const columns = [
    { title: '流程类型', dataIndex: 'processName', valueType: 'text' },
    {
      title: '流程名称', valueType: 'text',
      render: (text, record, _, action) => {
        return <OperateButtonProcess record={record} actionRef={actionRef}/>
      },
    },
    { title: '申请人', dataIndex: 'displayName', valueType: 'text' },
    { title: '申请部门', dataIndex: 'deptName', valueType: 'text' },
    { title: '申请时间', dataIndex: 'startDatetime', valueType: 'text' },
    {
      title: '流程状态', dataIndex: 'processStatus', valueType: 'text',
      valueEnum: {
        审批中: { text: '审批中', status: 'Processing' },
        退回: { text: '退回', status: 'Error' },
        退回申请人: { text: '退回申请人', status: 'Error' },
        申请人撤回: { text: '申请人撤回', status: 'Error' },
      },
    },
    { title: '当前步骤', dataIndex: 'displayProcessStep', valueType: 'text' },
  ]

  return <ProTable
    bordered
    rowKey="id"
    actionRef={actionRef}
    columns={columns}
    columnEmptyText={true}
    //列表数据
    pagination={false}
    params={{ list: processInstPath.myList }}
    request={proTableRequest}
    //
    tableAlertRender={false}
    options={{ density: false }}
    search={false}
    //
    headerTitle="待办流程"
  />
}
