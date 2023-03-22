import { DatePicker, Form, FormButtonGroup, FormDialog, FormGrid, FormItem, FormLayout, Input } from '@formily/antd'
import { createSchemaField } from '@formily/react'
import React, { useEffect } from 'react'
import { Button, ConfigProvider, message, Tabs } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { session } from '../../utils'
import zhCN from 'antd/lib/locale/zh_CN'
import styles from '../table-placeholder.less'
import DialogList from './DialogList'
import { File, LoadingButton,InputButton } from '../../components'
import ProcessDesignGraph from '../ProcessDesignGraph'
import ProcessInstNodeList from '../ProcessInstNode/List'

const SchemaField = createSchemaField({
  components: {
    FormLayout, FormItem, FormGrid, Input, InputButton,
    DatePicker, File,
  },
})

export default (props) => {
  let { form, type, record, haveEditForm } = props

  useEffect(async () => {
    if (haveEditForm === '否') {
      form.setPattern('disabled')
      form.query('comment').take()?.setPattern('editable')
    }
  }, [])

  const onClick = (flag) => {
    if (flag === 'open') {
      if (haveEditForm === '否') {
        return
      }
      let dialog2 = FormDialog({ footer: null, keyboard: false, maskClosable: false, width: 800 },
        (form2) => {
          return <>
            <DialogList form={form2} dialog={dialog2} selectedId={form.values.customerId}/>
            <FormDialog.Footer>
              <FormButtonGroup gutter={16} align={'right'}>
                <Button onClick={() => dialog2.close()}>取消</Button>
                <LoadingButton
                  onClick={async () => {
                    const values = await form2.submit()
                    if (values.selectedRow) {
                      form.setValues({
                        providerId: values.selectedRow.providerId,
                        usee: values.selectedRow.usee,
                        name: values.selectedRow.name,
                        property: values.selectedRow.property,
                        address: values.selectedRow.address,
                        registerMoney: values.selectedRow.registerMoney,
                      })
                      dialog2.close()
                    } else {
                      message.error('选择一条数据')
                    }
                  }}
                  type={'primary'}
                >
                  确定
                </LoadingButton>
              </FormButtonGroup>
            </FormDialog.Footer>
          </>
        },
      )
      dialog2.open({})
    }
  }

  const showComment = () => {
    if (type === 'check') {
      return <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 2, strictAutoFit: true }}>
        <SchemaField.String
          name="comment" title="审批意见" x-decorator="FormItem"
          x-component="Input.TextArea" x-component-props={{ placeholder: '请输入意见' }}
        />
      </SchemaField.Void>
    }
  }

  return <ConfigProvider locale={zhCN}>
    <Tabs animated={false} size={'small'}>
      <Tabs.TabPane tab="表单数据" key="1">
        <Form form={form} labelWidth={110} className={styles.placeholder}>
          <SchemaField>
            <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 3, strictAutoFit: true }}>
              <SchemaField.String name="displayName" title="申请人" x-component="Input" x-decorator="FormItem"/>
              <SchemaField.String name="deptName" title="申请部门" x-component="Input" x-decorator="FormItem"/>
              <SchemaField.String name="createDatetime" title="申请时间" x-decorator="FormItem" x-component="Input"/>
              <SchemaField.String
                name="name" required title="供方名称" x-decorator="FormItem" x-decorator-props={{ gridSpan: 2 }}
                x-component="InputButton" x-component-props={{ onClick: onClick }}/>
              <SchemaField.String name="usee" title="供方用途" x-decorator="FormItem" x-component="Input"/>
              <SchemaField.String
                required
                name="descc" title="变动说明" x-decorator="FormItem" x-component="Input.TextArea"
                x-component-props={{
                  rows: 3,
                  placeholder: '合格供方情况变动说明',
                }}
                x-decorator-props={{ gridSpan: 3 }}/>
              <SchemaField.String
                name="fileList" title="附件" x-decorator="FormItem"
                x-component="File" x-decorator-props={{ gridSpan: 2 }}/>
            </SchemaField.Void>
            {showComment()}
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

