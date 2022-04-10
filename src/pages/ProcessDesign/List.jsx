import { useRef, useState } from 'react'
import ProTable from '@ant-design/pro-table'
import { processDesignPath, proTableRequest } from '../../utils'
import ToolBarButton from './ToolBarButton'
import OperateButton from './OperateButton'

export default () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const actionRef = useRef()
  const columns = [
    { title: '流程名称', dataIndex: 'name', valueType: 'text' },
    { title: '表单路径', dataIndex: 'path', valueType: 'text' },
    {
      title: '流程类型', dataIndex: 'processType', valueType: 'radio',
      valueEnum: {
        新增流程: { text: '新增流程', status: '新增流程' },
        变更流程: { text: '变更流程', status: '变更流程' },
      }
    },
    {
      title: '操作',
      valueType: 'option',
      render: (text, record, _, action) => [
        <OperateButton record={record} path={processDesignPath} actionRef={actionRef}/>,
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
    params={{ list: processDesignPath.list }}
    request={proTableRequest}
    //复选框
    rowSelection={{ onChange: selectedRowKeys => setSelectedRowKeys(selectedRowKeys) }}
    tableAlertRender={false}
    //
    options={{ density: false }}
    search={{ span: 6 }}
    //
    headerTitle={
      <ToolBarButton
        path={processDesignPath} actionRef={actionRef} selectedRowKeys={selectedRowKeys}
      />
    }
  />
}
