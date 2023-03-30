import { Form, FormItem, FormLayout, Input, NumberPicker, TreeSelect } from '@formily/antd'
import { createSchemaField } from '@formily/react'
import React, { useEffect } from 'react'
import { get, sysDeptPath } from '../../utils'

const SchemaField = createSchemaField({
  components: { FormLayout, FormItem, Input, TreeSelect, NumberPicker },
})

export default (props) => {
  let { form, record } = props

  useEffect(async () => {
    const data = await get(sysDeptPath.getTreeSelect)
    if (data) {
      form.query('pid').take().dataSource = data
    }
    if (record) {
      form.setValues(record)
    }
  }, [])

  return <Form form={form}>
    <SchemaField>
      <SchemaField.Void x-component="FormLayout" x-component-props={{ labelCol: 6, wrapperCol: 16 }}>
        <SchemaField.Number
          name="pid" required title="上级部门" x-decorator="FormItem"
          x-component="TreeSelect" x-component-props={{ treeDefaultExpandAll: true }}/>
        <SchemaField.String name="name" title="部门名称" x-decorator="FormItem" x-component="Input"/>
        <SchemaField.String name="type" required title="部门类别" x-decorator="FormItem" x-component="Input"/>
        <SchemaField.Number name="sort" x-decorator="FormItem" title="排序" x-component="NumberPicker"/>
      </SchemaField.Void>
    </SchemaField>
  </Form>
}

