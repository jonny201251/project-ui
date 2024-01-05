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
  InputButton2,
  LoadingButton,
  NumberPicker,
} from '../../components';
import { onFieldReact } from '@formily/core';
import ProcessInstNodeList from '../ProcessInstNode/List';
import ProcessDesignGraph from '../ProcessDesignGraph';

const InputButton = (props) => {
  const index = ArrayTable.useIndex();
  const row = ArrayTable.useRecord();
  return (
    <div style={{ display: 'inline-flex', width: '100%' }}>
      <Input {...props} style={{ ...props.style }} disabled />
      <Button
        onClick={(e) => {
          if (props.onClick) {
            props.onClick(index, row);
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
                <SchemaField.Array
                  name="list"
                  title={'比价单位信息'}
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
                        x-component-props={{ onClick: onClick2, form: form }}
                      />
                    </SchemaField.Void>
                    <SchemaField.Void
                      x-component="ArrayTable.Column"
                      x-component-props={{
                        title: '报价',
                        width: 170,
                        align: 'center',
                      }}
                    >
                      <SchemaField.String
                        name="price"
                        required
                        x-decorator="FormItem"
                        x-component="NumberPicker"
                        x-component-props={{
                          addonAfter: '元',
                          formatter: (value) =>
                            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                        }}
                      />
                    </SchemaField.Void>
                    <SchemaField.Void
                      x-component="ArrayTable.Column"
                      x-component-props={{
                        title: '税率',
                        width: 90,
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
                        width: 150,
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
                        title: '排名',
                        width: 60,
                        align: 'center',
                      }}
                    >
                      <SchemaField.String
                        name="sort"
                        required
                        x-decorator="FormItem"
                        x-component="Input"
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
                  title="比价人员意见"
                  description={
                    '示例：比价人员意见。' +
                    session.getItem('user')?.loginName +
                    new Date().Format('yyyy.M.d')
                  }
                  required
                  x-decorator="FormItem"
                  x-component="Input.TextArea"
                  x-component-props={{
                    rows: 4,
                  }}
                  x-decorator-props={{ gridSpan: 2 }}
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
