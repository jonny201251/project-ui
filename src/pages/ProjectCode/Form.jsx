import {
  Cascader,
  Form,
  FormButtonGroup,
  FormDialog,
  FormGrid,
  FormItem,
  FormLayout,
  Input,
  Select,
  Radio,
} from '@formily/antd';
import { createSchemaField } from '@formily/react';
import React, { useEffect } from 'react';
import { session } from '../../utils';
import { LoadingButton, NumberPicker } from '../../components';
import { Button, ConfigProvider, message } from 'antd';
import DialogList from './DialogList';
import DialogList2 from './DialogList2';
import zhCN from 'antd/lib/locale/zh_CN';
import styles from '../table-placeholder.less';
import { onFieldReact } from '@formily/core';
import { SearchOutlined } from '@ant-design/icons';

const InputButton = (props) => {
  return (
    <div style={{ display: 'inline-flex', width: '100%' }}>
      <Input {...props} style={{ ...props.style }} />
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
    Select,
    InputButton,
    FormGrid,
    Cascader,
    NumberPicker,
    Radio,
  },
});

export default (props) => {
  let { form, record, type } = props;

  useEffect(() => {
    const user = session.getItem('user');

    if (record?.taskCode) {
      form.query('taskCode').take().setDisplay('visible');
      if (user.displayName === '代佳宝') {
        form.query('taskCode').take().setPattern('editable');
      } else {
        form.query('taskCode').take().setPattern('disabled');
      }
    } else {
      form.query('taskCode').take().setDisplay('hidden');
    }

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

  const optionArr = [
    {
      label: '机电工程',
      value: '1',
      children: [
        { label: '消防工程及维保', value: '1' },
        { label: '安防工程(平安城市及雪亮工程)', value: '2' },
        { label: '建筑智能化(弱电等)', value: '3' },
        { label: '机电工程安装(暖通、空调等)', value: '4' },
        { label: '其他', value: '9' },
      ],
    },
    {
      label: '智慧产业',
      value: '2',
      children: [
        { label: '智慧管网', value: '1' },
        { label: '智慧环保', value: '2' },
        { label: '智慧管廊', value: '3' },
        { label: '智慧警务', value: '4' },
        { label: '智慧水务', value: '5' },
        { label: '其他', value: '9' },
      ],
    },
    {
      label: '节能环保',
      value: '3',
      children: [
        { label: '职业卫生技术咨询及管理服务', value: '1' },
        { label: '职业卫生工程及改造', value: '2' },
        { label: '节能环保工程', value: '3' },
        { label: '节能环保检测', value: '4' },
        { label: '污水运维服务', value: '5' },
        { label: '节能环保设备销售', value: '6' },
        { label: '废水处理服务', value: '7' },
        { label: '其他', value: '9' },
      ],
    },
    {
      label: '动力工程',
      value: '4',
      children: [
        { label: '动力工程', value: '1' },
        { label: '动力工程设计', value: '2' },
        { label: '其他', value: '9' },
      ],
    },
    {
      label: '国际工程',
      value: '5',
      children: [
        { label: '国际工程承包', value: '1' },
        { label: '其他', value: '9' },
      ],
    },
    {
      label: '系统运维',
      value: '6',
      children: [
        { label: '设备设施运维', value: '1' },
        { label: '其他', value: '9' },
      ],
    },
    {
      label: '产品代理',
      value: '7',
      children: [
        { label: '国内产品代理', value: '1' },
        { label: '国外产品代理', value: '2' },
        { label: '职业健康云平台产品', value: '3' },
        { label: '其他', value: '9' },
      ],
    },
    {
      label: '生产运行业务',
      value: '8',
      children: [
        { label: '供水业务', value: '1' },
        { label: '供热业务', value: '2' },
        { label: '供电业务', value: '3' },
        { label: '污水业务', value: '4' },
        { label: '其他业务', value: '9' },
      ],
    },
    {
      label: '非直接经营业务',
      value: '9',
      children: [
        { label: '市场开发项目(渠道建设、资源维护)', value: '1' },
        { label: '创新项目', value: '2' },
        { label: '展览宣传项目', value: '3' },
        { label: '战略合作协议、备忘录等', value: '4' },
        { label: '其他非经营业务', value: '9' },
      ],
    },
  ];

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
                          providerUsee: values.selectedRow.usee,
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
          </SchemaField.Void>
          <SchemaField.Void
            x-component="FormGrid"
            x-component-props={{ maxColumns: 3, strictAutoFit: true }}
          >
            <SchemaField.String
              name="projectName"
              required
              title="项目名称"
              x-decorator="FormItem"
              x-decorator-props={{ gridSpan: 2 }}
              x-component="Input"
            />
            <SchemaField.String
              name="taskCode"
              title="任务号/备案号"
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
              x-component-props={{ onClick: onClick }}
            />
            <SchemaField.String
              name="customerProperty"
              required
              title="客户企业性质"
              x-decorator="FormItem"
              x-component="Select"
              enum={[
                { label: '非经营业务下无单位', value: '0' },
                { label: '甲方国企', value: '1' },
                { label: '甲方民企', value: '2' },
              ]}
            />
            <SchemaField.String
              name="providerName"
              title="供方名称"
              x-decorator="FormItem"
              x-decorator-props={{ gridSpan: 2 }}
              x-component="InputButton"
              x-component-props={{ onClick: onClick2 }}
            />
            <SchemaField.String
              name="providerProperty"
              required
              title="供方性质"
              x-decorator="FormItem"
              x-component="Select"
              enum={[
                { label: '无合作方', value: '0' },
                { label: '合作方国企', value: '1' },
                { label: '合作方民企', value: '2' },
              ]}
            />
            <SchemaField.String
              name="businessTypeTmp"
              required
              title="业务类别"
              x-decorator="FormItem"
              x-decorator-props={{ gridSpan: 2 }}
              x-component="Cascader"
              enum={optionArr}
            />
            <SchemaField.String
              name="haveMoreBudget"
              required
              title="一个任务号是否有多个预算表"
              x-decorator="FormItem"
              x-component="Radio.Group"
              enum={[
                { label: '是', value: '是' },
                { label: '否', value: '否' },
              ]}
            />
            <SchemaField.String
              name="projectLocation"
              title="项目地点"
              x-decorator="FormItem"
              x-decorator-props={{ gridSpan: 2 }}
              x-component="Input"
            />
            <SchemaField.String
              name="projectMoney"
              required
              title="项目金额"
              x-decorator="FormItem"
              x-component="NumberPicker"
              x-component-props={{
                addonAfter: '元',
                formatter: (value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
              }}
            />

            <SchemaField.String
              name="remark"
              title="备注"
              x-component="Input.TextArea"
              x-decorator="FormItem"
              x-decorator-props={{ gridSpan: 2 }}
            />
          </SchemaField.Void>
        </SchemaField>
      </Form>
    </ConfigProvider>
  );
};
