import { Button, message, Modal, Space } from 'antd';
import { get, post, session } from '../../utils';
import { FormButtonGroup, FormDialog } from '@formily/antd';
import { LoadingButton } from '../../components';
import { QuestionCircleOutlined } from '@ant-design/icons';
import React from 'react';

export default (props) => {
  const { record, path, actionRef, rowKey } = props;
  let width = path.width || 520;

  const onClick = async (type) => {
    let params = {};
    params[rowKey || 'id'] = record[rowKey || 'id'];

    if (type === 'edit') {
      const dbRecord = await get(path.get, params);
      if (dbRecord) {
        let dialog = FormDialog(
          {
            title: '编辑',
            footer: null,
            keyboard: false,
            maskClosable: false,
            width,
          },
          (form) => {
            form.setValues(dbRecord);
            return (
              <>
                <path.Form
                  form={form}
                  type={type}
                  record={dbRecord}
                  dialog={dialog}
                />
                <FormDialog.Footer>
                  <FormButtonGroup gutter={16} align={'right'}>
                    <Button onClick={() => dialog.close()}>取消</Button>
                    <LoadingButton
                      onClick={async () => {
                        const values = await form.submit();
                        if (values) {
                          values.operateButtonType = type;
                          const data = await post(path.edit, values);
                          if (data) {
                            actionRef.current.clearSelected();
                            actionRef.current.reload();
                            dialog.close();
                            message.success('编辑成功');
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
        dialog.open();
      }
    } else if (type === 'view') {
      const dbRecord = await get(path.get, params);
      if (dbRecord) {
        let dialog = FormDialog(
          {
            title: '查看',
            footer: null,
            keyboard: false,
            maskClosable: false,
            width,
          },
          (form) => {
            form.setValues(dbRecord);
            return (
              <path.Form
                form={form}
                type={type}
                record={dbRecord}
                dialog={dialog}
              />
            );
          },
        );
        dialog.open();
      }
    } else if (type === 'modify') {
      Modal.confirm({
        okText: '确认',
        cancelText: '取消',
        icon: <QuestionCircleOutlined />,
        content: <p style={{ fontSize: 16 }}>确定要 变更?</p>,
        onOk: async (close) => {
          const data = await get(path.modify, params);
          if (data) {
            actionRef.current.clearSelected();
            actionRef.current.reload();
            close();
            message.success('变更成功');
          }
        },
      });
    }
  };

  const renderButton = () => {
    let arr = [];
    const user = session.getItem('user');
    if (!record.result && user.loginName === record.loginName) {
      arr.push(
        <a
          onClick={() => {
            onClick('edit');
          }}
        >
          编辑
        </a>,
      );
    }
    arr.push(
      <a
        onClick={() => {
          onClick('view');
        }}
      >
        查看
      </a>,
    );
    if (record.version > 0) {
      arr.push(
        <a
          onClick={() => {
            onClick('viewHistory');
          }}
        >
          查看历史
        </a>,
      );
    }
    if (record.result) {
      arr.push(
        <a
          onClick={() => {
            onClick('modify');
          }}
        >
          变更
        </a>,
      );
    }

    return <Space size={'middle'}>{arr}</Space>;
  };

  return <>{renderButton()}</>;
};
