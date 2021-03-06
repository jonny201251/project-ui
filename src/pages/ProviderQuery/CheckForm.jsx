import { DatePicker, Form, FormButtonGroup, FormDialog, FormGrid, FormItem, FormLayout, Input } from '@formily/antd'
import { createSchemaField } from '@formily/react'
import React, { useEffect } from 'react'
import { Button, ConfigProvider, message, Tabs } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { session } from '../../utils'
import zhCN from 'antd/lib/locale/zh_CN'
import styles from '../table-placeholder.less'
import DialogList from './DialogList'
import { File, LoadingButton } from '../../components'
import ProcessDesignGraph from '../ProcessDesignGraph'
import ProcessInstNodeList from '../ProcessInstNode/List'

const InputButton = (props) => {
  return <div style={{ display: 'inline-flex', width: '100%' }}>
    <Input {...props} style={{ ...props.style }} disabled/>
    <Button onClick={(e) => {
      if (props.onClick) {
        props.onClick('open')
      }
    }} icon={<SearchOutlined/>} type={'primary'}/>
  </div>
}

const SchemaField = createSchemaField({
  components: {
    FormLayout, FormItem, FormGrid, Input, InputButton,
    DatePicker, File,
  },
})

export default (props) => {
  let { form, type, record } = props

  useEffect(async () => {
    form.query('*(displayName,deptName,createDatetime,name,usee)').forEach(field => {
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
  }, [])

  const onClick = (flag) => {
    if (flag === 'open') {
      let dialog2 = FormDialog({ footer: null, keyboard: false, maskClosable: false, width: 800 },
        (form2) => {
          return <>
            <DialogList form={form2} dialog={dialog2} selectedId={form.values.customerId}/>
            <FormDialog.Footer>
              <FormButtonGroup gutter={16} align={'right'}>
                <Button onClick={() => dialog2.close()}>??????</Button>
                <LoadingButton
                  onClick={async () => {
                    const values = await form2.submit()
                    if (values.selectedRow) {
                      form.setValues({
                        providerId: values.selectedRow.id,
                        usee: values.selectedRow.usee,
                        name: values.selectedRow.name,
                        property: values.selectedRow.property,
                        address: values.selectedRow.address,
                        registerMoney: values.selectedRow.registerMoney,
                      })
                      dialog2.close()
                    } else {
                      message.error('??????????????????')
                    }
                  }}
                  type={'primary'}
                >
                  ??????
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
    <Tabs animated={false} size={'small'}>
      <Tabs.TabPane tab="????????????" key="1">
        <Form form={form} labelWidth={110} className={styles.placeholder}>
          <SchemaField>
            <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 3, strictAutoFit: true }}>
              <SchemaField.String name="displayName" title="?????????" x-component="Input" x-decorator="FormItem"/>
              <SchemaField.String name="deptName" title="????????????" x-component="Input" x-decorator="FormItem"/>
              <SchemaField.String name="createDatetime" title="????????????" x-decorator="FormItem" x-component="Input"/>
              <SchemaField.String
                name="name" required title="????????????" x-decorator="FormItem" x-decorator-props={{ gridSpan: 2 }}
                x-component="InputButton" x-component-props={{ onClick: onClick }}/>
              <SchemaField.String name="queryDate" required title="????????????" x-decorator="FormItem"
                                  x-component="DatePicker"/>
              <SchemaField.String
                name="scale" title="????????????" x-decorator="FormItem" x-component="Input.TextArea"
                x-component-props={{
                  rows: 3,
                  placeholder: '????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????',
                }}
                x-decorator-props={{ gridSpan: 3 }}/>
              <SchemaField.String
                name="achievement" title="??????????????????" x-decorator="FormItem" x-component="Input.TextArea"
                x-component-props={{ rows: 2, placeholder: '?????????????????????????????????????????????' }}
                x-decorator-props={{ gridSpan: 3 }}/>
              <SchemaField.String
                name="quality" title="??????????????????" x-decorator="FormItem" x-component="Input.TextArea"
                x-component-props={{ rows: 2, placeholder: '?????????????????????????????????????????????' }}
                x-decorator-props={{ gridSpan: 3 }}/>
              <SchemaField.String
                name="product" title="??????????????????" x-decorator="FormItem" x-component="Input.TextArea"
                x-component-props={{ rows: 2, placeholder: '?????????????????????????????????????????????' }}
                x-decorator-props={{ gridSpan: 3 }}/>
              <SchemaField.String
                name="descc" title="??????????????????" x-decorator="FormItem" x-component="Input.TextArea"
                x-component-props={{ rows: 2, placeholder: '?????????????????????' }}
                x-decorator-props={{ gridSpan: 3 }}/>
              <SchemaField.String
                name="service" title="????????????" x-decorator="FormItem" x-component="Input.TextArea"
                x-component-props={{ rows: 2, placeholder: '??????????????????????????????????????????' }}
                x-decorator-props={{ gridSpan: 3 }}/>
              <SchemaField.String
                name="fileList" title="??????" x-decorator="FormItem"
                x-component="File" x-decorator-props={{ gridSpan: 2 }}/>
            </SchemaField.Void>
          </SchemaField>
        </Form>
      </Tabs.TabPane>
      <Tabs.TabPane tab="?????????" key="2">
        <ProcessDesignGraph processInstId={record.processInstId}/>
      </Tabs.TabPane>
      <Tabs.TabPane tab="????????????" key="3">
        <ProcessInstNodeList processInstId={record.processInstId}/>
      </Tabs.TabPane>
    </Tabs>
  </ConfigProvider>
}

