import { proTableRequest, providerPath } from '../../utils';
import OperateButton from './OperateButton';
import { useRef, useState } from 'react';
import ProTable from '@ant-design/pro-table';
import { ToolBarButton2 } from '../../components';

export default () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const actionRef = useRef();
  const columns = [
    { title: '项目类别', dataIndex: 'usee', valueType: 'text' },
    {
      title: '项目大小',
      dataIndex: 'type',
      valueType: 'text',
      hideInSearch: true,
    },
    { title: '供方名称', dataIndex: 'name', valueType: 'text' },
    { title: '纳税人识别号', dataIndex: 'code', valueType: 'text' },
    {
      title: '得分',
      dataIndex: 'score',
      valueType: 'text',
      hideInSearch: true,
    },
    { title: '结论', dataIndex: 'result', valueType: 'text' },
    {
      title: '创建人',
      dataIndex: 'displayName',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '创建部门',
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
      title: '操作',
      valueType: 'option',
      render: (text, record, _, action) => [
        <OperateButton
          record={record}
          path={providerPath}
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
      params={{ list: providerPath.list }}
      request={proTableRequest}
      //
      options={{ density: false }}
      //
      headerTitle={
        <ToolBarButton2
          path={providerPath}
          actionRef={actionRef}
          selectedRowKeys={selectedRowKeys}
        />
      }
    />
  );
};
