import { inContractPath3 } from '../../utils';
import { BaseList } from '../../components';

export default (props) => {
  const columns = [
    { title: '项目名称', dataIndex: 'name', valueType: 'text' },
    { title: '备案号', dataIndex: 'taskCode', valueType: 'text' },
    { title: 'WBS编号', dataIndex: 'wbs', valueType: 'text' },
    {
      title: '部门',
      dataIndex: 'deptName',
      valueType: 'text',
    },
  ];

  return (
    <BaseList
      form={props.form}
      selectedId={props.selectedId}
      path={inContractPath3}
      columns={columns}
      search={{ span: 8, defaultCollapsed: false }}
    />
  );
};
