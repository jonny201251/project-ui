import { useRef, useState } from 'react';
import ProTable from '@ant-design/pro-table';
import { proTableRequest, projectCodePath } from '../../utils';
import OperateButton from './OperateButton';
import ToolBarButton from './ToolBarButton';

export default () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const actionRef = useRef();
  const columns = [
    {
      title: '项目名称',
      dataIndex: 'projectName',
      valueType: 'text',
      width: '30%',
    },
    { title: '备案号', dataIndex: 'taskCode', valueType: 'text' },
    { title: '状态', dataIndex: 'status', valueType: 'text' },
    {
      title: '项目金额',
      dataIndex: 'projectMoney',
      valueType: 'text',
      render: (text, record, _, action) => {
        return record.projectMoney > 0
          ? (record.projectMoney + '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          : '';
      },
    },
    { title: '创建人', dataIndex: 'displayName', valueType: 'text' },
    { title: '创建部门', dataIndex: 'deptName', valueType: 'text' },
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
          path={projectCodePath}
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
      params={{ list: projectCodePath.list }}
      request={proTableRequest}
      //
      options={{ density: false }}
      //
      headerTitle={
        <ToolBarButton
          path={projectCodePath}
          actionRef={actionRef}
          selectedRowKeys={selectedRowKeys}
        />
      }
    />
  );
};
