import { projectOutPath } from '../../utils'
import { BaseProTable } from '../../components'

export default () => {
  const columns = [
    { title: '项目名称', dataIndex: 'name', valueType: 'text' },
    { title: 'WBS编号', dataIndex: 'wbs', valueType: 'text' },
    { title: '成本类型', dataIndex: 'costType', valueType: 'text' },
    { title: '税率', dataIndex: 'costRate', valueType: 'text' },
    { title: '供方名称', dataIndex: 'providerName', valueType: 'text' },
    { title: '合同编号', dataIndex: 'contractCode', valueType: 'text' },
    { title: '合同名称', dataIndex: 'contractName', valueType: 'text' },
    { title: '合同金额', dataIndex: 'contractMoney', valueType: 'text' },
    { title: '结算金额', dataIndex: 'contractMoney', valueType: 'text' },
    { title: '日期', dataIndex: 'outDate', valueType: 'text' },
    { title: '摘要', dataIndex: 'remark', valueType: 'text' },
    { title: '开票金额', dataIndex: 'money1', valueType: 'text' },
    { title: '付款金额', dataIndex: 'money2', valueType: 'text' },
  ]

  return <BaseProTable path={projectOutPath} columns={columns} search={true}/>
}
