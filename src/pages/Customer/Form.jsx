import { Form, FormItem, FormLayout, Input, Select } from '@formily/antd'
import { createSchemaField } from '@formily/react'
import React, { useEffect } from 'react'
import { NumberPicker,File } from '../../components'

const SchemaField = createSchemaField({
  components: { FormLayout, FormItem, Input, NumberPicker, Select,File },
})

export default (props) => {
  let { form, record } = props

  useEffect(() => {
    if (record) {
      form.setValues(record)
    }
  }, [])

  return <Form form={form}>
    <SchemaField>
      <SchemaField.Void x-component="FormLayout" x-component-props={{ labelCol: 6, wrapperCol: 16 }}>
        <SchemaField.String name="name" required title="客户名称" x-decorator="FormItem" x-component="Input"/>
        <SchemaField.String
          name="property" required title="客户企业性质" x-decorator="FormItem" x-component="Select"
          enum={[
            { label: '事业单位', value: '事业单位' },
            { label: '国有企业', value: '国有企业' },
            { label: '民营企业', value: '民营企业' },
            { label: '外资合资', value: '外资合资' },
            { label: '个体经营', value: '个体经营' },
            { label: '其他', value: '其他' },
          ]}
        />
        <SchemaField.String
          name="address" required title="注册地址" x-decorator="FormItem"
          x-component="Input.TextArea"
          x-component-props={{ rows: 2 }}
        />
        <SchemaField.String name="code" required title="纳税人识别号" x-decorator="FormItem" x-component="Input"/>
        <SchemaField.Number
          name="registerMoney" required title="注册资本" x-decorator="FormItem" x-component="NumberPicker"/>
        <SchemaField.Number name="realMoney" title="实缴资本" x-decorator="FormItem" x-component="NumberPicker"/>
        <SchemaField.String
          name="fileList" required title="附件" x-decorator="FormItem" x-component="File"
          x-decorator-props={{
            feedbackText: '上传 营业执照、法人信息',
            labelCol: 6,
            wrapperCol: 10,
          }}
        />
        <SchemaField.String
          name="remark" title="备注" x-decorator="FormItem"
          x-component="Input.TextArea"
          x-component-props={{ rows: 2 }}
        />
      </SchemaField.Void>
    </SchemaField>
  </Form>
}

