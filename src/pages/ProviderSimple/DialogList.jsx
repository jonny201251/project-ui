import { providerPath2 } from '../../utils'
import { BaseList } from '../../components'

export default (props) => {
  const columns = [
    { title: '供方用途', dataIndex: 'usee', valueType: 'text' },
    // { title: '供方名称', dataIndex: 'name', valueType: 'text', colSize: 2 },
    { title: '供方名称', dataIndex: 'name', valueType: 'text'},
    // { title: '纳税人识别号', dataIndex: 'code', valueType: 'text', hideInSearch: true },
    { title: '纳税人识别号', dataIndex: 'code', valueType: 'text' },
  ]

  return <BaseList
    form={props.form} selectedId={props.selectedId}
    path={providerPath2} columns={columns} search={{ span: 12 }}
  />
}
