import { smallBudgetInPath } from '../../utils'
import { BaseProTable2 } from '../../components'

export default () => {
  const columns = [
    { title: '项目名称', dataIndex: 'name', valueType: 'text' },
    { title: '项目任务号', dataIndex: 'taskCode', valueType: 'text' },
    {
      title: '收入类型', dataIndex: 'inType', valueType: 'text',
      valueEnum: {
        项目收入: { text: '项目收入' },
        其他: { text: '其他' },
      },
    },
    { title: '创建人', dataIndex: 'displayName', valueType: 'text', hideInSearch: true  },
    { title: '创建部门', dataIndex: 'deptName', valueType: 'text', hideInSearch: true  },
    { title: '创建时间', dataIndex: 'createDatetime', valueType: 'text', hideInSearch: true  },
    { title: '调整次数', dataIndex: 'version', valueType: 'text', hideInSearch: true },
  ]

  return <BaseProTable2 path={smallBudgetInPath} columns={columns} rowKey={'budgetId'} search={true}/>
}
