import React from 'react'
import { Button, message, Modal, Space } from 'antd'
import { env, get, post } from '../utils'
import { LoadingButton } from '../components'
import { DeleteOutlined, PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { FormButtonGroup, FormDialog } from '@formily/antd'

export default (props) => {
  const { path, actionRef, selectedRowKeys } = props
  let width = path.width || 520

  const onClick = async (type) => {
    if (type === 'add') {
      let dialog = FormDialog({ title: '新增', footer: null, keyboard: false, maskClosable: false, width },
        (form) => {
          return (
            <>
              <path.Form form={form} type={type} dialog={dialog}/>
              <FormDialog.Footer>
                <FormButtonGroup gutter={16} align={'right'}>
                  <Button onClick={() => dialog.close()}>取消</Button>
                  <LoadingButton
                    onClick={async () => {
                      const values = await form.submit()
                      if (values) {
                        const data = await post(path.add, values)
                        if (data) {
                          actionRef.current.clearSelected()
                          actionRef.current.reload()
                          dialog.close()
                          message.success('保存成功')
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
      dialog.open({})
    }
  }

  const renderButton = () => {
    if (env === 'pro') {
      return <Space>
        <Button
          icon={<PlusOutlined/>} type="primary"
          onClick={() => {
            onClick('add')
          }}>
          新增
        </Button>
      </Space>
    }
  }

  return <>{renderButton()}</>
}
