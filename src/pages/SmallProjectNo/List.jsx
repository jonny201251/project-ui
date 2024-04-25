import { smallProjectNoPath } from '../../utils';
import { BaseProTable2 } from '../../components';

export default () => {
  const columns = [
    { title: '项目名称', dataIndex: 'name', valueType: 'text', width: '20%' },
    { title: '项目密级', dataIndex: 'projectLevel', valueType: 'text' },
    { title: '备案号', dataIndex: 'taskCode', valueType: 'text' },
    {
      title: '预计毛利率',
      dataIndex: 'projectRate',
      valueType: 'text',
      hideInSearch: true,
    },
    { title: '客户名称', dataIndex: 'customerName', valueType: 'text' },
    { title: '创建人', dataIndex: 'displayName', valueType: 'text' },
    { title: '部门', dataIndex: 'deptName', valueType: 'text' },
    {
      title: '创建时间',
      dataIndex: 'createDatetime',
      valueType: 'text',
      hideInSearch: true,
    },
  ];

  return (
    <BaseProTable2
      path={smallProjectNoPath}
      columns={columns}
      search={{ span: 6 }}
    />
  );
};
