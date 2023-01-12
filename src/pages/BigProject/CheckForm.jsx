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
import { Button, ConfigProvider, Divider, message, Tabs } from 'antd'
import { get, projectCodePath, session } from '../../utils'
import {
  ArrayTableAddition,
  ArrayTableIndex,
  ArrayTableRemove,
  Line,
  LoadingButton,
  MyCard,
  NumberPicker,
} from '../../components'
import DialogList from './DialogList'
import DialogList2 from './DialogList2'
import { SearchOutlined } from '@ant-design/icons'
import styles from '../table-placeholder.less'
import { onFieldReact } from '@formily/core'
import ProcessDesignGraph from '../ProcessDesignGraph'
import ProcessInstNodeList from '../ProcessInstNode/List'

const InputButton = (props) => {
  return <div style={{ display: 'inline-flex', width: '100%' }}>
    <Input {...props} style={{ ...props.style }}/>
    <Button onClick={(e) => {
      if (props.onClick) {
        props.onClick('open')
      }
    }} icon={<SearchOutlined/>} type={'primary'}/>
  </div>
}

const InputButton2 = (props) => {
  return <div style={{ display: 'inline-flex', width: '100%' }}>
    <Input {...props} style={{ ...props.style }}/>
    <Button onClick={(e) => {
      if (props.onClick) {
        props.onClick('open')
      }
    }} icon={<SearchOutlined/>} type={'primary'}/>
  </div>
}

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
    Select, InputButton, InputButton2, ArrayTable, ArrayTableIndex, ArrayTableRemove, ArrayTableAddition,
    MyCard, Divider, InputButton3, Line,
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
map.set('项目评分', ['', '', '', '', '', ''].map(item => ({ label: item, value: item })))
map.set('否决项', ['是', '否'].map(item => ({ label: item, value: item })))

map.set('甲方角色', ['业主', '总包', '其他'].map(item => ({ label: item, value: item })))
map.set('甲方企业性质', ['集团所属企业', '地级市以上政府', '国企', '县级以下政府', '民企', '其他'].map(item => ({ label: item, value: item })))

map.set('企业性质', ['集团所属企业', '国企', '民企', '其他'].map(item => ({ label: item, value: item })))

export default (props) => {
  let { form, type, record } = props

  useEffect(async () => {
    form.query('*(displayName,deptName,createDatetime,startDisplay,endDisplay,remark2)').forEach(field => {
      field.setPattern('disabled')
    })
    form.query('remark2').take().value = '1.评分权重\n' +
      '一、二类项目：项目、甲方（业主）评分占比为 6:4；三类项目：项目、甲方（业主）、战略伙伴评分占比为 4:2:4。\n' +
      '2.评估结论\n' +
      '评分 90 分（含）以上为低风险项目；评分 70 分（含）以上为中等风险项目；评分 70 分以下为高风险项目'
    if (type === 'add') {
      const user = session.getItem('user')
      form.setInitialValues({
        createDatetime: new Date().Format('yyyy-MM-dd hh:mm:ss'),
        displayName: user.displayName, displayNamee: user.displayName, loginName: user.loginName,
        deptId: user.deptId, deptName: user.deptName,
      })
      let list4Field = form.query('list4').take()
      list4Field && list4Field.setDisplay('none')
    }

    form.query('list2').take().value = [
      { desc1: '资金来源', scoreDesc: '国拨得分 8～10；自筹、地方政府得分 6～8；贷款、外资投资得分0～6；其他 0～8' },
      { desc1: '资金落实情况', scoreDesc: '落实到位得分 7～12；未落实得分0～6' },
      { desc1: '付款方式', scoreDesc: '进度、节点付款得分 5～11；开工前一次性付款得满12分；完工后一次性付款得分 0～8' },
      { desc1: '垫资额度(万元)', scoreDesc: '无垫资得满10分；垫资额占合同额比值(简称占比)10%以内得分 7～9；占比 20%以内得分 5～6；占比20%及以上得分 0～4' },
      { desc1: '垫资期限/周期(日历天)', scoreDesc: '无垫资得满8分；半年以内得分 6～7；一年以内得分 4～5；两年以内得分 2～3；两年及以上得分 0～1' },
      { desc1: '项目周期', scoreDesc: '根据项目周期与工程量的匹配程度视情评分' },
      { desc1: '项目类型', scoreDesc: '综合体、市政工程得分 4～5；园区、小区及其他得分 0～4' },
      { desc1: '公司角色', scoreDesc: '总包得分 4～5；分包得分 0～4' },
      { desc1: '项目模式', scoreDesc: 'EPC 得分 1～4；其他得分 2～5' },
      { desc1: '履约保证金比例', scoreDesc: '10%(含)以下得分 4～6；10%以上得分 0～3' },
      { desc1: '质保金比例', scoreDesc: '3%(含)以下得分 2～3；3%以上得分 0～2' },
      { desc1: '标前项目进度', scoreDesc: '未开工得满5分；开工进度 10%以内得分 3～4；开工进度 30%以内得分 2～3；开工进度 30%及以上得分 0～2' },
      { desc1: '一类项目条件', scoreDesc: '具备条件得满8分；否则得 0 分' },
      { desc1: '其他因素', scoreDesc: '无其他因素得满5分；有其他因素适情评' },
      { desc1: '项目评分', scoreDesc: '  ' },
      { desc1: '否决项', scoreDesc: 'PPP、BT、BOT类项目；评分低于60分' },
    ].map(obj => ({ desc1: obj.desc1, standard: ' ', scoreDesc: obj.scoreDesc }))

    form.query('list3').take().value = [
      { desc1: '甲方角色', scoreDesc: '业主得分 8～10；总包得分 5～8；其他 0～8' },
      { desc1: '甲方企业性质', scoreDesc: '集团所属企业、地级市以上政府得分 8～10；国企、县级以下政府得分 6～9；民企得分 3～8；其他得分 0～7' },
      { desc1: '甲方注册时间', scoreDesc: '一年以下得分 0～1；两年以下得分 1～2；两年及以上得满分' },
      { desc1: '标的金额/甲方注册资本', scoreDesc: '政府部门得满分；比值≤1 得分8～10；比值≤5 得分 5～7；比值＞5 得分 0～4' },
      { desc1: '甲方诉讼/失信事项', scoreDesc: '无相关事项得满分；近一年内有相关事项得分 0～6；近三年内有相关事项得分 0～8；近五年内有相关事项得分 0～9' },
      { desc1: '甲方股权出质比例', scoreDesc: '未出质得满分；比例 1/3 以下得分 7～9；比例 2/3 以下得分 4～6；比例 2/3 及以上得分 0～3' },
      { desc1: '其他因素', scoreDesc: '无其他因素得满分；有其他因素适情评分' },
      { desc1: '甲方(业主)评分', scoreDesc: '  ' },
      { desc1: '否决项', scoreDesc: '集团、三院、公司黑灰名单；评分低于 60 分' },
    ].map(obj => ({ desc1: obj.desc1, standard: ' ', scoreDesc: obj.scoreDesc }))

    form.query('list4').take().value = [
      { desc1: '企业性质', scoreDesc: '集团所属企业、国企 8～12；民企得分 3～10；其他得分 0～9' },
      { desc1: '注册时间', scoreDesc: '一年以下得分 0～1；两年以下得分 1～3；两年及以上得分 3～5' },
      { desc1: '标的金额/注册资本', scoreDesc: '比值≤1 得分 16～20；比值≤5 得分 10～15；比值＞5 得分 0～' },
      { desc1: '公司实缴金额/注册资本', scoreDesc: '评分值按照比值乘以分值计算(四舍五入取整)' },
      { desc1: '诉讼/失信事项', scoreDesc: '无相关事项得满分；近一年内有相关事项得分 0～10；近三年内有相关事项得分 0～12；近五年内有相关事项得分 0～14' },
      { desc1: '合作业绩', scoreDesc: '无合作业绩得分 0～4；有一项得分 3～5；有三项以下得分 6～9；有三项及以上得分 10～1' },
      { desc1: '项目实施能力', scoreDesc: '具备项目直接实施能力得分 8～10；不具备项目直接实施能力得分 0～5' },
      { desc1: '其他因素', scoreDesc: '无其他因素得满分；有其他因素适情评分' },
      { desc1: '战略伙伴评分', scoreDesc: '  ' },
      { desc1: '否决项', scoreDesc: '集团、三院、公司黑灰名单；评分低于 60 分' },
    ].map(obj => ({ desc1: obj.desc1, standard: ' ', scoreDesc: obj.scoreDesc }))

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
          form.query('*(strategyName,strategyProperty)')
            .forEach(fieldd => fieldd.setState({ required: true, pattern: 'editable' }))
          list4Field && list4Field.setDisplay('visible')
        } else {
          form.query('*(strategyName,strategyProperty)')
            .forEach(fieldd => fieldd.setState({ pattern: 'disabled', value: null }))

          list4Field && list4Field.setDisplay('none')
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
        field.setComponent('Line')
        standardField && standardField.setValue('0-100分')
      } else if (desc1Value === '否决项') {
        standardField && standardField.setValue('--')
      }

    })
    onFieldReact('list2.*.standard', (field) => {
      let desc1Value = field.query('.desc1').get('value')
      let desc2Value = field.query('.desc2').get('value')
      if (desc2Value) {
        console.log(desc1Value)
        let desc2Field = field.query('.desc2').take()
        let scoreField = field.query('.score').take()
        scoreField && scoreField.setValue(null)
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
            scoreField && scoreField.setValidator({ minimum: 4, maximum: 4, required: true })
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

    onFieldReact('list3.*.desc2', (field) => {
      let desc1Value = field.query('.desc1').get('value')
      if (desc1Value) {
        field.dataSource = map.get(desc1Value)
      }
      //
      let scoreField = field.query('.score').take()
      let standardField = field.query('.standard').take()
      if (desc1Value === '甲方注册时间') {
        field.setComponent('DatePicker')
        scoreField && scoreField.setValidator({ minimum: 0, maximum: 3, required: true })
        standardField && standardField.setValue('0-3分')
      } else if (desc1Value === '标的金额/甲方注册资本') {
        field.setComponent('Input')
        scoreField && scoreField.setValidator({ minimum: 0, maximum: 10, required: true })
        standardField && standardField.setValue('0-10分')
      } else if (desc1Value === '甲方诉讼/失信事项') {
        field.setComponent('Input')
        scoreField && scoreField.setValidator({ minimum: 0, maximum: 10, required: true })
        standardField && standardField.setValue('0-10分')
      } else if (desc1Value === '甲方股权出质比例') {
        field.setComponent('Input')
        scoreField && scoreField.setValidator({ minimum: 0, maximum: 10, required: true })
        standardField && standardField.setValue('0-10分')
      } else if (desc1Value === '其他因素') {
        field.setComponent('Input')
        scoreField && scoreField.setValidator({ minimum: 0, maximum: 4, required: true })
        standardField && standardField.setValue('0-4分')
      } else if (desc1Value === '甲方(业主)评分') {
        field.setComponent('Line')
        standardField && standardField.setValue('0-100分')
      } else if (desc1Value === '否决项') {
        standardField && standardField.setValue('--')
      }

    })
    onFieldReact('list3.*.standard', (field) => {
      let desc1Value = field.query('.desc1').get('value')
      let desc2Value = field.query('.desc2').get('value')
      if (desc2Value) {
        console.log(desc1Value)
        let desc2Field = field.query('.desc2').take()
        let scoreField = field.query('.score').take()
        scoreField && scoreField.setValue(null)
        if (desc1Value === '甲方角色') {
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
        } else if (desc1Value === '甲方企业性质') {
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
      } else if (desc1Value === '战略伙伴评分') {
        field.setComponent('Line')
        standardField && standardField.setValue('0-100分')
      } else if (desc1Value === '否决项') {
        standardField && standardField.setValue('--')
      }

    })
    onFieldReact('list4.*.standard', (field) => {
      let desc1Value = field.query('.desc1').get('value')
      let desc2Value = field.query('.desc2').get('value')
      if (desc2Value) {
        console.log(desc1Value)
        let desc2Field = field.query('.desc2').take()
        let scoreField = field.query('.score').take()
        scoreField && scoreField.setValue(null)
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
                    console.log(values)
                    console.log(values.selectedRow.startScore)
                    if (values.selectedRow) {
                      form.setValues({
                        customerId: values.selectedRow.id,
                        customerName: values.selectedRow.name,
                        customerProperty: values.selectedRow.property,
                        startScore: values.selectedRow.startScore,
                        startResult: values.selectedRow.startResult,
                        endScore: values.selectedRow.endScore,
                        endResult: values.selectedRow.endResult,
                      })
                      if (values.selectedRow.startScore) {
                        form.setValues({
                          startScore: values.selectedRow.startScore,
                          startResult: values.selectedRow.startResult,
                          endScore: values.selectedRow.endScore,
                          endResult: values.selectedRow.endResult,
                          startDisplay: values.selectedRow.startScore + '分，' + values.selectedRow.startResult,
                          endDisplay: values.selectedRow.endScore + '分，' + values.selectedRow.endResult,
                        })
                      }
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
                        strategyId: values.selectedRow.id,
                        strategyName: values.selectedRow.name,
                        strategyProperty: values.selectedRow.property,
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
    <Tabs animated={false} size={'small'}>
      <Tabs.TabPane tab="表单数据" key="1">
        <Form form={form} labelWidth={110} className={styles.placeholder}>
          <SchemaField>
            <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 4, strictAutoFit: true }}>
              <SchemaField.String name="displayName" title="申请人" x-component="Input" x-decorator="FormItem"/>
              <SchemaField.String name="deptName" title="申请部门" x-component="Input" x-decorator="FormItem"/>
              <SchemaField.String name="createDatetime" title="申请时间" x-decorator="FormItem" x-component="Input"/>
              <SchemaField.String name="name" required title="项目名称" x-decorator="FormItem"
                                  x-component="Input" x-decorator-props={{ gridSpan: 3 }}/>
            </SchemaField.Void>
            <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 4, strictAutoFit: true }}>
              <SchemaField.String name="taskCode" required title="项目任务号" x-decorator="FormItem" x-component="Select"/>
              <SchemaField.String
                name="property" required title="项目性质" x-decorator="FormItem" x-component="Select"
                enum={[
                  { label: '一类', value: '一类' },
                  { label: '二类', value: '二类' },
                  { label: '三类', value: '三类' },
                ]}
              />
              <SchemaField.String name="location" required title="项目地点" x-decorator="FormItem" x-component="Input"/>
              <SchemaField.String
                name="projectRate" required title="项目毛利率" x-decorator="FormItem" x-component="Input"
                x-component-props={{ placeholder: '示例：3%' }}/>
            </SchemaField.Void>
            <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 4, strictAutoFit: true }}>
              <SchemaField.String name="customerName" required title="客户名称" x-decorator="FormItem"
                                  x-component="InputButton" x-component-props={{ onClick: onClick }}/>
              <SchemaField.String
                name="customerProperty" required title="客户企业性质" x-decorator="FormItem" x-component="Select"
                enum={[
                  { label: '事业单位', value: '事业单位' },
                  { label: '国有企业', value: '国有企业' },
                  { label: '民营企业', value: '民营企业' },
                  { label: '外资合资', value: '外资合资' },
                  { label: '个体经营', value: '个体经营' },
                  { label: '其他', value: '其他' },
                ]}
              />
              <SchemaField.String name="startDisplay" title="客户信用初评得分及等级" x-decorator="FormItem"
                                  x-component="Input"/>
              <SchemaField.String name="endDisplay" title="客户信用建议得分及等级" x-decorator="FormItem"
                                  x-component="Input"/>
              <SchemaField.String name="strategyName" title="战略伙伴名称" x-decorator="FormItem"
                                  x-component="InputButton2" x-component-props={{ onClick: onClick2 }}/>
              <SchemaField.String
                name="strategyProperty" title="战略伙伴名称企业性质" x-decorator="FormItem" x-component="Select"
                enum={[
                  { label: '事业单位', value: '事业单位' },
                  { label: '国有企业', value: '国有企业' },
                  { label: '民营企业', value: '民营企业' },
                  { label: '外资合资', value: '外资合资' },
                  { label: '个体经营', value: '个体经营' },
                  { label: '其他', value: '其他' },
                ]}
              />
              <SchemaField.String
                name="idTypeList" required title="法人身份证类型" x-decorator="FormItem" x-component="Checkbox.Group"
                x-decorator-props={{ gridSpan: 2 }}
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
                    <SchemaField.Number name="money" required x-decorator="FormItem" x-component="NumberPicker"/>
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
                title: () => <div style={{ textAlign: 'center', fontWeight: 'bolder' }}>甲方(业务)评估</div>,
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
                  x-component-props={{ width: 200, title: '甲方(业主)情况', align: 'center', colSpan: 2 }}
                >
                  <SchemaField.String name="desc1" x-decorator="FormItem" x-component="PreviewText.Input"/>
                </SchemaField.Void>
                <SchemaField.Void
                  x-component="ArrayTable.Column"
                  x-component-props={{ width: 220, title: '甲方(业主)情况', align: 'center', colSpan: 0 }}
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
                title: () => <div style={{ textAlign: 'center', fontWeight: 'bolder' }}>战略伙伴评估</div>,
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
                  x-component-props={{ width: 200, title: '战略伙伴情况', align: 'center', colSpan: 2 }}
                >
                  <SchemaField.String name="desc1" x-decorator="FormItem" x-component="PreviewText.Input"/>
                </SchemaField.Void>
                <SchemaField.Void
                  x-component="ArrayTable.Column"
                  x-component-props={{ width: 220, title: '战略伙伴情况', align: 'center', colSpan: 0 }}
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

