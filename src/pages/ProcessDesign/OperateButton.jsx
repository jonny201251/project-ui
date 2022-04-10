import { Space } from 'antd'
import { get, sysRolePath, sysUserPath } from '../../utils'
import { FormDialog } from '@formily/antd'
import Form from './Form'
import React, { useEffect, useState } from 'react'

export default (props) => {
  const { record, path, actionRef, rowKey } = props
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
    let params = {}
    params[rowKey || 'id'] = record[rowKey || 'id']

    if (type === 'edit') {
      const dbRecord = await get(path.get, params)
      if (dbRecord) {
        let dialog = FormDialog(
          { title: '编辑流程', footer: null, keyboard: false, maskClosable: false, width },
          (form) => {
            form.setValues(dbRecord.processDesign)
            return <Form
              form={form} type={type} record={dbRecord} dialog={dialog} actionRef={actionRef}
              roleList={roleList} userList={userList}
            />
          },
        )
        dialog.open()
      }
    }
  }

  const renderButton = () => {
    // if (env === 'dev') {
    return (
      <Space size={'middle'}>
        <a onClick={() => {
          onClick('edit')
        }}>编辑流程</a>
      </Space>
    )
    // }
  }

  return <>{renderButton()}</>
};
