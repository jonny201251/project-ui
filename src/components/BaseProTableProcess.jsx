import { useRef, useState } from 'react'
import ProTable from '@ant-design/pro-table'
import { OperateButtonProcess, ToolBarButtonProcess } from './index'
import { proTableRequest } from '../utils'

export default (props) => {
  const { columns, path, rowKey = 'id', search = true, options = true,scroll } = props

  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const actionRef = useRef()

  let newColumns = columns.map((item) => item)
  newColumns.push({
    title: '操作',
    valueType: 'option',
    render: (text, record, _, action) => [
      <OperateButtonProcess record={record} path={path} actionRef={actionRef} rowKey={rowKey}/>,
    ],
  })

  return <ProTable
    bordered
    rowKey={rowKey}
    actionRef={actionRef}
    columns={newColumns}
    columnEmptyText={true}
    //列表数据
    params={{ list: path.list }}
    request={proTableRequest}
    //
    tableAlertRender={false}
    options={{ density: false }}
    search={search}
    scroll={scroll}
    sticky
    //
    headerTitle={
      <ToolBarButtonProcess
        path={path} actionRef={actionRef} selectedRowKeys={selectedRowKeys} rowKey={rowKey}
      />
    }
  />
}
