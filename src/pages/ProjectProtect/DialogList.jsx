import { projectDialogPath } from '../../utils';
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
      title: '预计签约金额',
      dataIndex: 'expectMoney',
      valueType: 'text',
      hideInSearch: true,
      render: (text, record, _, action) => {
        return record.expectMoney > 0
          ? (record.expectMoney + '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          : '';
      },
    },
    {
      title: '申请人',
      dataIndex: 'loginName',
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
  ];

  return (
    <BaseList
      form={props.form}
      selectedId={props.selectedId}
      path={projectDialogPath}
      columns={columns}
      search={{ span: 12, defaultCollapsed: false }}
      rowKey={'idd'}
    />
  );
};
