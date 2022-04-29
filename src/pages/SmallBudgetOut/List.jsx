import { smallBudgetOutPath } from '../../utils'
import { BaseProTable } from '../../components'

export default () => {
  const columns = [
    { title: '项目名称', dataIndex: 'projectName', valueType: 'text' },
    { title: '项目任务号', dataIndex: 'projectTaskCode', valueType: 'text' },
    { title: '成本类型', dataIndex: 'costType', valueType: 'text' },
    { title: '税率', dataIndex: 'costRate', valueType: 'text' },
  ]

  return <BaseProTable path={smallBudgetOutPath} columns={columns} rowKey={'budgetId'}  search={true}/>
}
