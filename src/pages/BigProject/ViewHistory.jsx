import { bigProjectPath } from '../../utils';
import ProTable from '@ant-design/pro-table';
import React, { useRef } from 'react';
import { OperateButtonProcess } from '../../components';

export default (props) => {
  const actionRef = useRef();
  const columns = [
    {
      title: '项目名称',
      dataIndex: 'name',
      valueType: 'text',
      render: (text, record, _, action) => {
        return (
          <OperateButtonProcess
            record={record}
            path={bigProjectPath}
            actionRef={actionRef}
            from={'ViewHistory'}
          />
        );
      },
    },
    { title: '备案号', dataIndex: 'taskCode', valueType: 'text' },
    { title: '客户名称', dataIndex: 'customerName', valueType: 'text' },
    { title: '战略伙伴名称', dataIndex: 'providerName', valueType: 'text' },
    { title: '预计签约额', dataIndex: 'expectMoney', valueType: 'text' },
    { title: '预计签约日期', dataIndex: 'expectDate', valueType: 'text' },
    { title: '申请人', dataIndex: 'displayName', valueType: 'text' },
    { title: '部门', dataIndex: 'deptName', valueType: 'text' },
    { title: '申请时间', dataIndex: 'createDatetime', valueType: 'text' },
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
      options={false}
      search={false}
    />
  );
};
