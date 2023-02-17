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
      let dialog2 = FormDialog({ footer: null, keyboard: false, maskClosable: false, width: 900 },
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
                        providerId: values.selectedRow.id,
                        usee: values.selectedRow.usee,
                        name: values.selectedRow.name,
                        property: values.selectedRow.property,
                        address: values.selectedRow.address,
                        registerMoney: values.selectedRow.registerMoney,
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
    <Form form={form} labelWidth={110} className={styles.placeholder}>
      <SchemaField>
        <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 3, strictAutoFit: true }}>
          <SchemaField.String name="displayName" title="创建人" x-component="Input" x-decorator="FormItem"/>
          <SchemaField.String name="deptName" title="创建部门" x-component="Input" x-decorator="FormItem"/>
          <SchemaField.String name="createDatetime" title="创建时间" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String
            name="name" required title="供方名称" x-decorator="FormItem" x-decorator-props={{ gridSpan: 2 }}
            x-component="InputButton" x-component-props={{ onClick: onClick }}/>
          <SchemaField.String name="usee" title="供方用途" x-decorator="FormItem" x-component="Input"/>
        </SchemaField.Void>
        <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 3, strictAutoFit: true }}>
          <SchemaField.String
            name="address" title="注册地址" x-decorator="FormItem" x-component="Input" x-decorator-props={{ gridSpan: 2 }}/>
          <SchemaField.String
            name="address2" title="生产经营地址" x-decorator="FormItem" x-component="Input"
            x-decorator-props={{ gridSpan: 2 }}/>
        </SchemaField.Void>
        <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 3, strictAutoFit: true }}>
          <SchemaField.String name="telephone" title="电话及区号" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="code" title="邮政编码" x-decorator="FormItem" x-component="Input"/>
        </SchemaField.Void>
        <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 3, strictAutoFit: true }}>
          <SchemaField.String name="economy" title="经济性质" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="registerMoney" title="注册资本" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.Array
            name="list" title={'供方人员'} required x-decorator="FormItem" x-component="ArrayTable"
            x-decorator-props={{ gridSpan: 3 }}
            x-component-props={{ size: 'small', sticky: true }}
          >
            <SchemaField.Object>
              <SchemaField.Void
                x-component="ArrayTable.Column" x-component-props={{ width: 180, title: '类型', align: 'center' }}>
                <SchemaField.String
                  name="type" required x-decorator="FormItem" x-component="Select"
                  enum={[
                    { label: '法定代表人', value: '法定代表人' },
                    { label: '单位负责人', value: '单位负责人' },
                    { label: '技术负责人', value: '技术负责人' },
                  ]}
                />
              </SchemaField.Void>
              <SchemaField.Void x-component="ArrayTable.Column" x-component-props={{ title: '姓名', align: 'center' }}>
                <SchemaField.String name="name" required x-decorator="FormItem" x-component="Input"/>
              </SchemaField.Void>
              <SchemaField.Void x-component="ArrayTable.Column"
                                x-component-props={{ width: 150, title: '学历', align: 'center' }}>
                <SchemaField.String
                  name="education" required x-decorator="FormItem" x-component="Select"
                  enum={[
                    { label: '专科', value: '专科' },
                    { label: '本科', value: '本科' },
                    { label: '研究生', value: '研究生' },
                    { label: '博士', value: '博士' },
                    { label: '博士后', value: '博士后' },
                  ]}
                />
              </SchemaField.Void>
              <SchemaField.Void x-component="ArrayTable.Column" x-component-props={{ title: '职务', align: 'center' }}>
                <SchemaField.String name="job" required x-decorator="FormItem" x-component="Input"/>
              </SchemaField.Void>
              <SchemaField.Void x-component="ArrayTable.Column"
                                x-component-props={{ width: 80, title: '操作', dataIndex: 'operations' }}>
                <SchemaField.Void x-component="FormItem">
                  <SchemaField.Void x-component="ArrayTableRemove"/>
                </SchemaField.Void>
              </SchemaField.Void>
            </SchemaField.Object>
            <SchemaField.Void x-component="ArrayTableAddition" x-component-props={{ width: 80 }}/>
          </SchemaField.Array>
        </SchemaField.Void>
        <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 3, strictAutoFit: true }}>
          <SchemaField.Number name="workCount" title="职工总数" x-decorator="FormItem" x-component="NumberPicker"/>
          <SchemaField.Number name="highCount" title="高工人数" x-decorator="FormItem" x-component="NumberPicker"/>
        </SchemaField.Void>
        <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 3, strictAutoFit: true }}>
          <SchemaField.Number name="techCount" title="技术人数" x-decorator="FormItem" x-component="NumberPicker"/>
          <SchemaField.Number name="helpCount" title="助工人数" x-decorator="FormItem" x-component="NumberPicker"/>
        </SchemaField.Void>
        <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 3, strictAutoFit: true }}>
          <SchemaField.Number name="device1" title="机械设备总台(件)数" x-decorator="FormItem" x-component="NumberPicker"/>
          <SchemaField.Number name="device2" title="检验仪器(表)总台(件)数" x-decorator="FormItem" x-component="NumberPicker"/>
          <SchemaField.String
            name="descc" title="相关企业资质情况" x-decorator="FormItem" x-component="Input.TextArea"
            x-component-props={{ rows: 2 }} x-decorator-props={{ gridSpan: 2 }}/>
          <SchemaField.String
            name="scope" title="主要经营范围" x-decorator="FormItem" x-component="Input.TextArea"
            x-component-props={{ rows: 2 }} x-decorator-props={{ gridSpan: 2 }}/>
          <SchemaField.String name="fileList" title="附件" x-decorator="FormItem" x-component="File"
                              x-decorator-props={{ gridSpan: 2 }}/>
        </SchemaField.Void>
      </SchemaField>
    </Form>
  </ConfigProvider>
}

