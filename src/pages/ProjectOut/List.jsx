import { projectOutPath } from '../../utils';
import { BaseProTableProcess } from '../../components';

export default () => {
  const columns = [
    { title: '部门', dataIndex: 'deptName', valueType: 'text' },
    { title: '项目名称', dataIndex: 'name', valueType: 'text' },
    { title: '备案号', dataIndex: 'taskCode', valueType: 'text' },
    { title: 'WBS编号', dataIndex: 'wbs', valueType: 'text' },
    { title: '付款合同编号', dataIndex: 'contractCode', valueType: 'text' },
    { title: '供方名称', dataIndex: 'providerName', valueType: 'text' },
    { title: '成本类型', dataIndex: 'costType', valueType: 'text' },
    {
      title: '税率',
      dataIndex: 'costRate',
      valueType: 'text',
      hideInSearch: true,
    },

    {
      title: '申请付款日期',
      dataIndex: 'outDate',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '发票金额',
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
      title: '付款金额',
      dataIndex: 'money2',
      valueType: 'text',
      hideInSearch: true,
      render: (text, record, _, action) => {
        return record.money2 > 0
          ? (record.money2 + '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          : '';
      },
    },
    {
      title: '流程状态',
      valueType: 'text',
      renderText: (text, record) =>
        record.processInst ? record.processInst.processStatus : '草稿',
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
      path={projectOutPath}
      columns={columns}
      search={{ span: 6 }}
    />
  );
};
