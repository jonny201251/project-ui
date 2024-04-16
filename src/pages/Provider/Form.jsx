import {
  Form,
  FormItem,
  FormLayout,
  Input,
  Select,
  Radio,
} from '@formily/antd';
import { createSchemaField } from '@formily/react';
import React, { useEffect } from 'react';
import { NumberPicker, File } from '../../components';
import { onFieldReact } from '@formily/core';

const SchemaField = createSchemaField({
  components: {
    FormLayout,
    FormItem,
    Input,
    NumberPicker,
    Select,
    File,
    Radio,
  },
});

export default (props) => {
  let { form, record, type } = props;

  useEffect(() => {
    form
      .query('.projectType')
      .take()
      ?.setState({ display: 'hidden', value: null });
  }, []);

  const show = () => {
    if (type === 'view') {
      return (
        <SchemaField.String
          name="result"
          required
          title="结论"
          x-decorator="FormItem"
          x-component="Input"
        />
      );
    }
  };

  form.addEffects('id', () => {
    onFieldReact('usee', (field) => {
      if (field.value === '民用产业项目') {
        form.query('.type').take()?.setState({ display: 'visible' });
      } else {
        form
          .query('.type')
          .take()
          ?.setState({ display: 'hidden', value: null });
      }
    });
  });

  return (
    <Form form={form}>
      <SchemaField>
        <SchemaField.Void
          x-component="FormLayout"
          x-component-props={{ labelCol: 6, wrapperCol: 16 }}
        >
          <SchemaField.String
            name="usee"
            required
            title="项目类别"
            x-decorator="FormItem"
            x-component="Select"
            enum={[
              { label: '民用产业项目', value: '民用产业项目' },
              {
                label: '自筹资金项目、技改项目',
                value: '自筹资金项目、技改项目',
              },
              { label: '公司管理部门', value: '公司管理部门' },
            ]}
          />
          <SchemaField.String
            name="type"
            required
            title="项目大小"
            x-decorator="FormItem"
            x-component="Radio.Group"
            enum={[
              { label: '一般项目', value: '一般项目' },
              { label: '重大项目', value: '重大项目' },
            ]}
          />
          <SchemaField.String
            name="name"
            required
            title="供方名称"
            x-decorator="FormItem"
            x-component="Input"
          />
          <SchemaField.String
            name="property"
            required
            title="供方企业性质"
            x-decorator="FormItem"
            x-component="Select"
            enum={[
              { label: '事业单位', value: '事业单位' },
              { label: '国有企业', value: '国有企业' },
              { label: '民营企业', value: '民营企业' },
              { label: '外资合资', value: '外资合资' },
              { label: '个体经营', value: '个体经营' },
              { label: '其他', value: '其他' },
            ]}
          />
          <SchemaField.String
            name="zizhi"
            required
            title="纳税人资质"
            x-decorator="FormItem"
            x-component="Select"
            enum={[
              { label: '一般纳税人', value: '一般纳税人' },
              { label: '小规模纳税人', value: '小规模纳税人' },
            ]}
          />
          <SchemaField.String
            name="address"
            required
            title="注册地址"
            x-decorator="FormItem"
            x-component="Input.TextArea"
            x-component-props={{ rows: 2 }}
          />
          <SchemaField.String
            name="code"
            required
            title="纳税人识别号"
            x-decorator="FormItem"
            x-component="Input"
          />
          <SchemaField.Number
            name="registerMoney"
            required
            title="注册资本"
            x-decorator="FormItem"
            x-component="NumberPicker"
            x-component-props={{
              addonAfter: '元',
              formatter: (value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
            }}
          />
          <SchemaField.Number
            name="realMoney"
            title="实缴资本"
            x-decorator="FormItem"
            x-component="NumberPicker"
            x-component-props={{
              addonAfter: '元',
              formatter: (value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
            }}
          />
          {show()}
          <SchemaField.String
            name="fileList"
            required
            title="附件"
            x-decorator="FormItem"
            x-component="File"
            x-decorator-props={{
              feedbackText: '上传 营业执照、法人信息、法人授权书',
            }}
            // x-decorator-props={{ tooltip: '营业执照、法人信息'}}
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
  );
};
