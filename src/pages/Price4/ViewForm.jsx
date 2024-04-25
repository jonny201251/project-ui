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
import { SearchOutlined } from '@ant-design/icons';
import React, { useEffect } from 'react';
import { Button, ConfigProvider, message, Tabs } from 'antd';
import { session } from '../../utils';
import zhCN from 'antd/lib/locale/zh_CN';
import styles from '../table-placeholder.less';
import DialogList from './DialogList';
import DialogList2 from './DialogList2';
import {
  ArrayTableAddition,
  ArrayTableIndex,
  ArrayTableRemove,
  File,
  InputButton,
  InputButton2,
  LoadingButton,
  NumberPicker,
} from '../../components';
import { onFieldReact } from '@formily/core';
import ProcessInstNodeList from '../ProcessInstNode/List';
import ProcessDesignGraph from '../ProcessDesignGraph';

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
    ArrayTable,
    ArrayTableIndex,
    ArrayTableRemove,
    ArrayTableAddition,
    NumberPicker,
  },
});

export default (props) => {
  let { form, record, type, haveEditForm } = props;

  useEffect(async () => {
    if (haveEditForm === '否') {
      form.setPattern('disabled');
      form.query('comment').take()?.setPattern('editable');
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

  form.addEffects('id', () => {
    onFieldReact('projectType', (field) => {
      let value = field.value;
      let f = form.query('projectName').take();
      if (value === '民用产业') {
        f?.setComponent('InputButton2');
        form.query('*(inContractName,inContractCode)').forEach((field) => {
          field.setState({ required: true });
        });
      } else {
        f?.setComponent('Input');
        form
          .query('*(taskCode,inContractName,inContractCode)')
          .forEach((field) => {
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

  const onClick2 = (index, row) => {
    let dialog2 = FormDialog(
      { footer: null, keyboard: false, maskClosable: false, width: 800 },
      (form2) => {
        return (
          <>
            <DialogList2 form={form2} dialog={dialog2} selectedId={row?.id} />
            <FormDialog.Footer>
              <FormButtonGroup gutter={16} align={'right'}>
                <Button onClick={() => dialog2.close()}>取消</Button>
                <LoadingButton
                  onClick={async () => {
                    const values = await form2.submit();
                    if (values.selectedRow) {
                      row['providerId'] = values.selectedRow.id;
                      row['providerName'] = values.selectedRow.name;
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
  };

  return (
    <ConfigProvider locale={zhCN}>
      <Tabs animated={false} size={'small'}>
        <Tabs.TabPane tab="表单数据" key="1">
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
                  title="部门"
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
                  title="备案号"
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
                  name="content"
                  required
                  x-decorator="FormItem"
                  title="招标内容及类别"
                  x-component="Input.TextArea"
                  x-component-props={{ rows: 3 }}
                />
                <SchemaField.String
                  name="money"
                  title="招标金额(拦标价)"
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
                  name="style"
                  required
                  title="招标方式"
                  x-decorator="FormItem"
                  x-component="Select"
                  enum={[
                    { label: '公开招标', value: '公开招标' },
                    { label: '邀请招标', value: '邀请招标' },
                  ]}
                />

                <SchemaField.String
                  name="descc"
                  title="所属项目基本情况"
                  required
                  x-decorator="FormItem"
                  x-component="Input.TextArea"
                  x-component-props={{
                    rows: 3,
                    placeholder: '所属项目基本情况',
                  }}
                  x-decorator-props={{ gridSpan: 3 }}
                />
                <SchemaField.String
                  name="requestList"
                  required
                  title="拟邀请投标人"
                  x-decorator="FormItem"
                  x-decorator-props={{ gridSpan: 3 }}
                  x-component="Select"
                  x-component-props={{ showSearch: true, mode: 'multiple' }}
                  enum={session.getItem('userList')}
                />
                <SchemaField.String
                  name="providerName"
                  required
                  title="拟选招标代理机构"
                  x-decorator="FormItem"
                  x-decorator-props={{ gridSpan: 3 }}
                  x-component="InputButton"
                  x-component-props={{ onClick: onClick2 }}
                />
                <SchemaField.String
                  name="method"
                  title="拟选评标方法"
                  required
                  x-decorator="FormItem"
                  x-component="Input.TextArea"
                  x-component-props={{
                    rows: 2,
                    placeholder: '最低价评标法或综合评价法',
                  }}
                  x-decorator-props={{ gridSpan: 3 }}
                />
                <SchemaField.String
                  name="plan"
                  title="拟定招标计划"
                  required
                  x-decorator="FormItem"
                  x-component="Input.TextArea"
                  x-component-props={{
                    rows: 3,
                    placeholder: '招标时间和地点等',
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
        </Tabs.TabPane>
        <Tabs.TabPane tab="审批记录" key="3">
          <ProcessInstNodeList processInstId={record.processInstId} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="流程图" key="2">
          <ProcessDesignGraph processInstId={record.processInstId} />
        </Tabs.TabPane>
      </Tabs>
    </ConfigProvider>
  );

  return <ConfigProvider locale={zhCN}></ConfigProvider>;
};
