import { proTableRequest, smallBudgetProjectPath } from '../../utils'
import OperateButton from './OperateButton'
import { useRef, useState } from 'react'
import ProTable from '@ant-design/pro-table'
import { ToolBarButton2 } from '../../components'

export default () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const actionRef = useRef()
  const columns = [
    {
      title: '项目类别', dataIndex: 'projectType', valueType: 'text',
      valueEnum: {
        一般项目: { text: '一般项目' },
        重大项目: { text: '重大项目' },
        一般项目非: { text: '一般项目非' },
      },
    },
    { title: '项目名称', dataIndex: 'name', valueType: 'text' },
    { title: '任务号', dataIndex: 'taskCode', valueType: 'text' },
    {
      title: '项目性质', dataIndex: 'property', valueType: 'text',
      valueEnum: {
        一类: { text: '一类' },
        二类: { text: '二类' },
        三类: { text: '三类' },
      },
    },
    { title: '预计毛利率', dataIndex: 'projectRate', valueType: 'text' },
    { title: '成本总预算', dataIndex: 'totalCost', valueType: 'text', hideInSearch: true },
    { title: '合同编号', dataIndex: 'contractCode', valueType: 'text' },
    { title: '合同金额', dataIndex: 'contractMoney', valueType: 'text', hideInSearch: true },
    { title: '合同名称', dataIndex: 'contractName', valueType: 'text' },
    { title: '创建人', dataIndex: 'displayName', valueType: 'text', hideInSearch: true  },
    { title: '创建部门', dataIndex: 'deptName', valueType: 'text', hideInSearch: true  },
    { title: '创建时间', dataIndex: 'createDatetime', valueType: 'text', hideInSearch: true  },
    { title: '调整次数', dataIndex: 'version', valueType: 'text', hideInSearch: true },
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
    //
    options={{ density: false }}
    //
    headerTitle={
      <ToolBarButton2
        path={smallBudgetProjectPath} actionRef={actionRef} selectedRowKeys={selectedRowKeys}
      />
    }
  />
}
