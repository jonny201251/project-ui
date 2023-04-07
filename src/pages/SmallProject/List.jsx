import { smallProjectPath } from '../../utils'
import { BaseProTableProcess } from '../../components'

export default () => {
  const columns = [
    { title: '项目名称', dataIndex: 'name', valueType: 'text' },
    { title: '任务号', dataIndex: 'taskCode', valueType: 'text' },
    { title: '客户名称', dataIndex: 'customerName', valueType: 'text' },
    { title: '供方名称', dataIndex: 'providerName', valueType: 'text' },
    { title: '预计签约额', dataIndex: 'expectMoney', valueType: 'text', hideInSearch: true  },
    { title: '预计签约日期', dataIndex: 'expectDate', valueType: 'text', hideInSearch: true  },
    { title: '预计毛利率', dataIndex: 'projectRate', valueType: 'text', hideInSearch: true  },
    { title: '授权号', dataIndex: 'powerCode', valueType: 'text' },
    { title: '项目状态', dataIndex: 'projectStatus', valueType: 'text' },
    { title: '申请人', dataIndex: 'displayName', valueType: 'text' },
    { title: '申请部门', dataIndex: 'deptName', valueType: 'text' },
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

  return <BaseProTableProcess path={smallProjectPath} columns={columns}/>
}
