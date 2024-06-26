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
import { SearchOutlined } from '@ant-design/icons';
import React, { useEffect } from 'react';
import { Button, ConfigProvider, message } from 'antd';
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

//文本框+按钮
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
    Radio,
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
              name="method"
              title="拟采用的评审方法"
              required
              x-decorator="FormItem"
              x-component="Select"
              enum={[
                { label: '最低评标价法', value: '最低评标价法' },
                { label: '综合评标法', value: '综合评标法' },
              ]}
            />
            <SchemaField.String
              name="contractPrice"
              title="合同估价"
              required
              x-decorator="FormItem"
              x-component="NumberPicker"
              x-component-props={{
                addonAfter: '万元',
                formatter: (value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
              }}
            />
            <SchemaField.Array
              name="list"
              title={'评审单位信息'}
              required
              x-decorator="FormItem"
              x-component="ArrayTable"
              x-decorator-props={{ gridSpan: 3 }}
              x-component-props={{ size: 'small', sticky: true }}
            >
              <SchemaField.Object>
                <SchemaField.Void
                  x-component="ArrayTable.Column"
                  x-component-props={{
                    title: '拟邀请单位',
                    align: 'center',
                    width: 300,
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
                    title: '资质情况',
                    align: 'center',
                  }}
                >
                  <SchemaField.String
                    name="descc"
                    required
                    x-decorator="FormItem"
                    x-component="Input.TextArea"
                    x-component-props={{ rows: 2 }}
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
              title="评审实施计划安排"
              required
              x-decorator="FormItem"
              x-component="Input.TextArea"
              x-component-props={{ rows: 3 }}
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
