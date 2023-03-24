import { Button, message, Modal, Space } from 'antd'
import { contextPath, get, post } from '../../utils'
import { FormButtonGroup, FormDialog } from '@formily/antd'
import { LoadingButton } from '../../components'
import { QuestionCircleOutlined } from '@ant-design/icons'
import React from 'react'

export default (props) => {
  const { record, path, actionRef, rowKey } = props
  let width = path.width || 520

  const onClick = async (type) => {
    let params = {}
    params[rowKey || 'id'] = record[rowKey || 'id']

    if (type === 'edit') {
      const dbRecord = await get(path.get, params)
      if (dbRecord) {
        let dialog = FormDialog(
          { title: '编辑', footer: null, keyboard: false, maskClosable: false, width },
          (form) => {
            form.setValues(dbRecord)
            return (
              <>
                <path.Form form={form} type={type} record={dbRecord} dialog={dialog}/>
                <FormDialog.Footer>
                  <FormButtonGroup gutter={16} align={'right'}>
                    <Button onClick={() => dialog.close()}>取消</Button>
                    <LoadingButton
                      onClick={async () => {
                        const values = await form.submit()
                        if (values) {
                          values.operateButtonType = type
                          const data = await post(path.edit, values)
                          if (data) {
                            actionRef.current.clearSelected()
                            actionRef.current.reload()
                            dialog.close()
                            message.success('编辑成功')
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
            )
          },
        )
        dialog.open()
      }
    } else if (type === 'preview') {
      const dbRecord = await get(path.get, params)
      if (dbRecord) {
        let dialog = FormDialog({ title: '查看', footer: null, keyboard: false, maskClosable: false, width },
          (form) => {
            form.setValues(dbRecord)
            return <path.Form form={form} type={type} record={dbRecord} dialog={dialog}/>
          },
        )
        dialog.open()
      }
    } else if (type === 'modify') {
      Modal.confirm({
        okText: '确认', cancelText: '取消',
        icon: <QuestionCircleOutlined/>,
        content: <p style={{ fontSize: 16 }}>{'确定要 调整项目预算-' + record.contractName + '?'}</p>,
        onOk: async (close) => {
          const data = await get(path.modify, params)
          if (data) {
            actionRef.current.clearSelected()
            actionRef.current.reload()
            close()
            message.success('调整成功')
          }
        },
      })
    } else if (type === 'report') {
      let dialog = FormDialog({ title: '预算表', footer: null, keyboard: false, maskClosable: false, width: '98%' },
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
  }

  const renderButton = () => {
    return <Space size={'middle'}>
      <a onClick={() => {
        onClick('edit')
      }}>编辑</a>
      <a onClick={() => {
        onClick('preview')
      }}>查看</a>
      <a onClick={() => {
        onClick('modify')
      }}>调整预算</a>
      <a onClick={() => {
        onClick('report')
      }}>预算表</a>
    </Space>
  }

  return <>{renderButton()}</>
};
