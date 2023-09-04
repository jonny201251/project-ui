import React from 'react';
import { Button, message, Space } from 'antd';
import { post, session } from '../utils';
import { LoadingButton } from '../components';
import { FileExcelOutlined, PlusOutlined } from '@ant-design/icons';
import { FormButtonGroup, FormDialog } from '@formily/antd';

export default (props) => {
  const { path, actionRef, selectedRowKeys } = props;
  let width = path.width || 520;

  const onClick = async (type) => {
    if (type === 'add') {
      let dialog = FormDialog(
        {
          title: '新增',
          footer: null,
          keyboard: false,
          maskClosable: false,
          width,
        },
        (form) => {
          return (
            <>
              <path.Form form={form} type={type} dialog={dialog} />
              <FormDialog.Footer>
                <FormButtonGroup gutter={16} align={'right'}>
                  <Button onClick={() => dialog.close()}>取消</Button>
                  <LoadingButton
                    onClick={async () => {
                      const values = await form.submit();
                      if (values) {
                        const data = await post(path.add, values);
                        if (data) {
                          actionRef.current.clearSelected();
                          actionRef.current.reload();
                          dialog.close();
                          message.success('保存成功');
                        }
                      }
                    }}
                    type={'primary'}
                  >
                    确定
                  </LoadingButton>
                </FormButtonGroup>
              </FormDialog.Footer>
            </>
          );
        },
      );
      dialog.open({});
    } else if (type === 'export') {
      window.location.href = path.export;
      return;
    }
  };

  const renderButton = () => {
    let arr = [];

    arr.push(
      <Button
        icon={<PlusOutlined />}
        type="primary"
        onClick={() => {
          onClick('add');
        }}
      >
        新增
      </Button>,
    );
    const user = session.getItem('user');
    if (
      (user.loginName === '孙欢' && path.flag === 'providerPath') ||
      (user.loginName === '宋思奇' && path.flag === 'customerPath')
    ) {
      arr.push(
        <Button
          icon={<FileExcelOutlined />}
          type="primary"
          onClick={() => {
            onClick('export');
          }}
        >
          导出
        </Button>,
      );
    }

    return <Space size={'middle'}>{arr}</Space>;
  };

  return <>{renderButton()}</>;
};
