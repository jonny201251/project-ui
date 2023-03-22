import {
  ArrayTable,
  Checkbox,
  DatePicker,
  Form,
  FormGrid,
  FormItem,
  FormLayout,
  Input,
  Radio,
  Select,
} from '@formily/antd'
import { createSchemaField } from '@formily/react'
import React, { useEffect } from 'react'
import zhCN from 'antd/lib/locale/zh_CN'
import { ConfigProvider, Divider } from 'antd'
import { get, projectCodePath, session } from '../../utils'
import { ArrayTableAddition, ArrayTableIndex, ArrayTableRemove, MyCard, NumberPicker } from '../../components'
import styles from '../table-placeholder.less'


const SchemaField = createSchemaField({
  components: {
    FormItem, FormLayout, Input, DatePicker, Radio, FormGrid, NumberPicker, Checkbox,
    Select, ArrayTable, ArrayTableIndex, ArrayTableRemove, ArrayTableAddition,
    MyCard, Divider,
  },
})


export default (props) => {
  let { form, type } = props

  useEffect(async () => {
    form.query('*(displayName,deptName,createDatetime,wbs)').forEach(field => {
      field.setPattern('disabled')
    })
    if (type === 'add') {
      const user = session.getItem('user')
      form.setInitialValues({
        createDatetime: new Date().Format('yyyy-MM-dd hh:mm:ss'),
        displayName: user.displayName, displayNamee: user.displayName, loginName: user.loginName,
        deptId: user.deptId, deptName: user.deptName,
      })
    }
    const data = await get(projectCodePath.getLabelValue)
    if (data) {
      form.query('taskCode').take().setDataSource(data)
    }
  }, [])

  return <ConfigProvider locale={zhCN}>
    <Form form={form} labelWidth={110} className={styles.placeholder}>
      <SchemaField>
        <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 4, strictAutoFit: true }}>
          <SchemaField.String name="displayName" title="创建人" x-component="Input" x-decorator="FormItem"/>
          <SchemaField.String name="deptName" title="创建部门" x-component="Input" x-decorator="FormItem"/>
          <SchemaField.String name="createDatetime" title="创建时间" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="wbs" title="WBS编号" x-component="Input" x-decorator="FormItem"/>
          <SchemaField.String name="name" required title="项目名称" x-decorator="FormItem"
                              x-component="Input" x-decorator-props={{ gridSpan: 3 }}/>
          <SchemaField.String name="taskCode" required title="任务号" x-decorator="FormItem" x-component="Select"/>
          <SchemaField.String
            name="property" required title="项目性质" x-decorator="FormItem" x-component="Select"
            enum={[
              { label: '一类', value: '一类' },
              { label: '二类', value: '二类' },
              { label: '三类', value: '三类' },
            ]}
          />
          <SchemaField.String
            name="projectRate" required title="项目毛利率" x-decorator="FormItem" x-component="Input"
            x-component-props={{ placeholder: '示例：3%' }}/>
          <SchemaField.String
            name="projectStatus" title="项目状态" x-decorator="FormItem"
            x-component="Select" x-component-props={{ showSearch: true }}
            enum={[
              { label: '中标', value: '中标' },
              { label: '未中标', value: '未中标' },
              { label: '终止', value: '终止' },
            ]}/>
        </SchemaField.Void>
        <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 4, strictAutoFit: true }}>
          <SchemaField.String
            name="location" required title="项目地点" x-decorator="FormItem"
            x-component="Input" x-decorator-props={{ gridSpan: 2 }}
          />
        </SchemaField.Void>
        <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 4, strictAutoFit: true }}>
          <SchemaField.String
            name="remark" title="备注" x-component="Input.TextArea"
            x-decorator-props={{ gridSpan: 2 }}
            x-component-props={{ rows: 2 }} x-decorator="FormItem"/>
        </SchemaField.Void>
      </SchemaField>
    </Form>
  </ConfigProvider>
}

