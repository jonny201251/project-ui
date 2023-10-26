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
import { session } from '../../utils';
import DialogList from '../ProjectProtect/DialogList';
import styles from '../table-placeholder.less';
import { Button, ConfigProvider, message } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import React, { useEffect } from 'react';

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
    Radio,
  },
});

export default (props) => {
  let { form, type } = props;

  useEffect(async () => {
    form
      .query(
        '*(displayName,deptName,createDatetime,taskCode,property,totalCost,endMoney,inChangeMoney,outChangeMoney,customerName)',
      )
      .forEach((field) => {
        field.setPattern('disabled');
      });
    if (type === 'add') {
      const user = session.getItem('user');
      form.setInitialValues({
        createDatetime: new Date().Format('yyyy-MM-dd hh:mm:ss'),
        displayName: user.displayName,
        displayNamee: user.displayName,
        loginName: user.loginName,
        deptId: user.deptId,
        deptName: user.deptName,
      });
    }
  }, []);

  const onClick = (flag) => {
    if (type === 'edit') return;
    if (flag === 'open') {
      let dialog2 = FormDialog(
        { footer: null, keyboard: false, maskClosable: false, width: 800 },
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
                          projectId: values.selectedRow.id,
                          projectType: values.selectedRow.projectType,
                          name: values.selectedRow.name,
                          taskCode: values.selectedRow.taskCode,
                          property: values.selectedRow.property,
                          customerId: values.selectedRow.customerId,
                          customerName: values.selectedRow.customerName,
                          projectRatee: values.selectedRow.projectRate,
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

  return (
    <ConfigProvider locale={zhCN}>
      <Form form={form} labelWidth={110} className={styles.placeholder}>
        <SchemaField>
          <SchemaField.Void
            x-component="FormGrid"
            x-component-props={{ maxColumns: 3, strictAutoFit: true }}
          >
            <SchemaField.String
              name="displayName"
              title="创建人"
              x-component="Input"
              x-decorator="FormItem"
            />
            <SchemaField.String
              name="deptName"
              title="创建部门"
              x-component="Input"
              x-decorator="FormItem"
            />
            <SchemaField.String
              name="createDatetime"
              title="创建时间"
              x-decorator="FormItem"
              x-component="Input"
            />
            <SchemaField.String
              name="name"
              required
              title="项目名称"
              x-decorator="FormItem"
              x-decorator-props={{ gridSpan: 3 }}
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
              name="property"
              x-decorator="FormItem"
              title="项目性质"
              x-component="Input"
            />
            <SchemaField.String
              name="projectLoginName"
              required
              title="项目负责人"
              x-decorator="FormItem"
              x-component="Select"
              x-component-props={{ showSearch: true }}
              enum={session.getItem('userList')}
            />
            />
            <SchemaField.String
              name="protectRate"
              required
              x-decorator="FormItem"
              title="质保金比例"
              x-component="Input"
            />
            <SchemaField.String
              name="invoiceRate"
              required
              x-decorator="FormItem"
              title="税率"
              x-component="Input"
            />
            <SchemaField.String
              name="projectRate"
              required
              x-decorator="FormItem"
              title="预计毛利率"
              x-component="Input"
            />
            <SchemaField.String
              name="totalCost"
              x-decorator="FormItem"
              title="成本总预算"
              x-component="Input"
            />
            <SchemaField.String
              name="startDate"
              required
              x-decorator="FormItem"
              title="开工日期"
              x-component="DatePicker"
            />
            <SchemaField.String
              name="endDate"
              required
              x-decorator="FormItem"
              title="预计完工日期"
              x-component="DatePicker"
            />
            <SchemaField.String
              name="endMoney"
              x-decorator="FormItem"
              title="结算金额"
              x-component="Input"
            />
            <SchemaField.String
              name="inChangeMoney"
              x-decorator="FormItem"
              title="收入调整金额"
              x-component="Input"
            />
            <SchemaField.String
              name="outChangeMoney"
              x-decorator="FormItem"
              title="支出调整金额"
              x-component="Input"
            />
            <SchemaField.String
              name="contractCode"
              x-decorator="FormItem"
              title="合同编号"
              x-component="Input"
            />
            <SchemaField.Number
              name="contractMoney"
              required
              x-decorator="FormItem"
              title="合同金额"
              x-component="NumberPicker"
            />
            <SchemaField.String
              name="contractName"
              required
              x-decorator="FormItem"
              title="合同名称"
              x-component="Input"
            />
            <SchemaField.String
              name="customerName"
              x-decorator="FormItem"
              title="客户名称"
              x-component="Input"
              x-decorator-props={{ gridSpan: 2 }}
            />
          </SchemaField.Void>
          <SchemaField.Void
            x-component="FormGrid"
            x-component-props={{ maxColumns: 3, strictAutoFit: true }}
          >
            <SchemaField.String
              x-decorator-props={{ gridSpan: 2 }}
              name="remark"
              title="备注"
              x-decorator="FormItem"
              x-component="Input.TextArea"
              x-component-props={{ rows: 2 }}
            />
          </SchemaField.Void>
          <SchemaField.Array
            name="list"
            x-decorator="FormItem"
            x-component="ArrayTable"
            x-component-props={{
              size: 'small',
              sticky: true,
              title: () => <b>{'担保'}</b>,
            }}
          >
            <SchemaField.Object>
              <SchemaField.Void
                x-component="ArrayTable.Column"
                x-component-props={{
                  width: 80,
                  title: '排序',
                  align: 'center',
                }}
              >
                <SchemaField.Void
                  x-decorator="FormItem"
                  x-component="ArrayTable.SortHandle"
                />
              </SchemaField.Void>
              <SchemaField.Void
                x-component="ArrayTable.Column"
                x-component-props={{ title: '名称', align: 'center' }}
              >
                <SchemaField.String
                  name="name"
                  x-decorator="FormItem"
                  x-component="Select"
                  enum={[
                    { label: '投标保证金', value: '投标保证金' },
                    { label: '履约保证金', value: '履约保证金' },
                    { label: '预付款担保', value: '预付款担保' },
                    { label: '其他担保', value: '其他担保' },
                  ]}
                />
              </SchemaField.Void>
              <SchemaField.Void
                x-component="ArrayTable.Column"
                x-component-props={{ title: '形式', align: 'center' }}
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
                x-component-props={{ title: '支出日期', align: 'center' }}
              >
                <SchemaField.String
                  name="outDate"
                  x-decorator="FormItem"
                  x-component="DatePicker"
                  x-component-props={{ picker: 'month' }}
                />
              </SchemaField.Void>
              <SchemaField.Void
                x-component="ArrayTable.Column"
                x-component-props={{ title: '收回/结束时间', align: 'center' }}
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
                x-component-props={{
                  width: 80,
                  title: '操作',
                  dataIndex: 'operations',
                }}
              >
                <SchemaField.Void x-component="FormItem">
                  <SchemaField.Void x-component="ArrayTableRemove" />
                </SchemaField.Void>
              </SchemaField.Void>
            </SchemaField.Object>
            <SchemaField.Void
              x-component="ArrayTableAddition"
              x-component-props={{ width: 80 }}
            />
          </SchemaField.Array>
        </SchemaField>
      </Form>
    </ConfigProvider>
  );
};
