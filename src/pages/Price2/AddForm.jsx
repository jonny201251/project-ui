import {
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
import DialogList2 from './DialogList2';
import {
  File,
  InputButton,
  InputButton2,
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
    InputButton2,
    DatePicker,
    File,
    Select,
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
      let f = form.query('projectName').take();
      if (value === '民用产业' || !value) {
        f?.setComponent('InputButton2');
        form.query('*(inContractName,inContractCode)').forEach((field) => {
          field.setState({ required: true });
        });
      } else {
        f?.setComponent('Input');
        form.query('*(inContractName,inContractCode)').forEach((field) => {
          field.setState({ required: false });
        });
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
                          projectName: values.selectedRow.name,
                          taskCode: values.selectedRow.taskCode,
                          inContractId: values.selectedRow.id,
                          inContractName: values.selectedRow.contractName,
                          inContractCode: values.selectedRow.contractCode,
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
              <DialogList2 form={form2} dialog={dialog2} />
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
              name="projectLevel"
              required
              title="项目密级"
              x-decorator="FormItem"
              x-component="Select"
              enum={[
                { label: '非密', value: '非密' },
                { label: '内部', value: '内部' },
                { label: '秘密', value: '秘密' },
                { label: '机密', value: '机密' },
              ]}
            />
            <SchemaField.String
              name="projectName"
              required
              title="项目名称"
              x-decorator="FormItem"
              x-decorator-props={{ gridSpan: 2 }}
              x-component="InputButton2"
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
            <SchemaField.String
              name="limitt"
              title="符合条款"
              required
              x-decorator="FormItem"
              x-decorator-props={{ gridSpan: 3 }}
              x-component="Select"
              enum={[
                {
                  label:
                    '十二条(一)具体事项涉及国家秘密或商业秘密，比价或评审过程中秘密无法或很难保全的',
                  value:
                    '十二条(一)具体事项涉及国家秘密或商业秘密，比价或评审过程中秘密无法或很难保全的',
                },
                {
                  label:
                    '十二条(二)主要工艺、技术需要 用特定专利或者专有技术的',
                  value:
                    '十二条(二)主要工艺、技术需要 用特定专利或者专有技术的',
                },
                {
                  label: '十二条(三)潜在承包商、供应商或服务提供者少于 3 家的',
                  value: '十二条(三)潜在承包商、供应商或服务提供者少于 3 家的',
                },
                {
                  label:
                    '十二条(四)在合同执行过程中或合同执行完毕后需要追加工程、服务或材料，追加合同金额不超过原合同金额 30%，且追加金额累计不超过 200 万元的',
                  value:
                    '十二条(四)在合同执行过程中或合同执行完毕后需要追加工程、服务或材料，追加合同金额不超过原合同金额 30%，且追加金额累计不超过 200 万元的',
                },
                {
                  label:
                    '十二条(五)在原有工程、系统等基础上进行升级改造的(如改变承包商、供应商、服务提供者，将明显影响功能配套要求)',
                  value:
                    '十二条(五)在原有工程、系统等基础上进行升级改造的(如改变承包商、供应商、服务提供者，将明显影响功能配套要求)',
                },
                {
                  label:
                    '十二条(六)上级单位以正式文件形式明确了产品或服务集中选型的',
                  value:
                    '十二条(六)上级单位以正式文件形式明确了产品或服务集中选型的',
                },
                {
                  label:
                    '十二条(七)承包单位或销售单位与公司签订了战略合作协议，明确双方业务捆绑共同开发市场、承揽项目的',
                  value:
                    '十二条(七)承包单位或销售单位与公司签订了战略合作协议，明确双方业务捆绑共同开发市场、承揽项目的',
                },
              ]}
            />
            <SchemaField.String
              name="providerName"
              required
              title="谈判单位名称"
              x-decorator="FormItem"
              x-decorator-props={{ gridSpan: 2 }}
              x-component="InputButton"
              x-component-props={{ onClick: onClick2 }}
            />
          </SchemaField.Void>
          <SchemaField.Void
            x-component="FormGrid"
            x-component-props={{ maxColumns: 3, strictAutoFit: true }}
          >
            <SchemaField.String
              name="invoiceType"
              title="发票种类"
              required
              x-decorator="FormItem"
              x-component="Select"
              enum={[
                { label: '专票', value: '专票' },
                { label: '普票', value: '普票' },
                { label: '财政收据', value: '财政收据' },
                { label: '其他', value: '其他' },
              ]}
            />
            <SchemaField.String
              name="rate"
              title="税率"
              required
              x-decorator="FormItem"
              x-component="Input"
            />
          </SchemaField.Void>
          <SchemaField.Void
            x-component="FormGrid"
            x-component-props={{ maxColumns: 3, strictAutoFit: true }}
          >
            <SchemaField.String
              name="price1"
              title="预算控制价"
              required
              x-decorator="FormItem"
              x-component="NumberPicker"
              x-component-props={{
                addonAfter: '元',
                formatter: (value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
              }}
            />
            <SchemaField.String
              name="price2"
              title="预期谈判底价"
              required
              x-decorator="FormItem"
              x-component="NumberPicker"
              x-component-props={{
                addonAfter: '元',
                formatter: (value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
              }}
            />
            <SchemaField.String
              name="price3"
              title="最终谈判价格"
              required
              x-decorator="FormItem"
              x-component="NumberPicker"
              x-component-props={{
                addonAfter: '元',
                formatter: (value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
              }}
            />
            <SchemaField.String
              name="good"
              title="谈判单位概况及业务（产品）竞争优势"
              required
              x-decorator="FormItem"
              x-component="Input.TextArea"
              x-component-props={{
                rows: 3,
              }}
              x-decorator-props={{ gridSpan: 3, labelWrap: true }}
            />
            <SchemaField.String
              name="descc"
              title="谈判人员意见"
              description={
                '示例：谈判人员意见。' +
                session.getItem('user')?.loginName +
                new Date().Format('yyyy.M.d')
              }
              required
              x-decorator="FormItem"
              x-component="Input.TextArea"
              x-component-props={{
                rows: 2,
              }}
              x-decorator-props={{ gridSpan: 3 }}
            />
            <SchemaField.String
              name="fileList"
              title="附件"
              x-decorator="FormItem"
              x-component="File"
              x-decorator-props={{ gridSpan: 3 }}
              required
              description={
                '需包括参与供应商的报价(须填写报价日期）及资格审查(包括营业执照，相关资质文件等）资料'
              }
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
