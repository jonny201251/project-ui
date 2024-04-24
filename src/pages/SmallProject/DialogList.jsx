import { customer3Path } from '../../utils';
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
  ];

  return (
    <BaseList
      form={props.form}
      selectedId={props.selectedId}
      path={customer3Path}
      columns={columns}
      search={{ span: 8 }}
    />
  );
};
