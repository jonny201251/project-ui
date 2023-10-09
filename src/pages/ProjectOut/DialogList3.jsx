import ProTable from '@ant-design/pro-table';

export default (props) => {
  const columns = [
    { title: '序号', dataIndex: 'id' },
    { title: '项目名称', dataIndex: 'name', valueType: 'text' },
    { title: '任务号', dataIndex: 'taskCode', valueType: 'text' },
    { title: '付款合同编号', dataIndex: 'contractCode', valueType: 'text' },
    {
      title: '付款合同金额',
      dataIndex: 'contractMoney',
      valueType: 'text',
      render: (text, record, _, action) => {
        return record.contractMoney > 0
          ? (record.contractMoney + '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          : '';
      },
    },
    { title: '成本类型', dataIndex: 'costType', valueType: 'text' },
    { title: '税率', dataIndex: 'costRate', valueType: 'text' },
    { title: '日期', dataIndex: 'outDate', valueType: 'text' },
    {
      title: '付款金额',
      dataIndex: 'money2',
      valueType: 'text',
      render: (text, record, _, action) => {
        return record.money2 > 0
          ? (record.money2 + '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          : '';
      },
    },
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
