import { Cascader, Form, FormItem, FormLayout, Input, Select, FormGrid } from '@formily/antd'
import { createSchemaField } from '@formily/react'
import React, { useEffect } from 'react'

const SchemaField = createSchemaField({
  components: { FormLayout, FormItem, Input, Select, Cascader, FormGrid },
})

export default (props) => {
  let { form, record } = props

  useEffect(() => {
    if (!record) {
      form.query('taskCode').take().setState({ display: 'hidden', pattern: 'disabled' })
    }
  }, [])

  const optionArr = [
    {
      label: '机电工程', value: '1',
      children: [
        { label: '消防工程及维保', value: '1' },
        { label: '安防工程(平安城市及雪亮工程)', value: '2' },
        { label: '建筑智能化(弱电等)', value: '3' },
        { label: '机电工程安装(暖通、空调等)', value: '4' },
        { label: '其他', value: '9' },
      ],
    },
    {
      label: '智慧产业', value: '2',
      children: [
        { label: '智慧管网', value: '1' },
        { label: '智慧环保', value: '2' },
        { label: '智慧管廊', value: '3' },
        { label: '智慧警务', value: '4' },
        { label: '智慧水务', value: '5' },
        { label: '其他', value: '9' },
      ],
    },
    {
      label: '节能环保', value: '3',
      children: [
        { label: '职业卫生技术咨询及管理服务', value: '1' },
        { label: '职业卫生工程及改造', value: '2' },
        { label: '节能环保工程', value: '3' },
        { label: '节能环保检测', value: '4' },
        { label: '污水运维服务', value: '5' },
        { label: '节能环保设备销售', value: '6' },
        { label: '废水处理服务', value: '7' },
        { label: '其他', value: '9' },
      ],
    },
    {
      label: '动力工程', value: '4',
      children: [
        { label: '动力工程', value: '1' },
        { label: '动力工程设计', value: '2' },
        { label: '其他', value: '9' },
      ],
    },
    {
      label: '国际工程', value: '5',
      children: [
        { label: '国际工程承包', value: '1' },
        { label: '其他', value: '9' },
      ],
    },
    {
      label: '系统运维', value: '6',
      children: [
        { label: '设备设施运维', value: '1' },
        { label: '其他', value: '9' },
      ],
    },
    {
      label: '产品代理', value: '7',
      children: [
        { label: '国内产品代理', value: '1' },
        { label: '国外产品代理', value: '2' },
        { label: '职业健康云平台产品', value: '3' },
        { label: '其他', value: '9' },
      ],
    },
    {
      label: '生产运行业务', value: '8',
      children: [
        { label: '供水业务', value: '1' },
        { label: '供热业务', value: '2' },
        { label: '供电业务', value: '3' },
        { label: '污水业务', value: '4' },
        { label: '其他业务', value: '9' },
      ],
    },
    {
      label: '非直接经营业务', value: '9',
      children: [
        { label: '市场开发项目(渠道建设、资源维护)', value: '1' },
        { label: '创新项目', value: '2' },
        { label: '展览宣传项目', value: '3' },
        { label: '战略合作协议、备忘录等', value: '4' },
        { label: '其他非经营业务', value: '9' },
      ],
    },
  ]

  return <Form form={form} labelWrap={true} labelWidth={120}>
    <SchemaField>
      <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 2, strictAutoFit: true }}>
        <SchemaField.String name="taskCode" required title="任务号" x-decorator="FormItem" x-component="Input"/>
        <SchemaField.String name="projectName" required title="项目名称" x-decorator="FormItem" x-component="Input"/>
        <SchemaField.String
          name="projectProperty" required title="项目性质" x-decorator="FormItem" x-component="Select"
          enum={[
            { label: '一类', value: '1' },
            { label: '二类', value: '2' },
            { label: '三类', value: '3' },
          ]}
        />
        <SchemaField.String name="customerName" required title="客户名称" x-decorator="FormItem" x-component="Input"/>
        <SchemaField.String
          name="customerProperty" required title="客户企业性质" x-decorator="FormItem" x-component="Select"
          enum={[
            { label: '非经营业务下无单位', value: '0' },
            { label: '甲方国企', value: '1' },
            { label: '甲方民企', value: '2' },
          ]}
        />
        <SchemaField.String name="providerName" required title="战略伙伴名称" x-decorator="FormItem" x-component="Input"/>
        <SchemaField.String
          name="providerProperty" required title="战略伙伴性质" x-decorator="FormItem" x-component="Select"
          enum={[
            { label: '无合作方', value: '0' },
            { label: '合作方国企', value: '1' },
            { label: '合作方民企', value: '2' },
          ]}
        />
        <SchemaField.String
          name="businessTypeList" required title="业务类别" x-decorator="FormItem" x-component="Cascader"
          enum={optionArr}
        />
      </SchemaField.Void>
    </SchemaField>
  </Form>
}

