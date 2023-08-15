import { providerScorePath } from '../../utils';
import ProTable from '@ant-design/pro-table';
import React, { useRef } from 'react';
import { OperateButtonProcess } from '../../components';

export default (props) => {
  const actionRef = useRef();
  const columns = [
    { title: '项目类别', dataIndex: 'type', valueType: 'text' },
    {
      title: '供方名称',
      dataIndex: 'providerName',
      valueType: 'text',
      render: (text, record, _, action) => {
        return (
          <OperateButtonProcess
            record={record}
            path={providerScorePath}
            actionRef={actionRef}
            from={'ViewHistory'}
          />
        );
      },
    },
    { title: '初评得分', dataIndex: 'startScore', valueType: 'text' },
    { title: '最终得分', dataIndex: 'endScore', valueType: 'text' },
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
