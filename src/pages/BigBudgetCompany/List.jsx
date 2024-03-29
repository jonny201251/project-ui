import { bigBudgetCompanyPath } from '../../utils';
import { BaseProTable } from '../../components';

export default () => {
  const columns = [
    { title: '项目名称', dataIndex: 'projectName', valueType: 'text' },
    { title: '项目备案号', dataIndex: 'projectTaskCode', valueType: 'text' },
    { title: '成本类型', dataIndex: 'costType', valueType: 'text' },
    { title: '税率', dataIndex: 'costRate', valueType: 'text' },
  ];

  return (
    <BaseProTable
      path={bigBudgetCompanyPath}
      columns={columns}
      rowKey={'budgetId'}
      search={true}
    />
  );
};
