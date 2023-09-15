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
import React, { useEffect } from 'react';
import { Button, ConfigProvider, message } from 'antd';
import { session } from '../../utils';
import zhCN from 'antd/lib/locale/zh_CN';
import styles from '../table-placeholder.less';
import DialogList from './DialogList';
import {
  ArrayTableAddition,
  ArrayTableIndex,
  ArrayTableRemove,
  File,
  InputButton,
  LoadingButton,
  NumberPicker,
} from '../../components';
import { onFieldReact } from '@formily/core';

const SchemaField = createSchemaField({
  components: {
    FormLayout,
    FormItem,
    FormGrid,
    Input,
    InputButton,
    DatePicker,
    File,
    Select,
    ArrayTable,
    ArrayTableIndex,
    ArrayTableRemove,
    ArrayTableAddition,
    NumberPicker,
  },
});

export default (props) => {
  let { form, type } = props;

  useEffect(async () => {
    form
      .query('*(displayName,deptName,createDatetime,usee)')
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

  form.addEffects('id', () => {
    onFieldReact('projectType', (field) => {
      let value = field.value;
      if (value === '民用产业') {
      } else {
      }
    });
  });

  const onClick = (flag) => {
    if (flag === 'open') {
      let dialog2 = FormDialog(
        { footer: null, keyboard: false, maskClosable: false, width: 900 },
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
                          providerId: values.selectedRow.id,
                          usee: values.selectedRow.usee,
                          type: values.selectedRow.type,
                          name: values.selectedRow.name,
                          property: values.selectedRow.property,
                          address: values.selectedRow.address,
                          registerMoney: values.selectedRow.registerMoney,
                          result: values.selectedRow.result,
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
      <Form form={form} labelWidth={115} className={styles.placeholder}>
        <SchemaField>
          <SchemaField.Void
            x-component="FormGrid"
            x-component-props={{ maxColumns: 3, strictAutoFit: true }}
          >
            <SchemaField.String
              name="displayName"
              title="申请人"
              x-component="Input"
              x-decorator="FormItem"
            />
            <SchemaField.String
              name="deptName"
              title="申请部门"
              x-component="Input"
              x-decorator="FormItem"
            />
            <SchemaField.String
              name="createDatetime"
              title="申请时间"
              x-decorator="FormItem"
              x-component="Input"
            />
            <SchemaField.String
              name="projectType"
              title="项目类别"
              required
              x-decorator="FormItem"
              x-component="Select"
              enum={[
                { label: '民用产业', value: '民用产业' },
                { label: '自筹', value: '自筹' },
                { label: '技改', value: '技改' },
                { label: '军民融合', value: '军民融合' },
                { label: '其他', value: '其他' },
              ]}
            />
            <SchemaField.String
              name="contractType"
              title="合同类别"
              required
              x-decorator="FormItem"
              x-component="Select"
              enum={[
                { label: '采购', value: '采购' },
                { label: '劳务', value: '劳务' },
                { label: '工程', value: '工程' },
                { label: '技术服务', value: '技术服务' },
                { label: '其他', value: '其他' },
              ]}
            />
            <SchemaField.String
              name="projectName"
              required
              title="项目名称"
              x-decorator="FormItem"
              x-decorator-props={{ gridSpan: 2 }}
              x-component="InputButton"
              x-component-props={{ onClick: onClick }}
            />
            <SchemaField.String
              name="taskCode"
              required
              title="任务号"
              x-decorator="FormItem"
              x-component="Input"
            />
            <SchemaField.String
              name="inContractName"
              title="收款合同名称"
              x-decorator="FormItem"
              x-decorator-props={{ gridSpan: 2 }}
              x-component="Input"
            />
            <SchemaField.String
              name="inContractCode"
              title="收款合同编号"
              x-decorator="FormItem"
              x-component="Input"
            />
            <SchemaField.Array
              name="list"
              title={'比价信息'}
              x-decorator="FormItem"
              x-component="ArrayTable"
              x-decorator-props={{ gridSpan: 3 }}
              x-component-props={{ size: 'small', sticky: true }}
            >
              <SchemaField.Object>
                <SchemaField.Void
                  x-component="ArrayTable.Column"
                  x-component-props={{
                    title: '报价单位',
                    align: 'center',
                  }}
                >
                  <SchemaField.String
                    name="providerName"
                    required
                    x-decorator="FormItem"
                    x-component="InputButton"
                    x-component-props={{ onClick: onClick }}
                  />
                </SchemaField.Void>
                <SchemaField.Void
                  x-component="ArrayTable.Column"
                  x-component-props={{
                    title: '报价(元)',
                    align: 'center',
                  }}
                >
                  <SchemaField.String
                    name="price"
                    required
                    x-decorator="FormItem"
                    x-component="NumberPicker"
                  />
                </SchemaField.Void>
                <SchemaField.Void
                  x-component="ArrayTable.Column"
                  x-component-props={{
                    title: '税率',
                    align: 'center',
                  }}
                >
                  <SchemaField.String
                    name="rate"
                    required
                    x-decorator="FormItem"
                    x-component="Input"
                  />
                </SchemaField.Void>
                <SchemaField.Void
                  x-component="ArrayTable.Column"
                  x-component-props={{
                    title: '发票种类',
                    align: 'center',
                  }}
                >
                  <SchemaField.String
                    name="invoiceType"
                    required
                    x-decorator="FormItem"
                    x-component="Select"
                    enum={[
                      { label: '增值税专票', value: '增值税专票' },
                      { label: '增值税普票', value: '增值税普票' },
                    ]}
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
              name="descc"
              title="备注"
              x-decorator="FormItem"
              x-component="Input.TextArea"
              x-component-props={{
                rows: 2,
              }}
              x-decorator-props={{ gridSpan: 2 }}
            />
            <SchemaField.String
              name="fileList"
              title="附件"
              x-decorator="FormItem"
              x-component="File"
              x-decorator-props={{ gridSpan: 2 }}
            />
            <SchemaField.String
              name="userNamee"
              required
              title="归口管理部门"
              x-decorator="FormItem"
              x-decorator-props={{ gridSpan: 2 }}
              x-component="Select"
              x-component-props={{ showSearch: true }}
              enum={session.getItem('userList')}
            />
          </SchemaField.Void>
        </SchemaField>
      </Form>
    </ConfigProvider>
  );
};
