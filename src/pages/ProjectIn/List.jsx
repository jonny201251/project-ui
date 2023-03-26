import { projectInPath } from '../../utils'
import { BaseProTable2 } from '../../components'

export default () => {
  const columns = [
    { title: '项目名称', dataIndex: 'name', valueType: 'text' },
    { title: '任务号', dataIndex: 'taskCode', valueType: 'text' },
    { title: 'WBS编号', dataIndex: 'wbs', valueType: 'text' },
    { title: '收款合同编号', dataIndex: 'contractCode', valueType: 'text' },
    { title: '收款合同名称', dataIndex: 'contractName', valueType: 'text' },
    { title: '收款合同金额', dataIndex: 'contractMoney', valueType: 'text' },
    { title: '结算金额', dataIndex: 'contractMoney', valueType: 'text', hideInSearch: true },
    { title: '日期', dataIndex: 'inDate', valueType: 'text', hideInSearch: true },
    { title: '开票金额', dataIndex: 'money1', valueType: 'text', hideInSearch: true },
    { title: '收款金额', dataIndex: 'money2', valueType: 'text' , hideInSearch: true},
    { title: '创建人', dataIndex: 'displayName', valueType: 'text' },
    { title: '创建部门', dataIndex: 'deptName', valueType: 'text' },
    { title: '创建时间', dataIndex: 'createDatetime', valueType: 'text', hideInSearch: true },
  ]

  return <BaseProTable2 path={projectInPath} columns={columns} search={true}/>
}
