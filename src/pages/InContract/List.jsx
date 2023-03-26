import { inContractPath, proTableRequest } from '../../utils'
import { OperateButton } from '../../components'
import ProTable from '@ant-design/pro-table'
import ToolBarButton from './ToolBarButton'
import { useRef } from 'react'

export default () => {
  const actionRef = useRef()

  const columns = [
    { title: '项目名称', dataIndex: 'name', valueType: 'text' },
    { title: '任务号', dataIndex: 'taskCode', valueType: 'text' },
    { title: 'WBS编号', dataIndex: 'wbs', valueType: 'text' },
    { title: '收款合同编号', dataIndex: 'contractCode', valueType: 'text' },
    { title: '收款合同名称', dataIndex: 'contractName', valueType: 'text' },
    { title: '收款合同金额', dataIndex: 'contractMoney', valueType: 'text' },
    { title: '结算金额', dataIndex: 'endMoney', valueType: 'text' },
    { title: '创建人', dataIndex: 'displayName', valueType: 'text' },
    { title: '创建部门', dataIndex: 'deptName', valueType: 'text' },
    { title: '创建时间', dataIndex: 'createDatetime', valueType: 'text' },
    {
      title: '操作',
      valueType: 'option',
      render: (text, record, _, action) => [
        <OperateButton record={record} path={inContractPath} actionRef={actionRef}/>,
      ],
    },
  ]

  return <ProTable
    bordered
    rowKey="id"
    actionRef={actionRef}
    columns={columns}
    columnEmptyText={true}
    //列表数据
    params={{ list: inContractPath.list }}
    request={proTableRequest}
    //
    options={{ density: false }}
    //
    headerTitle={
      <ToolBarButton
        path={inContractPath} actionRef={actionRef}
      />
    }
  />
}
