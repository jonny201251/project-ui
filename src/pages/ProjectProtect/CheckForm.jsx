import { DatePicker, Form, FormButtonGroup, FormDialog, FormGrid, FormItem, FormLayout, Input } from '@formily/antd'
import { createSchemaField } from '@formily/react'
import React, { useEffect } from 'react'
import { Button, ConfigProvider, message, Select, Tabs } from 'antd'
import { session } from '../../utils'
import zhCN from 'antd/lib/locale/zh_CN'
import styles from '../table-placeholder.less'
import DialogList from './DialogList'
import { File, InputButton, LoadingButton,NumberPicker } from '../../components'
import ProcessDesignGraph from '../ProcessDesignGraph'
import ProcessInstNodeList from '../ProcessInstNode/List'


const SchemaField = createSchemaField({
  components: {
    FormLayout, FormItem, FormGrid, Input, InputButton,
    DatePicker, File, Select,NumberPicker
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
      let dialog2 = FormDialog({ footer: null, keyboard: false, maskClosable: false, width: 950 },
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
                        projectId: values.selectedRow.id,
                        type: values.selectedRow.projectType,
                        name: values.selectedRow.name,
                        taskCode: values.selectedRow.taskCode,
                        property: values.selectedRow.property,
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
                name="name" required title="项目名称" x-decorator="FormItem" x-decorator-props={{ gridSpan: 2 }}
                x-component="InputButton" x-component-props={{ onClick: onClick }}/>
              <SchemaField.String name="taskCode" title="任务号" x-decorator="FormItem" x-component="Input"/>
              <SchemaField.String name="property" x-decorator="FormItem" title="项目性质" x-component="Input"/>
              <SchemaField.String
                name="status" required title="项目状态" x-decorator="FormItem"
                x-component="Select" x-component-props={{ showSearch: true }}
                enum={[
                  { label: '投标中', value: '投标中' },
                  { label: '中标', value: '中标' },
                  { label: '未中标', value: '未中标' },
                  { label: '终止', value: '终止' },
                ]}/>
              />
            </SchemaField.Void>
            <SchemaField.Void x-component="MyCard" x-component-props={{ title: '收付款信息' }}>
              <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 3, strictAutoFit: true }}>
                <SchemaField.String name="registeDate" required x-decorator="FormItem" title="日期"
                                    x-component="DatePicker"/>
                <SchemaField.Number name="money" required x-decorator="FormItem" title="金额"
                                    x-component="NumberPicker"
                                    x-component-props={{
                                      addonAfter: '元',
                                      formatter: (value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                                    }}
                />
              </SchemaField.Void>
              <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 3, strictAutoFit: true }}>
                <SchemaField.String
                  name="outName" title="付款单位" x-component="Input"
                  x-decorator="FormItem" x-decorator-props={{ gridSpan: 2 }}
                />
                <SchemaField.String
                  name="inName" title="收款单位" x-component="Input"
                  x-decorator="FormItem" x-decorator-props={{ gridSpan: 2 }}
                />
              </SchemaField.Void>
            </SchemaField.Void>
            <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 3, strictAutoFit: true }}>
              <SchemaField.String
                name="remark" title="备注" x-component="Input.TextArea"
                x-component-props={{ rows: 2 }} x-decorator="FormItem"
                x-decorator-props={{ gridSpan: 2 }}
              />
            </SchemaField.Void>
          </SchemaField>
        </Form>
      </Tabs.TabPane>
      <Tabs.TabPane tab="审批记录" key="3">
        <ProcessInstNodeList processInstId={record.processInstId}/>
      </Tabs.TabPane>
      <Tabs.TabPane tab="流程图" key="2">
        <ProcessDesignGraph processInstId={record.processInstId}/>
      </Tabs.TabPane>
    </Tabs>
  </ConfigProvider>
}

