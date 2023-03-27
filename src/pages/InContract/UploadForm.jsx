import { Form, FormItem } from '@formily/antd'
import { createSchemaField } from '@formily/react'
import { File } from '../../components'
import styles from '../table-placeholder.less'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import React from 'react'

const SchemaField = createSchemaField({
  components: {
    FormItem, File,
  },
})

export default (props) => {
  let { form, type } = props

  return <ConfigProvider locale={zhCN}>
    <Form form={form} className={styles.placeholder}>
      <SchemaField>
        <SchemaField.String name="fileList" required title="附件" x-decorator="FormItem" x-component="File"/>
      </SchemaField>
    </Form>
  </ConfigProvider>
}


