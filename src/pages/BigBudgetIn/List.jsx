import { bigBudgetInPath } from '../../utils';
import { BaseProTable } from '../../components';

export default () => {
  const columns = [
    { title: '项目名称', dataIndex: 'name', valueType: 'text' },
    { title: '项目备案号', dataIndex: 'taskCode', valueType: 'text' },
    { title: '收入类型', dataIndex: 'inType', valueType: 'text' },
  ];

  return (
    <BaseProTable
      path={bigBudgetInPath}
      columns={columns}
      rowKey={'budgetId'}
      search={true}
    />
  );
};
