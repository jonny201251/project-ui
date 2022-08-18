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
import { onFieldReact } from '@formily/core'
import _ from 'lodash'

const SchemaField = createSchemaField({
  components: {
    FormLayout, FormItem, Input, FormGrid,
    ArrayTable, ArrayTableAddition, ArrayTableIndex, ArrayTableRemove,
    LoadingButton, InputButton, NumberPicker, Select, DatePicker,
  },
})

const typeArr = ['材料及设备费', '劳务费', '技术服务费', '工程款', '税费', '投标费用', '现场管理费', '证书服务费', '资金成本', '交易服务费', '交通费', '餐费', '差旅费','其他']

export default (props) => {
  let { form, type } = props

  useEffect(async () => {
    form.query('*(taskCode,costRate)').forEach(field => {
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
                        budgetId: values.selectedRow.id,
                        projectId: values.selectedRow.projectId,
                        name: values.selectedRow.name,
                        taskCode: values.selectedRow.taskCode,
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

  form.addEffects('id', () => {
    onFieldReact('costType', (field) => {
      let value = field.value
      if (value) {
        let index = _.findIndex(typeArr, item => (item === value))
        if (value === '材料及设备费') {
          form.query('costRate').take()?.setValue('13%')
        } else if (value === '劳务费') {
          form.query('costRate').take()?.setValue('3%')
        } else if (value === '技术服务费') {
          form.query('costRate').take()?.setValue('1%')
        } else {
          form.query('costRate').take()?.setValue(undefined)
        }
        form.setValues({ sort: index + 1 })
      }
    })
  })

  return <ConfigProvider locale={zhCN}>
    <Form form={form} labelWidth={110} className={styles.placeholder}>
      <SchemaField>
        <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 3, strictAutoFit: true }}>
          <SchemaField.String
            name="name" required title="项目名称" x-decorator="FormItem" x-decorator-props={{ gridSpan: 3 }}
            x-component="InputButton" x-component-props={{ onClick: onClick }}/>
          <SchemaField.String name="taskCode" title="项目任务号" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String
            name="costType" required title="成本类型" x-decorator="FormItem" x-component="Select"
            enum={typeArr.map(item => ({ label: item, value: item }))}
          />
          <SchemaField.String name="costRate" x-decorator="FormItem" title="税率" x-component="Input"/>
          <SchemaField.Array
            name="list" required title={'预计支出'} x-decorator="FormItem" x-component="ArrayTable"
            x-component-props={{ size: 'small', sticky: true, pagination: { pageSize: 200 } }}
            x-decorator-props={{ gridSpan: 3 }}
          >
            <SchemaField.Object>
              <SchemaField.Void
                x-component="ArrayTable.Column"
                x-component-props={{ width: 80, title: '排序', align: 'center' }}
              >
                <SchemaField.Void x-decorator="FormItem" x-component="ArrayTable.SortHandle"/>
              </SchemaField.Void>
              <SchemaField.Void x-component="ArrayTable.Column" x-component-props={{ title: '支出日期', align: 'center' }}>
                <SchemaField.String
                  name="outDate" x-decorator="FormItem" x-component="DatePicker"
                  x-component-props={{ picker: 'month', format: 'YYYY年MM月' }}
                />
              </SchemaField.Void>
              <SchemaField.Void x-component="ArrayTable.Column" x-component-props={{ title: '金额', align: 'center' }}>
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
          <SchemaField.String
            x-decorator-props={{ gridSpan: 3 }}
            name="remark" title="备注" x-decorator="FormItem" x-component="Input.TextArea" x-component-props={{ rows: 2 }}
          />
        </SchemaField.Void>
      </SchemaField>
    </Form>
  </ConfigProvider>
}


