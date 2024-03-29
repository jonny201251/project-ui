import { bigBudgetOutPath } from '../../utils';
import { BaseProTable } from '../../components';

export default () => {
  const columns = [
    { title: '项目名称', dataIndex: 'name', valueType: 'text' },
    { title: '项目备案号', dataIndex: 'taskCode', valueType: 'text' },
    { title: '成本类型', dataIndex: 'costType', valueType: 'text' },
    { title: '税率', dataIndex: 'costRate', valueType: 'text' },
    { title: '公司名称', dataIndex: 'companyName', valueType: 'text' },
  ];

  return (
    <BaseProTable
      path={bigBudgetOutPath}
      columns={columns}
      rowKey={'budgetId'}
      search={true}
    />
  );
};
