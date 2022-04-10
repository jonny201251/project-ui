import { useRef, useState } from 'react'
import ProTable from '@ant-design/pro-table'
import { OperateButton, ToolBarButton } from './index'
import { proTableRequest } from '../utils'
import { Pagination } from 'antd'

export default (props) => {
  const { columns, path, rowKey = 'id', search = false, options = true, pagination = true } = props

  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const actionRef = useRef()

  let newColumns = columns.map((item) => item)
  newColumns.push({
    title: '操作',
    valueType: 'option',
    render: (text, record, _, action) => [
      <OperateButton record={record} path={path} actionRef={actionRef} rowKey={rowKey}/>,
    ],
  })

  return (
    <ProTable
      bordered
      rowKey={rowKey}
      actionRef={actionRef}
      columns={newColumns}
      columnEmptyText={true}
      //列表数据
      pagination={pagination}
      params={{ list: path.list }}
      request={proTableRequest}
      //复选框
      rowSelection={{ onChange: selectedRowKeys => setSelectedRowKeys(selectedRowKeys) }}
      tableAlertRender={false}
      //
      options={{ density: false }}
      search={search}
      //
      headerTitle={
        <ToolBarButton
          path={path} actionRef={actionRef} selectedRowKeys={selectedRowKeys} rowKey={rowKey}
        />
      }
    />
  )
};
