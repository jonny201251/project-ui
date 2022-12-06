import { smallBudgetInPath } from '../../utils'
import { BaseProTable } from '../../components'

export default () => {
  const columns = [
    { title: '项目名称', dataIndex: 'name', valueType: 'text' },
    { title: '项目任务号', dataIndex: 'taskCode', valueType: 'text' },
    { title: '收入类型', dataIndex: 'inType', valueType: 'text' },
    { title: '版本', dataIndex: 'version', valueType: 'text' },
  ]

  return <BaseProTable path={smallBudgetInPath} columns={columns} rowKey={'budgetId'}  search={true}/>
}
