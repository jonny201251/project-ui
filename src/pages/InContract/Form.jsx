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
  File,
  InputButton,
  LoadingButton,
  NumberPicker,
} from '../../components'
import { session } from '../../utils'
import DialogList from './DialogList'
import DialogList2 from '../SmallProject/DialogList'
import styles from '../table-placeholder.less'
import { Button, ConfigProvider, message } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import React, { useEffect } from 'react'

const SchemaField = createSchemaField({
  components: {
    FormLayout, FormItem, Input, FormGrid,
    ArrayTable, ArrayTableAddition, ArrayTableIndex, ArrayTableRemove,
    LoadingButton, InputButton, NumberPicker, Select, DatePicker, Radio,
    File,
  },
})

export default (props) => {
  let { form, type } = props

  useEffect(async () => {
    form.query('*(displayName,deptName,createDatetime,taskCode,endMoney)').forEach(field => {
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
                        projectType: values.selectedRow.projectType,
                        projectId: values.selectedRow.projectId,
                        name: values.selectedRow.name,
                        wbs: values.selectedRow.wbs,
                        taskCode: values.selectedRow.taskCode,
                        property: values.selectedRow.property,
                        budgetId: values.selectedRow.budgetId,
                        customerId: values.selectedRow.customerId,
                        customerName: values.selectedRow.customerName,
                        contractCode: values.selectedRow.contractCode,
                        contractMoney: values.selectedRow.contractMoney,
                        contractName: values.selectedRow.contractName,
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
                        customerId: values.selectedRow.id,
                        customerName: values.selectedRow.name,
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
            name="name" required title="项目名称" x-decorator="FormItem" x-decorator-props={{ gridSpan: 2 }}
            x-component="InputButton" x-component-props={{ onClick: onClick }}/>
        </SchemaField.Void>
        <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 3, strictAutoFit: true }}>
          <SchemaField.String name="taskCode" title="任务号" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="wbs" title="WBS编号" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String
            name="property" title="项目性质" x-decorator="FormItem" x-component="Select"
            enum={[
              { label: '一类', value: '一类' },
              { label: '二类', value: '二类' },
              { label: '三类', value: '三类' },
            ]}
          />
          <SchemaField.String
            name="customerName" required title="客户名称" x-decorator="FormItem" x-decorator-props={{ gridSpan: 2 }}
            x-component="InputButton" x-component-props={{ onClick: onClick2 }}/>

          <SchemaField.String
            name="contractName" required x-decorator="FormItem" title="收款合同名称" x-component="Input"
            x-decorator-props={{ gridSpan: 2 }}/>
        </SchemaField.Void>
        <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 3, strictAutoFit: true }}>
          <SchemaField.String name="contractCode" x-decorator="FormItem" title="合同编号" x-component="Input"/>
          <SchemaField.Number
            name="contractMoney" required x-decorator="FormItem" title="合同金额" x-component="NumberPicker"/>
          <SchemaField.Number
            name="endMoney" x-decorator="FormItem" title="结算金额" x-component="NumberPicker"/>
        </SchemaField.Void>
        <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 3, strictAutoFit: true }}>
          <SchemaField.String name="contractType" x-decorator="FormItem" title="合同类别" x-component="Input"/>
          <SchemaField.String name="contractLevel" x-decorator="FormItem" title="合同级别" x-component="Input"/>
          <SchemaField.String name="printType" x-decorator="FormItem" title="用印类别" x-component="Input"/>
          <SchemaField.String name="printDate" title='用印日期' x-decorator="FormItem" x-component="DatePicker"/>
          <SchemaField.String name="location" title='项目所在地' x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="startDate" title='开工日期' x-decorator="FormItem" x-component="DatePicker"/>
          <SchemaField.String name="endDate" title='竣工日期' x-decorator="FormItem" x-component="DatePicker"/>
          <SchemaField.String name="expectDate" title='签订日期' x-decorator="FormItem" x-component="DatePicker"/>
          <SchemaField.String name="documentDate" title='归档日期' x-decorator="FormItem" x-component="DatePicker"/>
        </SchemaField.Void>
        <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 3, strictAutoFit: true }}>
          <SchemaField.String name="fileList" title="附件" x-decorator="FormItem" x-component="File"
                              x-decorator-props={{ gridSpan: 2 }}/>
          <SchemaField.String
            x-decorator-props={{ gridSpan: 2 }}
            name="remark" title="备注" x-decorator="FormItem" x-component="Input.TextArea" x-component-props={{ rows: 2 }}
          />
        </SchemaField.Void>
      </SchemaField>
    </Form>
  </ConfigProvider>
}


