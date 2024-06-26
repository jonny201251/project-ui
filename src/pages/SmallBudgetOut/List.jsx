import { proTableRequest, smallBudgetOutPath } from '../../utils';
import { ToolBarButton2 } from '../../components';
import ProTable from '@ant-design/pro-table';
import { useRef, useState } from 'react';
import OperateButton from '../SmallBudgetIn/OperateButton';

export default () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const actionRef = useRef();
  const columns = [
    { title: '项目名称', dataIndex: 'name', valueType: 'text' },
    { title: '备案号', dataIndex: 'taskCode', valueType: 'text' },
    { title: 'WBS编号', dataIndex: 'wbs', valueType: 'text' },
    {
      title: '成本类型',
      dataIndex: 'costType',
      valueType: 'text',
      valueEnum: {
        材料及设备费: { text: '材料及设备费' },
        劳务费: { text: '劳务费' },
        技术服务费: { text: '技术服务费' },
        工程款: { text: '工程款' },
        税费: { text: '税费' },
        投标费用: { text: '投标费用' },
        现场管理费: { text: '现场管理费' },
        证书服务费: { text: '证书服务费' },
        资金成本: { text: '资金成本' },
        交易服务费: { text: '交易服务费' },
        交通费: { text: '交通费' },
        餐费: { text: '餐费' },
        差旅费: { text: '差旅费' },
        其他: { text: '其他' },
      },
    },
    {
      title: '税率',
      dataIndex: 'costRate',
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
          path={smallBudgetOutPath}
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
      params={{ list: smallBudgetOutPath.list }}
      request={proTableRequest}
      //
      options={{ density: false }}
      //
      headerTitle={
        <ToolBarButton2
          path={smallBudgetOutPath}
          actionRef={actionRef}
          selectedRowKeys={selectedRowKeys}
          rowKey={'budgetId'}
        />
      }
    />
  );
};
