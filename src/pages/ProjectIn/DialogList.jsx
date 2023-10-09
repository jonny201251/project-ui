import { inContractPath3 } from '../../utils';
import { BaseList } from '../../components';

export default (props) => {
  const columns = [
    { title: '项目名称', dataIndex: 'name', valueType: 'text' },
    { title: '任务号', dataIndex: 'taskCode', valueType: 'text' },
    { title: 'WBS编号', dataIndex: 'wbs', valueType: 'text' },
    { title: '收款合同编号', dataIndex: 'contractCode', valueType: 'text' },
    { title: '收款合同名称', dataIndex: 'contractName', valueType: 'text' },
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
      title: '创建人',
      dataIndex: 'displayName',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '创建部门',
      dataIndex: 'deptName',
      valueType: 'text',
      hideInSearch: true,
    },
  ];

  return (
    <BaseList
      form={props.form}
      selectedId={props.selectedId}
      path={inContractPath3}
      columns={columns}
      search={{ span: 8, defaultCollapsed: false }}
    />
  );
};
