import { smallProjectPath } from '../../utils';
import { BaseList } from '../../components';

export default (props) => {
  const columns = [
    { title: '项目名称', dataIndex: 'name', valueType: 'text', colSize: 2 },
    {
      title: '备案号',
      dataIndex: 'taskCode',
      valueType: 'text',
      hideInSearch: true,
    },
  ];

  return (
    <BaseList
      form={props.form}
      selectedId={props.selectedId}
      path={smallProjectPath}
      columns={columns}
      search={{ span: 8 }}
    />
  );
};
