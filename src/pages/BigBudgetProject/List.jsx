import { bigBudgetProjectPath } from '../../utils'
import { BaseProTable } from '../../components'

export default () => {
  const columns = [
    { title: '项目名称', dataIndex: 'name', valueType: 'text' },
    { title: '项目任务号', dataIndex: 'taskCode', valueType: 'text' },
    { title: 'WBS编号', dataIndex: 'wbs', valueType: 'text' },
    { title: '项目性质', dataIndex: 'property', valueType: 'text' },
    { title: '项目名称', dataIndex: 'name', valueType: 'text' },
    { title: '合同编号', dataIndex: 'contractCode', valueType: 'text' },
    { title: '合同金额', dataIndex: 'contractName', valueType: 'text' },
    { title: '成本预算', dataIndex: 'totalCost', valueType: 'text' },
  ]

  return <BaseProTable path={bigBudgetProjectPath} columns={columns} search={true}/>
}
