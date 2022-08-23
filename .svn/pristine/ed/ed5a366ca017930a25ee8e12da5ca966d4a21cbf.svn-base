<template>
  <div class="operate-container">
    <tableItem :obj="this" :table-data="tableData" :table-header="tableHeader" :button="button" :loading="loading" :is-selection="false" :is-page="false" :data-sum="fromValiData.dataSum" @handleSizeChange="handleSizeChange" />
    <div class="modular" v-if="params.onlyCode" style='display: flex;align-items: center;margin-top: 30px;'>
      <div class="title">附件：</div>
      <div class="content">
        <div v-if="fileList.length === 0">无</div>
        <fileList :file-list="fileList" v-else style='padding:0;' />
      </div>
    </div>
    <div style='align-items: center;margin-top: 30px;font-size:20px;'>
      <div class="title">备注及评论</div>
      <i class="el-icon-edit icon" @click="handleRemark" v-if="params.createUser===userId||params.responsibilityUserId===userId"></i>
      <div class="content">
        <div>
          <el-scrollbar class="page-component__scroll" :native="false" style="height: 450px;">
            <div v-for="(item,index) in taskData" :key="index" class="border">
              <div class="myBox" v-if="item.createUser===userId">
                <span style="font-size:14px;">{{item.createUserName}}</span>
                <span style="margin-left:45%;font-size:14px;">{{item.createTime}}</span>
                <div style="margin-top:5px;word-wrap:break-word;">{{item.content}}</div>
              </div>
              <div class="otherBox" v-else>
                <span style="font-size:14px;">{{item.createUserName}}</span>
                <span style="margin-left:45%;font-size:14px;">{{item.createTime}}</span>
                <div style="margin-top:5px;word-wrap:break-word;">{{item.content}}</div>
              </div>
            </div>
          </el-scrollbar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import edit from '../edit.vue'
import remark from '../handle/remark.vue' // 备注
import postpone from '../handle/postpone.vue' // 延期
import fileList from '../../../common/fileList.vue'
import { getKnowledgePointsGetFile } from '@/api/file.js'
import { getTaskModify, getTaskGetDataById, getTaskCommentQueryPageData } from '@/api/public/task.js'
export default {
  components: {
    fileList
  },
  props: {
    layerid: '',
    params: Object
  },
  data() {
    return {
      loading: false,
      fileList: [],
      taskData: [],
      userId: this.$store.getters.userInfo.id,
      fromValiData: {
        pageSize: 10,
        pageNow: 1
      },
      tableData: [],
      tableHeader: [
        { prop: 'title', label: '任务标题', width: 100 },
        { prop: 'introduce', label: '任务描述', width: 180 },
        { prop: 'responsibilityUserName', label: '负责人', width: 100 },
        { prop: 'participateInUserName', label: '参与人', width: 100 },
        { prop: 'noticeUserName', label: '抄送人', width: 100 },
        {
          prop: 'criticals',
          label: '紧要程度',
          width: 100,
          condition: params => {
            if (params.critical === '1') {
              return '#ff9900'
            } else if (params.critical === '2') {
              return '#FF3232'
            } else if (params.critical === '3') {
              return '#FF0000'
            }
          }
        },
        {
          label: '任务类型',
          prop: 'taskTypeName',
          width: 100
        },
        {
          prop: 'judgeAcceptanceName',
          label: '是否需要验收',
          width: 100
        },
        {
          prop: 'stateName',
          label: '任务状态',
          width: 100
        },
        {
          prop: 'deadlineTime',
          label: '截止时间',
          width: 180
        }
      ],
      button: {
        width: 250,
        buttonList: [
          {
            name: '子任务',
            type: 'primary',
            click: 'handleSubtask',
            condition: params => {
              if (
                (params.grade === 1 || params.grade === 2) &&
                params.responsibilityUserId === this.userId &&
                (params.state === '1' || params.state === '4')
              ) {
                return true
              } else {
                return false
              }
            }
          },
          {
            name: '延期',
            type: 'primary',
            click: 'handlePostpone',
            condition: params => {
              if (
                (params.state === '1' || params.state === '4') && params.ascription !== '3'
              ) {
                return true
              } else {
                return false
              }
            }
          },
          {
            name: '终止',
            type: 'danger',
            click: 'handleCancel',
            condition: params => {
              if (params.createUser === this.userId && params.state !== '3') {
                return true
              } else {
                return false
              }
            }
          }
        ]
      }
    }
  },

  methods: {
    getListData() {
      getTaskGetDataById(this.fromValiData).then(res => {
        res.result.forEach(xdd => {
          switch (xdd.taskType) {
            case '1':
              xdd.taskTypeName = '周期任务'
              break
            case '2':
              xdd.taskTypeName = '月度任务'
              break
            case '3':
              xdd.taskTypeName = '普通任务'
          }
          switch (xdd.judgeAcceptance) {
            case '1':
              xdd.judgeAcceptanceName = '是'
              break
            case '2':
              xdd.judgeAcceptanceName = '否'
          }
          switch (xdd.critical) {
            case '1':
              xdd.criticals = '★'
              break
            case '2':
              xdd.criticals = '★★'
              break
            case '3':
              xdd.criticals = '★★★'
          }
          switch (xdd.state) {
            case '1':
              xdd.stateName = '进行中'
              break
            case '2':
              xdd.stateName = '完成'
              break
            case '3':
              xdd.stateName = '已终止'
              break
            case '4':
              xdd.stateName = '延期'
              break
            case '5':
              xdd.stateName = '负责人审核中'
              break
            case '6':
              xdd.stateName = '完成审核中'
              break
            case '7':
              xdd.stateName = '延期审核中'
              break
            case '8':
              xdd.stateName = '已逾期'
          }
        })
        this.tableData = res.result
        this.getFileListData()
        this.getTaskData()
        this.loading = false
      })
    },
    // 获取附件
    getFileListData() {
      if (this.params.onlyCode) {
        getKnowledgePointsGetFile({ onlyCode: this.params.onlyCode }).then(
          res => {
            this.fileList = res.result
          }
        )
      }
    },
    // 获取留言评论
    getTaskData() {
      let obj = {}
      obj.pageSize = 9999
      obj.pageNow = 1
      if (this.tableData[0].grade === 1) {
        obj.fatherId = this.tableData[0].id
      } else {
        obj.fatherId = this.tableData[0].fatherId
      }
      getTaskCommentQueryPageData(obj).then(res => {
        this.taskData = res.result.pageList
      })
    },
    // 终止
    handleCancel(params) {
      let that = this
      this.$share.confirm({
        message: '此操作将终止本次任务， 是否继续?',
        confirm: function () {
          params.state = '3'
          getTaskModify(params).then(res => {
            that.getListData()
            this.btnLoading = false
          })
        }
      })
    },
    handleSubtask(params) {
      this.$layer.iframe({
        content: {
          content: edit, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            fatherId: params.id,
            grade: params.grade
          } // props
        },
        area: this.$layer_Size.Normal,
        title: '添加子任务',
        maxmin: true,
        shadeClose: false
      })
    },
    handlePostpone(params) {
      this.$layer.iframe({
        content: {
          content: postpone, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          } // props
        },
        area: this.$layer_Size.Normal,
        title: '延期',
        maxmin: true,
        shadeClose: false
      })
    },
    // 备注
    handleRemark() {
      this.$layer.iframe({
        content: {
          content: remark, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: this.tableData[0]
          } // props
        },
        area: ['500px', '300px'],
        title: '备注',
        maxmin: true,
        shadeClose: false
      })
    },
    handleSizeChange(val, pageSize) { }
  },
  mounted() {
    this.fromValiData.id = this.params.id
    this.getListData()
  },
  created() { }
}
</script>

<style scoped lang="scss">
.icon {
  position: absolute;
  top: 210px;
  left: 140px;
  color: #0195db;
  cursor: pointer;
}
.border {
  font-size: 16px;
}
.otherBox {
  margin: 10px 0 0 500px;
  width: 400px;
  min-height: 80px;
  padding: 5px 15px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background: #fff;
}
.myBox {
  margin: 10px 0 0 10px;
  width: 400px;
  min-height: 80px;
  padding: 5px 15px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background: #89db61bf;
}
</style>
