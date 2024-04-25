import { inNoContractPath } from '../../utils';
import { BaseProTable2 } from '../../components';
import { useRef } from 'react';

export default () => {
  const actionRef = useRef();

  const columns = [
    { title: '部门', dataIndex: 'deptName', valueType: 'text' },
    { title: '项目名称', dataIndex: 'name', valueType: 'text' },
    { title: '备案号', dataIndex: 'taskCode', valueType: 'text' },
    {
      title: '收款合同金额',
      dataIndex: 'contractMoney',
      valueType: 'text',
      hideInSearch: true,
      render: (text, record, _, action) => {
        return record.contractMoney > 0
          ? (record.contractMoney + '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          : '';
      },
    },
    { title: '客户名称', dataIndex: 'customerName', valueType: 'text' },
  ];

  return (
    <BaseProTable2
      path={inNoContractPath}
      columns={columns}
      search={{ span: 6 }}
    />
  );
};
