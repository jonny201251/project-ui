import { contextPath, projectInOutPath, proTableRequest } from '../../utils';
import ProTable from '@ant-design/pro-table';
import { useRef } from 'react';
import { FormDialog } from '@formily/antd';

export default () => {
  const actionRef = useRef();

  const render = (text, record) => {
    return [
      <a
        onClick={async () => {
          let dialog = FormDialog(
            {
              style: { top: 20 },
              title: '项目收支表',
              footer: null,
              keyboard: false,
              maskClosable: false,
              width: '98%',
            },
            (form) => {
              return (
                <iframe
                  src={
                    contextPath +
                    '/jmreport/view/679927289940082688?projectId=' +
                    record.projectId
                  }
                  style={{
                    border: 0,
                    width: '100%',
                    height: document.body.clientHeight - 100,
                  }}
                  frameBorder="0"
                />
              );
            },
          );
          dialog.open({});
        }}
      >
        {'项目收支表'}
      </a>,
      <a
        onClick={async () => {
          let dialog = FormDialog(
            {
              style: { top: 20 },
              title: '收支明细表',
              footer: null,
              keyboard: false,
              maskClosable: false,
              width: '98%',
            },
            (form) => {
              return (
                <iframe
                  src={
                    contextPath +
                    '/jmreport/view/679996015666331648?projectId=' +
                    record.projectId
                  }
                  style={{
                    border: 0,
                    width: '100%',
                    height: document.body.clientHeight - 100,
                  }}
                  frameBorder="0"
                />
              );
            },
          );
          dialog.open({});
        }}
      >
        {'收支明细表'}
      </a>,
    ];
  };

  const columns = [
    { title: '项目名称', dataIndex: 'name', valueType: 'text' },
    { title: '备案号', dataIndex: 'taskCode', valueType: 'text' },
    { title: 'WBS编号', dataIndex: 'wbs', valueType: 'text' },
    { title: '客户名称', dataIndex: 'customerName', valueType: 'text' },
    { title: '收款合同编号', dataIndex: 'contractCode', valueType: 'text' },
    { title: '合同名称', dataIndex: 'contractName', valueType: 'text' },
    {
      title: '合同额',
      dataIndex: 'contractMoney',
      valueType: 'text',
      render: (text, record, _, action) => {
        return record.contractMoney > 0
          ? (record.contractMoney + '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          : '';
      },
    },
    {
      title: '操作',
      valueType: 'option',
      render: (text, record) => render(text, record),
    },
  ];

  return (
    <ProTable
      bordered
      rowKey="id"
      actionRef={actionRef}
      columns={columns}
      columnEmptyText={true}
      // pagination={{ pageSize: 1}}
      //列表数据
      params={{ list: projectInOutPath.list }}
      request={proTableRequest}
      //
      options={{ density: false }}
      search={{ span: 6 }}
    />
  );
};
