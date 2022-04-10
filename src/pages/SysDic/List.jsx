import { useRef, useState } from 'react'
import ProTable from '@ant-design/pro-table'
import { proTableRequest, sysDicPath } from '../../utils'
import { OperateButton, ToolBarButton } from '../../components'

export default () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const actionRef = useRef()
  const columns = [
    { title: '类别', dataIndex: 'type', valueType: 'text' },
    { title: '名称', dataIndex: 'name', valueType: 'text' },
    { title: '排序', dataIndex: 'sort', valueType: 'text', hideInSearch: true },
    {
      title: '操作',
      valueType: 'option',
      render: (text, record, _, action) => [
        <OperateButton record={record} path={sysDicPath} actionRef={actionRef}/>,
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
    params={{ list: sysDicPath.list }}
    request={proTableRequest}
    //复选框
    rowSelection={{ onChange: selectedRowKeys => setSelectedRowKeys(selectedRowKeys) }}
    tableAlertRender={false}
    //
    options={{ density: false }}
    //
    headerTitle={
      <ToolBarButton
        path={sysDicPath} actionRef={actionRef} selectedRowKeys={selectedRowKeys}
      />
    }
  />
}
