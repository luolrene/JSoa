<template>
  <div class="operate-container">
    <el-form ref="fromValiData" :model="fromValiData" :rules="rules" label-width="130px" label-position="right" :disabled="showList">
      <p class="title">基础信息</p>
      <el-row>
        <el-col :span="8">
          <el-form-item label="姓名:" prop="name">
            <el-input v-model="fromValiData.name" placeholder="请输入人员姓名" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="工号:" prop="jobNumber">
            <el-input v-model="fromValiData.jobNumber" placeholder="请输入工号" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="单位:" prop="company">
            <el-select v-model="fromValiData.company" placeholder="请选择单位">
              <el-option v-for="item in companyData" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="性别:" prop="sex">
            <el-select v-model="fromValiData.sex" placeholder="请选择性别">
              <el-option v-for="item in sexData" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="出生日期:" prop="birthTime">
            <el-date-picker v-model="fromValiData.birthTime" type="date" placeholder="选择日期" value-format='yyyy-MM-dd' style="width:180px">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="联系电话:" prop="mobile">
            <el-input v-model="fromValiData.mobile" placeholder="请输入联系电话" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="电子邮箱:" prop="mail">
            <el-input v-model="fromValiData.mail" placeholder="请输入电子邮箱" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="部门:" prop="groupId">
            <el-cascader v-model="fromValiData.groupId" :options="groupData" placeholder="请选择部门" filterable ref="myCascader" :props="{ checkStrictly: true }" clearable></el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="角色:" prop="role">
            <el-select v-model="fromValiData.role" placeholder="请选择角色" @change="roleLabel" multiple collapse-tags filterable clearable :title="fromValiData.roleName">
              <el-option v-for="item in roleData" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="行政职级:" prop="administrativeRank">
            <el-select v-model="fromValiData.administrativeRankName" placeholder="请选择行政职级" @change="currentSel" clearable>
              <el-option v-for="item in administrativeRankData" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="技术职级:" prop="technicalRank">
            <el-select v-model="fromValiData.technicalRankName" placeholder="请选择技术职级" @change="currentRank" clearable>
              <el-option v-for="item in technicalRankData" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="市场职级:" prop="marketRank">
            <el-select v-model="fromValiData.marketRankName" placeholder="请选择市场职级" @change="currentMarklet" clearable>
              <el-option v-for="item in marketRankData" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="在职状态:" prop="onTheJobStatus">
            <el-cascader v-model="fromValiData.onTheJobStatus" :options="onTheJobStatusData" placeholder="请选择在职状态"></el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="用户级别:" prop="level">
            <el-select v-model="fromValiData.level" placeholder="请选择用户级别">
              <el-option v-for="item in levelData" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="申请公租房:" prop="publicHome">
            <el-select v-model="fromValiData.publicHome" placeholder="请选择是否申请公租房" clearable>
              <el-option v-for="item in publicHomeData" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="职称等级:" prop="rankLev">
            <el-select v-model="fromValiData.rankLev" placeholder="请选择职称等级">
              <el-option v-for="item in rankLevData" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="职称名称:" prop="rankLevName">
            <el-input v-model="fromValiData.rankLevName" placeholder="请输入职称名称" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="资格证:" prop="certification">
            <el-input v-model="fromValiData.certification" placeholder="请输入资格证名称" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="环境持证:" prop="environment">
            <el-select v-model="fromValiData.environment" placeholder="请选择环境持证">
              <el-option v-for="item in runholder" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="农业持证:" prop="agriculture">
            <el-select v-model="fromValiData.agriculture" placeholder="请选择农业持证">
              <el-option v-for="item in runholder" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="职卫持证:" prop="position">
            <el-select v-model="fromValiData.position" placeholder="请选择职卫持证">
              <el-option v-for="item in runholder" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="原工作单位:" prop="oldUnit">
            <el-input v-model="fromValiData.oldUnit" placeholder="请输入原工作单位" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="原工作岗位:" prop="oldPost">
            <el-input v-model="fromValiData.oldPost" placeholder="请输入原工作岗位" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="原工作年限:" prop="workingYear">
            <el-input v-model="fromValiData.workingYear" placeholder="请输入工作年限" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="参保状态:" prop="insuredState">
            <el-select v-model="fromValiData.insuredState" placeholder="请选择参保状态">
              <el-option v-for="item in insuredStateData" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="参保时间:" prop="insuredTime">
            <el-date-picker v-model="fromValiData.insuredTime" type="date" placeholder="选择日期" value-format='yyyy-MM-dd' style="width:180px">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="入职日期:" prop="inductionTime">
            <el-date-picker v-model="fromValiData.inductionTime" type="date" placeholder="选择日期" value-format='yyyy-MM-dd' style="width:180px" @change="getTimeDate">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="预计转正日期:" prop="formalTime">
            <el-date-picker :disabled='true' v-model="fromValiData.formalTime" type="date" placeholder="选择日期" value-format='yyyy-MM-dd' style="width:180px">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="实际转正日期:" prop="formalTimeActual">
            <el-date-picker v-model="fromValiData.formalTimeActual" type="date" placeholder="选择日期" value-format='yyyy-MM-dd' style="width:180px">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="离职日期:" prop="quitTime">
            <el-date-picker v-model="fromValiData.quitTime" type="date" placeholder="选择日期" value-format='yyyy-MM-dd' style="width:180px">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <p class="title">个人信息</p>
      <el-row>
        <el-col :span="8">
          <el-form-item label="籍贯:" prop="nativePlace">
            <el-cascader v-model="fromValiData.nativePlace" :options="nativePlaceData" clearable></el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="民族:" prop="nation">
            <el-select v-model="fromValiData.nation" placeholder="请选择民族" filterable>
              <el-option v-for="item in nationData" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="政治面貌:" prop="politicalOutlook">
            <el-select v-model="fromValiData.politicalOutlook" placeholder="请选择政治面貌">
              <el-option v-for="item in politicalOutlookData" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="婚姻状况:" prop="maritalStatus">
            <el-select v-model="fromValiData.maritalStatus" placeholder="请选择婚姻状况">
              <el-option v-for="item in maritalStatusData" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="身份证号:" prop="idNumber">
            <el-input v-model="fromValiData.idNumber" placeholder="请输入身份证号" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="证件有效期:">
            <el-date-picker v-model="fromValiData.idNumberTime" type="date" placeholder="请选择证件有效期" value-format='yyyy-MM-dd'>
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="户口所在地:" prop="registeredResidence">
            <el-input v-model="fromValiData.registeredResidence" placeholder="请输入户口所在地" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="户口性质:" prop="registered">
            <el-select v-model="fromValiData.registered" placeholder="请选择户口性质">
              <el-option v-for="item in registeredData" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="户口地址:" prop="maritalStatusAddress">
            <el-input v-model="fromValiData.maritalStatusAddress" placeholder="请输入户口地址" :title="fromValiData.maritalStatusAddress" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="通信地址:" prop="mailingAddress">
            <el-input v-model="fromValiData.mailingAddress" placeholder="请输入通信地址" :title="fromValiData.mailingAddress" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="毕业学校:" prop="school">
            <el-input v-model="fromValiData.school" placeholder="请输入毕业学校" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="最高学历:" prop="education">
            <el-select v-model="fromValiData.education" placeholder="请选择最高学历">
              <el-option v-for="item in educationData" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="毕业专业:" prop="professionalDirection">
            <el-input v-model="fromValiData.professionalDirection" placeholder="请输入专业方向" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="毕业时间:" prop="graduate">
            <el-date-picker v-model="fromValiData.graduate" type="date" placeholder="选择日期" value-format='yyyy-MM-dd' style="width:180px">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="银行账号:" prop="bankCode">
            <el-input v-model="fromValiData.bankCode" placeholder="请输入银行账号" :title='fromValiData.bankCode' />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="紧急联系人:" prop="relative">
            <el-input v-model="fromValiData.relative" placeholder="请输入紧急联系人" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="紧急联系人电话:" prop="relativePhone">
            <el-input v-model="fromValiData.relativePhone" placeholder="请输入紧急联系人电话" />
          </el-form-item>
        </el-col>
      </el-row>
      <p class="title">合同信息</p>
      <el-row>
        <el-col :span="12">
          <el-form-item label-width="150px" label="用工形式:" prop="contractType">
            <el-select v-model="fromValiData.contractType" placeholder="请选择用工形式">
              <el-option v-for="item in contractTypeData" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12"></el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label-width="150px" label="第一次签订开始日期:" prop="fristContractStartTime">
            <el-date-picker v-model="fromValiData.fristContractStartTime" type="date" placeholder="选择日期" value-format='yyyy-MM-dd'>
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label-width="150px" label="第一次签订结束日期:" prop="fristContractEndTime">
            <el-date-picker v-model="fromValiData.fristContractEndTime" type="date" placeholder="选择日期" value-format='yyyy-MM-dd'>
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label-width="150px" label="第二次签订开始日期:" prop="secondContractStartTime">
            <el-date-picker v-model="fromValiData.secondContractStartTime" type="date" placeholder="选择日期" value-format='yyyy-MM-dd'>
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label-width="150px" label="第二次签订结束日期:" prop="secondContractEndTime">
            <el-date-picker v-model="fromValiData.secondContractEndTime" type="date" placeholder="选择日期" value-format='yyyy-MM-dd'>
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label-width="150px" label="第三次签订开始日期:" prop="thirdContractStartTime">
            <el-date-picker v-model="fromValiData.thirdContractStartTime" type="date" placeholder="选择日期" value-format='yyyy-MM-dd'>
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label-width="150px" label="第三次签订结束日期:" prop="thirdContractEndTime">
            <el-date-picker v-model="fromValiData.thirdContractEndTime" type="date" placeholder="选择日期" value-format='yyyy-MM-dd'>
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="line" v-if="!show" @click="openList">︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾展开更多︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾︾</div>
      <el-row v-if="show">
        <el-col :span="12">
          <el-form-item label-width="150px" label="第四次签订开始日期:" prop="fourthContractStartTime">
            <el-date-picker v-model="fromValiData.fourthContractStartTime" type="date" placeholder="选择日期" value-format='yyyy-MM-dd'>
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label-width="150px" label="第四次签订结束日期:" prop="fourthContractEndTime">
            <el-date-picker v-model="fromValiData.fourthContractEndTime" type="date" placeholder="选择日期" value-format='yyyy-MM-dd'>
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="show">
        <el-col :span="12">
          <el-form-item label-width="150px" label="第五次签订开始日期:" prop="fifthContractStartTime">
            <el-date-picker v-model="fromValiData.fifthContractStartTime" type="date" placeholder="选择日期" value-format='yyyy-MM-dd'>
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label-width="150px" label="第五次签订结束日期:" prop="fifthContractEndTime">
            <el-date-picker v-model="fromValiData.fifthContractEndTime" type="date" placeholder="选择日期" value-format='yyyy-MM-dd'>
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="show">
        <el-col :span="12">
          <el-form-item label-width="150px" label="第六次签订开始日期:" prop="sixthContractStartTime">
            <el-date-picker v-model="fromValiData.sixthContractStartTime" type="date" placeholder="选择日期" value-format='yyyy-MM-dd'>
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label-width="150px" label="第六次签订结束日期:" prop="sixthContractEndTime">
            <el-date-picker v-model="fromValiData.sixthContractEndTime" type="date" placeholder="选择日期" value-format='yyyy-MM-dd'>
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="line" v-if="show" @click="offList">︽︽︽︽︽︽︽︽︽︽︽︽︽︽︽︽︽︽︽︽︽︽︽︽︽︽︽收起更多︽︽︽︽︽︽︽︽︽︽︽︽︽︽︽︽︽︽︽︽︽︽︽︽︽︽︽</div>
    </el-form>
    <div class="operate-button">
      <el-button class="cancel-btn" @click='$layer.close(layerid)'>取消</el-button>
      <el-button type="primary" @click="onSubmit('fromValiData')" :loading="btnLoading" native-type="submit">保存</el-button>
    </div>
  </div>
</template>

<script>
import { getUserAddOrModify } from '../../../api/jcxxgl/user.js'
import { getGroupQueryAllGroupsTree } from '../../../api/jcxxgl/group.js'
import { getRoleQueryPageData } from '../../../api/jcxxgl/role.js'
import { getPositionRankQueryPageData } from '../../../api/jcxxgl/rank.js'
import { validatePhoneTwo, validateNumber, idNumber } from '@/utils/public.js'
import nations from '../../../utils/nation.js' // 民族
import options from '../../../utils/country-data.js' // 籍贯

export default {
  props: {
    params: Object,
    showList: Boolean,
    layerid: ''
  },
  data() {
    return {
      show: false,
      formalTime: '',
      contractEndTime: '',
      fromValiData: {
        formalTime: '',
        contractEndTime: '',
        contractStartTime: ''
      },
      fromData: {
        pageSize: 999,
        pageNow: 1
      },
      // 单位
      companyData: [
        { name: '九升检测', id: '1' },
        { name: '集团公司', id: '2' },
        { name: '两山生态', id: '3' },
        { name: '吉东科技', id: '4' },
        { name: '碧泉科技', id: '5' },
        { name: '环测科技', id: '6' }
      ],
      // 用户级别
      levelData: [
        { id: '1', name: '1' },
        { id: '2', name: '2' },
        { id: '3', name: '3' },
        { id: '4', name: '4' },
        { id: '5', name: '5' },
        { id: '6', name: '6' },
        { id: '7', name: '7' },
        { id: '8', name: '8' },
        { id: '9', name: '9' },
        { id: '10', name: '10' }
      ],
      // 职级
      rankLevData: [
        { id: '1', name: '高级' },
        { id: '2', name: '中级' },
        { id: '3', name: '初级' },
        { id: '4', name: '无职称' }
      ],
      // 性别
      sexData: [{ id: '男', name: '男' }, { id: '女', name: '女' }],
      // 部门
      groupData: [],
      // 行政职级
      administrativeRankData: [],
      // 技术职级
      technicalRankData: [],
      // 市场职级
      marketRankData: [],
      // 角色
      roleData: [],
      // 在职状态
      onTheJobStatusData: [
        { value: '1', label: '在职' },
        { value: '2', label: '离职' },
        { value: '3', label: '试用期' },
        { value: '4', label: '退休' },
        { value: '5', label: '临时' },
        { value: '6', label: '实习期' },
        {
          value: '7',
          label: '挂靠',
          children: [
            { value: '7-1', label: '残疾人挂靠' },
            { value: '7-2', label: '工资挂靠' }
          ]
        },
        { value: '8', label: '其他' }
      ],
      // 籍贯
      nativePlaceData: [],
      // 民族
      nationData: [],
      // 参保状态
      insuredStateData: [
        { id: '1', name: '已参保' },
        { id: '2', name: '未参保' },
        { id: '3', name: '已退休' }
      ],
      // 政治面貌
      politicalOutlookData: [
        { id: '1', name: '群众' },
        { id: '2', name: '党员' },
        { id: '3', name: '共青团员' },
        { id: '4', name: '民主党派' }
      ],
      registeredData: [{ id: '1', name: '城镇' }, { id: '2', name: '农村' }],
      // 持证
      runholder: [{ id: '√', name: '√' }, { id: '×', name: '×' }],
      // 公租房
      publicHomeData: [{ id: '1', name: '是' }, { id: '2', name: '否' }],
      // 婚姻状况
      maritalStatusData: [
        { id: '1', name: '未婚' },
        { id: '2', name: '已婚' },
        { id: '3', name: '离异' }
      ],
      // 最高学历
      educationData: [
        { id: '1', name: '硕士' },
        { id: '2', name: '本科' },
        { id: '3', name: '大专' },
        { id: '4', name: '中专' },
        { id: '5', name: '高中' },
        { id: '6', name: '高中以下' }
      ],
      // 合同类型
      contractTypeData: [
        { id: '1', name: '劳动合同' },
        { id: '2', name: '劳务协议' },
        { id: '3', name: '实习协议' },
        { id: '4', name: '兼职协议' }
      ],

      btnLoading: false,
      rules: {
        name: [{ required: true, message: '请填写用户姓名', trigger: 'blur' }],
        jobNumber: [{ required: true, message: '请填写工号', trigger: 'blur' }],
        company: [{ required: true, message: '请选择单位', trigger: 'blur' }],
        groupId: [{ required: true, message: '请选择部门', trigger: 'blur' }],
        onTheJobStatusName: [{ required: true, message: '请选择在职状态', trigger: 'blur' }],
        postId: [{ required: true, message: '请选择职务', trigger: 'blur' }],
        role: [{ required: true, message: '请选择角色', trigger: 'blur' }],
        rankLev: [{ required: true, message: '请选择职称', trigger: 'blur' }],
        level: [{ required: true, message: '请选择用户级别', trigger: 'blur' }],
        administrativeRank: [{ required: true, message: '请选择行政职级', trigger: 'blur' }],
        sex: [{ required: true, message: '请选择性别', trigger: 'blur' }],
        mobile: [{ required: true, message: '请输入联系电话', trigger: 'blur' }, { validator: validatePhoneTwo, trigger: 'change' }],
        birthTime: [{ required: true, message: '请选择出生日期', trigger: 'blur' }],
        inductionTime: [{ required: true, message: '请选择入职日期', trigger: 'blur' }],
        formalTime: [{ required: true, message: '请选择预计转正日期', trigger: 'blur' }],
        birformalTimeActualthTime: [{ required: true, message: '请选择实际转正日期', trigger: 'blur' }],
        nation: [{ required: true, message: '请选择民族', trigger: 'blur' }],
        politicalOutlook: [{ required: true, message: '请选择政治面貌', trigger: 'blur' }],
        maritalStatus: [{ required: true, message: '请选择婚姻状况', trigger: 'blur' }],
        idNumber: [{ required: true, message: '请输入身份证号', trigger: 'blur' }, { validator: idNumber, trigger: 'change' }],
        contactAddress: [{ required: true, message: '请输入联系地址', trigger: 'blur' }],
        school: [{ required: true, message: '请输入毕业院校', trigger: 'blur' }],
        education: [{ required: true, message: '请选择最高学历', trigger: 'blur' }],
        contractType: [{ required: true, message: '请选择合同类型', trigger: 'blur' }],
        identification: [{ required: true, message: '请选择签订标识', trigger: 'blur' }],
        years: [{ required: true, message: '请输入签订年限', trigger: 'blur' }, { validator: validateNumber, trigger: 'change' }],
        contractStartTime: [{ required: true, message: '请选择合同开始日期', trigger: 'blur' }],
        contractEndTime: [{ required: true, message: '请选择合同结束日期', trigger: 'blur' }]
      }
    }
  },

  methods: {
    currentSel(value) {
      let arr = this.administrativeRankData.filter(item => {
        return item.id === value
      })
      this.fromValiData.administrativeRankName = arr[0].name
      this.fromValiData.administrativeRank = arr[0].id
    },
    currentRank(value) {
      let arr = this.technicalRankData.filter(item => {
        return item.id === value
      })
      this.fromValiData.technicalRankName = arr[0].name
      this.fromValiData.technicalRank = arr[0].id
    },
    currentMarklet(value) {
      let arr = this.marketRankData.filter(item => {
        return item.id === value
      })
      this.fromValiData.marketRankName = arr[0].name
      this.fromValiData.marketRank = arr[0].id
    },

    roleLabel(value) {
      let arr = []
      for (let i = 0; i <= value.length - 1; i++) {
        this.roleData.find(item => {
          if (item.id === value[i]) {
            arr.push(item.name)
          }
        })
        if (arr) {
          this.fromValiData.roleName = arr.toString()
        }
      }
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.btnLoading = true
          if (Array.isArray(this.fromValiData.groupId)) {
            let groupIdAll = this.fromValiData.groupId.toString()
            this.fromValiData.groupIdAll = groupIdAll
            this.fromValiData.groupId = this.fromValiData.groupId[this.fromValiData.groupId.length - 1]
          }
          if (this.fromValiData.nativePlace) {
            this.fromValiData.nativePlace = this.fromValiData.nativePlace.toString()
          }
          if (this.fromValiData.registeredResidence) {
            this.fromValiData.registeredResidence = this.fromValiData.registeredResidence.toString()
          }
          if (this.fromValiData.role) {
            this.fromValiData.role = this.fromValiData.role.toString()
          }
          if (this.fromValiData.onTheJobStatus) {
            this.fromValiData.onTheJobStatus = this.fromValiData.onTheJobStatus.toString()
          }
          this.fromValiData.groupName = this.$refs['myCascader'].inputValue.replace(/\s*/g, '')
          getUserAddOrModify(this.fromValiData)
            .then(res => {
              this.$layer.close(this.layerid)
              this.$parent.getListData()
              this.$share.message()
              this.btnLoading = false
            })
            .catch(() => {
              this.btnLoading = false
            })
        }
      })
    },
    // 部门
    handelOption(options) {
      options.forEach(item => {
        if (item.children.length === 0) {
          delete item.children
        } else {
          this.handelOption(item.children)
        }
      })
    },
    getGroupData() {
      this.fromData.father = '0'
      getGroupQueryAllGroupsTree(this.fromData).then(res => {
        this.groupData = res.result
        this.handelOption(this.groupData)
      })
    },

    getRankData() {
      // 行政职级
      let obj = {}
      obj.pageSize = 999
      obj.pageNow = 1
      obj.positionType = '行政职级'
      let data = {}
      data.pageSize = 999
      data.pageNow = 1
      data.positionType = '技术职级'
      let xdd = {}
      xdd.pageSize = 999
      xdd.pageNow = 1
      xdd.positionType = '市场职级'
      getPositionRankQueryPageData(obj).then(res => {
        this.administrativeRankData = res.result.pageList.map(item => {
          return {
            id: item.id,
            name: item.positionName
          }
        })
      })
      getPositionRankQueryPageData(data).then(res => {
        this.technicalRankData = res.result.pageList.map(item => {
          return {
            id: item.id,
            name: item.positionName
          }
        })
      })
      getPositionRankQueryPageData(xdd).then(res => {
        this.marketRankData = res.result.pageList.map(item => {
          return {
            id: item.id,
            name: item.positionName
          }
        })
      })
    },
    // 入职时间
    getTimeDate(item) {
      let yy = Number(item.slice(0, 4))
      let mm = Number(item.slice(5, 7))
      let dd = Number(item.slice(8, 10))
      if (mm + 3 === 13) {
        mm = 1
        yy = yy + 1
      } else if (mm + 3 === 14) {
        mm = 2
        yy = yy + 1
      } else if (mm + 3 === 15) {
        mm = 3
        yy = yy + 1
      } else {
        mm = mm + 3
      }
      this.fromValiData.formalTime = yy + '-' + mm + '-' + dd
      this.formalTime = yy + '-' + mm + '-' + dd
    },
    // 合同结束时间
    getEndTime(item) {
      let yy = Number(item.slice(0, 4))
      let mm = Number(item.slice(5, 7))
      let dd = Number(item.slice(8, 10))
      this.fromValiData.contractEndTime =
        yy + Number(this.fromValiData.years) + '-' + mm + '-' + dd
    },
    getEndTimes(item) {
      let yy = Number(this.fromValiData.contractStartTime.slice(0, 4))
      let mm = Number(this.fromValiData.contractStartTime.slice(5, 7))
      let dd = Number(this.fromValiData.contractStartTime.slice(8, 10))
      this.fromValiData.contractEndTime =
        yy + Number(item) + '-' + mm + '-' + dd
    },
    // 角色
    getRoleData() {
      getRoleQueryPageData(this.fromData).then(res => {
        this.roleData = res.result.pageList.map(item => {
          return {
            id: item.id,
            name: item.name
          }
        })
      })
    },
    // 打开列表
    openList() {
      this.show = true
    },
    offList() {
      this.show = false
    }
  },
  mounted() {
    if (this.params) {
      this.fromValiData = this.params
      if (this.params.nativePlace) {
        this.fromValiData.nativePlace = this.params.nativePlace.split(',')
      }
      this.fromValiData.groupName = this.params.groupName.split('/')
      this.fromValiData.role = this.params.role.split(',').map(Number)
    }
  },
  created() {
    this.getGroupData()
    this.getRoleData()
    this.getRankData()
    this.nationData = nations
    this.nativePlaceData = options
  }
}
</script>

<style>
.el-select__tags {
  white-space: nowrap;
  overflow: hidden;
}
</style>

<style scoped lang="scss">
.title {
  margin: 0 0 20px 0;
  font-size: 20px;
  border-bottom: dashed 1px #ccc;
}
.operate-container /deep/ .el-input--suffix .el-input__inner {
  width: 270px;
}
.operate-container /deep/ .el-input--small .el-input__inner {
  height: 32px;
  line-height: 32px;
  width: 270px;
}
.line {
  text-align: center;
  font-size: 14px;
  color: #0195db;
  cursor: pointer;
}
</style>
