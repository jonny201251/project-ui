import { ArrayTable, Form, FormGrid, FormItem, FormLayout, Input } from '@formily/antd'
import { createSchemaField } from '@formily/react'
import { ArrayTableIndex, MyCard } from '../../components'
import styles from '../table-placeholder.less'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'

const SchemaField = createSchemaField({
  components: {
    FormLayout, FormItem, Input, FormGrid,
    ArrayTable, ArrayTableIndex,
  },
})

export default (props) => {
  let { form } = props

  return <ConfigProvider locale={zhCN}>
    <Form form={form} labelWidth={100} className={styles.placeholder}>
      <SchemaField>
        <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 3, strictAutoFit: true }}>
          <SchemaField.String
            name="name" title="项目名称" x-decorator="FormItem" x-decorator-props={{ gridSpan: 2 }}
            x-component="Input"/>
          <SchemaField.String name="taskCode" title="任务号" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="property" title="项目性质" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="wbs" title="WBS编号" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="customerName" title="客户名称" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="contractCode" title="合同编号" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="contractMoney" title="合同金额" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="contractName" title="合同名称" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="totalMoney" title="成本预算" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="rate1" title="预计利润率" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="rate2" title="实时利润率" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="endMoney" title="结算金额" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String
            x-decorator-props={{ gridSpan: 2 }}
            name="remark" title="备注" x-decorator="FormItem" x-component="Input.TextArea" x-component-props={{ rows: 2 }}
          />
          <SchemaField.String name="inTotal" title="累计收款" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="outTotal" title="累计付款" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="moreTotal" title="项目结余" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="deviceTotal" title="材料及设备费" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="labourTotal" title="劳务费" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="techTotal" title="技术服务费" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="engTotal" title="工程款" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="taxTotal" title="税费" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="otherTotal" title="其他费用" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.Array
            name="in2List" x-decorator="FormItem" x-component="ArrayTable"
            x-component-props={{
              size: 'small',
              sticky: true,
              title: () => ('收入明细'),
            }}
            x-decorator-props={{ gridSpan: 3 }}
          >
            <SchemaField.Object>
              <SchemaField.Void
                x-component="ArrayTable.Column"
                x-component-props={{ width: 80, title: '序号', align: 'center' }}
              >
                <SchemaField.Void x-decorator="FormItem" x-component="ArrayTableIndex"/>
              </SchemaField.Void>
              <SchemaField.Void x-component="ArrayTable.Column"
                                x-component-props={{ width: 130, title: '日期', align: 'center' }}>
                <SchemaField.String name="inDate" x-decorator="FormItem" x-component="Input"/>
              </SchemaField.Void>
              <SchemaField.Void x-component="ArrayTable.Column"
                                x-component-props={{ width: 220, title: '摘要', align: 'center' }}>
                <SchemaField.String name="remark" x-decorator="FormItem" x-component="Input.TextArea"
                                    x-component-props={{ rows: 2 }}/>
              </SchemaField.Void>
              <SchemaField.Void x-component="ArrayTable.Column" x-component-props={{ title: '开票金额', align: 'center' }}>
                <SchemaField.String name="money1" x-decorator="FormItem" x-component="Input"/>
              </SchemaField.Void>
              <SchemaField.Void x-component="ArrayTable.Column" x-component-props={{ title: '收款金额', align: 'center' }}>
                <SchemaField.String name="money2" x-decorator="FormItem" x-component="Input"/>
              </SchemaField.Void>
              <SchemaField.Void x-component="ArrayTable.Column" x-component-props={{ title: '收款方式', align: 'center' }}>
                <SchemaField.String name="inStyle" x-decorator="FormItem" x-component="Input"/>
              </SchemaField.Void>
              <SchemaField.Void x-component="ArrayTable.Column"
                                x-component-props={{ width: 130, title: '到期日', align: 'center' }}>
                <SchemaField.String name="arriveDate" x-decorator="FormItem" x-component="Input"/>
              </SchemaField.Void>
            </SchemaField.Object>
          </SchemaField.Array>
          <SchemaField.Array
            name="out2List" required x-decorator="FormItem" x-component="ArrayTable"
            x-component-props={{
              size: 'small',
              sticky: true,
              title: () => ('支出明细'),
            }}
            x-decorator-props={{ gridSpan: 3 }}
          >
            <SchemaField.Object>
              <SchemaField.Void
                x-component="ArrayTable.Column"
                x-component-props={{ width: 80, title: '序号', align: 'center' }}
              >
                <SchemaField.Void x-decorator="FormItem" x-component="ArrayTableIndex"/>
              </SchemaField.Void>
              <SchemaField.Void
                x-component="ArrayTable.Column" x-component-props={{ width: 150, title: '成本类型', align: 'center' }}>
                <SchemaField.String name="costType" required x-decorator="FormItem" x-component="Input"/>
              </SchemaField.Void>
              <SchemaField.Void
                x-component="ArrayTable.Column" x-component-props={{ width: 130, title: '日期', align: 'center' }}>
                <SchemaField.String name="outDate" required x-decorator="FormItem" x-component="Input"/>
              </SchemaField.Void>
              <SchemaField.Void
                x-component="ArrayTable.Column" x-component-props={{ width: 200, title: '摘要', align: 'center' }}>
                <SchemaField.String
                  name="remark" x-decorator="FormItem" x-component="Input.TextArea" x-component-props={{ rows: 2 }}/>
              </SchemaField.Void>
              <SchemaField.Void x-component="ArrayTable.Column" x-component-props={{ title: '开票金额', align: 'center' }}>
                <SchemaField.String name="money1" x-decorator="FormItem" x-component="Input"/>
              </SchemaField.Void>
              <SchemaField.Void x-component="ArrayTable.Column" x-component-props={{ title: '付款金额', align: 'center' }}>
                <SchemaField.String name="money2" required x-decorator="FormItem" x-component="Input"/>
              </SchemaField.Void>
              <SchemaField.Void x-component="ArrayTable.Column" x-component-props={{ title: '付款方式', align: 'center' }}>
                <SchemaField.String name="outStyle" required x-decorator="FormItem" x-component="Input"/>
              </SchemaField.Void>
              <SchemaField.Void x-component="ArrayTable.Column"
                                x-component-props={{ width: 130, title: '到期日', align: 'center' }}>
                <SchemaField.String name="arriveDate" x-decorator="FormItem" x-component="Input"/>
              </SchemaField.Void>
            </SchemaField.Object>
          </SchemaField.Array>
        </SchemaField.Void>
      </SchemaField>
    </Form>
  </ConfigProvider>
}


