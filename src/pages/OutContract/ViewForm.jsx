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
import { session } from '../../utils'
import DialogList from './DialogList'
import DialogList2 from './DialogList2'
import styles from '../table-placeholder.less'
import { Button, ConfigProvider, message, Tabs } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import React, { useEffect } from 'react'
import ProcessDesignGraph from '../ProcessDesignGraph'
import ProcessInstNodeList from '../ProcessInstNode/List'

const SchemaField = createSchemaField({
  components: {
    FormLayout, FormItem, Input, FormGrid,
    ArrayTable, ArrayTableAddition, ArrayTableIndex, ArrayTableRemove,
    LoadingButton, InputButton, NumberPicker, Select, DatePicker, Radio,
  },
})

export default (props) => {
  let { form, type, record } = props

  return <ConfigProvider locale={zhCN}>
    <Tabs animated={false} size={'small'}>
      <Tabs.TabPane tab="表单数据" key="1">
        <Form form={form} labelWidth={110} className={styles.placeholder}>
          <SchemaField>
            <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 3, strictAutoFit: true }}>
              <SchemaField.String name="displayName" title="申请人" x-component="Input" x-decorator="FormItem"/>
              <SchemaField.String name="deptName" title="申请部门" x-component="Input" x-decorator="FormItem"/>
              <SchemaField.String name="createDatetime" title="申请时间" x-decorator="FormItem" x-component="Input"/>
              <SchemaField.String
                name="name" required title="项目名称" x-decorator="FormItem" x-decorator-props={{ gridSpan: 2 }}
                x-component="Input"/>
              <SchemaField.String name="taskCode" title="项目任务号" x-decorator="FormItem" x-component="Input"/>
              <SchemaField.String
                name="customerName" required title="相对方名称" x-decorator="FormItem" x-decorator-props={{ gridSpan: 2 }}
                x-component="Input"/>
              <SchemaField.String
                name="accountType" required x-decorator="FormItem" title="账号类型" x-component="Radio.Group"
                enum={[
                  { label: '动', value: '动' },
                  { label: '海', value: '海' },
                ]}
              />
              <SchemaField.String
                name="contractName" required x-decorator="FormItem" title="合同名称" x-component="Input"
                x-decorator-props={{ gridSpan: 3 }}/>
              <SchemaField.String name="contractCode" x-decorator="FormItem" title="合同编号" x-component="Input"/>
              <SchemaField.Number
                name="contractMoney" required x-decorator="FormItem" title="合同金额" x-component="NumberPicker"/>
              <SchemaField.Number
                name="endMoney" x-decorator="FormItem" title="结算金额" x-component="NumberPicker"/>
              <SchemaField.String
                x-decorator-props={{ gridSpan: 2 }}
                name="remark" title="备注" x-decorator="FormItem" x-component="Input.TextArea"
                x-component-props={{ rows: 2 }}
              />
            </SchemaField.Void>
          </SchemaField>
        </Form>
      </Tabs.TabPane>
      <Tabs.TabPane tab="流程图" key="2">
        <ProcessDesignGraph processInstId={record.processInstId}/>
      </Tabs.TabPane>
      <Tabs.TabPane tab="审批记录" key="3">
        <ProcessInstNodeList processInstId={record.processInstId}/>
      </Tabs.TabPane>
    </Tabs>
  </ConfigProvider>
}


