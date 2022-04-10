import React, { useEffect, useState } from 'react'
//原生组件
import LogicFlow from '@logicflow/core'
import '@logicflow/core/dist/style/index.css'
import { DndPanel, SelectionSelect } from '@logicflow/extension'
import '@logicflow/extension/lib/style/index.css'
//改造组件
import { BpmnXmlAdapter } from '../workflow/bpmn-adapter'
import { BpmnElement } from '../workflow/bpmn'
import BpmnPattern from '../workflow/bpmn-palette/pattern'
import '../workflow/bpmn-palette/index.css'
//
import {
  Form, FormButtonGroup, FormDialog, FormGrid, FormItem, FormLayout,
  Input, Radio,
} from '@formily/antd'
import { Button, message } from 'antd'
import { LoadingButton } from '../../components'
import TaskForm from './TaskForm'
import EdgeForm from './EdgeForm'
import { post, processDesignPath } from '../../utils'
import { createSchemaField } from '@formily/react'

const SchemaField = createSchemaField({
  components: { FormLayout, FormItem, Input, FormGrid, Radio },
})

let nodeMap
let edgeMap
export default (props) => {
  let { form, record, dialog, actionRef, roleList, userList } = props
  const [lf, setLf] = useState()

  useEffect(async () => {
    LogicFlow.use(BpmnElement)
    LogicFlow.use(BpmnXmlAdapter)
    LogicFlow.use(DndPanel)
    LogicFlow.use(SelectionSelect)
    let logicFlow = new LogicFlow({
      container: document.querySelector('#graph'),
      stopScrollGraph: true,
      stopZoomGraph: true,
      nodeTextEdit: false,
      edgeTextEdit: false,
      nodeTextDraggable: true,
      edgeTextDraggable: true,
      grid: true,
      keyboard: {
        enabled: true,
        shortcuts: {
          keys: ['delete'],
          callback: () => {
            const elements = logicFlow.graphModel.getSelectElements()
            logicFlow.clearSelectElements()
            if (elements) {
              elements.edges.forEach(edge => {
                logicFlow.deleteEdge(edge.id)
                edgeMap.delete(edge.id)
              })
              elements.nodes.forEach(node => {
                logicFlow.deleteNode(node.id)
                nodeMap.delete(node.id)
              })
            }
          },
        },
      },
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    })
    //
    logicFlow.on('node:dbclick', ({ data: node }) => {
      if (node.type === 'bpmn:userTask' || node.type === 'bpmn:serviceTask') {
        let dialog2 = FormDialog({ title: '任务属性', footer: null, keyboard: false, maskClosable: false, width: 850 },
          (form2) => {
            return <>
              <TaskForm
                form={form2} dialog={dialog2} node={node} data={nodeMap.get(node.id)}
                roleList={roleList} userList={userList}
              />
              <FormDialog.Footer>
                <FormButtonGroup gutter={16} align={'right'}>
                  <Button onClick={() => dialog2.close()}>取消</Button>
                  <LoadingButton
                    onClick={async () => {
                      const values = await form2.submit()
                      if (values) {
                        //存储
                        nodeMap.set(node.id, values)
                        //设置节点名称
                        logicFlow.updateText(node.id, values.taskName)
                        dialog2.close()
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
    })
    logicFlow.on('edge:dbclick', ({ data: edge }) => {
      //连线的开始不能是开始事件和并行网关
      if (edge.sourceNodeId.indexOf('StartEvent') < 0 && edge.sourceNodeId.indexOf('ParallelGateway') < 0) {
        let dialog3 = FormDialog({ title: '连线属性', footer: null, keyboard: false, maskClosable: false, width: 550 },
          (form3) => {
            return <>
              <EdgeForm form={form3} dialog={dialog3} edge={edge} data={edgeMap.get(edge.id)}/>
              <FormDialog.Footer>
                <FormButtonGroup gutter={16} align={'right'}>
                  <Button onClick={() => dialog3.close()}>取消</Button>
                  <LoadingButton
                    onClick={async () => {
                      const values = await form3.submit()
                      if (values) {
                        //存储
                        edgeMap.set(edge.id, values)
                        //设置节点名称
                        logicFlow.updateText(edge.id, values.edgeName)
                        dialog3.close()
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
        dialog3.open({})
      }
    })

    //
    nodeMap = new Map()
    edgeMap = new Map()
    if (record) {
      record.taskList.forEach(item => {
        nodeMap.set(item.taskKey, item)
      })
      record.edgeList.forEach(edge => {
        edgeMap.set(edge.edgeId, edge)
      })
      logicFlow.render(record.processDesign.bpmnXml)
    } else {
      logicFlow.render()
    }

    setLf(logicFlow)
  }, [])

  //校验节点的连线
  const validateEdge = (node) => {
    let flag = true
    //节点的向外连线
    const edges = lf.getEdgeModels({ sourceNodeId: node.id })
    let arr = []
    if (edges.length > 1) {
      edges.forEach(edge => {
        let edge2 = edgeMap.get(edge.id)
        if (edge2) {
          arr.push(edge2)
        }
      })
      //判断
      if (edges.length !== arr.length) {
        flag = false
        if (node.type === 'bpmn:exclusiveGateway') {
          message.error('条件判断不能为空')
          return
        } else {
          let node2 = nodeMap.get(node.id)
          if (node2) {
            message.error(node2.taskName + '的连线名称不能为空')
          } else {
            message.error('任务名称不能为空')
          }
        }
      }
    }
    return flag
  }
  const onClick = async () => {
    //流程表单
    let formValues = await form.submit()
    //流程图
    const { nodes, edges } = lf.getGraphRawData()
    if (nodes.length === 0) {
      message.error('没有流程图')
      return
    }
    if (nodeMap.size === 0) {
      message.error('任务节点不能为空')
      return
    }
    //提交数据
    formValues.bpmnXml = lf.getGraphData()
    let data = { processDesign: formValues, taskList: [], edgeList: [] }
    let flag = true
    //node
    for (let i = 0; i < nodes.length; i++) {
      let node = nodes[i]
      if (node.type === 'bpmn:userTask' || node.type === 'bpmn:serviceTask') {
        if (validateEdge(node)) {
          let node2 = nodeMap.get(node.id)
          if (node2) {
            data.taskList.push(node2)
          } else {
            flag = false
            message.error('任务名称不能为空')
            break
          }
        } else {
          flag = false
          break
        }
      } else if (node.type === 'bpmn:exclusiveGateway') {
        if (validateEdge(node)) {
          data.taskList.push({ taskType: node.type, taskKey: node.id })
        } else {
          flag = false
          break
        }
      } else {
        //开始事件，结束事件，并行网关
        data.taskList.push({ taskType: node.type, taskKey: node.id })
      }
    }
    if (!flag) return
    //edge
    edges.forEach(edge => {
      let edge2 = edgeMap.get(edge.id)
      if (edge2) {
        data.edgeList.push(edge2)
      } else {
        data.edgeList.push({ edgeId: edge.id, sourceTaskKey: edge.sourceNodeId, targetTaskKey: edge.targetNodeId })
      }
    })

    console.log(data)
    const dataa = await post(data.processDesign.id ? processDesignPath.edit : processDesignPath.add, data)
    if (dataa) {
      actionRef.current.clearSelected()
      actionRef.current.reload()
      dialog.close()
      message.success('保存成功')
    }
  }

  return <div>
    <Form form={form}>
      <SchemaField>
        <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 5, strictAutoFit: true }}>
          <SchemaField.String
            name="name" required title="流程名称" x-component="Input"
            x-decorator="FormItem" x-decorator-props={{ gridSpan: 2 }}
          />
          <SchemaField.String
            name="path" required title="表单路径" x-decorator="FormItem" x-component="Input"
            x-component-props={{ placeholder: 'sysDicPath' }}
          />
          <SchemaField.String
            name="processType" required title="流程类型"
            x-decorator="FormItem" x-decorator-props={{ gridSpan: 2 }}
            x-component="Radio.Group"
            enum={[
              { label: '新增流程', value: '新增流程' },
              { label: '变更流程', value: '变更流程' },
            ]}
            default={'新增流程'}
          />
        </SchemaField.Void>
      </SchemaField>
    </Form>
    <div className="bpmn-example-container">
      <div id="graph" className="viewport"/>
      {lf && <BpmnPattern lf={lf}/>}
    </div>
    <FormButtonGroup gutter={16} align={'right'}>
      <Button onClick={() => {
        dialog.close()
      }}>取消</Button>
      <LoadingButton type={'primary'} onClick={onClick}>
        确定
      </LoadingButton>
    </FormButtonGroup>
  </div>
}
