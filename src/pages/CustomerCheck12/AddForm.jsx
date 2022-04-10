import {
  ArrayTable,
  Checkbox,
  DatePicker,
  Form,
  FormButtonGroup,
  FormDialog,
  FormGrid,
  FormItem,
  FormLayout,
  Input,
  PreviewText,
  Radio,
  Select,
} from '@formily/antd'
import { createSchemaField } from '@formily/react'
import React, { useEffect } from 'react'
import zhCN from 'antd/lib/locale/zh_CN'
import { Button, Card, ConfigProvider, message } from 'antd'
import { ArrayTableIndex, InputButton, LoadingButton, NumberPicker } from '../../components'
import { session } from '../../utils'
import DialogList from './DialogList'


const MyCard = (props) => {
  return <Card size={'small'} title={props.title}
               bodyStyle={{ paddingBottom: 0, paddingLeft: 0, paddingRight: 50 }}
               style={{ marginBottom: 10 }}>{props.children}</Card>
}

const SchemaField = createSchemaField({
  components: {
    FormItem, FormLayout, Input, PreviewText, Select, NumberPicker, ArrayTableIndex,
    ArrayTable, FormGrid, DatePicker, InputButton, Radio, Checkbox, MyCard,
  },
})

export default (props) => {
  let { form, type } = props

  useEffect(async () => {
    form.query('*(displayName,deptName,createDatetime,customerProperty,startScore,startResult,endScore,endResult)').forEach(field => {
      field.setPattern('disabled')
    })
    if (type === 'add') {
      const user = session.getItem('user')
      form.setInitialValues({
        createDatetime: new Date().Format('yyyy-MM-dd hh:mm:ss'),
        displayName: user.displayName, loginName: user.loginName,
        deptId: user.deptId, deptName: user.deptName,
      })
    }
  }, [])

  const onClick = () => {
    let dialog2 = FormDialog({ footer: null, keyboard: false, maskClosable: false, width: 700 },
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
                      customerId: values.selectedRow.id,
                      customerName: values.selectedRow.name,
                      customerProperty: values.selectedRow.property,
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

  return <ConfigProvider locale={zhCN}>
    <Form form={form} labelWrap={true} labelWidth={110} >
      <SchemaField>
        <SchemaField.Void x-component="MyCard" x-component-props={{ title: '申请人信息' }}>
          <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 3, strictAutoFit: true }}>
            <SchemaField.String name="displayName" title="申请人" x-decorator="FormItem" x-component="Input"/>
            <SchemaField.String name="deptName" title="申请部门" x-component="Input" x-decorator="FormItem"/>
            <SchemaField.String name="createDatetime" title="申请时间" x-decorator="FormItem" x-component="Input"/>
          </SchemaField.Void>
        </SchemaField.Void>
        <SchemaField.Void x-component="MyCard" x-component-props={{ title: '客户信息' }}>
          <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 2, strictAutoFit: true }}>
            <SchemaField.String
              name="customerName" title="客户名称" x-component="InputButton" x-decorator="FormItem"
              x-component-props={{ onClick: onClick }}
            />
            <SchemaField.String name="customerProperty" title="客户企业性质" x-component="Input" x-decorator="FormItem"/>
            <SchemaField.Number name="startScore" title="初评得分" x-decorator="FormItem" x-component="NumberPicker"/>
            <SchemaField.Number name="startResult" title="初评等级" x-decorator="FormItem" x-component="Input"/>
            <SchemaField.Number name="endScore" title="部门得分" x-decorator="FormItem" x-component="NumberPicker"/>
            <SchemaField.Number name="endResult" title="部门等级" x-decorator="FormItem" x-component="Input"/>
            <SchemaField.String name="desc1" required title="客户主营业务" x-component="Input" x-decorator="FormItem"/>
            <SchemaField.String
              name="desc2Tmp" required title="合作业务类型" x-component="Checkbox.Group"
              x-decorator="FormItem"
              enum={[
                { label: '工程类', value: '工程类' },
                { label: '购销类', value: '购销类' },
                { label: '服务类', value: '服务类' },
                { label: '其他类', value: '其他类' },
              ]}
            />
            <SchemaField.String
              name="desc3" required title="是否首次合作" x-component="Radio.Group" x-decorator="FormItem"
              enum={[
                { label: '是', value: '是' },
                { label: '否', value: '否' },
              ]}
            />
            <SchemaField.String
              name="desc4" title="其他情况" x-decorator="FormItem"
              x-component="Input.TextArea" x-component-props={{ rows: 2 }}
            />
          </SchemaField.Void>
        </SchemaField.Void>
      </SchemaField>
    </Form>
  </ConfigProvider>
}

