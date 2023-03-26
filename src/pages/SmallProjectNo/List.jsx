import { smallProjectNoPath } from '../../utils'
import { BaseProTable2 } from '../../components'

export default () => {
  const columns = [
    { title: '项目名称', dataIndex: 'name', valueType: 'text' },
    { title: '任务号', dataIndex: 'taskCode', valueType: 'text' },
    { title: '预计毛利率', dataIndex: 'projectRate', valueType: 'text', hideInSearch: true  },
    { title: '项目状态', dataIndex: 'projectStatus', valueType: 'text' },
    { title: '创建人', dataIndex: 'displayName', valueType: 'text' },
    { title: '创建部门', dataIndex: 'deptName', valueType: 'text' },
    { title: '创建时间', dataIndex: 'createDatetime', valueType: 'text', hideInSearch: true  },
  ]

  return <BaseProTable2 path={smallProjectNoPath} columns={columns} search={true}/>
}
