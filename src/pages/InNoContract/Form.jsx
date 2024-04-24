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
  File,
  InputButton,
  LoadingButton,
  NumberPicker,
} from '../../components';
import DialogList from './DialogList';
import DialogList2 from '../SmallProject/DialogList';
import styles from '../table-placeholder.less';
import { Button, ConfigProvider, message } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import React, { useEffect } from 'react';
import { SearchOutlined } from '@ant-design/icons';

const InputButton2 = (props) => {
  return (
    <div style={{ display: 'inline-flex', width: '100%' }}>
      <NumberPicker {...props} style={{ ...props.style }} />
      <Button
        onClick={(e) => {
          if (props.onClick) {
            props.onClick('open');
          }
        }}
        icon={<SearchOutlined />}
        type={'primary'}
      />
    </div>
  );
};

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
    File,
    InputButton2,
  },
});

export default (props) => {
  let { form, type, record } = props;

  useEffect(async () => {
    form.query('*(taskCode)').forEach((field) => {
      field.setPattern('disabled');
    });
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
                          name: values.selectedRow.name,
                          taskCode: values.selectedRow.taskCode,
                          customerId: values.selectedRow.customerId,
                          customerName: values.selectedRow.customerName,
                          deptId: values.selectedRow.deptId,
                          deptName: values.selectedRow.deptName,
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

  const onClick2 = (flag) => {
    if (flag === 'open') {
      let dialog2 = FormDialog(
        { footer: null, keyboard: false, maskClosable: false, width: 800 },
        (form2) => {
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
                          customerId: values.selectedRow.id,
                          customerName: values.selectedRow.name,
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
      <Form form={form} labelWidth={120} className={styles.placeholder}>
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
              x-component="InputButton"
              x-component-props={{ onClick: onClick }}
            />
            <SchemaField.String
              name="taskCode"
              title="备案号"
              x-decorator="FormItem"
              x-component="Input"
            />
            <SchemaField.Number
              name="contractMoney"
              required
              x-decorator="FormItem"
              title="收款合同金额"
              x-component="NumberPicker"
              x-component-props={{
                addonAfter: '元',
                formatter: (value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
              }}
            />
            <SchemaField.String
              name="customerName"
              required
              title="客户名称"
              x-decorator="FormItem"
              x-component="InputButton"
              x-component-props={{ onClick: onClick2 }}
            />
            <SchemaField.String
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
