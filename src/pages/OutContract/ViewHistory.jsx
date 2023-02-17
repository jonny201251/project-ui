import { outContractPath } from '../../utils'
import ProTable from '@ant-design/pro-table'
import React, { useRef } from 'react'
import { OperateButtonProcess } from '../../components'

export default (props) => {
  const actionRef = useRef()
  const columns = [
    { title: '项目名称', dataIndex: 'name', valueType: 'text' },
    { title: 'WBS编号', dataIndex: 'wbs', valueType: 'text' },
    {
      title: '合同名称', dataIndex: 'contractName', valueType: 'text',
      render: (text, record, _, action) => {
        return <OperateButtonProcess
          record={record} path={outContractPath} actionRef={actionRef} from={'ViewHistory'}/>
      },
    },
    { title: '合同编号', dataIndex: 'contractCode', valueType: 'text' },
    { title: '合同金额', dataIndex: 'contractMoney', valueType: 'text' },
    { title: '结算金额', dataIndex: 'endMoney', valueType: 'text' },
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
    options={false}
    search={false}
  />
}
