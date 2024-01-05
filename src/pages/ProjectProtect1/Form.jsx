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
  MyCard,
  NumberPicker,
} from '../../components';
import { session } from '../../utils';
import DialogList from './DialogList';
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
    MyCard,
  },
});

export default (props) => {
  let { form, type } = props;

  useEffect(async () => {
    form
      .query(
        '*(displayName,deptName,createDatetime,taskCode,property,wbs,type)',
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
                          type: values.selectedRow.projectType,
                          name: values.selectedRow.name,
                          taskCode: values.selectedRow.taskCode,
                          property: values.selectedRow.property,
                          invoiceRate: values.selectedRow.invoiceRate,
                          projectRate: values.selectedRow.projectRate,
                          customerId: values.selectedRow.customerId,
                          customerName: values.selectedRow.customerName,
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
              title="申请人"
              x-component="Input"
              x-decorator="FormItem"
            />
            <SchemaField.String
              name="deptName"
              title="所属部门"
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
              name="name"
              required
              title="项目名称"
              x-decorator="FormItem"
              x-decorator-props={{ gridSpan: 2 }}
              x-component="InputButton"
              x-component-props={{ onClick: onClick }}
            />
            <SchemaField.String
              name="wbs"
              title="WBS编号"
              x-decorator="FormItem"
              x-component="Input"
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
              name="status"
              required
              title="项目状态"
              x-decorator="FormItem"
              x-component="Select"
              x-component-props={{ showSearch: true }}
              enum={[
                { label: '中标', value: '中标' },
                { label: '未中标', value: '未中标' },
                { label: '终止', value: '终止' },
              ]}
            />
            />
          </SchemaField.Void>
          <SchemaField.Void
            x-component="MyCard"
            x-component-props={{ title: '收付款信息' }}
          >
            <SchemaField.Void
              x-component="FormGrid"
              x-component-props={{ maxColumns: 3, strictAutoFit: true }}
            >
              <SchemaField.String
                name="registeDate"
                required
                x-decorator="FormItem"
                title="日期"
                x-component="DatePicker"
                x-component-props={{ format: 'YYYY-M-D' }}
              />
              <SchemaField.Number
                name="money"
                required
                x-decorator="FormItem"
                title="金额"
                x-component="NumberPicker"
              />
            </SchemaField.Void>
            <SchemaField.Void
              x-component="FormGrid"
              x-component-props={{ maxColumns: 3, strictAutoFit: true }}
            >
              <SchemaField.String
                name="outName"
                required
                title="付款单位"
                x-component="Input"
                x-decorator="FormItem"
                x-decorator-props={{ gridSpan: 2 }}
              />
              <SchemaField.String
                name="inName"
                required
                title="收款单位"
                x-component="Input"
                x-decorator="FormItem"
                x-decorator-props={{ gridSpan: 2 }}
              />
            </SchemaField.Void>
          </SchemaField.Void>
          <SchemaField.Void
            x-component="FormGrid"
            x-component-props={{ maxColumns: 3, strictAutoFit: true }}
          >
            <SchemaField.String
              name="remark"
              title="备注"
              x-component="Input.TextArea"
              x-component-props={{ rows: 2 }}
              x-decorator="FormItem"
            />
          </SchemaField.Void>
          <SchemaField.Void
            x-component="FormGrid"
            x-component-props={{ maxColumns: 3, strictAutoFit: true }}
          >
            <SchemaField.String
              name="userNameeTmp"
              required
              title="财务部"
              x-decorator="FormItem"
              x-decorator-props={{ tooltip: '流程审批节点' }}
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
