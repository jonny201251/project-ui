import { outContractPath } from '../../utils';
import { BaseProTable2 } from '../../components';

export default () => {
  const columns = [
    { title: '部门', dataIndex: 'deptName', valueType: 'text' },
    { title: '项目名称', dataIndex: 'name', valueType: 'text' },
    { title: '备案号', dataIndex: 'taskCode', valueType: 'text' },
    { title: 'WBS编号', dataIndex: 'wbs', valueType: 'text' },
    { title: '付款合同名称', dataIndex: 'contractName', valueType: 'text' },
    { title: '付款合同编号', dataIndex: 'contractCode', valueType: 'text' },
    {
      title: '付款合同金额',
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
      title: '结算金额',
      dataIndex: 'endMoney',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '税率',
      dataIndex: 'costRate',
      valueType: 'text',
      hideInSearch: true,
    },
    { title: '成本类型', dataIndex: 'costType', valueType: 'text' },
  ];

  return (
    <BaseProTable2
      path={outContractPath}
      columns={columns}
      search={{ span: 6 }}
    />
  );
};
