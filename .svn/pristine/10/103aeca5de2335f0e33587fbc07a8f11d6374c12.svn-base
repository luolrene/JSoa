<template>
  <el-row type="flex" class="row-bg" justify="center">
    <el-col :span="4">
      <treeItem ref="myTree" :props="props" :treeData="treeData" @getNodeClick="getNodeClick"></treeItem>
    </el-col>
    <el-col :span="20" style="padding-left: 15px;">
      <p style="font-size:22px;text-align:center">{{title}}</p>
      <tableItem :obj="this" :tableData="tableData" :tableHeader="tableHeader" :loading="loading" :dataSum='fromValiData.dataSum' :button="button" :isPage="false" :isSelection="false" @handleSizeChange="handleSizeChange">
      </tableItem>
      <div style="display: flex;margin-top:25px;">
        <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-refresh-left" @click="doBackToTop">返回顶级</el-button>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import edit from '../edit.vue'
import {
  getTaskGetChildren,
  getTaskGetDataByFatherId
} from '@/api/public/task.js'
export default {
  props: {
    params: Object
  },
  data() {
    return {
      loading: false,
      title: '任务中心列表',
      show: true,
      props: {
        label: 'name',
        children: 'children'
      },
      fileList: [],
      treeData: [],
      tableData: [],
      contract_arr: [], // 默认显示任务
      fromValiData: {
        pageSize: 99,
        pageNow: 1
      },
      clickParams: {},
      level: 1, //  1 一级任务   2 二级任务   3 三级任务
      tableHeader: [
        {
          prop: 'title',
          label: '任务标题',
          width: 180
        },
        {
          prop: 'deadlineTime',
          label: '截止时间',
          width: 90
        },
        {
          prop: 'criticals',
          label: '紧要程度',
          width: 90,
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
          prop: 'taskTypeName',
          label: '任务类型',
          width: 90
        },
        {
          prop: 'judgeAcceptanceName',
          label: '是否验收',
          width: 90
        },
        {
          prop: 'introduce',
          label: '任务描述',
          width: 250
        }
      ],
      button: {
        buttonList: []
      }
    }
  },

  methods: {
    // 列表数据
    getListData(params) {
      if (params) {
        getTaskGetDataByFatherId({ fatherId: params.id })
          .then(res => {
            res.result.forEach(xdd => {
              switch (xdd.judgeAcceptance) {
                case '1':
                  xdd.judgeAcceptanceName = '是'
                  break
                case '2':
                  xdd.judgeAcceptanceName = '否'
              }
              switch (xdd.taskType) {
                case '1':
                  xdd.taskTypeName = '周期任务'
                  break
                case '2':
                  xdd.taskTypeName = '月度任务'
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
            })
            this.tableData = res.result
            this.loading = false
          })
          .catch(err => {
            this.$message.error(err.message)
            this.loading = false
          })
      }
    },
    // 所有任务-树形
    getTreeData() {
      getTaskGetChildren({
        id: this.params.id,
        fatherId: this.params.fatherId,
        grade: this.params.grade
      }).then(res => {
        this.treeData = res.result[0].children
        this.contract_arr.push(res.result[0].main)
        // 当前任务信息
        this.contract_arr.forEach(xdd => {
          switch (xdd.judgeAcceptance) {
            case '1':
              xdd.judgeAcceptanceName = '是'
              break
            case '2':
              xdd.judgeAcceptanceName = '否'
          }
          switch (xdd.taskType) {
            case '1':
              xdd.taskTypeName = '周期任务'
              break
            case '2':
              xdd.taskTypeName = '月度任务'
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
        })
        this.tableData = this.contract_arr
      })
    },
    getNodeClick(data, node, now) {
      this.clickParams = data
      this.getListData(data)
      this.show = false
    },
    doBackToTop() {
      this.contract_arr = []
      this.show = true
      this.getTreeData()
    },
    handleSizeChange(val, pageSize) {},
    // 编辑
    handleEdit(params) {
      this.$layer.iframe({
        content: {
          content: edit, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          } // props
        },
        area: this.$layer_Size.Normal,
        title: '编辑',
        maxmin: true,
        shadeClose: false
      })
    },
    // 添加子任务
    handleSubtask(params) {
      this.$layer.iframe({
        content: {
          content: edit, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            fatherId: params.id
          } // props
        },
        area: this.$layer_Size.Normal,
        title: '添加子任务',
        maxmin: true,
        shadeClose: false
      })
    }
  },
  mounted() {
    this.getTreeData()
    this.getListData()
  },
  created() {}
}
</script>

<style scoped lang="scss">
</style>
