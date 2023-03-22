import { providerBigProjectPath } from '../../utils'
import { BaseList } from '../../components'

export default (props) => {
  const columns = [
    { title: '供方用途', dataIndex: 'usee', valueType: 'text', colSize: 2, hideInSearch: true },
    { title: '供方名称', dataIndex: 'name', valueType: 'text', colSize: 2 },
    { title: '纳税人识别号', dataIndex: 'code', valueType: 'text', hideInSearch: true },
  ]

  return <BaseList
    form={props.form} selectedId={props.selectedId}
    path={providerBigProjectPath} columns={columns} search={{ span: 8 }}
  />
}