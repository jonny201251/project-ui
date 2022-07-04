import React from 'react'
import { createSchemaField } from '@formily/react'
import { Form, FormItem, Input, Password, Submit } from '@formily/antd'
import { createForm } from '@formily/core'
import * as ICONS from '@ant-design/icons'
import './login.less'
import { post,get,preloadPath, sysUserPath, session } from '../../utils'
import { history, useModel } from 'umi'

const SchemaField = createSchemaField({
  components: { FormItem, Input, Password },
  scope: {
    icon(name) {
      return React.createElement(ICONS[name])
    },
  },
})
const form = createForm()

export default () => {
  const { setTabPanes, setActiveKey } = useModel('useTabPanes')

  return (
    <div className={'bg'}>
      <div className={'container'}>
        <div className={'title'}>项目管理系统</div>
        <Form
          form={form}
          layout="vertical"
          size="large"
          onAutoSubmit={async (values) => {
            const data = await post(sysUserPath.login, values)
            const data2 = await get(preloadPath.get)
            if (data && data2) {
              session.setItem('user', data)
              Object.keys(data2).forEach(key => session.setItem(key, data2[key]))
              form.reset()
              setTabPanes([])
              setActiveKey('我的桌面')
              history.push('/back')
            }
          }}
        >
          <SchemaField>
            <SchemaField.String
              name="loginName"
              title="用户名"
              required
              x-decorator="FormItem"
              x-component="Input"
              x-validator={{
                required: true,
              }}
              x-component-props={{
                placeholder: '中文姓名',
                prefix: '{{icon(\'UserOutlined\')}}',
              }}
            />
            <SchemaField.String
              name="password"
              title="密码"
              required
              x-decorator="FormItem"
              x-component="Password"
              x-component-props={{
                prefix: '{{icon(\'LockOutlined\')}}',
              }}
            />
          </SchemaField>
          <Submit block size="large">
            登录
          </Submit>
        </Form>
      </div>
    </div>
  )
}
