import {
  DatePicker,
  Form,
  FormButtonGroup,
  FormDialog,
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
import { Button, ConfigProvider, message, Tabs } from 'antd'
import { session, contextPath } from '../../utils'
import DialogList from './DialogList'
import { LoadingButton, File } from '../../components'
import { onFieldReact } from '@formily/core'
import ProcessDesignGraph from '../ProcessDesignGraph'
import ProcessInstNodeList from '../ProcessInstNode/List'

const SchemaField = createSchemaField({
  components: {
    FormItem, FormLayout, Input, DatePicker, Radio, FormGrid, Select, File,
  },
})


export default (props) => {
  let { form, type, record } = props

  return <ConfigProvider locale={zhCN}>
    <Tabs animated={false} size={'small'}>
      <Tabs.TabPane tab="表单数据" key="1">
        <Form form={form} labelWidth={130}>
          <SchemaField>
            <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 3, strictAutoFit: true }}>
              <SchemaField.String name="displayName" title="申请人" x-component="Input" x-decorator="FormItem"/>
              <SchemaField.String name="deptName" title="申请部门" x-component="Input" x-decorator="FormItem"/>
              <SchemaField.String name="createDatetime" title="申请时间" x-decorator="FormItem" x-component="Input"/>
              <SchemaField.String
                name="displayNamee" required title="被授权人" x-decorator="FormItem"
                x-component="Select" x-component-props={{ showSearch: true }}
                enum={session.getItem('userList')}/>
              <SchemaField.String name="deptNamee" title="所在部门" x-decorator="FormItem" x-component="Input"/>
              <SchemaField.String
                name="job" required title="职务" x-decorator="FormItem" x-component="Input"
              />
              <SchemaField.String
                name="descc" required title="申请事项及权限" x-component="Input.TextArea"
                x-component-props={{ rows: 2 }} x-decorator="FormItem" x-decorator-props={{ gridSpan: 2 }}/>
              <SchemaField.String
                name="timeLimitTmp" required title="申请期限"
                x-component="DatePicker.RangePicker"
                // x-component-props={{ format: 'YYYY年MM月DD日' }}
                x-decorator="FormItem" x-decorator-props={{ tooltip: '双击鼠标进行选择', gridSpan: 2 }}
              />
              <SchemaField.String name="code" title="授权号" x-component="Input" x-decorator="FormItem"/>
            </SchemaField.Void>
            <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 3, strictAutoFit: true }}>
              <SchemaField.String name="fileList" required title="授权委托书" x-decorator="FormItem" x-component="File"/>
            </SchemaField.Void>
            <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 3, strictAutoFit: true }}>
              <SchemaField.String
                name="userNamee" required title="业务归口部门" x-decorator="FormItem"
                x-decorator-props={{ tooltip: '流程审批节点' }}
                x-component="Select" x-component-props={{ showSearch: true }}
                enum={session.getItem('userList')}
              />
            </SchemaField.Void>
            <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 3, strictAutoFit: true }}>
              <SchemaField.String
                name="endType" required title="授权人意见" x-decorator="FormItem" x-component="Radio.Group"
                x-decorator-props={{ tooltip: '流程的最后一个审批节点', gridSpan: 2 }}
                enum={[
                  { label: '业务主管领导', value: '业务主管领导' },
                  { label: '董事长', value: '董事长' },
                ]}
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

