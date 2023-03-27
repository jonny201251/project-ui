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


export default (props) => {
  let { form, type } = props

  useEffect(async () => {
    form.query('*(name,taskCode,costType,costRate)').forEach(field => {
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
                    if (values.selectedRow) {
                      form.setValues({
                        budgetId: values.selectedRow.id,
                        projectId: values.selectedRow.projectId,
                        name: values.selectedRow.projectName,
                        taskCode: values.selectedRow.projectTaskCode,
                        costType: values.selectedRow.costType,
                        costRate: values.selectedRow.costRate,
                        companyId: values.selectedRow.id,
                        companyName: values.selectedRow.companyName,
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
          <SchemaField.String
            name="projectName" title="项目名称" x-decorator="FormItem" x-decorator-props={{ gridSpan: 3 }}
            x-component="Input"/>
          <SchemaField.String name="projectTaskCode" title="项目任务号" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="costType" title="成本类型" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="costRate" x-decorator="FormItem" title="税率" x-component="Input"/>
          <SchemaField.String
            name="companyName" required title="公司名称" x-decorator="FormItem" x-decorator-props={{ gridSpan: 3 }}
            x-component="InputButton" x-component-props={{ onClick: onClick }}/>
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


