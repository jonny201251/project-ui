import {
  ArrayTable,
  Checkbox,
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
} from '@formily/antd';
import { createSchemaField } from '@formily/react';
import React, { useEffect } from 'react';
import zhCN from 'antd/lib/locale/zh_CN';
import { Button, ConfigProvider, Divider, message } from 'antd';
import { session } from '../../utils';
import {
  ArrayTableAddition,
  ArrayTableIndex,
  ArrayTableRemove,
  File,
  Line,
  LoadingButton,
  MyCard,
  NumberPicker,
} from '../../components';
import DialogList from './DialogList';
import DialogList2 from './DialogList2';
import { SearchOutlined } from '@ant-design/icons';
import styles from '../table-placeholder.less';
import { onFieldReact } from '@formily/core';
import DialogList4 from '../SmallProject/DialogList4';

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

const InputButton3 = (props) => {
  return (
    <div style={{ display: 'inline-flex', width: '100%' }}>
      <Input {...props} style={{ ...props.style }} />
      <Button
        onClick={(e) => {
          if (props.onClick) {
            props.onClick('open', props.type);
          }
        }}
        style={{ marginLeft: 5 }}
      >
        查看历史
      </Button>
    </div>
  );
};

const InputButton4 = (props) => {
  return (
    <div style={{ display: 'inline-flex', width: '100%' }}>
      <Input {...props} style={{ ...props.style }} disabled />
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
    FormItem,
    FormLayout,
    Input,
    DatePicker,
    Radio,
    FormGrid,
    NumberPicker,
    Checkbox,
    PreviewText,
    Select,
    InputButton,
    ArrayTable,
    ArrayTableIndex,
    ArrayTableRemove,
    ArrayTableAddition,
    MyCard,
    Divider,
    InputButton3,
    Line,
    File,
    InputButton4,
  },
});

let map = new Map();
map.set(
  '资金来源',
  ['国拨', '自筹', '地方政府', '贷款', '外资投资', '其他'].map((item) => ({
    label: item,
    value: item,
  })),
);
map.set(
  '资金落实情况',
  ['是', '否'].map((item) => ({ label: item, value: item })),
);
map.set(
  '付款方式',
  ['进度付款', '节点付款', '开工前一次性付款', '完工后一次性付款'].map(
    (item) => ({ label: item, value: item }),
  ),
);
map.set(
  '垫资额度(万元)',
  ['无垫资', '占比10%以内', '占比20%以内', '占比20%及以上'].map((item) => ({
    label: item,
    value: item,
  })),
);
map.set(
  '垫资期限/周期(日历天)',
  ['无垫资', '半年以内', '一年以内', '两年以内', '两年及以上'].map((item) => ({
    label: item,
    value: item,
  })),
);
map.set(
  '项目周期',
  ['', '', '', '', '', ''].map((item) => ({ label: item, value: item })),
);
map.set(
  '项目类型',
  ['综合体', '市政工程', '园区', '小区', '其他'].map((item) => ({
    label: item,
    value: item,
  })),
);
map.set(
  '公司角色',
  ['总包', '分包'].map((item) => ({ label: item, value: item })),
);
map.set(
  '项目模式',
  ['EPC', '其他'].map((item) => ({ label: item, value: item })),
);
map.set(
  '履约保证金比例',
  ['10%(含)以下', '10%以上'].map((item) => ({ label: item, value: item })),
);
map.set(
  '质保金比例',
  ['3%(含)以下', '3%以上'].map((item) => ({ label: item, value: item })),
);
map.set(
  '标前项目进度',
  ['未开工', '开工进度10%以内', '开工进度30%以内', '开工进度30%及以上'].map(
    (item) => ({ label: item, value: item }),
  ),
);
map.set(
  '一类项目条件',
  ['具备条件', '不具备条件'].map((item) => ({ label: item, value: item })),
);
map.set(
  '其他因素',
  ['无其他因素', '有其他因素'].map((item) => ({ label: item, value: item })),
);
map.set(
  '项目评分',
  ['--'].map((item) => ({ label: item, value: item })),
);
map.set(
  '否决项',
  ['是', '否'].map((item) => ({ label: item, value: item })),
);

map.set(
  '客户角色',
  ['业主', '总包', '其他'].map((item) => ({ label: item, value: item })),
);
map.set(
  '客户企业性质',
  [
    '集团所属企业',
    '地级市以上政府',
    '国企',
    '县级以下政府',
    '民企',
    '其他',
  ].map((item) => ({ label: item, value: item })),
);
map.set(
  '业主企业性质',
  [
    '集团所属企业',
    '地级市以上政府',
    '国企',
    '县级以下政府',
    '民企',
    '其他',
  ].map((item) => ({ label: item, value: item })),
);
map.set(
  '客户(业主)评分',
  ['--'].map((item) => ({ label: item, value: item })),
);

map.set(
  '企业性质',
  ['集团所属企业', '国企', '民企', '其他'].map((item) => ({
    label: item,
    value: item,
  })),
);
map.set(
  '战略伙伴评分',
  ['--'].map((item) => ({ label: item, value: item })),
);

export default (props) => {
  let { form, type } = props;

  useEffect(async () => {
    form
      .query('*(displayName,deptName,createDatetime,powerDesc,powerCode)')
      .forEach((field) => {
        field.setPattern('disabled');
      });
    form
      .query('remark2')
      .take()
      ?.setState({
        pattern: 'readOnly',
        value:
          '1.评分权重\n' +
          '(一)：项目、客户（业主）评分占比为 6:4；(二)：项目、客户（业主）、战略伙伴评分占比为 4:2:4。\n' +
          '2.评估结论\n' +
          '评分 90 分（含）以上为低风险项目；评分 70 分（含）以上为中等风险项目；评分 70 分以下为高风险项目',
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

      form.query('list2').take().value = [
        {
          desc1: '资金来源',
          scoreDesc:
            '国拨得分 8～10；自筹、地方政府得分 6～8；贷款、外资投资得分0～6；其他 0～8',
        },
        {
          desc1: '资金落实情况',
          scoreDesc: '落实到位得分 7～12；未落实得分0～6',
        },
        {
          desc1: '付款方式',
          scoreDesc:
            '进度、节点付款得分 5～11；开工前一次性付款得满12分；完工后一次性付款得分 0～8',
        },
        {
          desc1: '垫资额度(万元)',
          scoreDesc:
            '无垫资得满10分；垫资额占合同额比值(简称占比)10%以内得分 7～9；占比 20%以内得分 5～6；占比20%及以上得分 0～4',
        },
        {
          desc1: '垫资期限/周期(日历天)',
          scoreDesc:
            '无垫资得满8分；半年以内得分 6～7；一年以内得分 4～5；两年以内得分 2～3；两年及以上得分 0～1',
        },
        {
          desc1: '项目周期',
          scoreDesc: '根据项目周期与工程量的匹配程度视情评分',
        },
        {
          desc1: '项目类型',
          scoreDesc: '综合体、市政工程得分 4～5；园区、小区及其他得分 0～4',
        },
        { desc1: '公司角色', scoreDesc: '总包得分 4～5；分包得分 0～4' },
        { desc1: '项目模式', scoreDesc: 'EPC 得分 1～4；其他得分 2～5' },
        {
          desc1: '履约保证金比例',
          scoreDesc: '10%(含)以下得分 4～6；10%以上得分 0～3',
        },
        {
          desc1: '质保金比例',
          scoreDesc: '3%(含)以下得分 2～3；3%以上得分 0～2',
        },
        {
          desc1: '标前项目进度',
          scoreDesc:
            '未开工得满5分；开工进度 10%以内得分 3～4；开工进度 30%以内得分 2～3；开工进度 30%及以上得分 0～2',
        },
        { desc1: '一类项目条件', scoreDesc: '具备条件得满8分；否则得 0 分' },
        { desc1: '其他因素', scoreDesc: '无其他因素得满5分；有其他因素适情评' },
        { desc1: '项目评分', scoreDesc: '  ' },
        { desc1: '否决项', scoreDesc: 'PPP、BT、BOT类项目；评分低于60分' },
      ].map((obj) => ({
        desc1: obj.desc1,
        standard: ' ',
        scoreDesc: obj.scoreDesc,
      }));

      form.query('list3').take().value = [
        {
          desc1: '客户角色',
          scoreDesc: '业主得分 8～10；总包得分 5～8；其他 0～8',
        },
        {
          desc1: '客户企业性质',
          scoreDesc:
            '集团所属企业、地级市以上政府得分 8～10；国企、县级以下政府得分 6～9；民企得分 3～8；其他得分 0～7',
        },
        {
          desc1: '客户注册时间',
          scoreDesc: '一年以下得分 0～1；两年以下得分 1～2；两年及以上得满分',
        },
        {
          desc1: '标的金额/客户注册资本',
          scoreDesc:
            '政府部门得满分；比值≤1 得分8～10；比值≤5 得分 5～7；比值＞5 得分 0～4',
        },
        {
          desc1: '客户诉讼/失信事项',
          scoreDesc:
            '无相关事项得满分；近一年内有相关事项得分 0～6；近三年内有相关事项得分 0～8；近五年内有相关事项得分 0～9',
        },
        {
          desc1: '客户股权出质比例',
          scoreDesc:
            '未出质得满分；比例 1/3 以下得分 7～9；比例 2/3 以下得分 4～6；比例 2/3 及以上得分 0～3',
        },
        {
          desc1: '业主企业性质',
          scoreDesc:
            '集团所属企业、地级市以上政府得分 8～10；国企、县级以下政府得分 6～9；民企得分 3～8；其他得分 0～7',
        },
        {
          desc1: '业主注册时间',
          scoreDesc: '一年以下得分 0～1；两年以下得分 1～2；两年及以上得满分',
        },
        {
          desc1: '标的金额/业主注册资本',
          scoreDesc:
            '政府部门得满分；比值≤1 得分8～10；比值≤5 得分 5～7；比值＞5 得分 0～4',
        },
        {
          desc1: '业主诉讼/失信事项',
          scoreDesc:
            '无相关事项得满分；近一年内有相关事项得分 0～6；近三年内有相关事项得分 0～8；近五年内有相关事项得分 0～9',
        },
        {
          desc1: '业主股权出质比例',
          scoreDesc:
            '未出质得满分；比例 1/3 以下得分 7～9；比例 2/3 以下得分 4～6；比例 2/3 及以上得分 0～3',
        },
        {
          desc1: '其他因素',
          scoreDesc: '无其他因素得满分；有其他因素适情评分',
        },
        { desc1: '客户(业主)评分', scoreDesc: '  ' },
        {
          desc1: '否决项',
          scoreDesc: '集团、三院、公司黑灰名单；评分低于 60 分',
        },
      ].map((obj) => ({
        desc1: obj.desc1,
        standard: ' ',
        scoreDesc: obj.scoreDesc,
      }));

      form.query('list4').take().value = [
        {
          desc1: '企业性质',
          scoreDesc: '集团所属企业、国企 8～12；民企得分 3～10；其他得分 0～9',
        },
        {
          desc1: '注册时间',
          scoreDesc:
            '一年以下得分 0～1；两年以下得分 1～3；两年及以上得分 3～5',
        },
        {
          desc1: '标的金额/注册资本',
          scoreDesc: '比值≤1 得分 16～20；比值≤5 得分 10～15；比值＞5 得分 0～',
        },
        {
          desc1: '公司实缴金额/注册资本',
          scoreDesc: '评分值按照比值乘以分值计算(四舍五入取整)',
        },
        {
          desc1: '诉讼/失信事项',
          scoreDesc:
            '无相关事项得满分；近一年内有相关事项得分 0～10；近三年内有相关事项得分 0～12；近五年内有相关事项得分 0～14',
        },
        {
          desc1: '合作业绩',
          scoreDesc:
            '无合作业绩得分 0～4；有一项得分 3～5；有三项以下得分 6～9；有三项及以上得分 10～1',
        },
        {
          desc1: '项目实施能力',
          scoreDesc:
            '具备项目直接实施能力得分 8～10；不具备项目直接实施能力得分 0～5',
        },
        {
          desc1: '其他因素',
          scoreDesc: '无其他因素得满分；有其他因素适情评分',
        },
        { desc1: '战略伙伴评分', scoreDesc: '  ' },
        {
          desc1: '否决项',
          scoreDesc: '集团、三院、公司黑灰名单；评分低于 60 分',
        },
      ].map((obj) => ({
        desc1: obj.desc1,
        standard: ' ',
        scoreDesc: obj.scoreDesc,
      }));

      let list4Field = form.query('list4').take();
      list4Field?.setDisplay('none');
    }
  }, []);

  form.addEffects('id', () => {
    onFieldReact('providerName', (field) => {
      let value = field.value;
      let list4Field = form.query('list4').take();
      if (value) {
        list4Field?.setDisplay('visible');
        form
          .query('list4.*(0,1,2,3,4,5,6,7,8,9).score')
          .forEach((field) => field.setPattern('disabled'));
      } else {
        list4Field?.setDisplay('none');
      }
    });

    onFieldReact('havePower', (field) => {
      let value = field.value;
      if (value) {
        if (value === '是') {
          form.query('*(powerDesc,timeLimitTmp)').forEach((fieldd) =>
            fieldd.setState({
              required: true,
              pattern: 'editable',
            }),
          );
        } else {
          form.query('*(powerDesc,timeLimitTmp)').forEach((fieldd) =>
            fieldd.setState({
              required: false,
              pattern: 'disabled',
              value: null,
            }),
          );
        }
      }
    });

    onFieldReact('list2.*.desc2', (field) => {
      let desc1Value = field.query('.desc1').get('value');
      if (desc1Value) {
        field.dataSource = map.get(desc1Value);
      }
      //
      let scoreField = field.query('.score').take();
      let standardField = field.query('.standard').take();
      if (desc1Value === '垫资额度(万元)') {
        field.setComponent('Input');
        standardField && standardField.setValue('0-10分');
      } else if (desc1Value === '垫资期限/周期(日历天)') {
        field.setComponent('Input');
        standardField && standardField.setValue('0-8分');
      } else if (desc1Value === '项目周期') {
        field.setComponent('Input');
        standardField && standardField.setValue('0-6分');
      } else if (desc1Value === '履约保证金比例') {
        field.setComponent('Input');
        standardField && standardField.setValue('0-6分');
      } else if (desc1Value === '质保金比例') {
        field.setComponent('Input');
        standardField && standardField.setValue('0-3分');
      } else if (desc1Value === '一类项目条件') {
        field.setComponent('Input', {
          addonBefore: '毛利润率估算:',
          addonAfter: '%',
        });
        standardField && standardField.setValue('0-8分');
      } else if (desc1Value === '其他因素') {
        field.setComponent('Input');
        standardField && standardField.setValue('0-5分');
      } else if (desc1Value === '项目评分') {
        field.setValue('--');
        standardField && standardField.setValue('0-100分');
      } else if (desc1Value === '否决项') {
        standardField && standardField.setValue('--');
      }
      scoreField?.setPattern('disabled');
    });
    onFieldReact('list2.*.standard', (field) => {
      let desc1Value = field.query('.desc1').get('value');
      let desc2Value = field.query('.desc2').get('value');
      if (desc2Value) {
        let desc2Field = field.query('.desc2').take();
        let scoreField = field.query('.score').take();
        // scoreField && scoreField.setValue(null)
        if (desc1Value === '资金来源') {
          if (desc2Value === '国拨') {
            field.value = '8-10分';
          } else if (desc2Value === '自筹' || desc2Value === '地方政府') {
            field.value = '6-8分';
          } else if (desc2Value === '贷款' || desc2Value === '外资投资') {
            field.value = '0-6分';
          } else if (desc2Value === '其他') {
            field.value = '0-8分';
          }
        } else if (desc1Value === '资金落实情况') {
          if (desc2Value === '是') {
            field.value = '7-12分';
          } else {
            field.value = '0-6分';
          }
        } else if (desc1Value === '付款方式') {
          if (desc2Value === '进度付款' || desc2Value === '节点付款') {
            field.value = '5-11分';
          } else if (desc2Value === '开工前一次性付款') {
            field.value = '12分';
          } else if (desc2Value === '完工后一次性付款') {
            field.value = '0-8分';
          } else if (desc2Value === '') {
            field.value = '0-8分';
          }
        } /*else if (desc1Value === '垫资额度(万元)') {
          scoreField && scoreField.setValidator({ minimum: 0, maximum: 10, required: true })
        } else if (desc1Value === '垫资期限/周期(日历天)') {
          scoreField && scoreField.setValidator({ minimum: 0, maximum: 8, required: true })
        } else if (desc1Value === '项目周期') {
          scoreField && scoreField.setValidator({ minimum: 0, maximum: 6, required: true })
        } */ else if (desc1Value === '项目类型') {
          if (desc2Value === '综合体' || desc2Value === '市政工程') {
            field.value = '4-5分';
          } else if (
            desc2Value === '园区' ||
            desc2Value === '小区' ||
            desc2Value === '其他'
          ) {
            field.value = '0-4分';
          }
        } else if (desc1Value === '公司角色') {
          if (desc2Value === '总包') {
            field.value = '4-5分';
          } else if (desc2Value === '分包') {
            field.value = '0-4分';
          }
        } else if (desc1Value === '项目模式') {
          if (desc2Value === 'EPC') {
            field.value = '1-4分';
          } else if (desc2Value === '其他') {
            field.value = '2-5分';
          }
        } else if (desc1Value === '标前项目进度') {
          if (desc2Value === '未开工') {
            field.value = '5分';
          } else if (desc2Value === '开工进度10%以内') {
            field.value = '3-4分';
          } else if (desc2Value === '开工进度30%以内') {
            field.value = '2-3分';
          } else if (desc2Value === '开工进度30%及以上') {
            field.value = '0-2分';
          }
        }
      }
    });
    onFieldReact('list2.*(0,1,2,3,4,5,6,7,8,9,10,11,12,13).score', (field) => {
      let sum = 0;
      form
        .query('list2.*(0,1,2,3,4,5,6,7,8,9,10,11,12,13).score')
        .forEach((field) => {
          if (field.value) {
            sum += field.value;
          }
        });
      let tmp = form.query('list2.14.score').take();
      if (tmp && sum) {
        tmp.setState({ value: sum, pattern: 'disabled' });
      }
    });

    onFieldReact('list3.*.desc2', (field) => {
      let desc1Value = field.query('.desc1').get('value');
      if (desc1Value) {
        field.dataSource = map.get(desc1Value);
      }
      //
      let scoreField = field.query('.score').take();
      let standardField = field.query('.standard').take();
      if (desc1Value === '客户注册时间') {
        field.setComponent('DatePicker');
        standardField && standardField.setValue('0-3分');
      } else if (desc1Value === '标的金额/客户注册资本') {
        field.setComponent('Input', { placeholder: '示例：3000万/10000万' });
        standardField && standardField.setValue('0-10分');
      } else if (desc1Value === '客户诉讼/失信事项') {
        field.setComponent('Input');
        standardField && standardField.setValue('0-10分');
      } else if (desc1Value === '客户股权出质比例') {
        field.setComponent('Input');
        standardField && standardField.setValue('0-10分');
      } else if (desc1Value === '业主注册时间') {
        field.setComponent('DatePicker');
        standardField && standardField.setValue('0-3分');
      } else if (desc1Value === '标的金额/业主注册资本') {
        field.setComponent('Input', { placeholder: '示例：3000万/10000万' });
        standardField && standardField.setValue('0-10分');
      } else if (desc1Value === '业主诉讼/失信事项') {
        field.setComponent('Input');
        standardField && standardField.setValue('0-10分');
      } else if (desc1Value === '业主股权出质比例') {
        field.setComponent('Input');
        standardField && standardField.setValue('0-10分');
      } else if (desc1Value === '其他因素') {
        field.setComponent('Input');
        standardField && standardField.setValue('0-4分');
      } else if (desc1Value === '客户(业主)评分') {
        field.setValue('--');
        standardField && standardField.setValue('0-100分');
      } else if (desc1Value === '否决项') {
        standardField && standardField.setValue('--');
      }
      scoreField?.setPattern('disabled');
    });
    onFieldReact('list3.*.standard', (field) => {
      let desc1Value = field.query('.desc1').get('value');
      let desc2Value = field.query('.desc2').get('value');
      if (desc2Value) {
        let desc2Field = field.query('.desc2').take();
        let scoreField = field.query('.score').take();
        // scoreField && scoreField.setValue(null)
        if (desc1Value === '客户角色') {
          if (desc2Value === '业主') {
            field.value = '8-10分';
          } else if (desc2Value === '总包') {
            field.value = '5-8分';
          } else if (desc2Value === '其他') {
            field.value = '0-8分';
          }
        } else if (
          desc1Value === '客户企业性质' ||
          desc1Value === '业主企业性质'
        ) {
          if (
            desc2Value === '集团所属企业' ||
            desc2Value === '地级市以上政府'
          ) {
            field.value = '8-10分';
          } else if (desc2Value === '国企' || desc2Value === '县级以下政府') {
            field.value = '6-9分';
          } else if (desc2Value === '民企') {
            field.value = '3-8分';
          } else if (desc2Value === '其他') {
            field.value = '0-7分';
          }
        }
      }
    });
    onFieldReact('list3.*(0,1,2,3,4,5,6,7,8,9,10,11).score', (field) => {
      let sum = 0;
      form
        .query('list3.*(0,1,2,3,4,5,6,7,8,9,10,11).score')
        .forEach((field) => {
          if (field.value) {
            sum += field.value;
          }
        });
      let tmp = form.query('list3.12.score').take();
      if (tmp && sum) {
        tmp.setState({ value: sum, pattern: 'disabled' });
      }
    });

    onFieldReact('list4.*.desc2', (field) => {
      let desc1Value = field.query('.desc1').get('value');
      if (desc1Value) {
        field.dataSource = map.get(desc1Value);
      }
      //
      let scoreField = field.query('.score').take();
      let standardField = field.query('.standard').take();
      if (desc1Value === '注册时间') {
        field.setComponent('DatePicker');
        standardField && standardField.setValue('0-5分');
      } else if (desc1Value === '标的金额/注册资本') {
        field.setComponent('Input');
        standardField && standardField.setValue('0-10分');
      } else if (desc1Value === '公司实缴金额/注册资本') {
        field.setComponent('Input');
        standardField && standardField.setValue('0-10分');
      } else if (desc1Value === '诉讼/失信事项') {
        field.setComponent('Input');
        standardField && standardField.setValue('0-16分');
      } else if (desc1Value === '合作业绩') {
        field.setComponent('Input');
        standardField && standardField.setValue('0-12分');
      } else if (desc1Value === '项目实施能力') {
        field.setComponent('Input');
        standardField && standardField.setValue('0-10分');
      } else if (desc1Value === '其他因素') {
        field.setComponent('Input');
        standardField && standardField.setValue('0-4分');
      } else if (desc1Value === '战略伙伴评分') {
        field.setValue('--');
        scoreField?.setPattern('readOnly');
        standardField && standardField.setValue('0-100分');
      } else if (desc1Value === '否决项') {
        standardField && standardField.setValue('--');
      }
    });
    onFieldReact('list4.*.standard', (field) => {
      let desc1Value = field.query('.desc1').get('value');
      let desc2Value = field.query('.desc2').get('value');
      if (desc2Value) {
        let desc2Field = field.query('.desc2').take();
        let scoreField = field.query('.score').take();
        // scoreField && scoreField.setValue(null)
        if (desc1Value === '企业性质') {
          if (desc2Value === '集团所属企业' || desc2Value === '国企') {
            field.value = '8-12分';
          } else if (desc2Value === '民企') {
            field.value = '3-10分';
          } else if (desc2Value === '其他') {
            field.value = '0-9分';
          }
        }
      }
    });
    onFieldReact('list4.*(0,1,2,3,4,5,6,7).score', (field) => {
      let sum = 0;
      form.query('list4.*(0,1,2,3,4,5,6,7).score').forEach((field) => {
        if (field.value) {
          sum += field.value;
        }
      });
      let tmp = form.query('list4.8.score').take();
      if (tmp && sum) {
        tmp.setState({ value: sum, pattern: 'disabled' });
      }
    });
  });

  const onClick = (flag) => {
    if (flag === 'open') {
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

  const onClick2 = (flag) => {
    if (flag === 'open') {
      let dialog2 = FormDialog(
        { footer: null, keyboard: false, maskClosable: false, width: 800 },
        (form2) => {
          return (
            <>
              <DialogList2
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
                          providerId: values.selectedRow.id,
                          providerName: values.selectedRow.name,
                          providerUsee: values.selectedRow.usee,
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

  const onClick4 = (flag) => {
    if (flag === 'open') {
      let dialog2 = FormDialog(
        { footer: null, keyboard: false, maskClosable: false, width: 1000 },
        (form2) => {
          return (
            <>
              <DialogList4
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
                          taskCode: values.selectedRow.taskCode,
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

  return (
    <ConfigProvider locale={zhCN}>
      <Form form={form} labelWidth={130} className={styles.placeholder}>
        <SchemaField>
          <SchemaField.Void
            x-component="FormGrid"
            x-component-props={{ maxColumns: 4, strictAutoFit: true }}
          >
            <SchemaField.String
              name="displayName"
              title="申请人"
              x-component="Input"
              x-decorator="FormItem"
            />
            <SchemaField.String
              name="deptName"
              title="申请部门"
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
              name="name"
              required
              title="项目名称"
              x-decorator="FormItem"
              x-component="Input"
              x-decorator-props={{ gridSpan: 2 }}
            />
            <SchemaField.String
              name="projectLevel"
              required
              title="项目密级"
              x-decorator="FormItem"
              x-component="Select"
              enum={[
                { label: '非密', value: '非密' },
                { label: '内部', value: '内部' },
                { label: '秘密', value: '秘密' },
                { label: '机密', value: '机密' },
              ]}
            />
          </SchemaField.Void>
          <SchemaField.Void
            x-component="FormGrid"
            x-component-props={{ maxColumns: 4, strictAutoFit: true }}
          >
            <SchemaField.String
              name="taskCode"
              required
              title="任务号"
              x-decorator="FormItem"
              x-component="InputButton4"
              x-component-props={{ onClick: onClick4 }}
            />
            <SchemaField.String
              name="projectRate"
              required
              title="项目毛利率"
              x-decorator="FormItem"
              x-component="Input"
              x-component-props={{ placeholder: '示例：3%' }}
            />
            <SchemaField.String
              name="location"
              required
              title="项目地点"
              x-decorator="FormItem"
              x-component="Input"
              x-decorator-props={{ gridSpan: 2 }}
            />
            <SchemaField.String
              name="projectUser1"
              required
              title="项目经理"
              x-decorator="FormItem"
              x-component="Input"
            />
            <SchemaField.String
              name="projectUser2"
              required
              title="项目负责人"
              x-decorator="FormItem"
              x-component="Input"
            />
            <SchemaField.String
              name="haveMerge"
              required
              title="军民融合项目"
              x-decorator="FormItem"
              x-component="Radio.Group"
              enum={[
                { label: '是', value: '是' },
                { label: '否', value: '否' },
              ]}
            />
          </SchemaField.Void>
          <SchemaField.Void
            x-component="FormGrid"
            x-component-props={{ maxColumns: 4, strictAutoFit: true }}
          >
            <SchemaField.String
              name="customerName"
              required
              title="客户名称"
              x-decorator="FormItem"
              x-decorator-props={{ gridSpan: 2 }}
              x-component="InputButton"
              x-component-props={{ onClick: onClick }}
            />
            <SchemaField.String
              name="providerName"
              title="战略伙伴名称"
              x-decorator="FormItem"
              x-decorator-props={{ gridSpan: 2 }}
              x-component="InputButton"
              x-component-props={{ onClick: onClick2 }}
            />
            <SchemaField.String
              name="owerName"
              title="业主名称"
              x-decorator="FormItem"
              x-decorator-props={{ gridSpan: 2 }}
              x-component="Input"
            />
            <SchemaField.String
              name="idTypeListTmp"
              required
              title="法人身份证类型"
              x-decorator="FormItem"
              x-component="Checkbox.Group"
              x-decorator-props={{ gridSpan: 4 }}
              enum={[
                { label: '身份证原件', value: '身份证原件' },
                { label: '身份证电子版', value: '身份证电子版' },
                { label: '身份证复印件', value: '身份证复印件' },
                { label: '不使用', value: '不使用' },
              ]}
            />
            <SchemaField.String
              name="expectMoney"
              required
              title="预计签约金额"
              x-decorator="FormItem"
              x-component="NumberPicker"
              x-component-props={{
                addonAfter: '元',
                formatter: (value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
              }}
            />
            <SchemaField.String
              name="expectDate"
              required
              title="预计投标日期"
              x-decorator="FormItem"
              x-component="DatePicker"
            />
            <SchemaField.String
              name="invoiceType"
              title="发票类型"
              required
              x-decorator="FormItem"
              x-component="Select"
              enum={[
                { label: '增值税专票', value: '增值税专票' },
                { label: '增值税普票', value: '增值税普票' },
              ]}
            />
            <SchemaField.String
              name="invoiceRate"
              required
              title="发票税率"
              x-decorator="FormItem"
              x-component="Select"
              enum={[
                { label: '0', value: '0' },
                { label: '1%', value: '1%' },
                { label: '3%', value: '3%' },
                { label: '6%', value: '6%' },
                { label: '9%', value: '9%' },
                { label: '13%', value: '13%' },
              ]}
            />
          </SchemaField.Void>
          <SchemaField.Void
            x-component="FormGrid"
            x-component-props={{ maxColumns: 4, strictAutoFit: true }}
          >
            <SchemaField.Array
              name="list"
              title={'保证金(函)'}
              x-decorator="FormItem"
              x-component="ArrayTable"
              x-decorator-props={{ gridSpan: 2 }}
              x-component-props={{ size: 'small', sticky: true }}
            >
              <SchemaField.Object>
                <SchemaField.Void
                  x-component="ArrayTable.Column"
                  x-component-props={{
                    title: '保证金(函)类型',
                    align: 'center',
                  }}
                >
                  <SchemaField.String
                    name="type"
                    required
                    x-decorator="FormItem"
                    x-component="Select"
                    enum={[
                      { label: '投标保证金/函', value: '投标保证金/函' },
                      { label: '质量保证金/函', value: '质量保证金/函' },
                      { label: '工资保证金/函', value: '工资保证金/函' },
                      { label: '履约保证金/函', value: '履约保证金/函' },
                    ]}
                  />
                </SchemaField.Void>
                <SchemaField.Void
                  x-component="ArrayTable.Column"
                  x-component-props={{
                    title: '保证金(函)额度',
                    align: 'center',
                  }}
                >
                  <SchemaField.String
                    name="money"
                    required
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
          </SchemaField.Void>
          <SchemaField.Void
            x-component="FormGrid"
            x-component-props={{ maxColumns: 4, strictAutoFit: true }}
          >
            <SchemaField.String
              name="havePower"
              required
              title="是否授权"
              x-decorator="FormItem"
              x-component="Radio.Group"
              enum={[
                { label: '是', value: '是' },
                { label: '否', value: '否' },
              ]}
            />
            <SchemaField.String
              name="powerCode"
              title="授权号"
              x-decorator="FormItem"
              x-component="Input"
            />
          </SchemaField.Void>
          <SchemaField.Void
            x-component="FormGrid"
            x-component-props={{ maxColumns: 4, strictAutoFit: true }}
          >
            <SchemaField.String
              name="powerDesc"
              title="授权内容"
              x-component="Input.TextArea"
              x-decorator-props={{ gridSpan: 2 }}
              x-component-props={{ rows: 2 }}
              x-decorator="FormItem"
            />
            <SchemaField.String
              name="timeLimitTmp"
              required
              title="授权期限"
              x-component="DatePicker.RangePicker"
              x-decorator="FormItem"
              x-decorator-props={{ tooltip: '双击鼠标进行选择', gridSpan: 2 }}
            />
          </SchemaField.Void>
          <SchemaField.Void
            x-component="FormGrid"
            x-component-props={{ maxColumns: 4, strictAutoFit: true }}
          >
            <SchemaField.String
              name="fileList"
              title="附件"
              x-decorator="FormItem"
              x-component="File"
              x-decorator-props={{ gridSpan: 2 }}
            />
          </SchemaField.Void>
          <SchemaField.Void
            x-component="FormGrid"
            x-component-props={{ maxColumns: 4, strictAutoFit: true }}
          >
            <SchemaField.String
              name="remark"
              title="备注"
              x-component="Input.TextArea"
              x-decorator-props={{ gridSpan: 2 }}
              x-component-props={{ rows: 2 }}
              x-decorator="FormItem"
            />
          </SchemaField.Void>

          <SchemaField.Array
            name="list2"
            x-decorator="FormItem"
            x-component="ArrayTable"
            x-component-props={{
              size: 'small',
              pagination: { pageSize: 200 },
              sticky: true,
              title: () => (
                <div style={{ textAlign: 'center', fontWeight: 'bolder' }}>
                  项目评估
                </div>
              ),
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
                x-component-props={{
                  width: 200,
                  title: '项目情况',
                  align: 'center',
                  colSpan: 2,
                }}
              >
                <SchemaField.String
                  name="desc1"
                  x-decorator="FormItem"
                  x-component="PreviewText.Input"
                />
              </SchemaField.Void>
              <SchemaField.Void
                x-component="ArrayTable.Column"
                x-component-props={{
                  width: 220,
                  title: '项目情况',
                  align: 'center',
                  colSpan: 0,
                }}
              >
                <SchemaField.String
                  name="desc2"
                  required
                  x-decorator="FormItem"
                  x-component="Select"
                />
              </SchemaField.Void>
              <SchemaField.Void
                x-component="ArrayTable.Column"
                x-component-props={{
                  width: 100,
                  title: '分值',
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
                  title: '评分',
                  align: 'center',
                }}
              >
                <SchemaField.Number
                  x-decorator="FormItem"
                  name="score"
                  x-component="NumberPicker"
                />
              </SchemaField.Void>
              <SchemaField.Void
                x-component="ArrayTable.Column"
                x-component-props={{ title: '评估标准' }}
              >
                <SchemaField.String
                  name="scoreDesc"
                  x-decorator="FormItem"
                  x-component="PreviewText.Input"
                />
              </SchemaField.Void>
            </SchemaField.Object>
          </SchemaField.Array>

          <SchemaField.Array
            name="list3"
            x-decorator="FormItem"
            x-component="ArrayTable"
            x-component-props={{
              size: 'small',
              pagination: { pageSize: 200 },
              sticky: true,
              title: () => (
                <div style={{ textAlign: 'center', fontWeight: 'bolder' }}>
                  客户(业主)评估
                </div>
              ),
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
                x-component-props={{
                  width: 200,
                  title: '客户(业主)情况',
                  align: 'center',
                  colSpan: 2,
                }}
              >
                <SchemaField.String
                  name="desc1"
                  x-decorator="FormItem"
                  x-component="PreviewText.Input"
                />
              </SchemaField.Void>
              <SchemaField.Void
                x-component="ArrayTable.Column"
                x-component-props={{
                  width: 220,
                  title: '客户(业主)情况',
                  align: 'center',
                  colSpan: 0,
                }}
              >
                <SchemaField.String
                  name="desc2"
                  required
                  x-decorator="FormItem"
                  x-component="Select"
                />
              </SchemaField.Void>
              <SchemaField.Void
                x-component="ArrayTable.Column"
                x-component-props={{
                  width: 100,
                  title: '分值',
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
                  title: '评分',
                  align: 'center',
                }}
              >
                <SchemaField.Number
                  x-decorator="FormItem"
                  name="score"
                  x-component="NumberPicker"
                />
              </SchemaField.Void>
              <SchemaField.Void
                x-component="ArrayTable.Column"
                x-component-props={{ title: '评估标准' }}
              >
                <SchemaField.String
                  name="scoreDesc"
                  x-decorator="FormItem"
                  x-component="PreviewText.Input"
                />
              </SchemaField.Void>
            </SchemaField.Object>
          </SchemaField.Array>

          <SchemaField.Array
            name="list4"
            x-decorator="FormItem"
            x-component="ArrayTable"
            x-component-props={{
              size: 'small',
              pagination: { pageSize: 200 },
              sticky: true,
              title: () => (
                <div style={{ textAlign: 'center', fontWeight: 'bolder' }}>
                  战略伙伴评估
                </div>
              ),
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
                x-component-props={{
                  width: 200,
                  title: '战略伙伴情况',
                  align: 'center',
                  colSpan: 2,
                }}
              >
                <SchemaField.String
                  name="desc1"
                  x-decorator="FormItem"
                  x-component="PreviewText.Input"
                />
              </SchemaField.Void>
              <SchemaField.Void
                x-component="ArrayTable.Column"
                x-component-props={{
                  width: 220,
                  title: '战略伙伴情况',
                  align: 'center',
                  colSpan: 0,
                }}
              >
                <SchemaField.String
                  name="desc2"
                  required
                  x-decorator="FormItem"
                  x-component="Select"
                />
              </SchemaField.Void>
              <SchemaField.Void
                x-component="ArrayTable.Column"
                x-component-props={{
                  width: 100,
                  title: '分值',
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
                  title: '评分',
                  align: 'center',
                }}
              >
                <SchemaField.Number
                  x-decorator="FormItem"
                  name="score"
                  x-component="NumberPicker"
                />
              </SchemaField.Void>
              <SchemaField.Void
                x-component="ArrayTable.Column"
                x-component-props={{ title: '评估标准' }}
              >
                <SchemaField.String
                  name="scoreDesc"
                  x-decorator="FormItem"
                  x-component="PreviewText.Input"
                />
              </SchemaField.Void>
            </SchemaField.Object>
          </SchemaField.Array>

          <SchemaField.Void
            x-component="FormGrid"
            x-component-props={{ maxColumns: 4, strictAutoFit: true }}
          >
            <SchemaField.String
              name="remark2"
              title="说明"
              x-component="Input.TextArea"
              x-decorator-props={{ gridSpan: 4 }}
              x-component-props={{ rows: 4 }}
              x-decorator="FormItem"
            />
          </SchemaField.Void>
        </SchemaField>
      </Form>
    </ConfigProvider>
  );
};
