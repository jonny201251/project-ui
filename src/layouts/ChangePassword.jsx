import { FormButtonGroup, FormDialog, FormItem, FormLayout, Password } from '@formily/antd'
import { createSchemaField } from '@formily/react'
import { Button, message, Modal } from 'antd'
import { LoadingButton } from '../components'
import { get, sysUserPath } from '../utils'

const SchemaField = createSchemaField({
  components: { FormLayout, FormItem, Password },
})

export default () => {
  return <a onClick={() => {
    let dialog = FormDialog({ title: '修改密码', footer: null, keyboard: false, maskClosable: false },
      (form) => {
        return <>
          <SchemaField>
            <SchemaField.Void x-component="FormLayout" x-component-props={{ labelCol: 6, wrapperCol: 16 }}>
              <SchemaField.String name="password1" required title="重设密码" x-decorator="FormItem"
                                  x-component="Password"/>
              <SchemaField.String name="password2" required title="确认密码" x-decorator="FormItem"
                                  x-component="Password"/>
            </SchemaField.Void>
          </SchemaField>
          <FormDialog.Footer>
            <FormButtonGroup gutter={16} align={'right'}>
              <Button onClick={() => dialog.close()}>取消</Button>
              <LoadingButton
                onClick={async () => {
                  const values = await form.submit()
                  if (values) {
                    if (values.password1 !== values.password2) {
                      Modal.error({ content: '两次密码不一样', okText: '知道了' })
                      return
                    }
                    const data = await get(sysUserPath.changePassword, values)
                    if (data) {
                      dialog.close()
                      message.success('修改成功')
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
      },
    )
    dialog.open()
  }}>
    修改密码
  </a>
}
