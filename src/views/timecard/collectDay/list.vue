<template>
  <div class="pc-container">
    <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData">
      <template slot="other">
        <el-form-item label="部门:">
          <el-cascader :options="options" v-model="groupIds" @change="getCheckedNodes" :props="{ multiple: true, checkStrictly: true }" collapse-tags clearable></el-cascader>
        </el-form-item>
        <el-form-item label="日期:">
          <el-date-picker v-model="time" value-format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="getListData()" style="width: 215px">
          </el-date-picker>
        </el-form-item>
      </template>
      <el-button type="primary" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
      <el-button type="primary" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
      <el-button type="primary" class="default-btn" icon="el-icon-download" @click="dataExport()" v-if="Number(this.$store.getters.userInfo.level) > 2">数据导出</el-button>
    </fromSearch>
    <tableItem :obj="this" :tableData="tableData" :tableHeader="tableHeader" :button="button" :loading="loading" :dataSum='fromValiData.dataSum' @handleSizeChange="handleSizeChange">
    </tableItem>
  </div>
</template>

<script>
import detail from '../collectMonth/detail.vue'
import { getGroupQueryAllGroupsTree } from '@/api/jcxxgl/group.js'
import { getDingTalkReportFormResultQueryPageData } from '@/api/timecard/timecard.js'
export default {
  data() {
    return {
      loading: false,
      time: [],
      options: [],
      groupIds: '',
      multipleSelection: [],
      fromValiData: {
        pageSize: 10,
        pageNow: 1
      },
      fromData: [
        { type: 'input', prop: 'name', label: '姓名' },
        { type: 'input', prop: 'mobile', label: '电话' }
      ],
      tableData: [],
      tableHeader: [
        { prop: 'name', label: '姓名', width: 100, fixed: 'left', type: 'view' },
        { prop: 'groupName', label: '部门', width: 150, fixed: 'left' },
        { prop: 'mobile', label: '电话', width: 120 },
        { prop: 'administrativeRankName', label: '行政职级', width: 100 },
        { prop: 'time', label: '日期', width: 120 },
        { prop: 'should_attendance_days', label: '应出勤/天', width: 80 },
        { prop: 'making_up_lack_times', label: '补卡次数', width: 80 },
        { prop: 'attendance_class', label: '出勤班次', width: 80 },
        { prop: 'attendance_days', label: '出勤天数', width: 80 },
        { prop: 'attendance_rest_days', label: '休息天数', width: 80 },
        { prop: 'attendance_work_time', label: '工作时长', width: 80 },
        { prop: 'late_times', label: '迟到次数', width: 80 },
        { prop: 'late_minute', label: '迟到时长', width: 80 },
        { prop: 'serious_late_times', label: '严重迟到次数', width: 120 },
        { prop: 'serious_late_minute', label: '严重迟到时长', width: 120 },
        { prop: 'absenteeism_late_times', label: '旷工迟到次数', width: 120 },
        { prop: 'leave_early_times', label: '早退次数', width: 80 },
        { prop: 'leave_early_minute', label: '早退时长', width: 80 },
        { prop: 'on_work_lack_card_times', label: '上班缺卡次数', width: 120 },
        { prop: 'off_work_lack_card_times', label: '下班缺卡次数', width: 120 },
        { prop: 'absenteeism_days', label: '旷工天数', width: 80 },
        { prop: 'business_trip_time', label: '出差时长', width: 80 },
        { prop: 'out_time', label: '外出时长', width: 80 },
        { prop: 'overtime_approve_count', label: '加班-审批单统计', width: 150 },
        { prop: 'overtime_1', label: '工作日加班', width: 100 },
        { prop: 'overtime_2', label: '休息日加班', width: 100 },
        { prop: 'overtime_3', label: '节假日加班', width: 100 },
        { prop: 'attend_result', label: '考勤结果', width: 80 },
        { prop: 'plan_detail', label: '班次', width: 140 },
        { prop: 'on_duty_user_check_time_1', label: '上班1打卡时间', width: 120 },
        { prop: 'on_duty_user_check_result_1', label: '上班1打卡结果', width: 120 },
        { prop: 'off_duty_user_check_time_1', label: '下班1打卡时间', width: 120 },
        { prop: 'off_duty_user_check_result_1', label: '下班1打卡结果', width: 120 },
        { prop: 'on_duty_user_check_time_2', label: '上班2打卡时间', width: 120 },
        { prop: 'on_duty_user_check_result_2', label: '上班2打卡结果', width: 120 },
        { prop: 'off_duty_user_check_time_2', label: '下班2打卡时间', width: 120 },
        { prop: 'off_duty_user_check_result_2', label: '下班2打卡结果', width: 120 },
        { prop: 'on_duty_user_check_time_3', label: '上班3打卡时间', width: 120 },
        { prop: 'on_duty_user_check_result_3', label: '上班3打卡结果', width: 120 },
        { prop: 'off_duty_user_check_time_3', label: '下班3打卡时间', width: 120 },
        { prop: 'off_duty_user_check_result_3', label: '下班3打卡结果', width: 120 },
        { prop: 'attendance_approve', label: '关联的审批单', width: 120 },
        { prop: 'absenteeism_late_times2', label: '旷工迟到天数', width: 120 }
      ],
      button: {
        width: 100,
        buttonList: []
      }
    }
  },
  methods: {
    getListData() {
      if (this.time) {
        this.fromValiData.timeStart = this.time[0]
        this.fromValiData.timeEnd = this.time[1]
      }
      getDingTalkReportFormResultQueryPageData(this.fromValiData).then(res => {
        res.result.pageList.forEach(xdd => {
          xdd.time = xdd.time.substring(0, xdd.time.length - 9)
        })
        this.tableData = res.result.pageList
        this.fromValiData.dataSum = res.result.dataSum
        this.loading = false
      }).catch(err => {
        this.$message.error(err.message)
        this.loading = false
      })
    },
    getCheckedNodes(node) {
      let ids = ''
      node.forEach(xdd => {
        if (xdd.length > 1) {
          xdd = xdd.pop()
          ids += xdd + ','
        } else {
          ids += xdd + ','
        }
      })
      this.fromValiData.groupIds = ids.substring(0, ids.lastIndexOf(','))
      this.getListData()
    },
    doSearch() {
      this.fromValiData.pageNow = 1
      this.getListData()
    },
    doReset(formName) {
      this.time = []
      this.fromValiData.time = ''
      this.fromValiData.groupIds = ''
      this.fromValiData.pageNow = 1
      this.$refs.fromSearch.$refs.fromValiData.resetFields()
      this.getListData()
    },
    // 导出
    dataExport() {
      let id = { ids: '' }
      this.multipleSelection.forEach(xdd => {
        id.ids += xdd.id + ','
      })
      if (id.ids) {
        id.ids = id.ids.substring(0, id.ids.length - 1)
        window.open(process.env.BASE_API + process.env.JS_Server + '/Excel/DingTalkReportFormResult/download?' + 'ids=' + id.ids)
      } else {
        this.$message({
          message: '请选择需要导出的数据',
          type: 'warning'
        });
      }
    },
    handleSizeChange(val, pageSize) {
      this.fromValiData.pageNow = val
      if (pageSize) {
        this.fromValiData.pageSize = pageSize
      }
      this.getListData()
    },
    handleData(data) {
      let newData = data.map(item => {
        let option = {
          value: item.id,
          label: item.name
        }
        if (item.children && item.children !== []) {
          option.children = this.handleData(item.children)
        }
        return option
      })
      return newData
    },
    handelOption(options) {
      options.forEach(item => {
        if (item.children.length === 0) {
          delete item.children
        } else {
          this.handelOption(item.children)
        }
      })
    },
    getAssetsData() {
      getGroupQueryAllGroupsTree({ pageSize: 999, pageNow: 1, father: '0' }).then(res => {
        let Data = this.handleData(res.result)
        this.handelOption(Data)
        this.options = Data
      })
    },
    handleDetails(params) {
      this.$layer.iframe({
        content: {
          content: detail, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          } // props
        },
        area: this.$layer_Size.Self_Max,
        title: '考勤统计',
        maxmin: true,
        shadeClose: false
      })
    }
  },
  mounted() {
    this.getListData()
    this.getAssetsData()
  },
  created() { }
}
</script>

<style lang="sass" scoped>
</style>
