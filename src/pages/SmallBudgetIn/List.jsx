import { proTableRequest, smallBudgetInPath } from '../../utils';
import { ToolBarButton2 } from '../../components';
import ProTable from '@ant-design/pro-table';
import { useRef, useState } from 'react';
import OperateButton from './OperateButton';

export default () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const actionRef = useRef();

  const columns = [
    { title: '项目名称', dataIndex: 'name', valueType: 'text' },
    { title: '备案号', dataIndex: 'taskCode', valueType: 'text' },
    {
      title: '收入类型',
      dataIndex: 'inType',
      valueType: 'text',
      valueEnum: {
        项目收入: { text: '项目收入' },
        其他: { text: '其他' },
      },
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
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createDatetime',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '调整次数',
      dataIndex: 'version',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '操作',
      valueType: 'option',
      render: (text, record, _, action) => [
        <OperateButton
          record={record}
          path={smallBudgetInPath}
          actionRef={actionRef}
          rowKey={'budgetId'}
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
      params={{ list: smallBudgetInPath.list }}
      request={proTableRequest}
      //
      options={{ density: false }}
      //
      headerTitle={
        <ToolBarButton2
          path={smallBudgetInPath}
          actionRef={actionRef}
          selectedRowKeys={selectedRowKeys}
          rowKey={'budgetId'}
        />
      }
    />
  );
};
