import {
  Form,
  FormItem,
  FormLayout,
  Input,
  NumberPicker,
  Radio,
  Select,
  TreeSelect,
} from '@formily/antd';
import { createSchemaField } from '@formily/react';
import { useEffect } from 'react';
import { get, sysPermissionPath } from '../../utils';

const SchemaField = createSchemaField({
  components: {
    FormLayout,
    FormItem,
    Input,
    TreeSelect,
    Radio,
    Select,
    NumberPicker,
  },
});

export default (props) => {
  let { form, record } = props;

  useEffect(async () => {
    form.query('id').take().display = 'hidden';
    const data = await get(sysPermissionPath.getTreeSelect);
    if (data) {
      form.query('pid').take().dataSource = data;
    }
    if (record) {
      form.setValues(record);
    }
  }, []);

  return (
    <Form form={form}>
      <SchemaField>
        <SchemaField.Void
          x-component="FormLayout"
          x-component-props={{ labelCol: 6, wrapperCol: 16 }}
        >
          <SchemaField.Number
            name="id"
            x-decorator="FormItem"
            x-component="Input"
          />
          <SchemaField.String
            name="type"
            required
            title="权限类型"
            x-decorator="FormItem"
            x-component="Radio.Group"
            enum={[
              { label: '菜单', value: '菜单' },
              { label: '叶子菜单', value: '叶子菜单' },
              { label: '按钮', value: '按钮' },
            ]}
          />
          <SchemaField.Number
            name="pid"
            title="上级菜单"
            x-decorator="FormItem"
            x-component="TreeSelect"
            x-component-props={{ treeDefaultExpandAll: true }}
          />
          <SchemaField.String
            name="buttonType"
            title="按钮类型"
            x-decorator="FormItem"
            x-component="Select"
            enum={[
              { label: '新增', value: 'add' },
              { label: '编辑', value: 'edit' },
              { label: '浏览', value: 'preview' },
              { label: '删除', value: 'delete' },
            ]}
          />
          <SchemaField.String
            name="buttonPosition"
            title="按钮位置"
            x-decorator="FormItem"
            x-component="Radio.Group"
            enum={[
              { label: '工具条', value: '工具条' },
              { label: '操作', value: '操作' },
            ]}
          />
          <SchemaField.String
            name="name"
            required
            title="权限名称"
            x-decorator="FormItem"
            x-component="Input"
          />
          <SchemaField.String
            name="path"
            title="前端path"
            x-decorator="FormItem"
            x-component="Input"
          />
          <SchemaField.String
            name="icon"
            title="图标"
            x-decorator="FormItem"
            x-component="Input"
          />
          <SchemaField.Number
            name="sort"
            title="排序"
            x-decorator="FormItem"
            x-component="NumberPicker"
          />
          <SchemaField.String
            name="remark"
            title="备注"
            x-decorator="FormItem"
            x-component="Input.TextArea"
          />
        </SchemaField.Void>
      </SchemaField>
    </Form>
  );
};
