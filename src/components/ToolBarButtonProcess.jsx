import React from 'react'
import { Button, message, Modal, Space } from 'antd'
import { env, get, post, processDesignPath } from '../utils'
import { LoadingButton } from '../components'
import { PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { FormButtonGroup, FormDialog } from '@formily/antd'

export default (props) => {
  const { path, actionRef, selectedRowKeys } = props
  let width = path.width || 520

  const renderBtn = (buttonList, dialog, form, type) => {
    let btnArr = []
    buttonList.forEach(buttonName => {
      btnArr.push(
        <LoadingButton
          onClick={async () => {
            const formValue = await form.submit()
            if (formValue) {
              console.log(formValue)
              let values = { formValue: formValue, buttonName: buttonName, type: type, path: path.flag }
              const data = await post(path.btnHandle, values)
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
          {buttonName.replace(/\w+_/i, '')}
        </LoadingButton>,
      )
    })
    return btnArr
  }

  const onClick = async (type) => {
    if (type === 'add') {
      const processFormBefore = await post(processDesignPath.getProcessFormBefore, { path: path.flag, type: type })
      if (processFormBefore) {
        let dialog = FormDialog({ title: '新增', footer: null, keyboard: false, maskClosable: false, width },
          (form) => {
            return <>
              <path.AddForm form={form} type={type} dialog={dialog}/>
              <FormDialog.Footer>
                <FormButtonGroup gutter={16} align={'center'}>
                  {renderBtn(processFormBefore.buttonList, dialog, form, type)}
                </FormButtonGroup>
              </FormDialog.Footer>
            </>
          },
        )
        dialog.open({})
      }
    } else if (type === 'delete') {
      if (selectedRowKeys.length === 0) {
        message.error('至少选择一条数据')
        return
      }
      Modal.confirm({
        okText: '确定', cancelText: '取消',
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
    if (env === 'pro') {
      return <Space>
        <Button icon={<PlusOutlined/>} type="primary" onClick={() => onClick('add')}>新增</Button>
      </Space>
    }
  }

  return <>{renderButton()}</>
};
