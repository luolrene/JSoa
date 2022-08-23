<template>
  <div class="operate-container exmProcess">
    <div style="display: flex;align-items: center;justify-content: center;flex-direction: column;height: 500px;" v-if="steps.length=== 0">
      <img src="static/img/menu/addProcess.png" alt="" @click="addProcess" style="cursor: pointer;margin-bottom: 10px">
      <span style="color: #999999;">点击添加流程明细</span>
    </div>
    <template v-else>
      <el-scrollbar class="page-component__scroll" :native="false" style="height: 500px;">
        <el-steps :space="80" direction="vertical">
          <el-step :title="getTitle(index)" :description="item.name" v-for="(item,index) in steps" :key="index"></el-step>
        </el-steps>
      </el-scrollbar>
      <div style="display: flex;justify-content: space-around;align-items: center;">
        <div>
          <el-button type="primary" :size="$layer_Size.buttonSize" @click="addProcess">添加步骤</el-button>
          <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" @click="doReset">重置</el-button>
        </div>
        <div>
          <el-button class="cancel-btn" :size="$layer_Size.buttonSize" @click='$layer.close(layerid)'>取消</el-button>
          <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" @click="doConfirm()" :loading="loading">保存</el-button>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import edit from './edit_step.vue'
import {
  getOaProcessStepsGetDataByFatherId,
  getOaProcessStepsAddOrModifyd
} from '../../../api/integrated/flow.js'
export default {
  props: {
    params: Object,
    layerid: ''
  },
  data() {
    return {
      loading: false,
      fromValiData: {},
      steps: []
    }
  },
  methods: {
    // 展示
    getListData() {
      getOaProcessStepsGetDataByFatherId({
        fatherId: this.fromValiData.id
      }).then(res => {
        res.result.forEach((xdd, index) => {
          if (xdd.state === '其他部门') {
            this.steps.push({
              createTime: xdd.createTime,
              createUser: xdd.createUser,
              id: xdd.id,
              fatherId: xdd.fatherId,
              groupId: xdd.groupId,
              groupIdShow: xdd.groupIdShow,
              state: xdd.state,
              nameOrId: xdd.nameOrId,
              nameOrIdShow: xdd.nameOrIdShow,
              name: xdd.groupIdShow + '-' + xdd.nameOrIdShow
            })
          } else if (xdd.state === '本部门') {
            this.steps.push({
              createTime: xdd.createTime,
              createUser: xdd.createUser,
              id: xdd.id,
              fatherId: xdd.fatherId,
              state: xdd.state,
              nameOrId: xdd.nameOrId,
              name: xdd.state + '-' + xdd.nameOrId
            })
          } else if (xdd.state === '人员') {
            this.steps.push({
              createTime: xdd.createTime,
              createUser: xdd.createUser,
              id: xdd.id,
              fatherId: xdd.fatherId,
              state: xdd.state,
              nameOrId: xdd.nameOrId,
              userName: xdd.userName,
              name: xdd.state + '-' + xdd.userName
            })
          }
        })
      })
    },
    getTitle(index) {
      return '步骤' + (index + 1)
    },
    addProcess(params) {
      this.$layer.iframe({
        content: {
          content: edit, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: this.params
          } // props
        },
        area: this.$layer_Size.Normal,
        title: '添加步骤明细',
        maxmin: true,
        shadeClose: false
      })
    },
    doReset() {
      this.steps = []
    },
    getSteps(params) {
      this.steps.push(params)
      this.$share.message('添加成功')
    },
    // 要交的
    doConfirm() {
      this.steps.forEach((xdd, index) => {
        xdd.step = index + 1
      })
      getOaProcessStepsAddOrModifyd(this.steps)
        .then(res => {
          this.$layer.close(this.layerid)
          this.$parent.getListData()
          this.$share.message()
          this.btnLoading = false
        })
        .catch(err => {
          this.$message.error(err.message)
          this.loading = false
        })
    }
  },
  mounted() {
    this.fromValiData = this.params
    this.getListData()
  },
  created() { }
}
</script>

<style lang="scss">
.exmProcess .el-step__title.is-wait {
  font-weight: 700;
  color: #333333;
}
.exmProcess .el-step__description.is-wait {
  color: #333333;
}
</style>
