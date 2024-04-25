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
import { File, InputButton, LoadingButton } from '../../components';

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
      .query('*(displayName,deptName,createDatetime,usee,type)')
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
                          providerId: values.selectedRow.id,
                          usee: values.selectedRow.usee,
                          type: values.selectedRow.type,
                          name: values.selectedRow.name,
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
      <Form form={form} labelWidth={125} className={styles.placeholder}>
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
              name="name"
              required
              title="供方名称"
              x-decorator="FormItem"
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
              name="type"
              title="项目大小"
              x-decorator="FormItem"
              x-component="Input"
            />
            <SchemaField.String
              name="userName"
              required
              title="联系人姓名"
              x-decorator="FormItem"
              x-component="Input"
            />
            <SchemaField.String
              name="tel"
              required
              title="电话"
              x-decorator="FormItem"
              x-component="Input"
            />
            <SchemaField.String
              name="desc1"
              required
              title="情况概述"
              x-decorator="FormItem"
              x-component="Input.TextArea"
              x-component-props={{
                rows: 3,
                placeholder: '与本公司合作项目及合同执行情况概述',
              }}
              x-decorator-props={{ gridSpan: 3 }}
            />
            <SchemaField.String
              name="codeMoney"
              required
              title="合同编号及金额"
              x-decorator="FormItem"
              x-component="Input"
              x-decorator-props={{ gridSpan: 3 }}
            />
            <SchemaField.String
              name="desc2"
              required
              title="资格取消原因"
              x-decorator="FormItem"
              x-component="Input.TextArea"
              x-component-props={{
                rows: 3,
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
          </SchemaField.Void>
        </SchemaField>
      </Form>
    </ConfigProvider>
  );
};
