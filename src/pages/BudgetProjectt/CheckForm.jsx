import {
  ArrayTable,
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
import { Button, ConfigProvider, message, Tabs } from 'antd'
import { session } from '../../utils'
import zhCN from 'antd/lib/locale/zh_CN'
import styles from '../table-placeholder.less'
import DialogList from '../SmallBudgetIn/DialogList'
import {
  ArrayTableAddition,
  ArrayTableIndex,
  ArrayTableRemove,
  File,
  InputButton,
  LoadingButton,
  NumberPicker
} from '../../components'
import ProcessDesignGraph from '../ProcessDesignGraph'
import ProcessInstNodeList from '../ProcessInstNode/List'
import { onFieldReact } from '@formily/core'


const SchemaField = createSchemaField({
  components: {
    FormLayout, FormItem, FormGrid, Input, InputButton,NumberPicker,
    DatePicker, File, Radio, Select, ArrayTable, ArrayTableAddition, ArrayTableIndex, ArrayTableRemove,
  },
})

export default (props) => {
  let { form, type, record, haveEditForm } = props

  useEffect(async () => {
    if (haveEditForm === '否') {
      form.setPattern('readOnly')
      form.query('comment').take()?.setPattern('editable')
      form.query('haveThree').take()?.setPattern('editable')
    }
  }, [])

  const onClick = (flag) => {
    if (type === 'check') return
    if (flag === 'open') {
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
                        id: values.selectedRow.id,
                        projectId: values.selectedRow.projectId,
                        projectType: values.selectedRow.projectType,
                        name: values.selectedRow.name,
                        taskCode: values.selectedRow.taskCode,
                        version: values.selectedRow.version,
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


  form.addEffects('id', () => {
    onFieldReact('innList.*.money', (field) => {
      let sum = 0
      form.query('innList.*.money').forEach(field => {
        if (field.value) {
          sum += field.value
        }
      })
      let tmp = form.query('inSum').take()
      if (tmp && sum) {
        tmp.setState({ value: sum, pattern: 'disabled' })
      }
    })

    onFieldReact('outList.*.money', (field) => {
      let sum = 0
      form.query('outList.*.money').forEach(field => {
        if (field.value) {
          sum += field.value
        }
      })
      let tmp = form.query('outSum').take()
      if (tmp && sum) {
        tmp.setState({ value: sum, pattern: 'disabled' })
      }
    })


  })

  const showHaveThree = () => {
    const user = session.getItem('user')
    let projectType = form.getValuesIn('projectType')
    if (projectType === '重大项目' && user.displayName === '于欣坤')
      return <SchemaField.String
        name="haveThree" required title="三个审批" x-component="Radio.Group"
        x-decorator="FormItem" x-decorator-props={{ gridSpan: 2, tooltip: '财务总监、总经理、董事长审批' }}
        enum={[
          { label: '是', value: '是' },
          { label: '否', value: '否' },
        ]}
      />
  }

  const showComment = () => {
    if (type === 'check') {
      return <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 3, strictAutoFit: true }}>
        <SchemaField.String
          name="comment" title="审批意见" x-decorator="FormItem" x-decorator-props={{ gridSpan: 2 }}
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
              <SchemaField.String name="displayName" title="创建人" x-component="Input" x-decorator="FormItem"/>
              <SchemaField.String name="deptName" title="创建部门" x-component="Input" x-decorator="FormItem"/>
              <SchemaField.String name="createDatetime" title="创建时间" x-decorator="FormItem" x-component="Input"/>
              <SchemaField.String
                name="name" required title="项目名称" x-decorator="FormItem" x-decorator-props={{ gridSpan: 3 }}
                x-component="InputButton" x-component-props={{ onClick: onClick }}/>
              <SchemaField.String name="taskCode" title="任务号" x-decorator="FormItem" x-component="Input"/>
              <SchemaField.String name="property" x-decorator="FormItem" title="项目性质" x-component="Input"/>
              <SchemaField.String
                name="projectLoginName" required title="项目负责人" x-decorator="FormItem"
                x-component="Select" x-component-props={{ showSearch: true }}
                enum={session.getItem('userList')}/>
              />
              <SchemaField.String name="protectRate" required x-decorator="FormItem" title="质保金比例" x-component="Input"/>
              <SchemaField.String name="invoiceRate" required x-decorator="FormItem" title="税率" x-component="Input"/>
              <SchemaField.String name="projectRate" required x-decorator="FormItem" title="预计毛利率" x-component="Input"/>
              <SchemaField.String name="totalCost" x-decorator="FormItem" title="成本总预算" x-component="Input"/>
              <SchemaField.String name="startDate" required x-decorator="FormItem" title="开工日期"
                                  x-component="DatePicker"/>
              <SchemaField.String name="endDate" required x-decorator="FormItem" title="预计完工日期"
                                  x-component="DatePicker"/>
              <SchemaField.String name="endMoney" x-decorator="FormItem" title="结算金额" x-component="Input"/>
              <SchemaField.String name="inChangeMoney" x-decorator="FormItem" title="收入调整金额" x-component="Input"/>
              <SchemaField.String name="outChangeMoney" x-decorator="FormItem" title="支出调整金额" x-component="Input"/>
              <SchemaField.String name="contractCode" x-decorator="FormItem" title="合同编号" x-component="Input"/>
              <SchemaField.Number
                name="contractMoney" required x-decorator="FormItem" title="合同金额" x-component="NumberPicker"
                x-component-props={{
                  addonAfter: '元',
                  formatter: (value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                }}
              />
              <SchemaField.String
                name="contractName" required x-decorator="FormItem" title="合同名称"
                x-component="Input"
              />
              <SchemaField.String
                name="customerName" x-decorator="FormItem" title="客户名称"
                x-component="Input" x-decorator-props={{ gridSpan: 2 }}
              />
            </SchemaField.Void>
            <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 3, strictAutoFit: true }}>
              <SchemaField.String
                name="fileList" required title="附件" x-decorator="FormItem" x-component="File"
                x-decorator-props={{
                  gridSpan: 2,
                  feedbackText: '上传 预算表',
                }}
              />
              <SchemaField.String
                name="userNamee" required title="财务部" x-decorator="FormItem"
                x-decorator-props={{ gridSpan: 2, tooltip: '流程审批节点' }}
                x-component="Select" x-component-props={{ showSearch: true }}
                enum={session.getItem('userList')}
              />
              {showHaveThree()}
              <SchemaField.String
                x-decorator-props={{ gridSpan: 2 }}
                name="remark" title="备注" x-decorator="FormItem" x-component="Input.TextArea"
                x-component-props={{ rows: 2 }}
              />
            </SchemaField.Void>
            <SchemaField.Array
              name="protectList" x-decorator="FormItem" x-component="ArrayTable"
              x-component-props={{ size: 'small', sticky: true, title: () => (<b>{'担保'}</b>) }}
            >
              <SchemaField.Object>
                <SchemaField.Void
                  x-component="ArrayTable.Column"
                  x-component-props={{ width: 80, title: '排序', align: 'center' }}
                >
                  <SchemaField.Void x-decorator="FormItem" x-component="ArrayTable.SortHandle"/>
                </SchemaField.Void>
                <SchemaField.Void x-component="ArrayTable.Column" x-component-props={{ title: '名称', align: 'center' }}>
                  <SchemaField.String
                    name="name" x-decorator="FormItem" x-component="Select"
                    enum={[
                      { label: '投标保证金', value: '投标保证金' },
                      { label: '履约保证金', value: '履约保证金' },
                      { label: '预付款担保', value: '预付款担保' },
                      { label: '其他担保', value: '其他担保' },
                    ]}
                  />
                </SchemaField.Void>
                <SchemaField.Void x-component="ArrayTable.Column" x-component-props={{ title: '形式', align: 'center' }}>
                  <SchemaField.String
                    name="style" x-decorator="FormItem" x-component="Select"
                    enum={[
                      { label: '无', value: '无' },
                      { label: '保函', value: '保函' },
                    ]}
                  />
                </SchemaField.Void>
                <SchemaField.Void x-component="ArrayTable.Column" x-component-props={{ title: '金额', align: 'center' }}>
                  <SchemaField.Number
                    name="money" x-decorator="FormItem" x-component="NumberPicker"
                    x-component-props={{
                      addonAfter: '元',
                      formatter: (value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                    }}
                  />
                </SchemaField.Void>
                <SchemaField.Void x-component="ArrayTable.Column"
                                  x-component-props={{ title: '支出日期', align: 'center' }}>
                  <SchemaField.String
                    name="outDate" x-decorator="FormItem"
                    x-component="DatePicker" x-component-props={{ picker: 'month' }}
                  />
                </SchemaField.Void>
                <SchemaField.Void x-component="ArrayTable.Column"
                                  x-component-props={{ title: '收回/结束时间', align: 'center' }}>
                  <SchemaField.String
                    name="inDate" x-decorator="FormItem"
                    x-component="DatePicker" x-component-props={{ picker: 'month' }}
                  />
                </SchemaField.Void>
                <SchemaField.Void x-component="ArrayTable.Column"
                                  x-component-props={{ width: 80, title: '操作', dataIndex: 'operations' }}>
                  <SchemaField.Void x-component="FormItem">
                    <SchemaField.Void x-component="ArrayTableRemove"/>
                  </SchemaField.Void>
                </SchemaField.Void>
              </SchemaField.Object>
              <SchemaField.Void x-component="ArrayTableAddition" x-component-props={{ width: 80 }}/>
            </SchemaField.Array>

            <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 3, strictAutoFit: true }}>
              <SchemaField.Array
                name="innList" required x-decorator="FormItem" x-component="ArrayTable"
                x-decorator-props={{ gridSpan: 2 }}
                x-component-props={{ size: 'small', sticky: true, title: () => (<b>{'预计收入'}</b>) }}
              >
                <SchemaField.Object>
                  <SchemaField.Void
                    x-component="ArrayTable.Column"
                    x-component-props={{ width: 80, title: '排序', align: 'center' }}
                  >
                    <SchemaField.Void x-decorator="FormItem" x-component="ArrayTable.SortHandle"/>
                  </SchemaField.Void>
                  <SchemaField.Void x-component="ArrayTable.Column"
                                    x-component-props={{ title: '收入类型', align: 'center' }}>
                    <SchemaField.String
                      name="inType" x-decorator="FormItem" x-component="Select"
                      enum={[
                        { label: '项目收入', value: '项目收入' },
                        { label: '其他', value: '其他' },
                      ]}
                    />
                  </SchemaField.Void>
                  <SchemaField.Void x-component="ArrayTable.Column"
                                    x-component-props={{ title: '合计', align: 'center' }}>
                    <SchemaField.Number
                      name="money" x-decorator="FormItem" x-component="NumberPicker"
                      x-component-props={{
                        addonAfter: '元',
                        formatter: (value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                      }}
                    />
                  </SchemaField.Void>
                  <SchemaField.Void x-component="ArrayTable.Column"
                                    x-component-props={{ width: 80, title: '操作', dataIndex: 'operations' }}>
                    <SchemaField.Void x-component="FormItem">
                      <SchemaField.Void x-component="ArrayTableRemove"/>
                    </SchemaField.Void>
                  </SchemaField.Void>
                </SchemaField.Object>
                <SchemaField.Void x-component="ArrayTableAddition" x-component-props={{ width: 80 }}/>
              </SchemaField.Array>
              <SchemaField.Number
                name="inSum" title="预计收入累计" x-decorator="FormItem" x-component="NumberPicker"
                x-component-props={{
                  formatter: (value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                }}
              />

              <SchemaField.Array
                name="outList" required x-decorator="FormItem" x-component="ArrayTable"
                x-decorator-props={{ gridSpan: 2 }}
                x-component-props={{ size: 'small', sticky: true, title: () => (<b>{'预计支出'}</b>) }}
              >
                <SchemaField.Object>
                  <SchemaField.Void
                    x-component="ArrayTable.Column"
                    x-component-props={{ width: 80, title: '排序', align: 'center' }}
                  >
                    <SchemaField.Void x-decorator="FormItem" x-component="ArrayTable.SortHandle"/>
                  </SchemaField.Void>
                  <SchemaField.Void x-component="ArrayTable.Column"
                                    x-component-props={{ title: '成本类型', align: 'center' }}>
                    <SchemaField.String
                      name="outType" x-decorator="FormItem" x-component="Select"
                      x-component-props={{ showSearch: true }}
                      enum={[
                        { label: '材料及设备费', value: '材料及设备费' },
                        { label: '劳务费', value: '劳务费' },
                        { label: '技术服务费', value: '技术服务费' },
                        { label: '工程款', value: '工程款' },
                        { label: '税费', value: '税费' },
                        { label: '投标费用', value: '投标费用' },
                        { label: '现场管理费', value: '现场管理费' },
                        { label: '证书服务费', value: '证书服务费' },
                        { label: '资金成本', value: '资金成本' },
                        { label: '交易服务费', value: '交易服务费' },
                        { label: '交通费', value: '交通费' },
                        { label: '餐费', value: '餐费' },
                        { label: '差旅费', value: '差旅费' },
                        { label: '其他', value: '其他' },
                      ]}
                    />
                  </SchemaField.Void>
                  <SchemaField.Void x-component="ArrayTable.Column"
                                    x-component-props={{ width: 120, title: '税率', align: 'center' }}>
                    <SchemaField.String name="rate" x-decorator="FormItem"
                                        x-component="Input" x-component-props={{ placeholder: '示例：3%' }}/>
                  </SchemaField.Void>
                  <SchemaField.Void x-component="ArrayTable.Column"
                                    x-component-props={{ title: '合计', align: 'center' }}>
                    <SchemaField.Number
                      name="money" x-decorator="FormItem" x-component="NumberPicker"
                      x-component-props={{
                        addonAfter: '元',
                        formatter: (value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                      }}
                    />
                  </SchemaField.Void>
                  <SchemaField.Void x-component="ArrayTable.Column"
                                    x-component-props={{ width: 80, title: '操作', dataIndex: 'operations' }}>
                    <SchemaField.Void x-component="FormItem">
                      <SchemaField.Void x-component="ArrayTableRemove"/>
                    </SchemaField.Void>
                  </SchemaField.Void>
                </SchemaField.Object>
                <SchemaField.Void x-component="ArrayTableAddition" x-component-props={{ width: 80 }}/>
              </SchemaField.Array>
              <SchemaField.Number
                name="outSum" title="预计支出累计" x-decorator="FormItem" x-component="NumberPicker"
                x-component-props={{
                  formatter: (value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                }}
              />

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

