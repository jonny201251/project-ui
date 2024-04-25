import { proTableRequest, customerPath } from '../../utils';
import OperateButton from './OperateButton';
import { useRef, useState } from 'react';
import ProTable from '@ant-design/pro-table';
import { ToolBarButton2 } from '../../components';

export default () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const actionRef = useRef();
  const columns = [
    { title: '客户名称', dataIndex: 'name', valueType: 'text' },
    {
      title: '客户企业性质',
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
      dataIndex: 'displayName',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '部门',
      dataIndex: 'deptName',
      valueType: 'text',
    },
    {
      title: '创建时间',
      dataIndex: 'createDatetime',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '操作',
      valueType: 'option',
      render: (text, record, _, action) => [
        <OperateButton
          record={record}
          path={customerPath}
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
      params={{ list: customerPath.list }}
      request={proTableRequest}
      //
      options={{ density: false }}
      //
      headerTitle={
        <ToolBarButton2
          path={customerPath}
          actionRef={actionRef}
          selectedRowKeys={selectedRowKeys}
        />
      }
      //
      search={{ span: 6 }}
    />
  );
};
