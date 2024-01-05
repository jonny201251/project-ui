import {
  ArrayTable,
  DatePicker,
  Form,
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
import styles from '../table-placeholder.less';
import { ConfigProvider } from 'antd';
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
  let { form, type, record } = props;

  useEffect(async () => {
    form.setPattern('disabled');
    if (!record.wbs) {
      form
        .query('wbs')
        .take()
        ?.setState({ pattern: 'editable', required: true });
    } else {
      form.query('wbs').take()?.setState({ required: false });
    }
    form.query('contractCode').take()?.setState({ pattern: 'editable' });
  }, []);

  return (
    <ConfigProvider locale={zhCN}>
      <Form form={form} labelWidth={110} className={styles.placeholder}>
        <SchemaField>
          <SchemaField.Void
            x-component="FormGrid"
            x-component-props={{ maxColumns: 3, strictAutoFit: true }}
          >
            <SchemaField.String
              name="wbs"
              title="WBS编号"
              x-decorator="FormItem"
              x-component="Input"
            />
            <SchemaField.String
              name="contractCode"
              required
              x-decorator="FormItem"
              title="合同编号"
              x-component="Input"
            />
          </SchemaField.Void>
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
              title="项目名称"
              x-decorator="FormItem"
              x-decorator-props={{ gridSpan: 2 }}
              x-component="Input"
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
              x-component="Input"
            />
            <SchemaField.String
              name="costRate"
              title="税费"
              x-decorator="FormItem"
              x-component="Input"
            />
            <SchemaField.String
              name="name2"
              title="供方名称"
              x-decorator="FormItem"
              x-decorator-props={{ gridSpan: 2 }}
              x-component="Input"
            />
            <SchemaField.String
              name="contractName"
              x-decorator="FormItem"
              title="合同名称"
              x-component="Input"
              x-decorator-props={{ gridSpan: 2 }}
            />
            <SchemaField.String
              name="contractType"
              x-decorator="FormItem"
              title="合同类型"
              x-component="Input"
            />
          </SchemaField.Void>
          <SchemaField.Void
            x-component="FormGrid"
            x-component-props={{ maxColumns: 3, strictAutoFit: true }}
          >
            <SchemaField.Number
              name="contractMoney"
              x-decorator="FormItem"
              title="合同金额"
              x-component="NumberPicker"
            />
            <SchemaField.Number
              name="endMoney"
              x-decorator="FormItem"
              title="结算金额"
              x-component="NumberPicker"
            />
          </SchemaField.Void>
        </SchemaField>
      </Form>
    </ConfigProvider>
  );
};
