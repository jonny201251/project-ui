import { budgetProjecttPath } from '../../utils';
import { BaseProTableProcess } from '../../components';

export default () => {
  const columns = [
    { title: '所属部门', dataIndex: 'deptName', valueType: 'text' },
    {
      title: '项目名称',
      dataIndex: 'name',
      valueType: 'text',
      width: '20%',
      fixed: true,
    },
    { title: '备案号', dataIndex: 'taskCode', valueType: 'text', width: 120 },
    { title: 'WBS编号', dataIndex: 'wbs', valueType: 'text' },
    { title: '收款合同编号', dataIndex: 'contractCode', valueType: 'text' },
    {
      title: '预计收款额',
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
      title: '预计利润率',
      dataIndex: 'projectRate',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '项目联系人',
      dataIndex: 'bb',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '完成时间',
      dataIndex: 'aa',
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
      search={{ span: 6 }}
    />
  );
};
