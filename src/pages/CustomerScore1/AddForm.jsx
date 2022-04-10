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
  PreviewText,
  Radio,
  Select,
} from '@formily/antd'
import { createSchemaField } from '@formily/react'
import React, { useEffect } from 'react'
import zhCN from 'antd/lib/locale/zh_CN'
import { Button, ConfigProvider, message } from 'antd'
import { ArrayTableIndex, InputButton, LoadingButton, NumberPicker } from '../../components'
import { session } from '../../utils'
import { onFieldReact } from '@formily/core'
import CustomerDialog from './CustomerDialog'


const SchemaField = createSchemaField({
  components: {
    FormItem, FormLayout, Input, PreviewText, Select, NumberPicker, ArrayTableIndex,
    ArrayTable, FormGrid, DatePicker, InputButton, Radio,
  },
})

let map = new Map()
map.set('企业性质', ['国有军工系统企业', '国有其他企业', '民营等企业'].map(item => ({ label: item, value: item })))
map.set('注册资本', ['注册资本≥1000万', '1000万>注册资本≥300万', '注册资本<300万'].map(item => ({ label: item, value: item })))
map.set('资产负债率情况', ['负债率≤50%(较低)', '50%<负债率≤75%(一般)', '75%<负债率(较高)'].map(item => ({ label: item, value: item })))
map.set('是否经营风险性项目(比如期货、股票交易或价格波动较大的产品)', [
  '没有', '有，但资金占用很小，不超过 流动资产的 20%', '有且规模较大或为主营业务'].map(item => ({ label: item, value: item })))
map.set('不良记录情况(比如恶意欠款，恶意因质量问题拒付客户账款、法院裁决、被法院强制执行信息、其他)', [
  '无', '有，但体量小，有争议', '有，影响较大'].map(item => ({ label: item, value: item })))
map.set('已实施项目中客户的付款情况', ['按约定付款，非常及时', '催促后基本能够按时付款', '拖欠时间较长，付款较难'].map(item => ({ label: item, value: item })))
map.set('付款结算周期', ['周期短(一个月内)', '周期中等(1-3个月)', '周期长(超3个月)'].map(item => ({ label: item, value: item })))
map.set('回款及时率', ['按约定回款', '不超过约定3个月', '超过约定3个月'].map(item => ({ label: item, value: item })))
map.set('账目清晰程度', ['清晰', '比较清晰', '不清晰'].map(item => ({ label: item, value: item })))
map.set('其他信誉情况', ['信誉高', '信誉中等', '信誉差'].map(item => ({ label: item, value: item })))

export default (props) => {
  let { form, type } = props

  useEffect(async () => {
    form.query('*(deptName,displayName,createDate)').forEach(field => {
      field.setPattern('disabled')
    })
    if (type === 'add') {
      const user = session.getItem('user')
      form.setInitialValues({
        createDate: new Date().Format('yyyy-MM-dd'),
        displayName: user.displayName, loginName: user.loginName,
        deptId: user.deptId, deptName: user.deptName,
      })
      form.query('list').take().value = [
        '企业性质', '注册资本', '资产负债率情况', '是否经营风险性项目(比如期货、股票交易或价格波动较大的产品)', '不良记录情况(比如恶意欠款，恶意因质量问题拒付客户账款、法院裁决、被法院强制执行信息、其他)',
        '已实施项目中客户的付款情况', '付款结算周期', '回款及时率', '账目清晰程度', '其他信誉情况',
      ].map(item => ({ kpi: item, standard: ' ' }))
    }
  }, [])


  form.addEffects('id', () => {
    onFieldReact('list.*.item', (field) => {
      field.query('.endScore').take()?.setPattern('disabled')
      let kpiValue = field.query('.kpi').get('value')
      if (kpiValue) {
        field.dataSource = map.get(kpiValue)
      }
    })
    onFieldReact('list.*.standard', (field) => {
      let kpiValue = field.query('.kpi').get('value')
      let itemValue = field.query('.item').get('value')
      if (itemValue) {
        let startScoreField = field.query('.startScore').take()
        let endScoreField = field.query('.endScore').take()
        if (kpiValue === '企业性质') {
          if (itemValue === '国有军工系统企业') {
            field.value = '9-10分'
            startScoreField && startScoreField.setValidator({ minimum: 9, maximum: 10, required: true })
            endScoreField && endScoreField.setValidator({ minimum: 9, maximum: 10, required: true })
          } else if (itemValue === '国有其他企业') {
            field.value = '6-8分'
            startScoreField && startScoreField.setValidator({ minimum: 6, maximum: 8, required: true })
            endScoreField && endScoreField.setValidator({ minimum: 6, maximum: 8, required: true })
          } else if (itemValue === '民营等企业') {
            field.value = '<6分'
            startScoreField && startScoreField.setValidator({ minimum: 0, maximum: 6, required: true })
            endScoreField && endScoreField.setValidator({ minimum: 0, maximum: 6, required: true })
          }
          endScoreField && endScoreField.setPattern('disabled')
        }
        if (kpiValue === '注册资本') {
          if (itemValue === '注册资本≥1000万') {
            field.value = '9-10分'
            startScoreField && startScoreField.setValidator({ minimum: 9, maximum: 10, required: true })
            endScoreField && endScoreField.setValidator({ minimum: 9, maximum: 10, required: true })
          } else if (itemValue === '1000万>注册资本≥300万') {
            field.value = '6-8分'
            startScoreField && startScoreField.setValidator({ minimum: 6, maximum: 8, required: true })
            endScoreField && endScoreField.setValidator({ minimum: 6, maximum: 8, required: true })
          } else if (itemValue === '注册资本<300万') {
            field.value = '<6分'
            startScoreField && startScoreField.setValidator({ minimum: 0, maximum: 6, required: true })
            endScoreField && endScoreField.setValidator({ minimum: 0, maximum: 6, required: true })
          }
          endScoreField && endScoreField.setPattern('disabled')
        }
        if (kpiValue === '资产负债率情况') {
          if (itemValue === '负债率≤50%(较低)') {
            field.value = '9-10分'
            startScoreField && startScoreField.setValidator({ minimum: 9, maximum: 10, required: true })
            endScoreField && endScoreField.setValidator({ minimum: 9, maximum: 10, required: true })
          } else if (itemValue === '50%<负债率≤75%(一般)') {
            field.value = '6-8分'
            startScoreField && startScoreField.setValidator({ minimum: 6, maximum: 8, required: true })
            endScoreField && endScoreField.setValidator({ minimum: 6, maximum: 8, required: true })
          } else if (itemValue === '75%<负债率(较高)') {
            field.value = '<6分'
            startScoreField && startScoreField.setValidator({ minimum: 0, maximum: 6, required: true })
            endScoreField && endScoreField.setValidator({ minimum: 0, maximum: 6, required: true })
          }
        }
        if (kpiValue === '是否经营风险性项目(比如期货、股票交易或价格波动较大的产品)') {
          if (itemValue === '没有') {
            field.value = '9-10分'
            startScoreField && startScoreField.setValidator({ minimum: 9, maximum: 10, required: true })
            endScoreField && endScoreField.setValidator({ minimum: 9, maximum: 10, required: true })
          } else if (itemValue === '有，但资金占用很小，不超过 流动资产的 20%') {
            field.value = '6-8分'
            startScoreField && startScoreField.setValidator({ minimum: 6, maximum: 8, required: true })
            endScoreField && endScoreField.setValidator({ minimum: 6, maximum: 8, required: true })
          } else if (itemValue === '有且规模较大或为主营业务') {
            field.value = '<6分'
            startScoreField && startScoreField.setValidator({ minimum: 0, maximum: 6, required: true })
            endScoreField && endScoreField.setValidator({ minimum: 0, maximum: 6, required: true })
          }
        }
        if (kpiValue === '不良记录情况(比如恶意欠款，恶意因质量问题拒付客户账款、法院裁决、被法院强制执行信息、其他)') {
          if (itemValue === '无') {
            field.value = '9-10分'
            startScoreField && startScoreField.setValidator({ minimum: 9, maximum: 10, required: true })
            endScoreField && endScoreField.setValidator({ minimum: 9, maximum: 10, required: true })
          } else if (itemValue === '有，但体量小，有争议') {
            field.value = '6-8分'
            startScoreField && startScoreField.setValidator({ minimum: 6, maximum: 8, required: true })
            endScoreField && endScoreField.setValidator({ minimum: 6, maximum: 8, required: true })
          } else if (itemValue === '有，影响较大') {
            field.value = '<6分'
            startScoreField && startScoreField.setValidator({ minimum: 0, maximum: 6, required: true })
            endScoreField && endScoreField.setValidator({ minimum: 0, maximum: 6, required: true })
          }
        }
        if (kpiValue === '已实施项目中客户的付款情况') {
          if (itemValue === '按约定付款，非常及时') {
            field.value = '9-10分'
            startScoreField && startScoreField.setValidator({ minimum: 9, maximum: 10, required: true })
            endScoreField && endScoreField.setValidator({ minimum: 9, maximum: 10, required: true })
          } else if (itemValue === '催促后基本能够按时付款') {
            field.value = '6-8分'
            startScoreField && startScoreField.setValidator({ minimum: 6, maximum: 8, required: true })
            endScoreField && endScoreField.setValidator({ minimum: 6, maximum: 8, required: true })
          } else if (itemValue === '拖欠时间较长，付款较难') {
            field.value = '<6分'
            startScoreField && startScoreField.setValidator({ minimum: 0, maximum: 6, required: true })
            endScoreField && endScoreField.setValidator({ minimum: 0, maximum: 6, required: true })
          }
        }
        if (kpiValue === '付款结算周期') {
          if (itemValue === '周期短(一个月内)') {
            field.value = '9-10分'
            startScoreField && startScoreField.setValidator({ minimum: 9, maximum: 10, required: true })
            endScoreField && endScoreField.setValidator({ minimum: 9, maximum: 10, required: true })
          } else if (itemValue === '周期中等(1-3个月)') {
            field.value = '6-8分'
            startScoreField && startScoreField.setValidator({ minimum: 6, maximum: 8, required: true })
            endScoreField && endScoreField.setValidator({ minimum: 6, maximum: 8, required: true })
          } else if (itemValue === '周期长(超3个月)') {
            field.value = '<6分'
            startScoreField && startScoreField.setValidator({ minimum: 0, maximum: 6, required: true })
            endScoreField && endScoreField.setValidator({ minimum: 0, maximum: 6, required: true })
          }
        }
        if (kpiValue === '回款及时率') {
          if (itemValue === '按约定回款') {
            field.value = '9-10分'
            startScoreField && startScoreField.setValidator({ minimum: 9, maximum: 10, required: true })
            endScoreField && endScoreField.setValidator({ minimum: 9, maximum: 10, required: true })
          } else if (itemValue === '不超过约定3个月') {
            field.value = '6-8分'
            startScoreField && startScoreField.setValidator({ minimum: 6, maximum: 8, required: true })
            endScoreField && endScoreField.setValidator({ minimum: 6, maximum: 8, required: true })
          } else if (itemValue === '超过约定3个月') {
            field.value = '<6分'
            startScoreField && startScoreField.setValidator({ minimum: 0, maximum: 6, required: true })
            endScoreField && endScoreField.setValidator({ minimum: 0, maximum: 6, required: true })
          }
        }
        if (kpiValue === '账目清晰程度') {
          if (itemValue === '清晰') {
            field.value = '9-10分'
            startScoreField && startScoreField.setValidator({ minimum: 9, maximum: 10, required: true })
            endScoreField && endScoreField.setValidator({ minimum: 9, maximum: 10, required: true })
          } else if (itemValue === '比较清晰') {
            field.value = '6-8分'
            startScoreField && startScoreField.setValidator({ minimum: 6, maximum: 8, required: true })
            endScoreField && endScoreField.setValidator({ minimum: 6, maximum: 8, required: true })
          } else if (itemValue === '不清晰') {
            field.value = '<6分'
            startScoreField && startScoreField.setValidator({ minimum: 0, maximum: 6, required: true })
            endScoreField && endScoreField.setValidator({ minimum: 0, maximum: 6, required: true })
          }
        }
        if (kpiValue === '其他信誉情况') {
          if (itemValue === '信誉高') {
            field.value = '9-10分'
            startScoreField && startScoreField.setValidator({ minimum: 9, maximum: 10, required: true })
            endScoreField && endScoreField.setValidator({ minimum: 9, maximum: 10, required: true })
          } else if (itemValue === '信誉中等') {
            field.value = '6-8分'
            startScoreField && startScoreField.setValidator({ minimum: 6, maximum: 8, required: true })
            endScoreField && endScoreField.setValidator({ minimum: 6, maximum: 8, required: true })
          } else if (itemValue === '信誉差') {
            field.value = '<6分'
            startScoreField && startScoreField.setValidator({ minimum: 0, maximum: 6, required: true })
            endScoreField && endScoreField.setValidator({ minimum: 0, maximum: 6, required: true })
          }
        }
      }
    })
  })

  const onClick = () => {
    let dialog2 = FormDialog({ footer: null, keyboard: false, maskClosable: false, width: 700 },
      (form2) => {
        return <>
          <CustomerDialog form={form2} dialog={dialog2} selectedId={form.values.customerId}/>
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
                      customerProperty: values.selectedRow.property,
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

  return <ConfigProvider locale={zhCN}>
    <Form form={form} labelWidth={90}>
      <SchemaField>
        <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 3, strictAutoFit: true }}>
          <SchemaField.String
            name="deptName" title="申请部门" x-component="Input" x-decorator="FormItem"
          />
          <SchemaField.String name="displayName" title="申请人" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="createDate" title="打分日期" x-decorator="FormItem" x-component="DatePicker"/>
          <SchemaField.String
            name="customerName" required title="客户名称" x-component="InputButton" x-decorator="FormItem"
            x-component-props={{ onClick: onClick }}
          />
        </SchemaField.Void>
        <SchemaField.Array
          name="list" x-decorator="FormItem" x-component="ArrayTable"
          x-component-props={{
            size: 'small',
            pagination: { pageSize: 200 },
            sticky: true,
            footer: () => ('初次评定打分时，部分没有发生的项目由业务人员根据了解的该企业与其他客户合作情况打分；完全不清楚的，一律打 4 分。'),
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
              x-component-props={{ title: '评价指标', align: 'center' }}
            >
              <SchemaField.String name="kpi" x-decorator="FormItem" x-component="PreviewText.Input"/>
            </SchemaField.Void>
            <SchemaField.Void
              x-component="ArrayTable.Column"
              x-component-props={{ title: '评分项', align: 'center' }}
            >
              <SchemaField.String name="item" required x-decorator="FormItem" x-component="Select"/>
            </SchemaField.Void>
            <SchemaField.Void
              x-component="ArrayTable.Column"
              x-component-props={{ width: 100, title: '得分标准', align: 'center' }}
            >
              <SchemaField.String name="standard" x-decorator="FormItem" x-component="PreviewText.Input"/>
            </SchemaField.Void>
            <SchemaField.Void
              x-component="ArrayTable.Column"
              x-component-props={{ width: 120, title: '初评得分', align: 'center' }}
            >
              <SchemaField.Number x-decorator="FormItem" required name="startScore" x-component="NumberPicker"/>
            </SchemaField.Void>
            <SchemaField.Void
              x-component="ArrayTable.Column"
              x-component-props={{ width: 120, title: <span>专业审查<br/>部门打分</span>, align: 'center' }}
            >
              <SchemaField.Number x-decorator="FormItem" name="endScore" x-component="NumberPicker"/>
            </SchemaField.Void>
          </SchemaField.Object>
        </SchemaField.Array>
        <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 3, strictAutoFit: true }}>
          <SchemaField.Number name="startScore" title="初评得分"
                              x-decorator="FormItem" x-component="NumberPicker"/>
          <SchemaField.Number name="endScore" title="部门打分" x-decorator="FormItem" x-component="NumberPicker"/>
        </SchemaField.Void>
      </SchemaField>
    </Form>
  </ConfigProvider>
}

