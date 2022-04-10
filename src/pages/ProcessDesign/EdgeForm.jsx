import { Form, FormItem, FormLayout, Input, Radio } from '@formily/antd'
import { createSchemaField } from '@formily/react'
import React, { useEffect } from 'react'
import { NumberPicker } from '../../components'

const SchemaField = createSchemaField({
  components: { FormLayout, FormItem, Input, Radio, NumberPicker },
})

export default (props) => {
  let { form, edge, data } = props

  useEffect(() => {
    form.reset()
    form.query('*(edgeId,sourceTaskKey,targetTaskKey)').map(field => field.pattern = 'disabled')
    if (data) {
      form.setInitialValues(data)
    } else {
      form.setInitialValues({
        edgeId: edge.id,
        sourceTaskKey: edge.sourceNodeId,
        targetTaskKey: edge.targetNodeId,
        direction: '提交',
      })
    }
  }, [])

  const renderItem = () => {
    if (edge.sourceNodeId.indexOf('ExclusiveGateway') === 0) {
      return <>
        <SchemaField.String
          name="javaVarName" required title="Java变量名称" x-decorator="FormItem"
          x-component="Input"
          x-component-props={{ placeholder: '英文逗号隔开' }}
        />
        <SchemaField.String
          name="conditionExpression" required title="条件表达式" x-decorator="FormItem"
          x-component="Input"
          x-component-props={{ placeholder: 'money>=10 && money<=20' }}
        />
      </>
    } else {
      return <>
        <SchemaField.String name="buttonName" required title="按钮名称" x-decorator="FormItem" x-component="Input"/>
        <SchemaField.Number
          name="buttonSort" required title="按钮排序" x-decorator="FormItem" x-component="NumberPicker"
          minimum={0} maximum={10}
        />
      </>
    }
  }

  return <Form form={form}>
    <SchemaField>
      <SchemaField.Void x-component="FormLayout" x-component-props={{ labelCol: 6, wrapperCol: 16 }}>
        <SchemaField.String name="edgeId" required title="连线标识" x-decorator="FormItem" x-component="Input"/>
        <SchemaField.String name="edgeName" title="连线名称" x-decorator="FormItem" x-component="Input"/>
        <SchemaField.String name="sourceTaskKey" required title="起始节点" x-decorator="FormItem" x-component="Input"/>
        <SchemaField.String name="targetTaskKey" required title="目标节点" x-decorator="FormItem" x-component="Input"/>
        <SchemaField.String
          name="direction" required title="流程方向" x-decorator="FormItem"
          x-component="Radio.Group"
          enum={[
            { label: '退回', value: '退回' },
            { label: '提交', value: '提交' },
          ]}
        />
        {renderItem()}
        <SchemaField.String
          name="remark" title="备注" x-decorator="FormItem"
          x-component="Input.TextArea"
          x-component-props={{ rows: 2 }}
        />
      </SchemaField.Void>
    </SchemaField>
  </Form>
}

