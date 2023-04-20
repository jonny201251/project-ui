import React, { useEffect, useState } from 'react'
//原生组件
import LogicFlow from '@logicflow/core'
import '@logicflow/core/dist/style/index.css'
import { DndPanel, SelectionSelect } from '@logicflow/extension'
import '@logicflow/extension/lib/style/index.css'
//改造组件
import { BpmnXmlAdapter } from '../workflow/bpmn-adapter'
import { BpmnElement } from '../workflow/bpmn'
import '../workflow/bpmn-palette/index.css'

import { get, processDesignPath, processInstPath } from '../../utils'

export default (props) => {
  let { processInstId } = props

  useEffect(async () => {
    const bpmnXml = await get(processDesignPath.getBpmnXml, { processInstId })
    const taskKeyList = await get(processInstPath.getRunTaskKeyList, { processInstId})
    if (bpmnXml && taskKeyList) {
      LogicFlow.use(BpmnElement)
      LogicFlow.use(BpmnXmlAdapter)
      LogicFlow.use(DndPanel)
      LogicFlow.use(SelectionSelect)
      let lf = new LogicFlow({
        container: document.querySelector('#graph'),
        stopScrollGraph: true,
        stopZoomGraph: true,
        nodeTextEdit: false,
        edgeTextEdit: false,
        nodeTextDraggable: false,
        edgeTextDraggable: false,
        isSilentMode: true,
        width: document.documentElement.clientWidth,
        height: 500,
      })
      lf.render(bpmnXml)
      //
      if (taskKeyList.length > 0) {
        taskKeyList.forEach(nodeId => {
          lf.getNodeModelById(nodeId)?.setProperties({ statu: 'check' })
          lf.getNodeModelById(nodeId)?.setSelected(true)
        })
      }
    }
  })
  return <div className="bpmn-example-container">
    <div id="graph" className="viewport"/>
  </div>
}
