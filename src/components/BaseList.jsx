import { useRef, useState } from 'react'
import ProTable from '@ant-design/pro-table'
import { proTableRequest } from '../utils'

export default (props) => {
  const { form, selectedId, columns, path, rowKey = 'id', search = false, options = false, pagination = true } = props

  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [selectedRows, setSelectedRows] = useState([])
  const actionRef = useRef()

  return <ProTable
    bordered
    rowKey={rowKey}
    actionRef={actionRef}
    columns={columns}
    columnEmptyText={true}
    //列表数据
    pagination={pagination}
    params={{ list: path.list }}
    request={proTableRequest}
    //
    rowSelection={{
      type: 'radio', selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        setSelectedRowKeys(selectedRowKeys)
        setSelectedRows(selectedRows)
        if (selectedRows.length === 1) {
          form.setValues({ selectedRow: selectedRows[0] })
        }
      },
    }}
    tableAlertRender={false}
    options={false}
    search={search}
  />
}
