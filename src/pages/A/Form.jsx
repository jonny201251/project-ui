import {
  ArrayItems,
  ArrayTable,
  DatePicker,
  Form,
  FormGrid,
  FormItem,
  FormLayout,
  FormTab,
  Input,
  NumberPicker,
  PreviewText,
  Radio,
  Select,
  Space,
} from '@formily/antd'
import { createSchemaField } from '@formily/react'
import React, { useEffect } from 'react'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import styles from '../table-placeholder.less'
import { onFieldReact } from '@formily/core'
import { ArrayTableAddition, ArrayTableIndex, ArrayTableRemove, InputButton } from '../../components'

const formTab = FormTab.createFormTab()


const typeArr = ['材料及设备费', '劳务费', '技术服务费', '工程款', '税费', '投标费用', '现场管理费', '证书服务费', '资金成本', '交易服务费', '交通费', '餐费', '差旅费','其他']
export default (props) => {
  let { form, record } = props

  const aa = () => {
    form.query('a').take().value = 'aaa'
  }

  const SchemaField = createSchemaField({
    components: {
      FormLayout, FormItem, Input, ArrayItems, Select, Radio, DatePicker, FormGrid,
      ArrayTable, NumberPicker, PreviewText, Space, ArrayTableIndex, InputButton,
      ArrayTableRemove, ArrayTableAddition, FormTab,
    },
  })


  useEffect(async () => {
    form.query('*(a,b)').forEach(field => {
      field.setPattern('disabled')
    })
    //构建数据
    let inList = []
    let inList21 = []
    for (let i = 1; i <= 9; i++) {
      inList21.push({ expectDate: '2022-0' + i, money: i })
    }
    inList21.push({ expectDate: '2022-10', money: 10 })
    inList21.push({ expectDate: '2022-11', money: 11 })
    inList21.push({ expectDate: '2022-12', money: 12 })

    let outList = []
    let outList21 = []
    for (let i = 1; i <= 9; i++) {
      outList21.push({ expectDate: '2022-0' + i, money: i })
    }
    outList21.push({ expectDate: '2022-10', money: 10 })
    outList21.push({ expectDate: '2022-11', money: 11 })
    outList21.push({ expectDate: '2022-12', money: 12 })

    let outList22 = []
    for (let i = 1; i <= 9; i++) {
      outList22.push({ expectDate: '2022-0' + i, money: i })
    }
    outList22.push({ expectDate: '2022-10', money: 10 })
    outList22.push({ expectDate: '2022-11', money: 11 })
    outList22.push({ expectDate: '2022-12', money: 12 })

    let outList23 = []
    for (let i = 1; i <= 9; i++) {
      outList23.push({ expectDate: '2022-0' + i, money: i })
    }
    outList23.push({ expectDate: '2022-10', money: 10 })
    outList23.push({ expectDate: '2022-11', money: 11 })
    outList23.push({ expectDate: '2022-12', money: 12 })

    outList.push({ costType: '材料及设备费', taxRate: '13%', outList2: outList21 })
    outList.push({ costType: '材料及设备费', taxRate: '13%', outList2: outList21 })
    outList.push({ costType: '劳务费', taxRate: '3%', outList2: outList22 })
    outList.push({ costType: '劳务费', taxRate: '3%', outList2: outList22 })
    outList.push({ costType: '技术服务费', taxRate: '1%', outList2: outList23 })
    outList.push({ costType: '技术服务费', taxRate: '1%', outList2: outList23 })
    inList.push({ name: '项目收入', inList2: inList21 })


    form.setValues({ inList: inList, outList: outList })
  }, [])

  form.addEffects('id', () => {
    //被动联动模式
    onFieldReact('outList.*.taxRate', (field) => {
      let costType = field.query('.costType').get('value')
      field.setDisplay('visible')
      if (costType === '材料及设备费') {
        field.value = '13%'
      } else if (costType === '劳务费') {
        field.value = '3%'
      } else if (costType === '技术服务费') {
        field.value = '1%'
      } else {
        field.setDisplay('hidden')
      }

    })
  })

  return (
    <ConfigProvider locale={zhCN}>
      <Form form={form} labelWidth={100} className={styles.placeholder}>
        <SchemaField>
          <SchemaField.Void
            type="void"
            x-component="FormTab"
            x-component-props={{ formTab }}
          >
            <SchemaField.Void
              x-component="FormTab.TabPane"
              x-component-props={{ tab: '项目信息' }}
            >
              <SchemaField.Void
                x-component="FormGrid"
                x-component-props={{
                  maxColumns: 4,
                  minColumns: 2,
                  strictAutoFit: true,
                }}
              >
                <SchemaField.String
                  name="a"
                  title="项目名称"
                  required
                  x-decorator="FormItem"
                  x-decorator-props={{ gridSpan: 3 }}
                  x-component="InputButton"
                  x-component-props={{
                    onClick: aa,
                  }}
                />
                <SchemaField.String
                  name="b1"
                  title="项目任务号"
                  x-decorator="FormItem"
                  x-component="Input"
                />
                <SchemaField.String
                  name="b"
                  title="项目类型"
                  x-decorator="FormItem"
                  x-component="Input"
                />
                <SchemaField.String
                  name="c"
                  title="预计毛利率"
                  x-decorator="FormItem"
                  x-component="Input"
                />
                <SchemaField.String
                  name="e"
                  title="税率"
                  x-decorator="FormItem"
                  x-component="Input"
                />
                <SchemaField.String
                  name="e1"
                  title="项目负责人"
                  x-decorator="FormItem"
                  x-component="Input"
                />
                <SchemaField.Number
                  name="d"
                  title="合同金额"
                  x-decorator="FormItem"
                  x-component="NumberPicker"
                />
                <SchemaField.Number
                  name="f"
                  title="成本预算"
                  x-decorator="FormItem"
                  x-component="NumberPicker"
                />
                <SchemaField.String
                  name="g"
                  title="开工时间"
                  x-decorator="FormItem"
                  x-component="DatePicker"
                  x-component-props={{ picker: 'month' }}
                />
                <SchemaField.String
                  name="h"
                  title="预计完工时间"
                  x-decorator="FormItem"
                  x-component="DatePicker"
                  x-component-props={{ picker: 'month' }}
                />
                <SchemaField.String
                  name="i"
                  title="质保金比例"
                  x-decorator="FormItem"
                  x-component="Input"
                />
                <SchemaField.Number
                  name="j"
                  title="结算金额"
                  x-decorator="FormItem"
                  x-component="NumberPicker"
                />
                <SchemaField.Number
                  name="k"
                  title="收入调整金额"
                  x-decorator="FormItem"
                  x-component="NumberPicker"
                />
                <SchemaField.Number
                  name="a3"
                  title="支出调整金额"
                  x-decorator="FormItem"
                  x-component="NumberPicker"
                />
                <SchemaField.String
                  name="a4"
                  title="备注"
                  x-decorator="FormItem"
                  x-decorator-props={{ gridSpan: 2 }}
                  x-component="Input.TextArea"
                />
              </SchemaField.Void>
              <SchemaField.Array
                name="inList11"
                x-decorator="FormItem"
                x-component="ArrayTable"
                x-component-props={{
                  size: 'small',
                  sticky: true,
                  title: () => (<b>{'担保'}</b>),
                }}
              >
                <SchemaField.Object>
                  <SchemaField.Void
                    x-component="ArrayTable.Column"
                    x-component-props={{ width: 80, title: '排序', align: 'center' }}
                  >
                    <SchemaField.Void
                      x-decorator="FormItem"
                      x-component="ArrayTable.SortHandle"
                    />
                  </SchemaField.Void>
                  <SchemaField.Void
                    x-component="ArrayTable.Column"
                    x-component-props={{ title: '名称' }}
                  >
                    <SchemaField.String
                      name="name"
                      x-decorator="FormItem"
                      x-component="Select"
                      enum={[
                        { label: '投标保证金', value: '投标保证金' },
                        { label: '履约保证金', value: '履约保证金' },
                        { label: '预付款担保', value: '预付款担保' },
                        { label: '其他担保', value: '预付款担保' },
                      ]}
                    />
                  </SchemaField.Void>
                  <SchemaField.Void
                    x-component="ArrayTable.Column"
                    x-component-props={{ title: '形式' }}
                  >
                    <SchemaField.String
                      name="style"
                      x-decorator="FormItem"
                      x-component="Select"
                      enum={[
                        { label: '无', value: '无' },
                        { label: '保函', value: '保函' },
                      ]}
                    />
                  </SchemaField.Void>
                  <SchemaField.Void
                    x-component="ArrayTable.Column"
                    x-component-props={{ title: '金额' }}
                  >
                    <SchemaField.Number
                      name="money"
                      x-decorator="FormItem"
                      x-component="NumberPicker"
                    />
                  </SchemaField.Void>
                  <SchemaField.Void
                    x-component="ArrayTable.Column"
                    x-component-props={{ title: '支出时间' }}
                  >
                    <SchemaField.String
                      name="expectDate"
                      x-decorator="FormItem"
                      x-component="DatePicker"
                      x-component-props={{ picker: 'month' }}
                    />
                  </SchemaField.Void>
                  <SchemaField.Void
                    x-component="ArrayTable.Column"
                    x-component-props={{ title: '收回、结束时间' }}
                  >
                    <SchemaField.String
                      name="inDate"
                      x-decorator="FormItem"
                      x-component="DatePicker"
                      x-component-props={{ picker: 'month' }}
                    />
                  </SchemaField.Void>
                  <SchemaField.Void
                    x-component="ArrayTable.Column"
                    x-component-props={{ width: 80, title: '操作' }}
                  >
                    <SchemaField.Void x-component="FormItem">
                      <SchemaField.Void x-component="ArrayTableRemove"/>
                    </SchemaField.Void>
                  </SchemaField.Void>
                </SchemaField.Object>
                <SchemaField.Void x-component="ArrayTableAddition"/>
              </SchemaField.Array>
            </SchemaField.Void>
            <SchemaField.Void
              x-component="FormTab.TabPane"
              x-component-props={{ tab: '收入明细' }}
            >
              <SchemaField.Array
                name="inList"
                x-decorator="FormItem"
                x-component="ArrayTable"
                x-component-props={{
                  // pagination: { pageSize: 3 },
                  size: 'small',
                  sticky: true,
                  // title: () => (<b>{'收入明细'}</b>),
                }}
              >
                <SchemaField.Object>
                  <SchemaField.Void
                    x-component="ArrayTable.Column"
                    x-component-props={{ width: 80, title: '排序', align: 'center' }}
                  >
                    <SchemaField.Void
                      x-decorator="FormItem"
                      x-component="ArrayTable.SortHandle"
                    />
                  </SchemaField.Void>
                  <SchemaField.Void
                    x-component="ArrayTable.Column"
                    x-component-props={{ width: 80, title: '序号', align: 'center' }}
                  >
                    <SchemaField.Void x-decorator="FormItem" x-component="ArrayTableIndex"/>
                  </SchemaField.Void>
                  <SchemaField.Void
                    x-component="ArrayTable.Column"
                    x-component-props={{ title: '名称' }}
                  >
                    <SchemaField.String
                      name="name"
                      x-decorator="FormItem"
                      x-component="Select"
                      enum={[
                        { label: '项目收入', value: '项目收入' },
                        { label: '其他', value: '其他' },
                      ]}
                    />
                  </SchemaField.Void>
                  <SchemaField.Void
                    x-component="ArrayTable.Column"
                    x-component-props={{ width: 500, title: '预计回款日期和金额' }}
                  >
                    <SchemaField.Array
                      name="inList2"
                      x-decorator="FormItem"
                      x-component="ArrayTable"
                      x-component-props={{
                        size: 'small',
                        sticky: true,
                      }}
                    >
                      <SchemaField.Object>
                        <SchemaField.Void
                          x-component="ArrayTable.Column"
                          x-component-props={{ width: 80, title: '排序', align: 'center' }}
                        >
                          <SchemaField.Void
                            x-decorator="FormItem"
                            x-component="ArrayTable.SortHandle"
                          />
                        </SchemaField.Void>
                        <SchemaField.Void
                          x-component="ArrayTable.Column"
                          x-component-props={{ title: '预计回款日期' }}
                        >
                          <SchemaField.String
                            name="expectDate"
                            x-decorator="FormItem"
                            x-component="DatePicker"
                            x-component-props={{ picker: 'month' }}
                          />
                        </SchemaField.Void>
                        <SchemaField.Void
                          x-component="ArrayTable.Column"
                          x-component-props={{ title: '金额' }}
                        >
                          <SchemaField.Number
                            name="money"
                            x-decorator="FormItem"
                            x-component="NumberPicker"
                          />
                        </SchemaField.Void>
                        <SchemaField.Void
                          x-component="ArrayTable.Column"
                          x-component-props={{ width: 80, title: '操作' }}
                        >
                          <SchemaField.Void x-component="FormItem">
                            <SchemaField.Void x-component="ArrayTableRemove"/>
                          </SchemaField.Void>
                        </SchemaField.Void>
                      </SchemaField.Object>
                      <SchemaField.Void x-component="ArrayTableAddition" x-component-props={{ style: { width: 80 } }}/>
                    </SchemaField.Array>
                  </SchemaField.Void>
                  <SchemaField.Void
                    x-component="ArrayTable.Column"
                    x-component-props={{ width: 80, title: '操作' }}
                  >
                    <SchemaField.Void x-component="FormItem">
                      <SchemaField.Void x-component="ArrayTableRemove"/>
                    </SchemaField.Void>
                  </SchemaField.Void>
                </SchemaField.Object>
                <SchemaField.Void
                  x-component="ArrayTableAddition" x-component-props={{ width: 80 }}
                />
              </SchemaField.Array>
            </SchemaField.Void>
            <SchemaField.Void
              x-component="FormTab.TabPane"
              x-component-props={{ tab: '支出明细' }}
            >
              <SchemaField.Array
                name="outList"
                x-decorator="FormItem"
                x-component="ArrayTable"
                x-component-props={{
                  // pagination: { pageSize: 3 },
                  size: 'small',
                  sticky: true,
                  // title: () => (<b>{'支出明细'}</b>),
                }}
              >
                <SchemaField.Object>
                  <SchemaField.Void
                    x-component="ArrayTable.Column"
                    x-component-props={{ width: 50, title: '排序', align: 'center' }}
                  >
                    <SchemaField.Void
                      x-decorator="FormItem"
                      x-component="ArrayTable.SortHandle"
                    />
                  </SchemaField.Void>
                  <SchemaField.Void
                    x-component="ArrayTable.Column"
                    x-component-props={{ width: 50, title: '序号', align: 'center' }}
                  >
                    <SchemaField.Void x-decorator="FormItem" x-component="ArrayTableIndex"/>
                  </SchemaField.Void>
                  <SchemaField.Void
                    x-component="ArrayTable.Column"
                    x-component-props={{ title: '费用类型' }}
                  >
                    <SchemaField.String
                      name="costType"
                      x-decorator="FormItem"
                      x-component="Select"
                      enum={typeArr.map(item => ({ label: item, value: item }))}
                    />
                  </SchemaField.Void>
                  <SchemaField.Void
                    x-component="ArrayTable.Column"
                    x-component-props={{ width: 100, title: '税率' }}
                  >
                    <SchemaField.String
                      name="taxRate"
                      x-decorator="FormItem"
                      x-component="Select"
                      enum={[
                        { label: '13%', value: '13%' },
                        { label: '3%', value: '3%' },
                        { label: '1%', value: '1%' },
                      ]}
                    />
                  </SchemaField.Void>
                  <SchemaField.Void
                    x-component="ArrayTable.Column"
                    x-component-props={{ width: 500, title: '支出日期和金额' }}
                  >
                    <SchemaField.Array
                      name="outList2"
                      x-decorator="FormItem"
                      x-component="ArrayTable"
                      x-component-props={{
                        size: 'small',
                        sticky: true,
                      }}
                    >
                      <SchemaField.Object>
                        <SchemaField.Void
                          x-component="ArrayTable.Column"
                          x-component-props={{ width: 80, title: '排序', align: 'center' }}
                        >
                          <SchemaField.Void
                            x-decorator="FormItem"
                            x-component="ArrayTable.SortHandle"
                          />
                        </SchemaField.Void>
                        <SchemaField.Void
                          x-component="ArrayTable.Column"
                          x-component-props={{ title: '支出日期', align: 'center' }}
                        >
                          <SchemaField.String
                            name="expectDate"
                            x-decorator="FormItem"
                            x-component="DatePicker"
                            x-component-props={{ picker: 'month' }}
                          />
                        </SchemaField.Void>
                        <SchemaField.Void
                          x-component="ArrayTable.Column"
                          x-component-props={{ title: '金额', align: 'center' }}
                        >
                          <SchemaField.Number
                            name="money"
                            x-decorator="FormItem"
                            x-component="NumberPicker"
                          />
                        </SchemaField.Void>
                        <SchemaField.Void
                          x-component="ArrayTable.Column"
                          x-component-props={{ width: 80, title: '操作' }}
                        >
                          <SchemaField.Void x-component="FormItem">
                            <SchemaField.Void x-component="ArrayTableRemove"/>
                          </SchemaField.Void>
                        </SchemaField.Void>
                      </SchemaField.Object>
                      <SchemaField.Void x-component="ArrayTableAddition"/>
                    </SchemaField.Array>
                  </SchemaField.Void>
                  <SchemaField.Void
                    x-component="ArrayTable.Column"
                    x-component-props={{ width: 80, title: '操作' }}
                  >
                    <SchemaField.Void x-component="FormItem">
                      <SchemaField.Void x-component="ArrayTableRemove"/>
                    </SchemaField.Void>
                  </SchemaField.Void>
                </SchemaField.Object>
                <SchemaField.Void x-component="ArrayTableAddition"/>
              </SchemaField.Array>
            </SchemaField.Void>
          </SchemaField.Void>
        </SchemaField>
      </Form>
    </ConfigProvider>
  )
}
