import { projectIoPath } from '../../utils';
import { BaseProTable2 } from '../../components';

export default () => {
  const columns = [
    { title: '项目名称', dataIndex: 'name', valueType: 'text' },
    { title: '备案号', dataIndex: 'taskCode', valueType: 'text' },
    { title: 'WBS编号', dataIndex: 'wbs', valueType: 'text' },
    { title: '往来类型', dataIndex: 'type2', valueType: 'text' },
    {
      title: '影响收支',
      dataIndex: 'haveInOut',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '日期',
      dataIndex: 'ioDate',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '往来款',
      dataIndex: 'money',
      valueType: 'text',
      hideInSearch: true,
    },
    { title: '创建人', dataIndex: 'displayName', valueType: 'text' },
    { title: '创建部门', dataIndex: 'deptName', valueType: 'text' },
    {
      title: '创建时间',
      dataIndex: 'createDatetime',
      valueType: 'text',
      hideInSearch: true,
    },
  ];

  return <BaseProTable2 path={projectIoPath} columns={columns} search={true} />;
};
