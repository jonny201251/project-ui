import { get, projectInOutDetailPath, proTableRequest } from '../../utils'
import ProTable from '@ant-design/pro-table'
import { useRef } from 'react'
import { FormDialog } from '@formily/antd'
import Form from './Form'

export default () => {
  const actionRef = useRef()

  const render = (record) => {
    return <a onClick={async () => {
      const data = await get(projectInOutDetailPath.get, { projectId: record.projectId })
      if (data) {
        let dialog = FormDialog({ title: '收支明细表', footer: null, keyboard: false, maskClosable: false, width: 1000 },
          (form) => {
            form.setValues(data)
            return <Form form={form} dialog={dialog}/>
          },
        )
        dialog.open({})
      }
    }}>{record.name}</a>
  }

  const columns = [
    { title: '项目名称', dataIndex: 'name', valueType: 'text', render: (text, record) => render(record) },
    { title: '项目任务号', dataIndex: 'taskCode', valueType: 'text' },
    { title: '项目性质', dataIndex: 'property', valueType: 'text' },
    { title: 'WBS编号', dataIndex: 'wbs', valueType: 'text' },
    { title: '客户名称', dataIndex: 'customerName', valueType: 'text' },
    { title: '收款合同编号', dataIndex: 'contractCode', valueType: 'text' },
    { title: '合同名称', dataIndex: 'contractName', valueType: 'text' },
    { title: '合同额', dataIndex: 'contractMoney', valueType: 'text' },
  ]

  return <ProTable
    bordered
    rowKey="id"
    actionRef={actionRef}
    columns={columns}
    columnEmptyText={true}
    //列表数据
    params={{ list: projectInOutDetailPath.list }}
    request={proTableRequest}
    //
    options={{ density: false }}
    search={{ span: 6 }}
  />
}
