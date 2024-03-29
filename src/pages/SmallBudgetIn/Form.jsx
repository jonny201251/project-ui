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
} from '../../components';
import { session } from '../../utils';
import DialogList from './DialogList';
import styles from '../table-placeholder.less';
import { Button, ConfigProvider, message, Table } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import React, { useEffect, useState } from 'react';
import { onFieldReact } from '@formily/core';

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
  },
});

export default (props) => {
  let { form, type } = props;

  useEffect(async () => {
    form.query('*(taskCode,sum)').forEach((field) => {
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
    } else {
      form.query('inType').take()?.setPattern('disabled');
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
                          budgetId: values.selectedRow.id,
                          projectId: values.selectedRow.projectId,
                          projectType: values.selectedRow.projectType,
                          name: values.selectedRow.name,
                          taskCode: values.selectedRow.taskCode,
                          haveDisplay: values.selectedRow.haveDisplay,
                          version: values.selectedRow.version,
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

  form.addEffects('id', () => {
    onFieldReact('inType', (field) => {
      let value = field.value;
      if (value) {
        if (value === '项目收入') {
          form.setValues({ sort: 1 });
        } else {
          form.setValues({ sort: 2 });
        }
      }
    });

    onFieldReact('list.*.money', (field) => {
      let sum = 0;
      form.query('list.*.money').forEach((field) => {
        if (field.value) {
          sum += field.value;
        }
      });
      let tmp = form.query('sum').take();
      if (tmp && sum) {
        tmp.setState({ value: sum, pattern: 'disabled' });
      }
    });
  });

  return (
    <ConfigProvider locale={zhCN}>
      <Form form={form} labelWidth={110} className={styles.placeholder}>
        <SchemaField>
          <SchemaField.Void
            x-component="FormGrid"
            x-component-props={{ maxColumns: 2, strictAutoFit: true }}
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
              title="备案号"
              x-decorator="FormItem"
              x-component="Input"
            />
            <SchemaField.String
              name="inType"
              required
              title="收入类型"
              x-decorator="FormItem"
              x-component="Select"
              enum={[
                { label: '项目收入', value: '项目收入' },
                { label: '其他', value: '其他' },
              ]}
            />
            <SchemaField.Array
              name="list"
              required
              title={'预计收入'}
              x-decorator="FormItem"
              x-component="ArrayTable"
              x-component-props={{
                size: 'small',
                sticky: true,
                pagination: { pageSize: 200 },
              }}
              x-decorator-props={{ gridSpan: 2 }}
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
                  x-component-props={{ title: '回款日期', align: 'center' }}
                >
                  <SchemaField.String
                    name="inDate"
                    required
                    x-decorator="FormItem"
                    x-component="DatePicker"
                    x-component-props={{
                      picker: 'month',
                      format: 'YYYY年M月',
                    }}
                  />
                </SchemaField.Void>
                <SchemaField.Void
                  x-component="ArrayTable.Column"
                  x-component-props={{ title: '金额', align: 'center' }}
                >
                  <SchemaField.Number
                    name="money"
                    required
                    x-decorator="FormItem"
                    x-component="NumberPicker"
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
            <SchemaField.String
              name="sum"
              title="合计"
              x-decorator="FormItem"
              x-component="Input"
            />
            <SchemaField.String
              x-decorator-props={{ gridSpan: 2 }}
              name="remark"
              title="备注"
              x-decorator="FormItem"
              x-component="Input.TextArea"
              x-component-props={{ rows: 2 }}
            />
          </SchemaField.Void>
        </SchemaField>
      </Form>
    </ConfigProvider>
  );
};
