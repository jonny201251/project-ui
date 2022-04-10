import React, { useEffect, useState } from 'react'
import { Button, message, Modal, Space } from 'antd'
import { env, get, sysRolePath, sysUserPath } from '../../utils'
import { DeleteOutlined, PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { FormDialog } from '@formily/antd'
import Form from './Form'

export default (props) => {
  const { path, actionRef, selectedRowKeys } = props
  let width = path.width || 520

  const [roleList, setRoleList] = useState()
  const [userList, setUserList] = useState()

  useEffect(async () => {
    const roleList = await get(sysRolePath.all)
    if (roleList) {
      setRoleList(roleList)
    }
    const userList = await get(sysUserPath.all)
    if (userList) {
      setUserList(userList)
    }
  }, [])

  const onClick = async (type) => {
    if (type === 'add') {
      let dialog = FormDialog({ title: '新建流程', footer: null, keyboard: false, maskClosable: false, width },
        (form) => {
          return <Form
            form={form} type={type} dialog={dialog} actionRef={actionRef}
            roleList={roleList} userList={userList}
          />
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
      return (
        <Space>
          <Button
            icon={<PlusOutlined/>}
            type="primary"
            onClick={() => {
              onClick('add')
            }}>
            新建流程
          </Button>
          <Button
            icon={<DeleteOutlined/>}
            type="primary"
            onClick={() => {
              onClick('delete')
            }}
          >
            批量删除
          </Button>
        </Space>
      )
    }
  }

  return <>{renderButton()}</>
};
