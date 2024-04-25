import {
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
import React, { useEffect } from 'react';
import zhCN from 'antd/lib/locale/zh_CN';
import { Button, ConfigProvider, message, Tabs } from 'antd';
import { session, contextPath } from '../../utils';
import DialogList from './DialogList';
import { LoadingButton, File } from '../../components';
import { onFieldReact } from '@formily/core';
import ProcessDesignGraph from '../ProcessDesignGraph';
import ProcessInstNodeList from '../ProcessInstNode/List';

const SchemaField = createSchemaField({
  components: {
    FormItem,
    FormLayout,
    Input,
    DatePicker,
    Radio,
    FormGrid,
    Select,
    File,
  },
});

export default (props) => {
  let { form, record, type, haveEditForm } = props;

  useEffect(async () => {
    if (haveEditForm === '否') {
      form.setPattern('disabled');
      form.query('comment').take()?.setPattern('editable');
    }

    const user = session.getItem('user');

    if (record?.code || user.displayName === '祁瑛') {
      form.query('code').take().setDisplay('visible');
    } else {
      form.query('code').take().setDisplay('hidden');
    }
    form
      .query('*(displayName,deptName,createDatetime,deptNamee)')
      .forEach((field) => {
        field.setPattern('disabled');
      });
    if (type === 'add') {
      form.setInitialValues({
        createDatetime: new Date().Format('yyyy-MM-dd hh:mm:ss'),
        displayName: user.displayName,
        displayNamee: user.displayName,
        loginName: user.loginName,
        deptId: user.deptId,
        deptName: user.deptName,
        // fileList: [{ name: '法定代表人授权委托书-模板.doc', status: 'done', url: contextPath + '/upload/法定代表人授权委托书-模板.doc' }],
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
                          projectId: values.selectedRow.id,
                          projectName: values.selectedRow.name,
                          ProjectProperty: values.selectedRow.property,
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

  form.addEffects('id', () => {
    onFieldReact('displayNamee', (field) => {
      let value = field.value;
      if (value) {
        const userMap = session.getItem('userMap');
        const user = userMap[value];
        if (user) {
          form.setValues({ deptIdd: user.deptId, deptNamee: user.deptName });
        }
      }
    });
  });

  const showComment = () => {
    if (type === 'check') {
      return (
        <SchemaField.Void
          x-component="FormGrid"
          x-component-props={{ maxColumns: 2, strictAutoFit: true }}
        >
          <SchemaField.String
            name="comment"
            title="审批意见"
            x-decorator="FormItem"
            x-component="Input.TextArea"
            x-component-props={{ placeholder: '请输入意见' }}
          />
        </SchemaField.Void>
      );
    }
  };

  return (
    <ConfigProvider locale={zhCN}>
      <Tabs animated={false} size={'small'}>
        <Tabs.TabPane tab="表单数据" key="1">
          <Form form={form} labelWidth={130}>
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
                  name="displayNamee"
                  required
                  title="被授权人"
                  x-decorator="FormItem"
                  x-component="Input"
                />
                <SchemaField.String
                  name="deptNamee"
                  title="所在部门"
                  x-decorator="FormItem"
                  x-component="Input"
                />
                <SchemaField.String
                  name="job"
                  required
                  title="职务"
                  x-decorator="FormItem"
                  x-component="Input"
                />
                <SchemaField.String
                  name="descc"
                  required
                  title="申请事项及权限"
                  x-component="Input.TextArea"
                  x-component-props={{ rows: 4 }}
                  x-decorator="FormItem"
                  x-decorator-props={{ gridSpan: 2 }}
                />
                <SchemaField.String
                  name="timeLimitTmp"
                  required
                  title="申请期限"
                  x-component="DatePicker.RangePicker"
                  // x-component-props={{ format: 'YYYY年MM月DD日' }}
                  x-decorator="FormItem"
                  x-decorator-props={{
                    tooltip: '双击鼠标进行选择',
                    gridSpan: 2,
                  }}
                />
                <SchemaField.String
                  name="code"
                  title="授权号"
                  x-component="Input"
                  x-decorator="FormItem"
                />
              </SchemaField.Void>
              <SchemaField.Void
                x-component="FormGrid"
                x-component-props={{ maxColumns: 3, strictAutoFit: true }}
              >
                <SchemaField.String
                  name="fileList"
                  required
                  title="授权委托书"
                  x-decorator="FormItem"
                  x-component="File"
                />
              </SchemaField.Void>
              {showComment()}
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
};
