import React, { useEffect, useState } from 'react';
import { Button, Dropdown, Layout, Menu, Tabs } from 'antd';
import * as ICONS from '@ant-design/icons';
import {
  CloseOutlined,
  EditOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import './backLayout.less';
//全局样式
import './global.less';

import _ from 'lodash';
import { history, useModel } from 'umi';
import * as utils from '../utils';
import ChangePassword from './ChangePassword';

import MyList from '../pages/ProcessInst/MyList';
import MyList2 from '../pages/ProcessInst/MyList2';

import MyList3 from '../pages/InOutContract/Listt';

const { Header, Sider, Content } = Layout;

//为了解决关闭tab,setActiveKey没有起作用问题
let flagKey;

const rootSubmenuKeys = ['27', '35', '40', '48', '53', '59', '63', '69'];

export default () => {
  const [collapsed, setCollapsed] = useState(false);
  const { tabPanes, setTabPanes, activeKey, setActiveKey } =
    useModel('useTabPanes');
  const [openKeys, setOpenKeys] = useState([]);

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const onClick = ({ key }) => {
    setActiveKey(key);
    if (tabPanes.indexOf(key) >= 0) {
    } else {
      let arr = [...tabPanes];
      arr.push(key);
      setTabPanes(arr);
    }
  };

  const renderMenu = (menuList) => {
    if (utils.env === 'dev') {
      openKeys.push('xxxx');
      return (
        <Menu.SubMenu
          key="xxxx"
          icon={<SettingOutlined />}
          title="xxx"
          onClick={onClick}
        >
          <Menu.Item key="10-流程设计-processDesignPath">流程设计</Menu.Item>
          <Menu.Item key="1-数据字典-sysDicPath">数据字典</Menu.Item>
          <Menu.Item key="2-部门管理-sysDeptPath">部门管理</Menu.Item>
          <Menu.Item key="3-角色管理-sysRolePath">角色管理</Menu.Item>
          <Menu.Item key="3-用户管理-sysUserPath">用户管理</Menu.Item>
          <Menu.Item key="4-权限管理-sysPermissionPath">权限管理</Menu.Item>
          <Menu.Item key="4-业务主管领导-chargeDeptLeaderPath">
            业务主管领导
          </Menu.Item>
          <Menu.SubMenu title="战略伙伴管理" key="战略伙伴管理">
            <Menu.Item key="566-战略伙伴动态监控-providerControlPath">
              供方动态监控
            </Menu.Item>
            <Menu.Item key="66-战略伙伴基本信息-providerPath">
              供方基本信息
            </Menu.Item>
            <Menu.Item key="66-供方情况简表-providerSimplePath">
              供方情况简表
            </Menu.Item>
            <Menu.Item key="66-供方尽职调查-providerQueryPath">
              供方尽职调查
            </Menu.Item>
            <Menu.Item key="55-供方评分-providerScorePath">供方评分</Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu title="客户管理" key="客户管理">
            <Menu.Item key="66-客户信息-customerPath">客户信息</Menu.Item>
            <Menu.Item key="55-信用评级评分-customerScore1Path">
              客户信用评级评分
            </Menu.Item>
            <Menu.Item key="55-信用评级审批-customerCheck12Path">
              客户信用评级审批
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu title="授权管理" key="授权管理">
            <Menu.Item key="71-年度授权-projectPowerPath">年度授权</Menu.Item>
            <Menu.Item key="55-一事一授权-otherPowerPath">一事一授权</Menu.Item>
          </Menu.SubMenu>
          <Menu.Item key="66-项目备案-projectCodePath">项目备案</Menu.Item>
          <Menu.SubMenu title="项目立项" key="项目立项">
            <Menu.Item key="66-一般项目立项-smallProjectPath">
              一般项目立项
            </Menu.Item>
            <Menu.Item key="66-一般项目非立项-smallProjectNoPath">
              一般项目非立项
            </Menu.Item>
            <Menu.Item key="55-重大项目评估-bigProjectPath">
              重大项目评估
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.Item key="66-投标保证金(函)登记-projectProtect1Path">
            投标保证金(函)登记
          </Menu.Item>
          <Menu.SubMenu title="项目预算管理" key="项目预算管理">
            <Menu.Item key="0-项目信息-smallBudgetProjectPath">
              项目信息
            </Menu.Item>
            <Menu.Item key="1-预计收入-smallBudgetInPath">预计收入</Menu.Item>
            <Menu.Item key="2-预计支出-smallBudgetOutPath">预计支出</Menu.Item>
            <Menu.Item key="3-项目预算-sysDicPath">项目预算</Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu title="合同签署情况" key="合同签署情况">
            <Menu.Item key="1-收款合同-inContractPath">收款合同</Menu.Item>
            <Menu.Item key="1-付款合同-outContractPath">付款合同</Menu.Item>
            <Menu.Item key="1-合同号和WBS号-inOutContractPath">
              合同号和WBS号
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu title="项目收支管理" key="项目收支管理">
            <Menu.Item key="1-收入信息-projectInPath">收入信息</Menu.Item>
            <Menu.Item key="1-支出信息-projectOutPath">支出信息</Menu.Item>
            <Menu.Item key="1-往来款信息-projectIoPath">往来款信息</Menu.Item>
            <Menu.Item key="1-项目收支-projectInOutPath">项目收支</Menu.Item>
          </Menu.SubMenu>
          <Menu.Item key="99-项目结算管理-projectEndPath">
            项目结算管理
          </Menu.Item>
          <Menu.SubMenu title="查询" key="查询">
            <Menu.Item key="99-合同执行情况-contractRunPath">
              合同执行情况
            </Menu.Item>
            <Menu.Item key="1-项目履行台账-projectRunPath">
              项目履行台账
            </Menu.Item>
          </Menu.SubMenu>
        </Menu.SubMenu>
      );
    }

    return (
      menuList &&
      menuList.map((item) => {
        if (item.children) {
          rootSubmenuKeys.push(item.id + '');
          return (
            <Menu.SubMenu
              key={item.id}
              icon={item.icon && React.createElement(ICONS[item.icon])}
              title={item.name}
            >
              {renderMenu(item.children)}
            </Menu.SubMenu>
          );
        }
        return (
          <Menu.Item key={item.id + '-' + item.name + '-' + item.path}>
            {item.name}
          </Menu.Item>
        );
      })
    );
  };

  const closeTabPane = () => {
    let arr = [...tabPanes];
    //找到下一个tab
    let index = _.findIndex(arr, (key) => key === activeKey);
    if (index === 0) {
      if (arr.length > 1) {
        flagKey = arr[index + 1];
      } else {
        flagKey = '我的桌面';
      }
    } else {
      flagKey = arr[index - 1];
    }
    _.remove(arr, (key) => key === activeKey);
    setTabPanes(arr);
    //设置不起作用
    // setActiveKey(flagKey)
  };

  const renderTabPane = () => {
    if (flagKey) {
      setActiveKey(flagKey);
      flagKey = undefined;
    }
    return tabPanes.map((key) => {
      let [id, name, path] = key.split('-');
      let realPath = utils[path];
      let tab = name;
      if (activeKey === key) {
        tab = (
          <span>
            {name}
            <a onClick={closeTabPane}>
              <CloseOutlined
                style={{
                  color: 'rgba(0,0,0,.45)',
                  marginRight: 0,
                  marginLeft: 6,
                }}
              />
            </a>
          </span>
        );
      }
      return (
        <Tabs.TabPane tab={tab} key={key}>
          <div style={{ padding: '0px 12px' }}>
            <realPath.List />
          </div>
        </Tabs.TabPane>
      );
    });
  };

  useEffect(async () => {
    // setOpenKeys(rootSubmenuKeys)
    //
    // await utils.get(utils.checkUserPath.haveLogin)
  }, []);

  const DropdownMenu = (
    <Menu>
      <Menu.Item>
        <div style={{ float: 'left', width: 20 }}>
          <EditOutlined />
        </div>
        <ChangePassword />
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout>
      <Header style={{ backgroundColor: '#1890ff', padding: 0, color: '#fff' }}>
        <span className={collapsed ? 'left-none' : 'left-block'}>
          {collapsed ? 'P' : 'Project'}
        </span>
        {React.createElement(
          collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
          {
            className: 'trigger',
            onClick: () => {
              setCollapsed(!collapsed);
            },
          },
        )}
        <span className="web-name">项目管理系统</span>
        <div className="right">
          <Dropdown overlay={DropdownMenu} className="user">
            <span>
              <UserOutlined style={{ paddingRight: 5, fontSize: 20 }} />
              {utils.env === 'dev'
                ? 'xxx'
                : utils.session.getItem('displayName')}
            </span>
          </Dropdown>
          <span className="user">
            <Button
              type={'link'}
              style={{ color: '#fff', fontSize: 16 }}
              onClick={async () => {
                const data = await utils.get(utils.sysUserPath.logout);
                if (data) {
                  history.push('/login');
                }
              }}
            >
              <LogoutOutlined />
              退出登录
            </Button>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{ background: '#fff' }}
          width={200}
        >
          <Menu
            theme="light"
            mode="inline"
            selectedKeys={[activeKey]}
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            onClick={onClick}
          >
            {renderMenu(utils.session.getItem('menuList'))}
          </Menu>
        </Sider>
        <Content>
          <Tabs
            tabBarStyle={{ background: '#fff', height: 60 }}
            tabBarGutter={0}
            animated={false}
            activeKey={activeKey}
            onTabClick={(key) => setActiveKey(key)}
          >
            <Tabs.TabPane tab="我的桌面" key="我的桌面">
              <div style={{ padding: '0px 12px' }}>
                <MyList />
              </div>
              <div style={{ padding: '10px 12px' }}>
                {utils.session.getItem('user').loginName === '祁瑛' && (
                  <MyList2 />
                )}
              </div>
              <div style={{ padding: '10px 12px' }}>
                {utils.session.getItem('user').deptName !== '综合计划部' &&
                  (utils.session.getItem('user').position === '一般管理人员' ||
                    utils.session.getItem('user').position === '班组长' ||
                    utils.session.getItem('user').position === '班组成员') && (
                    <MyList3 />
                  )}
              </div>
            </Tabs.TabPane>
            {renderTabPane()}
          </Tabs>
        </Content>
      </Layout>
    </Layout>
  );
};
