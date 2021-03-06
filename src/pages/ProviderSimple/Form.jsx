import {
  ArrayTable,
  Form,
  FormButtonGroup,
  FormDialog,
  FormGrid,
  FormItem,
  FormLayout,
  Input,
  Select,
} from '@formily/antd'
import { createSchemaField } from '@formily/react'
import React, { useEffect } from 'react'
import { Button, ConfigProvider, message } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { session } from '../../utils'
import zhCN from 'antd/lib/locale/zh_CN'
import styles from '../table-placeholder.less'
import DialogList from './DialogList'
import {
  ArrayTableAddition,
  ArrayTableIndex,
  ArrayTableRemove,
  LoadingButton,
  NumberPicker,
  File,
} from '../../components'

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
    FormLayout, FormItem, FormGrid, Input, InputButton, Select, NumberPicker,
    ArrayTable, ArrayTableIndex, ArrayTableRemove, ArrayTableAddition, File,
  },
})

export default (props) => {
  let { form, type } = props

  useEffect(async () => {
    form.query('*(displayName,deptName,createDatetime,name,usee,address,registerMoney)').forEach(field => {
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
    <Form form={form} labelWidth={110} className={styles.placeholder}>
      <SchemaField>
        <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 3, strictAutoFit: true }}>
          <SchemaField.String name="displayName" title="?????????" x-component="Input" x-decorator="FormItem"/>
          <SchemaField.String name="deptName" title="????????????" x-component="Input" x-decorator="FormItem"/>
          <SchemaField.String name="createDatetime" title="????????????" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String
            name="name" required title="????????????" x-decorator="FormItem" x-decorator-props={{ gridSpan: 2 }}
            x-component="InputButton" x-component-props={{ onClick: onClick }}/>
          <SchemaField.String name="usee" title="????????????" x-decorator="FormItem" x-component="Input"/>
        </SchemaField.Void>
        <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 3, strictAutoFit: true }}>
          <SchemaField.String
            name="address" title="????????????" x-decorator="FormItem" x-component="Input" x-decorator-props={{ gridSpan: 2 }}/>
          <SchemaField.String
            name="address2" title="??????????????????" x-decorator="FormItem" x-component="Input"
            x-decorator-props={{ gridSpan: 2 }}/>
        </SchemaField.Void>
        <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 3, strictAutoFit: true }}>
          <SchemaField.String name="telephone" title="???????????????" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="code" title="????????????" x-decorator="FormItem" x-component="Input"/>
        </SchemaField.Void>
        <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 3, strictAutoFit: true }}>
          <SchemaField.String name="economy" title="????????????" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="registerMoney" title="????????????" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.Array
            name="list" title={'????????????'} required x-decorator="FormItem" x-component="ArrayTable"
            x-decorator-props={{ gridSpan: 3 }}
            x-component-props={{ size: 'small', sticky: true }}
          >
            <SchemaField.Object>
              <SchemaField.Void
                x-component="ArrayTable.Column" x-component-props={{ width: 180, title: '??????', align: 'center' }}>
                <SchemaField.String
                  name="type" required x-decorator="FormItem" x-component="Select"
                  enum={[
                    { label: '???????????????', value: '???????????????' },
                    { label: '???????????????', value: '???????????????' },
                    { label: '???????????????', value: '???????????????' },
                  ]}
                />
              </SchemaField.Void>
              <SchemaField.Void x-component="ArrayTable.Column" x-component-props={{ title: '??????', align: 'center' }}>
                <SchemaField.String name="name" required x-decorator="FormItem" x-component="Input"/>
              </SchemaField.Void>
              <SchemaField.Void x-component="ArrayTable.Column"
                                x-component-props={{ width: 150, title: '??????', align: 'center' }}>
                <SchemaField.String
                  name="education" required x-decorator="FormItem" x-component="Select"
                  enum={[
                    { label: '??????', value: '??????' },
                    { label: '??????', value: '??????' },
                    { label: '?????????', value: '?????????' },
                    { label: '??????', value: '??????' },
                    { label: '?????????', value: '?????????' },
                  ]}
                />
              </SchemaField.Void>
              <SchemaField.Void x-component="ArrayTable.Column" x-component-props={{ title: '??????', align: 'center' }}>
                <SchemaField.String name="job" required x-decorator="FormItem" x-component="Input"/>
              </SchemaField.Void>
              <SchemaField.Void x-component="ArrayTable.Column"
                                x-component-props={{ width: 80, title: '??????', dataIndex: 'operations' }}>
                <SchemaField.Void x-component="FormItem">
                  <SchemaField.Void x-component="ArrayTableRemove"/>
                </SchemaField.Void>
              </SchemaField.Void>
            </SchemaField.Object>
            <SchemaField.Void x-component="ArrayTableAddition" x-component-props={{ width: 80 }}/>
          </SchemaField.Array>
        </SchemaField.Void>
        <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 3, strictAutoFit: true }}>
          <SchemaField.Number name="workCount" title="????????????" x-decorator="FormItem" x-component="NumberPicker"/>
          <SchemaField.Number name="highCount" title="????????????" x-decorator="FormItem" x-component="NumberPicker"/>
        </SchemaField.Void>
        <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 3, strictAutoFit: true }}>
          <SchemaField.Number name="techCount" title="????????????" x-decorator="FormItem" x-component="NumberPicker"/>
          <SchemaField.Number name="helpCount" title="????????????" x-decorator="FormItem" x-component="NumberPicker"/>
        </SchemaField.Void>
        <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 3, strictAutoFit: true }}>
          <SchemaField.Number name="device1" title="??????????????????(???)???" x-decorator="FormItem" x-component="NumberPicker"/>
          <SchemaField.Number name="device2" title="????????????(???)??????(???)???" x-decorator="FormItem" x-component="NumberPicker"/>
          <SchemaField.String
            name="descc" title="????????????????????????" x-decorator="FormItem" x-component="Input.TextArea"
            x-component-props={{ rows: 2 }} x-decorator-props={{ gridSpan: 2 }}/>
          <SchemaField.String
            name="scope" title="??????????????????" x-decorator="FormItem" x-component="Input.TextArea"
            x-component-props={{ rows: 2 }} x-decorator-props={{ gridSpan: 2 }}/>
          <SchemaField.String name="fileList" title="??????" x-decorator="FormItem" x-component="File"
                              x-decorator-props={{ gridSpan: 2 }}/>
        </SchemaField.Void>
      </SchemaField>
    </Form>
  </ConfigProvider>
}

