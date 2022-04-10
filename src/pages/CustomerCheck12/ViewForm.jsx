import {
  ArrayTable,
  Checkbox,
  DatePicker,
  Form,
  FormGrid,
  FormItem,
  FormLayout,
  Input,
  PreviewText,
  Radio,
  Select,
} from '@formily/antd'
import { createSchemaField } from '@formily/react'
import React from 'react'
import zhCN from 'antd/lib/locale/zh_CN'
import { ConfigProvider, Tabs } from 'antd'
import { ArrayTableIndex, NumberPicker } from '../../components'
import ProcessDesignGraph from '../ProcessDesignGraph'
import ProcessInstNodeList from '../ProcessInstNode/List'


const SchemaField = createSchemaField({
  components: {
    FormItem, FormLayout, Input, PreviewText, Select, NumberPicker, ArrayTableIndex,
    ArrayTable, FormGrid, DatePicker, Radio, Checkbox,
  },
})

export default (props) => {
  let { form, record } = props

  return <ConfigProvider locale={zhCN}>
    <Tabs animated={false} size={'small'}>
      <Tabs.TabPane tab="表单数据" key="1">
        <Form form={form} labelWidth={120}>
          <SchemaField>
            <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 3, strictAutoFit: true }}>
              <SchemaField.String name="displayName" title="申请人" x-decorator="FormItem" x-component="Input"/>
              <SchemaField.String name="deptName" title="申请部门" x-component="Input" x-decorator="FormItem"/>
              <SchemaField.String name="createDatetime" title="申请时间" x-decorator="FormItem" x-component="Input"/>
            </SchemaField.Void>
            <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 2, strictAutoFit: true }}>
              <SchemaField.String name="customerName" title="客户名称" x-component="Input" x-decorator="FormItem"/>
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
