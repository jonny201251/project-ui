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
} from '@formily/antd';
import { createSchemaField } from '@formily/react';
import {
  ArrayTableAddition,
  ArrayTableIndex,
  ArrayTableRemove,
  InputButton,
  LoadingButton,
  NumberPicker,
} from '../../components';
import DialogList from './DialogList';
import DialogList2 from './DialogList2';
import styles from '../table-placeholder.less';
import { Button, ConfigProvider, message, Tabs } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import React, { useEffect } from 'react';
import { onFieldReact } from '@formily/core';
import { session } from '../../utils';
import ProcessDesignGraph from '../ProcessDesignGraph';
import ProcessInstNodeList from '../ProcessInstNode/List';

const SchemaField = createSchemaField({
  components: {
    FormLayout,
    FormItem,
    Input,
    FormGrid,
    Radio,
    ArrayTable,
    ArrayTableAddition,
    ArrayTableIndex,
    ArrayTableRemove,
    LoadingButton,
    InputButton,
    NumberPicker,
    Select,
    DatePicker,
  },
});

const typeArr1 = ['材料及设备费', '劳务费', '技术服务费', '工程款'];
const typeArr2 = [
  '税费',
  '投标费用',
  '现场管理费',
  '证书服务费',
  '资金成本',
  '交易服务费',
  '交通费',
  '餐费',
  '差旅费',
  '其他',
];
export default (props) => {
  let { form, type, record, haveEditForm } = props;

  useEffect(() => {
    if (haveEditForm === '否') {
      form.setPattern('disabled');
      form.query('comment').take()?.setPattern('editable');
    }
  }, []);

  const onClick = (flag) => {
    let value = form.query('haveContract').take()?.value;
    if (flag === 'open') {
      let dialog2 = FormDialog(
        { footer: null, keyboard: false, maskClosable: false, width: 1000 },
        (form2) => {
          if (value === '有') {
            return (
              <>
                <DialogList
                  form={form2}
                  dialog={dialog2}
                  selectedId={form.values.customerId}
                />
                <FormDialog.Footer>
                  <FormButtonGroup gutter={16} align={'right'}>
                    <Button onClick={() => dialog2.close()}>取消</Button>
                    <LoadingButton
                      onClick={async () => {
                        const values = await form2.submit();
                        if (values.selectedRow) {
                          form.setValues({
                            outContractId: values.selectedRow.id,
                            budgetId: values.selectedRow.budgetId,
                            projectId: values.selectedRow.projectId,
                            projectType: values.selectedRow.projectType,
                            name: values.selectedRow.name,
                            taskCode: values.selectedRow.taskCode,
                            property: values.selectedRow.property,
                            providerId: values.selectedRow.providerId,
                            providerName: values.selectedRow.providerName,
                            contractCode: values.selectedRow.contractCode,
                            contractMoney: values.selectedRow.contractMoney,
                            endMoney: values.selectedRow.endMoney,
                            contractName: values.selectedRow.contractName,
                            wbs: values.selectedRow.wbs,
                            costType: values.selectedRow.costType,
                            costRate: values.selectedRow.costRate,
                          });
                          dialog2.close();
                        } else {
                          message.error('选择一条数据');
                        }
                      }}
                      type={'primary'}
                    >
                      确定
                    </LoadingButton>
                  </FormButtonGroup>
                </FormDialog.Footer>
              </>
            );
          } else {
            return (
              <>
                <DialogList2
                  form={form2}
                  dialog={dialog2}
                  selectedId={form.values.customerId}
                />
                <FormDialog.Footer>
                  <FormButtonGroup gutter={16} align={'right'}>
                    <Button onClick={() => dialog2.close()}>取消</Button>
                    <LoadingButton
                      onClick={async () => {
                        const values = await form2.submit();
                        if (values.selectedRow) {
                          form.setValues({
                            budgetId: values.selectedRow.budgetId,
                            projectId: values.selectedRow.projectId,
                            projectType: values.selectedRow.projectType,
                            name: values.selectedRow.name,
                            taskCode: values.selectedRow.taskCode,
                            property: values.selectedRow.property,
                            wbs: values.selectedRow.wbs,
                          });
                          dialog2.close();
                        } else {
                          message.error('选择一条数据');
                        }
                      }}
                      type={'primary'}
                    >
                      确定
                    </LoadingButton>
                  </FormButtonGroup>
                </FormDialog.Footer>
              </>
            );
          }
        },
      );
      dialog2.open({});
    } else {
      form.query('haveContract').take().validate();
    }
  };

  form.addEffects('id', () => {
    onFieldReact('haveContract', (field) => {
      if (field.value === '有') {
        form
          .query(
            '*(providerName,contractCode,contractMoney,endMoney,contractName,outStyle,arriveDate)',
          )
          .forEach((fieldd) => {
            fieldd.setState({ display: 'visible' });
          });
        form
          .query('.costType')
          .take()
          ?.setState({
            pattern: 'disabled',
            dataSource: typeArr1.map((item) => ({ label: item, value: item })),
          });
        form
          .query('.costRate')
          .take()
          ?.setState({ pattern: 'disabled', display: 'visible' });
      } else {
        form
          .query(
            '*(providerName,contractCode,contractMoney,endMoney,contractName,outStyle,arriveDate,costRate)',
          )
          .forEach((fieldd) => {
            fieldd.setState({ display: 'hidden' });
          });
        form
          .query('.costType')
          .take()
          ?.setState({
            value: null,
            pattern: 'editable',
            required: true,
            dataSource: typeArr2.map((item) => ({ label: item, value: item })),
          });
      }
    });
    onFieldReact('outStyle', (field) => {
      let value = field.value;
      if (value) {
        if (value === '银行承兑' || value === '商业承兑') {
          field
            .query('.arriveDate')
            .take()
            ?.setState({ pattern: 'editable', required: true });
        } else {
          field
            .query('.arriveDate')
            .take()
            ?.setState({ pattern: 'disabled', value: null });
        }
      } else {
        field
          .query('.arriveDate')
          .take()
          ?.setState({ pattern: 'disabled', value: null });
      }
    });
  });
  const onChange = (e) => {
    let value = e.target.value;
    form.reset();
    form.setValues({ haveContract: value });
  };

  const showComment = () => {
    if (type === 'check') {
      return (
        <SchemaField.Void
          x-component="FormGrid"
          x-component-props={{ maxColumns: 3, strictAutoFit: true }}
        >
          <SchemaField.String
            name="comment"
            title="审批意见"
            x-decorator="FormItem"
            x-component="Input.TextArea"
            x-component-props={{ placeholder: '请输入意见', rows: 2 }}
          />
          <SchemaField.String
            name="comment"
            title="审批意见"
            x-decorator="FormItem"
            x-component="Input.TextArea"
            x-component-props={{ placeholder: '请输入意见', rows: 2 }}
          />
        </SchemaField.Void>
      );
    }
  };

  return (
    <ConfigProvider locale={zhCN}>
      <Tabs animated={false} size={'small'}>
        <Tabs.TabPane tab="表单数据" key="1">
          <Form form={form} labelWidth={120} className={styles.placeholder}>
            <SchemaField>
              <SchemaField.Void
                x-component="FormGrid"
                x-component-props={{ maxColumns: 3, strictAutoFit: true }}
              >
                <SchemaField.String
                  name="haveContract"
                  required
                  title="有无合同"
                  x-decorator="FormItem"
                  x-component="Radio.Group"
                  x-decorator-props={{ gridSpan: 2 }}
                  default={'有'}
                  enum={[
                    { label: '有', value: '有' },
                    { label: '无', value: '无' },
                  ]}
                  x-component-props={{ onChange: onChange }}
                />
                <SchemaField.String
                  name="name"
                  required
                  title="项目名称"
                  x-decorator="FormItem"
                  x-decorator-props={{ gridSpan: 2 }}
                  x-component="InputButton"
                  x-component-props={{ onClick: onClick }}
                />
                <SchemaField.String
                  name="taskCode"
                  title="备案号"
                  x-decorator="FormItem"
                  x-component="Input"
                />
                <SchemaField.String
                  name="providerName"
                  title="供方名称"
                  x-decorator="FormItem"
                  x-component="Input"
                  x-decorator-props={{ gridSpan: 2 }}
                />
                <SchemaField.String
                  name="wbs"
                  required
                  title="WBS编号"
                  x-decorator="FormItem"
                  x-component="Input"
                />
                <SchemaField.String
                  name="contractName"
                  title="合同名称"
                  x-decorator="FormItem"
                  x-component="Input"
                  x-decorator-props={{ gridSpan: 2 }}
                />
              </SchemaField.Void>
              <SchemaField.Void
                x-component="FormGrid"
                x-component-props={{ maxColumns: 3, strictAutoFit: true }}
              >
                <SchemaField.String
                  name="contractCode"
                  required
                  title="付款合同编号"
                  x-decorator="FormItem"
                  x-component="Input"
                />
                <SchemaField.Number
                  name="contractMoney"
                  title="付款合同金额"
                  x-decorator="FormItem"
                  x-component="NumberPicker"
                  x-component-props={{
                    formatter: (value) =>
                      `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                  }}
                />
                <SchemaField.Number
                  name="endMoney"
                  title="结算金额"
                  x-decorator="FormItem"
                  x-component="NumberPicker"
                  x-component-props={{
                    formatter: (value) =>
                      `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                  }}
                />
              </SchemaField.Void>
              <SchemaField.Void
                x-component="FormGrid"
                x-component-props={{ maxColumns: 3, strictAutoFit: true }}
              >
                <SchemaField.String
                  name="costType"
                  title="成本类型"
                  x-decorator="FormItem"
                  x-component="Select"
                  x-component-props={{ showSearch: true }}
                />
                <SchemaField.String
                  name="costRate"
                  title="税率"
                  x-decorator="FormItem"
                  x-component="Input"
                />
              </SchemaField.Void>
              <SchemaField.Void
                x-component="FormGrid"
                x-component-props={{ maxColumns: 3, strictAutoFit: true }}
              >
                <SchemaField.String
                  name="outDate"
                  title="日期"
                  required
                  x-decorator="FormItem"
                  x-component="DatePicker"
                  x-component-props={{ format: 'YYYY-M-D' }}
                />
                <SchemaField.String
                  name="remark"
                  title="摘要"
                  x-decorator="FormItem"
                  x-component="Input.TextArea"
                  x-component-props={{ rows: 2 }}
                />
                <SchemaField.Number
                  name="money1"
                  title="开票金额"
                  x-decorator="FormItem"
                  x-component="NumberPicker"
                  x-component-props={{
                    formatter: (value) =>
                      `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                  }}
                />
                <SchemaField.Number
                  name="money2"
                  title="付款金额"
                  x-decorator="FormItem"
                  x-component="NumberPicker"
                  x-component-props={{
                    formatter: (value) =>
                      `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                  }}
                />
                <SchemaField.String
                  name="outStyle"
                  title="付款方式"
                  x-decorator="FormItem"
                  x-component="Select"
                  enum={[
                    { label: '支票', value: '支票' },
                    { label: '网银', value: '网银' },
                    { label: '银行承兑', value: '银行承兑' },
                    { label: '商业承兑', value: '商业承兑' },
                  ]}
                />
                <SchemaField.String
                  name="arriveDate"
                  title="到期日"
                  x-decorator="FormItem"
                  x-component="DatePicker"
                  x-component-props={{ picker: 'month', format: 'YYYY-M' }}
                />
              </SchemaField.Void>
              <SchemaField.Void
                x-component="FormGrid"
                x-component-props={{ maxColumns: 3, strictAutoFit: true }}
              >
                <SchemaField.String
                  x-decorator-props={{ gridSpan: 2 }}
                  name="remarkk"
                  title="备注"
                  x-decorator="FormItem"
                  x-component="Input.TextArea"
                  x-component-props={{ rows: 2 }}
                />
                <SchemaField.String
                  name="code"
                  title="单据单号"
                  description="财务共享里的单据单号"
                  x-component="Input"
                  x-decorator="FormItem"
                />
                <SchemaField.String
                  name="userNameeList"
                  required
                  title="财务部"
                  x-decorator="FormItem"
                  x-decorator-props={{ gridSpan: 2, tooltip: '流程审批节点' }}
                  x-component="Select"
                  x-component-props={{ showSearch: true, mode: 'multiple' }}
                  enum={session.getItem('userList')}
                />
              </SchemaField.Void>
              {showComment()}
            </SchemaField>
          </Form>
        </Tabs.TabPane>
        <Tabs.TabPane tab="审批记录" key="3">
          <ProcessInstNodeList processInstId={record.processInstId} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="流程图" key="2">
          <ProcessDesignGraph processInstId={record.processInstId} />
        </Tabs.TabPane>
      </Tabs>
    </ConfigProvider>
  );
};
