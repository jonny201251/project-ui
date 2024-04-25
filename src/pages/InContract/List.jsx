import { inContractPath, proTableRequest } from '../../utils';
import { OperateButton } from '../../components';
import ProTable from '@ant-design/pro-table';
import ToolBarButton from './ToolBarButton';
import { useRef } from 'react';

export default () => {
  const actionRef = useRef();

  const columns = [
    {
      title: '项目类别',
      dataIndex: 'projectTypee',
      valueType: 'text',
      hideInSearch: true,
    },
    { title: '部门', dataIndex: 'deptName', valueType: 'text' },
    { title: '备案号', dataIndex: 'taskCode', valueType: 'text' },
    { title: 'WBS编号', dataIndex: 'wbs', valueType: 'text' },
    { title: '收款合同编号', dataIndex: 'contractCode', valueType: 'text' },
    { title: '收款合同名称', dataIndex: 'contractName', valueType: 'text' },
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
    {
      title: '结算/决算额',
      dataIndex: 'endMoney',
      valueType: 'text',
      hideInSearch: true,
      render: (text, record, _, action) => {
        return record.endMoney > 0
          ? (record.endMoney + '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          : '';
      },
    },
    {
      title: '操作',
      valueType: 'option',
      render: (text, record, _, action) => [
        <OperateButton
          record={record}
          path={inContractPath}
          actionRef={actionRef}
        />,
      ],
    },
  ];

  return (
    <ProTable
      bordered
      rowKey="id"
      actionRef={actionRef}
      columns={columns}
      columnEmptyText={true}
      //列表数据
      params={{ list: inContractPath.list }}
      request={proTableRequest}
      //
      options={{ density: false }}
      //
      headerTitle={
        <ToolBarButton path={inContractPath} actionRef={actionRef} />
      }
      //
      search={{ span: 6 }}
    />
  );
};
