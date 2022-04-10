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
  Radio,
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
import DialogList from './DialogList'
import styles from '../table-placeholder.less'
import { Button, ConfigProvider, message } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import React, { useEffect } from 'react'
import { onFieldReact } from '@formily/core'

const SchemaField = createSchemaField({
  components: {
    FormLayout, FormItem, Input, FormGrid, Radio,
    ArrayTable, ArrayTableAddition, ArrayTableIndex, ArrayTableRemove,
    LoadingButton, InputButton, NumberPicker, Select, DatePicker,
  },
})

const typeArr1 = ['材料及设备费', '劳务费', '技术服务费', '工程款']
const typeArr2 = ['税费', '投标费用', '现场管理费', '证书服务费', '资金成本', '交易服务费', '交通费', '餐费', '差旅费','其他']
export default (props) => {
  let { form, type } = props

  useEffect(async () => {
    form.query('*(taskCode,property,contractMoney,contractName)').forEach(field => {
      field.setPattern('disabled')
    })
  }, [])

  const onClick = (flag) => {
    let value = form.query('haveContract').take()?.value
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
                      if (value === '有') {
                        form.setValues({
                          budgetId: values.selectedRow.id,
                          projectId: values.selectedRow.projectId,
                          name: values.selectedRow.name,
                          taskCode: values.selectedRow.taskCode,
                          property: values.selectedRow.property,
                          contractMoney: values.selectedRow.contractMoney,
                          contractName: values.selectedRow.contractName,
                        })
                      } else {
                        form.setValues({
                          budgetId: values.selectedRow.id,
                          projectId: values.selectedRow.projectId,
                          name: values.selectedRow.name,
                          taskCode: values.selectedRow.taskCode,
                          property: values.selectedRow.property,
                        })
                      }
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
    } else {
      form.query('haveContract').take().validate()
    }
  }

  form.addEffects('id', () => {
    onFieldReact('haveContract', (field) => {
      if (field.value === '有') {
        form.query('*(providerName,contractCode,contractMoney,contractName)').forEach(fieldd => {
          fieldd.setState({ display: 'visible' })
        })
        form.query('list.*.costType')
          .forEach(fieldd => fieldd.dataSource = typeArr1.map(item => ({ label: item, value: item })))
      } else {
        form.query('*(providerName,contractCode,contractMoney,contractName)').forEach(fieldd => {
          fieldd.setState({ display: 'hidden' })
        })
        form.query('list.*.costType')
          .forEach(fieldd => fieldd.dataSource = typeArr2.map(item => ({ label: item, value: item })))
      }
    })
    onFieldReact('list.*.outStyle', (field) => {
      let value = field.value
      if (value) {
        if (value === '银行承兑' || value === '商业承兑') {
          field.query('.arriveDate').take()?.setPattern('editable')
        } else {
          field.query('.arriveDate').take()?.setState({ pattern: 'disabled', value: null })
        }
      } else {
        field.query('.arriveDate').take()?.setState({ pattern: 'disabled', value: null })
      }
    })
  })

  return <ConfigProvider locale={zhCN}>
    <Form form={form} labelWidth={100} className={styles.placeholder}>
      <SchemaField>
        <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 3, strictAutoFit: true }}>
          <SchemaField.String
            name="haveContract" required title="有无合同" x-decorator="FormItem" x-component="Radio.Group"
            x-decorator-props={{ gridSpan: 2 }} default={'有'}
            enum={[
              { label: '有', value: '有' },
              { label: '无', value: '无' },
            ]}
          />
          <SchemaField.String
            name="name" required title="项目名称" x-decorator="FormItem" x-decorator-props={{ gridSpan: 2 }}
            x-component="InputButton" x-component-props={{ onClick: onClick }}/>
          <SchemaField.String name="taskCode" title="项目任务号" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="property" title="项目性质" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="wbs" required title="WBS编号" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="providerName" required title="相对方名称" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="contractCode" required title="合同编号" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="contractMoney" title="合同金额" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="contractName" title="合同名称" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String
            name="remark" title="备注" x-decorator="FormItem" x-component="Input.TextArea" x-component-props={{ rows: 2 }}
          />
          <SchemaField.Array
            name="list" required x-decorator="FormItem" x-component="ArrayTable"
            x-component-props={{
              size: 'small',
              sticky: true,
              title: () => ('支出明细'),
            }}
            x-decorator-props={{ gridSpan: 3 }}
          >
            <SchemaField.Object>
              <SchemaField.Void
                x-component="ArrayTable.Column"
                x-component-props={{ width: 60, title: '排序', align: 'center' }}
              >
                <SchemaField.Void x-decorator="FormItem" x-component="ArrayTable.SortHandle"/>
              </SchemaField.Void>
              <SchemaField.Void
                x-component="ArrayTable.Column" x-component-props={{ width: 150, title: '费用类型', align: 'center' }}>
                <SchemaField.String name="costType" required x-decorator="FormItem" x-component="Select"/>
              </SchemaField.Void>
              <SchemaField.Void
                x-component="ArrayTable.Column" x-component-props={{ width: 130, title: '日期', align: 'center' }}>
                <SchemaField.String name="outDate" required x-decorator="FormItem" x-component="DatePicker"/>
              </SchemaField.Void>
              <SchemaField.Void
                x-component="ArrayTable.Column" x-component-props={{ width: 200, title: '摘要', align: 'center' }}>
                <SchemaField.String
                  name="remark" x-decorator="FormItem" x-component="Input.TextArea" x-component-props={{ rows: 2 }}/>
              </SchemaField.Void>
              <SchemaField.Void x-component="ArrayTable.Column" x-component-props={{ title: '开票金额', align: 'center' }}>
                <SchemaField.Number name="money1" x-decorator="FormItem" x-component="NumberPicker"/>
              </SchemaField.Void>
              <SchemaField.Void x-component="ArrayTable.Column" x-component-props={{ title: '付款金额', align: 'center' }}>
                <SchemaField.Number name="money2" required x-decorator="FormItem" x-component="NumberPicker"/>
              </SchemaField.Void>
              <SchemaField.Void x-component="ArrayTable.Column" x-component-props={{ title: '付款方式', align: 'center' }}>
                <SchemaField.String
                  name="outStyle" required x-decorator="FormItem" x-component="Select"
                  enum={[
                    { label: '支票', value: '支票' },
                    { label: '网银', value: '网银' },
                    { label: '银行承兑', value: '银行承兑' },
                    { label: '商业承兑', value: '商业承兑' },
                  ]}
                />
              </SchemaField.Void>
              <SchemaField.Void x-component="ArrayTable.Column"
                                x-component-props={{ width: 130, title: '到期日', align: 'center' }}>
                <SchemaField.String name="arriveDate" x-decorator="FormItem" x-component="DatePicker"
                                    x-component-props={{ picker: 'month' }}/>
              </SchemaField.Void>
              <SchemaField.Void x-component="ArrayTable.Column"
                                x-component-props={{ width: 60, title: '操作', dataIndex: 'operations' }}>
                <SchemaField.Void x-component="FormItem">
                  <SchemaField.Void x-component="ArrayTableRemove"/>
                </SchemaField.Void>
              </SchemaField.Void>
            </SchemaField.Object>
            <SchemaField.Void x-component="ArrayTableAddition" x-component-props={{ width: 60 }}/>
          </SchemaField.Array>
        </SchemaField.Void>
      </SchemaField>
    </Form>
  </ConfigProvider>
}


