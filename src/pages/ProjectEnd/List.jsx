import { projectEndPath } from '../../utils'
import { BaseProTable2 } from '../../components'

export default () => {
  const columns = [
    { title: '项目类别', dataIndex: 'type', valueType: 'text' },
    { title: '项目名称', dataIndex: 'name', valueType: 'text' },
    { title: '项目性质', dataIndex: 'name', valueType: 'text' },
    { title: '日期', dataIndex: 'date', valueType: 'text' },
    { title: '合同编号', dataIndex: 'a1', valueType: 'text' },
    { title: '合同金额', dataIndex: 'a1', valueType: 'text' },
    { title: '项目状态', dataIndex: 'a2', valueType: 'text' },
    { title: '决算金额', dataIndex: 'a3', valueType: 'text' },
    { title: '公司利润', dataIndex: 'a4', valueType: 'text' },
    { title: '事业部利润', dataIndex: 'a5', valueType: 'text' },
    { title: '备注', dataIndex: 'remark', valueType: 'text' },
  ]

  return <BaseProTable2 path={projectEndPath} columns={columns}/>
}
