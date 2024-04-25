import { inContractPath2 } from '../../utils';
import { BaseList } from '../../components';

export default (props) => {
  const columns = [
    {
      title: '项目类别',
      dataIndex: 'projectTypee',
      valueType: 'text',
      hideInSearch: true,
    },
    { title: '项目名称', dataIndex: 'name', valueType: 'text' },
    { title: '备案号', dataIndex: 'taskCode', valueType: 'text' },
    {
      title: 'WBS编号',
      dataIndex: 'wbs',
      valueType: 'text',
      hideInSearch: true,
    },
    { title: '收款合同编号', dataIndex: 'contractCode', valueType: 'text' },
    { title: '收款合同名称', dataIndex: 'contractName', valueType: 'text' },
    {
      title: '创建人',
      dataIndex: 'displayName',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '部门',
      dataIndex: 'deptName',
      valueType: 'text',
      hideInSearch: true,
    },
  ];

  return (
    <BaseList
      form={props.form}
      selectedId={props.selectedId}
      path={inContractPath2}
      columns={columns}
      search={{ span: 12, defaultCollapsed: false }}
    />
  );
};
