import {
  ArrayTable,
  DatePicker,
  Form,
  FormGrid,
  FormItem,
  FormLayout,
  Input,
  PreviewText,
  Radio,
  Select,
  Space,
} from '@formily/antd'
import { createSchemaField } from '@formily/react'
import React, { useEffect } from 'react'
import zhCN from 'antd/lib/locale/zh_CN'
import { ConfigProvider, Tabs } from 'antd'
import { ArrayTableIndex, InputButton, NumberPicker } from '../../components'
import { onFieldReact } from '@formily/core'
import ProcessDesignGraph from '../ProcessDesignGraph'
import ProcessInstNodeList from '../ProcessInstNode/List'


const SchemaField = createSchemaField({
  components: {
    FormItem, FormLayout, Input, PreviewText, Select, NumberPicker, ArrayTableIndex,
    ArrayTable, FormGrid, DatePicker, Space, InputButton, Radio,
  },
})


export default (props) => {
  let { form, record } = props

  return <ConfigProvider locale={zhCN}>
    <Tabs animated={false} size={'small'}>
      <Tabs.TabPane tab="表单数据" key="1">
        <Form form={form} labelWidth={90}>
          <SchemaField>
            <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 3, strictAutoFit: true }}>
              <SchemaField.String name="displayName" title="申请人" x-decorator="FormItem" x-component="Input"/>
              <SchemaField.String
                name="deptName" title="申请部门" x-component="Input" x-decorator="FormItem"
              />
              <SchemaField.String name="createDatetime" title="申请时间" x-decorator="FormItem" x-component="Input"/>
              <SchemaField.String
                name="type" required title="项目类别" x-decorator="FormItem" x-component="Select"
                enum={[
                  { label: '民用产业项目', value: '民用产业项目' },
                  { label: '自筹资金项目', value: '自筹资金项目' },
                  { label: '技改项目', value: '技改项目' },
                ]}
              />
              <SchemaField.String
                name="providerName" required title="供方名称" x-component="Input" x-decorator="FormItem"
              />
              <SchemaField.String
                name="usee" required title="供方用途" x-component="Input" x-decorator="FormItem"
              />
            </SchemaField.Void>
            <SchemaField.Array
              name="providerScore2List" x-decorator="FormItem" x-component="ArrayTable"
              x-component-props={{
                size: 'small',
                pagination: { pageSize: 200 },
                sticky: true,
              }}
            >
              <SchemaField.Object>
                <SchemaField.Void
                  x-component="ArrayTable.Column"
                  x-component-props={{ width: 80, title: '序号', align: 'center' }}
                >
                  <SchemaField.Void x-decorator="FormItem" x-component="ArrayTableIndex"/>
                </SchemaField.Void>
                <SchemaField.Void
                  x-component="ArrayTable.Column"
                  x-component-props={{ title: '评价指标', align: 'center' }}
                >
                  <SchemaField.String name="kpi" x-decorator="FormItem" x-component="PreviewText.Input"/>
                </SchemaField.Void>
                <SchemaField.Void
                  x-component="ArrayTable.Column"
                  x-component-props={{ title: '评分项', align: 'center' }}
                >
                  <SchemaField.String name="item" required x-decorator="FormItem" x-component="PreviewText.Input"/>
                </SchemaField.Void>
                <SchemaField.Void
                  x-component="ArrayTable.Column"
                  x-component-props={{ width: 120, title: '得分标准', align: 'center' }}
                >
                  <SchemaField.String name="standard" x-decorator="FormItem" x-component="PreviewText.Input"/>
                </SchemaField.Void>
                <SchemaField.Void
                  x-component="ArrayTable.Column"
                  x-component-props={{ width: 120, title: '初评得分', align: 'center' }}
                >
                  <SchemaField.Number x-decorator="FormItem" required name="startScore" x-component="NumberPicker"/>
                </SchemaField.Void>
                <SchemaField.Void
                  x-component="ArrayTable.Column"
                  x-component-props={{ width: 100, title: <span>专业审查<br/>部门打分</span>, align: 'center' }}
                >
                  <SchemaField.Number x-decorator="FormItem" name="endScore" x-component="NumberPicker"/>
                </SchemaField.Void>
              </SchemaField.Object>
            </SchemaField.Array>
            <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 3, strictAutoFit: true }}>
              <SchemaField.Number name="startScore" title={<b>初评得分</b>}
                                  x-decorator="FormItem" x-component="PreviewText.Input"/>
              <SchemaField.Number name="endScore" title={<b>部门打分</b>}
                                  x-decorator="FormItem" x-component="PreviewText.Input"/>
              <SchemaField.String name="result" title={<b>结论</b>}
                                  x-decorator="FormItem" x-component="PreviewText.Input"/>
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

