import { contextPath, smallBudgetRunPath } from '../../utils'
import ProTable from '@ant-design/pro-table'
import React, { useRef } from 'react'
import { OperateButtonProcess } from '../../components'
import { FormDialog } from '@formily/antd'

export default (props) => {
  const actionRef = useRef()

  const onClick = (record) => {
    let dialog = FormDialog({
        style: { top: 20 },
        title: '预算表',
        footer: null,
        keyboard: false,
        maskClosable: false,
        width: '98%',
      },
      (form) => {
        if (record.version === 0) {
          return <iframe
            src={contextPath + '/jmreport/view/704922619257352192?budgetId=' + record.id}
            style={{ border: 0, width: '100%', height: document.body.clientHeight - 100 }}
            frameBorder="0"/>
        } else {
          return <iframe
            src={contextPath + '/jmreport/view/758190413062881280?budgetId=' + record.id}
            style={{ border: 0, width: '100%', height: document.body.clientHeight - 100 }}
            frameBorder="0"/>
        }
      },
    )
    dialog.open({})
  }

  const columns = [
    { title: '项目类别', dataIndex: 'projectType', valueType: 'text' },
    {
      title: '项目名称', dataIndex: 'projectName', valueType: 'text',
      render: (text, record, _, action) => {
        return <OperateButtonProcess
          record={record} path={smallBudgetRunPath} actionRef={actionRef} from={'ViewHistory'}/>
      },
    },
    { title: '任务号', dataIndex: 'taskCode', valueType: 'text' },
    { title: '申请人', dataIndex: 'displayName', valueType: 'text' },
    { title: '申请部门', dataIndex: 'deptName', valueType: 'text' },
    { title: '申请时间', dataIndex: 'createDatetime', valueType: 'text' },
    { title: '调整次数', dataIndex: ['processInst', 'businessVersion'], valueType: 'text' },
    {
      title: '操作', dataIndex: 'aa', valueType: 'text',
      render: (text, record, _, action) => {
        return <a onClick={() => {
          onClick(record)
        }}>预算表</a>
      },
    },
  ]

  return <ProTable
    bordered
    rowKey="id"
    actionRef={actionRef}
    columns={columns}
    columnEmptyText={true}
    //列表数据
    pagination={false}
    dataSource={props.record.dataList}
    //
    tableAlertRender={false}
    options={{ density: false }}
    search={false}
  />
}
