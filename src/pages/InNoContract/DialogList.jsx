import { smallProjectNoPath } from '../../utils';
import { BaseList } from '../../components';

export default (props) => {
  const columns = [
    {
      title: '部门',
      dataIndex: 'deptName',
      valueType: 'text',
    },
    { title: '项目名称', dataIndex: 'name', valueType: 'text' },
    { title: '备案号', dataIndex: 'taskCode', valueType: 'text' },
    { title: '客户名称', dataIndex: 'customerName', valueType: 'text' },
  ];

  return (
    <BaseList
      form={props.form}
      selectedId={props.selectedId}
      path={smallProjectNoPath}
      columns={columns}
      search={{ span: 8, defaultCollapsed: false }}
    />
  );
};
