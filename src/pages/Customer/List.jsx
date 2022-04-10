import { customerPath } from '../../utils'
import { BaseProTable } from '../../components'

export default () => {
  const columns = [
    { title: '客户名称', dataIndex: 'name', valueType: 'text' },
    { title: '客户企业性质', dataIndex: 'property', valueType: 'text' },
    { title: '纳税人识别号', dataIndex: 'code', valueType: 'text' },
    { title: '结论', dataIndex: 'result', valueType: 'text' },
  ]

  return <BaseProTable path={customerPath} columns={columns} search={{ labelWidth: 90 }}/>
}
