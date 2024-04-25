import { projectProtectPath } from '../../utils';
import { BaseProTableProcess } from '../../components';

export default () => {
  const columns = [
    {
      title: '项目立项',
      dataIndex: 'type',
      valueType: 'text',
    },
    { title: '部门', dataIndex: 'deptName', valueType: 'text' },
    { title: '项目名称', dataIndex: 'name', valueType: 'text', width: '20%' },
    { title: '备案号', dataIndex: 'taskCode', valueType: 'text' },
    { title: '项目状态', dataIndex: 'status', valueType: 'text' },
    {
      title: '收付类型',
      dataIndex: 'payType',
      valueType: 'text',
      render: (text, record, _, action) => {
        return record.inName?.indexOf('海鹰安全') > 0 ? '收' : '付';
      },
    },
    { title: '支付状态', dataIndex: 'payStatus', valueType: 'text' },
    {
      title: '金额',
      dataIndex: 'money',
      valueType: 'text',
      render: (text, record, _, action) => {
        return record?.money > 0
          ? (record?.money + '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          : '';
      },
    },
    {
      title: '流程状态',
      valueType: 'text',
      renderText: (text, record) =>
        record?.processInst ? record?.processInst.processStatus : '草稿',
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
      path={projectProtectPath}
      columns={columns}
      search={{ span: 6 }}
    />
  );
};
