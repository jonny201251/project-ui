import LoadingButton from './LoadingButton'
import ToolBarButton from './ToolBarButton'
import ToolBarButton2 from './ToolBarButton2'
import OperateButton from './OperateButton'
import ToolBarButtonProcess from './ToolBarButtonProcess'
import OperateButtonProcess from './OperateButtonProcess'
import BaseList from './BaseList'
import BaseCheckBoxList from './BaseCheckBoxList'
import BaseProTable from './BaseProTable'
import BaseProTable2 from './BaseProTable2'
import BaseProTableProcess from './BaseProTableProcess'
import { ArrayTable, Upload } from '@formily/antd'
import React from 'react'
import { clone, isValid } from '@formily/shared'
import { useField } from '@formily/react'
import { Button, Card, Input, InputNumber } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { contextPath } from '../utils'

export {
  LoadingButton,
  ToolBarButton, ToolBarButton2, OperateButton,
  ToolBarButtonProcess, OperateButtonProcess,
  BaseList, BaseCheckBoxList, BaseProTable, BaseProTable2, BaseProTableProcess,
}

//文本框+按钮
const InputButton = (props) => {
  return <div style={{ display: 'inline-flex', width: '100%' }}>
    <Input {...props} style={{ ...props.style }} disabled/>
    <Button onClick={(e) => {
      if (props.onClick) {
        props.onClick('open')
      }
    }} icon={<SearchOutlined/>} type={'primary'}/>
  </div>
}
export { InputButton }

const OnlyButton = (props) => {
  return <div style={{ display: 'inline-flex'}}>
    <Button onClick={(e) => {
      if (props.onClick) {
        props.onClick('open')
      }
    }}>{props.name}</Button>
  </div>
}
export { OnlyButton }

//NumberPicker
const NumberPicker = (props) => {
  return <InputNumber controls={false} {...props}/>
}
export { NumberPicker }

//ArrayTable的序号，添加，删除
const ArrayTableIndex = (props) => {
  const index = ArrayTable.useIndex()
  return <span>{index + 1}</span>
}
const ArrayTableRemove = React.forwardRef((props, ref) => {
  const index = ArrayTable.useIndex(props.index)
  const array = ArrayTable.useArray()
  if (!array) return null
  if (array.field?.pattern !== 'editable') return null
  return (
    <a
      {...props}
      ref={ref}
      onClick={(e) => {
        if (array.props?.disabled) return
        e.stopPropagation()
        array.field?.remove?.(index)
        array.props?.onRemove?.(index)
        if (props.onClick) {
          props.onClick(e)
        }
      }}
    >{'删除'}</a>
  )
})
//
const getDefaultValue = (defaultValue, schema) => {
  if (isValid(defaultValue)) return clone(defaultValue)
  if (Array.isArray(schema?.items))
    return getDefaultValue(defaultValue, schema.items[0])
  if (schema?.items?.type === 'array') return []
  if (schema?.items?.type === 'boolean') return true
  if (schema?.items?.type === 'date') return ''
  if (schema?.items?.type === 'datetime') return ''
  if (schema?.items?.type === 'number') return 0
  if (schema?.items?.type === 'object') return {}
  if (schema?.items?.type === 'string') return ''
  return null
}
const ArrayTableAddition = (props) => {
  const self = useField()
  const array = ArrayTable.useArray()
  if (!array) return null
  if (array.field?.pattern !== 'editable')
    return null
  return (
    <Button
      block
      style={{ width: props.width || 80 }}
      disabled={array.field?.disabled}
      onClick={(e) => {
        if (array.props?.disabled) return
        const defaultValue = getDefaultValue(props.defaultValue, array.schema)
        if (props.method === 'unshift') {
          array.field?.unshift?.(defaultValue)
          array.props?.onAdd?.(0)
        } else {
          array.field?.push?.(defaultValue)
          array.props?.onAdd?.(array?.field?.value?.length - 1)
        }
        if (props.onClick) {
          props.onClick(e)
        }
      }}
    >
      {props.title || self.title || '添加'}
    </Button>
  )
}

export { ArrayTableIndex, ArrayTableRemove, ArrayTableAddition }

const File = (props) => {
  return <Upload
    {...props}
    action={contextPath + '/uploadFile'}
    headers={{
      authorization: 'authorization-text',
    }}
  >
    <Button>选择</Button>
  </Upload>
}

export { File }

const MyCard = (props) => {
  return <Card size={'small'} title={<b style={{ textAlign: 'center' }}>{props.title}</b>}
               bodyStyle={{ paddingBottom: 0, paddingLeft: 0, paddingRight: 0 }}
               style={{ marginBottom: 10 }}>{props.children}</Card>
}

export { MyCard }

const Line = (props) => {
  return <div>--</div>
}

export { Line }

const Text = (props) => {
  return <span>{props.value}</span>
}

export { Text }
