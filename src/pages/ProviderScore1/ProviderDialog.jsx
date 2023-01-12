import { providerPath3 } from '../../utils'
import { BaseList } from '../../components'

export default (props) => {
  const columns = [
    { title: '供方用途', dataIndex: 'usee', valueType: 'text' },
    { title: '供方名称', dataIndex: 'name', valueType: 'text' },
  ]

  return <BaseList
    form={props.form} selectedId={props.selectedId}
    path={providerPath3} columns={columns} search={{ span: 12 }}
  />
}
