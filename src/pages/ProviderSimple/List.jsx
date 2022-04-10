import { providerSimplePath } from '../../utils'
import { BaseProTable } from '../../components'

export default () => {
  const columns = [
    { title: '供方用途', dataIndex: 'usee', valueType: 'text' },
    { title: '供方名称', dataIndex: 'name', valueType: 'text' },
    { title: '注册地址', dataIndex: 'address', valueType: 'text' },
    { title: '注册资金', dataIndex: 'registerMoney', valueType: 'text' },
    { title: '职工总数', dataIndex: 'workCount', valueType: 'text' },
  ]

  return <BaseProTable path={providerSimplePath} columns={columns}/>
}
