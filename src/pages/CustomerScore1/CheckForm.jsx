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
  Checkbox,
} from '@formily/antd';
import { createSchemaField } from '@formily/react';
import React, { useEffect } from 'react';
import zhCN from 'antd/lib/locale/zh_CN';
import { Button, ConfigProvider, message, Tabs } from 'antd';
import {
  ArrayTableIndex,
  LoadingButton,
  NumberPicker,
  Text,
  InputButton,
  File,
  OnlyButton,
} from '../../components';
import { onFieldReact } from '@formily/core';
import ProcessDesignGraph from '../ProcessDesignGraph';
import ProcessInstNodeList from '../ProcessInstNode/List';
import { get, customerPath, session } from '../../utils';
import DialogList from './DialogList';
import _ from 'lodash';

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
    Radio,
    Checkbox,
    Text,
    InputButton,
    File,
    OnlyButton,
  },
});

let map = new Map();
map.set(
  '企业性质',
  ['国有军工系统企业', '国有其他企业', '民营等企业'].map((item) => ({
    label: item,
    value: item,
  })),
);
map.set(
  '注册资本',
  ['注册资本≥1000万', '1000万>注册资本≥300万', '注册资本<300万'].map(
    (item) => ({ label: item, value: item }),
  ),
);
map.set(
  '资产负债率情况',
  ['负债率≤50%(较低)', '50%<负债率≤75%(一般)', '75%<负债率(较高)'].map(
    (item) => ({ label: item, value: item }),
  ),
);
map.set(
  '是否经营风险性项目(比如期货、股票交易或价格波动较大的产品)',
  [
    '没有',
    '有，但资金占用很小，不超过 流动资产的 20%',
    '有且规模较大或为主营业务',
  ].map((item) => ({ label: item, value: item })),
);
map.set(
  '不良记录情况(比如恶意欠款，恶意因质量问题拒付客户账款、法院裁决、被法院强制执行信息、其他)',
  ['无', '有，但体量小，有争议', '有，影响较大'].map((item) => ({
    label: item,
    value: item,
  })),
);
map.set(
  '已实施项目中客户的付款情况',
  [
    '按约定付款，非常及时',
    '催促后基本能够按时付款',
    '拖欠时间较长，付款较难',
  ].map((item) => ({ label: item, value: item })),
);
map.set(
  '付款结算周期',
  ['周期短(一个月内)', '周期中等(1-3个月)', '周期长(超3个月)'].map((item) => ({
    label: item,
    value: item,
  })),
);
map.set(
  '回款及时率',
  ['按约定回款', '不超过约定3个月', '超过约定3个月'].map((item) => ({
    label: item,
    value: item,
  })),
);
map.set(
  '账目清晰程度',
  ['清晰', '比较清晰', '不清晰'].map((item) => ({ label: item, value: item })),
);
map.set(
  '其他信誉情况',
  ['信誉高', '信誉中等', '信誉差'].map((item) => ({
    label: item,
    value: item,
  })),
);

export default (props) => {
  let { form, record, type, haveEditForm } = props;

  useEffect(async () => {
    if (haveEditForm === '否') {
      form.setPattern('disabled');
      form.query('comment').take()?.setPattern('editable');
    }
  }, []);

  form.addEffects('id', () => {
    onFieldReact('list.*.item', (field) => {
      if (session.getItem('user').loginName !== '宋思奇') {
        field.query('.endScore').take()?.setPattern('disabled');
      }
      let kpiValue = field.query('.kpi').get('value');
      if (kpiValue) {
        field.dataSource = map.get(kpiValue);
      }
    });
    onFieldReact('list.*.standard', (field) => {
      let kpiValue = field.query('.kpi').get('value');
      let itemValue = field.query('.item').get('value');
      if (itemValue) {
        let startScoreField = field.query('.startScore').take();
        let endScoreField = field.query('.endScore').take();

        // startScoreField && startScoreField.setValue(null)

        if (kpiValue === '企业性质') {
          if (itemValue === '国有军工系统企业') {
            field.value = '9-10分';
            startScoreField &&
              startScoreField.setValidator({
                minimum: 9,
                maximum: 10,
                required: true,
              });
            // endScoreField && endScoreField.setValidator({ minimum: 9, maximum: 10, required: true })
          } else if (itemValue === '国有其他企业') {
            field.value = '6-8分';
            startScoreField &&
              startScoreField.setValidator({
                minimum: 6,
                maximum: 8,
                required: true,
              });
            // endScoreField && endScoreField.setValidator({ minimum: 6, maximum: 8, required: true })
          } else if (itemValue === '民营等企业') {
            field.value = '<6分';
            startScoreField &&
              startScoreField.setValidator({
                minimum: 0,
                maximum: 6,
                required: true,
              });
            // endScoreField && endScoreField.setValidator({ minimum: 0, maximum: 6, required: true })
          }
          if (session.getItem('user').loginName !== '宋思奇') {
            endScoreField?.setPattern('disabled');
          }
        }
        if (kpiValue === '注册资本') {
          if (itemValue === '注册资本≥1000万') {
            field.value = '9-10分';
            startScoreField &&
              startScoreField.setValidator({
                minimum: 9,
                maximum: 10,
                required: true,
              });
            // endScoreField && endScoreField.setValidator({ minimum: 9, maximum: 10, required: true })
          } else if (itemValue === '1000万>注册资本≥300万') {
            field.value = '6-8分';
            startScoreField &&
              startScoreField.setValidator({
                minimum: 6,
                maximum: 8,
                required: true,
              });
            // endScoreField && endScoreField.setValidator({ minimum: 6, maximum: 8, required: true })
          } else if (itemValue === '注册资本<300万') {
            field.value = '<6分';
            startScoreField &&
              startScoreField.setValidator({
                minimum: 0,
                maximum: 6,
                required: true,
              });
            // endScoreField && endScoreField.setValidator({ minimum: 0, maximum: 6, required: true })
          }
          if (session.getItem('user').loginName !== '宋思奇') {
            endScoreField?.setPattern('disabled');
          }
        }
        if (kpiValue === '资产负债率情况') {
          if (itemValue === '负债率≤50%(较低)') {
            field.value = '9-10分';
            startScoreField &&
              startScoreField.setValidator({
                minimum: 9,
                maximum: 10,
                required: true,
              });
            // endScoreField && endScoreField.setValidator({ minimum: 9, maximum: 10, required: true })
          } else if (itemValue === '50%<负债率≤75%(一般)') {
            field.value = '6-8分';
            startScoreField &&
              startScoreField.setValidator({
                minimum: 6,
                maximum: 8,
                required: true,
              });
            // endScoreField && endScoreField.setValidator({ minimum: 6, maximum: 8, required: true })
          } else if (itemValue === '75%<负债率(较高)') {
            field.value = '<6分';
            startScoreField &&
              startScoreField.setValidator({
                minimum: 0,
                maximum: 6,
                required: true,
              });
            // endScoreField && endScoreField.setValidator({ minimum: 0, maximum: 6, required: true })
          }
        }
        if (
          kpiValue ===
          '是否经营风险性项目(比如期货、股票交易或价格波动较大的产品)'
        ) {
          if (itemValue === '没有') {
            field.value = '9-10分';
            startScoreField &&
              startScoreField.setValidator({
                minimum: 9,
                maximum: 10,
                required: true,
              });
            // endScoreField && endScoreField.setValidator({ minimum: 9, maximum: 10, required: true })
          } else if (
            itemValue === '有，但资金占用很小，不超过 流动资产的 20%'
          ) {
            field.value = '6-8分';
            startScoreField &&
              startScoreField.setValidator({
                minimum: 6,
                maximum: 8,
                required: true,
              });
            // endScoreField && endScoreField.setValidator({ minimum: 6, maximum: 8, required: true })
          } else if (itemValue === '有且规模较大或为主营业务') {
            field.value = '<6分';
            startScoreField &&
              startScoreField.setValidator({
                minimum: 0,
                maximum: 6,
                required: true,
              });
            // endScoreField && endScoreField.setValidator({ minimum: 0, maximum: 6, required: true })
          }
        }
        if (
          kpiValue ===
          '不良记录情况(比如恶意欠款，恶意因质量问题拒付客户账款、法院裁决、被法院强制执行信息、其他)'
        ) {
          if (itemValue === '无') {
            field.value = '9-10分';
            startScoreField &&
              startScoreField.setValidator({
                minimum: 9,
                maximum: 10,
                required: true,
              });
            // endScoreField && endScoreField.setValidator({ minimum: 9, maximum: 10, required: true })
          } else if (itemValue === '有，但体量小，有争议') {
            field.value = '6-8分';
            startScoreField &&
              startScoreField.setValidator({
                minimum: 6,
                maximum: 8,
                required: true,
              });
            // endScoreField && endScoreField.setValidator({ minimum: 6, maximum: 8, required: true })
          } else if (itemValue === '有，影响较大') {
            field.value = '<6分';
            startScoreField &&
              startScoreField.setValidator({
                minimum: 0,
                maximum: 6,
                required: true,
              });
            // endScoreField && endScoreField.setValidator({ minimum: 0, maximum: 6, required: true })
          }
        }
        if (kpiValue === '已实施项目中客户的付款情况') {
          if (itemValue === '按约定付款，非常及时') {
            field.value = '9-10分';
            startScoreField &&
              startScoreField.setValidator({
                minimum: 9,
                maximum: 10,
                required: true,
              });
            // endScoreField && endScoreField.setValidator({ minimum: 9, maximum: 10, required: true })
          } else if (itemValue === '催促后基本能够按时付款') {
            field.value = '6-8分';
            startScoreField &&
              startScoreField.setValidator({
                minimum: 6,
                maximum: 8,
                required: true,
              });
            // endScoreField && endScoreField.setValidator({ minimum: 6, maximum: 8, required: true })
          } else if (itemValue === '拖欠时间较长，付款较难') {
            field.value = '<6分';
            startScoreField &&
              startScoreField.setValidator({
                minimum: 0,
                maximum: 6,
                required: true,
              });
            // endScoreField && endScoreField.setValidator({ minimum: 0, maximum: 6, required: true })
          }
        }
        if (kpiValue === '付款结算周期') {
          if (itemValue === '周期短(一个月内)') {
            field.value = '9-10分';
            startScoreField &&
              startScoreField.setValidator({
                minimum: 9,
                maximum: 10,
                required: true,
              });
            // endScoreField && endScoreField.setValidator({ minimum: 9, maximum: 10, required: true })
          } else if (itemValue === '周期中等(1-3个月)') {
            field.value = '6-8分';
            startScoreField &&
              startScoreField.setValidator({
                minimum: 6,
                maximum: 8,
                required: true,
              });
            // endScoreField && endScoreField.setValidator({ minimum: 6, maximum: 8, required: true })
          } else if (itemValue === '周期长(超3个月)') {
            field.value = '<6分';
            startScoreField &&
              startScoreField.setValidator({
                minimum: 0,
                maximum: 6,
                required: true,
              });
            // endScoreField && endScoreField.setValidator({ minimum: 0, maximum: 6, required: true })
          }
        }
        if (kpiValue === '回款及时率') {
          if (itemValue === '按约定回款') {
            field.value = '9-10分';
            startScoreField &&
              startScoreField.setValidator({
                minimum: 9,
                maximum: 10,
                required: true,
              });
            // endScoreField && endScoreField.setValidator({ minimum: 9, maximum: 10, required: true })
          } else if (itemValue === '不超过约定3个月') {
            field.value = '6-8分';
            startScoreField &&
              startScoreField.setValidator({
                minimum: 6,
                maximum: 8,
                required: true,
              });
            // endScoreField && endScoreField.setValidator({ minimum: 6, maximum: 8, required: true })
          } else if (itemValue === '超过约定3个月') {
            field.value = '<6分';
            startScoreField &&
              startScoreField.setValidator({
                minimum: 0,
                maximum: 6,
                required: true,
              });
            // endScoreField && endScoreField.setValidator({ minimum: 0, maximum: 6, required: true })
          }
        }
        if (kpiValue === '账目清晰程度') {
          if (itemValue === '清晰') {
            field.value = '9-10分';
            startScoreField &&
              startScoreField.setValidator({
                minimum: 9,
                maximum: 10,
                required: true,
              });
            // endScoreField && endScoreField.setValidator({ minimum: 9, maximum: 10, required: true })
          } else if (itemValue === '比较清晰') {
            field.value = '6-8分';
            startScoreField &&
              startScoreField.setValidator({
                minimum: 6,
                maximum: 8,
                required: true,
              });
            // endScoreField && endScoreField.setValidator({ minimum: 6, maximum: 8, required: true })
          } else if (itemValue === '不清晰') {
            field.value = '<6分';
            startScoreField &&
              startScoreField.setValidator({
                minimum: 0,
                maximum: 6,
                required: true,
              });
            // endScoreField && endScoreField.setValidator({ minimum: 0, maximum: 6, required: true })
          }
        }
        if (kpiValue === '其他信誉情况') {
          if (itemValue === '信誉高') {
            field.value = '9-10分';
            startScoreField &&
              startScoreField.setValidator({
                minimum: 9,
                maximum: 10,
                required: true,
              });
            // endScoreField && endScoreField.setValidator({ minimum: 9, maximum: 10, required: true })
          } else if (itemValue === '信誉中等') {
            field.value = '6-8分';
            startScoreField &&
              startScoreField.setValidator({
                minimum: 6,
                maximum: 8,
                required: true,
              });
            // endScoreField && endScoreField.setValidator({ minimum: 6, maximum: 8, required: true })
          } else if (itemValue === '信誉差') {
            field.value = '<6分';
            startScoreField &&
              startScoreField.setValidator({
                minimum: 0,
                maximum: 6,
                required: true,
              });
            // endScoreField && endScoreField.setValidator({ minimum: 0, maximum: 6, required: true })
          }
        }
      }
    });

    onFieldReact('list.*.startScore', (field) => {
      let sum = 0,
        num = 0;
      form.query('list.*.startScore').forEach((field) => {
        if (field.value) {
          sum += field.value;
          num += 1;
        }
      });
      let tmp = form.query('startScore').take();
      let tmp2 = form.query('startResult').take();
      if (tmp && sum) {
        tmp.value = sum;
        //
        let r = sum / (num * 10);
        console.log(sum + '--' + r);
        if (r >= 0.9) {
          tmp2.value = '优秀';
        } else if (r >= 0.8 && r < 0.9) {
          tmp2.value = '良好';
        } else if (r >= 0.6 && r < 0.8) {
          tmp2.value = '一般';
        } else {
          tmp2.value = '不良';
        }
      }
    });

    onFieldReact('list.*.endScore', (field) => {
      let sum = 0,
        num = 0;
      form.query('list.*.endScore').forEach((field) => {
        if (field.value) {
          sum += field.value;
          num += 1;
        }
      });
      let tmp = form.query('endScore').take();
      let tmp2 = form.query('endResult').take();
      let tmp3 = form.query('result').take();
      if (tmp && sum) {
        tmp.value = sum;
        //
        let r = sum / (num * 10);
        if (r >= 0.9) {
          tmp2.value = '优秀';
          tmp3.value = '优秀';
        } else if (r >= 0.8 && r < 0.9) {
          tmp2.value = '良好';
          tmp3.value = '良好';
        } else if (r >= 0.6 && r < 0.8) {
          tmp2.value = '一般';
          tmp3.value = '一般';
        } else {
          tmp2.value = '不良';
          tmp3.value = '不良';
        }
      }
    });
  });

  const onClick = () => {
    if (haveEditForm === '否') {
      return;
    }
    let dialog2 = FormDialog(
      { footer: null, keyboard: false, maskClosable: false, width: 800 },
      (form2) => {
        return (
          <>
            <DialogList
              form={form2}
              dialog={dialog2}
              selectedId={form.values.customerId}
            />
            <FormDialog.Footer>
              <FormButtonGroup gutter={16} align={'right'}>
                <Button onClick={() => dialog2.close()}>取消</Button>
                <LoadingButton
                  onClick={async () => {
                    const values = await form2.submit();
                    if (values.selectedRow) {
                      form.setValues({
                        customerId: values.selectedRow.id,
                        customerName: values.selectedRow.name,
                        customerProperty: values.selectedRow.property,
                      });
                      dialog2.close();
                    } else {
                      message.error('选择一条数据');
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

  const showResult = () => {
    const user = session.getItem('user');
    if (user.loginName === '宋思奇') {
      return (
        <SchemaField.String
          name="result"
          required
          title={<b>最终结论</b>}
          x-decorator="FormItem"
          x-component="Select"
          enum={[
            { label: '优秀', value: '优秀' },
            { label: '良好', value: '良好' },
            { label: '一般', value: '一般' },
            { label: '不良', value: '不良' },
          ]}
        />
      );
    } else {
      return (
        <SchemaField.String
          name="result"
          title={<b>最终结论</b>}
          x-decorator="FormItem"
          x-component="Text"
        />
      );
    }
  };

  const showComment = () => {
    if (type === 'check') {
      return (
        <SchemaField.Void
          x-component="FormGrid"
          x-component-props={{ maxColumns: 2, strictAutoFit: true }}
        >
          <SchemaField.String
            name="comment"
            title="审批意见"
            x-decorator="FormItem"
            x-component="Input.TextArea"
            x-component-props={{ placeholder: '请输入意见' }}
          />
        </SchemaField.Void>
      );
    }
  };

  const onChange = (e) => {
    let value = e.target.value;
    let field = form.query('list').take();
    if (field) {
      if (value === '是') {
        field.value = [
          '企业性质',
          '注册资本',
          '资产负债率情况',
          '是否经营风险性项目(比如期货、股票交易或价格波动较大的产品)',
          '不良记录情况(比如恶意欠款，恶意因质量问题拒付客户账款、法院裁决、被法院强制执行信息、其他)',
          // '已实施项目中客户的付款情况', '付款结算周期', '回款及时率', '账目清晰程度', '其他信誉情况',
        ].map((item) => ({ kpi: item, standard: ' ' }));
      } else {
        field.value = [
          '企业性质',
          '注册资本',
          '资产负债率情况',
          '是否经营风险性项目(比如期货、股票交易或价格波动较大的产品)',
          '不良记录情况(比如恶意欠款，恶意因质量问题拒付客户账款、法院裁决、被法院强制执行信息、其他)',
          '已实施项目中客户的付款情况',
          '付款结算周期',
          '回款及时率',
          '账目清晰程度',
          '其他信誉情况',
        ].map((item) => ({ kpi: item, standard: ' ' }));
      }
    }
  };

  const onClick2 = async () => {
    const dbRecord = await get(customerPath.get, { id: record.customerId });
    if (dbRecord) {
      let dialog = FormDialog(
        {
          title: '查看',
          footer: null,
          keyboard: false,
          maskClosable: false,
          width: 520,
        },
        (form) => {
          form.setValues(dbRecord);
          return (
            <>
              <customerPath.Form
                form={form}
                type={'view'}
                record={dbRecord}
                dialog={dialog}
              />
            </>
          );
        },
      );
      dialog.open();
    }
  };

  return (
    <ConfigProvider locale={zhCN}>
      <Tabs animated={false} size={'small'}>
        <Tabs.TabPane tab="表单数据" key="1">
          <Form form={form} labelWidth={120}>
            <SchemaField>
              <SchemaField.Void
                x-component="FormGrid"
                x-component-props={{ maxColumns: 3, strictAutoFit: true }}
              >
                <SchemaField.String
                  name="displayName"
                  title="申请人"
                  x-decorator="FormItem"
                  x-component="Input"
                />
                <SchemaField.String
                  name="deptName"
                  title="部门"
                  x-component="Input"
                  x-decorator="FormItem"
                />
                <SchemaField.String
                  name="createDatetime"
                  title="申请时间"
                  x-decorator="FormItem"
                  x-component="Input"
                />
                <SchemaField.String
                  name="customerName"
                  required
                  title="客户名称"
                  x-component="InputButton"
                  x-decorator="FormItem"
                  x-component-props={{ onClick: onClick }}
                  x-decorator-props={{ gridSpan: 2 }}
                />
                <SchemaField.String
                  title="客户信息"
                  x-decorator="FormItem"
                  x-component="OnlyButton"
                  x-component-props={{ onClick: onClick2, name: '查看' }}
                />
              </SchemaField.Void>
              <SchemaField.Void
                x-component="MyCard"
                x-component-props={{ title: '与客户合作业务说明' }}
              >
                <SchemaField.Void
                  x-component="FormGrid"
                  x-component-props={{ maxColumns: 3, strictAutoFit: true }}
                >
                  <SchemaField.String
                    name="desc1"
                    required
                    title="客户主营业务"
                    x-component="Input.TextArea"
                    x-decorator="FormItem"
                    x-decorator-props={{ gridSpan: 2 }}
                  />
                  <SchemaField.String
                    name="desc2Tmp"
                    required
                    title="合作业务类型"
                    x-component="Checkbox.Group"
                    x-decorator="FormItem"
                    x-decorator-props={{ gridSpan: 2 }}
                    enum={[
                      { label: '工程类', value: '工程类' },
                      { label: '购销类', value: '购销类' },
                      { label: '服务类', value: '服务类' },
                      { label: '其他类', value: '其他类' },
                    ]}
                  />
                  <SchemaField.String
                    name="desc3"
                    required
                    title="是否首次合作"
                    x-component="Radio.Group"
                    x-component-props={{ onChange: onChange }}
                    x-decorator="FormItem"
                    x-decorator-props={{ gridSpan: 2 }}
                    enum={[
                      { label: '是', value: '是' },
                      { label: '否', value: '否' },
                    ]}
                  />
                  <SchemaField.String
                    name="desc4"
                    title="客户其他情况"
                    x-decorator="FormItem"
                    x-decorator-props={{ gridSpan: 2 }}
                    x-component="Input.TextArea"
                    x-component-props={{ rows: 2 }}
                  />
                  <SchemaField.String
                    name="fileList"
                    title="附件"
                    x-decorator="FormItem"
                    x-component="File"
                    x-decorator-props={{ gridSpan: 2 }}
                  />
                </SchemaField.Void>
              </SchemaField.Void>
              <SchemaField.Array
                name="list"
                x-decorator="FormItem"
                x-component="ArrayTable"
                x-component-props={{
                  size: 'small',
                  pagination: { pageSize: 200 },
                  sticky: true,
                  footer: () =>
                    '初次评定打分时，部分没有发生的项目由业务人员根据了解的该企业与其他客户合作情况打分；完全不清楚的，一律打 4 分。',
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
                    x-component-props={{
                      width: 120,
                      title: '初评得分',
                      align: 'center',
                    }}
                  >
                    <SchemaField.Number
                      x-decorator="FormItem"
                      name="startScore"
                      x-component="NumberPicker"
                    />
                  </SchemaField.Void>
                  <SchemaField.Void
                    x-component="ArrayTable.Column"
                    x-component-props={{
                      width: 120,
                      title: (
                        <span>
                          专业审查
                          <br />
                          部门打分
                        </span>
                      ),
                      align: 'center',
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
              <SchemaField.Void
                x-component="FormGrid"
                x-component-props={{ maxColumns: 4, strictAutoFit: true }}
              >
                <SchemaField.Number
                  name="startScore"
                  title={<b>初评得分</b>}
                  x-decorator="FormItem"
                  x-component="PreviewText.Input"
                />
                <SchemaField.Number
                  name="startResult"
                  title={<b>初评等级</b>}
                  x-decorator="FormItem"
                  x-component="PreviewText.Input"
                />
                <SchemaField.Number
                  name="endScore"
                  title={<b>部门打分</b>}
                  x-decorator="FormItem"
                  x-component="PreviewText.Input"
                />
                <SchemaField.Number
                  name="endResult"
                  title={<b>部门等级</b>}
                  x-decorator="FormItem"
                  x-component="PreviewText.Input"
                />
                {showResult()}
              </SchemaField.Void>
              {showComment()}
            </SchemaField>
          </Form>
        </Tabs.TabPane>
        <Tabs.TabPane tab="审批记录" key="3">
          <ProcessInstNodeList processInstId={record.processInstId} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="流程图" key="2">
          <ProcessDesignGraph processInstId={record.processInstId} />
        </Tabs.TabPane>
      </Tabs>
    </ConfigProvider>
  );
};
