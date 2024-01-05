import {
  ArrayTable,
  DatePicker,
  Form,
  FormButtonGroup,
  FormDialog,
  FormGrid,
  FormItem,
  FormLayout,
  Input,
  PreviewText,
  Radio,
  Select,
  Space,
} from '@formily/antd';
import { createSchemaField } from '@formily/react';
import React, { useEffect } from 'react';
import zhCN from 'antd/lib/locale/zh_CN';
import { Button, ConfigProvider } from 'antd';
import {
  ArrayTableIndex,
  InputButton,
  LoadingButton,
  NumberPicker,
} from '../../components';
import { getTodayDate } from '../../utils';
import { onFieldReact } from '@formily/core';
import ProviderDialog from './DialogList';

const SchemaField = createSchemaField({
  components: {
    FormItem,
    FormLayout,
    Input,
    PreviewText,
    Select,
    NumberPicker,
    ArrayTableIndex,
    ArrayTable,
    FormGrid,
    DatePicker,
    Space,
    InputButton,
    Radio,
  },
});

let map = new Map();
map.set(
  '注册资本',
  ['注册资本≥500万', '500万>注册资本≥100万', '注册资本<100万'].map((item) => ({
    label: item,
    value: item,
  })),
);
map.set(
  '合同法律风险',
  ['没有', '有,但风险较小在可控范围内', '有,且风险较大'].map((item) => ({
    label: item,
    value: item,
  })),
);
map.set(
  '供货合同风险',
  ['没有', '有,但风险较小在可控范围内', '有,且风险较大'].map((item) => ({
    label: item,
    value: item,
  })),
);
map.set(
  '不良记录情况(比如恶意拖欠农民工工资等)',
  ['无', '有,影响较小', '有,影响较大'].map((item) => ({
    label: item,
    value: item,
  })),
);
map.set(
  '产品服务质量及价格水平',
  [
    '与同类型供方相比性价比较高',
    '与同类型供方相比性价比一般',
    '与同类型供方相比性价比较差',
  ].map((item) => ({ label: item, value: item })),
);
map.set(
  '产品服务供货及使用情况',
  [
    '按约定供货及时,采购主体使用情况良好',
    '按约定供货及时,采购主体使用情况一般',
    '未按约定及时供货,采购主体使用情况较差',
  ].map((item) => ({ label: item, value: item })),
);

export default (props) => {
  let { form, record } = props;

  useEffect(async () => {
    // form.query('providerScore2List.*.endScore').map(field => field.pattern = 'disabled')
    form.query('*(deptName,displayName,providerName)').forEach((field) => {
      field.setPattern('disabled');
    });
    // form.setValues({ providerScore2List: [{ kpi: '注册资本', item: '注册资本≥500万' }] })
    if (record) {
      form.setValues(record);
    } else {
      form.setInitialValues({
        type: '民用产业项目',
        createDate: getTodayDate(),
      });
      initList('民用产业项目');
    }
  }, []);

  const onChange = (e) => {
    let value = e.target.value;
    initList(value);
    form.clearErrors();
  };

  const initList = (value) => {
    if (value === '民用产业项目') {
      form.query('providerScore2List').take().value = [
        '注册资本',
        '合同法律风险',
        '不良记录情况(比如恶意拖欠农民工工资等)',
        '产品服务质量及价格水平',
        '产品服务供货及使用情况',
      ].map((item) => ({ kpi: item, standard: ' ' }));
    } else {
      form.query('providerScore2List').take().value = [
        '注册资本',
        '供货合同风险',
        '不良记录情况(比如恶意拖欠农民工工资等)',
        '产品服务质量及价格水平',
        '产品服务供货及使用情况',
      ].map((item) => ({ kpi: item, standard: ' ' }));
    }
  };

  form.addEffects('id', () => {
    onFieldReact('providerScore2List.*.item', (field) => {
      let kpiValue = field.query('.kpi').get('value');
      if (kpiValue) {
        field.dataSource = map.get(kpiValue);
      }
    });
    onFieldReact('providerScore2List.*.standard', (field) => {
      let kpiValue = field.query('.kpi').get('value');
      let itemValue = field.query('.item').get('value');
      if (itemValue) {
        let startScoreField = field.query('.startScore').take();
        let endScoreField = field.query('.endScore').take();
        if (kpiValue === '注册资本') {
          if (itemValue === '注册资本≥500万') {
            field.value = '9-10分';
            startScoreField &&
              startScoreField.setValidator({
                minimum: 9,
                maximum: 10,
                required: true,
              });
            endScoreField &&
              endScoreField.setValidator({
                minimum: 9,
                maximum: 10,
                required: true,
              });
          } else if (itemValue === '500万>注册资本≥100万') {
            field.value = '6-8分';
            startScoreField &&
              startScoreField.setValidator({
                minimum: 6,
                maximum: 8,
                required: true,
              });
            endScoreField &&
              endScoreField.setValidator({
                minimum: 6,
                maximum: 8,
                required: true,
              });
          } else if (itemValue === '注册资本<100万') {
            field.value = '<6分';
            startScoreField &&
              startScoreField.setValidator({
                minimum: 0,
                maximum: 6,
                required: true,
              });
            endScoreField &&
              endScoreField.setValidator({
                minimum: 0,
                maximum: 6,
                required: true,
              });
          }
          endScoreField && endScoreField.setPattern('disabled');
        }
        if (kpiValue === '合同法律风险' || kpiValue === '供货合同风险') {
          if (itemValue === '没有') {
            field.value = '9-10分';
            startScoreField &&
              startScoreField.setValidator({
                minimum: 9,
                maximum: 10,
                required: true,
              });
            endScoreField &&
              endScoreField.setValidator({
                minimum: 9,
                maximum: 10,
                required: true,
              });
          } else if (itemValue === '有,但风险较小在可控范围内') {
            field.value = '6-8分';
            startScoreField &&
              startScoreField.setValidator({
                minimum: 6,
                maximum: 8,
                required: true,
              });
            endScoreField &&
              endScoreField.setValidator({
                minimum: 6,
                maximum: 8,
                required: true,
              });
          } else if (itemValue === '有,且风险较大') {
            field.value = '<6分';
            startScoreField &&
              startScoreField.setValidator({
                minimum: 0,
                maximum: 6,
                required: true,
              });
            endScoreField &&
              endScoreField.setValidator({
                minimum: 0,
                maximum: 6,
                required: true,
              });
          }
          endScoreField && endScoreField.setPattern('disabled');
        }
        if (kpiValue === '不良记录情况(比如恶意拖欠农民工工资等)') {
          if (itemValue === '无') {
            field.value = '9-10分';
            startScoreField &&
              startScoreField.setValidator({
                minimum: 9,
                maximum: 10,
                required: true,
              });
            endScoreField &&
              endScoreField.setValidator({
                minimum: 9,
                maximum: 10,
                required: true,
              });
          } else if (itemValue === '有,影响较小') {
            field.value = '6-8分';
            startScoreField &&
              startScoreField.setValidator({
                minimum: 6,
                maximum: 8,
                required: true,
              });
            endScoreField &&
              endScoreField.setValidator({
                minimum: 6,
                maximum: 8,
                required: true,
              });
          } else if (itemValue === '有,影响较大') {
            field.value = '<6分';
            startScoreField &&
              startScoreField.setValidator({
                minimum: 0,
                maximum: 6,
                required: true,
              });
            endScoreField &&
              endScoreField.setValidator({
                minimum: 0,
                maximum: 6,
                required: true,
              });
          }
          endScoreField && endScoreField.setPattern('disabled');
        }
        if (kpiValue === '产品服务质量及价格水平') {
          if (itemValue === '与同类型供方相比性价比较高') {
            field.value = '9-10分';
            startScoreField &&
              startScoreField.setValidator({
                minimum: 9,
                maximum: 10,
                required: true,
              });
            endScoreField &&
              endScoreField.setValidator({
                minimum: 9,
                maximum: 10,
                required: true,
              });
          } else if (itemValue === '与同类型供方相比性价比一般') {
            field.value = '6-8分';
            startScoreField &&
              startScoreField.setValidator({
                minimum: 6,
                maximum: 8,
                required: true,
              });
            endScoreField &&
              endScoreField.setValidator({
                minimum: 6,
                maximum: 8,
                required: true,
              });
          } else if (itemValue === '与同类型供方相比性价比较差') {
            field.value = '<6分';
            startScoreField &&
              startScoreField.setValidator({
                minimum: 0,
                maximum: 6,
                required: true,
              });
            endScoreField &&
              endScoreField.setValidator({
                minimum: 0,
                maximum: 6,
                required: true,
              });
          }
          endScoreField && endScoreField.setPattern('disabled');
        }
        if (kpiValue === '产品服务供货及使用情况') {
          if (itemValue === '按约定供货及时,采购主体使用情况良好') {
            field.value = '8-10分';
            startScoreField &&
              startScoreField.setValidator({
                minimum: 8,
                maximum: 10,
                required: true,
              });
            endScoreField &&
              endScoreField.setValidator({
                minimum: 8,
                maximum: 10,
                required: true,
              });
          } else if (itemValue === '按约定供货及时,采购主体使用情况一般') {
            field.value = '6-7分';
            startScoreField &&
              startScoreField.setValidator({
                minimum: 6,
                maximum: 7,
                required: true,
              });
            endScoreField &&
              endScoreField.setValidator({
                minimum: 6,
                maximum: 7,
                required: true,
              });
          } else if (itemValue === '未按约定及时供货,采购主体使用情况较差') {
            field.value = '<6分';
            startScoreField &&
              startScoreField.setValidator({
                minimum: 0,
                maximum: 6,
                required: true,
              });
            endScoreField &&
              endScoreField.setValidator({
                minimum: 0,
                maximum: 6,
                required: true,
              });
          }
          endScoreField && endScoreField.setPattern('disabled');
        }
      }
    });
  });

  const onClick = () => {
    let dialog2 = FormDialog(
      {
        title: '选择供方',
        footer: null,
        keyboard: false,
        maskClosable: false,
        width: 550,
      },
      (form2) => {
        return (
          <>
            <ProviderDialog form={form2} dialog={dialog2} />
            <FormDialog.Footer>
              <FormButtonGroup gutter={16} align={'right'}>
                <Button onClick={() => dialog2.close()}>取消</Button>
                <LoadingButton
                  onClick={async () => {
                    const values = await form2.submit();
                    if (values) {
                      form.setValues({
                        providerId: values.provider.id,
                        providerName: values.provider.name,
                      });
                      dialog2.close();
                    }
                  }}
                  type={'primary'}
                >
                  确定
                </LoadingButton>
              </FormButtonGroup>
            </FormDialog.Footer>
          </>
        );
      },
    );
    dialog2.open({});
  };

  return (
    <ConfigProvider locale={zhCN}>
      <Form form={form}>
        <SchemaField>
          <SchemaField.Void
            x-component="FormGrid"
            x-component-props={{ maxColumns: 4, strictAutoFit: true }}
          >
            <SchemaField.String
              name="deptName"
              required
              title="所属部门"
              x-component="Input"
              x-decorator="FormItem"
              x-decorator-props={{ gridSpan: 2 }}
            />
            <SchemaField.String
              name="displayName"
              required
              title="申请人"
              x-decorator="FormItem"
              x-component="Input"
            />
            <SchemaField.String
              name="createDate"
              required
              title="创建时间"
              x-decorator="FormItem"
              x-component="DatePicker"
              x-component-props={{ format: 'YYYY-M-D' }}
            />
            <SchemaField.String
              name="providerName"
              required
              title="供方名称"
              x-component="InputButton"
              x-decorator="FormItem"
              x-decorator-props={{ gridSpan: 2 }}
              x-component-props={{ onClick: onClick }}
            />
            <SchemaField.String
              name="type"
              required
              title="项目类别"
              x-decorator="FormItem"
              x-component="Radio.Group"
              enum={[
                { label: '民用产业项目', value: '民用产业项目' },
                { label: '自筹资金项目', value: '自筹资金项目' },
                { label: '技改项目', value: '技改项目' },
              ]}
              x-component-props={{ onChange: onChange }}
              x-decorator-props={{ gridSpan: 2 }}
            />
          </SchemaField.Void>
          <SchemaField.Array
            name="providerScore2List"
            x-decorator="FormItem"
            x-component="ArrayTable"
            x-component-props={{
              size: 'small',
              pagination: { pageSize: 200 },
              sticky: true,
            }}
          >
            <SchemaField.Object>
              <SchemaField.Void
                x-component="ArrayTable.Column"
                x-component-props={{
                  width: 80,
                  title: '序号',
                  align: 'center',
                }}
              >
                <SchemaField.Void
                  x-decorator="FormItem"
                  x-component="ArrayTableIndex"
                />
              </SchemaField.Void>
              <SchemaField.Void
                x-component="ArrayTable.Column"
                x-component-props={{ title: '评价指标', align: 'center' }}
              >
                <SchemaField.String
                  name="kpi"
                  x-decorator="FormItem"
                  x-component="PreviewText.Input"
                />
              </SchemaField.Void>
              <SchemaField.Void
                x-component="ArrayTable.Column"
                x-component-props={{ title: '评分项', align: 'center' }}
              >
                <SchemaField.String
                  name="item"
                  required
                  x-decorator="FormItem"
                  x-component="Select"
                />
              </SchemaField.Void>
              <SchemaField.Void
                x-component="ArrayTable.Column"
                x-component-props={{
                  width: 100,
                  title: '得分标准',
                  align: 'center',
                }}
              >
                <SchemaField.String
                  name="standard"
                  x-decorator="FormItem"
                  x-component="PreviewText.Input"
                />
              </SchemaField.Void>
              <SchemaField.Void
                x-component="ArrayTable.Column"
                x-component-props={{ width: 100, title: '初评得分' }}
              >
                <SchemaField.Number
                  x-decorator="FormItem"
                  required
                  name="startScore"
                  x-component="NumberPicker"
                />
              </SchemaField.Void>
              <SchemaField.Void
                x-component="ArrayTable.Column"
                x-component-props={{
                  width: 100,
                  title: (
                    <span>
                      专业审查
                      <br />
                      部门打分
                    </span>
                  ),
                }}
              >
                <SchemaField.Number
                  x-decorator="FormItem"
                  name="endScore"
                  x-component="NumberPicker"
                />
              </SchemaField.Void>
            </SchemaField.Object>
          </SchemaField.Array>
        </SchemaField>
      </Form>
    </ConfigProvider>
  );
};
