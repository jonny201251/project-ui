import { projectRunPath } from '../../utils'
import { BaseProTable } from '../../components'

export default () => {
  const columns = [
    { title: '部门', dataIndex: 'a1', valueType: 'text' },
    { title: 'WBS编号', dataIndex: 'a2', valueType: 'text' },
    { title: '合同编号', dataIndex: 'a3', valueType: 'text' },
    { title: '任务号', dataIndex: 'a4', valueType: 'text' },
    { title: '项目名称', dataIndex: 'a5', valueType: 'text' },
    { title: '项目性质', dataIndex: 'a6', valueType: 'text' },
    { title: '签订时间', dataIndex: 'a7', valueType: 'text' },
    { title: '结算金额', dataIndex: 'a8', valueType: 'text' },
    { title: '预计毛利率', dataIndex: 'a9', valueType: 'text' },
    { title: '开票累计', dataIndex: 'a10', valueType: 'text' },
    { title: '开票余额', dataIndex: '11', valueType: 'text' },
  ]

  return <BaseProTable path={projectRunPath} columns={columns}/>
}
