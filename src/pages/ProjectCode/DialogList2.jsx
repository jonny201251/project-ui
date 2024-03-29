import { providerCodePath } from '../../utils';
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
      title: '项目大小',
      dataIndex: 'type',
      valueType: 'text',
      colSize: 2,
      hideInSearch: true,
    },
    { title: '供方名称', dataIndex: 'name', valueType: 'text', colSize: 2 },
    {
      title: '供方企业性质',
      dataIndex: 'property',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '结论',
      dataIndex: 'result',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '创建人',
      dataIndex: 'loginName',
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
      search={{ span: 8 }}
    />
  );
};
