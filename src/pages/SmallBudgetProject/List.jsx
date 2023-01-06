import { proTableRequest, smallBudgetProjectPath } from '../../utils'
import OperateButton from './OperateButton'
import { useRef, useState } from 'react'
import ProTable from '@ant-design/pro-table'
import { ToolBarButton } from '../../components'

export default () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const actionRef = useRef()
  const columns = [
    { title: '项目名称', dataIndex: 'name', valueType: 'text' },
    { title: '项目任务号', dataIndex: 'taskCode', valueType: 'text' },
    { title: 'WBS编号', dataIndex: 'wbs', valueType: 'text' },
    { title: '项目性质', dataIndex: 'property', valueType: 'text' },
    { title: '合同编号', dataIndex: 'contractCode', valueType: 'text' },
    { title: '合同金额', dataIndex: 'contractName', valueType: 'text' },
    { title: '成本总预算', dataIndex: 'totalCost', valueType: 'text' },
    { title: '调整次数', dataIndex: 'version', valueType: 'text' },
    {
      title: '操作',
      valueType: 'option',
      render: (text, record, _, action) => [
        <OperateButton record={record} path={smallBudgetProjectPath} actionRef={actionRef}/>,
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
    params={{ list: smallBudgetProjectPath.list }}
    request={proTableRequest}
    //复选框
    rowSelection={{ onChange: selectedRowKeys => setSelectedRowKeys(selectedRowKeys) }}
    tableAlertRender={false}
    //
    options={{ density: false }}
    //
    headerTitle={
      <ToolBarButton
        path={smallBudgetProjectPath} actionRef={actionRef} selectedRowKeys={selectedRowKeys}
      />
    }
  />
}
