import { Button, message, Modal, Space } from 'antd'
import { get, post } from '../utils'
import { FormButtonGroup, FormDialog } from '@formily/antd'
import { LoadingButton } from './index'
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
        let dialog = FormDialog({ title: '浏览', footer: null, keyboard: false, maskClosable: false, width },
          (form) => {
            form.setValues(dbRecord)
            return <path.Form form={form} type={type} record={dbRecord} dialog={dialog}/>
          },
        )
        dialog.open()
      }
    } else if (type === 'copy') {
      Modal.confirm({
        okText: '确认', cancelText: '取消',
        icon: <QuestionCircleOutlined/>,
        content: <p style={{ fontSize: 16 }}>确定要复制该条数据?</p>,
        onOk: async (close) => {
          const data = await get(path.copy, params)
          if (data) {
            actionRef.current.clearSelected()
            actionRef.current.reload()
            close()
            message.success('复制成功')
          }
        },
      })
    }
  }

  const renderButton = () => {
    // if (env === 'dev') {
    return <Space size={'middle'}>
      <a onClick={() => {
        onClick('edit')
      }}>编辑</a>
      <a onClick={() => {
        onClick('preview')
      }}>浏览</a>
    </Space>
    // }
  }

  return <>{renderButton()}</>
};
