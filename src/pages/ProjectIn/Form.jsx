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
  OnlyButton,
} from '../../components';
import DialogList from './DialogList';
import DialogList3 from './DialogList3';
import styles from '../table-placeholder.less';
import { Button, ConfigProvider, message } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import React, { useEffect } from 'react';
import { onFieldReact } from '@formily/core';
import { contractMoneyPath, post, session, projectInPath } from '../../utils';

const SchemaField = createSchemaField({
  components: {
    FormLayout,
    FormItem,
    Input,
    FormGrid,
    ArrayTable,
    ArrayTableAddition,
    ArrayTableIndex,
    ArrayTableRemove,
    LoadingButton,
    InputButton,
    NumberPicker,
    Select,
    DatePicker,
    OnlyButton,
  },
});

export default (props) => {
  let { form, type } = props;

  useEffect(async () => {
    form
      .query(
        '*(taskCode,property,customerName,contractMoney,endMoney,contractName)',
      )
      .forEach((field) => {
        field.setPattern('disabled');
      });
    if (type === 'add') {
      const user = session.getItem('user');
      form.setInitialValues({
        createDatetime: new Date().Format('yyyy-MM-dd hh:mm:ss'),
        displayName: user.displayName,
        loginName: user.loginName,
        deptId: user.deptId,
        deptName: user.deptName,
      });
    }
  }, []);

  const onClick = (flag) => {
    if (flag === 'open') {
      let dialog2 = FormDialog(
        { footer: null, keyboard: false, maskClosable: false, width: 1000 },
        (form2) => {
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
                          budgetId: values.selectedRow.budgetId,
                          projectId: values.selectedRow.projectId,
                          projectType: values.selectedRow.projectType,
                          name: values.selectedRow.name,
                          taskCode: values.selectedRow.taskCode,
                          property: values.selectedRow.property,
                          customerId: values.selectedRow.customerId,
                          customerName: values.selectedRow.customerName,
                          contractCode: values.selectedRow.contractCode,
                          contractMoney: values.selectedRow.contractMoney,
                          endMoney: values.selectedRow.endMoney,
                          contractName: values.selectedRow.contractName,
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
        },
      );
      dialog2.open({});
    }
  };

  const onClick3 = async (flag) => {
    if (!form.values.taskCode && !form.values.contractCode) return;
    const data = await post(projectInPath.list2, {
      taskCode: form.values.taskCode,
      contractCode: form.values.contractCode,
      type: '收入信息',
    });
    if (flag === 'open') {
      let dialog3 = FormDialog(
        {
          footer: null,
          keyboard: false,
          maskClosable: false,
          width: 1000,
          title: '已收款信息',
        },
        (form3) => {
          return (
            <>
              <DialogList3 form={form3} dialog={dialog3} data={data} />
            </>
          );
        },
      );
      dialog3.open({});
    }
  };

  form.addEffects('id', () => {
    onFieldReact('inStyle', (field) => {
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

  return (
    <ConfigProvider locale={zhCN}>
      <Form form={form} labelWidth={120} className={styles.placeholder}>
        <SchemaField>
          <SchemaField.Void
            x-component="FormGrid"
            x-component-props={{ maxColumns: 3, strictAutoFit: true }}
          >
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
              title="任务号"
              x-decorator="FormItem"
              x-component="Input"
            />
            <SchemaField.String
              name="customerName"
              title="客户名称"
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
              title="收款合同编号"
              x-decorator="FormItem"
              x-component="Input"
            />
            <SchemaField.Number
              name="contractMoney"
              title="收款合同金额"
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
            <SchemaField.String
              name="inDate"
              title="日期"
              required
              x-decorator="FormItem"
              x-component="DatePicker"
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
              title="收款金额"
              x-decorator="FormItem"
              x-component="NumberPicker"
              x-component-props={{
                formatter: (value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
              }}
            />
            <SchemaField.String
              name="inStyle"
              title="收款方式"
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
              x-component-props={{ picker: 'month' }}
            />
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
              x-decorator="FormItem"
              title="已收款信息"
              x-component="OnlyButton"
              x-component-props={{ onClick: onClick3, name: '查看' }}
            />
          </SchemaField.Void>
        </SchemaField>
      </Form>
    </ConfigProvider>
  );
};
