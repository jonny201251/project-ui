import { inContractPath } from '../../utils'
import { BaseList } from '../../components'

export default (props) => {
  const columns = [
    { title: '项目名称', dataIndex: 'name', valueType: 'text'},
    { title: '任务号', dataIndex: 'taskCode', valueType: 'text' },
    { title: 'WBS编号', dataIndex: 'wbs', valueType: 'text' },
    { title: '收款合同编号', dataIndex: 'contractCode', valueType: 'text', hideInSearch: true },
    { title: '收款合同名称', dataIndex: 'contractName', valueType: 'text', hideInSearch: true },
    { title: '收款合同金额', dataIndex: 'contractMoney', valueType: 'text', hideInSearch: true },
    { title: '创建人', dataIndex: 'displayName', valueType: 'text', hideInSearch: true },
    { title: '创建部门', dataIndex: 'deptName', valueType: 'text', hideInSearch: true },
  ]

  return <BaseList
    form={props.form} selectedId={props.selectedId}
    path={inContractPath} columns={columns} search={{ span: 8, defaultCollapsed: false  }}
  />
}
