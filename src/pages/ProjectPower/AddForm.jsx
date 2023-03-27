import {
  DatePicker,
  Form,
  FormButtonGroup,
  FormDialog,
  FormGrid,
  FormItem,
  FormLayout,
  Input,
  Radio,
  Select,
} from '@formily/antd'
import { createSchemaField } from '@formily/react'
import React, { useEffect } from 'react'
import zhCN from 'antd/lib/locale/zh_CN'
import { Button, ConfigProvider, message } from 'antd'
import { session } from '../../utils'
import DialogList from './DialogList'
import { LoadingButton } from '../../components'
import { SearchOutlined } from '@ant-design/icons'

const InputButton = (props) => {
  return <div style={{ display: 'inline-flex', width: '100%' }}>
    <Input {...props} style={{ ...props.style }}/>
    <Button onClick={(e) => {
      if (props.onClick) {
        props.onClick('open')
      }
    }} icon={<SearchOutlined/>} type={'primary'}/>
  </div>
}

const SchemaField = createSchemaField({
  components: {
    FormItem, FormLayout, Input, DatePicker, Radio, FormGrid, Select, InputButton,
  },
})


export default (props) => {
  let { form, type } = props

  useEffect(async () => {
    form.query('*(displayName,deptName,createDatetime)').forEach(field => {
      field.setPattern('disabled')
    })
    if (type === 'add') {
      const user = session.getItem('user')
      form.setInitialValues({
        createDatetime: new Date().Format('yyyy-MM-dd hh:mm:ss'),
        displayName: user.displayName, displayNamee: user.displayName, loginName: user.loginName,
        deptId: user.deptId, deptName: user.deptName,
      })
    }
    if(type==='add' || type==='edit'){
      form.query('code').take().setDisplay('hidden')
    }
  }, [])

  const onClick = (flag) => {
    if (flag === 'open') {
      let dialog2 = FormDialog({ footer: null, keyboard: false, maskClosable: false, width: 800 },
        (form2) => {
          return <>
            <DialogList form={form2} dialog={dialog2} selectedId={form.values.customerId}/>
            <FormDialog.Footer>
              <FormButtonGroup gutter={16} align={'right'}>
                <Button onClick={() => dialog2.close()}>取消</Button>
                <LoadingButton
                  onClick={async () => {
                    const values = await form2.submit()
                    if (values.selectedRow) {
                      form.setValues({
                        projectId: values.selectedRow.id,
                        projectName: values.selectedRow.name,
                        ProjectProperty: values.selectedRow.property,
                      })
                      dialog2.close()
                    } else {
                      message.error('选择一条数据')
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
      dialog2.open({})
    }
  }

  return <ConfigProvider locale={zhCN}>
    <Form form={form} labelWidth={130}>
      <SchemaField>
        <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 3, strictAutoFit: true }}>
          <SchemaField.String name="displayName" title="申请人" x-component="Input" x-decorator="FormItem"/>
          <SchemaField.String name="deptName" title="申请部门" x-component="Input" x-decorator="FormItem"/>
          <SchemaField.String name="createDatetime" title="申请时间" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String
            name="projectName" required title="被授权项目" x-decorator="FormItem"
            x-component="InputButton" x-component-props={{ onClick: onClick }} x-decorator-props={{ gridSpan: 2 }}/>
          <SchemaField.String
            name="displayNamee" required title="被授权人" x-decorator="FormItem"
            x-component="Select" x-component-props={{ showSearch: true }}
            enum={session.getItem('userList')}/>
          <SchemaField.String
            name="descc" required title="授权事项及权限" x-component="Input.TextArea"
            x-component-props={{ rows: 2 }} x-decorator="FormItem" x-decorator-props={{ gridSpan: 2 }}/>
          <SchemaField.String
            name="timeLimitTmp" required title="申请期限"
            x-component="DatePicker.RangePicker"
            // x-component-props={{ format: 'YYYY年MM月DD日' }}
            x-decorator="FormItem" x-decorator-props={{ tooltip: '双击鼠标进行选择', gridSpan: 2 }}
          />
          <SchemaField.String name="code" required title="授权号" x-component="Input" x-decorator="FormItem"/>
        </SchemaField.Void>
      </SchemaField>
    </Form>
  </ConfigProvider>
}

