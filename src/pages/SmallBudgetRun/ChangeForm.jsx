import {
  DatePicker,
  Form,
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
import { ConfigProvider, message } from 'antd';
import { contextPath, session } from '../../utils';
import zhCN from 'antd/lib/locale/zh_CN';
import styles from '../table-placeholder.less';
import { File, InputButton, OnlyButton } from '../../components';

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
    Radio,
    OnlyButton,
  },
});

export default (props) => {
  let { form, type, record } = props;

  useEffect(async () => {
    form
      .query('*(displayName,deptName,createDatetime,taskCode,name)')
      .forEach((field) => {
        field.setPattern('disabled');
      });
    if (type === 'change') {
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

  const onClick2 = (flag) => {
    let budgetId = form.getValuesIn('id');
    let version = form.getValuesIn('version');
    if (!budgetId && !version) {
      message.error('先选择一个项目');
      return;
    }
    if (flag === 'open') {
      let dialog = FormDialog(
        {
          style: { top: 20 },
          title: '预算表',
          footer: null,
          keyboard: false,
          maskClosable: false,
          width: '98%',
        },
        (form) => {
          return (
            <iframe
              src={
                contextPath +
                '/jmreport/view/758190413062881280?budgetId=' +
                budgetId
              }
              style={{
                border: 0,
                width: '100%',
                height: document.body.clientHeight - 100,
              }}
              frameBorder="0"
            />
          );
        },
      );
      dialog.open({});
    }
  };

  const showHaveThree = () => {
    const user = session.getItem('user');
    let projectType = form.getValuesIn('projectType');
    if (projectType === '重大项目' && user.displayName === '于欣坤')
      return (
        <SchemaField.String
          name="haveThree"
          required
          title="三个审批"
          x-component="Radio.Group"
          x-decorator="FormItem"
          x-decorator-props={{
            gridSpan: 2,
            tooltip: '财务总监、总经理、董事长审批',
          }}
          enum={[
            { label: '是', value: '是' },
            { label: '否', value: '否' },
          ]}
        />
      );
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
              x-decorator-props={{ gridSpan: 3 }}
              name="comment"
              required
              title="调整说明"
              x-decorator="FormItem"
              x-component="Input.TextArea"
              x-component-props={{ rows: 2 }}
            />
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
              title="项目名称"
              x-decorator="FormItem"
              x-decorator-props={{ gridSpan: 2 }}
              x-component="Input"
            />
            <SchemaField.String
              name="taskCode"
              title="备案号"
              x-decorator="FormItem"
              x-component="Input"
            />
            <SchemaField.String
              title="预算表"
              x-decorator="FormItem"
              x-decorator-props={{ gridSpan: 2 }}
              x-component="OnlyButton"
              x-component-props={{ onClick: onClick2, name: '查看' }}
            />
            <SchemaField.String
              name="fileList"
              title="附件"
              x-decorator="FormItem"
              x-component="File"
              x-decorator-props={{ gridSpan: 2 }}
            />
            <SchemaField.String
              name="userNamee"
              required
              title="财务部"
              x-decorator="FormItem"
              x-decorator-props={{ gridSpan: 2, tooltip: '流程审批节点' }}
              x-component="Select"
              x-component-props={{ showSearch: true }}
              enum={session.getItem('userList')}
            />
            {showHaveThree()}
            <SchemaField.String
              x-decorator-props={{ gridSpan: 2 }}
              name="remark"
              title="备注"
              x-decorator="FormItem"
              x-component="Input.TextArea"
              x-component-props={{ rows: 2 }}
            />
          </SchemaField.Void>
        </SchemaField>
      </Form>
    </ConfigProvider>
  );
};
