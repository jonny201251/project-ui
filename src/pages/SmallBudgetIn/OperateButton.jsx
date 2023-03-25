import { Button, message, Space } from 'antd'
import { get, post } from '../../utils'
import { FormButtonGroup, FormDialog } from '@formily/antd'
import { LoadingButton } from '../../components'
import React from 'react'

export default (props) => {
  const { record, path, actionRef, rowKey } = props
  let width = path.width || 520

  const onClick = async (type) => {
    let params = {}
    params[rowKey || 'id'] = record[rowKey || 'id']

    params['inType'] = record.inType


    params['costType'] = record.costType
    if (record.costRate) {
      params['costRate'] = record.costRate
    }


    if (type === 'edit') {
      const dbRecord = await get(path.get, params)
      if (dbRecord) {
        let dialog = FormDialog(
          { title: '编辑', footer: null, keyboard: false, maskClosable: false, width },
          (form) => {
            form.setValues(dbRecord)
            return (
              <>
                <path.Form form={form} type={type} record={dbRecord} dialog={dialog}/>
                <FormDialog.Footer>
                  <FormButtonGroup gutter={16} align={'right'}>
                    <Button onClick={() => dialog.close()}>取消</Button>
                    <LoadingButton
                      onClick={async () => {
                        const values = await form.submit()
                        if (values) {
                          values.operateButtonType = type
                          const data = await post(path.edit, values)
                          if (data) {
                            actionRef.current.clearSelected()
                            actionRef.current.reload()
                            dialog.close()
                            message.success('编辑成功')
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
            )
          },
        )
        dialog.open()
      }
    } else if (type === 'view') {
      const dbRecord = await get(path.get, params)
      if (dbRecord) {
        let dialog = FormDialog({ title: '查看', footer: null, keyboard: false, maskClosable: false, width },
          (form) => {
            form.setValues(dbRecord)
            return <path.Form form={form} type={type} record={dbRecord} dialog={dialog}/>
          },
        )
        dialog.open()
      }
    }
  }

  const renderButton = () => {
    let arr = []
    if (!record.processInst) {
      arr.push(<a onClick={() => onClick('edit')}>编辑</a>)
    }
    arr.push(<a onClick={() => onClick('view')}>查看</a>)
    return <Space size={'middle'}>{arr}</Space>
  }

  return <>{renderButton()}</>
};
