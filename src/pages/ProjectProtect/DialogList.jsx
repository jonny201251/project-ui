import { projectDialogPath } from '../../utils';
import { BaseList } from '../../components';

export default (props) => {
  const columns = [
    {
      title: '部门',
      dataIndex: 'deptName',
      valueType: 'text',
    },
    {
      title: '项目名称',
      dataIndex: 'name',
      valueType: 'text',
      // formItemProps: { rules: [{ required: true, message: '此项为必填项' }] },
    },
    { title: '备案号', dataIndex: 'taskCode', valueType: 'text' },
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
      title: '?保证金(函)',
      dataIndex: 'expectMoney',
      valueType: 'text',
      hideInSearch: true,
      render: (text, record, _, action) => {
        return record.expectMoney > 0
          ? (record.expectMoney + '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          : '';
      },
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
