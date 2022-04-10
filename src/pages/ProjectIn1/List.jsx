import { projectIn1Path } from '../../utils'
import { BaseProTable } from '../../components'

export default () => {
  const columns = [
    { title: '项目名称', dataIndex: 'name', valueType: 'text' },
    { title: '项目任务号', dataIndex: 'taskCode', valueType: 'text' },
    { title: 'WBS编号', dataIndex: 'wbs', valueType: 'text' },
    { title: '客户名称', dataIndex: 'customerName', valueType: 'text' },
    { title: '合同编号', dataIndex: 'contractCode', valueType: 'text' },
    { title: '合同额', dataIndex: 'contractMoney', valueType: 'text' },
    { title: '合同名称', dataIndex: 'contractName', valueType: 'text' },
  ]

  return <BaseProTable path={projectIn1Path} columns={columns} search={true}/>
}
