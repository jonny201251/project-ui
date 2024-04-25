import { budgetProjecttPath } from '../../utils';
import ProTable from '@ant-design/pro-table';
import React, { useRef } from 'react';
import { OperateButtonProcess } from '../../components';

export default (props) => {
  const actionRef = useRef();
  const columns = [
    {
      title: '项目类别',
      dataIndex: 'projectType',
      valueType: 'text',
      valueEnum: {
        一般项目: { text: '一般项目' },
        重大项目: { text: '重大项目' },
        一般项目非: { text: '一般项目非' },
      },
    },
    {
      title: '项目名称',
      dataIndex: 'name',
      valueType: 'text',
      render: (text, record, _, action) => {
        return (
          <OperateButtonProcess
            record={record}
            path={budgetProjecttPath}
            actionRef={actionRef}
            from={'ViewHistory'}
          />
        );
      },
    },
    { title: '备案号', dataIndex: 'taskCode', valueType: 'text' },
    { title: 'WBS编号', dataIndex: 'wbs', valueType: 'text' },
    {
      title: '项目性质',
      dataIndex: 'property',
      valueType: 'text',
      valueEnum: {
        一类: { text: '一类' },
        二类: { text: '二类' },
        三类: { text: '三类' },
      },
    },
    {
      title: '预计毛利率',
      dataIndex: 'projectRate',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '成本总预算',
      dataIndex: 'totalCost',
      valueType: 'text',
      hideInSearch: true,
    },
    { title: '合同编号', dataIndex: 'contractCode', valueType: 'text' },
    {
      title: '合同金额',
      dataIndex: 'contractMoney',
      valueType: 'text',
      hideInSearch: true,
    },
    { title: '合同名称', dataIndex: 'contractName', valueType: 'text' },
    { title: '申请人', dataIndex: 'displayName', valueType: 'text' },
    { title: '部门', dataIndex: 'deptName', valueType: 'text' },
    {
      title: '申请时间',
      dataIndex: 'createDatetime',
      valueType: 'text',
      hideInSearch: true,
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
      pagination={false}
      dataSource={props.record.dataList}
      //
      tableAlertRender={false}
      options={{ density: false }}
      search={false}
    />
  );
};
