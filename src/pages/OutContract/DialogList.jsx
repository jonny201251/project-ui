import { budgetDialog2Path } from '../../utils';
import { BaseList } from '../../components';

export default (props) => {
  const columns = [
    {
      title: '项目立项',
      dataIndex: 'projectType',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '项目名称',
      dataIndex: 'name',
      valueType: 'text',
      formItemProps: { rules: [{ required: true, message: '此项为必填项' }] },
    },
    { title: '任务号', dataIndex: 'taskCode', valueType: 'text' },
    {
      title: '成本类型',
      dataIndex: 'outType',
      valueType: 'text',
      hideInSearch: true,
      // valueEnum: { 材料及设备费: { text: '材料及设备费' }, 劳务费: { text: '劳务费' }, 技术服务费: { text: '技术服务费' }, 工程款: { text: '工程款' } },
    },
    { title: '税率', dataIndex: 'rate', valueType: 'text', hideInSearch: true },
    {
      title: '金额',
      dataIndex: 'money',
      valueType: 'text',
      hideInSearch: true,
      render: (text, record, _, action) => {
        return record.money > 0
          ? (record.money + '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          : '';
      },
    },
    {
      title: '创建部门',
      dataIndex: 'deptName',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '创建人',
      dataIndex: 'displayName',
      valueType: 'text',
      hideInSearch: true,
    },
  ];

  return (
    <BaseList
      rowKey={'outId'}
      form={props.form}
      selectedId={props.selectedId}
      path={budgetDialog2Path}
      columns={columns}
      search={{ span: 12, defaultCollapsed: false }}
    />
  );
};
