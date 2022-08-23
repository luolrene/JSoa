  <template>
  <div class="pc-container">
    <div style="height:calc(100vh - 95px)">
      <el-scrollbar class="page-component__scroll" style="height:100%;" :native="false">
        <el-row type="flex" style="margin-bottom: 10px">
          <!-- 在职状态 -->
          <el-col :span="12">
            <div style="position: absolute;left: 33%;top:20px;z-index: 2;width:170px">
              <el-select v-model="job" placeholder="请选择部门" @change="gropJobStatus" filterable clearable>
                <el-option v-for="item in gropOptions" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </div>
            <myEchart :id="'echart_jobStatus'" :data="option_jobStatus" :loadding="jobStatusLoadding" :style="{ height: echartHeight }" style="width: 100%"></myEchart>
          </el-col>
          <!-- 入职离职 -->
          <el-col :span="12">
            <div style="position: absolute;right: 16%;top:20px;z-index: 2;width:170px">
              <el-select v-model="target" placeholder="请选择部门" @change="gropTargetStatus" filterable clearable>
                <el-option v-for="item in gropOptions" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </div>
            <div style="position: absolute;right: 2%;top:20px;z-index: 2;">
              <el-date-picker v-model="targetMonthValue" @change="changeTargetMonth" value-format="yyyy-MM" type="monthrange" range-separator="至" start-placeholder="开始月份" end-placeholder="结束月份" style="width: 240px;">
              </el-date-picker>
            </div>
            <myEchart :id="'echart_inauguration'" :data="option_inauguration" :loadding="inaugurationLoadding" :style="{ height: echartHeight }" style="width: 100%"></myEchart>
          </el-col>
        </el-row>
        <el-row type="flex" style="margin-bottom: 10px">
          <!-- 行政职级 -->
          <el-col :span="12">
            <div style="position: absolute;right: 67%;top:20px;z-index: 2;width:170px">
              <el-select v-model="type" placeholder="请选择职级类型" @change="gropTypeStatus" filterable clearable>
                <el-option v-for="item in typeOptions" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </div>
            <div style="position: absolute;left: 33%;top:20px;z-index: 2;width:170px">
              <el-select v-model="rank" placeholder="请选择部门" @change="gropRankStatus" filterable clearable>
                <el-option v-for="item in gropOptions" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </div>
            <myEchart :id="'echart_rank'" :data="option_rank" :loadding="rankLoadding" :style="{ height: echartHeight }" style="width: 100%"></myEchart>
          </el-col>
          <!-- 职称统计 -->
          <el-col :span="12">
            <div style="position: absolute;right: 8%;top:20px;z-index: 2;width:170px">
              <el-select v-model="rankLev" placeholder="请选择部门" @change="gropRankLevStatus" filterable clearable>
                <el-option v-for="item in gropOptions" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </div>
            <myEchart :id="'echart_rankLev'" :data="option_rankLev" :loadding="rankLevLoadding" :style="{ height: echartHeight }" style="width: 100%"></myEchart>
          </el-col>
        </el-row>
        <el-row type="flex" style="margin-bottom: 10px">
          <!-- 员工司龄 -->
          <el-col :span="12">
            <div style="position: absolute;left: 33%;top:20px;z-index: 2;width:170px">
              <el-select v-model="years" placeholder="请选择部门" @change="gropYearsStatus" filterable clearable>
                <el-option v-for="item in gropOptions" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </div>
            <myEchart :id="'echart_years'" :data="option_years" :loadding="yearsLoadding" :style="{ height: echartHeight }" style="width: 100%"></myEchart>
          </el-col>
          <!-- 年龄 -->
          <el-col :span="12">
            <div style="position: absolute;right: 8%;top:20px;z-index: 2;width:170px">
              <el-select v-model="birthTime" placeholder="请选择部门" @change="gropBirthTimeStatus" filterable clearable>
                <el-option v-for="item in gropOptions" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </div>
            <myEchart :id="'echart_birthTime'" :data="option_birthTime" :loadding="birthTimeLoadding" :style="{ height: echartHeight }" style="width: 100%"></myEchart>
          </el-col>
        </el-row>
        <el-row type="flex" style="margin-bottom: 10px">
          <!-- 学历 -->
          <el-col :span="12">
            <div style="position: absolute;left: 33%;top:20px;z-index: 2;width:170px">
              <el-select v-model="education" placeholder="请选择部门" @change="gropEducationStatus" filterable clearable>
                <el-option v-for="item in gropOptions" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </div>
            <myEchart :id="'echart_education'" :data="option_education" :loadding="educationLoadding" :style="{ height: echartHeight }" style="width: 100%"></myEchart>
          </el-col>
          <!-- 婚姻 -->
          <el-col :span="12">
            <div style="position: absolute;right: 8%;top:20px;z-index: 2;width:170px">
              <el-select v-model="status" placeholder="请选择部门" @change="gropStatusStatus" filterable clearable>
                <el-option v-for="item in gropOptions" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </div>
            <myEchart :id="'echart_status'" :data="option_status" :loadding="statusLoadding" :style="{ height: echartHeight }" style="width: 100%"></myEchart>
          </el-col>
        </el-row>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import { getGroupQueryPageData } from '../../../api/jcxxgl/group.js'
import {
  getUserSumOnTheJobStatus, // 员工在职状态
  getUserSumEducation, // 员工学历分布
  getUserSumBirthTime, // 员工年龄分布
  getUserSumInauguration, // 入职 离职 在职
  getUserSumAdministrativeRank, // 职级
  getUserSumRankLev, // 职称
  getUserSumMaritalStatus, // 婚姻性别
  getUserSumWorkingYears // 员工司龄
} from '../../../api/jcxxgl/peoples.js'
export default {
  data() {
    return {
      jobStatusLoadding: false,
      inaugurationLoadding: false,
      rankLoadding: false,
      rankLevLoadding: false,
      yearsLoadding: false,
      birthTimeLoadding: false,
      statusLoadding: false,
      educationLoadding: false,
      gropOptions: [],
      typeOptions: [
        { name: '行政职级', id: '1' },
        { name: '技术职级', id: '2' },
        { name: '市场职级', id: '3' }
      ],
      fromData: {
        onTheJobStatus: '1,2,3,4,5,6,7,8',
        education: '1,2,3,4,5,6',
        rankLev: '1,2,3,4'
      },
      option_jobStatus: {},
      option_inauguration: {},
      option_rank: {},
      option_rankLev: {},
      option_years: {},
      option_birthTime: {},
      option_education: {},
      option_status: {},
      job: '',
      target: '',
      type: '',
      rank: '',
      rankLev: '',
      years: '',
      birthTime: '',
      education: '',
      status: '',
      fromValiData: {
        startTime: '2022-01',
        endTime: '2022-12'
      },
      targetMonthValue: ['2022-01', '2022-12'], // 选择的月份
      echartHeight: '50vh' // 图标高度
    }
  },
  methods: {
    getGroupData() {
      getGroupQueryPageData({ pageSize: 999, pageNow: 1, father: '0' }).then(
        res => {
          this.gropOptions = res.result.pageList
        }
      )
    },
    // 在职
    gropJobStatus() {
      this.getEchartData_JobStatus()
    },
    getEchartData_JobStatus() {
      this.chanceLoadding = true
      getUserSumOnTheJobStatus({
        onTheJobStatus: this.fromData.onTheJobStatus,
        groupId: this.job
      })
        .then(res => {
          let option = {
            title: [
              {
                text: '员工在职状况',
                top: '3%',
                left: '3%'
              }
            ],
            tooltip: {
              trigger: 'item',
              formatter: '{a}: {c}({d}%)'
            },
            legend: {
              top: '14%'
            },

            color: [
              '#FFB90F',
              '#EED2EE',
              '#B0E0E6',
              '#76EEC6',
              '#D6D6D6',
              '#CD6889',
              '#1E90FF',
              '#CD00CD'
            ],
            grid: {
              left: '1%',
              right: '1%'
            },
            series: [
              {
                name: '人数',
                type: 'pie',
                radius: '60%',
                center: ['50%', '60%'],
                data: [],
                label: {
                  normal: {
                    show: true,
                    formatter: '{b} : {c} ({d}%)'
                  },
                  labelLine: { show: true }
                }
              }
            ]
          }
          res.result.forEach((xdd, index) => {
            switch (xdd.name) {
              case '1':
                xdd.JobStatus = '在职'
                break
              case '2':
                xdd.JobStatus = '离职'
                break
              case '3':
                xdd.JobStatus = '试用期'
                break
              case '4':
                xdd.JobStatus = '退休'
                break
              case '5':
                xdd.JobStatus = '临时'
                break
              case '6':
                xdd.JobStatus = '实习期'
                break
              case '7':
                xdd.JobStatus = '挂靠'
                break
              case '8':
                xdd.JobStatus = '其他'
            }
            option.series[0].data.splice(index, 0, {
              name: xdd.JobStatus,
              value: xdd.sum
            })
          })
          this.option_jobStatus = option
          this.jobStatusLoadding = false
        })
        .catch(() => {
          this.jobStatusLoadding = false
        })
    },

    // 员工学历
    gropEducationStatus() {
      this.getEchartData_Education()
    },
    getEchartData_Education() {
      this.educationLoadding = true
      getUserSumEducation({
        education: this.fromData.education,
        groupId: this.education
      })
        .then(res => {
          let option = {
            title: [
              {
                text: '员工学历',
                top: '3%',
                left: '3%'
              }
            ],
            tooltip: {
              trigger: 'item',
              formatter: '{b} : {c} ({d}%)'
            },
            legend: {
              top: '14%'
            },
            color: [
              '#FFB90F',
              '#EED2EE',
              '#B0E0E6',
              '#76EEC6',
              '#D6D6D6',
              '#CD6889',
              '#1E90FF',
              '#CD00CD'
            ],
            grid: {
              left: '1%',
              right: '1%'
            },
            series: [
              {
                name: '人数',
                type: 'pie',
                radius: '60%',
                center: ['50%', '60%'],
                data: [],
                label: {
                  normal: {
                    show: true,
                    formatter: '{b} : {c} ({d}%)'
                  },
                  labelLine: { show: true }
                }
              }
            ]
          }
          res.result.forEach((xdd, index) => {
            switch (xdd.name) {
              case '1':
                xdd.Status = '硕士'
                break
              case '2':
                xdd.Status = '本科'
                break
              case '3':
                xdd.Status = '大专'
                break
              case '4':
                xdd.Status = '中专'
                break
              case '5':
                xdd.Status = '高中'
                break
              case '6':
                xdd.Status = '高中以下'
            }
            option.series[0].data.splice(index, 0, {
              name: xdd.Status,
              value: xdd.sum
            })
          })
          this.option_education = option
          this.educationLoadding = false
        })
        .catch(() => {
          this.educationLoadding = false
        })
    },

    // 员工年龄
    gropBirthTimeStatus() {
      this.getEchartData_BirthTime()
    },
    getEchartData_BirthTime() {
      this.birthTimeLoadding = true
      getUserSumBirthTime({ groupId: this.birthTime })
        .then(res => {
          let option = {
            title: [
              {
                text: '员工年龄',
                top: '3%',
                left: '10%'
              }
            ],
            tooltip: {
              trigger: 'item',
              formatter: '{a}: {c}({d}%)'
            },
            legend: {
              top: '14%'
            },
            color: [
              '#FFB90F',
              '#EED2EE',
              '#B0E0E6',
              '#76EEC6',
              '#D6D6D6',
              '#CD6889',
              '#1E90FF',
              '#CD00CD'
            ],
            grid: {
              left: '1%',
              right: '1%'
            },
            series: [
              {
                name: '人数',
                type: 'pie',
                radius: '60%',
                center: ['50%', '60%'],
                data: [],
                label: {
                  normal: {
                    show: true,
                    formatter: '{b} : {c} ({d}%)'
                  },
                  labelLine: { show: true }
                }
              }
            ]
          }
          res.result.forEach((xdd, index) => {
            option.series[0].data.splice(index, 0, {
              name: xdd.name,
              value: xdd.sum
            })
          })
          this.option_birthTime = option
          this.birthTimeLoadding = false
        })
        .catch(() => {
          this.birthTimeLoadding = false
        })
    },

    // 月份范围
    changeTargetMonth(item) {
      this.fromValiData.startTime = item[0]
      this.fromValiData.endTime = item[1]
      this.getEchartData_Inauguration()
    },
    // 入职 离职 在职
    gropTargetStatus() {
      this.getEchartData_Inauguration()
    },
    getEchartData_Inauguration() {
      this.inaugurationLoadding = true
      let obj = {}
      obj.startTime = this.fromValiData.startTime
      obj.endTime = this.fromValiData.endTime
      obj.groupId = this.target

      getUserSumInauguration(obj)
        .then(res => {
          let option = {
            title: [
              {
                text: '入职统计',
                top: '3%',
                left: '10%'
              }
            ],
            tooltip: {
              trigger: 'item',
              formatter: '{a}: {c}({d}%)'
            },
            legend: {
              top: '14%'
            },
            color: ['#FFB90F', '#EED2EE', '#B0E0E6'],
            grid: {
              left: '1%',
              right: '1%'
            },
            series: [
              {
                name: '人数',
                type: 'pie',
                radius: '60%',
                center: ['50%', '60%'],
                data: [],
                label: {
                  normal: {
                    show: true,
                    formatter: '{b} : {c} ({d}%)'
                  },
                  labelLine: { show: true }
                }
              }
            ]
          }

          res.result.forEach((xdd, index) => {
            option.series[0].data.splice(index, 0, {
              name: xdd.name,
              value: xdd.sum
            })
          })
          this.option_inauguration = option
          this.inaugurationLoadding = false
        })
        .catch(() => {
          this.inaugurationLoadding = false
        })
    },

    // 职级
    gropRankStatus() {
      this.getEchartData_Rank()
    },
    gropTypeStatus() {
      this.getEchartData_Rank()
    },
    getEchartData_Rank() {
      this.rankLoadding = true
      getUserSumAdministrativeRank({ groupId: this.rank, type: this.type })
        .then(res => {
          let option = {
            title: [
              {
                text: '行政职级',
                top: '3%',
                left: '10%'
              }
            ],
            tooltip: {
              trigger: 'item',
              formatter: '{a}: {c}({d}%)'
            },
            legend: {
              top: '14%'
            },
            color: [
              '#FFB90F',
              '#EED2EE',
              '#B0E0E6',
              '#76EEC6',
              '#D6D6D6',
              '#CD6889',
              '#1E90FF',
              '#CD00CD'
            ],
            grid: {
              left: '1%',
              right: '1%'
            },
            series: [
              {
                name: '人数',
                type: 'pie',
                radius: '60%',
                center: ['50%', '60%'],
                data: [],
                label: {
                  normal: {
                    show: true,
                    formatter: '{b} : {c} ({d}%)'
                  },
                  labelLine: { show: true }
                }
              }
            ]
          }
          res.result.forEach((xdd, index) => {
            option.series[0].data.splice(index, 0, {
              name: xdd.name,
              value: xdd.sum
            })
          })
          this.option_rank = option
          this.rankLoadding = false
        })
        .catch(() => {
          this.rankLoadding = false
        })
    },

    // 职称
    gropRankLevStatus() {
      this.getEchartData_RankLev()
    },
    getEchartData_RankLev() {
      this.rankLoadding = true
      getUserSumRankLev({
        rankLev: this.fromData.rankLev,
        groupId: this.rankLev
      })
        .then(res => {
          let option = {
            title: [
              {
                text: '职称统计',
                top: '3%',
                left: '10%'
              }
            ],
            tooltip: {
              trigger: 'item',
              formatter: '{a}: {c}({d}%)'
            },
            legend: {
              top: '14%'
            },
            color: ['#FFB90F', '#EED2EE', '#B0E0E6', '#76EEC6'],
            grid: {
              left: '1%',
              right: '1%'
            },
            series: [
              {
                name: '人数',
                type: 'pie',
                radius: '60%',
                center: ['50%', '60%'],
                data: [],
                label: {
                  normal: {
                    show: true,
                    formatter: '{b} : {c} ({d}%)'
                  },
                  labelLine: { show: true }
                }
              }
            ]
          }
          res.result.forEach((xdd, index) => {
            switch (xdd.name) {
              case '1':
                xdd.rankLev = '高级'
                break
              case '2':
                xdd.rankLev = '中级'
                break
              case '3':
                xdd.rankLev = '初级'
                break
              case '4':
                xdd.rankLev = '无职称'
            }
            option.series[0].data.splice(index, 0, {
              name: xdd.rankLev,
              value: xdd.sum
            })
          })
          this.option_rankLev = option
          this.rankLevLoadding = false
        })
        .catch(() => {
          this.rankLevLoadding = false
        })
    },

    // 婚姻性别
    gropStatusStatus() {
      this.getEchartData_Status()
    },
    getEchartData_Status() {
      this.statusLoadding = true
      getUserSumMaritalStatus({ groupId: this.status })
        .then(res => {
          let option = {
            title: [
              {
                text: '婚姻及性别',
                top: '3%',
                left: '10%'
              }
            ],
            tooltip: {
              trigger: 'item',
              formatter: '{a}: {c}({d}%)'
            },
            legend: {
              top: '14%'
            },
            color: [
              '#FFB90F',
              '#EED2EE',
              '#B0E0E6',
              '#76EEC6',
              '#D6D6D6',
              '#CD6889',
              '#1E90FF',
              '#CD00CD'
            ],
            grid: {
              left: '1%',
              right: '1%'
            },
            series: [
              {
                name: '人数',
                type: 'pie',
                radius: '60%',
                center: ['50%', '60%'],
                data: [],
                label: {
                  normal: {
                    show: true,
                    formatter: '{b} : {c} ({d}%)'
                  },
                  labelLine: { show: true }
                }
              }
            ]
          }
          res.result.forEach((xdd, index) => {
            option.series[0].data.splice(index, 0, {
              name: xdd.name,
              value: xdd.sum
            })
          })
          this.option_status = option
          this.statusLoadding = false
        })
        .catch(() => {
          this.statusLoadding = false
        })
    },

    // 员工司龄
    gropYearsStatus() {
      this.getEchartData_Years()
    },
    getEchartData_Years() {
      this.yearsLoadding = false
      getUserSumWorkingYears({ groupId: this.years })
        .then(res => {
          let option = {
            title: [
              {
                text: '员工司龄',
                top: '3%',
                left: '13%'
              }
            ],
            tooltip: {
              trigger: 'item',
              formatter: '{a}: {c}({d}%)'
            },
            legend: {
              top: '14%'
            },
            color: [
              '#FFB90F',
              '#EED2EE',
              '#B0E0E6',
              '#76EEC6',
              '#D6D6D6',
              '#CD6889',
              '#1E90FF',
              '#CD00CD'
            ],
            grid: {
              left: '1%',
              right: '1%'
            },
            series: [
              {
                name: '人数',
                type: 'pie',
                radius: '60%',
                center: ['50%', '60%'],
                data: [],
                label: {
                  normal: {
                    show: true,
                    formatter: '{b} : {c} ({d}%)'
                  },
                  labelLine: { show: true }
                }
              }
            ]
          }
          res.result.forEach((xdd, index) => {
            option.series[0].data.splice(index, 0, {
              name: xdd.name,
              value: xdd.sum
            })
          })
          this.option_years = option
          this.yearsLoadding = false
        })
        .catch(() => {
          this.yearsLoadding = false
        })
    }
  },
  mounted() {
    this.getGroupData()
    this.getEchartData_JobStatus()
    this.getEchartData_Inauguration()
    this.getEchartData_Education()
    this.getEchartData_Rank()
    this.getEchartData_RankLev()
    this.getEchartData_Status()
    this.getEchartData_Years()
    this.getEchartData_BirthTime()
  }
}
</script>

<style scoped>
.el-scrollbar__wrap {
  overflow: hidden;
}
</style>
