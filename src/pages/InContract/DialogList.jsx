import { budgetDialogPath } from '../../utils';
import { BaseList } from '../../components';

export default (props) => {
  const columns = [
    {
      title: '所属部门',
      dataIndex: 'deptName',
      valueType: 'text',
    },
    { title: '项目名称', dataIndex: 'name', valueType: 'text' },
    { title: '备案号', dataIndex: 'taskCode', valueType: 'text' },
    { title: 'WBS编号', dataIndex: 'wbs', valueType: 'text' },
    {
      title: '收款合同金额',
      dataIndex: 'contractMoney',
      valueType: 'text',
      hideInSearch: true,
      render: (text, record, _, action) => {
        return record.contractMoney > 0
          ? (record.contractMoney + '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          : '';
      },
    },
    {
      title: '收款合同名称',
      dataIndex: 'contractName',
      valueType: 'text',
      hideInSearch: true,
    },
  ];

  return (
    <BaseList
      form={props.form}
      selectedId={props.selectedId}
      path={budgetDialogPath}
      columns={columns}
      search={{ span: 8, defaultCollapsed: false }}
    />
  );
};
