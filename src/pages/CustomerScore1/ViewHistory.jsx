import { customerScore1Path } from '../../utils'
import ProTable from '@ant-design/pro-table'
import React, { useRef } from 'react'
import { OperateButtonProcess } from '../../components'

export default (props) => {
  const actionRef = useRef()
  const columns = [
    {
      title: '客户名称', dataIndex: 'customerName', valueType: 'text',
      render: (text, record, _, action) => {
        return <OperateButtonProcess
          record={record} path={customerScore1Path} actionRef={actionRef} from={'ViewHistory'}/>
      },
    },
    { title: '初评得分', dataIndex: 'startScore', valueType: 'text' },
    { title: '初评等级', dataIndex: 'startResult', valueType: 'text' },
    { title: '部门打分', dataIndex: 'endScore', valueType: 'text' },
    { title: '部门等级', dataIndex: 'endResult', valueType: 'text' },
    { title: '结论', dataIndex: 'result', valueType: 'text' },
    { title: '变更次数', dataIndex: ['processInst', 'businessVersion'], valueType: 'text' },
  ]

  return <ProTable
    bordered
    rowKey="id"
    actionRef={actionRef}
    columns={columns}
    columnEmptyText={true}
    //列表数据
    pagination={false}
    dataSource={props.record.dataList}
    //
    tableAlertRender={false}
    options={{ density: false }}
    search={false}
  />
}
