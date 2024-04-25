import { customerCheck12Path } from '../../utils';
import { BaseProTableProcess } from '../../components';

export default () => {
  const columns = [
    { title: '客户名称', dataIndex: 'customerName', valueType: 'text' },
    { title: '客户企业性质', dataIndex: 'customerName', valueType: 'text' },
    { title: '评定级别', dataIndex: 'endResult', valueType: 'text' },
    { title: '申请人', dataIndex: 'displayName', valueType: 'text' },
    { title: '部门', dataIndex: 'deptName', valueType: 'text' },
    { title: '申请时间', dataIndex: 'createDate', valueType: 'text' },
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
    },
    {
      title: '当前步骤',
      dataIndex: ['processInst', 'displayProcessStep'],
      valueType: 'text',
    },
  ];

  return (
    <BaseProTableProcess
      path={customerCheck12Path}
      columns={columns}
      search={{ span: 6 }}
    />
  );
};
