import ProTable from '@ant-design/pro-table';

export default (props) => {
  const columns = [
    { title: '相似度', dataIndex: 'likeValue', valueType: 'text' },
    { title: '项目名称', dataIndex: 'projectName', valueType: 'text' },
    { title: '备案号', dataIndex: 'taskCode', valueType: 'text' },
    { title: '状态', dataIndex: 'status', valueType: 'text' },
    { title: '创建人', dataIndex: 'displayName', valueType: 'text' },
    { title: '所属部门', dataIndex: 'deptName', valueType: 'text' },
    { title: '创建时间', dataIndex: 'createDatetime', valueType: 'text' },
  ];

  return (
    <ProTable
      bordered
      rowKey="id"
      columns={columns}
      columnEmptyText={true}
      dataSource={props.data.dataList}
      tableAlertRender={false}
      //
      options={false}
      search={false}
    />
  );
};
