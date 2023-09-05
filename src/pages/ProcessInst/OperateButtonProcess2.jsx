import { Button, message, Modal } from 'antd';
import * as utils from '../../utils';
import { get, post, processDesignPath } from '../../utils';
import { FormButtonGroup, FormDialog } from '@formily/antd';
import { LoadingButton } from '../../components';
import React from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';

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
            title: '补充授权号',
            footer: null,
            keyboard: false,
            maskClosable: false,
            width,
          },
          (form) => {
            form.setValues(dbRecord);
            return (
              <>
                <path.CheckForm
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
                          const data = await post(path.edit, values);
                          if (data) {
                            actionRef.current.clearSelected();
                            actionRef.current.reload();
                            dialog.close();
                            message.success('操作成功');
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
    }
  };

  return (
    <a
      onClick={() => {
        onClick('edit');
      }}
    >
      {record.name}
    </a>
  );
};
