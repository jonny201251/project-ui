import { useRef } from 'react';
import ProTable from '@ant-design/pro-table';
import {
  processInstPath,
  proTableRequest,
  smallProjectPath,
  bigProjectPath,
} from '../../utils';
import OperateButtonProcess2 from './OperateButtonProcess2';

export default () => {
  const actionRef = useRef();
  const columns = [
    { title: '类型', dataIndex: 'type', valueType: 'text' },
    {
      title: '业务名称',
      valueType: 'text',
      render: (text, record, _, action) => {
        return (
          <OperateButtonProcess2
            record={record}
            actionRef={actionRef}
            path={
              record.type === '一般项目立项' ? smallProjectPath : bigProjectPath
            }
          />
        );
      },
    },
    { title: '创建人', dataIndex: 'displayName', valueType: 'text' },
    { title: '所属部门', dataIndex: 'deptName', valueType: 'text' },
    { title: '创建时间', dataIndex: 'createDatetime', valueType: 'text' },
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
      params={{ list: processInstPath.myList2 }}
      request={proTableRequest}
      //
      tableAlertRender={false}
      options={false}
      search={false}
      //
      headerTitle="补充授权号"
    />
  );
};
