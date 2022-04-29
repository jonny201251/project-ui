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
  Radio,
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
import { SearchOutlined } from '@ant-design/icons'
import DialogList2 from '../SmallProject/DialogList2'

const InputButton2 = (props) => {
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
    FormLayout, FormItem, Input, FormGrid,
    ArrayTable, ArrayTableAddition, ArrayTableIndex, ArrayTableRemove,
    LoadingButton, InputButton, NumberPicker, Select, DatePicker, Radio,
    InputButton2,
  },
})

export default (props) => {
  let { form, type } = props

  useEffect(async () => {
    form.query('*(taskCode,property,customerName,contractMoney,endMoney,contractName)').forEach(field => {
      field.setPattern('disabled')
    })
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
                        property: values.selectedRow.property,
                        wbs: values.selectedRow.wbs,
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

  const onClick2 = (flag) => {
    if (flag === 'open') {
      let dialog2 = FormDialog({ footer: null, keyboard: false, maskClosable: false, width: 800 },
        (form2) => {
          return <>
            <DialogList2 form={form2} dialog={dialog2} selectedId={form.values.customerId}/>
            <FormDialog.Footer>
              <FormButtonGroup gutter={16} align={'right'}>
                <Button onClick={() => dialog2.close()}>取消</Button>
                <LoadingButton
                  onClick={async () => {
                    const values = await form2.submit()
                    if (values.selectedRow) {
                      form.setValues({
                        providerId: values.selectedRow.id,
                        providerName: values.selectedRow.name
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
    <Form form={form} labelWidth={100} className={styles.placeholder}>
      <SchemaField>
        <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 3, strictAutoFit: true }}>
          <SchemaField.String
            name="name" required title="项目名称" x-decorator="FormItem" x-decorator-props={{ gridSpan: 2 }}
            x-component="InputButton" x-component-props={{ onClick: onClick }}/>
          <SchemaField.String name="wbs" required title="WBS编号" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String
            name="type2" required title='往来类型' x-decorator="FormItem"
            x-component="Radio.Group"
            enum={[
              { label: '收款', value: '收款' },
              { label: '付款', value: '付款' },
            ]}/>
          <SchemaField.String
            name="haveInOut" required title='影响收支' x-decorator="FormItem"
            x-component="Radio.Group"
            enum={[
              { label: '是', value: '是' },
              { label: '否', value: '否' },
            ]}/>
          <SchemaField.String
            name="providerName" title="往来方名称" required x-decorator="FormItem"
            x-component="InputButton2" x-component-props={{ onClick: onClick2 }}
            x-decorator-props={{ gridSpan: 2 }}/>
        </SchemaField.Void>
        <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 3, strictAutoFit: true }}>
          <SchemaField.String name="ioDate" title='日期' required x-decorator="FormItem" x-component="DatePicker"/>
          <SchemaField.String
            name="remark" title='摘要' x-decorator="FormItem" x-component="Input.TextArea"
            x-component-props={{ rows: 2 }}/>
          <SchemaField.Number
            name="money" required title='往来款' x-decorator="FormItem" x-component="NumberPicker"
            x-component-props={{ placeholder: '收款正数，付款负数' }}
          />
          <SchemaField.String
            x-decorator-props={{ gridSpan: 2 }}
            name="remarkk" title="备注" x-decorator="FormItem" x-component="Input.TextArea"
            x-component-props={{ rows: 2 }}
          />
        </SchemaField.Void>
      </SchemaField>
    </Form>
  </ConfigProvider>
}


