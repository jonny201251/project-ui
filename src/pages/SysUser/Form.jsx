import { useEffect } from 'react'
import { Form, FormItem, FormLayout, Input, Radio, TreeSelect } from '@formily/antd'
import { createSchemaField } from '@formily/react'
import { get,sysDeptPath } from '../../utils'


const SchemaField = createSchemaField({
  components: { FormLayout, FormItem, Input, Radio, TreeSelect },
})

export default (props) => {
  let { form, record } = props

  useEffect(async () => {
    const data = await get(sysDeptPath.getTreeSelect)
    if (data) {
      form.query('deptId').take().dataSource = data
    }
    if (record) {
      form.setValues(record)
    }
  }, [])

  return <Form form={form}>
    <SchemaField>
      <SchemaField.Void x-component="FormLayout" x-component-props={{ labelCol: 6, wrapperCol: 16 }}>
        <SchemaField.String name="loginName" required title="登录账号" x-decorator="FormItem" x-component="Input"/>
        <SchemaField.String name="displayName" required title="用户姓名" x-decorator="FormItem" x-component="Input"/>
        <SchemaField.Number
          name="deptId"
          required
          title="所在部门"
          x-decorator="FormItem"
          x-component="TreeSelect"
          x-component-props={{
            treeDefaultExpandAll: true,
            onSelect: (value, node, extra) => {
              form.setValues({ deptName: node.title })
            },
          }}
        />
        <SchemaField.String
          name="gender" required title="性别" x-decorator="FormItem"
          x-component="Radio.Group"
          enum={[
            { label: '男', value: '男' },
            { label: '女', value: '女' },
          ]}
        />
        <SchemaField.String
          name="status" required title="状态" x-decorator="FormItem"
          x-component="Radio.Group"
          enum={[
            { label: '启用', value: '启用' },
            { label: '禁用', value: '禁用' },
          ]}
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

