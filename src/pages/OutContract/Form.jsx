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
  OnlyButton,
} from '../../components';
import { contractMoneyPath, get, inContractPath, post } from '../../utils';
import DialogList from './DialogList';
import DialogList2 from './DialogList2';
import styles from '../table-placeholder.less';
import { Button, ConfigProvider, message } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import React, { useEffect } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import DialogList3 from './DialogList3';

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
    OnlyButton,
    LoadingButton,
    InputButton,
    InputButton2,
    NumberPicker,
    Select,
    DatePicker,
    Radio,
    File,
  },
});

export default (props) => {
  let { form, type, record } = props;

  useEffect(async () => {
    form
      .query(
        '*(displayName,deptName,createDatetime,taskCode,property,costType)',
      )
      .forEach((field) => {
        field.setPattern('disabled');
      });
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
                          projectType: values.selectedRow.projectType,
                          name: values.selectedRow.name,
                          wbs: values.selectedRow.wbs,
                          taskCode: values.selectedRow.taskCode,
                          costType: values.selectedRow.outType,
                          costRate: values.selectedRow.rate,
                          deptId: values.selectedRow.deptId,
                          deptName: values.selectedRow.deptName,
                          loginName: values.selectedRow.loginName,
                          displayName: values.selectedRow.loginName,
                          createDatetime: values.selectedRow.createDatetime,
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
                          providerId: values.selectedRow.id,
                          providerName: values.selectedRow.name,
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

  const onClick3 = async () => {
    if (!form.values.taskCode) return;
    const dbRecord = await get(inContractPath.get2, {
      taskCode: form.values.taskCode,
    });
    if (dbRecord) {
      let dialog = FormDialog(
        {
          title: '收款合同',
          footer: null,
          keyboard: false,
          maskClosable: false,
          width: 1000,
        },
        (form) => {
          form.setValues(dbRecord);
          return (
            <>
              <inContractPath.Form
                form={form}
                type={'view'}
                record={dbRecord}
                dialog={dialog}
              />
            </>
          );
        },
      );
      dialog.open();
    }
  };

  const onClick4 = async (flag) => {
    const data = await post(contractMoneyPath.list, {
      contractCode: record?.contractCode,
      type: '付款合同',
    });
    if (flag === 'open' && data) {
      let dialog3 = FormDialog(
        {
          footer: null,
          keyboard: false,
          maskClosable: false,
          width: 800,
          title: '修改记录',
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

  return (
    <ConfigProvider locale={zhCN}>
      <Form form={form} labelWidth={110} className={styles.placeholder}>
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
              name="wbs"
              required
              title="WBS编号"
              x-decorator="FormItem"
              x-component="Input"
            />
            <SchemaField.String
              name="contractName"
              required
              x-decorator="FormItem"
              title="付款合同名称"
              x-component="Input"
            />
            <SchemaField.String
              name="contractCode"
              x-decorator="FormItem"
              title="付款合同编号"
              x-component="Input"
            />
          </SchemaField.Void>
          <SchemaField.Void
            x-component="FormGrid"
            x-component-props={{ maxColumns: 3, strictAutoFit: true }}
          >
            <SchemaField.String
              name="providerName"
              required
              title="供方名称"
              x-decorator="FormItem"
              x-component="InputButton"
              x-component-props={{ onClick: onClick2 }}
            />
            <SchemaField.Number
              name="contractMoney"
              required
              x-decorator="FormItem"
              title="付款合同金额"
              x-component="InputButton2"
              x-component-props={{
                onClick: onClick4,
                formatter: (value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
              }}
            />
            <SchemaField.Number
              name="endMoney"
              x-decorator="FormItem"
              title="结算金额"
              x-component="NumberPicker"
              x-component-props={{
                addonAfter: '元',
                formatter: (value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
              }}
            />
            <SchemaField.String
              name="costType"
              title="成本类型"
              x-decorator="FormItem"
              x-component="Input"
            />
            <SchemaField.String
              name="costRate"
              title="税率"
              x-decorator="FormItem"
              x-component="Input"
            />
            <SchemaField.String
              x-decorator="FormItem"
              title="收款合同信息"
              x-component="OnlyButton"
              x-component-props={{ onClick: onClick3, name: '查看' }}
            />
            <SchemaField.String
              name="fileList"
              title="附件"
              x-decorator="FormItem"
              x-component="File"
              x-decorator-props={{ gridSpan: 2 }}
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
