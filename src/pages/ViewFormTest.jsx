import { ConfigProvider, Tabs } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import { Form } from '@formily/antd'
import ProcessDesignGraph from './ProcessDesignGraph'
import ProcessInstNodeList from './ProcessInstNode/List'
import React from 'react'

export default (props) => {
  let { form, record } = props

  return <ConfigProvider locale={zhCN}>
    <Tabs animated={false} size={'small'}>
      <Tabs.TabPane tab="表单数据" key="1">

      </Tabs.TabPane>
      <Tabs.TabPane tab="流程图" key="2">
        <ProcessDesignGraph processInstId={record.processInstId}/>
      </Tabs.TabPane>
      <Tabs.TabPane tab="审批记录" key="3">
        <ProcessInstNodeList processInstId={record.processInstId}/>
      </Tabs.TabPane>
    </Tabs>
  </ConfigProvider>
}
