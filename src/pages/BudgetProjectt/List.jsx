import { budgetProjecttPath } from '../../utils';
import { BaseProTableProcess } from '../../components';

export default () => {
  const columns = [
    {
      title: '项目立项',
      dataIndex: 'projectType',
      valueType: 'text',
      hideInSearch: true,
      valueEnum: {
        一般项目: { text: '一般项目' },
        重大项目: { text: '重大项目' },
        一般项目非: { text: '一般项目非' },
      },
    },
    {
      title: '项目名称',
      dataIndex: 'name',
      valueType: 'text',
      width: '20%',
      fixed: true,
    },
    { title: '备案号', dataIndex: 'taskCode', valueType: 'text', width: 120 },
    { title: 'WBS编号', dataIndex: 'wbs', valueType: 'text' },
    {
      title: '预计毛利率',
      dataIndex: 'projectRate',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '成本总预算',
      dataIndex: 'totalCost',
      valueType: 'text',
      hideInSearch: true,
      render: (text, record, _, action) => {
        return record.totalCost > 0
          ? (record.totalCost + '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          : '';
      },
    },
    { title: '合同编号', dataIndex: 'contractCode', valueType: 'text' },
    {
      title: '合同金额',
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
      title: '合同名称',
      dataIndex: 'contractName',
      valueType: 'text',
      ellipsis: true,
    },
    { title: '申请人', dataIndex: 'displayName', valueType: 'text' },
    { title: '申请部门', dataIndex: 'deptName', valueType: 'text' },
    {
      title: '申请时间',
      dataIndex: 'createDatetime',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '流程状态',
      valueType: 'text',
      renderText: (text, record) =>
        record.processInst
          ? record.processInst.processStatus
          : record.processInstId === 0
          ? '完成'
          : '草稿',
      valueEnum: {
        草稿: { text: '草稿', status: 'Default' },
        审批中: { text: '审批中', status: 'Processing' },
        完成: { text: '完成', status: 'Success' },
        退回: { text: '退回', status: 'Error' },
        退回申请人: { text: '退回申请人', status: 'Error' },
        申请人撤回: { text: '申请人撤回', status: 'Error' },
      },
      hideInSearch: true,
    },
    {
      title: '当前步骤',
      dataIndex: ['processInst', 'displayProcessStep'],
      valueType: 'text',
      hideInSearch: true,
    },
  ];

  return (
    <BaseProTableProcess
      path={budgetProjecttPath}
      columns={columns}
      search={true}
    />
  );
};
