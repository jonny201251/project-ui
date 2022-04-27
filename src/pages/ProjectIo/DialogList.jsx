import { inContractPath } from '../../utils'
import { BaseList } from '../../components'

export default (props) => {
  const columns = [
    { title: '项目名称', dataIndex: 'name', valueType: 'text', colSize: 2 },
    { title: 'WBS编号', dataIndex: 'wbs', valueType: 'text', hideInSearch: true },
    { title: '合同编号', dataIndex: 'customerCode', valueType: 'text', hideInSearch: true },
    { title: '合同名称', dataIndex: 'customerName', valueType: 'text', hideInSearch: true },
    { title: '合同金额', dataIndex: 'customerMonney', valueType: 'text', hideInSearch: true },
  ]

  return <BaseList
    form={props.form} selectedId={props.selectedId}
    path={inContractPath} columns={columns} search={{ span: 8 }}
  />
}
