import { message, Modal, Space } from 'antd'
import { contextPath, get, post, processDesignPath, session } from '../utils'
import { FormButtonGroup, FormDialog } from '@formily/antd'
import { LoadingButton } from './index'
import { QuestionCircleOutlined } from '@ant-design/icons'
import React from 'react'

export default (props) => {
  const { record, path, actionRef, rowKey, from } = props
  let width = path.width || 520

  const formButton = (buttonList, haveEditForm, dialog, form, type) => {
    let btnArr = []
    buttonList.forEach(buttonName => {
      btnArr.push(
        <LoadingButton
          onClick={async () => {
            const formValue = await form.submit()
            if (formValue) {
              let values = { formValue, buttonName, type, path: path.flag, haveEditForm, comment: formValue.comment }
              const data = await post(path.btnHandle, values)
              if (data) {
                actionRef.current.clearSelected()
                actionRef.current.reload()
                dialog.close()
                message.success('操作成功')
              }
            }
          }}
          type={'primary'}
        >
          {buttonName.replace(/\w+_/i, '')}
        </LoadingButton>,
      )
    })
    return btnArr
  }

  const onClick = async (type) => {
    let params = {}
    params[rowKey || 'id'] = record[rowKey || 'id']

    if (type === 'edit') {
      const dbRecord = await get(path.get, params)
      const processFormBefore = await post(processDesignPath.getProcessFormBefore, { path: path.flag, type })
      if (dbRecord && processFormBefore) {
        let dialog = FormDialog(
          { title: '编辑', footer: null, keyboard: false, maskClosable: false, width },
          (form) => {
            form.setValues(dbRecord)
            return <>
              <path.EditForm form={form} type={type} record={dbRecord} dialog={dialog}/>
              <FormDialog.Footer>
                <FormButtonGroup gutter={16} align={'center'}>
                  {formButton(processFormBefore.buttonList, processFormBefore.haveEditForm, dialog, form, type)}
                </FormButtonGroup>
              </FormDialog.Footer>
            </>
          },
        )
        dialog.open()
      }
    } else if (type === 'change') {
      params['type'] = 'change'
      const dbRecord = await get(path.get, params)
      const processFormBefore = await post(processDesignPath.getProcessFormBefore, { path: path.flag, type })
      if (dbRecord && processFormBefore) {
        let dialog = FormDialog(
          { title: path.changeButtonName || '变更', footer: null, keyboard: false, maskClosable: false, width },
          (form) => {
            form.setValues(dbRecord)
            return <>
              <path.ChangeForm form={form} type={type} record={dbRecord} dialog={dialog}/>
              <FormDialog.Footer>
                <FormButtonGroup gutter={16} align={'center'}>
                  {formButton(processFormBefore.buttonList, processFormBefore.haveEditForm, dialog, form, type)}
                </FormButtonGroup>
              </FormDialog.Footer>
            </>
          },
        )
        dialog.open()
      }
    } else if (type === 'view') {
      const dbRecord = await get(path.get, params)
      if (dbRecord) {
        let dialog = FormDialog(
          { title: '查看', footer: null, keyboard: false, maskClosable: false, width },
          (form) => {
            form.setValues(dbRecord)
            return <path.ViewForm form={form} type={type} record={dbRecord} dialog={dialog}/>
          },
        )
        dialog.open()
      }
    } else if (type === 'viewHistory') {
      const dbRecord = await post(path.viewHistory, {
        path: path.flag,
        businessBaseId: record.processInst.businessBaseId,
      })
      if (dbRecord) {
        let dialog = FormDialog(
          { title: '历史数据', footer: null, keyboard: false, maskClosable: false, width },
          (form) => {
            return <path.ViewHistory record={dbRecord} path={path}/>
          },
        )
        dialog.open()
      }
    } else if (type === 'recall') {
      Modal.error({
        okText: '确定', closable: true, width: 450,
        icon: <QuestionCircleOutlined/>,
        content: <p style={{ fontSize: 16 }}> 确定要撤回-{record.processInst.businessName}</p>,
        onOk: async (close) => {
          let values = { formValue: record, buttonName: '申请人撤回', type, path: path.flag }
          const data = await post(path.btnHandle, values)
          if (data) {
            actionRef.current.clearSelected()
            actionRef.current.reload()
            close()
            message.success('撤回成功')
          }
        },
      })
    } else if (type === 'delete') {
      let content = '确定要删除'
      if (record?.processInst?.businessName) {
        content = content + '-' + record?.processInst?.businessName
      }
      Modal.error({
        okText: '确定', closable: true, width: 450,
        icon: <QuestionCircleOutlined/>,
        content: <p style={{ fontSize: 16 }}>{content}</p>,
        onOk: async (close) => {
          let values = { formValue: record, buttonName: '申请人删除', type, path: path.flag }
          const data = await post(path.btnHandle, values)
          if (data) {
            actionRef.current.clearSelected()
            actionRef.current.reload()
            close()
            message.success('删除成功')
          }
        },
      })
    } else if (type === 'viewBudget') {
      FormDialog({
          style: { top: 20 },
          title: '预算表',
          footer: null,
          keyboard: false,
          maskClosable: false,
          width: '98%',
        },
        (form) => {
          if (record.version === 0) {
            return <iframe
              src={contextPath + '/jmreport/view/704922619257352192?budgetId=' + record.id}
              style={{ border: 0, width: '100%', height: document.body.clientHeight - 100 }}
              frameBorder="0"/>
          } else {
            return <iframe
              src={contextPath + '/jmreport/view/758190413062881280?budgetId=' + record.id}
              style={{ border: 0, width: '100%', height: document.body.clientHeight - 100 }}
              frameBorder="0"/>
          }
        },
      ).open({})
    }
  }

  const render = () => {
    if (from === 'ViewHistory') {
      return <a onClick={() => onClick('view')}>{record.processInst.businessName}</a>
    }
    let arr = []
    let processStatus = record?.processInst?.processStatus
    let version = record?.processInst?.businessVersion
    if (processStatus) {
      if (processStatus === '审批中') {
        arr.push(<a onClick={() => onClick('view')}>查看</a>)
        if (version > 0) {
          arr.push(<a onClick={() => onClick('viewHistory')}>查看历史</a>)
        }
        if (record.displayName === (session.getItem('user')).displayName) {
          arr.push(<a onClick={() => onClick('recall')}>撤回</a>)
        }
        console.log(record)
        console.log(session.getItem('user'))

      } else if (processStatus === '完成') {
        arr.push(<a onClick={() => onClick('view')}>查看</a>)
        if (version > 0) {
          arr.push(<a onClick={() => onClick('viewHistory')}>查看历史</a>)
        }
        if (!path.haveChange) {
          if (path.flag.indexOf('BudgetRunPath') > 0) {
            if (record.newBudgetProject) {
              arr.push(<a onClick={() => onClick('change')}>{path.changeButtonName || '变更'}</a>)
            }
          } else {
            arr.push(<a onClick={() => onClick('change')}>{path.changeButtonName || '变更'}</a>)
          }
        }
      } else if (processStatus === '退回' || processStatus === '退回申请人' || processStatus === '申请人撤回') {
        arr.push(<a onClick={() => onClick('edit')}>编辑</a>)
        arr.push(<a onClick={() => onClick('view')}>查看</a>)
        if (version > 0) {
          arr.push(<a onClick={() => onClick('viewHistory')}>查看历史</a>)
        }
        arr.push(<a onClick={() => onClick('delete')}>删除</a>)
      }
    } else {
      //草稿
      arr.push(<a onClick={() => onClick('edit')}>编辑</a>)
      arr.push(<a onClick={() => onClick('delete')}>删除</a>)
    }
    //预算表
    if (record.viewBudget) {
      arr.push(<a onClick={() => onClick('viewBudget')}>预算表</a>)
    }
    return <Space size={'middle'}>{arr}</Space>
  }

  return <>{render()}</>
}
