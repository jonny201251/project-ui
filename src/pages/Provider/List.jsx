import { providerPath } from '../../utils'
import { BaseProTable } from '../../components'

export default () => {
  const columns = [
    { title: '供方用途', dataIndex: 'usee', valueType: 'text' },
    { title: '供方名称', dataIndex: 'name', valueType: 'text' },
    { title: '纳税人识别号', dataIndex: 'code', valueType: 'text' },
    { title: '结论', dataIndex: 'result', valueType: 'text' },
  ]

  return <BaseProTable path={providerPath} columns={columns} search={{ labelWidth: 90 }}/>
}
