import {
  ArrayTable,
  Checkbox,
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
import { Button, ConfigProvider, Divider, message } from 'antd'
import { get, projectCodePath, session } from '../../utils'
import {
  ArrayTableAddition,
  ArrayTableIndex,
  ArrayTableRemove,
  File,
  LoadingButton,InputButton,
  MyCard,
  NumberPicker,
} from '../../components'
import DialogList from './DialogList'
import DialogList2 from './DialogList2'
import { SearchOutlined } from '@ant-design/icons'
import styles from '../table-placeholder.less'
import { onFieldReact } from '@formily/core'


const InputButton3 = (props) => {
  return <div style={{ display: 'inline-flex', width: '100%' }}>
    <Input {...props} style={{ ...props.style }}/>
    <Button onClick={(e) => {
      if (props.onClick) {
        props.onClick('open', props.type)
      }
    }} style={{ marginLeft: 5 }}>查看历史</Button>
  </div>
}


const SchemaField = createSchemaField({
  components: {
    FormItem, FormLayout, Input, DatePicker, Radio, FormGrid, NumberPicker, Checkbox,
    Select, InputButton, ArrayTable, ArrayTableIndex, ArrayTableRemove, ArrayTableAddition,
    MyCard, Divider, InputButton3, File,
  },
})


export default (props) => {
  let { form, type, record } = props

  useEffect(async () => {
    form.query('*(displayName,deptName,createDatetime,startDisplay,endDisplay,bidDate,giveMoney,giveMoneyCycle,providerName,customerName)').forEach(field => {
      field.setPattern('disabled')
    })
    const data = await get(projectCodePath.getLabelValue)
    if (data) {
      let field = form.query('taskCode').take()
      field && field.setDataSource(data)
    }
  }, [])

  form.addEffects('id', () => {
    onFieldReact('haveBid', (field) => {
      let value = field.value
      if (value) {
        if (value === '是') {
          form.query('bidDate').take()?.setState({ required: true, pattern: 'editable' })
        } else {
          form.query('bidDate').take()?.setState({ pattern: 'disabled' })
        }
      }
    })

    onFieldReact('haveGiveMoney', (field) => {
      let value = field.value
      if (value) {
        if (value === '是') {
          form.query('*(giveMoney,giveMoneyCycle)').forEach(fieldd => fieldd.setState({
            required: true,
            pattern: 'editable',
          }))
        } else {
          form.query('*(giveMoney,giveMoneyCycle)').forEach(fieldd => fieldd.setState({
            pattern: 'disabled',
            value: null,
          }))
        }
      }
    })


  })

  const onClick = (flag) => {
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
                        customerId: values.selectedRow.id,
                        customerName: values.selectedRow.name,
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

  const onClick2 = (flag) => {
    let field = form.query('property').take()
    if (field?.value !== '三类') {
      message.error('请选择 项目性质为三类')
      return
    }
    if (flag === 'open') {
      let dialog2 = FormDialog({ footer: null, keyboard: false, maskClosable: false, width: 800 },
        (form2) => {
          return <>
            <DialogList2 form={form2} dialog={dialog2} selectedId={form.values.customerId}/>
            <FormDialog.Footer>
              <FormButtonGroup gutter={16} align={'right'}>
                <Button onClick={() => dialog2.close()}>取消</Button>
                <LoadingButton
                  onClick={async () => {
                    const values = await form2.submit()
                    if (values.selectedRow) {
                      form.setValues({
                        providerId: values.selectedRow.id,
                        providerName: values.selectedRow.name,
                        providerUsee: values.selectedRow.usee,
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

  const onClick3 = (flag, type) => {
    if (flag === 'open') {
      let dialog2 = FormDialog({ footer: null, keyboard: false, maskClosable: false, width: 800 },
        (form2) => {
          return <>
            <DialogList2 form={form2} dialog={dialog2} type={type}/>
            <FormDialog.Footer>
              <FormButtonGroup gutter={16} align={'right'}>
                <Button onClick={() => dialog2.close()}>取消</Button>
                <LoadingButton
                  onClick={async () => {
                    const values = await form2.submit()
                    if (values.selectedRow) {
                      form.setValues({
                        providerId: values.selectedRow.id,
                        providerName: values.selectedRow.name,
                        providerUsee: values.selectedRow.usee,
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
  return <ConfigProvider locale={zhCN}>
    <Form form={form} labelWidth={130} className={styles.placeholder}>
      <SchemaField>
        <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 4, strictAutoFit: true }}>
          <SchemaField.String
            name="comment" title="变更说明" required x-decorator="FormItem" x-decorator-props={{ gridSpan: 3 }}
            x-component="Input.TextArea"
          />
        </SchemaField.Void>
        <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 4, strictAutoFit: true }}>
          <SchemaField.String name="displayName" title="申请人" x-component="Input" x-decorator="FormItem"/>
          <SchemaField.String name="deptName" title="申请部门" x-component="Input" x-decorator="FormItem"/>
          <SchemaField.String name="createDatetime" title="申请时间" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="name" required title="项目名称" x-decorator="FormItem"
                              x-component="Input" x-decorator-props={{ gridSpan: 3 }}/>
          <SchemaField.String name="taskCode" required title="任务号" x-decorator="FormItem" x-component="Select"/>
        </SchemaField.Void>
        <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 4, strictAutoFit: true }}>
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
            name="location" required title="项目地点" x-decorator="FormItem"
            x-component="Input" x-decorator-props={{ gridSpan: 2 }}
          />
        </SchemaField.Void>
        <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 4, strictAutoFit: true }}>
          <SchemaField.String name="customerName" required title="客户名称" x-decorator="FormItem"
                              x-decorator-props={{ gridSpan: 2 }}
                              x-component="InputButton" x-component-props={{ onClick: onClick }}/>
          <SchemaField.String name="providerName" title="供方名称" x-decorator="FormItem"
                              x-decorator-props={{ gridSpan: 2 }}
                              x-component="InputButton" x-component-props={{ onClick: onClick2 }}/>
          <SchemaField.String
            name="idTypeListTmp" required title="法人身份证类型" x-decorator="FormItem" x-component="Checkbox.Group"
            x-decorator-props={{ gridSpan: 4 }}
            enum={[
              { label: '身份证原件', value: '身份证原件' },
              { label: '身份证电子版', value: '身份证电子版' },
              { label: '身份证复印件', value: '身份证复印件' },
              { label: '不使用', value: '不使用' },
            ]}
          />
          <SchemaField.String name="expectMoney" required title="预计签约金额" x-decorator="FormItem"
                              x-component="NumberPicker"/>
          <SchemaField.String name="expectDate" required title="预计签约日期" x-decorator="FormItem"
                              x-component="DatePicker"/>
          <SchemaField.String
            name="invoiceType" title="发票类型" required x-decorator="FormItem" x-component="Select"
            enum={[
              { label: '增值税专票', value: '增值税专票' },
              { label: '增值税普票', value: '增值税普票' },
            ]}
          />
          <SchemaField.String
            name="invoiceRate" required title="发票税率" x-decorator="FormItem" x-component="Select"
            enum={[
              { label: '1%', value: '1%' },
              { label: '3%', value: '3%' },
              { label: '6%', value: '6%' },
              { label: '9%', value: '9%' },
              { label: '13%', value: '13%' },
            ]}
          />
        </SchemaField.Void>

        <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 4, strictAutoFit: true }}>
          <SchemaField.String
            name="haveBid" required title="是否投标" x-decorator="FormItem" x-component="Radio.Group"
            enum={[
              { label: '是', value: '是' },
              { label: '否', value: '否' },
            ]}
          />
          <SchemaField.String name="bidDate" title="投标截止日期" x-decorator="FormItem" x-component="DatePicker"/>
          <SchemaField.String name="workDate" required title="开竣工日期" x-decorator="FormItem" x-component="DatePicker"/>
        </SchemaField.Void>
        <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 4, strictAutoFit: true }}>
          <SchemaField.String
            name="haveGiveMoney" required title="是否垫资" x-decorator="FormItem" x-component="Radio.Group"
            enum={[
              { label: '是', value: '是' },
              { label: '否', value: '否' },
            ]}
          />
          <SchemaField.String name="giveMoney" title="垫资额度" x-decorator="FormItem" x-component="NumberPicker"/>
          <SchemaField.String name="giveMoneyCycle" title="垫资周期" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.Array
            name="list" title={'保证金(函)'} required x-decorator="FormItem" x-component="ArrayTable"
            x-decorator-props={{ gridSpan: 2 }}
            x-component-props={{ size: 'small', sticky: true }}
          >
            <SchemaField.Object>
              <SchemaField.Void
                x-component="ArrayTable.Column" x-component-props={{ title: '保证金(函)类型', align: 'center' }}>
                <SchemaField.String
                  name="type" required x-decorator="FormItem" x-component="Select"
                  enum={[
                    { label: '投标保证金/函', value: '投标保证金/函' },
                    { label: '质量保证金/函', value: '质量保证金/函' },
                    { label: '工资保证金/函', value: '工资保证金/函' },
                    { label: '履约保证金/函', value: '履约保证金/函' },
                  ]}
                />
              </SchemaField.Void>
              <SchemaField.Void
                x-component="ArrayTable.Column" x-component-props={{ title: '保证金(函)额度', align: 'center' }}>
                <SchemaField.String name="money" required x-decorator="FormItem" x-component="Input"/>
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
        </SchemaField.Void>

        <SchemaField.Void x-component="MyCard" x-component-props={{ title: '资信及履约能力调查-客户' }}>
          <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 4, strictAutoFit: true }}>
            <SchemaField.String
              name="history1" required title="项目承揽历史" x-decorator="FormItem" x-decorator-props={{ gridSpan: 3 }}
              x-component="InputButton3" x-component-props={{ onClick: onClick3, type: '客户' }}
            />
          </SchemaField.Void>
          <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 4, strictAutoFit: true }}>
            <SchemaField.String
              name="haveProblem1" required title="是否存在纠纷" x-decorator="FormItem" x-component="Radio.Group"
              enum={[
                { label: '是', value: '是' },
                { label: '否', value: '否' },
              ]}
            />
            <SchemaField.String name="payStatus" required title="以往项目付款情况" x-decorator="FormItem" x-component="Input"/>
            <SchemaField.String
              name="evaluate1" required title="客户目前的资信及履约能力综合评价" x-decorator="FormItem" x-component="Input"/>
          </SchemaField.Void>
        </SchemaField.Void>
        <SchemaField.Void x-component="MyCard" x-component-props={{ title: '资信及履约能力调查-供方' }}>
          <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 4, strictAutoFit: true }}>
            <SchemaField.String
              name="history2" required title="项目合作历史" x-decorator="FormItem" x-decorator-props={{ gridSpan: 3 }}
              x-component="InputButton3" x-component-props={{ onClick: onClick3, type: '供方' }}
            />
          </SchemaField.Void>
          <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 4, strictAutoFit: true }}>
            <SchemaField.String
              name="haveProblem2" required title="是否存在纠纷" x-decorator="FormItem" x-component="Radio.Group"
              enum={[
                { label: '是', value: '是' },
                { label: '否', value: '否' },
              ]}
            />
            <SchemaField.String
              name="protectPerson" required title="供方保证人" x-decorator="FormItem" x-component="Input"/>
            <SchemaField.String
              name="evaluate2" required title="供方目前的资信及综合能力综合评价" x-decorator="FormItem" x-component="Input"/>
          </SchemaField.Void>
        </SchemaField.Void>
        <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 4, strictAutoFit: true }}>
          <SchemaField.String
            name="fileList" title="附件" x-decorator="FormItem"
            x-component="File" x-decorator-props={{ gridSpan: 2 }}/>
        </SchemaField.Void>
        <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 4, strictAutoFit: true }}>
          <SchemaField.String
            name="remark" title="备注" x-component="Input.TextArea"
            x-decorator-props={{ gridSpan: 2 }}
            x-component-props={{ rows: 2 }} x-decorator="FormItem"/>
        </SchemaField.Void>
        <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 4, strictAutoFit: true }}>
          <SchemaField.String
            name="userNamee" required title="财务部" x-decorator="FormItem"
            x-decorator-props={{ gridSpan: 2, tooltip: '流程审批节点' }}
            x-component="Select" x-component-props={{ showSearch: true }}
            enum={session.getItem('userList')}
          />
        </SchemaField.Void>
      </SchemaField>
    </Form>
  </ConfigProvider>
}

