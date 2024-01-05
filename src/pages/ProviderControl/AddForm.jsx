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
import { SearchOutlined } from '@ant-design/icons';
import { session } from '../../utils';
import zhCN from 'antd/lib/locale/zh_CN';
import styles from '../table-placeholder.less';
import DialogList from './DialogList';
import { File, LoadingButton, InputButton } from '../../components';

const SchemaField = createSchemaField({
  components: {
    FormLayout,
    FormItem,
    FormGrid,
    Input,
    InputButton,
    DatePicker,
    File,
    Select,
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
                          providerId: values.selectedRow.providerId,
                          usee: values.selectedRow.usee,
                          name: values.selectedRow.name,
                          property: values.selectedRow.property,
                          address: values.selectedRow.address,
                          registerMoney: values.selectedRow.registerMoney,
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
              required
              title="供方名称"
              x-decorator="FormItem"
              x-decorator-props={{ gridSpan: 2 }}
              x-component="InputButton"
              x-component-props={{ onClick: onClick }}
            />
            <SchemaField.String
              name="usee"
              title="项目类别"
              x-decorator="FormItem"
              x-component="Input"
            />
            <SchemaField.String
              required
              name="descc"
              title="变动说明"
              x-decorator="FormItem"
              x-component="Input.TextArea"
              x-component-props={{
                rows: 3,
                placeholder: '合格供方情况变动说明',
              }}
              x-decorator-props={{ gridSpan: 3 }}
            />
            <SchemaField.String
              name="fileList"
              title="附件"
              x-decorator="FormItem"
              x-component="File"
              x-decorator-props={{ gridSpan: 2 }}
            />
            <SchemaField.String
              name="userNameeList"
              required
              title="评审部门"
              x-decorator="FormItem"
              x-decorator-props={{ gridSpan: 2, tooltip: '流程审批节点' }}
              x-component="Select"
              x-component-props={{ showSearch: true, mode: 'multiple' }}
              enum={session.getItem('userList')}
            />
          </SchemaField.Void>
        </SchemaField>
      </Form>
    </ConfigProvider>
  );
};
