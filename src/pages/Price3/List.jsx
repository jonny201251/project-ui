import { price3Path } from '../../utils';
import { BaseProTableProcess } from '../../components';

export default () => {
  const columns = [
    {
      title: '项目类别',
      dataIndex: 'projectType',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '合同类别',
      dataIndex: 'contractType',
      valueType: 'text',
      hideInSearch: true,
    },
    { title: '项目名称', dataIndex: 'projectName', valueType: 'text' },
    {
      title: '项目密级',
      dataIndex: 'projectLevel',
      valueType: 'text',
      hideInSearch: true,
    },
    { title: '备案号', dataIndex: 'taskCode', valueType: 'text' },
    { title: '收款合同名称', dataIndex: 'inContractName', valueType: 'text' },
    { title: '收款合同编号', dataIndex: 'inContractCode', valueType: 'text' },
    {
      title: '申请人',
      dataIndex: 'displayName',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '申请部门',
      dataIndex: 'deptName',
      valueType: 'text',
      hideInSearch: true,
    },
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
    <BaseProTableProcess path={price3Path} columns={columns} search={true} />
  );
};
