import ProTable from '@ant-design/pro-table';

export default (props) => {
  const columns = [
    { title: '序号', dataIndex: 'index', valueType: 'index' },
    { title: '收款合同编号', dataIndex: 'contractCode', valueType: 'text' },
    { title: '收款合同金额', dataIndex: 'contractMoney', valueType: 'text' },
    { title: '修改人', dataIndex: 'displayName', valueType: 'text' },
    { title: '修改部门', dataIndex: 'deptName', valueType: 'text' },
    { title: '修改时间', dataIndex: 'createDatetime', valueType: 'text' },
  ];

  return (
    <ProTable
      bordered
      rowKey="id"
      columns={columns}
      columnEmptyText={true}
      dataSource={props.data?.dataList}
      tableAlertRender={false}
      //
      options={false}
      search={false}
    />
  );
};
