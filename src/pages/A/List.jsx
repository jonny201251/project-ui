import { BaseProTable } from '../../components';
import { aPath } from '../../utils';

export default () => {
  let columns = [
    { title: '类别', dataIndex: 'type', valueType: 'text' },
    { title: '名称', dataIndex: 'name', valueType: 'text' },
    { title: '排序', dataIndex: 'sort', valueType: 'text' },
  ];

  return (
    <BaseProTable
      path={aPath}
      columns={columns}
      width={1000}
      search={{ span: 6 }}
    />
  );
};
