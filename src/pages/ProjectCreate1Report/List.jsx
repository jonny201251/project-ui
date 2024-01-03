import React, { useEffect, useState } from 'react';
import {
  DatePicker,
  Form,
  FormButtonGroup,
  FormGrid,
  FormItem,
  Submit,
} from '@formily/antd';
import { createForm } from '@formily/core';
import { Field } from '@formily/react';
import { Card, ConfigProvider } from 'antd';
import { contextPath } from '../../utils';
import zhCN from 'antd/lib/locale/zh_CN';

const form = createForm();

export default () => {
  const [src, setSrc] = useState('');
  const [display, setDisplay] = useState('none');

  useEffect(() => {});
  return (
    <ConfigProvider locale={zhCN}>
      <Card>
        <Form
          form={form}
          onAutoSubmit={(data) => {
            setSrc(
              contextPath +
                '/jmreport/view/902347310834679808?year3=' +
                data.year3,
            );
            setDisplay('block');
          }}
        >
          <FormGrid maxColumns={4}>
            <Field
              name="year3"
              title="年份"
              required
              decorator={[FormItem]}
              component={[DatePicker, { picker: 'year' }]}
            />
            <FormButtonGroup.FormItem>
              <Submit>确定</Submit>
            </FormButtonGroup.FormItem>
          </FormGrid>
        </Form>
        <iframe
          src={src}
          style={{
            border: 0,
            width: '100%',
            height: document.body.clientHeight - 50,
          }}
          frameBorder="0"
        />
      </Card>
    </ConfigProvider>
  );
};
