import { smallBudgetInPath } from '../../utils'
import { BaseProTable } from '../../components'

export default () => {
  const columns = [
    { title: '项目名称', dataIndex: 'projectName', valueType: 'text' },
    { title: '项目任务号', dataIndex: 'projectTaskCode', valueType: 'text' },
    { title: '收入类型', dataIndex: 'inType', valueType: 'text' },
  ]

  return <BaseProTable path={smallBudgetInPath} columns={columns} rowKey={'budgetId'}  search={true}/>
}
