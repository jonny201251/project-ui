import {
  DatePicker,
  Form,
  FormGrid,
  FormItem,
  FormLayout,
  Input,
} from '@formily/antd';
import { createSchemaField } from '@formily/react';
import React from 'react';
import { Button, ConfigProvider, Tabs } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import zhCN from 'antd/lib/locale/zh_CN';
import styles from '../table-placeholder.less';
import { File } from '../../components';
import ProcessDesignGraph from '../ProcessDesignGraph';
import ProcessInstNodeList from '../ProcessInstNode/List';

const InputButton = (props) => {
  return (
    <div style={{ display: 'inline-flex', width: '100%' }}>
      <Input {...props} style={{ ...props.style }} disabled />
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
    FormGrid,
    Input,
    InputButton,
    DatePicker,
    File,
  },
});

export default (props) => {
  let { form, type, record } = props;

  return (
    <ConfigProvider locale={zhCN}>
      <Tabs animated={false} size={'small'}>
        <Tabs.TabPane tab="表单数据" key="1">
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
