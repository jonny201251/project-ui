import { contextPath } from './unknown'
import ProcessDesignForm from '../pages/ProcessDesign/Form'
import ProcessDesignList from '../pages/ProcessDesign/List'
import ChargeDeptLeaderForm from '../pages/ChargeDeptLeader/Form'
import ChargeDeptLeaderList from '../pages/ChargeDeptLeader/List'
import ProviderForm from '../pages/Provider/Form'
import ProviderList from '../pages/Provider/List'
import ProviderScore1List from '../pages/ProviderScore1/List'
import ProviderScore1AddForm from '../pages/ProviderScore1/AddForm'
import ProviderScore1EditForm from '../pages/ProviderScore1/EditForm'
import ProviderScore1CheckForm from '../pages/ProviderScore1/CheckForm'
import ProviderScore1ChangeForm from '../pages/ProviderScore1/ChangeForm'
import ProviderScore1ViewHistory from '../pages/ProviderScore1/ViewHistory'
import ProviderScore1ViewForm from '../pages/ProviderScore1/ViewForm'
import CustomerForm from '../pages/Customer/Form'
import CustomerList from '../pages/Customer/List'
import CustomerScore1List from '../pages/CustomerScore1/List'
import CustomerScore1AddForm from '../pages/CustomerScore1/AddForm'
import CustomerScore1CheckForm from '../pages/CustomerScore1/CheckForm'
import CustomerScore1ChangeForm from '../pages/CustomerScore1/ChangeForm'
import CustomerScore1ViewHistory from '../pages/CustomerScore1/ViewHistory'
import CustomerScore1ViewForm from '../pages/CustomerScore1/ViewForm'
import CustomerCheck12List from '../pages/CustomerCheck12/List'
import CustomerCheck12AddForm from '../pages/CustomerCheck12/AddForm'
import CustomerCheck12CheckForm from '../pages/CustomerCheck12/CheckForm'
import CustomerCheck12ChangeForm from '../pages/CustomerCheck12/ChangeForm'
import CustomerCheck12ViewHistory from '../pages/CustomerCheck12/ViewHistory'
import CustomerCheck12ViewForm from '../pages/CustomerCheck12/ViewForm'
import ProjectPowerList from '../pages/ProjectPower/List'
import ProjectPowerAddForm from '../pages/ProjectPower/AddForm'
import ProjectPowerCheckForm from '../pages/ProjectPower/CheckForm'
import ProjectPowerViewForm from '../pages/ProjectPower/ViewForm'
import OtherPowerList from '../pages/OtherPower/List'
import OtherPowerAddForm from '../pages/OtherPower/AddForm'
import OtherPowerCheckForm from '../pages/OtherPower/CheckForm'
import OtherPowerViewForm from '../pages/OtherPower/ViewForm'
import ProjectCodeList from '../pages/ProjectCode/List'
import ProjectCodeForm from '../pages/ProjectCode/Form'
import SmallProjectNoList from '../pages/SmallProjectNo/List'
import SmallProjectNoForm from '../pages/SmallProjectNo/Form'
import ProjectProtect1List from '../pages/ProjectProtect1/List'
import ProjectProtect1Form from '../pages/ProjectProtect1/Form'
import SmallProjectList from '../pages/SmallProject/List'
import SmallProjectAddForm from '../pages/SmallProject/AddForm'
import SmallProjectCheckForm from '../pages/SmallProject/CheckForm'
import SmallProjectChangeForm from '../pages/SmallProject/ChangeForm'
import SmallProjectViewHistory from '../pages/SmallProject/ViewHistory'
import SmallProjectViewForm from '../pages/SmallProject/ViewForm'
import BigProjectList from '../pages/BigProject/List'
import BigProjectAddForm from '../pages/BigProject/AddForm'
import BigProjectCheckForm from '../pages/BigProject/CheckForm'
import BigProjectChangeForm from '../pages/BigProject/ChangeForm'
import BigProjectViewHistory from '../pages/BigProject/ViewHistory'
import BigProjectViewForm from '../pages/BigProject/ViewForm'
import SmallBudgetProjectForm from '../pages/SmallBudgetProject/Form'
import SmallBudgetProjectList from '../pages/SmallBudgetProject/List'
import SmallBudgetInForm from '../pages/SmallBudgetIn/Form'
import SmallBudgetInList from '../pages/SmallBudgetIn/List'
import SmallBudgetOutForm from '../pages/SmallBudgetOut/Form'
import SmallBudgetOutList from '../pages/SmallBudgetOut/List'
import BigBudgetProjectForm from '../pages/BigBudgetProject/Form'
import BigBudgetProjectList from '../pages/BigBudgetProject/List'
import BigBudgetInForm from '../pages/BigBudgetIn/Form'
import BigBudgetInList from '../pages/BigBudgetIn/List'
import BigBudgetCompanyForm from '../pages/BigBudgetCompany/Form'
import BigBudgetCompanyList from '../pages/BigBudgetCompany/List'
import BigBudgetOutForm from '../pages/BigBudgetOut/Form'
import BigBudgetOutList from '../pages/BigBudgetOut/List'
import ProjectInForm from '../pages/ProjectIn/Form'
import ProjectInList from '../pages/ProjectIn/List'
import ProjectOutForm from '../pages/ProjectOut/Form'
import ProjectOutList from '../pages/ProjectOut/List'
import ProjectIoForm from '../pages/ProjectIo/Form'
import ProjectIoList from '../pages/ProjectIo/List'
import ProjectInOutList from '../pages/ProjectInOut/List'
import ProviderSimpleList from '../pages/ProviderSimple/List'
import ProviderSimpleForm from '../pages/ProviderSimple/Form'
import ProviderQueryList from '../pages/ProviderQuery/List'
import ProviderQueryAddForm from '../pages/ProviderQuery/AddForm'
import ProviderQueryCheckForm from '../pages/ProviderQuery/CheckForm'
import ProviderQueryViewHistory from '../pages/ProviderQuery/ViewHistory'
import ProviderQueryViewForm from '../pages/ProviderQuery/ViewForm'
import ProviderQueryChangeForm from '../pages/ProviderQuery/ChangeForm'
import InContractList from '../pages/InContract/List'
import InContractAddForm from '../pages/InContract/AddForm'
import InContractCheckForm from '../pages/InContract/CheckForm'
import InContractChangeForm from '../pages/InContract/ChangeForm'
import InContractViewForm from '../pages/InContract/ViewForm'
import InContractViewHistory from '../pages/InContract/ViewHistory'
import OutContractList from '../pages/OutContract/List'
import OutContractAddForm from '../pages/OutContract/AddForm'
import OutContractCheckForm from '../pages/OutContract/CheckForm'
import OutContractChangeForm from '../pages/OutContract/ChangeForm'
import OutContractViewForm from '../pages/OutContract/ViewForm'
import OutContractViewHistory from '../pages/OutContract/ViewHistory'
import InOutContractList from '../pages/InOutContract/List'
import ProjectEndForm from '../pages/ProjectEnd/Form'
import ProjectEndList from '../pages/ProjectEnd/List'
import ContractRunForm from '../pages/ContractRun/Form'
import ContractRunList from '../pages/ContractRun/List'
import ProjectRunForm from '../pages/ProjectRun/Form'
import ProjectRunList from '../pages/ProjectRun/List'
//
import AForm from '../pages/A/Form'
import AList from '../pages/A/List'
import SysRoleForm from '../pages/SysRole/Form'
import SysRoleList from '../pages/SysRole/List'

export const aPath = {
  flag: 'aPath', width: 1000, Form: AForm, List: AList,
  list: contextPath + '/a/list',
  get: contextPath + '/a/get',
  add: contextPath + '/a/add',
  edit: contextPath + '/a/edit',
  delete: contextPath + '/a/delete',
}

//flag、导出名称、sysPermission.path,三个地方名称一样
export const processDesignPath = {
  flag: 'processDesignPath', width: '95%', Form: ProcessDesignForm, List: ProcessDesignList,
  list: contextPath + '/processDesign/list',
  get: contextPath + '/processDesign/get',
  add: contextPath + '/processDesign/add',
  edit: contextPath + '/processDesign/edit',
  delete: contextPath + '/processDesign/delete',
  getProcessFormBefore: contextPath + '/processDesign/getProcessFormBefore',
  getBpmnXml: contextPath + '/processDesign/getBpmnXml',
}
export const processInstPath = {
  flag: 'processInstPath',
  list: contextPath + '/processInst/list',
  getRunTaskKeyList: contextPath + '/processInst/getRunTaskKeyList',
  myList: contextPath + '/processInst/myList',
}
export const processInstNodePath = {
  flag: 'processInstPath',
  list: contextPath + '/processInstNode/list',
}
export const chargeDeptLeaderPath = {
  flag: 'chargeDeptLeaderPath', width: 820, Form: ChargeDeptLeaderForm, List: ChargeDeptLeaderList,
  list: contextPath + '/chargeDeptLeader/list',
  get: contextPath + '/chargeDeptLeader/get',
  add: contextPath + '/chargeDeptLeader/add',
  edit: contextPath + '/chargeDeptLeader/edit',
  delete: contextPath + '/chargeDeptLeader/delete',
  getChargeDeptLeader: contextPath + '/chargeDeptLeader/getChargeDeptLeader',
  getDeptVL: contextPath + '/chargeDeptLeader/getDeptVL',
}

export const providerPath = {
  flag: 'providerPath', Form: ProviderForm, List: ProviderList,
  list: contextPath + '/provider/list',
  get: contextPath + '/provider/get',
  add: contextPath + '/provider/add',
  edit: contextPath + '/provider/edit',
  delete: contextPath + '/provider/delete',
  modify: contextPath + '/provider/modify',
}
export const providerPath2 = {
  list: contextPath + '/provider/list2',
}
export const providerPath3 = {
  list: contextPath + '/provider/list3',
}
/*
  新增流程：AddForm，编辑：EditForm，审批流程：CheckForm，变更流程：ChangeForm
  查看：ViewHistory,ViewForm
  撤回流程
 */
export const providerScore1Path = {
  flag: 'providerScore1Path', width: 1100, List: ProviderScore1List,
  AddForm: ProviderScore1AddForm,
  EditForm: ProviderScore1EditForm,
  CheckForm: ProviderScore1CheckForm,
  ChangeForm: ProviderScore1ChangeForm,
  ViewHistory: ProviderScore1ViewHistory,
  ViewForm: ProviderScore1ViewForm,
  list: contextPath + '/providerScore1/list',
  viewHistory: contextPath + '/providerScore1/viewHistory',
  get: contextPath + '/providerScore1/get',
  btnHandle: contextPath + '/providerScore1/btnHandle',
}
export const customerPath = {
  flag: 'customerPath', Form: CustomerForm, List: CustomerList,
  list: contextPath + '/customer/list',
  get: contextPath + '/customer/get',
  add: contextPath + '/customer/add',
  edit: contextPath + '/customer/edit',
  delete: contextPath + '/customer/delete',
}
export const customerScore1Path = {
  flag: 'customerScore1Path', width: 1100, changeButtonName: '复评', List: CustomerScore1List,
  AddForm: CustomerScore1AddForm,
  EditForm: CustomerScore1AddForm,
  CheckForm: CustomerScore1CheckForm,
  ChangeForm: CustomerScore1ChangeForm,
  ViewHistory: CustomerScore1ViewHistory,
  ViewForm: CustomerScore1ViewForm,
  list: contextPath + '/customerScore1/list',
  viewHistory: contextPath + '/customerScore1/viewHistory',
  get: contextPath + '/customerScore1/get',
  btnHandle: contextPath + '/customerScore1/btnHandle',
}
export const customerCheck12Path = {
  flag: 'customerCheck12Path', width: 900, List: CustomerCheck12List,
  AddForm: CustomerCheck12AddForm,
  EditForm: CustomerCheck12AddForm,
  CheckForm: CustomerCheck12CheckForm,
  ChangeForm: CustomerCheck12ChangeForm,
  ViewHistory: CustomerCheck12ViewHistory,
  ViewForm: CustomerCheck12ViewForm,
  list: contextPath + '/customerCheck12/list',
  viewHistory: contextPath + '/customerCheck12/viewHistory',
  get: contextPath + '/customerCheck12/get',
  btnHandle: contextPath + '/customerCheck12/btnHandle',
}
export const projectPowerPath = {
  flag: 'projectPowerPath', width: 1000, haveChange: '无', List: ProjectPowerList,
  AddForm: ProjectPowerAddForm,
  EditForm: ProjectPowerAddForm,
  CheckForm: ProjectPowerCheckForm,
  ViewForm: ProjectPowerViewForm,
  list: contextPath + '/projectPower/list',
  get: contextPath + '/projectPower/get',
  btnHandle: contextPath + '/projectPower/btnHandle',
}
export const otherPowerPath = {
  flag: 'otherPowerPath', width: 1000, List: OtherPowerList,
  AddForm: OtherPowerAddForm,
  EditForm: OtherPowerAddForm,
  CheckForm: OtherPowerCheckForm,
  ViewForm: OtherPowerViewForm,
  list: contextPath + '/otherPower/list',
  get: contextPath + '/otherPower/get',
  btnHandle: contextPath + '/otherPower/btnHandle',
}

export const projectCodePath = {
  flag: 'projectCodePath', width: 800, Form: ProjectCodeForm, List: ProjectCodeList,
  list: contextPath + '/projectCode/list',
  get: contextPath + '/projectCode/get',
  add: contextPath + '/projectCode/add',
  edit: contextPath + '/projectCode/edit',
  delete: contextPath + '/projectCode/delete',
  getLabelValue: contextPath + '/projectCode/getLabelValue',
}

export const smallProjectNoPath = {
  flag: 'smallProjectNoPath', width: 1200, Form: SmallProjectNoForm, List: SmallProjectNoList,
  list: contextPath + '/smallProjectNo/list',
  get: contextPath + '/smallProjectNo/get',
  add: contextPath + '/smallProjectNo/add',
  edit: contextPath + '/smallProjectNo/edit',
  delete: contextPath + '/smallProjectNo/delete',
}

export const projectProtect1Path = {
  flag: 'projectProtect1Path', width: 1000, Form: ProjectProtect1Form, List: ProjectProtect1List,
  list: contextPath + '/projectProtect1/list',
  get: contextPath + '/projectProtect1/get',
  add: contextPath + '/projectProtect1/add',
  edit: contextPath + '/projectProtect1/edit',
  delete: contextPath + '/projectProtect1/delete',
}

export const smallProjectPath = {
  flag: 'smallProjectPath', width: 1200, List: SmallProjectList,
  AddForm: SmallProjectAddForm,
  EditForm: SmallProjectAddForm,
  CheckForm: SmallProjectCheckForm,
  ChangeForm: SmallProjectChangeForm,
  ViewHistory: SmallProjectViewHistory,
  ViewForm: SmallProjectViewForm,
  list: contextPath + '/smallProject/list',
  viewHistory: contextPath + '/smallProject/viewHistory',
  get: contextPath + '/smallProject/get',
  btnHandle: contextPath + '/smallProject/btnHandle',
}
export const bigProjectPath = {
  flag: 'bigProjectPath', width: 1200, List: BigProjectList,
  AddForm: BigProjectAddForm,
  EditForm: BigProjectAddForm,
  CheckForm: BigProjectCheckForm,
  ChangeForm: BigProjectChangeForm,
  ViewHistory: BigProjectViewHistory,
  ViewForm: BigProjectViewForm,
  list: contextPath + '/bigProject/list',
  viewHistory: contextPath + '/bigProject/viewHistory',
  get: contextPath + '/bigProject/get',
  btnHandle: contextPath + '/bigProject/btnHandle',
}
export const smallBudgetProjectPath = {
  flag: 'smallBudgetProjectPath', width: 1000, Form: SmallBudgetProjectForm, List: SmallBudgetProjectList,
  list: contextPath + '/smallBudgetProject/list',
  get: contextPath + '/smallBudgetProject/get',
  add: contextPath + '/smallBudgetProject/add',
  edit: contextPath + '/smallBudgetProject/edit',
  modify: contextPath + '/smallBudgetProject/modify',
}
export const smallBudgetInPath = {
  flag: 'smallBudgetInPath', width: 700, Form: SmallBudgetInForm, List: SmallBudgetInList,
  list: contextPath + '/smallBudgetIn/list',
  get: contextPath + '/smallBudgetIn/get',
  add: contextPath + '/smallBudgetIn/add',
  edit: contextPath + '/smallBudgetIn/edit',
}
export const smallBudgetOutPath = {
  flag: 'smallBudgetOutPath', width: 800, Form: SmallBudgetOutForm, List: SmallBudgetOutList,
  list: contextPath + '/smallBudgetOut/list',
  get: contextPath + '/smallBudgetOut/get',
  add: contextPath + '/smallBudgetOut/add',
  edit: contextPath + '/smallBudgetOut/edit',
}
export const bigBudgetProjectPath = {
  flag: 'bigBudgetProjectPath', width: 1000, Form: BigBudgetProjectForm, List: BigBudgetProjectList,
  list: contextPath + '/bigBudgetProject/list',
  get: contextPath + '/bigBudgetProject/get',
  add: contextPath + '/bigBudgetProject/add',
  edit: contextPath + '/bigBudgetProject/edit',
}
export const bigBudgetInPath = {
  flag: 'bigBudgetInPath', width: 700, Form: BigBudgetInForm, List: BigBudgetInList,
  list: contextPath + '/bigBudgetIn/list',
  get: contextPath + '/bigBudgetIn/get',
  add: contextPath + '/bigBudgetIn/add',
  edit: contextPath + '/bigBudgetIn/edit',
}
export const bigBudgetCompanyPath = {
  flag: 'bigBudgetCompanyPath', width: 800, Form: BigBudgetCompanyForm, List: BigBudgetCompanyList,
  list: contextPath + '/bigBudgetCompany/list',
  get: contextPath + '/bigBudgetCompany/get',
  add: contextPath + '/bigBudgetCompany/add',
  edit: contextPath + '/bigBudgetCompany/edit',
}
export const bigBudgetCompanyDialogPath = {
  list: contextPath + '/bigBudgetCompany/dialogList',
}
export const bigBudgetOutPath = {
  flag: 'bigBudgetOutPath', width: 800, Form: BigBudgetOutForm, List: BigBudgetOutList,
  list: contextPath + '/bigBudgetOut/list',
  get: contextPath + '/bigBudgetOut/get',
  add: contextPath + '/bigBudgetOut/add',
  edit: contextPath + '/bigBudgetOut/edit',
}
export const budgetProjectDialogPath = {
  list: contextPath + '/budgetProject/list',
}
export const budgetProjectDialog2Path = {
  list: contextPath + '/budgetProject/list2',
}
export const projectInPath = {
  flag: 'projectInPath', width: 900, Form: ProjectInForm, List: ProjectInList,
  list: contextPath + '/projectIn/list',
  get: contextPath + '/projectIn/get',
  add: contextPath + '/projectIn/add',
  edit: contextPath + '/projectIn/edit',
  delete: contextPath + '/projectIn/delete',
}
export const projectOutPath = {
  flag: 'projectOutPath', width: 900, Form: ProjectOutForm, List: ProjectOutList,
  list: contextPath + '/projectOut/list',
  get: contextPath + '/projectOut/get',
  add: contextPath + '/projectOut/add',
  edit: contextPath + '/projectOut/edit',
  delete: contextPath + '/projectOut/delete',
}
export const projectIoPath = {
  flag: 'projectIoPath', width: 900, Form: ProjectIoForm, List: ProjectIoList,
  list: contextPath + '/projectIo/list',
  get: contextPath + '/projectIo/get',
  add: contextPath + '/projectIo/add',
  edit: contextPath + '/projectIo/edit',
  delete: contextPath + '/projectIo/delete',
}
export const projectInOutPath = {
  List: ProjectInOutList,
  list: contextPath + '/projectInOut/list',
}
export const providerSimplePath = {
  flag: 'providerSimplePath', width: 1000, Form: ProviderSimpleForm, List: ProviderSimpleList,
  list: contextPath + '/providerSimple/list',
  get: contextPath + '/providerSimple/get',
  add: contextPath + '/providerSimple/add',
  edit: contextPath + '/providerSimple/edit',
}
export const providerSimplePath2 = {
  list: contextPath + '/providerSimple/list2',
}
export const providerQueryPath = {
  flag: 'providerQueryPath', width: 1000, List: ProviderQueryList,
  AddForm: ProviderQueryAddForm,
  EditForm: ProviderQueryAddForm,
  CheckForm: ProviderQueryCheckForm,
  ViewHistory: ProviderQueryViewHistory,
  ViewForm: ProviderQueryViewForm,
  ChangeForm: ProviderQueryChangeForm,
  list: contextPath + '/providerQuery/list',
  viewHistory: contextPath + '/providerQuery/viewHistory',
  get: contextPath + '/providerQuery/get',
  btnHandle: contextPath + '/providerQuery/btnHandle',
}
export const inContractPath = {
  flag: 'inContractPath', width: 900, List: InContractList,
  AddForm: InContractAddForm,
  EditForm: InContractAddForm,
  CheckForm: InContractCheckForm,
  ChangeForm: InContractChangeForm,
  ViewHistory: InContractViewHistory,
  ViewForm: InContractViewForm,
  list: contextPath + '/inContract/list',
  viewHistory: contextPath + '/inContract/viewHistory',
  get: contextPath + '/inContract/get',
  btnHandle: contextPath + '/inContract/btnHandle',
}
export const outContractPath = {
  flag: 'outContractPath', width: 900, List: OutContractList,
  AddForm: OutContractAddForm,
  EditForm: OutContractAddForm,
  CheckForm: OutContractCheckForm,
  ChangeForm: OutContractChangeForm,
  ViewHistory: OutContractViewHistory,
  ViewForm: OutContractViewForm,
  list: contextPath + '/outContract/list',
  viewHistory: contextPath + '/outContract/viewHistory',
  get: contextPath + '/outContract/get',
  btnHandle: contextPath + '/outContract/btnHandle',
}
export const inOutContractPath = {
  List: InOutContractList,
  list: contextPath + '/inOutContract/list',
  add: contextPath + '/inOutContract/add',
}

export const projectEndPath = {
  flag: 'projectEndPath', Form: ProjectEndForm, List: ProjectEndList,
  list: contextPath + '/projectEndPath/list',
}
export const contractRunPath = {
  flag: 'contractRunPath', Form: ContractRunForm, List: ContractRunList,
  list: contextPath + '/contractRunPath/list',
}
export const projectRunPath = {
  flag: 'projectRunPath', Form: ProjectRunForm, List: ProjectRunList,
  list: contextPath + '/projectRunPath/list',
}
