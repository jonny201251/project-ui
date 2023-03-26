import { customerScore1Path } from '../../utils'
import { BaseProTableProcess } from '../../components'

export default () => {
  const columns = [
    { title: '客户名称', dataIndex: 'customerName', valueType: 'text' },
    { title: '初评得分', dataIndex: 'startScore', valueType: 'text', hideInSearch: true  },
    { title: '初评等级', dataIndex: 'startResult', valueType: 'text', hideInSearch: true  },
    { title: '部门打分', dataIndex: 'endScore', valueType: 'text', hideInSearch: true  },
    { title: '部门等级', dataIndex: 'endResult', valueType: 'text', hideInSearch: true  },
    { title: '结论', dataIndex: 'result', valueType: 'text' },
    { title: '申请人', dataIndex: 'displayName', valueType: 'text', hideInSearch: true  },
    { title: '申请部门', dataIndex: 'deptName', valueType: 'text', hideInSearch: true  },
    { title: '申请时间', dataIndex: 'createDatetime', valueType: 'text', hideInSearch: true  },
    {
      title: '流程状态', valueType: 'text',
      renderText: (text, record) => (record.processInst ? record.processInst.processStatus : '草稿'),
      valueEnum: {
        草稿: { text: '草稿', status: 'Default' },
        审批中: { text: '审批中', status: 'Processing' },
        完成: { text: '完成', status: 'Success' },
        退回: { text: '退回', status: 'Error' },
        退回申请人: { text: '退回申请人', status: 'Error' },
        申请人撤回: { text: '申请人撤回', status: 'Error' },
      }, hideInSearch: true
},
    { title: '当前步骤', dataIndex: ['processInst', 'displayProcessStep'], valueType: 'text', hideInSearch: true  },
  ]

  return <BaseProTableProcess path={customerScore1Path} columns={columns}/>
}
