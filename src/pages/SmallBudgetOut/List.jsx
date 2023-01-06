import { smallBudgetOutPath } from '../../utils'
import { BaseProTable } from '../../components'

export default () => {
  const columns = [
    { title: '项目名称', dataIndex: 'name', valueType: 'text' },
    { title: '项目任务号', dataIndex: 'taskCode', valueType: 'text' },
    { title: '成本类型', dataIndex: 'costType', valueType: 'text' },
    { title: '税率', dataIndex: 'costRate', valueType: 'text' },
    { title: '调整次数', dataIndex: 'version', valueType: 'text' },
  ]

  return <BaseProTable path={smallBudgetOutPath} columns={columns} rowKey={'budgetId'}  search={true}/>
}
