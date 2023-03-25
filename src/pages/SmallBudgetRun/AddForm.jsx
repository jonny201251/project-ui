import {
  DatePicker,
  Form,
  FormButtonGroup,
  FormDialog,
  FormGrid,
  FormItem,
  FormLayout,
  Input,
  Radio,
  Select,
} from '@formily/antd'
import { createSchemaField } from '@formily/react'
import React, { useEffect } from 'react'
import { Button, ConfigProvider, message } from 'antd'
import { contextPath, session } from '../../utils'
import zhCN from 'antd/lib/locale/zh_CN'
import styles from '../table-placeholder.less'
import DialogList from '../SmallBudgetIn/DialogList'
import { File, InputButton, LoadingButton, OnlyButton } from '../../components'


const SchemaField = createSchemaField({
  components: {
    FormLayout, FormItem, FormGrid, Input, InputButton, OnlyButton,
    DatePicker, File, Select, Radio,
  },
})

export default (props) => {
  let { form, type } = props

  useEffect(async () => {
    form.query('*(displayName,deptName,createDatetime,taskCode)').forEach(field => {
      field.setPattern('disabled')
    })
    if (type === 'add') {
      const user = session.getItem('user')
      form.setInitialValues({
        createDatetime: new Date().Format('yyyy-MM-dd hh:mm:ss'),
        displayName: user.displayName, displayNamee: user.displayName, loginName: user.loginName,
        deptId: user.deptId, deptName: user.deptName,
      })
    }
  }, [])

  const onClick = (flag) => {
    if (flag === 'open') {
      let dialog2 = FormDialog({ footer: null, keyboard: false, maskClosable: false, width: 800 },
        (form2) => {
          return <>
            <DialogList form={form2} dialog={dialog2} selectedId={form.values.customerId}/>
            <FormDialog.Footer>
              <FormButtonGroup gutter={16} align={'right'}>
                <Button onClick={() => dialog2.close()}>取消</Button>
                <LoadingButton
                  onClick={async () => {
                    const values = await form2.submit()
                    if (values.selectedRow) {
                      form.setValues({
                        id: values.selectedRow.id,
                        projectId: values.selectedRow.projectId,
                        projectType: values.selectedRow.projectType,
                        name: values.selectedRow.name,
                        taskCode: values.selectedRow.taskCode,
                        version: values.selectedRow.version,
                      })
                      dialog2.close()
                    } else {
                      message.error('选择一条数据')
                    }
                  }}
                  type={'primary'}
                >
                  确定
                </LoadingButton>
              </FormButtonGroup>
            </FormDialog.Footer>
          </>
        },
      )
      dialog2.open({})
    }
  }

  const onClick2 = (flag) => {
    let budgetId = form.getValuesIn('id')
    let version = form.getValuesIn('version')
    if (!budgetId && !version) {
      message.error('先选择一个项目')
      return
    }
    if (flag === 'open') {
      let dialog = FormDialog({
          style: { top: 20 },
          title: '预算表',
          footer: null,
          keyboard: false,
          maskClosable: false,
          width: '98%',
        },
        (form) => {
          if (version === 0) {
            return <iframe
              src={contextPath + '/jmreport/view/704922619257352192?budgetId=' + budgetId}
              style={{ border: 0, width: '100%', height: document.body.clientHeight - 100 }}
              frameBorder="0"/>
          } else {
            return <iframe
              src={contextPath + '/jmreport/view/758190413062881280?budgetId=' + budgetId}
              style={{ border: 0, width: '100%', height: document.body.clientHeight - 100 }}
              frameBorder="0"/>
          }
        },
      )
      dialog.open({})
    }
  }

  const showHaveThree = () => {
    const user = session.getItem('user')
    let projectType = form.getValuesIn('projectType')
    if (projectType === '重大项目' && user.displayName === '于欣坤')
      return <SchemaField.String
        name="haveThree" required title="三个审批" x-component="Radio.Group"
        x-decorator="FormItem" x-decorator-props={{ gridSpan: 2, tooltip: '财务总监、总经理、董事长审批' }}
        enum={[
          { label: '是', value: '是' },
          { label: '否', value: '否' },
        ]}
      />
  }

  return <ConfigProvider locale={zhCN}>
    <Form form={form} labelWidth={110} className={styles.placeholder}>
      <SchemaField>
        <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 3, strictAutoFit: true }}>
          <SchemaField.String name="displayName" title="申请人" x-component="Input" x-decorator="FormItem"/>
          <SchemaField.String name="deptName" title="申请部门" x-component="Input" x-decorator="FormItem"/>
          <SchemaField.String name="createDatetime" title="申请时间" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String
            name="name" required title="项目名称" x-decorator="FormItem" x-decorator-props={{ gridSpan: 2 }}
            x-component="InputButton" x-component-props={{ onClick: onClick }}/>
          <SchemaField.String name="taskCode" title="任务号" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String
            title="预算表" x-decorator="FormItem" x-decorator-props={{ gridSpan: 2 }}
            x-component="OnlyButton" x-component-props={{ onClick: onClick2, name: '查看' }}/>
          <SchemaField.String
            name="fileList" title="附件" x-decorator="FormItem"
            x-component="File" x-decorator-props={{ gridSpan: 2 }}/>
          <SchemaField.String
            name="userNamee" required title="财务部" x-decorator="FormItem"
            x-decorator-props={{ gridSpan: 2, tooltip: '流程审批节点' }}
            x-component="Select" x-component-props={{ showSearch: true }}
            enum={session.getItem('userList')}
          />
          {showHaveThree()}
          <SchemaField.String
            x-decorator-props={{ gridSpan: 2 }}
            name="remark" title="备注" x-decorator="FormItem" x-component="Input.TextArea" x-component-props={{ rows: 2 }}
          />
        </SchemaField.Void>
      </SchemaField>
    </Form>
  </ConfigProvider>
}

