import ProTable from '@ant-design/pro-table';

export default (props) => {
  const columns = [
    { title: '序号', dataIndex: 'id' },
    { title: '项目名称', dataIndex: 'name', valueType: 'text' },
    { title: '备案号', dataIndex: 'taskCode', valueType: 'text' },
    { title: '收款合同编号', dataIndex: 'contractCode', valueType: 'text' },
    {
      title: '收款合同金额',
      dataIndex: 'contractMoney',
      valueType: 'text',
      render: (text, record, _, action) => {
        return record.contractMoney > 0
          ? (record.contractMoney + '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          : '';
      },
    },
    { title: '日期', dataIndex: 'inDate', valueType: 'text' },
    { title: '开票金额', dataIndex: 'money1', valueType: 'text' },
    { title: '收款金额', dataIndex: 'money2', valueType: 'text' },
  ];

  return (
    <ProTable
      bordered
      rowKey="id"
      columns={columns}
      columnEmptyText={true}
      dataSource={props?.data?.dataList}
      tableAlertRender={false}
      //
      options={false}
      search={false}
      pagination={false}
    />
  );
};
