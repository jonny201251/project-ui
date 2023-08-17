import { providerBigProjectPath } from '../../utils';
import { BaseList } from '../../components';

export default (props) => {
  const columns = [
    {
      title: '项目类别',
      dataIndex: 'usee',
      valueType: 'text',
      colSize: 2,
      hideInSearch: true,
    },
    {
      title: '项目类别',
      dataIndex: 'type',
      valueType: 'text',
      colSize: 2,
      hideInSearch: true,
    },
    { title: '战略伙伴名称', dataIndex: 'name', valueType: 'text', colSize: 2 },
    {
      title: '纳税人识别号',
      dataIndex: 'code',
      valueType: 'text',
      hideInSearch: true,
    },
  ];

  return (
    <BaseList
      form={props.form}
      selectedId={props.selectedId}
      path={providerBigProjectPath}
      columns={columns}
      search={{ span: 8 }}
    />
  );
};
