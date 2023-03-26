import { customerPath } from '../../utils'
import { BaseProTable2 } from '../../components'

export default () => {
  const columns = [
    { title: '客户名称', dataIndex: 'name', valueType: 'text' },
    { title: '客户企业性质', dataIndex: 'property', valueType: 'text' },
    { title: '纳税人识别号', dataIndex: 'code', valueType: 'text' },
    { title: '结论', dataIndex: 'result', valueType: 'text', hideInSearch: true  },
    { title: '创建人', dataIndex: 'displayName', valueType: 'text', hideInSearch: true  },
    { title: '创建部门', dataIndex: 'deptName', valueType: 'text', hideInSearch: true  },
    { title: '创建时间', dataIndex: 'createDatetime', valueType: 'text', hideInSearch: true  },
  ]

  return <BaseProTable2 path={customerPath} columns={columns} search={{ labelWidth: 90 }}/>
}
