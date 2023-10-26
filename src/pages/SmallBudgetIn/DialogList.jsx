import { smallBudgetProject2Path } from '../../utils';
import { BaseList } from '../../components';

export default (props) => {
  const columns = [
    { title: '项目名称', dataIndex: 'name', valueType: 'text' },
    { title: '备案号', dataIndex: 'taskCode', valueType: 'text' },
    {
      title: '合同金额',
      dataIndex: 'contractMoney',
      valueType: 'text',
      hideInSearch: true,
    },
    { title: '合同名称', dataIndex: 'contractName', valueType: 'text' },
  ];

  return (
    <BaseList
      form={props.form}
      selectedId={props.selectedId}
      path={smallBudgetProject2Path}
      columns={columns}
      search={{ span: 12, defaultCollapsed: false }}
    />
  );
};
