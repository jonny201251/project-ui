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
    { title: '注册地址', dataIndex: 'address', valueType: 'text' },
    { title: '注册资金', dataIndex: 'registerMoney', valueType: 'text' },
    { title: '职工总数', dataIndex: 'workCount', valueType: 'text' },
    { title: '变更次数', dataIndex: 'version', valueType: 'text' },
    { title: '创建人', dataIndex: 'displayName', valueType: 'text' },
    { title: '创建部门', dataIndex: 'deptName', valueType: 'text' },
    { title: '创建时间', dataIndex: 'createDatetime', valueType: 'text' },
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
    //复选框
    rowSelection={{ onChange: selectedRowKeys => setSelectedRowKeys(selectedRowKeys) }}
    tableAlertRender={false}
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
