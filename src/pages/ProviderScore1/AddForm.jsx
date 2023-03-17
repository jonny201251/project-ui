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
import { ArrayTableIndex, InputButton, LoadingButton, NumberPicker,Text } from '../../components'
import { session } from '../../utils'
import { onFieldReact } from '@formily/core'
import ProviderDialog from './DialogList'

const SchemaField = createSchemaField({
  components: {
    FormItem, FormLayout, Input, PreviewText, Select, NumberPicker, ArrayTableIndex,
    ArrayTable, FormGrid, DatePicker, InputButton, Radio,Text
  },
})

let map = new Map()
map.set('注册资本', ['注册资本≥500万', '500万>注册资本≥100万', '注册资本<100万'].map(item => ({ label: item, value: item })))
map.set('合同法律风险', ['没有', '有,但风险较小在可控范围内', '有,且风险较大'].map(item => ({ label: item, value: item })))
map.set('供货合同风险', ['没有', '有,但风险较小在可控范围内', '有,且风险较大'].map(item => ({ label: item, value: item })))
map.set('不良记录情况(比如恶意拖欠农民工工资等)', ['无', '有,影响较小', '有,影响较大'].map(item => ({ label: item, value: item })))
map.set('产品服务质量及价格水平', ['与同类型供方相比性价比较高', '与同类型供方相比性价比一般', '与同类型供方相比性价比较差'].map(item => ({ label: item, value: item })))
map.set('产品服务供货及使用情况', [
  '按约定供货及时,采购主体使用情况良好', '按约定供货及时,采购主体使用情况一般', '未按约定及时供货,采购主体使用情况较差',
].map(item => ({ label: item, value: item })))

export default (props) => {
  let { form, type } = props

  useEffect(async () => {
    form.query('*(deptName,displayName,createDatetime,usee,startScore,endScore)').forEach(field => {
      field.setPattern('disabled')
    })
    const user = session.getItem('user')
    if (type === 'add') {
      form.setInitialValues({
        type: '民用产业项目', createDatetime: new Date().Format('yyyy-MM-dd hh:mm:ss'),
        userId: user.id, displayName: user.displayName, loginName: user.loginName,
        deptId: user.deptId, deptName: user.deptName,
        startScore: 0, endScore: 0,
      })
      initList('民用产业项目')
    }
  }, [])

  const onSelect = (value) => {
    form.query('startScore').take().value = 0
    initList(value)
    form.clearErrors()
  }

  const onChange = (e) => {
    form.query('startScore').take().value = 0
    let value = e.target.value
    initList(value)
    form.clearErrors()
  }

  const initList = (value) => {
    if (value === '民用产业项目') {
      form.query('providerScore2List').take().value = [
        '注册资本', '合同法律风险', '不良记录情况(比如恶意拖欠农民工工资等)', '产品服务质量及价格水平', '产品服务供货及使用情况',
      ].map(item => ({ kpi: item, standard: ' ' }))
    } else {
      form.query('providerScore2List').take().value = [
        '注册资本', '供货合同风险', '不良记录情况(比如恶意拖欠农民工工资等)', '产品服务质量及价格水平', '产品服务供货及使用情况',
      ].map(item => ({ kpi: item, standard: ' ' }))
    }
  }

  form.addEffects('id', () => {
    onFieldReact('providerScore2List.*.item', (field) => {
      if (session.getItem('user').loginName !== '孙欢') {
        field.query('.endScore').take()?.setPattern('disabled')
      }
      let kpiValue = field.query('.kpi').get('value')
      if (kpiValue) {
        field.dataSource = map.get(kpiValue)
      }
    })
    onFieldReact('providerScore2List.*.standard', (field) => {
      let kpiValue = field.query('.kpi').get('value')
      let itemValue = field.query('.item').get('value')
      if (itemValue) {
        let startScoreField = field.query('.startScore').take()
        let endScoreField = field.query('.endScore').take()
        if (kpiValue === '注册资本') {
          if (itemValue === '注册资本≥500万') {
            field.value = '9-10分'
            startScoreField && startScoreField.setValidator({ minimum: 9, maximum: 10, required: true })
            endScoreField && endScoreField.setValidator({ minimum: 9, maximum: 10, required: true })
          } else if (itemValue === '500万>注册资本≥100万') {
            field.value = '6-8分'
            startScoreField && startScoreField.setValidator({ minimum: 6, maximum: 8, required: true })
            endScoreField && endScoreField.setValidator({ minimum: 6, maximum: 8, required: true })
          } else if (itemValue === '注册资本<100万') {
            field.value = '<6分'
            startScoreField && startScoreField.setValidator({ minimum: 0, maximum: 6, required: true })
            endScoreField && endScoreField.setValidator({ minimum: 0, maximum: 6, required: true })
          }
          if (session.getItem('user').loginName !== '孙欢') {
            endScoreField?.setPattern('disabled')
          }
        }
        if (kpiValue === '合同法律风险' || kpiValue === '供货合同风险') {
          if (itemValue === '没有') {
            field.value = '9-10分'
            startScoreField && startScoreField.setValidator({ minimum: 9, maximum: 10, required: true })
            endScoreField && endScoreField.setValidator({ minimum: 9, maximum: 10, required: true })
          } else if (itemValue === '有,但风险较小在可控范围内') {
            field.value = '6-8分'
            startScoreField && startScoreField.setValidator({ minimum: 6, maximum: 8, required: true })
            endScoreField && endScoreField.setValidator({ minimum: 6, maximum: 8, required: true })
          } else if (itemValue === '有,且风险较大') {
            field.value = '<6分'
            startScoreField && startScoreField.setValidator({ minimum: 0, maximum: 6, required: true })
            endScoreField && endScoreField.setValidator({ minimum: 0, maximum: 6, required: true })
          }
          if (session.getItem('user').loginName !== '孙欢') {
            endScoreField?.setPattern('disabled')
          }
        }
        if (kpiValue === '不良记录情况(比如恶意拖欠农民工工资等)') {
          if (itemValue === '无') {
            field.value = '9-10分'
            startScoreField && startScoreField.setValidator({ minimum: 9, maximum: 10, required: true })
            endScoreField && endScoreField.setValidator({ minimum: 9, maximum: 10, required: true })
          } else if (itemValue === '有,影响较小') {
            field.value = '6-8分'
            startScoreField && startScoreField.setValidator({ minimum: 6, maximum: 8, required: true })
            endScoreField && endScoreField.setValidator({ minimum: 6, maximum: 8, required: true })
          } else if (itemValue === '有,影响较大') {
            field.value = '<6分'
            startScoreField && startScoreField.setValidator({ minimum: 0, maximum: 6, required: true })
            endScoreField && endScoreField.setValidator({ minimum: 0, maximum: 6, required: true })
          }
        }
        if (kpiValue === '产品服务质量及价格水平') {
          if (itemValue === '与同类型供方相比性价比较高') {
            field.value = '9-10分'
            startScoreField && startScoreField.setValidator({ minimum: 9, maximum: 10, required: true })
            endScoreField && endScoreField.setValidator({ minimum: 9, maximum: 10, required: true })
          } else if (itemValue === '与同类型供方相比性价比一般') {
            field.value = '6-8分'
            startScoreField && startScoreField.setValidator({ minimum: 6, maximum: 8, required: true })
            endScoreField && endScoreField.setValidator({ minimum: 6, maximum: 8, required: true })
          } else if (itemValue === '与同类型供方相比性价比较差') {
            field.value = '<6分'
            startScoreField && startScoreField.setValidator({ minimum: 0, maximum: 6, required: true })
            endScoreField && endScoreField.setValidator({ minimum: 0, maximum: 6, required: true })
          }
        }
        if (kpiValue === '产品服务供货及使用情况') {
          if (itemValue === '按约定供货及时,采购主体使用情况良好') {
            field.value = '8-10分'
            startScoreField && startScoreField.setValidator({ minimum: 8, maximum: 10, required: true })
            endScoreField && endScoreField.setValidator({ minimum: 8, maximum: 10, required: true })
          } else if (itemValue === '按约定供货及时,采购主体使用情况一般') {
            field.value = '6-7分'
            startScoreField && startScoreField.setValidator({ minimum: 6, maximum: 7, required: true })
            endScoreField && endScoreField.setValidator({ minimum: 6, maximum: 7, required: true })
          } else if (itemValue === '未按约定及时供货,采购主体使用情况较差') {
            field.value = '<6分'
            startScoreField && startScoreField.setValidator({ minimum: 0, maximum: 6, required: true })
            endScoreField && endScoreField.setValidator({ minimum: 0, maximum: 6, required: true })
          }
        }
      }
    })

    onFieldReact('providerScore2List.*.startScore', (field) => {
      let sum = 0
      form.query('providerScore2List.*.startScore').forEach(field => {
        if (field.value) {
          sum += field.value
        }
      })
      let tmp = form.query('startScore').take()
      if (tmp && sum) {
        tmp.value = sum
      }
    })

    onFieldReact('providerScore2List.*.endScore', (field) => {
      let sum = 0
      form.query('providerScore2List.*.endScore').forEach(field => {
        if (field.value) {
          sum += field.value
        }
      })
      let tmp = form.query('endScore').take()
      if (tmp && sum) {
        tmp.value = sum
      }
    })

  })

  const onClick = () => {
    let dialog2 = FormDialog({ footer: null, keyboard: false, maskClosable: false, width: 800 },
      (form2) => {
        return <>
          <ProviderDialog form={form2} dialog={dialog2} selectedId={form.values.providerId}/>
          <FormDialog.Footer>
            <FormButtonGroup gutter={16} align={'right'}>
              <Button onClick={() => dialog2.close()}>取消</Button>
              <LoadingButton
                onClick={async () => {
                  const values = await form2.submit()
                  if (values.selectedRow) {
                    form.setValues({
                      providerId: values.selectedRow.id,
                      usee: values.selectedRow.usee,
                      providerName: values.selectedRow.name,
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

  const showResult = () => {
    const user = session.getItem('user')
    if (user.loginName === '孙欢') {
      return <SchemaField.String
        name="result" required title={<b>结论</b>} x-decorator="FormItem" x-component="Radio.Group"
        enum={[
          { label: '合格', value: '合格' },
          { label: '不合格', value: '不合格' },
        ]}
      />
    } else {
      return <SchemaField.String name="result" title={<b>结论</b>}
                                 x-decorator="FormItem" x-component="Text"/>
    }
  }

  return <ConfigProvider locale={zhCN}>
    <Form form={form} labelWidth={90}>
      <SchemaField>
        <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 3, strictAutoFit: true }}>
          <SchemaField.String name="displayName" title="申请人" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String
            name="deptName" title="申请部门" x-component="Input" x-decorator="FormItem"
          />
          <SchemaField.String name="createDatetime" title="申请时间" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String
            name="type" required title="项目类别" x-decorator="FormItem" x-component="Select"
            enum={[
              { label: '民用产业项目', value: '民用产业项目' },
              { label: '自筹资金项目', value: '自筹资金项目' },
              { label: '技改项目', value: '技改项目' },
            ]}
            x-component-props={{ onSelect: onSelect }}
          />
          <SchemaField.String
            name="providerName" required title="供方名称" x-component="InputButton" x-decorator="FormItem"
            x-component-props={{ onClick: onClick }}
          />
          <SchemaField.String
            name="usee" required title="供方用途" x-component="Input" x-decorator="FormItem"
          />
        </SchemaField.Void>
        <SchemaField.Array
          name="providerScore2List" x-decorator="FormItem" x-component="ArrayTable"
          x-component-props={{
            size: 'small',
            pagination: { pageSize: 200 },
            sticky: true,
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
              x-component-props={{ width: 120, title: '得分标准', align: 'center' }}
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
              x-component-props={{ width: 100, title: <span>专业审查<br/>部门打分</span>, align: 'center' }}
            >
              <SchemaField.Number x-decorator="FormItem" name="endScore" x-component="NumberPicker"/>
            </SchemaField.Void>
          </SchemaField.Object>
        </SchemaField.Array>
        <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 3, strictAutoFit: true }}>
          <SchemaField.Number name="startScore" title={<b>初评得分</b>}
                              x-decorator="FormItem" x-component="PreviewText.Input"/>
          <SchemaField.Number name="endScore" title={<b>部门打分</b>}
                              x-decorator="FormItem" x-component="PreviewText.Input"/>
          {showResult()}
          {/*          <SchemaField.Number name="endScore" title="最终得分" x-decorator="FormItem" x-component="NumberPicker"/>
          <SchemaField.String
            name="result" required title="结论" x-decorator="FormItem" x-component="Select"
            enum={[
              { label: '同意', value: '同意' },
              { label: '不同意', value: '不同意' },
              { label: '列入合格供方', value: '列入合格供方' },
            ]}
          />*/}
        </SchemaField.Void>
      </SchemaField>
    </Form>
  </ConfigProvider>
}

