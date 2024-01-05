import { customer2Path } from '../../utils';
import { BaseList } from '../../components';

export default (props) => {
  const columns = [
    { title: '客户名称', dataIndex: 'name', valueType: 'text', colSize: 2 },
    {
      title: '结论',
      dataIndex: 'result',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '创建人',
      dataIndex: 'displayName',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '所属部门',
      dataIndex: 'deptName',
      valueType: 'text',
      hideInSearch: true,
    },
  ];

  return (
    <BaseList
      form={props.form}
      selectedId={props.selectedId}
      path={customer2Path}
      columns={columns}
      search={{ span: 8 }}
    />
  );
};
