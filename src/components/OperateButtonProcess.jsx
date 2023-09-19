import { message, Modal, Space } from 'antd';
import {
  contextPath,
  get,
  pdfPost,
  post,
  processDesignPath,
  session,
} from '../utils';
import { FormButtonGroup, FormDialog } from '@formily/antd';
import { LoadingButton } from './index';
import { QuestionCircleOutlined } from '@ant-design/icons';

export default (props) => {
  const { record, path, actionRef, rowKey, from } = props;
  let width = path.width || 520;

  const formButton = (buttonList, haveEditForm, dialog, form, type) => {
    let btnArr = [];
    buttonList.forEach((buttonName) => {
      btnArr.push(
        <LoadingButton
          onClick={async () => {
            const formValue = await form.submit();
            if (formValue) {
              let values = {
                formValue,
                buttonName,
                type,
                path: path.flag,
                haveEditForm,
                comment: formValue.comment,
              };
              const data = await post(path.btnHandle, values);
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
          {buttonName.replace(/\w+_/i, '')}
        </LoadingButton>,
      );
    });
    return btnArr;
  };

  const onClick = async (type) => {
    let params = {};
    params[rowKey || 'id'] = record[rowKey || 'id'];

    if (type === 'edit') {
      const dbRecord = await get(path.get, params);
      const processFormBefore = await post(
        processDesignPath.getProcessFormBefore,
        { path: path.flag, type },
      );
      if (dbRecord && processFormBefore) {
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
                <path.EditForm
                  form={form}
                  type={type}
                  record={dbRecord}
                  dialog={dialog}
                />
                <FormDialog.Footer>
                  <FormButtonGroup gutter={16} align={'center'}>
                    {formButton(
                      processFormBefore.buttonList,
                      processFormBefore.haveEditForm,
                      dialog,
                      form,
                      type,
                    )}
                  </FormButtonGroup>
                </FormDialog.Footer>
              </>
            );
          },
        );
        dialog.open();
      }
    } else if (type === 'change') {
      params['type'] = 'change';
      const dbRecord = await get(path.get, params);
      const processFormBefore = await post(
        processDesignPath.getProcessFormBefore,
        { path: path.flag, type },
      );
      if (dbRecord && processFormBefore) {
        let dialog = FormDialog(
          {
            title: path.changeButtonName || '变更',
            footer: null,
            keyboard: false,
            maskClosable: false,
            width,
          },
          (form) => {
            form.setValues(dbRecord);
            return (
              <>
                <path.ChangeForm
                  form={form}
                  type={type}
                  record={dbRecord}
                  dialog={dialog}
                />
                <FormDialog.Footer>
                  <FormButtonGroup gutter={16} align={'center'}>
                    {formButton(
                      processFormBefore.buttonList,
                      processFormBefore.haveEditForm,
                      dialog,
                      form,
                      type,
                    )}
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
              <path.ViewForm
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
    } else if (type === 'viewHistory') {
      const dbRecord = await post(path.viewHistory, {
        path: path.flag,
        businessBaseId: record.processInst.businessBaseId,
      });
      if (dbRecord) {
        let dialog = FormDialog(
          {
            title: '历史数据',
            footer: null,
            keyboard: false,
            maskClosable: false,
            width,
          },
          (form) => {
            return <path.ViewHistory record={dbRecord} path={path} />;
          },
        );
        dialog.open();
      }
    } else if (type === 'recall') {
      Modal.error({
        okText: '确定',
        closable: true,
        width: 450,
        icon: <QuestionCircleOutlined />,
        content: (
          <p style={{ fontSize: 16 }}>
            {' '}
            确定要撤回-{record.processInst.businessName}
          </p>
        ),
        onOk: async (close) => {
          let values = {
            formValue: record,
            buttonName: '申请人撤回',
            type,
            path: path.flag,
          };
          const data = await post(path.btnHandle, values);
          if (data) {
            actionRef.current.clearSelected();
            actionRef.current.reload();
            close();
            message.success('撤回成功');
          }
        },
      });
    } else if (type === 'delete') {
      let content = '确定要删除';
      if (record?.processInst?.businessName) {
        content = content + '-' + record?.processInst?.businessName;
      }
      Modal.error({
        okText: '确定',
        closable: true,
        width: 450,
        icon: <QuestionCircleOutlined />,
        content: <p style={{ fontSize: 16 }}>{content}</p>,
        onOk: async (close) => {
          let values = {
            formValue: record,
            buttonName: '申请人删除',
            type,
            path: path.flag,
          };
          const data = await post(path.btnHandle, values);
          if (data) {
            actionRef.current.clearSelected();
            actionRef.current.reload();
            close();
            message.success('删除成功');
          }
        },
      });
    } else if (type === 'viewBudget') {
      FormDialog(
        {
          style: { top: 20 },
          title: '预算表',
          footer: null,
          keyboard: false,
          maskClosable: false,
          width: '98%',
        },
        (form) => {
          if (record.version === 0) {
            return (
              <iframe
                src={
                  contextPath +
                  '/jmreport/view/704922619257352192?budgetId=' +
                  record.id
                }
                style={{
                  border: 0,
                  width: '100%',
                  height: document.body.clientHeight - 100,
                }}
                frameBorder="0"
              />
            );
          } else {
            return (
              <iframe
                src={
                  contextPath +
                  '/jmreport/view/758190413062881280?budgetId=' +
                  record.id
                }
                style={{
                  border: 0,
                  width: '100%',
                  height: document.body.clientHeight - 100,
                }}
                frameBorder="0"
              />
            );
          }
        },
      ).open({});
    } else if (type === 'otherPower2') {
      FormDialog(
        {
          style: { top: 20 },
          title: '预算表',
          footer: null,
          keyboard: false,
          maskClosable: false,
          width: '98%',
        },
        (form) => {
          return (
            <div>
              <a
                href={
                  'http://localhost:8000/project/jmreport/show?id=830420195158278144&params=%7B%22printAll%22%3Atrue%2C%22id%22%3A%2211%22%2C%22processInstId%22%3A%22279%22%2C%22pageNo%22%3A1%2C%22pageSize%22%3A10%2C%22currentPageNo%22%3A%221%22%2C%22currentPageSize%22%3A10%7D'
                }
              >
                pdf
              </a>
              <br />
              <iframe
                src={
                  contextPath +
                  '/jmreport/view/830420195158278144?id=' +
                  record.id +
                  '&processInstId=' +
                  record.processInst.id
                }
                style={{
                  border: 0,
                  width: '100%',
                  height: document.body.clientHeight - 100,
                }}
                frameBorder="0"
              />
            </div>
          );
        },
      ).open({});
    } else if (type === 'otherPowerPath') {
      /*      let p={
        id: '830420195158278144',
        params: {"printAll":true,"pageNo":1,"pageSize":10,"currentPageNo":"1","currentPageSize":10}
      }
      const d = await pdfGet(contextPath + '/jmreport/show', p,record.code)
      return*/
      let params = {
        excelConfigId: '830420195158278144',
        queryParam: {
          currentPageNo: '1',
          currentPageSize: 10,
          id: record.id,
          pageNo: '1',
          pageSize: 100,
          processInstId: record.processInst.id,
        },
      };
      const data = await pdfPost(
        contextPath + '/jmreport/exportPdfStream',
        params,
        record.code,
      );
    } else if (type === 'smallProjectPath') {
      let params = {
        excelConfigId: '830602946641719296',
        queryParam: {
          id: record.id,
          projectId: record.id,
          processInstId: record.processInst.id,
        },
      };
      const data = await pdfPost(
        contextPath + '/jmreport/exportPdfStream',
        params,
        record.name + '(一般项目立项)',
      );
    } else if (type === 'bigProjectPath') {
      let params = {
        excelConfigId: '830619210630098944',
        queryParam: {
          id: record.id,
          projectId: record.id,
          processInstId: record.processInst.id,
        },
      };
      const data = await pdfPost(
        contextPath + '/jmreport/exportPdfStream',
        params,
        record.name + '(重大项目评估)',
      );
    } else if (
      type === 'budgetProjecttPath' ||
      type === 'bigBudgetProjecttPath'
    ) {
      let params = {
        excelConfigId: '830633280947154944',
        queryParam: {
          id: record.id,
          budgetId: record.id,
          processInstId: record.processInst.id,
        },
      };
      const data = await pdfPost(
        contextPath + '/jmreport/exportPdfStream',
        params,
        record.name + '(项目预算)',
      );
    } else if (type === 'customerScore1Path') {
      let params = {
        excelConfigId: '858890718131027968',
        queryParam: {
          id: record.id,
          customerScore1Id: record.id,
          processInstId: record.processInst.id,
        },
      };
      const data = await pdfPost(
        contextPath + '/jmreport/exportPdfStream',
        params,
        record.customerName + '(客户评分)',
      );
    } else if (type === 'providerScorePath') {
      let params = {
        excelConfigId: '858890739186434048',
        queryParam: {
          id: record.id,
          providerScore1Id: record.id,
          processInstId: record.processInst.id,
        },
      };
      const data = await pdfPost(
        contextPath + '/jmreport/exportPdfStream',
        params,
        record.providerName + '(供方评分)',
      );
    } else if (type === 'price1Path') {
      let params = {
        excelConfigId: '863923860684439552',
        queryParam: {
          id: record.id,
          price1Id: record.id,
          processInstId: record.processInst.id,
        },
      };
      const data = await pdfPost(
        contextPath + '/jmreport/exportPdfStream',
        params,
        record.projectName + '(比价单)',
      );
    } else if (type === 'price2Path') {
      let params = {
        excelConfigId: '863923904703660032',
        queryParam: {
          id: record.id,
          processInstId: record.processInst.id,
        },
      };
      const data = await pdfPost(
        contextPath + '/jmreport/exportPdfStream',
        params,
        record.projectName + '(竞争性谈判表)',
      );
    } else if (type === 'price3Path') {
      let params = {
        excelConfigId: '863923919790571520',
        queryParam: {
          id: record.id,
          price3Id: record.id,
          processInstId: record.processInst.id,
        },
      };
      const data = await pdfPost(
        contextPath + '/jmreport/exportPdfStream',
        params,
        record.projectName + '(评审方案审批表)',
      );
    }
  };

  const render = () => {
    if (from === 'ViewHistory') {
      return (
        <a onClick={() => onClick('view')}>{record.processInst.businessName}</a>
      );
    }
    let arr = [];
    let processStatus = record?.processInst?.processStatus;
    let version = record?.processInst?.businessVersion;
    if (processStatus) {
      if (processStatus === '审批中') {
        arr.push(<a onClick={() => onClick('view')}>查看</a>);
        if (version > 0) {
          arr.push(<a onClick={() => onClick('viewHistory')}>查看历史</a>);
        }
        if (record.displayName === session.getItem('user').displayName) {
          arr.push(<a onClick={() => onClick('recall')}>撤回</a>);
        }
      } else if (processStatus === '完成') {
        arr.push(<a onClick={() => onClick('view')}>查看</a>);
        if (version > 0) {
          arr.push(<a onClick={() => onClick('viewHistory')}>查看历史</a>);
        }
        if (!path.haveChange) {
          if (record.deptName === session.getItem('user').deptName) {
            arr.push(
              <a onClick={() => onClick('change')}>
                {path.changeButtonName || '变更'}
              </a>,
            );
          }
        }
        if (
          path.flag === 'otherPowerPath' ||
          path.flag === 'smallProjectPath' ||
          path.flag === 'bigProjectPath' ||
          path.flag === 'budgetProjecttPath' ||
          path.flag === 'bigBudgetProjecttPath' ||
          path.flag === 'customerScore1Path' ||
          path.flag === 'providerScorePath' ||
          path.flag === 'price1Path' ||
          path.flag === 'price2Path' ||
          path.flag === 'price3Path'
        ) {
          arr.push(<a onClick={() => onClick(path.flag)}>导出</a>);
        }
      } else if (
        processStatus === '退回' ||
        processStatus === '退回申请人' ||
        processStatus === '申请人撤回'
      ) {
        if (record.displayName === session.getItem('user').displayName) {
          arr.push(<a onClick={() => onClick('edit')}>编辑</a>);
        }
        arr.push(<a onClick={() => onClick('view')}>查看</a>);
        if (version > 0) {
          arr.push(<a onClick={() => onClick('viewHistory')}>查看历史</a>);
        }
        if (record.displayName === session.getItem('user').displayName) {
          arr.push(<a onClick={() => onClick('delete')}>删除</a>);
        }
      }
    } else {
      //草稿
      if (record.processInstId === 0) {
        arr.push(<a onClick={() => onClick('view')}>查看</a>);
        if (version > 0) {
          arr.push(<a onClick={() => onClick('viewHistory')}>查看历史</a>);
        }
        if (!path.haveChange) {
          if (record.deptName === session.getItem('user').deptName) {
            arr.push(
              <a onClick={() => onClick('change')}>
                {path.changeButtonName || '变更'}
              </a>,
            );
          }
        }
      } else {
        arr.push(<a onClick={() => onClick('edit')}>编辑</a>);
        arr.push(<a onClick={() => onClick('delete')}>删除</a>);
      }
    }
    return <Space size={'middle'}>{arr}</Space>;
  };

  return <>{render()}</>;
};
