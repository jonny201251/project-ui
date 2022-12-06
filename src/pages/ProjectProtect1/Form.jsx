import {
  ArrayTable,
  DatePicker,
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
import {
  ArrayTableAddition,
  ArrayTableIndex,
  ArrayTableRemove,
  InputButton,
  LoadingButton,
  NumberPicker,
} from '../../components'
import { session } from '../../utils'
import DialogList from './DialogList'
import styles from '../table-placeholder.less'
import { Button, ConfigProvider, message } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import React, { useEffect } from 'react'

const SchemaField = createSchemaField({
  components: {
    FormLayout, FormItem, Input, FormGrid,
    ArrayTable, ArrayTableAddition, ArrayTableIndex, ArrayTableRemove,
    LoadingButton, InputButton, NumberPicker, Select, DatePicker,
  },
})

export default (props) => {
  let { form, type } = props

  useEffect(async () => {
    form.query('*(displayName,deptName,createDatetime,taskCode,property,protectRate,invoiceRate,totalCost,endMoney,inChangeMoney,outChangeMoney,customerName)').forEach(field => {
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
                <Button onClick={() => dialog2.close()}>取消</Button>
                <LoadingButton
                  onClick={async () => {
                    const values = await form2.submit()
                    console.log(values)
                    if (values.selectedRow) {
                      form.setValues({
                        projectId: values.selectedRow.id,
                        name: values.selectedRow.name,
                        taskCode: values.selectedRow.taskCode,
                        property: values.selectedRow.property,
                        invoiceRate: values.selectedRow.invoiceRate,
                        projectRate: values.selectedRow.projectRate,
                        customerId: values.selectedRow.customerId,
                        customerName: values.selectedRow.customerName,
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
            name="name" required title="项目名称" x-decorator="FormItem" x-decorator-props={{ gridSpan: 3 }}
            x-component="InputButton" x-component-props={{ onClick: onClick }}/>
          <SchemaField.String name="taskCode" title="项目任务号" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="property" x-decorator="FormItem" title="项目性质" x-component="Input"/>
          <SchemaField.String
            name="status" required title="项目状态" x-decorator="FormItem"
            x-component="Select" x-component-props={{ showSearch: true }}
            enum={[
              { label: '中标', value: '中标' },
              { label: '未中标', value: '未中标' },
              { label: '终止', value: '终止' },
            ]}/>
          />
        </SchemaField.Void>
        <SchemaField.Array
          name="list" x-decorator="FormItem" x-component="ArrayTable"
          x-component-props={{ size: 'small', sticky: true, title: () => (<b>{' 收付款信息'}</b>) }}
        >
          <SchemaField.Object>
            <SchemaField.Void x-component="ArrayTable.Column"
                              x-component-props={{ width: 150, title: '日期', align: 'center' }}>
              <SchemaField.String name="registeDate" x-decorator="FormItem" x-component="DatePicker"/>
            </SchemaField.Void>
            <SchemaField.Void x-component="ArrayTable.Column" x-component-props={{ title: '付款单位', align: 'center' }}>
              <SchemaField.String
                name="outName" x-decorator="FormItem" x-component="Input"
              />
            </SchemaField.Void>
            <SchemaField.Void x-component="ArrayTable.Column" x-component-props={{ title: '收款单位', align: 'center' }}>
              <SchemaField.String
                name="inName" x-decorator="FormItem" x-component="Input"
              />
            </SchemaField.Void>
            <SchemaField.Void x-component="ArrayTable.Column"
                              x-component-props={{ width: 150, title: '金额', align: 'center' }}>
              <SchemaField.Number name="money" x-decorator="FormItem" x-component="NumberPicker"/>
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
      </SchemaField>
    </Form>
  </ConfigProvider>
}


