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
import React from 'react';
import { Button, ConfigProvider, message, Tabs } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { session } from '../../utils';
import zhCN from 'antd/lib/locale/zh_CN';
import styles from '../table-placeholder.less';
import DialogList from './DialogList';
import { File, LoadingButton, NumberPicker } from '../../components';
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
    Select,
    NumberPicker,
  },
});

export default (props) => {
  let { form, type, record } = props;

  const onClick = (flag) => {
    if (flag === 'open') {
      let dialog2 = FormDialog(
        { footer: null, keyboard: false, maskClosable: false, width: 950 },
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
                        let remark = '';
                        if (values.selectedRow.protectMoney) {
                          remark =
                            '立项中,' + values.selectedRow.protectMoney + '。';
                        }
                        form.setValues({
                          projectId: values.selectedRow.id,
                          type: values.selectedRow.projectType,
                          name: values.selectedRow.name,
                          taskCode: values.selectedRow.taskCode,
                          property: values.selectedRow.property,
                          deptId: values.selectedRow.deptId,
                          deptName: values.selectedRow.deptName,
                          remark: remark,
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
      <Tabs animated={false} size={'small'}>
        <Tabs.TabPane tab="表单数据" key="1">
          <Form form={form} labelWidth={110} className={styles.placeholder}>
            <SchemaField>
              <SchemaField.Void
                x-component="FormGrid"
                x-component-props={{ maxColumns: 3, strictAutoFit: true }}
              >
                <SchemaField.String
                  name="name"
                  required
                  title="项目名称"
                  x-decorator="FormItem"
                  x-component="InputButton"
                  x-component-props={{ onClick: onClick }}
                />
                <SchemaField.String
                  name="taskCode"
                  title="备案号"
                  x-decorator="FormItem"
                  x-component="Input"
                />
                <SchemaField.String
                  name="status"
                  required
                  title="项目状态"
                  x-decorator="FormItem"
                  x-component="Select"
                  x-component-props={{ showSearch: true }}
                  enum={[
                    { label: '投标中', value: '投标中' },
                    { label: '中标', value: '中标' },
                    { label: '未中标', value: '未中标' },
                    { label: '终止', value: '终止' },
                  ]}
                />
                <SchemaField.String
                  name="inName"
                  title="收款单位"
                  required
                  x-component="Input"
                  x-decorator="FormItem"
                />
                <SchemaField.String
                  name="outName"
                  title="付款单位"
                  required
                  x-component="Input"
                  x-decorator="FormItem"
                />
                <SchemaField.String
                  name="protectType"
                  required
                  title="保证金类型"
                  x-decorator="FormItem"
                  x-component="Select"
                  enum={[
                    { label: '投标', value: '投标' },
                    { label: '质量', value: '质量' },
                    { label: '工资', value: '工资' },
                    { label: '履约', value: '履约' },
                  ]}
                />
                <SchemaField.String
                  name="registeDate"
                  required
                  x-decorator="FormItem"
                  title="收付款日期"
                  x-component="DatePicker"
                  x-component-props={{ format: 'YYYY-M-D' }}
                />
                <SchemaField.String
                  name="code"
                  title="单据单号"
                  required
                  description="财务共享系统里的单据单号"
                  x-component="Input"
                  x-decorator="FormItem"
                />
                <SchemaField.Number
                  name="money"
                  required
                  x-decorator="FormItem"
                  title="金额"
                  x-component="NumberPicker"
                  x-component-props={{
                    addonAfter: '元',
                    formatter: (value) =>
                      `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                  }}
                />
                <SchemaField.String
                  name="userNameeList"
                  required
                  title="财务部"
                  x-decorator="FormItem"
                  x-component="Select"
                  x-component-props={{ showSearch: true, mode: 'multiple' }}
                  enum={session.getItem('userList')}
                />
                <SchemaField.String
                  name="payStatus"
                  required
                  title="支付状态"
                  x-decorator="FormItem"
                  x-component="Select"
                  enum={[
                    { label: '未支付', value: '未支付' },
                    { label: '已支付', value: '已支付' },
                  ]}
                />
                <SchemaField.String
                  name="realDate"
                  required
                  x-decorator="FormItem"
                  title="实际付款日期"
                  x-component="DatePicker"
                  x-component-props={{ format: 'YYYY-M-D' }}
                />
                <SchemaField.String
                  name="remark"
                  title="备注"
                  x-component="Input.TextArea"
                  x-component-props={{ rows: 3 }}
                  x-decorator="FormItem"
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
