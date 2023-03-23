import { useRef, useState } from 'react'
import ProTable from '@ant-design/pro-table'
import { proTableRequest, projectCodePath } from '../../utils'
import { OperateButton } from '../../components'
import ToolBarButton from './ToolBarButton'

export default () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const actionRef = useRef()
  const columns = [
    { title: '项目名称', dataIndex: 'projectName', valueType: 'text' },
    { title: '任务号/备案号', dataIndex: 'taskCode', valueType: 'text' },
    { title: '状态', dataIndex: 'status', valueType: 'text' },
    { title: '创建人', dataIndex: 'displayName', valueType: 'text' },
    { title: '创建部门', dataIndex: 'deptName', valueType: 'text' },
    { title: '创建时间', dataIndex: 'createDatetime', valueType: 'text' },
    {
      title: '操作',
      valueType: 'option',
      render: (text, record, _, action) => [
        <OperateButton record={record} path={projectCodePath} actionRef={actionRef}/>,
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
    params={{ list: projectCodePath.list }}
    request={proTableRequest}
    //复选框
    rowSelection={{ onChange: selectedRowKeys => setSelectedRowKeys(selectedRowKeys) }}
    tableAlertRender={false}
    //
    options={{ density: false }}
    //
    headerTitle={
      <ToolBarButton
        path={projectCodePath} actionRef={actionRef} selectedRowKeys={selectedRowKeys}
      />
    }
  />
}
