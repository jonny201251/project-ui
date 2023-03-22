import {
  DatePicker,
  Form,
  FormButtonGroup,
  FormDialog,
  FormGrid,
  FormItem,
  FormLayout,
  Input,
  Select,
} from '@formily/antd'
import { createSchemaField } from '@formily/react'
import React, { useEffect } from 'react'
import { Button, ConfigProvider, message } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { session } from '../../utils'
import zhCN from 'antd/lib/locale/zh_CN'
import styles from '../table-placeholder.less'
import DialogList from './DialogList'
import { File, LoadingButton,InputButton } from '../../components'

const SchemaField = createSchemaField({
  components: {
    FormLayout, FormItem, FormGrid, Input, InputButton,
    DatePicker, File, Select,
  },
})

export default (props) => {
  let { form, type } = props

  useEffect(async () => {
    form.query('*(displayName,deptName,createDatetime)').forEach(field => {
      field.setPattern('disabled')
    })
  }, [])

  return <ConfigProvider locale={zhCN}>
    <Form form={form} labelWidth={110} className={styles.placeholder}>
      <SchemaField>
        <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 3, strictAutoFit: true }}>
          <SchemaField.String
            name="comment" title="变更说明" required x-decorator="FormItem" x-decorator-props={{ gridSpan: 3 }}
            x-component="Input.TextArea"
          />
          <SchemaField.String name="displayName" title="申请人" x-component="Input" x-decorator="FormItem"/>
          <SchemaField.String name="deptName" title="申请部门" x-component="Input" x-decorator="FormItem"/>
          <SchemaField.String name="createDatetime" title="申请时间" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String
            name="name" required title="供方名称" x-decorator="FormItem" x-decorator-props={{ gridSpan: 2 }}
            x-component="Input"/>
          <SchemaField.String name="queryDate" required title="考察时间" x-decorator="FormItem" x-component="DatePicker"/>
          <SchemaField.String
            name="scale" title="企业规模" x-decorator="FormItem" x-component="Input.TextArea"
            x-component-props={{
              rows: 3,
              placeholder: '人员总数，技术人员比例，各专业人员比例，考察办公区域规模，办公面积、在当地行业的影响力等。组织架构、经营机制。每年的业务量（合同金额）；现阶段的任务量，正在做设计的项目有哪些？',
            }}
            x-decorator-props={{ gridSpan: 3 }}/>
          <SchemaField.String
            name="achievement" title="近年主要业绩" x-decorator="FormItem" x-component="Input.TextArea"
            x-component-props={{ rows: 2, placeholder: '是否有与本项目同类工程的业绩？' }}
            x-decorator-props={{ gridSpan: 3 }}/>
          <SchemaField.String
            name="quality" title="质量管理现状" x-decorator="FormItem" x-component="Input.TextArea"
            x-component-props={{ rows: 2, placeholder: '要求说明质量管理体系运行情况。' }}
            x-decorator-props={{ gridSpan: 3 }}/>
          <SchemaField.String
            name="product" title="生产检测条件" x-decorator="FormItem" x-component="Input.TextArea"
            x-component-props={{ rows: 2, placeholder: '要求说明生产检测条件实施情况。' }}
            x-decorator-props={{ gridSpan: 3 }}/>
          <SchemaField.String
            name="descc" title="业绩现场考察" x-decorator="FormItem" x-component="Input.TextArea"
            x-component-props={{ rows: 2, placeholder: '施工组织设计。' }}
            x-decorator-props={{ gridSpan: 3 }}/>
          <SchemaField.String
            name="service" title="后期服务" x-decorator="FormItem" x-component="Input.TextArea"
            x-component-props={{ rows: 2, placeholder: '如何保证招标项目的全程服务。' }}
            x-decorator-props={{ gridSpan: 3 }}/>
          <SchemaField.String
            name="fileList" title="附件" x-decorator="FormItem"
            x-component="File" x-decorator-props={{ gridSpan: 2 }}/>
          <SchemaField.String
            name="userNameeList" required title="尽职调查" x-decorator="FormItem"
            x-decorator-props={{ gridSpan: 2, tooltip: '流程审批节点' }}
            x-component="Select" x-component-props={{ showSearch: true, mode: 'multiple' }}
            enum={session.getItem('userList')}
          />
        </SchemaField.Void>
      </SchemaField>
    </Form>
  </ConfigProvider>
}

