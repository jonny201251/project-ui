import { get, inOutContractPath, proTableRequest } from '../../utils'
import ProTable from '@ant-design/pro-table'
import { useRef } from 'react'
import { FormDialog } from '@formily/antd'
import InForm from './InForm'
import OutForm from './OutForm'

export default () => {
  const actionRef = useRef()

  const render = (record) => {
    return <a onClick={async () => {
      let dialog = FormDialog({ title: '合同号和WBS号', footer: null, keyboard: false, maskClosable: false, width: 900 },
        (form) => {
          form.setValues(record)
          if (record.contractType === '收款合同') {
            return <InForm form={form} dialog={dialog} record={record}/>
          } else {
            return <OutForm form={form} dialog={dialog} record={record}/>
          }
        },
      )
      dialog.open({})
    }}>{record.name}</a>
  }

  const columns = [
    { title: '项目名称', dataIndex: 'name', valueType: 'text', render: (text, record) => render(record) },
    { title: 'WBS编号', dataIndex: 'wbs', valueType: 'text' },
    { title: '费用类型', dataIndex: 'costType', valueType: 'text' },
    { title: '税率', dataIndex: 'costRate', valueType: 'text' },
    { title: '合同类型', dataIndex: 'contractType', valueType: 'text' },
    { title: '合同名称', dataIndex: 'contractName', valueType: 'text' },
    { title: '合同金额', dataIndex: 'contractMoney', valueType: 'text' },
    { title: '结算金额', dataIndex: 'endMoney', valueType: 'text' },
    { title: '创建人', dataIndex: 'displayName', valueType: 'text' },
    { title: '创建部门', dataIndex: 'deptName', valueType: 'text' },
  ]

  return <ProTable
    bordered
    rowKey="id"
    actionRef={actionRef}
    columns={columns}
    columnEmptyText={true}
    //列表数据
    params={{ list: inOutContractPath.list }}
    request={proTableRequest}
    //
    options={{ density: false }}
    search={{ span: 6 }}
  />
}
