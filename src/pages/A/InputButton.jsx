import { useState, useEffect } from 'react'
import { createSchemaField } from '@formily/react'
import {
  ArrayItems,
  ArrayTable,
  DatePicker,
  FormGrid,
  FormItem,
  FormLayout,
  Input,
  NumberPicker, PreviewText,
  Radio,
  Select, Space,
} from '@formily/antd'

const SchemaField = createSchemaField({
  components: {
    FormLayout, FormItem, Input, ArrayItems, Select, Radio, DatePicker, FormGrid,
    ArrayTable, NumberPicker, PreviewText, Space,
  },
})

export default (props) => {


}
