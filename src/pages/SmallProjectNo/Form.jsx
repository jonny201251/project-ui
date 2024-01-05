import {
  ArrayTable,
  Checkbox,
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
import { Button, ConfigProvider, Divider, message } from 'antd';
import { get, projectCodePath, session } from '../../utils';
import {
  ArrayTableAddition,
  ArrayTableIndex,
  ArrayTableRemove,
  LoadingButton,
  MyCard,
  NumberPicker,
} from '../../components';
import styles from '../table-placeholder.less';
import { onFieldReact } from '@formily/core';
import { SearchOutlined } from '@ant-design/icons';
import DialogList4 from '../SmallProject/DialogList4';

const InputButton4 = (props) => {
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
    FormItem,
    FormLayout,
    Input,
    DatePicker,
    Radio,
    FormGrid,
    NumberPicker,
    Checkbox,
    Select,
    ArrayTable,
    ArrayTableIndex,
    ArrayTableRemove,
    ArrayTableAddition,
    MyCard,
    Divider,
    InputButton4,
  },
});

export default (props) => {
  let { form, type } = props;

  useEffect(async () => {
    form
      .query('*(displayName,deptName,createDatetime,wbs)')
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
        flag: '新',
      });
    }
  }, []);

  const onClick4 = (flag) => {
    if (type === 'edit') {
      message.error('编辑时不允许重新选择备案号');
      return;
    }
    if (flag === 'open') {
      let dialog2 = FormDialog(
        { footer: null, keyboard: false, maskClosable: false, width: 1000 },
        (form2) => {
          return (
            <>
              <DialogList4
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
                          taskCode: values.selectedRow.taskCode,
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
      <Form form={form} labelWidth={100} className={styles.placeholder}>
        <SchemaField>
          <SchemaField.Void
            x-component="FormGrid"
            x-component-props={{ maxColumns: 3, strictAutoFit: true }}
          >
            <SchemaField.String
              name="displayName"
              title="创建人"
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
              title="创建时间"
              x-decorator="FormItem"
              x-component="Input"
            />
          </SchemaField.Void>
          <SchemaField.Void
            x-component="FormGrid"
            x-component-props={{ maxColumns: 3, strictAutoFit: true }}
          >
            <SchemaField.String
              name="name"
              required
              title="项目名称"
              x-decorator="FormItem"
              x-component="Input"
              x-decorator-props={{ gridSpan: 2 }}
            />
            <SchemaField.String
              name="taskCode"
              required
              title="备案号"
              x-decorator="FormItem"
              x-component="InputButton4"
              x-component-props={{ onClick: onClick4 }}
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
              name="projectTypee"
              required
              title="项目类型"
              x-decorator="FormItem"
              x-component="Select"
              enum={[
                { label: '消防工程', value: '消防工程' },
                { label: '智能化工程', value: '智能化工程' },
                { label: '机电工程', value: '机电工程' },
                { label: '通风空调工程', value: '通风空调工程' },
                { label: '其他', value: '其他' },
              ]}
            />
            <SchemaField.String
              name="projectRate"
              required
              title="项目毛利率"
              x-decorator="FormItem"
              x-component="Input"
              x-component-props={{ placeholder: '示例：3%' }}
            />
            {/*          <SchemaField.String
            name="projectStatus" title="项目状态" x-decorator="FormItem"
            x-component="Select" x-component-props={{ showSearch: true }}
            enum={[
              { label: '投标中', value: '投标中' },
              { label: '中标', value: '中标' },
              { label: '未中标', value: '未中标' },
              { label: '终止', value: '终止' },
            ]}/>*/}
          </SchemaField.Void>
          <SchemaField.Void
            x-component="FormGrid"
            x-component-props={{ maxColumns: 3, strictAutoFit: true }}
          >
            <SchemaField.String
              name="location"
              required
              title="项目地点"
              x-decorator="FormItem"
              x-component="Input"
              x-decorator-props={{ gridSpan: 2 }}
            />
          </SchemaField.Void>
          <SchemaField.Void
            x-component="FormGrid"
            x-component-props={{ maxColumns: 3, strictAutoFit: true }}
          >
            <SchemaField.String
              name="remark"
              title="备注"
              x-component="Input.TextArea"
              x-decorator-props={{ gridSpan: 2 }}
              x-component-props={{ rows: 2 }}
              x-decorator="FormItem"
            />
          </SchemaField.Void>
        </SchemaField>
      </Form>
    </ConfigProvider>
  );
};
