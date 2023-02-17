import { contractRunPath } from '../../utils'
import { BaseProTable } from '../../components'

export default () => {
  const columns = [
    { title: '申请部门', dataIndex: 'a1', valueType: 'text' },
    { title: '项目名称', dataIndex: 'a2', valueType: 'text' },
    { title: '合同类型', dataIndex: 'a3', valueType: 'text' },
    { title: '合同编号', dataIndex: 'a4', valueType: 'text' },
    { title: '任务号', dataIndex: 'a41', valueType: 'text' },
    { title: '合同名称', dataIndex: 'a5', valueType: 'text' },
    { title: '合同金额', dataIndex: 'a6', valueType: 'text' },
    { title: '结算金额', dataIndex: 'a7', valueType: 'text' },
    { title: '签订日期', dataIndex: 'a8', valueType: 'text' },
    { title: '累计收付款', dataIndex: 'a9', valueType: 'text' },

  ]

  return <BaseProTable path={contractRunPath} columns={columns}/>
}
