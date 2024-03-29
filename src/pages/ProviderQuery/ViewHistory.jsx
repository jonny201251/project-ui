import { providerQueryPath } from '../../utils';
import ProTable from '@ant-design/pro-table';
import React, { useRef } from 'react';
import { OperateButtonProcess } from '../../components';

export default (props) => {
  const actionRef = useRef();
  const columns = [
    { title: '项目类别', dataIndex: 'usee', valueType: 'text' },
    { title: '项目大小', dataIndex: 'type', valueType: 'text' },
    {
      title: '供方名称',
      dataIndex: 'name',
      valueType: 'text',
      render: (text, record, _, action) => {
        return (
          <OperateButtonProcess
            record={record}
            path={providerQueryPath}
            actionRef={actionRef}
            from={'ViewHistory'}
          />
        );
      },
    },
    { title: '考察时间', dataIndex: 'queryDate', valueType: 'text' },
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
