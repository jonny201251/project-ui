import { useRef, useState } from 'react'
import ProTable from '@ant-design/pro-table'
import { proTableRequest, smallProjectNoPath } from '../../utils'
import { OperateButton, ToolBarButton } from '../../components'

export default () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const actionRef = useRef()
  const columns = [
    { title: '项目名称', dataIndex: 'name', valueType: 'text' },
    { title: '任务号', dataIndex: 'taskCode', valueType: 'text' },
    { title: 'WBS编号', dataIndex: 'wbs', valueType: 'text' },
    { title: '申请人', dataIndex: 'displayName', valueType: 'text' },
    { title: '申请部门', dataIndex: 'deptName', valueType: 'text' },
    { title: '申请时间', dataIndex: 'createDatetime', valueType: 'text' },
    {
      title: '操作',
      valueType: 'option',
      render: (text, record, _, action) => [
        <OperateButton record={record} path={smallProjectNoPath} actionRef={actionRef}/>,
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
    params={{ list: smallProjectNoPath.list }}
    request={proTableRequest}
    //复选框
    rowSelection={{ onChange: selectedRowKeys => setSelectedRowKeys(selectedRowKeys) }}
    tableAlertRender={false}
    //
    options={{ density: false }}
    //
    headerTitle={
      <ToolBarButton
        path={smallProjectNoPath} actionRef={actionRef} selectedRowKeys={selectedRowKeys}
      />
    }
  />
}
