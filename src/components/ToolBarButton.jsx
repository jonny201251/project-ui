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
                        console.log(values)
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
    } else if (type === 'delete') {
      if (selectedRowKeys.length === 0) {
        message.error('至少选择一条数据')
        return
      }
      Modal.error({
        okText: '确定', closable: true,
        icon: <QuestionCircleOutlined/>,
        content: <p style={{ fontSize: 16 }}>确定要删除{selectedRowKeys.length}条数据</p>,
        onOk: async (close) => {
          const data = await get(path.delete, { arr: selectedRowKeys })
          if (data) {
            actionRef.current.clearSelected()
            actionRef.current.reload()
            close()
            message.success('删除成功')
          }
        },
      })
    }
  }

  const renderButton = () => {
    if (env === 'dev') {
      return <Space>
        <Button
          icon={<PlusOutlined/>} type="primary"
          onClick={() => {
            onClick('add')
          }}>
          新增
        </Button>
        <Button
          icon={<DeleteOutlined/>} type="primary"
          onClick={() => {
            onClick('delete')
          }}
        >
          批量删除
        </Button>
      </Space>
    }
  }

  return <>{renderButton()}</>
};
