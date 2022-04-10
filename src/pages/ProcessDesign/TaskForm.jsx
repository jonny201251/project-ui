import React, { useEffect, useState } from 'react'
import { ArrayTable, Form, FormItem, FormLayout, Input, Radio, SelectTable, PreviewText } from '@formily/antd'
import { createSchemaField } from '@formily/react'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import { onFieldReact } from '@formily/core'
import { ArrayTableAddition, ArrayTableIndex, ArrayTableRemove, NumberPicker } from '../../components'
import styles from '../table-placeholder.less'

const SchemaField = createSchemaField({
  components: {
    FormLayout, FormItem, Input, Radio, SelectTable, ArrayTable,
    ArrayTableIndex, ArrayTableAddition, ArrayTableRemove, PreviewText,
    NumberPicker,
  },
})

export default (props) => {
  let { form, node, data, roleList, userList } = props

  const [type, setType] = useState()

  useEffect(async () => {
    form.reset()
    form.query('*(taskType,taskKey)').map(field => field.pattern = 'disabled')
    if (data) {
      form.setInitialValues(data)
    } else {
      form.setInitialValues({
        type: '角色',
        taskType: node.type, taskKey: node.id, taskName: (node.text && node.text.value) || '',
        haveEditForm: '否',
        haveBackFirst: '是',
      })
    }
  }, [])

  form.addEffects('id', () => {
    onFieldReact('type', (field) => {
      setType(field.value)
      let typeIdList = field.query('typeIdList').take()
      if (typeIdList) {
        typeIdList.reset()
        if (field.value === '角色') {
          typeIdList.dataSource = roleList
        } else {
          typeIdList.dataSource = userList
        }
      }
    })
  })

  const showHandleItem = () => {
    if (type === '角色') {
      return <SchemaField.Object>
        <SchemaField.Void
          name="name"
          title="名称"
          x-component="SelectTable.Column"
        />
      </SchemaField.Object>
    } else if (type === '用户') {
      return <SchemaField.Object>
        <SchemaField.Void
          name="loginName"
          title="登录账号"
          x-component="SelectTable.Column"
        />
        <SchemaField.Void
          name="displayName"
          title="用户姓名"
          x-component="SelectTable.Column"
        />
        <SchemaField.Void
          name="deptName"
          title="所在部门"
          x-component="SelectTable.Column"
        />
      </SchemaField.Object>
    }
  }

  return <ConfigProvider locale={zhCN}>
    <Form form={form} className={styles.placeholder}>
      <SchemaField>
        <SchemaField.Void x-component="FormLayout" x-component-props={{ labelCol: 4, wrapperCol: 18 }}>
          <SchemaField.String name="taskType" required title="任务类型" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="taskKey" required title="任务标识" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="taskName" required title="任务名称" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String
            name="type" required title="处理类型" x-decorator="FormItem"
            x-component="Radio.Group"
            enum={[
              { label: '角色', value: '角色' },
              { label: '用户', value: '用户' },
            ]}
          />
          <SchemaField.Array
            type="array" title="处理人员"
            required name="typeIdList" x-decorator="FormItem"
            x-component="SelectTable"
            x-component-props={{
              size: 'small',
              primaryKey: 'id',
              showSearch: true,
              style: { marginBottom: -42 },
            }}
            enum={[]}
          >
            {showHandleItem()}
          </SchemaField.Array>
          <SchemaField.String
            name="haveEditForm" required title="允许修改表单" x-decorator="FormItem"
            x-component="Radio.Group"
            enum={[
              { label: '是', value: '是' },
              { label: '否', value: '否' },
            ]}
          />
        </SchemaField.Void>
        <SchemaField.Array
          name="jumpList" x-decorator="FormItem" x-component="ArrayTable"
          x-component-props={{ size: 'small', title: () => '跳转节点' }}
        >
          <SchemaField.Object>
            <SchemaField.Void
              x-component="ArrayTable.Column"
              x-component-props={{ width: 90, title: '流程方向', dataIndex: 'direction' }}
            >
              <SchemaField.String
                name="direction" required x-decorator="FormItem"
                x-component="Radio.Group"
                enum={[
                  { label: '退回', value: '退回' },
                  { label: '提交', value: '提交' },
                ]}
              />
            </SchemaField.Void>
            <SchemaField.Void x-component="ArrayTable.Column"
                              x-component-props={{ title: '起始节点', dataIndex: 'sourceTaskKey' }}>
              <SchemaField.String
                name="sourceTaskKey" required x-decorator="FormItem" x-component="PreviewText.Input"
                default={node.id}
              />
            </SchemaField.Void>
            <SchemaField.Void x-component="ArrayTable.Column"
                              x-component-props={{ title: '目标节点', dataIndex: 'targetTaskKey' }}>
              <SchemaField.String name="targetTaskKey" required x-decorator="FormItem" x-component="Input"/>
            </SchemaField.Void>
            <SchemaField.Void x-component="ArrayTable.Column"
                              x-component-props={{ title: '按钮名称', dataIndex: 'buttonName' }}>
              <SchemaField.String name="buttonName" required x-decorator="FormItem" x-component="Input"/>
            </SchemaField.Void>
            <SchemaField.Void x-component="ArrayTable.Column"
                              x-component-props={{ width: 80, title: '按钮排序', dataIndex: 'buttonSort' }}>
              <SchemaField.Number
                name="buttonSort" required x-decorator="FormItem" x-component="NumberPicker"
                minimum={0} maximum={10}
              />
            </SchemaField.Void>
            <SchemaField.Void
              x-component="ArrayTable.Column" x-component-props={{ width: 50, title: '操作', dataIndex: 'operations' }}
            >
              <SchemaField.Void x-component="FormItem">
                <SchemaField.Void x-component="ArrayTableRemove"/>
              </SchemaField.Void>
            </SchemaField.Void>
          </SchemaField.Object>
          <SchemaField.Void
            x-component="ArrayTableAddition"
            x-component-props={{ width: 80 }}
          />
        </SchemaField.Array>
      </SchemaField>
    </Form>
  </ConfigProvider>
}

