import { providerCodePath } from '../../utils';
import { BaseList } from '../../components';

export default (props) => {
  const columns = [
    { title: '项目类别', dataIndex: 'usee', valueType: 'text' },
    { title: '项目大小', dataIndex: 'type', valueType: 'text' },
    { title: '供方名称', dataIndex: 'name', valueType: 'text' },
    { title: '纳税人识别号', dataIndex: 'code', valueType: 'text' },
    {
      title: '结论',
      dataIndex: 'result',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '创建人',
      dataIndex: 'displayName',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '创建部门',
      dataIndex: 'deptName',
      valueType: 'text',
      hideInSearch: true,
    },
  ];

  return (
    <BaseList
      form={props.form}
      selectedId={props.selectedId}
      path={providerCodePath}
      columns={columns}
      search={{ span: 12, defaultCollapsed: false }}
    />
  );
};
