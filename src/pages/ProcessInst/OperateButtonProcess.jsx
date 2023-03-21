import { message } from 'antd'
import * as utils from '../../utils'
import { get, post, processDesignPath } from '../../utils'
import { FormButtonGroup, FormDialog } from '@formily/antd'
import { LoadingButton } from '../../components'

export default (props) => {
  const { record, actionRef } = props

  // let title = record.businessName
  let title = '审批'
  //
  let path = utils[record.path]
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

  const onClick = async () => {
    let type
    if (record.processStatus === '退回申请人') {
      type = 'reject'
    } else if (record.processStatus === '申请人撤回') {
      type = 'recall'
    } else {
      //审批中、退回
      type = 'check'
    }

    const dbRecord = await get(path.get, { id: record.businessId })
    const processFormBefore = await post(processDesignPath.getProcessFormBefore, {
      processInstId: record.id, type,
    })
    if (dbRecord && processFormBefore) {
      let dialog = FormDialog(
        { title: title, footer: null, keyboard: false, maskClosable: false, width },
        (form) => {
          form.setValues(dbRecord)
          return <>
            <path.CheckForm form={form} type={type} record={dbRecord} dialog={dialog}
                            haveEditForm={processFormBefore.haveEditForm}/>
            <FormDialog.Footer>
              <FormButtonGroup gutter={16} align={'center'}>
                {formButton(processFormBefore.buttonList, processFormBefore.haveEditForm, dialog, form, 'check')}
              </FormButtonGroup>
            </FormDialog.Footer>
          </>
        },
      )
      dialog.open()
    }
  }

  return <a onClick={() => onClick()}>
    {record.businessName}
  </a>
}
