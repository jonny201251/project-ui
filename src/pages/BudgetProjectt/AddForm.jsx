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
  Radio,
  Select,
} from '@formily/antd';
import { createSchemaField } from '@formily/react';
import {
  ArrayTableAddition,
  ArrayTableIndex,
  ArrayTableRemove,
  File,
  LoadingButton,
  MyInput,
  NumberPicker,
} from '../../components';
import { session } from '../../utils';
import DialogList from '../ProjectProtect/DialogList';
import styles from '../table-placeholder.less';
import { Button, ConfigProvider, message } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import React, { useEffect } from 'react';
import { onFieldReact } from '@formily/core';
import { SearchOutlined } from '@ant-design/icons';

const InputButton = (props) => {
  return (
    <div style={{ display: 'inline-flex', width: '100%' }}>
      <Input {...props} style={{ ...props.style }} />
      <Button
        onClick={(e) => {
          if (props.onClick) {
            props.onClick('open');
          }
        }}
        icon={<SearchOutlined />}
        type={'primary'}
      />
    </div>
  );
};

const SchemaField = createSchemaField({
  components: {
    FormLayout,
    FormItem,
    Input,
    FormGrid,
    ArrayTable,
    ArrayTableAddition,
    ArrayTableIndex,
    ArrayTableRemove,
    LoadingButton,
    InputButton,
    NumberPicker,
    Select,
    DatePicker,
    Radio,
    File,
    MyInput,
  },
});

export default (props) => {
  let { form, type, haveEditForm } = props;

  useEffect(async () => {
    form
      .query(
        '*(invoiceRate,displayName,deptName,createDatetime,totalCost,endMoney,inChangeMoney,outChangeMoney,customerName,inSum,outSum,projectRate)',
      )
      .forEach((field) => {
        field.setPattern('disabled');
      });
    if (type === 'add') {
      const user = session.getItem('user');
      form.setInitialValues({
        createDatetime: new Date().Format('yyyy-MM-dd hh:mm:ss'),
        displayName: user.displayName,
        displayNamee: user.displayName,
        loginName: user.loginName,
        deptId: user.deptId,
        deptName: user.deptName,
      });
    }
  }, []);

  const onClick = (flag) => {
    if (type === 'edit') return;
    if (flag === 'open') {
      let dialog2 = FormDialog(
        { footer: null, keyboard: false, maskClosable: false, width: 950 },
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
                          projectId: values.selectedRow.id,
                          projectType: values.selectedRow.projectType,
                          name: values.selectedRow.name,
                          taskCode: values.selectedRow.taskCode,
                          customerId: values.selectedRow.customerId,
                          customerName: values.selectedRow.customerName,
                          projectRatee: values.selectedRow.projectRate,
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
    }
  };

  form.addEffects('id', () => {
    onFieldReact('innList.*.rate', (field) => {
      let rate = [];
      form.query('innList.*.rate').forEach((field) => {
        if (field.value) {
          rate.push(field.value);
        }
      });
      if (rate.length > 0) {
        form
          .query('invoiceRate')
          .take()
          ?.setState({ value: rate.join('，') });
      }
    });

    onFieldReact('innList.*.money', (field) => {
      let inSum = 0;
      form.query('innList.*.money').forEach((field) => {
        if (field.value) {
          inSum += field.value;
        }
      });
      let tmp = form.query('inSum').take();
      if (tmp && inSum) {
        tmp.setState({ value: inSum.toFixed(2), pattern: 'disabled' });
      }
      //
      let outSum = 0;
      form.query('outList.*.money').forEach((field) => {
        if (field.value) {
          outSum += field.value;
        }
      });
      if (inSum > 0 && outSum > 0) {
        let rate = (inSum - outSum) / inSum;
        rate = (rate * 100).toFixed(2) + '%';
        form.query('projectRate').take()?.setState({ value: rate });
      }
    });

    onFieldReact('outList.*.money', (field) => {
      let outSum = 0;
      form.query('outList.*.money').forEach((field) => {
        if (field.value) {
          outSum += field.value;
        }
      });
      let tmp = form.query('outSum').take();
      let tmp2 = form.query('totalCost').take();
      if (tmp && outSum) {
        tmp.setState({ value: outSum.toFixed(2), pattern: 'disabled' });
        tmp2.setState({ value: outSum.toFixed(2) });
      }
      //
      let inSum = 0;
      form.query('innList.*.money').forEach((field) => {
        if (field.value) {
          inSum += field.value;
        }
      });
      if (inSum > 0 && outSum > 0) {
        let rate = (inSum - outSum) / inSum;
        rate = (rate * 100).toFixed(2) + '%';
        form.query('projectRate').take()?.setState({ value: rate });
      }
    });

    onFieldReact('innList.*.inType', (field) => {
      let rateField = field.query('.rate').take();
      let remarkField = field.query('.remark').take();
      if (field.value) {
        if (field.value === '其他') {
          rateField && rateField.setRequired(false);
          remarkField && remarkField.setRequired(true);
        } else {
          rateField && rateField.setRequired(true);
          remarkField && remarkField.setRequired(false);
        }
      }
    });

    onFieldReact('outList.*.outType', (field) => {
      let rateField = field.query('.rate').take();
      let remarkField = field.query('.remark').take();
      if (field.value) {
        if (field.value === '其他') {
          rateField && rateField.setRequired(false);
          remarkField && remarkField.setRequired(true);
        } else if (
          field.value === '采购费' ||
          field.value === '劳务费' ||
          field.value === '技术服务费' ||
          field.value === '维修款' ||
          field.value === '工程款'
        ) {
          rateField && rateField.setRequired(true);
          remarkField && remarkField.setRequired(false);
        } else {
          rateField && rateField.setRequired(false);
          remarkField && remarkField.setRequired(false);
        }
      }
    });
  });

  const showHaveThree = () => {
    const user = session.getItem('user');
    let projectType = form.getValuesIn('projectType');
    if (projectType === '重大项目' && user.displayName === '于欣坤')
      return (
        <SchemaField.String
          name="haveThree"
          required
          title="三个审批"
          x-component="Radio.Group"
          x-decorator="FormItem"
          x-decorator-props={{
            gridSpan: 2,
            tooltip: '财务总监、总经理、董事长审批',
          }}
          enum={[
            { label: '是', value: '是' },
            { label: '否', value: '否' },
          ]}
        />
      );
  };

  return (
    <ConfigProvider locale={zhCN}>
      <Form form={form} labelWidth={110} className={styles.placeholder}>
        <SchemaField>
          <SchemaField.Void
            x-component="FormGrid"
            x-component-props={{ maxColumns: 3, strictAutoFit: true }}
          ></SchemaField.Void>
          <SchemaField.Void
            x-component="FormGrid"
            x-component-props={{ maxColumns: 3, strictAutoFit: true }}
          >
            <SchemaField.String
              name="name"
              required
              title="项目名称"
              x-decorator="FormItem"
              x-component="InputButton"
              x-component-props={{ onClick: onClick, rows: 2 }}
            />
            <SchemaField.String
              required
              name="taskCode"
              title="备案号"
              x-decorator="FormItem"
              x-component="MyInput"
            />
            <SchemaField.String
              name="projectLoginName"
              required
              title="项目负责人"
              x-decorator="FormItem"
              x-component="Select"
              x-component-props={{ showSearch: true }}
              enum={session.getItem('userList')}
            />
          </SchemaField.Void>
          <SchemaField.Void
            x-component="FormGrid"
            x-component-props={{ maxColumns: 3, strictAutoFit: true }}
          >
            <SchemaField.String
              name="contractName"
              required
              x-decorator="FormItem"
              title="收款合同名称"
              x-component="Input.TextArea"
              x-component-props={{ rows: 2 }}
            />
            <SchemaField.String
              name="contractCode"
              x-decorator="FormItem"
              title="收款合同编号"
              x-component="Input"
            />
            <SchemaField.Number
              name="contractMoney"
              required
              x-decorator="FormItem"
              title="收款合同金额"
              x-component="NumberPicker"
              x-component-props={{
                addonAfter: '元',
                formatter: (value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
              }}
            />
            <SchemaField.Number
              name="totalCost"
              required
              x-decorator="FormItem"
              title="成本总预算"
              x-component="NumberPicker"
              x-component-props={{
                addonAfter: '元',
                formatter: (value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
              }}
            />
            <SchemaField.String
              name="invoiceRate"
              x-decorator="FormItem"
              title="预计收入税率"
              x-component="Input"
            />
            <SchemaField.String
              name="projectRate"
              x-decorator="FormItem"
              title="预计利润率"
              x-component="Input"
            />
            <SchemaField.String
              name="protectRate"
              required
              x-decorator="FormItem"
              title="质保金比例"
              x-component="Input"
              x-component-props={{ placeholder: '示例：3%' }}
            />
            <SchemaField.String
              name="startDate"
              required
              x-decorator="FormItem"
              title="预计开工日期"
              x-component="DatePicker"
              x-component-props={{ format: 'YYYY-M-D' }}
            />
            <SchemaField.String
              name="endDate"
              required
              x-decorator="FormItem"
              title="预计完工日期"
              x-component="DatePicker"
              x-component-props={{ format: 'YYYY-M-D' }}
            />
            <SchemaField.String
              name="endMoney"
              x-decorator="FormItem"
              title="结算金额"
              x-component="Input"
            />
            <SchemaField.String
              name="inChangeMoney"
              x-decorator="FormItem"
              title="收入调整金额"
              x-component="Input"
            />
            <SchemaField.String
              name="outChangeMoney"
              x-decorator="FormItem"
              title="支出调整金额"
              x-component="Input"
            />
            <SchemaField.String
              name="customerName"
              x-decorator="FormItem"
              title="客户名称"
              x-component="Input"
              x-decorator-props={{ gridSpan: 2 }}
            />
            <SchemaField.String
              name="wbs"
              x-decorator="FormItem"
              title="WBS编号"
              x-component="Input"
            />
          </SchemaField.Void>
          <SchemaField.Void
            x-component="FormGrid"
            x-component-props={{ maxColumns: 3, strictAutoFit: true }}
          >
            <SchemaField.String
              name="displayName"
              title="申请人"
              x-component="Input"
              x-decorator="FormItem"
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
          </SchemaField.Void>

          <SchemaField.Array
            name="protectList"
            x-decorator="FormItem"
            x-component="ArrayTable"
            x-component-props={{
              size: 'small',
              sticky: true,
              title: () => <b>{'担保'}</b>,
            }}
          >
            <SchemaField.Object>
              <SchemaField.Void
                x-component="ArrayTable.Column"
                x-component-props={{ title: '名称', align: 'center' }}
              >
                <SchemaField.String
                  name="name"
                  x-decorator="FormItem"
                  x-component="Select"
                  enum={[
                    { label: '投标保证金', value: '投标保证金' },
                    { label: '履约保证金', value: '履约保证金' },
                    { label: '预付款担保', value: '预付款担保' },
                    { label: '其他担保', value: '其他担保' },
                  ]}
                />
              </SchemaField.Void>
              <SchemaField.Void
                x-component="ArrayTable.Column"
                x-component-props={{ title: '形式', align: 'center' }}
              >
                <SchemaField.String
                  name="style"
                  x-decorator="FormItem"
                  x-component="Select"
                  enum={[
                    { label: '无', value: '无' },
                    { label: '保函', value: '保函' },
                  ]}
                />
              </SchemaField.Void>
              <SchemaField.Void
                x-component="ArrayTable.Column"
                x-component-props={{ title: '金额', align: 'center' }}
              >
                <SchemaField.Number
                  name="money"
                  x-decorator="FormItem"
                  x-component="NumberPicker"
                  x-component-props={{
                    addonAfter: '元',
                    formatter: (value) =>
                      `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                  }}
                />
              </SchemaField.Void>
              <SchemaField.Void
                x-component="ArrayTable.Column"
                x-component-props={{ title: '支出日期', align: 'center' }}
              >
                <SchemaField.String
                  name="outDate"
                  x-decorator="FormItem"
                  x-component="DatePicker"
                  x-component-props={{ picker: 'month', format: 'YYYY-M' }}
                />
              </SchemaField.Void>
              <SchemaField.Void
                x-component="ArrayTable.Column"
                x-component-props={{ title: '收回/结束时间', align: 'center' }}
              >
                <SchemaField.String
                  name="inDate"
                  x-decorator="FormItem"
                  x-component="DatePicker"
                  x-component-props={{ picker: 'month', format: 'YYYY-M' }}
                />
              </SchemaField.Void>
              <SchemaField.Void
                x-component="ArrayTable.Column"
                x-component-props={{
                  width: 80,
                  title: '操作',
                  dataIndex: 'operations',
                }}
              >
                <SchemaField.Void x-component="FormItem">
                  <SchemaField.Void x-component="ArrayTableRemove" />
                </SchemaField.Void>
              </SchemaField.Void>
            </SchemaField.Object>
            <SchemaField.Void
              x-component="ArrayTableAddition"
              x-component-props={{ width: 80 }}
            />
          </SchemaField.Array>

          <SchemaField.Void
            x-component="FormGrid"
            x-component-props={{ maxColumns: 3, strictAutoFit: true }}
          >
            <SchemaField.Array
              name="innList"
              required
              x-decorator="FormItem"
              x-component="ArrayTable"
              x-decorator-props={{ gridSpan: 3 }}
              x-component-props={{
                size: 'small',
                sticky: true,
                title: () => <b>{'预计收入'}</b>,
              }}
            >
              <SchemaField.Object>
                <SchemaField.Void
                  x-component="ArrayTable.Column"
                  x-component-props={{ title: '收入类型', align: 'center' }}
                >
                  <SchemaField.String
                    name="inType"
                    x-decorator="FormItem"
                    x-component="Select"
                    enum={[
                      { label: '采购费', value: '采购费' },
                      { label: '劳务费', value: '劳务费' },
                      { label: '技术服务费', value: '技术服务费' },
                      { label: '维修款', value: '维修款' },
                      { label: '工程款', value: '工程款' },
                      { label: '其他', value: '其他' },
                    ]}
                  />
                </SchemaField.Void>

                <SchemaField.Void
                  x-component="ArrayTable.Column"
                  x-component-props={{
                    width: 120,
                    title: '税率',
                    align: 'center',
                  }}
                >
                  <SchemaField.String
                    name="rate"
                    x-decorator="FormItem"
                    x-component="Input"
                    x-component-props={{ placeholder: '示例：3%' }}
                  />
                </SchemaField.Void>

                <SchemaField.Void
                  x-component="ArrayTable.Column"
                  x-component-props={{ title: '金额', align: 'center' }}
                >
                  <SchemaField.Number
                    name="money"
                    x-decorator="FormItem"
                    x-component="NumberPicker"
                    x-component-props={{
                      addonAfter: '元',
                      formatter: (value) =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                    }}
                  />
                </SchemaField.Void>
                <SchemaField.Void
                  x-component="ArrayTable.Column"
                  x-component-props={{ title: '备注', align: 'center' }}
                >
                  <SchemaField.String
                    name="remark"
                    x-decorator="FormItem"
                    x-component="Input"
                  />
                </SchemaField.Void>
                <SchemaField.Void
                  x-component="ArrayTable.Column"
                  x-component-props={{
                    width: 80,
                    title: '操作',
                    dataIndex: 'operations',
                  }}
                >
                  <SchemaField.Void x-component="FormItem">
                    <SchemaField.Void x-component="ArrayTableRemove" />
                  </SchemaField.Void>
                </SchemaField.Void>
              </SchemaField.Object>
              <SchemaField.Void
                x-component="ArrayTableAddition"
                x-component-props={{ width: 80 }}
              />
            </SchemaField.Array>
            <SchemaField.Number
              name="inSum"
              title="预计收入累计"
              x-decorator="FormItem"
              x-component="NumberPicker"
              x-component-props={{
                formatter: (value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
              }}
            />

            <SchemaField.Array
              name="outList"
              required
              x-decorator="FormItem"
              x-component="ArrayTable"
              x-decorator-props={{ gridSpan: 3 }}
              x-component-props={{
                size: 'small',
                sticky: true,
                title: () => <b>{'预计支出'}</b>,
              }}
            >
              <SchemaField.Object>
                <SchemaField.Void
                  x-component="ArrayTable.Column"
                  x-component-props={{ title: '成本类型', align: 'center' }}
                >
                  <SchemaField.String
                    name="outType"
                    x-decorator="FormItem"
                    x-component="Select"
                    x-component-props={{ showSearch: true }}
                    enum={[
                      { label: '采购费', value: '采购费' },
                      { label: '劳务费', value: '劳务费' },
                      { label: '技术服务费', value: '技术服务费' },
                      { label: '维修款', value: '维修款' },
                      { label: '工程款', value: '工程款' },
                      { label: '税费', value: '税费' },
                      { label: '投标费用', value: '投标费用' },
                      { label: '现场管理费', value: '现场管理费' },
                      { label: '证书服务费', value: '证书服务费' },
                      { label: '资金成本', value: '资金成本' },
                      { label: '交易服务费', value: '交易服务费' },
                      { label: '交通费', value: '交通费' },
                      { label: '招待费', value: '招待费' },
                      { label: '评审费', value: '评审费' },
                      { label: '差旅费', value: '差旅费' },
                      { label: '其他', value: '其他' },
                    ]}
                  />
                </SchemaField.Void>
                <SchemaField.Void
                  x-component="ArrayTable.Column"
                  x-component-props={{
                    width: 120,
                    title: '税率',
                    align: 'center',
                  }}
                >
                  <SchemaField.String
                    name="rate"
                    x-decorator="FormItem"
                    x-component="Input"
                    x-component-props={{ placeholder: '示例：3%' }}
                  />
                </SchemaField.Void>
                <SchemaField.Void
                  x-component="ArrayTable.Column"
                  x-component-props={{ title: '金额', align: 'center' }}
                >
                  <SchemaField.Number
                    name="money"
                    x-decorator="FormItem"
                    x-component="NumberPicker"
                    x-component-props={{
                      addonAfter: '元',
                      formatter: (value) =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                    }}
                  />
                </SchemaField.Void>
                <SchemaField.Void
                  x-component="ArrayTable.Column"
                  x-component-props={{ title: '备注', align: 'center' }}
                >
                  <SchemaField.String
                    name="remark"
                    x-decorator="FormItem"
                    x-component="Input"
                  />
                </SchemaField.Void>
                <SchemaField.Void
                  x-component="ArrayTable.Column"
                  x-component-props={{
                    width: 80,
                    title: '操作',
                    dataIndex: 'operations',
                  }}
                >
                  <SchemaField.Void x-component="FormItem">
                    <SchemaField.Void x-component="ArrayTableRemove" />
                  </SchemaField.Void>
                </SchemaField.Void>
              </SchemaField.Object>
              <SchemaField.Void
                x-component="ArrayTableAddition"
                x-component-props={{ width: 80 }}
              />
            </SchemaField.Array>
            <SchemaField.Number
              name="outSum"
              title="预计支出累计"
              x-decorator="FormItem"
              x-component="NumberPicker"
              x-component-props={{
                formatter: (value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
              }}
            />
          </SchemaField.Void>

          <SchemaField.Void
            x-component="FormGrid"
            x-component-props={{ maxColumns: 3, strictAutoFit: true }}
          >
            <SchemaField.String
              name="fileList"
              required
              title="附件"
              x-decorator="FormItem"
              x-component="File"
              x-decorator-props={{
                gridSpan: 2,
                feedbackText: '上传 预算表',
              }}
            />
            <SchemaField.String
              name="userNamee"
              required
              title="财务部"
              x-decorator="FormItem"
              x-decorator-props={{ gridSpan: 2, tooltip: '流程审批节点' }}
              x-component="Select"
              x-component-props={{ showSearch: true }}
              enum={session.getItem('userList')}
            />
            {showHaveThree()}
            <SchemaField.String
              x-decorator-props={{ gridSpan: 2 }}
              name="remark"
              title="备注"
              x-decorator="FormItem"
              x-component="Input.TextArea"
              x-component-props={{ rows: 2 }}
            />
          </SchemaField.Void>
        </SchemaField>
      </Form>
    </ConfigProvider>
  );
};
