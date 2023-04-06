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
  PreviewText,
  Radio,
  Select,
} from '@formily/antd'
import { createSchemaField } from '@formily/react'
import React, { useEffect } from 'react'
import zhCN from 'antd/lib/locale/zh_CN'
import { Button, ConfigProvider, Divider, message } from 'antd'
import { get, projectCodePath } from '../../utils'
import {
  ArrayTableAddition,
  ArrayTableIndex,
  ArrayTableRemove,
  File,
  Line,
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
    FormItem, FormLayout, Input, DatePicker, Radio, FormGrid, NumberPicker, Checkbox, PreviewText,
    Select, InputButton, ArrayTable, ArrayTableIndex, ArrayTableRemove, ArrayTableAddition,
    MyCard, Divider, InputButton3, Line, File,
  },
})


let map = new Map()
map.set('资金来源', ['国拨', '自筹', '地方政府', '贷款', '外资投资', '其他'].map(item => ({ label: item, value: item })))
map.set('资金落实情况', ['是', '否'].map(item => ({ label: item, value: item })))
map.set('付款方式', ['进度付款', '节点付款', '开工前一次性付款', '完工后一次性付款'].map(item => ({ label: item, value: item })))
map.set('垫资额度(万元)', ['无垫资', '占比10%以内', '占比20%以内', '占比20%及以上'].map(item => ({ label: item, value: item })))
map.set('垫资期限/周期(日历天)', ['无垫资', '半年以内', '一年以内', '两年以内', '两年及以上'].map(item => ({ label: item, value: item })))
map.set('项目周期', ['', '', '', '', '', ''].map(item => ({ label: item, value: item })))
map.set('项目类型', ['综合体', '市政工程', '园区', '小区', '其他'].map(item => ({ label: item, value: item })))
map.set('公司角色', ['总包', '分包'].map(item => ({ label: item, value: item })))
map.set('项目模式', ['EPC', '其他'].map(item => ({ label: item, value: item })))
map.set('履约保证金比例', ['10%(含)以下', '10%以上'].map(item => ({ label: item, value: item })))
map.set('质保金比例', ['3%(含)以下', '3%以上'].map(item => ({ label: item, value: item })))
map.set('标前项目进度', ['未开工', '开工进度10%以内', '开工进度30%以内', '开工进度30%及以上'].map(item => ({ label: item, value: item })))
map.set('一类项目条件', ['具备条件', '不具备条件'].map(item => ({ label: item, value: item })))
map.set('其他因素', ['无其他因素', '有其他因素'].map(item => ({ label: item, value: item })))
map.set('项目评分', ['--'].map(item => ({ label: item, value: item })))
map.set('否决项', ['是', '否'].map(item => ({ label: item, value: item })))

map.set('客户角色', ['业主', '总包', '其他'].map(item => ({ label: item, value: item })))
map.set('客户企业性质', ['集团所属企业', '地级市以上政府', '国企', '县级以下政府', '民企', '其他'].map(item => ({ label: item, value: item })))
map.set('客户(业主)评分', ['--'].map(item => ({ label: item, value: item })))


map.set('企业性质', ['集团所属企业', '国企', '民企', '其他'].map(item => ({ label: item, value: item })))
map.set('供方评分', ['--'].map(item => ({ label: item, value: item })))

export default (props) => {
  let { form, type, record } = props

  useEffect(async () => {
    form.query('*(displayName,deptName,createDatetime,customerName,providerName)').forEach(field => {
      field.setPattern('disabled')
    })
    form.query('remark2').take()?.setState({
      pattern: 'readOnly',
      value: '1.评分权重\n' +
        '一、二类项目：项目、客户（业主）评分占比为 6:4；三类项目：项目、客户（业主）、供方评分占比为 4:2:4。\n' +
        '2.评估结论\n' +
        '评分 90 分（含）以上为低风险项目；评分 70 分（含）以上为中等风险项目；评分 70 分以下为高风险项目',
    })


    const data = await get(projectCodePath.getLabelValue)
    if (data) {
      let field = form.query('taskCode').take()
      field && field.setDataSource(data)
    }
  }, [])

  form.addEffects('id', () => {
    onFieldReact('property', (field) => {
      let value = field.value
      if (value) {
        let list4Field = form.query('list4').take()
        if (value === '三类') {
          list4Field?.setDisplay('visible')
        } else {
          list4Field?.setDisplay('none')
        }
      }
    })

    onFieldReact('list2.*.desc2', (field) => {
      let desc1Value = field.query('.desc1').get('value')
      if (desc1Value) {
        field.dataSource = map.get(desc1Value)
      }
      //
      let scoreField = field.query('.score').take()
      let standardField = field.query('.standard').take()
      if (desc1Value === '垫资额度(万元)') {
        field.setComponent('Input')
        scoreField && scoreField.setValidator({ minimum: 0, maximum: 10, required: true })
        standardField && standardField.setValue('0-10分')
      } else if (desc1Value === '垫资期限/周期(日历天)') {
        field.setComponent('Input')
        scoreField && scoreField.setValidator({ minimum: 0, maximum: 8, required: true })
        standardField && standardField.setValue('0-8分')
      } else if (desc1Value === '项目周期') {
        field.setComponent('Input')
        scoreField && scoreField.setValidator({ minimum: 0, maximum: 6, required: true })
        standardField && standardField.setValue('0-6分')
      } else if (desc1Value === '履约保证金比例') {
        field.setComponent('Input')
        scoreField && scoreField.setValidator({ minimum: 0, maximum: 6, required: true })
        standardField && standardField.setValue('0-6分')
      } else if (desc1Value === '质保金比例') {
        field.setComponent('Input')
        scoreField && scoreField.setValidator({ minimum: 0, maximum: 3, required: true })
        standardField && standardField.setValue('0-3分')
      } else if (desc1Value === '一类项目条件') {
        field.setComponent('Input', { addonBefore: '毛利润率估算:', addonAfter: '%' })
        scoreField && scoreField.setValidator({ minimum: 0, maximum: 8, required: true })
        standardField && standardField.setValue('0-8分')
      } else if (desc1Value === '其他因素') {
        field.setComponent('Input')
        scoreField && scoreField.setValidator({ minimum: 0, maximum: 5, required: true })
        standardField && standardField.setValue('0-5分')
      } else if (desc1Value === '项目评分') {
        field.setValue('--')
        scoreField?.setPattern('disabled')
        standardField && standardField.setValue('0-100分')
      } else if (desc1Value === '否决项') {
        standardField && standardField.setValue('--')
      }

    })
    onFieldReact('list2.*.standard', (field) => {
      let desc1Value = field.query('.desc1').get('value')
      let desc2Value = field.query('.desc2').get('value')
      if (desc2Value) {
        let desc2Field = field.query('.desc2').take()
        let scoreField = field.query('.score').take()
        // scoreField && scoreField.setValue(null)
        if (desc1Value === '资金来源') {
          if (desc2Value === '国拨') {
            field.value = '8-10分'
            scoreField && scoreField.setValidator({ minimum: 8, maximum: 10, required: true })
          } else if (desc2Value === '自筹' || desc2Value === '地方政府') {
            field.value = '6-8分'
            scoreField && scoreField.setValidator({ minimum: 6, maximum: 8, required: true })
          } else if (desc2Value === '贷款' || desc2Value === '外资投资') {
            field.value = '0-6分'
            scoreField && scoreField.setValidator({ minimum: 0, maximum: 6, required: true })
          } else if (desc2Value === '其他') {
            field.value = '0-8分'
            scoreField && scoreField.setValidator({ minimum: 0, maximum: 8, required: true })
          }
        } else if (desc1Value === '资金落实情况') {
          if (desc2Value === '是') {
            field.value = '7-12分'
            scoreField && scoreField.setValidator({ minimum: 7, maximum: 12, required: true })
          } else {
            field.value = '0-6分'
            scoreField && scoreField.setValidator({ minimum: 0, maximum: 6, required: true })
          }
        } else if (desc1Value === '付款方式') {
          if (desc2Value === '进度付款' || desc2Value === '节点付款') {
            field.value = '5-11分'
            scoreField && scoreField.setValidator({ minimum: 5, maximum: 11, required: true })
          } else if (desc2Value === '开工前一次性付款') {
            field.value = '12分'
            scoreField && scoreField.setValidator({ minimum: 12, maximum: 12, required: true })
            scoreField && scoreField.setValue(12)
          } else if (desc2Value === '完工后一次性付款') {
            field.value = '0-8分'
            scoreField && scoreField.setValidator({ minimum: 0, maximum: 8, required: true })
          } else if (desc2Value === '') {
            field.value = '0-8分'
            scoreField && scoreField.setValidator({ minimum: 0, maximum: 8, required: true })
          }
        } /*else if (desc1Value === '垫资额度(万元)') {
          scoreField && scoreField.setValidator({ minimum: 0, maximum: 10, required: true })
        } else if (desc1Value === '垫资期限/周期(日历天)') {
          scoreField && scoreField.setValidator({ minimum: 0, maximum: 8, required: true })
        } else if (desc1Value === '项目周期') {
          scoreField && scoreField.setValidator({ minimum: 0, maximum: 6, required: true })
        } */ else if (desc1Value === '项目类型') {
          if (desc2Value === '综合体' || desc2Value === '市政工程') {
            field.value = '4-5分'
            scoreField && scoreField.setValidator({ minimum: 4, maximum: 5, required: true })
          } else if (desc2Value === '园区' || desc2Value === '小区' || desc2Value === '其他') {
            field.value = '0-4分'
            scoreField && scoreField.setValidator({ minimum: 0, maximum: 4, required: true })
          }
        } else if (desc1Value === '公司角色') {
          if (desc2Value === '总包') {
            field.value = '4-5分'
            scoreField && scoreField.setValidator({ minimum: 4, maximum: 5, required: true })
          } else if (desc2Value === '分包') {
            field.value = '0-4分'
            scoreField && scoreField.setValidator({ minimum: 0, maximum: 4, required: true })
          }
        } else if (desc1Value === '项目模式') {
          if (desc2Value === 'EPC') {
            field.value = '1-4分'
            scoreField && scoreField.setValidator({ minimum: 1, maximum: 4, required: true })
          } else if (desc2Value === '其他') {
            field.value = '2-5分'
            scoreField && scoreField.setValidator({ minimum: 2, maximum: 5, required: true })
          }
        } else if (desc1Value === '履约保证金比例') {
          scoreField && scoreField.setValidator({ minimum: 0, maximum: 6, required: true })
        } else if (desc1Value === '质保金比例') {
          scoreField && scoreField.setValidator({ minimum: 0, maximum: 3, required: true })
        } else if (desc1Value === '标前项目进度') {
          if (desc2Value === '未开工') {
            field.value = '5分'
            scoreField && scoreField.setValidator({ minimum: 5, maximum: 5, required: true })
            scoreField && scoreField.setValue(5)
          } else if (desc2Value === '开工进度10%以内') {
            field.value = '3-4分'
            scoreField && scoreField.setValidator({ minimum: 3, maximum: 4, required: true })
          } else if (desc2Value === '开工进度30%以内') {
            field.value = '2-3分'
            scoreField && scoreField.setValidator({ minimum: 2, maximum: 3, required: true })
          } else if (desc2Value === '开工进度30%及以上') {
            field.value = '0-2分'
            scoreField && scoreField.setValidator({ minimum: 0, maximum: 2, required: true })
          }
        } else if (desc1Value === '一类项目条件') {
          scoreField && scoreField.setValidator({ minimum: 0, maximum: 8, required: true })
        } else if (desc1Value === '其他因素') {
          scoreField && scoreField.setValidator({ minimum: 0, maximum: 5, required: true })
        } else if (desc1Value === '项目评分') {

        } else if (desc1Value === '否决项') {

        }
      }
    })
    onFieldReact('list2.*(0,1,2,3,4,5,6,7,8,9,10,11,12,13).score', (field) => {
      let sum = 0
      form.query('list2.*(0,1,2,3,4,5,6,7,8,9,10,11,12,13).score').forEach(field => {
        if (field.value) {
          sum += field.value
        }
      })
      let tmp = form.query('list2.14.score').take()
      if (tmp && sum) {
        tmp.setState({ value: sum, pattern: 'disabled' })
      }
    })

    onFieldReact('list3.*.desc2', (field) => {
      let desc1Value = field.query('.desc1').get('value')
      if (desc1Value) {
        field.dataSource = map.get(desc1Value)
      }
      //
      let scoreField = field.query('.score').take()
      let standardField = field.query('.standard').take()
      if (desc1Value === '客户注册时间') {
        field.setComponent('DatePicker')
        scoreField && scoreField.setValidator({ minimum: 0, maximum: 3, required: true })
        standardField && standardField.setValue('0-3分')
      } else if (desc1Value === '标的金额/客户注册资本') {
        field.setComponent('Input')
        scoreField && scoreField.setValidator({ minimum: 0, maximum: 10, required: true })
        standardField && standardField.setValue('0-10分')
      } else if (desc1Value === '客户诉讼/失信事项') {
        field.setComponent('Input')
        scoreField && scoreField.setValidator({ minimum: 0, maximum: 10, required: true })
        standardField && standardField.setValue('0-10分')
      } else if (desc1Value === '客户股权出质比例') {
        field.setComponent('Input')
        scoreField && scoreField.setValidator({ minimum: 0, maximum: 10, required: true })
        standardField && standardField.setValue('0-10分')
      } else if (desc1Value === '其他因素') {
        field.setComponent('Input')
        scoreField && scoreField.setValidator({ minimum: 0, maximum: 4, required: true })
        standardField && standardField.setValue('0-4分')
      } else if (desc1Value === '客户(业主)评分') {
        field.setValue('--')
        scoreField?.setPattern('disabled')
        standardField && standardField.setValue('0-100分')
      } else if (desc1Value === '否决项') {
        standardField && standardField.setValue('--')
      }

    })
    onFieldReact('list3.*.standard', (field) => {
      let desc1Value = field.query('.desc1').get('value')
      let desc2Value = field.query('.desc2').get('value')
      if (desc2Value) {
        let desc2Field = field.query('.desc2').take()
        let scoreField = field.query('.score').take()
        // scoreField && scoreField.setValue(null)
        if (desc1Value === '客户角色') {
          if (desc2Value === '业主') {
            field.value = '8-10分'
            scoreField && scoreField.setValidator({ minimum: 8, maximum: 10, required: true })
          } else if (desc2Value === '总包') {
            field.value = '5-8分'
            scoreField && scoreField.setValidator({ minimum: 5, maximum: 8, required: true })
          } else if (desc2Value === '其他') {
            field.value = '0-8分'
            scoreField && scoreField.setValidator({ minimum: 0, maximum: 8, required: true })
          }
        } else if (desc1Value === '客户企业性质') {
          if (desc2Value === '集团所属企业' || desc2Value === '地级市以上政府') {
            field.value = '8-10分'
            scoreField && scoreField.setValidator({ minimum: 8, maximum: 10, required: true })
          } else if (desc2Value === '国企' || desc2Value === '县级以下政府') {
            field.value = '6-9分'
            scoreField && scoreField.setValidator({ minimum: 6, maximum: 9, required: true })
          } else if (desc2Value === '民企') {
            field.value = '3-8分'
            scoreField && scoreField.setValidator({ minimum: 3, maximum: 8, required: true })
          } else if (desc2Value === '其他') {
            field.value = '0-7分'
            scoreField && scoreField.setValidator({ minimum: 0, maximum: 7, required: true })
          }
        }
      }
    })
    onFieldReact('list3.*(0,1,2,3,4,5,6).score', (field) => {
      let sum = 0
      form.query('list3.*(0,1,2,3,4,5,6).score').forEach(field => {
        if (field.value) {
          sum += field.value
        }
      })
      let tmp = form.query('list3.7.score').take()
      if (tmp && sum) {
        tmp.setState({ value: sum, pattern: 'disabled' })
      }
    })

    onFieldReact('list4.*.desc2', (field) => {
      let desc1Value = field.query('.desc1').get('value')
      if (desc1Value) {
        field.dataSource = map.get(desc1Value)
      }
      //
      let scoreField = field.query('.score').take()
      let standardField = field.query('.standard').take()
      if (desc1Value === '注册时间') {
        field.setComponent('DatePicker')
        scoreField && scoreField.setValidator({ minimum: 0, maximum: 5, required: true })
        standardField && standardField.setValue('0-5分')
      } else if (desc1Value === '标的金额/注册资本') {
        field.setComponent('Input')
        scoreField && scoreField.setValidator({ minimum: 0, maximum: 20, required: true })
        standardField && standardField.setValue('0-10分')
      } else if (desc1Value === '公司实缴金额/注册资本') {
        field.setComponent('Input')
        scoreField && scoreField.setValidator({ minimum: 0, maximum: 20, required: true })
        standardField && standardField.setValue('0-10分')
      } else if (desc1Value === '诉讼/失信事项') {
        field.setComponent('Input')
        scoreField && scoreField.setValidator({ minimum: 0, maximum: 16, required: true })
        standardField && standardField.setValue('0-16分')
      } else if (desc1Value === '合作业绩') {
        field.setComponent('Input')
        scoreField && scoreField.setValidator({ minimum: 0, maximum: 12, required: true })
        standardField && standardField.setValue('0-12分')
      } else if (desc1Value === '项目实施能力') {
        field.setComponent('Input')
        scoreField && scoreField.setValidator({ minimum: 0, maximum: 10, required: true })
        standardField && standardField.setValue('0-10分')
      } else if (desc1Value === '其他因素') {
        field.setComponent('Input')
        scoreField && scoreField.setValidator({ minimum: 0, maximum: 4, required: true })
        standardField && standardField.setValue('0-4分')
      } else if (desc1Value === '供方评分') {
        field.setValue('--')
        scoreField?.setPattern('readOnly')
        standardField && standardField.setValue('0-100分')
      } else if (desc1Value === '否决项') {
        standardField && standardField.setValue('--')
      }

    })
    onFieldReact('list4.*.standard', (field) => {
      let desc1Value = field.query('.desc1').get('value')
      let desc2Value = field.query('.desc2').get('value')
      if (desc2Value) {
        let desc2Field = field.query('.desc2').take()
        let scoreField = field.query('.score').take()
        // scoreField && scoreField.setValue(null)
        if (desc1Value === '企业性质') {
          if (desc2Value === '集团所属企业' || desc2Value === '国企') {
            field.value = '8-12分'
            scoreField && scoreField.setValidator({ minimum: 8, maximum: 12, required: true })
          } else if (desc2Value === '民企') {
            field.value = '3-10分'
            scoreField && scoreField.setValidator({ minimum: 3, maximum: 10, required: true })
          } else if (desc2Value === '其他') {
            field.value = '0-9分'
            scoreField && scoreField.setValidator({ minimum: 0, maximum: 9, required: true })
          }
        }
      }
    })
    onFieldReact('list4.*(0,1,2,3,4,5,6,7).score', (field) => {
      let sum = 0
      form.query('list4.*(0,1,2,3,4,5,6,7).score').forEach(field => {
        if (field.value) {
          sum += field.value
        }
      })
      let tmp = form.query('list4.8.score').take()
      if (tmp && sum) {
        tmp.setState({ value: sum, pattern: 'disabled' })
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
        <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 4, strictAutoFit: true }}>
          <SchemaField.String
            name="havePower" required title="是否授权" x-decorator="FormItem" x-component="Radio.Group"
            enum={[
              { label: '是', value: '是' },
              { label: '否', value: '否' },
            ]}
          />
          <SchemaField.String
            name="powerDesc" title="授权内容" x-component="Input.TextArea"
            x-decorator-props={{ gridSpan: 2 }}
            x-component-props={{ rows: 2 }} x-decorator="FormItem"/>
          <SchemaField.String name="powerCode" title="授权号" x-decorator="FormItem" x-component="Input"/>
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

        <SchemaField.Array
          name="list2" x-decorator="FormItem" x-component="ArrayTable"
          x-component-props={{
            size: 'small',
            pagination: { pageSize: 200 },
            sticky: true,
            title: () => <div style={{ textAlign: 'center', fontWeight: 'bolder' }}>项目评估</div>,
          }}
        >
          <SchemaField.Object>
            <SchemaField.Void
              x-component="ArrayTable.Column"
              x-component-props={{ width: 80, title: '序号', align: 'center' }}
            >
              <SchemaField.Void x-decorator="FormItem" x-component="ArrayTableIndex"/>
            </SchemaField.Void>
            <SchemaField.Void
              x-component="ArrayTable.Column"
              x-component-props={{ width: 200, title: '项目情况', align: 'center', colSpan: 2 }}
            >
              <SchemaField.String name="desc1" x-decorator="FormItem" x-component="PreviewText.Input"/>
            </SchemaField.Void>
            <SchemaField.Void
              x-component="ArrayTable.Column"
              x-component-props={{ width: 220, title: '项目情况', align: 'center', colSpan: 0 }}
            >
              <SchemaField.String name="desc2" required x-decorator="FormItem" x-component="Select"/>
            </SchemaField.Void>
            <SchemaField.Void
              x-component="ArrayTable.Column"
              x-component-props={{ width: 100, title: '分值', align: 'center' }}
            >
              <SchemaField.String name="standard" x-decorator="FormItem" x-component="PreviewText.Input"/>
            </SchemaField.Void>
            <SchemaField.Void
              x-component="ArrayTable.Column"
              x-component-props={{ width: 120, title: '评分', align: 'center' }}
            >
              <SchemaField.Number x-decorator="FormItem" required name="score" x-component="NumberPicker"/>
            </SchemaField.Void>
            <SchemaField.Void
              x-component="ArrayTable.Column"
              x-component-props={{ title: '评估标准' }}
            >
              <SchemaField.String name="scoreDesc" x-decorator="FormItem" x-component="PreviewText.Input"/>
            </SchemaField.Void>
          </SchemaField.Object>
        </SchemaField.Array>

        <SchemaField.Array
          name="list3" x-decorator="FormItem" x-component="ArrayTable"
          x-component-props={{
            size: 'small',
            pagination: { pageSize: 200 },
            sticky: true,
            title: () => <div style={{ textAlign: 'center', fontWeight: 'bolder' }}>客户(业务)评估</div>,
          }}
        >
          <SchemaField.Object>
            <SchemaField.Void
              x-component="ArrayTable.Column"
              x-component-props={{ width: 80, title: '序号', align: 'center' }}
            >
              <SchemaField.Void x-decorator="FormItem" x-component="ArrayTableIndex"/>
            </SchemaField.Void>
            <SchemaField.Void
              x-component="ArrayTable.Column"
              x-component-props={{ width: 200, title: '客户(业主)情况', align: 'center', colSpan: 2 }}
            >
              <SchemaField.String name="desc1" x-decorator="FormItem" x-component="PreviewText.Input"/>
            </SchemaField.Void>
            <SchemaField.Void
              x-component="ArrayTable.Column"
              x-component-props={{ width: 220, title: '客户(业主)情况', align: 'center', colSpan: 0 }}
            >
              <SchemaField.String name="desc2" required x-decorator="FormItem" x-component="Select"/>
            </SchemaField.Void>
            <SchemaField.Void
              x-component="ArrayTable.Column"
              x-component-props={{ width: 100, title: '分值', align: 'center' }}
            >
              <SchemaField.String name="standard" x-decorator="FormItem" x-component="PreviewText.Input"/>
            </SchemaField.Void>
            <SchemaField.Void
              x-component="ArrayTable.Column"
              x-component-props={{ width: 120, title: '评分', align: 'center' }}
            >
              <SchemaField.Number x-decorator="FormItem" required name="score" x-component="NumberPicker"/>
            </SchemaField.Void>
            <SchemaField.Void
              x-component="ArrayTable.Column"
              x-component-props={{ title: '评估标准' }}
            >
              <SchemaField.String name="scoreDesc" x-decorator="FormItem" x-component="PreviewText.Input"/>
            </SchemaField.Void>
          </SchemaField.Object>
        </SchemaField.Array>

        <SchemaField.Array
          name="list4" x-decorator="FormItem" x-component="ArrayTable"
          x-component-props={{
            size: 'small',
            pagination: { pageSize: 200 },
            sticky: true,
            title: () => <div style={{ textAlign: 'center', fontWeight: 'bolder' }}>供方评估</div>,
          }}
        >
          <SchemaField.Object>
            <SchemaField.Void
              x-component="ArrayTable.Column"
              x-component-props={{ width: 80, title: '序号', align: 'center' }}
            >
              <SchemaField.Void x-decorator="FormItem" x-component="ArrayTableIndex"/>
            </SchemaField.Void>
            <SchemaField.Void
              x-component="ArrayTable.Column"
              x-component-props={{ width: 200, title: '供方情况', align: 'center', colSpan: 2 }}
            >
              <SchemaField.String name="desc1" x-decorator="FormItem" x-component="PreviewText.Input"/>
            </SchemaField.Void>
            <SchemaField.Void
              x-component="ArrayTable.Column"
              x-component-props={{ width: 220, title: '供方情况', align: 'center', colSpan: 0 }}
            >
              <SchemaField.String name="desc2" required x-decorator="FormItem" x-component="Select"/>
            </SchemaField.Void>
            <SchemaField.Void
              x-component="ArrayTable.Column"
              x-component-props={{ width: 100, title: '分值', align: 'center' }}
            >
              <SchemaField.String name="standard" x-decorator="FormItem" x-component="PreviewText.Input"/>
            </SchemaField.Void>
            <SchemaField.Void
              x-component="ArrayTable.Column"
              x-component-props={{ width: 120, title: '评分', align: 'center' }}
            >
              <SchemaField.Number x-decorator="FormItem" required name="score" x-component="NumberPicker"/>
            </SchemaField.Void>
            <SchemaField.Void
              x-component="ArrayTable.Column"
              x-component-props={{ title: '评估标准' }}
            >
              <SchemaField.String name="scoreDesc" x-decorator="FormItem" x-component="PreviewText.Input"/>
            </SchemaField.Void>
          </SchemaField.Object>
        </SchemaField.Array>

        <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 4, strictAutoFit: true }}>
          <SchemaField.String
            name="remark2" title="说明" x-component="Input.TextArea"
            x-decorator-props={{ gridSpan: 4 }}
            x-component-props={{ rows: 4 }} x-decorator="FormItem"/>
        </SchemaField.Void>

      </SchemaField>
    </Form>
  </ConfigProvider>
}

