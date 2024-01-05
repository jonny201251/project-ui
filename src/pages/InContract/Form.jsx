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
import { contractMoneyPath, post, session } from '../../utils';
import DialogList from './DialogList';
import DialogList3 from './DialogList3';
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
    form
      .query('*(displayName,deptName,createDatetime,taskCode)')
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
                          projectType: values.selectedRow.projectType,
                          projectId: values.selectedRow.projectId,
                          name: values.selectedRow.name,
                          wbs: values.selectedRow.wbs,
                          taskCode: values.selectedRow.taskCode,
                          property: values.selectedRow.property,
                          customerId: values.selectedRow.customerId,
                          customerName: values.selectedRow.customerName,
                          contractCode: values.selectedRow.contractCode,
                          contractMoney: values.selectedRow.contractMoney,
                          contractName: values.selectedRow.contractName,
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

  const onClick3 = async (flag) => {
    const data = await post(contractMoneyPath.list, {
      contractCode: record?.contractCode,
      type: '收款合同',
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
              title="备案号"
              x-decorator="FormItem"
              x-component="Input"
            />
          </SchemaField.Void>
          <SchemaField.Void
            x-component="FormGrid"
            x-component-props={{ maxColumns: 3, strictAutoFit: true }}
          >
            <SchemaField.String
              name="projectTypee"
              required
              title="项目类别"
              x-decorator="FormItem"
              x-component="Select"
              enum={[
                { label: '民用产业', value: '民用产业' },
                { label: '非民用产业', value: '非民用产业' },
              ]}
            />
            <SchemaField.String
              name="property"
              title="项目性质"
              x-decorator="FormItem"
              x-component="Select"
              enum={[
                { label: '一类', value: '一类' },
                { label: '二类', value: '二类' },
                { label: '三类', value: '三类' },
              ]}
            />
            <SchemaField.String
              name="location"
              title="项目所在地"
              x-decorator="FormItem"
              x-component="Input"
            />
            <SchemaField.String
              name="customerName"
              required
              title="客户名称"
              x-decorator="FormItem"
              x-decorator-props={{ gridSpan: 2 }}
              x-component="InputButton"
              x-component-props={{ onClick: onClick2 }}
            />
            <SchemaField.String
              name="wbs"
              title="WBS编号"
              x-decorator="FormItem"
              x-component="Input"
            />
            <SchemaField.String
              name="contractName"
              required
              x-decorator="FormItem"
              title="收款合同名称"
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
              x-decorator="FormItem"
              title="收款合同编号"
              x-component="Input"
            />
            <SchemaField.Number
              name="contractMoney"
              required
              x-decorator="FormItem"
              title="收款合同金额"
              x-component="InputButton2"
              x-component-props={{
                onClick: onClick3,
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
          </SchemaField.Void>
          <SchemaField.Void
            x-component="FormGrid"
            x-component-props={{ maxColumns: 3, strictAutoFit: true }}
          >
            <SchemaField.String
              name="contractType"
              x-decorator="FormItem"
              title="合同类别"
              x-component="Input"
            />
            <SchemaField.String
              name="contractLevel"
              x-decorator="FormItem"
              title="合同级别"
              x-component="Input"
            />
            <SchemaField.String
              name="printType"
              x-decorator="FormItem"
              title="用印类别"
              x-component="Input"
            />
            <SchemaField.String
              name="printDate"
              title="用印日期"
              x-decorator="FormItem"
              x-component="DatePicker"
              x-component-props={{ format: 'YYYY-M' }}
            />
            <SchemaField.String
              name="validDate"
              title="生效日期"
              x-decorator="FormItem"
              x-component="DatePicker"
              x-component-props={{ format: 'YYYY-M' }}
            />
            <SchemaField.String
              name="startDate"
              title="开工日期"
              x-decorator="FormItem"
              x-component="DatePicker"
              x-component-props={{ format: 'YYYY-M' }}
            />
            <SchemaField.String
              name="endDate"
              title="竣工日期"
              x-decorator="FormItem"
              x-component="DatePicker"
              x-component-props={{ format: 'YYYY-M' }}
            />
            <SchemaField.String
              name="expectDate"
              title="签订日期"
              x-decorator="FormItem"
              x-component="DatePicker"
              x-component-props={{ format: 'YYYY-M' }}
            />
            <SchemaField.String
              name="documentDate"
              title="归档日期"
              x-decorator="FormItem"
              x-component="DatePicker"
              x-component-props={{ format: 'YYYY-M' }}
            />
            <SchemaField.String
              name="endDatee"
              title="结束日期"
              x-decorator="FormItem"
              x-component="DatePicker"
              x-component-props={{ format: 'YYYY-M' }}
            />
            <SchemaField.String
              name="runtimeTmp"
              title="履行时间"
              x-component="DatePicker.RangePicker"
              x-decorator="FormItem"
              x-decorator-props={{ tooltip: '双击鼠标进行选择', gridSpan: 2 }}
            />
          </SchemaField.Void>
          <SchemaField.Void
            x-component="FormGrid"
            x-component-props={{ maxColumns: 3, strictAutoFit: true }}
          >
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
