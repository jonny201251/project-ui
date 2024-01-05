import { projectInPath } from '../../utils';
import { BaseProTable2 } from '../../components';

export default () => {
  const columns = [
    { title: '项目名称', dataIndex: 'name', valueType: 'text' },
    { title: '备案号', dataIndex: 'taskCode', valueType: 'text' },
    { title: 'WBS编号', dataIndex: 'wbs', valueType: 'text' },
    { title: '收款合同编号', dataIndex: 'contractCode', valueType: 'text' },
    { title: '收款合同名称', dataIndex: 'contractName', valueType: 'text' },
    {
      title: '收款合同金额',
      dataIndex: 'contractMoney',
      valueType: 'text',
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
      render: (text, record, _, action) => {
        return record.endMoney > 0
          ? (record.endMoney + '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          : '';
      },
    },
    {
      title: '日期',
      dataIndex: 'inDate',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '开票金额',
      dataIndex: 'money1',
      valueType: 'text',
      hideInSearch: true,
      render: (text, record, _, action) => {
        return record.money1 > 0
          ? (record.money1 + '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          : '';
      },
    },
    {
      title: '收款金额',
      dataIndex: 'money2',
      valueType: 'text',
      hideInSearch: true,
      render: (text, record, _, action) => {
        return record.money2 > 0
          ? (record.money2 + '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          : '';
      },
    },
    { title: '创建人', dataIndex: 'displayName', valueType: 'text' },
    { title: '所属部门', dataIndex: 'deptName', valueType: 'text' },
    {
      title: '创建时间',
      dataIndex: 'createDatetime',
      valueType: 'text',
      hideInSearch: true,
    },
  ];

  return (
    <BaseProTable2
      path={projectInPath}
      columns={columns}
      search={{ span: 6 }}
    />
  );
};
