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
  NumberPicker, File,
} from '../../components'
import { session } from '../../utils'
import DialogList from './DialogList'
import DialogList2 from './DialogList2'
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
    form.setPattern('disabled')
    form.query('endMoney').take()?.setState({ value: null, pattern: 'editable', required: true })
    form.query('comment').take()?.setState({ pattern: 'editable', required: true })
    form.query('fileList').take()?.setState({ pattern: 'editable', required: true })
    if (type === 'change') {
      const user = session.getItem('user')
      form.setInitialValues({
        createDatetime: new Date().Format('yyyy-MM-dd hh:mm:ss'),
        displayName: user.displayName, displayNamee: user.displayName, loginName: user.loginName,
        deptId: user.deptId, deptName: user.deptName,
      })
    }
  }, [])

  return <ConfigProvider locale={zhCN}>
    <Form form={form} labelWidth={110} className={styles.placeholder}>
      <SchemaField>
        <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 3, strictAutoFit: true }}>
          <SchemaField.String
            name="comment" title="变更说明" x-decorator="FormItem" x-decorator-props={{ gridSpan: 3 }}
            x-component="Input.TextArea" x-component-props={{ placeholder: '请输入说明' }}
          />
          <SchemaField.String name="displayName" title="申请人" x-component="Input" x-decorator="FormItem"/>
          <SchemaField.String name="deptName" title="申请部门" x-component="Input" x-decorator="FormItem"/>
          <SchemaField.String name="createDatetime" title="申请时间" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String
            name="name" title="项目名称" x-decorator="FormItem" x-decorator-props={{ gridSpan: 2 }}
            x-component="Input"/>
          <SchemaField.String name="wbs" title="WBS编号" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String
            name="customerName" title="客户名称" x-decorator="FormItem" x-decorator-props={{ gridSpan: 2 }}
            x-component="Input"/>
          <SchemaField.String
            name="contractName" x-decorator="FormItem" title="收款合同名称" x-component="Input"
            x-decorator-props={{ gridSpan: 2 }}/>
        </SchemaField.Void>
        <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 3, strictAutoFit: true }}>
          <SchemaField.String name="contractCode" x-decorator="FormItem" title="合同编号" x-component="Input"/>
          <SchemaField.Number
            name="contractMoney" x-decorator="FormItem" title="合同金额" x-component="NumberPicker"/>
          <SchemaField.Number
            name="endMoney" x-decorator="FormItem" title="结算金额" x-component="NumberPicker"/>
          <SchemaField.String name="fileList" title="附件" x-decorator="FormItem" x-component="File" x-decorator-props={{ gridSpan: 2 }}/>
          <SchemaField.String
            x-decorator-props={{ gridSpan: 2 }}
            name="remark" title="备注" x-decorator="FormItem" x-component="Input.TextArea" x-component-props={{ rows: 2 }}
          />
        </SchemaField.Void>
      </SchemaField>
    </Form>
  </ConfigProvider>
}


