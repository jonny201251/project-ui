import { inOutContractPath, post, proTableRequest } from '../../utils'
import ProTable from '@ant-design/pro-table'
import React, { useRef } from 'react'
import { FormButtonGroup, FormDialog } from '@formily/antd'
import InForm from './InForm'
import OutForm from './OutForm'
import { Button, message } from 'antd'
import { LoadingButton } from '../../components'

export default () => {
  const actionRef = useRef()

  const render = (record) => {
    return <a onClick={async () => {
      let dialog = FormDialog({ title: '合同号和WBS号', footer: null, keyboard: false, maskClosable: false, width: 900 },
        (form) => {
          form.setValues(record)
          if (record.contractType === '收款合同') {
            return <>
              <InForm form={form} dialog={dialog} record={record}/>
              <FormDialog.Footer>
                <FormButtonGroup gutter={16} align={'right'}>
                  <Button onClick={() => dialog.close()}>取消</Button>
                  <LoadingButton
                    onClick={async () => {
                      const values = await form.submit()
                      if (values) {
                        const data = await post(inOutContractPath.add, values)
                        if (data) {
                          actionRef.current.clearSelected()
                          actionRef.current.reload()
                          dialog.close()
                          message.success('操作成功')
                        }
                      }
                    }}
                    type={'primary'}
                  >
                    确定
                  </LoadingButton>
                </FormButtonGroup>
              </FormDialog.Footer>
            </>
          } else {
            return <>
              <OutForm form={form} dialog={dialog} record={record}/>
              <FormDialog.Footer>
                <FormButtonGroup gutter={16} align={'right'}>
                  <Button onClick={() => dialog.close()}>取消</Button>
                  <LoadingButton
                    onClick={async () => {
                      const values = await form.submit()
                      if (values) {
                        const data = await post(inOutContractPath.add, values)
                        if (data) {
                          actionRef.current.clearSelected()
                          actionRef.current.reload()
                          dialog.close()
                          message.success('操作成功')
                        }
                      }
                    }}
                    type={'primary'}
                  >
                    确定
                  </LoadingButton>
                </FormButtonGroup>
              </FormDialog.Footer>
            </>
          }
        },
      )
      dialog.open({})
    }}>{record.name}</a>
  }

  const columns = [
    { title: '项目名称', dataIndex: 'name', valueType: 'text', render: (text, record) => render(record) },
    { title: '任务号', dataIndex: 'taskCode', valueType: 'text' },
    { title: 'WBS编号', dataIndex: 'wbs', valueType: 'text' },
    { title: '成本类型', dataIndex: 'costType', valueType: 'text', hideInSearch: true },
    { title: '合同类型', dataIndex: 'contractType', valueType: 'text' , hideInSearch: true},
    { title: '合同编号', dataIndex: 'contractCode', valueType: 'text' },
    { title: '合同名称', dataIndex: 'contractName', valueType: 'text' },
    { title: '合同金额', dataIndex: 'contractMoney', valueType: 'text', hideInSearch: true },
    { title: '创建人', dataIndex: 'displayName', valueType: 'text' },
    { title: '创建部门', dataIndex: 'deptName', valueType: 'text' },
    { title: '创建时间', dataIndex: 'createDatetime', valueType: 'text', hideInSearch: true },
  ]

  return <ProTable
    headerTitle="补全-收付款合同号和WBS编号"
    bordered
    rowKey="idd"
    actionRef={actionRef}
    columns={columns}
    columnEmptyText={true}
    //列表数据
    params={{ list: inOutContractPath.list }}
    request={proTableRequest}
    //
    options={{ density: false }}
    search={true}
  />
}
