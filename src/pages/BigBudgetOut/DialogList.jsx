import { bigBudgetCompanyDialogPath } from '../../utils';
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
    {
      title: '成本类型',
      dataIndex: 'costType',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '税率',
      dataIndex: 'costRate',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '公司名称',
      dataIndex: 'companyName',
      valueType: 'text',
      hideInSearch: true,
    },
  ];

  return (
    <BaseList
      form={props.form}
      selectedId={props.selectedId}
      path={bigBudgetCompanyDialogPath}
      columns={columns}
      search={{ span: 8 }}
    />
  );
};
