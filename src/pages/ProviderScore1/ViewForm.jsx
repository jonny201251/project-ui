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

let map = new Map()
map.set('注册资本', ['注册资本≥500万', '500万>注册资本≥100万', '注册资本<100万'].map(item => ({ label: item, value: item })))
map.set('合同法律风险', ['没有', '有,但风险较小在可控范围内', '有,且风险较大'].map(item => ({ label: item, value: item })))
map.set('供货合同风险', ['没有', '有,但风险较小在可控范围内', '有,且风险较大'].map(item => ({ label: item, value: item })))
map.set('不良记录情况(比如恶意拖欠农民工工资等)', ['无', '有,影响较小', '有,影响较大'].map(item => ({ label: item, value: item })))
map.set('产品服务质量及价格水平', ['与同类型供方相比性价比较高', '与同类型供方相比性价比一般', '与同类型供方相比性价比较差'].map(item => ({ label: item, value: item })))
map.set('产品服务供货及使用情况', [
  '按约定供货及时,采购主体使用情况良好', '按约定供货及时,采购主体使用情况一般', '未按约定及时供货,采购主体使用情况较差',
].map(item => ({ label: item, value: item })))

export default (props) => {
  let { form, record } = props

  useEffect(async () => {
    form.query('*(deptName,displayName,createDate,providerName,type)').forEach(field => {
      field.setPattern('disabled')
    })
  }, [])

  form.addEffects('id', () => {
    onFieldReact('providerScore2List.*.item', (field) => {
      let kpiValue = field.query('.kpi').get('value')
      if (kpiValue) {
        field.dataSource = map.get(kpiValue)
      }
    })
    onFieldReact('providerScore2List.*.standard', (field) => {
      let kpiValue = field.query('.kpi').get('value')
      let itemValue = field.query('.item').get('value')
      if (itemValue) {
        let startScoreField = field.query('.startScore').take()
        let endScoreField = field.query('.endScore').take()
        if (kpiValue === '注册资本') {
          if (itemValue === '注册资本≥500万') {
            field.value = '9-10分'
            startScoreField && startScoreField.setValidator({ minimum: 9, maximum: 10, required: true })
            endScoreField && endScoreField.setValidator({ minimum: 9, maximum: 10, required: true })
          } else if (itemValue === '500万>注册资本≥100万') {
            field.value = '6-8分'
            startScoreField && startScoreField.setValidator({ minimum: 6, maximum: 8, required: true })
            endScoreField && endScoreField.setValidator({ minimum: 6, maximum: 8, required: true })
          } else if (itemValue === '注册资本<100万') {
            field.value = '<6分'
            startScoreField && startScoreField.setValidator({ minimum: 0, maximum: 6, required: true })
            endScoreField && endScoreField.setValidator({ minimum: 0, maximum: 6, required: true })
          }
          // endScoreField && endScoreField.setPattern('disabled')
        }
        if (kpiValue === '合同法律风险' || kpiValue === '供货合同风险') {
          if (itemValue === '没有') {
            field.value = '9-10分'
            startScoreField && startScoreField.setValidator({ minimum: 9, maximum: 10, required: true })
            endScoreField && endScoreField.setValidator({ minimum: 9, maximum: 10, required: true })
          } else if (itemValue === '有,但风险较小在可控范围内') {
            field.value = '6-8分'
            startScoreField && startScoreField.setValidator({ minimum: 6, maximum: 8, required: true })
            endScoreField && endScoreField.setValidator({ minimum: 6, maximum: 8, required: true })
          } else if (itemValue === '有,且风险较大') {
            field.value = '<6分'
            startScoreField && startScoreField.setValidator({ minimum: 0, maximum: 6, required: true })
            endScoreField && endScoreField.setValidator({ minimum: 0, maximum: 6, required: true })
          }
          // endScoreField && endScoreField.setPattern('disabled')
        }
        if (kpiValue === '不良记录情况(比如恶意拖欠农民工工资等)') {
          if (itemValue === '无') {
            field.value = '9-10分'
            startScoreField && startScoreField.setValidator({ minimum: 9, maximum: 10, required: true })
            endScoreField && endScoreField.setValidator({ minimum: 9, maximum: 10, required: true })
          } else if (itemValue === '有,影响较小') {
            field.value = '6-8分'
            startScoreField && startScoreField.setValidator({ minimum: 6, maximum: 8, required: true })
            endScoreField && endScoreField.setValidator({ minimum: 6, maximum: 8, required: true })
          } else if (itemValue === '有,影响较大') {
            field.value = '<6分'
            startScoreField && startScoreField.setValidator({ minimum: 0, maximum: 6, required: true })
            endScoreField && endScoreField.setValidator({ minimum: 0, maximum: 6, required: true })
          }
          // endScoreField && endScoreField.setPattern('disabled')
        }
        if (kpiValue === '产品服务质量及价格水平') {
          if (itemValue === '与同类型供方相比性价比较高') {
            field.value = '9-10分'
            startScoreField && startScoreField.setValidator({ minimum: 9, maximum: 10, required: true })
            endScoreField && endScoreField.setValidator({ minimum: 9, maximum: 10, required: true })
          } else if (itemValue === '与同类型供方相比性价比一般') {
            field.value = '6-8分'
            startScoreField && startScoreField.setValidator({ minimum: 6, maximum: 8, required: true })
            endScoreField && endScoreField.setValidator({ minimum: 6, maximum: 8, required: true })
          } else if (itemValue === '与同类型供方相比性价比较差') {
            field.value = '<6分'
            startScoreField && startScoreField.setValidator({ minimum: 0, maximum: 6, required: true })
            endScoreField && endScoreField.setValidator({ minimum: 0, maximum: 6, required: true })
          }
          // endScoreField && endScoreField.setPattern('disabled')
        }
        if (kpiValue === '产品服务供货及使用情况') {
          if (itemValue === '按约定供货及时,采购主体使用情况良好') {
            field.value = '8-10分'
            startScoreField && startScoreField.setValidator({ minimum: 8, maximum: 10, required: true })
            endScoreField && endScoreField.setValidator({ minimum: 8, maximum: 10, required: true })
          } else if (itemValue === '按约定供货及时,采购主体使用情况一般') {
            field.value = '6-7分'
            startScoreField && startScoreField.setValidator({ minimum: 6, maximum: 7, required: true })
            endScoreField && endScoreField.setValidator({ minimum: 6, maximum: 7, required: true })
          } else if (itemValue === '未按约定及时供货,采购主体使用情况较差') {
            field.value = '<6分'
            startScoreField && startScoreField.setValidator({ minimum: 0, maximum: 6, required: true })
            endScoreField && endScoreField.setValidator({ minimum: 0, maximum: 6, required: true })
          }
          // endScoreField && endScoreField.setPattern('disabled')
        }
      }
    })
  })

  return <ConfigProvider locale={zhCN}>
    <Tabs animated={false} size={'small'}>
      <Tabs.TabPane tab="表单数据" key="1">
        <Form form={form}>
          <SchemaField>
            <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 4, strictAutoFit: true }}>
              <SchemaField.String
                name="deptName" title="申请部门" x-component="Input"
                x-decorator="FormItem" x-decorator-props={{ gridSpan: 2 }}
              />
              <SchemaField.String name="displayName" title="申请人" x-decorator="FormItem" x-component="Input"/>
              <SchemaField.String name="createDate" title="打分日期" x-decorator="FormItem" x-component="Input"/>
              <SchemaField.String
                name="providerName" title="供方名称" x-component="Input"
                x-decorator="FormItem" x-decorator-props={{ gridSpan: 2 }}
              />
              <SchemaField.String
                name="type" title="项目类别" x-decorator="FormItem" x-component="Input"
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
                  <SchemaField.String name="item" required x-decorator="FormItem" x-component="Select"/>
                </SchemaField.Void>
                <SchemaField.Void
                  x-component="ArrayTable.Column"
                  x-component-props={{ width: 100, title: '得分标准', align: 'center' }}
                >
                  <SchemaField.String name="standard" x-decorator="FormItem" x-component="PreviewText.Input"/>
                </SchemaField.Void>
                <SchemaField.Void
                  x-component="ArrayTable.Column"
                  x-component-props={{ width: 100, title: '初评得分', align: 'center' }}
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
                                  x-decorator="FormItem" x-component="PreviewText"/>
              <SchemaField.Number name="endScore" title="最终得分" x-decorator="FormItem" x-component="PreviewText"/>
              <SchemaField.String
                name="result" required title="结论" x-decorator="FormItem" x-component="PreviewText"
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

