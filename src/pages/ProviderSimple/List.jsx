import { proTableRequest, providerSimplePath } from '../../utils'
import { ToolBarButton2 } from '../../components'
import OperateButton from './OperateButton'
import ProTable from '@ant-design/pro-table'
import { useRef, useState } from 'react'

export default () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const actionRef = useRef()
  const columns = [
    { title: '供方用途', dataIndex: 'usee', valueType: 'text' },
    { title: '供方名称', dataIndex: 'name', valueType: 'text' },
    { title: '注册地址', dataIndex: 'address', valueType: 'text', hideInSearch: true },
    { title: '注册资金', dataIndex: 'registerMoney', valueType: 'text', hideInSearch: true },
    { title: '职工总数', dataIndex: 'workCount', valueType: 'text', hideInSearch: true },
    { title: '创建人', dataIndex: 'displayName', valueType: 'text', hideInSearch: true },
    { title: '创建部门', dataIndex: 'deptName', valueType: 'text', hideInSearch: true },
    { title: '创建时间', dataIndex: 'createDatetime', valueType: 'text', hideInSearch: true },
    {
      title: '操作',
      valueType: 'option',
      render: (text, record, _, action) => [
        <OperateButton record={record} path={providerSimplePath} actionRef={actionRef}/>,
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
    params={{ list: providerSimplePath.list }}
    request={proTableRequest}
    //
    options={{ density: false }}
    //
    headerTitle={
      <ToolBarButton2
        path={providerSimplePath} actionRef={actionRef} selectedRowKeys={selectedRowKeys}
      />
    }
  />
}
