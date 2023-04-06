import { Form, FormItem, FormLayout, Input, Select } from '@formily/antd'
import { createSchemaField } from '@formily/react'
import React, { useEffect } from 'react'
import { NumberPicker, File } from '../../components'

const SchemaField = createSchemaField({
  components: { FormLayout, FormItem, Input, NumberPicker, Select, File },
})

export default (props) => {
  let { form, record, type } = props

  useEffect(() => {
  }, [])

  const show = () => {
    if (type === 'view') {
      return <SchemaField.String name="result" required title="结论" x-decorator="FormItem" x-component="Input"/>
    }
  }

  return <Form form={form}>
    <SchemaField>
      <SchemaField.Void x-component="FormLayout" x-component-props={{ labelCol: 6, wrapperCol: 16 }}>
        <SchemaField.String
          name="usee" required title="供方用途" x-decorator="FormItem" x-component="Select"
          enum={[
            { label: '一般项目立项时(三类)', value: '一般项目立项时(三类)' },
            { label: '一般项目立项后(其他方)', value: '一般项目立项后(其他方)' },
            { label: '重大项目立项时(三类)', value: '重大项目立项时(三类)' },
            { label: '重大项目立项后(其他方)', value: '重大项目立项后(其他方)' },
          ]}
          x-decorator-props={{ tooltip: '三类:渠道方，其他方:采购方、施工方' }}
        />
        <SchemaField.String name="name" required title="供方名称" x-decorator="FormItem" x-component="Input"/>
        <SchemaField.String
          name="property" required title="供方企业性质" x-decorator="FormItem" x-component="Select"
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
        <SchemaField.Number name="registerMoney" required title="注册资本" x-decorator="FormItem"
                            x-component="NumberPicker"/>
        <SchemaField.Number name="realMoney" title="实缴资本" x-decorator="FormItem" x-component="NumberPicker"/>
        {show()}
        <SchemaField.String
          name="fileList" required title="附件" x-decorator="FormItem" x-component="File"
          x-decorator-props={{
            feedbackText: '上传 营业执照、法人信息、法人授权书',
          }}
          // x-decorator-props={{ tooltip: '营业执照、法人信息'}}
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

